import { Box, Button, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import Layout from "../components/layout"
import Logincomponent from "../components/logincomponent"
import Signupcomponent from "../components/signupcomponent"

export default function Login(props) {
  const [isloaded, setIsLoaded] = React.useState(false)

  useEffect(() => {
    if (!isloaded) {
      console.log("isloaded called")

      setIsLoaded(true)
    }
  })

  const router = useRouter()
  return (
    <>
      <Logincomponent />
      <Box padding={["5rem", "5rem", "6rem"]} textAlign={"center"}>
        <Text
          margin={"auto"}
          fontSize={["1rem", "1rem", "1rem"]}
          padding={["1rem", "1rem", "1rem"]}
          marginX={["2rem", "2.5rem", "auto"]}
          textAlign={"center"}
        >
          New Member ? Create an account
        </Text>
        <Button onClick={() => router.push("/signup")} margin={"auto"} colorScheme="blue">
          Sign UP
        </Button>
      </Box>
    </>
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

Login.getLayout = function getLayout(page) {
  return page
}
