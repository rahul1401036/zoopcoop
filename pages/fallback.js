import { Flex, Heading } from "@chakra-ui/react"
import React from "react"
import Layout from "../components/layout"

const FallbackPage = () => {
  return (
    <Flex direction={"column"} textAlign={"center"} mt={"25vh"} alignContent={"center"}>
      <Heading color={"white"} fontSize={[50]}>
        404
      </Heading>

      <Heading color={"white"} fontSize={[50]}>
        Page not found
      </Heading>
    </Flex>
  )
}

export default FallbackPage

FallbackPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
