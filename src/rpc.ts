import * as grpc from "@grpc/grpc-js";
import { UnaryCallback } from "@grpc/grpc-js/build/src/client";

const conn = new grpc.Client(
  "localhost:8000",
  grpc.credentials.createInsecure()
);

type RpcImpl = (
  service: string,
  method: string,
  data: Uint8Array
) => Promise<Uint8Array>;

const sendRequest: RpcImpl = (service, method, data) => {
  // Conventionally in gRPC, the request path looks like
  //   "package.names.ServiceName/MethodName",
  // we therefore construct such a string
  const path = `/${service}/${method}`;

  return new Promise((resolve, reject) => {
    // makeUnaryRequest transmits the result (and error) with a callback
    // transform this into a promise!
    const resultCallback: UnaryCallback<any> = (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    };

    conn.makeUnaryRequest(
      path,
      (d) => Buffer.from(d),
      (d) => d,
      data,
      resultCallback
    );
  });
};

export const rpc = { request: sendRequest };
