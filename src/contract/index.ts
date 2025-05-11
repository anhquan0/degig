import {
  deserializeAddress,
  deserializeDatum,
  hexToString,
  mConStr,
  mConStr0,
  mConStr1,
  pubKeyAddress,
  scriptAddress,
  serializeAddressObj,
  UTxO,
} from "@meshsdk/core";
import { MeshAdapter } from "./mesh";
import { ADMINISTRATOR_WALLET_ADDRESS, appNetwork } from "@/constants/contract";

export class Contract extends MeshAdapter {
  async create({ content, aParty, bParty, amount }: { content: string; aParty: string; bParty: string; amount: number }): Promise<string> {
    const { utxos, collateral, walletAddress } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder
      .spendingPlutusScriptV3()
      .txOut(this.contractAddress as string, [
        {
          unit: "lovelace",
          quantity: String(amount * 1_000_000),
        },
      ])
      .txOutInlineDatumValue(
        mConStr0([
          mConStr0([deserializeAddress(aParty).pubKeyHash, deserializeAddress(aParty).stakeCredentialHash]),
          mConStr0([deserializeAddress(bParty).pubKeyHash, deserializeAddress(bParty).stakeCredentialHash]),
          content,
          "",
          0,
          0,
          Number(amount * 1_000_000),
        ]),
      )
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  }

  async confirm({ txHash }: { txHash: string }) {
    const { utxos, collateral, walletAddress } = await this.getWalletForTx();
    const utxosTxHash = await this.fetcher.fetchUTxOs(txHash);
    const utxo = utxosTxHash.find((utxo: UTxO) => {
      return utxo.output.plutusData;
    });

    if (!utxo) {
      throw new Error("UTxO not found");
    }

    const datum = deserializeDatum(utxo?.output?.plutusData as string);

    const aParty = serializeAddressObj(pubKeyAddress(datum.fields[0].fields[0].bytes, datum.fields[0].fields[1].bytes), this.networkId);
    const bParty = serializeAddressObj(pubKeyAddress(datum.fields[1].fields[0].bytes, datum.fields[1].fields[1].bytes), this.networkId);

    const unsignedTx = this.meshTxBuilder
      .spendingPlutusScriptV3()
      .txIn(utxo.input.txHash, utxo.input.outputIndex, utxo.output.amount, utxo.output.address)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr0([]))
      .txInScript(this.contractScriptCbor as string)
      .txOut(this.contractAddress as string, [{ unit: "lovelace", quantity: String(datum.fields[6].int) }])
      .txOutInlineDatumValue(
        mConStr0([
          mConStr0([deserializeAddress(aParty).pubKeyHash, deserializeAddress(aParty).stakeCredentialHash]),
          mConStr0([deserializeAddress(bParty).pubKeyHash, deserializeAddress(bParty).stakeCredentialHash]),
          hexToString(datum.fields[2].bytes),
          hexToString(datum.fields[3].bytes),
          1,
          0,
          Number(datum.fields[6].int),
        ]),
      )
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  }

  async pay({ txHash }: { txHash: string }) {
    const { utxos, collateral, walletAddress } = await this.getWalletForTx();
    const utxosTxHash = await this.fetcher.fetchUTxOs(txHash);
    const utxo = utxosTxHash.find((utxo: UTxO) => {
      return utxo?.output?.plutusData;
    });

    if (!utxo) {
      throw new Error("UTxO not found");
    }

    const datum = deserializeDatum(utxo?.output?.plutusData as string);
    const bParty = serializeAddressObj(pubKeyAddress(datum.fields[1].fields[0].bytes, datum.fields[1].fields[1].bytes), this.networkId);

    const escrowAmount = datum.fields[6].int;

    const unsignedTx = this.meshTxBuilder
      .spendingPlutusScriptV3()
      .txIn(utxo.input.txHash, utxo.input.outputIndex, utxo.output.amount, utxo.output.address)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr1([]))
      .txInScript(this.contractScriptCbor as string)
      .txOut(ADMINISTRATOR_WALLET_ADDRESS as string, [{ unit: "lovelace", quantity: String(1_000_000) }])
      .txOut(bParty as string, [{ unit: "lovelace", quantity: String(escrowAmount) }])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  }

  async dispute({ txHash }: { txHash: string }) {
    const { utxos, collateral, walletAddress } = await this.getWalletForTx();
    const utxosTxHash = await this.fetcher.fetchUTxOs(txHash);
    const utxo = utxosTxHash.find((utxo: UTxO) => {
      return utxo.output.plutusData;
    });

    if (!utxo) {
      throw new Error("UTxO not found");
    }

    const datum = deserializeDatum(utxo?.output?.plutusData as string);

    const aParty = serializeAddressObj(pubKeyAddress(datum.fields[0].fields[0].bytes, datum.fields[0].fields[1].bytes), this.networkId);
    const bParty = serializeAddressObj(pubKeyAddress(datum.fields[1].fields[0].bytes, datum.fields[1].fields[1].bytes), this.networkId);
    const escrowAmount = datum.fields[5].int;
    const unsignedTx = this.meshTxBuilder
      .spendingPlutusScriptV3()
      .txInInlineDatumPresent()
      .txIn(utxo.input.txHash, utxo.input.outputIndex, utxo.output.amount, utxo.output.address)
      .txInScript(this.contractScriptCbor as string)
      .txOut(ADMINISTRATOR_WALLET_ADDRESS as string, [{ unit: "lovelace", quantity: String(1_000_000) }])
      .txOut(this.contractAddress as string, [{ unit: "lovelace", quantity: datum.fields[5].int }])
      .txOutInlineDatumValue(
        mConStr0([
          mConStr0([deserializeAddress(aParty).pubKeyHash, deserializeAddress(aParty).stakeCredentialHash]),
          mConStr0([deserializeAddress(bParty).pubKeyHash, deserializeAddress(bParty).stakeCredentialHash]),
          hexToString(datum.fields[2].bytes),
          hexToString(datum.fields[3].bytes),
          1,
          1,
          Number(escrowAmount),
        ]),
      )
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  }

  async decide({ txHash, proportion }: { txHash: string; proportion: number }) {
    const { utxos, collateral, walletAddress } = await this.getWalletForTx();
    const utxosTxHash = await this.fetcher.fetchUTxOs(txHash);
    const utxo = utxosTxHash.find((utxo: UTxO) => {
      return utxo.output.plutusData;
    });

    if (!utxo) {
      throw new Error("UTxO not found");
    }

    const datum = deserializeDatum(utxo?.output?.plutusData as string);

    const aPartyAddress = serializeAddressObj(scriptAddress(datum.fields[0].fields[0].bytes, datum.fields[0].fields[1].bytes, false), 0);
    const bPartyAddress = serializeAddressObj(scriptAddress(datum.fields[1].fields[0].bytes, datum.fields[1].fields[1].bytes, false), 0);

    const escrowAmount = datum.fields[6].int;
    const unsignedTx = this.meshTxBuilder
      .spendingPlutusScriptV3()
      .txIn(utxo.input.txHash, utxo.input.outputIndex, utxo.output.amount, utxo.output.address)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr(5, []))
      .txInScript(this.contractScriptCbor as string)
      .txOut(ADMINISTRATOR_WALLET_ADDRESS as string, [{ unit: "lovelace", quantity: String(1_000_000) }])
      .txOut(bPartyAddress as string, [{ unit: "lovelace", quantity: String(Number(escrowAmount * proportion)) }])
      .txOut(aPartyAddress as string, [{ unit: "lovelace", quantity: String(Number(escrowAmount * (1 - proportion))) }])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  }

  async cancel({ txHash }: { txHash: string }) {
    const { utxos, collateral, walletAddress } = await this.getWalletForTx();
    const utxosTxHash = await this.fetcher.fetchUTxOs(txHash);
    const utxo = utxosTxHash.find((utxo: UTxO) => {
      return utxo.output.plutusData;
    });

    if (!utxo) {
      throw new Error("UTxO not found");
    }

    const datum = deserializeDatum(utxo?.output?.plutusData as string);

    const aPartyAddress = serializeAddressObj(scriptAddress(datum.fields[1].fields[0].bytes, datum.fields[1].fields[1].bytes, false), 0);

    const escrowAmount = datum.fields[6].int;
    const unsignedTx = this.meshTxBuilder
      .spendingPlutusScriptV3()
      .txIn(utxo.input.txHash, utxo.input.outputIndex, utxo.output.amount, utxo.output.address)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr1([]))
      .txInScript(this.contractScriptCbor as string)
      .txOut(aPartyAddress as string, [{ unit: "lovelace", quantity: String(Number(escrowAmount)) }])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  }

  async submit({ txHash, submission }: { txHash: string; submission: string }) {
    const { utxos, collateral, walletAddress } = await this.getWalletForTx();
    const utxosTxHash = await this.fetcher.fetchUTxOs(txHash);
    const utxo = utxosTxHash.find((utxo: UTxO) => {
      return utxo.output.plutusData;
    });

    if (!utxo) {
      throw new Error("UTxO not found");
    }

    const datum = deserializeDatum(utxo?.output?.plutusData as string);

    const aParty = serializeAddressObj(pubKeyAddress(datum.fields[0].fields[0].bytes, datum.fields[0].fields[1].bytes), this.networkId);
    const bParty = serializeAddressObj(pubKeyAddress(datum.fields[1].fields[0].bytes, datum.fields[1].fields[1].bytes), this.networkId);

    const unsignedTx = this.meshTxBuilder
      .spendingPlutusScriptV3()
      .txIn(utxo.input.txHash, utxo.input.outputIndex, utxo.output.amount, utxo.output.address)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr0([]))
      .txInScript(this.contractScriptCbor as string)
      .txOut(this.contractAddress as string, [{ unit: "lovelace", quantity: String(datum.fields[6].int) }])
      .txOutInlineDatumValue(
        mConStr0([
          mConStr0([deserializeAddress(aParty).pubKeyHash, deserializeAddress(aParty).stakeCredentialHash]),
          mConStr0([deserializeAddress(bParty).pubKeyHash, deserializeAddress(bParty).stakeCredentialHash]),
          hexToString(datum.fields[2].bytes),
          submission,
          1,
          0,
          datum.fields[6].int,
        ]),
      )
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  }
}
