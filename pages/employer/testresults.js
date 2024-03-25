// this file will let a employer create a test for a candidate and also helps in getting the results

import Head from "next/head"
import { useSearchParams } from "next/navigation"
import Layout from "../../components/layout"

export default function Testresults(props) {
  const searchparams = useSearchParams()

  //get the data for the particular test from the database

  return (
    <>
      <Head>
        <title>Learning bee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Testresults : {searchparams.get("testid")}</h1>
    </>
  )
}

Testresults.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
