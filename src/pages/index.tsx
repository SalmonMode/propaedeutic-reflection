import type { NextPage } from "next";
import Head from "next/head";

import Landing from "../features/Landing";

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Propaedeutic Reflection</title>
      </Head>
      <header>
        <Landing />
      </header>
    </div>
  );
};

export default IndexPage;
