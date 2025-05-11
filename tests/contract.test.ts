/* eslint-disable @typescript-eslint/no-unused-vars */
import { blockfrostProvider } from "@/lib/blockfrost";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { MeshWallet } from "@meshsdk/core";
import { Contract } from "@/contract";

describe("", function () {
  let wallet: MeshWallet;
  beforeEach(async function () {
    wallet = new MeshWallet({
      networkId: 0,
      fetcher: blockfrostProvider,
      submitter: blockfrostProvider,

      key: {
        type: "mnemonic",
        words: process.env.ADMINISTRATOR_PASSPHRASE?.split(" ") || [],
      },
    });
  });
  jest.setTimeout(6000000);

  test("Create", async function () {
    return;
    const contract: Contract = new Contract({
      wallet: wallet,
      fetcher: blockfrostProvider,
    });
    const unsignedTx: string = await contract.create({
      content: "test",
      aParty: "addr_test1qp4ppf2zpcjml4h2sht3u85r3435lr83mj6s2r6jxvnp9dduragctladk6su7yem9nayv9w66ul4e83s0ghdkya4q7xqxndmg6",
      bParty: "addr_test1qp4ppf2zpcjml4h2sht3u85r3435lr83mj6s2r6jxvnp9dduragctladk6su7yem9nayv9w66ul4e83s0ghdkya4q7xqxndmg6",
      amount: 10,
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length).toBe(64);
    });
  });

  test("Cancel", async function () {
    return;
    const contract: Contract = new Contract({
      wallet: wallet,
      fetcher: blockfrostProvider,
    });
    const unsignedTx: string = await contract.cancel({
      txHash: "a3cbc0f69fe6c9513c299f63c5bfff506f5764f494594043d1962111a7524c30",
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length).toBe(64);
    });
  });

  test("Pay", async function () {
    return;
    const contract: Contract = new Contract({
      wallet: wallet,
      fetcher: blockfrostProvider,
    });
    const unsignedTx: string = await contract.pay({
      txHash: "840425ec62326282c2f645fa719763e766d74c96371ebcb150337c4bc3558200",
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length).toBe(64);
    });
  });

  test("Complain", async function () {
    return;
    const contract: Contract = new Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await contract.complain({
      txHash: "1d71894eaec65b39bef53980a8081d1825529b13ac7261bd40b40d11026890c5",
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length).toBe(64);
    });
  });

  test("Confirm", async function () {
    return;
    const contract: Contract = new Contract({
      wallet: wallet,
      fetcher: blockfrostProvider,
    });
    const unsignedTx: string = await contract.confirm({
      txHash: "4f58882cb5a481f7ac4ac6fa2a014c25d62c9cf3ef769f2d447a290d75904a63",
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length).toBe(64);
    });
  });

  test("Decide", async function () {
    // return;
    const contract: Contract = new Contract({
      wallet: wallet,
      fetcher: blockfrostProvider,
    });
    const unsignedTx: string = await contract.decide({
      txHash: "68ec0aea8de440186c4a37613c2a81559fe7560573068cbebb0be2fae92cc29d",
      proportion: 0.25,
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length).toBe(64);
    });
  });
});
