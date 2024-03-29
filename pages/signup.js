import { Box, Button, Flex, FormLabel, Heading, Input, Text, VStack, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { Sign } from "crypto"
import Layout from "../components/layout"
import Signupcomponent from "../components/signupcomponent"

const SignupPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const toast = useToast()

  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()
    // Implement your signup logic here. For now, we'll just show a success message.
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
    // Clear form fields after submission
    setEmail("")
    setPassword("")
    setName("")
  }

  return (
    <Flex direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <Flex direction={"column"} m={"30"} bg={"white"} w={"fit-content"} borderRadius={"20"}>
        <Signupcomponent />
        <Box padding={["1rem", "2rem", "3rem"]} textAlign={"center"}>
          <Text
            margin={"auto"}
            fontSize={["1rem", "1rem", "1rem"]}
            padding={["1rem", "1rem", "1rem"]}
            marginX={["2rem", "2.5rem", "auto"]}
            textAlign={"center"}
          >
            if you already have an account
          </Text>
          <Button onClick={() => router.push("/login")} margin={"auto"} colorScheme="blue">
            Login
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}

export default SignupPage

SignupPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
