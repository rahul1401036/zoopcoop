import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import Layout from "../components/layout"
import { SearchBar } from "../components/searchbar"
import Tabber from "../components/tabber"
import { buddysearch_monologue } from "../constants"

export default function BuddySearch(props) {
  const [isloaded, setIsLoaded] = React.useState(false)

  useEffect(() => {
    if (!isloaded) {
      console.log("isloaded called")

      setIsLoaded(true)
    }
  })

  const router = useRouter()
  return (
    <Flex direction={"column"}>
      <Text
        margin={"auto"}
        fontSize={["2rem", "2.5rem", "3rem"]}
        marginX={["2rem", "2.5rem", "auto"]}
        textAlign={"center"}
        color={"white"}
      >
        {buddysearch_monologue}
      </Text>

      <Box margin={"auto"} paddingY={["5rem", "5rem", "6rem"]}>
        <Text
          margin={"auto"}
          fontSize={["1rem", "1.5rem", "2rem"]}
          marginX={["2rem", "2.5rem", "auto"]}
          textAlign={"center"}
          color={"white"}
        >
          I am interviewing for
        </Text>
        <SearchBar onClick={(data) => router.push({ pathname: "/buddy", query: data })} noloc={true} />
      </Box>
      <Tabber />
    </Flex>
  )
}

/**This place should be used to get any information from the server side
 * example : we need to get the session token
 * or any thing related to the page  */
export async function getServerSideProps() {
  return { props: { title: "rahul" } }
}

BuddySearch.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
