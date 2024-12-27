import { WalletServiceClientImpl } from "@/proto/wallet/v1/wallet";
import { rpc } from "@/rpc";

const walletServiceClient = new WalletServiceClientImpl(rpc);

const main = async () => {
  const response = await walletServiceClient.Balance({
    address: "x",
  });
  console.log(response);
  const transferRes = await walletServiceClient.Transfer({
    amount: 100,
    from: "user",
    to: "admin",
  });
  console.log(transferRes);
};

main();
