import { MeshAdapter } from "@/contract/mesh";
import { ApiResponseInterface, Contract } from "@/interface";
import { blockfrostProvider } from "@/lib/blockfrost";
import { parseError } from "@/utils/parse-error";
import { isNil } from "lodash";

export async function GET() {
  try {
    const mesh = new MeshAdapter({});
    const utxos = await blockfrostProvider.fetchAddressUTxOs(mesh.contractAddress);
    const result: Contract[] = utxos
      .map((utxo) => {
        const datum = mesh.readPlutusData(utxo.output.plutusData as string);
        if (isNil(datum)) {
          return null;
        }
        return {
          ...datum,
          txhash: utxo.input.txHash,
        };
      })
      .filter((datum) => !isNil(datum));

    const response: ApiResponseInterface = {
      statusCode: 200,
      message: "Contracts fetched successfully",
      data: result,
    };
    return Response.json(response, { status: 200 });
  } catch (e) {
    const response: ApiResponseInterface = {
      statusCode: 500,
      message: parseError(e),
      data: null,
    };

    return Response.json(response, { status: 500 });
  }
}
