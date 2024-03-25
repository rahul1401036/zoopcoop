// this file will let a employer create a test for a candidate and also helps in getting the results

import Head from "next/head"
import Layout from "../../components/layout"
import PeerJSComponent from "../../components/peerJSComponent"

export default function Createtest() {
  return (
    <>
      <Head>
        <title>Learning bee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Createtest</h1>
      <PeerJSComponent />
    </>
  )
}

Createtest.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
