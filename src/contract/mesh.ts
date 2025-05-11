/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  applyParamsToScript,
  BlockfrostProvider,
  deserializeAddress,
  deserializeDatum,
  hexToString,
  IFetcher,
  mConStr0,
  MeshTxBuilder,
  MeshWallet,
  Network,
  PlutusScript,
  pubKeyAddress,
  scriptAddress,
  serializeAddressObj,
  serializePlutusScript,
  UTxO,
} from "@meshsdk/core";
import blueprint from "./plutus.json";
import { ADMINISTRATOR_WALLET_ADDRESS, appNetworkId } from "@/constants/contract";
import { Contract } from "@/interface";

export class MeshAdapter {
  protected fetcher: IFetcher;
  protected wallet: MeshWallet;
  protected meshTxBuilder: MeshTxBuilder;
  protected network: Network;
  protected networkId: number;

  public contractAddress: string;
  protected contractScript: PlutusScript;
  protected contractScriptCbor: string;
  protected contractCompileCode: string;

  constructor({
    wallet = null!,
    fetcher = null!,
    blockfrostProvider = null!,
  }: {
    wallet?: MeshWallet;
    fetcher?: IFetcher;
    blockfrostProvider?: BlockfrostProvider;
  }) {
    this.wallet = wallet;
    this.fetcher = fetcher;
    this.meshTxBuilder = new MeshTxBuilder({
      fetcher: this.fetcher,
      evaluator: blockfrostProvider,
    });

    this.network = (process.env.BLOCKFROST_PROJECT_ID?.slice(0, 7) as Network) || "preview";
    this.networkId = this.network == "mainnet" ? 1 : 0;

    this.contractCompileCode = this.readValidator(blueprint, "contract.contract.spend");
    this.contractScriptCbor = applyParamsToScript(this.contractCompileCode, [
      mConStr0([deserializeAddress(ADMINISTRATOR_WALLET_ADDRESS).pubKeyHash, deserializeAddress(ADMINISTRATOR_WALLET_ADDRESS).stakeCredentialHash]),
      BigInt(1),
    ]);
    this.contractScript = { code: this.contractScriptCbor, version: "V3" };

    this.contractAddress = serializeAddressObj(
      scriptAddress(
        deserializeAddress(serializePlutusScript(this.contractScript, undefined, appNetworkId, false).address).scriptHash,
        deserializeAddress(ADMINISTRATOR_WALLET_ADDRESS).stakeCredentialHash,
        false,
      ),
      appNetworkId,
    );
  }

  protected getWalletForTx = async (): Promise<{
    utxos: UTxO[];
    collateral: UTxO;
    walletAddress: string;
  }> => {
    const utxos = await this.wallet.getUtxos();
    const collaterals = await this.wallet.getCollateral();
    const walletAddress = await this.wallet.getChangeAddress();
    if (!utxos || utxos.length === 0) throw new Error("No UTXOs found in getWalletForTx method.");

    if (!collaterals || collaterals.length === 0) throw new Error("No collateral found in getWalletForTx method.");

    if (!walletAddress) throw new Error("No wallet address found in getWalletForTx method.");

    return { utxos, collateral: collaterals[0], walletAddress };
  };

  protected getUtxoForTx = async (address: string, txHash: string) => {
    const utxos: UTxO[] = await this.fetcher.fetchAddressUTxOs(address);
    const utxo = utxos.find(function (utxo: UTxO) {
      return utxo.input.txHash === txHash;
    });

    if (!utxo) throw new Error("No UTXOs found in getUtxoForTx method.");
    return utxo;
  };

  protected readValidator = function (plutus: any, title: string): string {
    const validator = plutus.validators.find(function (validator: any) {
      return validator.title === title;
    });

    if (!validator) {
      throw new Error(`${title} validator not found.`);
    }

    return validator.compiledCode;
  };

  public readPlutusData = (plutusData: string) => {
    try {
      const inputDatum = deserializeDatum(plutusData);
      const partyA = serializeAddressObj(pubKeyAddress(inputDatum.fields[0].fields[0].bytes, inputDatum.fields[0].fields[1].bytes), this.networkId);
      const partyB = serializeAddressObj(pubKeyAddress(inputDatum.fields[1].fields[0].bytes, inputDatum.fields[1].fields[1].bytes), this.networkId);
      return {
        partyA: partyA,
        partyB: partyB,
        content: hexToString(inputDatum.fields[2].bytes),
        submission: hexToString(inputDatum.fields[3].bytes),
        inprogress: inputDatum.fields[4].int !== 0,
        indispute: inputDatum.fields[5].int !== 0,
        amount: inputDatum.fields[6].int / 1_000_000,
      } as Contract;
    } catch {
      return null;
    }
  };

  protected getAddressUTXOAsset = async (address: string, unit: string) => {
    const utxos = await this.fetcher.fetchAddressUTxOs(address, unit);
    return utxos[utxos.length - 1];
  };

  protected getAddressUTXOAssets = async (address: string, unit: string) => {
    return await this.fetcher.fetchAddressUTxOs(address, unit);
  };
}
