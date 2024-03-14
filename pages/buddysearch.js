import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import Layout from "../components/layout"
import { SearchBar } from "../components/searchbar"
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
      >
        {buddysearch_monologue}
      </Text>
      <Box margin={"auto"} paddingY={["5rem", "5rem", "6rem"]}>
        <SearchBar />
      </Box>
    </Flex>
  )
}

/**This place should be used to get any information from the server side
 * example : we need to get the session token
 * or any thing related to the page  */
export async function getServerSideProps() {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos").then((response) => {
    response.json()
  })

  return { props: { title: "rahul" } }
}

BuddySearch.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
