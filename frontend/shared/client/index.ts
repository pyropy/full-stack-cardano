import axios from "axios";
// @ts-ignore
import Web3Token from "web3-cardano-token/dist/browser";
import toHex from 'to-hex';
import { Wallet } from "../context/nami-wallet";

const login = async (wallet: Wallet) => {
  const encodedAddress = (await wallet.getUsedAddresses())[0];
  // @ts-ignore
  const token = await Web3Token.sign((msg) => wallet.signData(encodedAddress, toHex(msg)), "1d");

  const res = axios.get(
    "http://localhost:4001/api/auth",
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return res;
};

const client = {
  login,
};

export default client;
