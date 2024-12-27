import { WalletServiceClientImpl } from "@/proto/wallet/v1/wallet";
import { UserServiceClientImpl } from "@/proto/user/v1/user";

import { rpc } from "@/rpc";

const walletServiceClient = new WalletServiceClientImpl(rpc);
const userServiceClient = new UserServiceClientImpl(rpc);

const main = async () => {
  const response = await walletServiceClient.Balance({
    address: "x",
  });
  console.log(response);
};

main();

const userMain = async () => {
  const createRes = await userServiceClient.CreateUser({
    email: "email",
    password: "1234",
    username: "monster",
  });
  console.log(createRes);
};

userMain();
