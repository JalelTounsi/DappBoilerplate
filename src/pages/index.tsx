import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="">RainbowKit</a> + <a href="">wagmi</a> +{" "}
          <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>
      </main>
    </div>
  );
};

export default Home;
