import { Flex } from "@chakra-ui/react"
import Head from "next/head"
import Footer from "./footer"
import Header from "../components/headbar"
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Learning bee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction={"column"} minH={"100vh"}>
        <Header />
        <main>{children}</main>
        <Flex direction={"column-reverse"} flex={1}>
          <Footer />
        </Flex>
      </Flex>
    </>
  )
}
