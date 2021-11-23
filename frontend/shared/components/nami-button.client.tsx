import React, { useEffect, useState } from "react";
import { useNamiWalletContext } from "../context/nami-wallet";
import styles from "../../styles/Home.module.css";
import { Button } from "./button";
import client from "../client";
import { useCallback } from "react";

export const NamiButton = () => {
  const { wallet, isEnabled, setIsEnabled } = useNamiWalletContext();

  useEffect(() => {
    !!wallet
      ? wallet?.isEnabled().then((enabled: boolean) => setIsEnabled(enabled))
      : setIsEnabled(false);

  }, [isEnabled, setIsEnabled, wallet]);

  const login = useCallback(async () => {
    if (!wallet) return;
    const res = await client.login(wallet);
    console.log(res);
  }, [wallet]);

  const enable = useCallback(async () => {
    if (!wallet) return;
    await wallet.enable();
  }, [wallet]);

  return (
    <>
      {wallet ? (
        isEnabled ? (
          <Button className={styles.button} text={"Login"} onClick={login} />
        ) : (
          <Button
            className={styles.button}
            onClick={enable}
            text={"Enable Nami Wallet"}
          />
        )
      ) : (
        "Please install nami wallet"
      )}
    </>
  );
};
