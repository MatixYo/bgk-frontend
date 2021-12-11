import type { NextPage } from "next";
import Head from "next/head";
import Searchbar from "../components/Searchbar";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { q, sort } = router.query;

  return (
    <div className="bg-blue-100">
      <Head>
        <title>Wyniki wyszukiwania</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen p-32">
        <Searchbar className="mx-auto" />
      </main>
    </div>
  );
};

export default Home;