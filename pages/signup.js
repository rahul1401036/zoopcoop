import { Box, Button, FormControl, FormLabel, Heading, Input, Text, VStack, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useState } from "react"

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
    <Box w="100%" p={4} maxWidth="500px" mx="auto" textAlign={"center"}>
      <Heading mb={6}>Sign Up</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="flex-start">
          <FormControl isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Sign Up
          </Button>
        </VStack>
      </form>
      <Box padding={["5rem", "5rem", "6rem"]}>
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
    </Box>
  )
}

export default SignupPage
