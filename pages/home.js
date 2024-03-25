import { Box, Button, Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import Layout from "../components/layout"
import { SearchBar } from "../components/searchbar"

export default function Home(props) {
  const [isloaded, setIsLoaded] = React.useState(false)
  console.log("isloaded called")

  useEffect(() => {
    if (!isloaded) {
      setIsLoaded(true)
    }
  })

  const router = useRouter()
  return (
    <Flex direction={"column"}>
      <Box margin={"auto"} paddingY={["5rem", "5rem", "6rem"]}>
        <SearchBar onClick={(data) => router.push({ pathname: "/jobsearch", query: data })} />
      </Box>

      <Button
        width={["20rem", "30rem", "40rem"]}
        height={["3rem", "4rem", "5rem"]}
        margin={"auto"}
        marginBottom={["2rem", "3rem", "4rem"]}
        fontSize={["2rem", "2.5rem", "3rem"]}
        color="lightgreen"
        borderRadius={"full"}
        onClick={() => router.push("/buddysearch")}
      >
        Look For Buddy
      </Button>
    </Flex>
  )
}

/**This place should be used to get any information from the server side
 * example : we need to get the session token
 * or any thing related to the page  */
// export async function getServerSideProps() {
//   const data = await fetch("https://jsonplaceholder.typicode.com/todos").then((response) => {
//     response.json()
//   })

//   return { props: { title: "rahul" } }
// }

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
