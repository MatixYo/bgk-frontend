import type { NextPage } from "next";
import Head from "next/head";
import Searchbar from "@components/Searchbar";
import Image from "next/image";
import { motion } from "framer-motion";
import cn from "classnames";
import s from "@components/Results/Result.module.css";

const Home: NextPage = () => {
  return (
    <div className="bg-blue-100">
      <Head>
        <title>Li3htning - delivery-financing opportunities</title>
        <meta name="description" content="BGK" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex items-center justify-center">
        <div className={cn(s.container, "-mt-12")}>
          <motion.div className={s.logo} layoutId="logo">
            <Image src="/logo.png" alt="logo" width={302} height={48} />
          </motion.div>
          <Searchbar />
        </div>
      </main>
    </div>
  );
};

export default Home;
