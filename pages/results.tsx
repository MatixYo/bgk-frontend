import type { NextPage } from "next";
import Head from "next/head";
import Searchbar from "@components/Searchbar";
import { useRouter } from "next/router";
import ResultsList from "@components/Results/ResultsList";
import Image from "next/image";
import Link from "next/link";
import s from "@components/Results/Result.module.css";
import { motion } from "framer-motion";
import cn from "classnames";

const Home: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;

  return (
    <div className="bg-blue-100">
      <Head>
        <title>Search results: {q}</title>
        <meta name="description" content="BGK" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={cn("min-h-screen", s.container)}>
        <Link href="/">
          <motion.a
            className="mb-8 flex justify-center cursor-pointer"
            layoutId="logo"
          >
            <Image src="/logo.png" alt="logo" width={302} height={48} />
          </motion.a>
        </Link>
        <Searchbar className="mx-auto" />
        <ResultsList />
      </main>
    </div>
  );
};

export default Home;
