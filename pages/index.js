import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react"
import React, { useEffect } from "react"
import Layout from "../components/layout"

function App() {
  const [isloaded, setIsLoaded] = React.useState(false)

  useEffect(() => {
    if (!isloaded) {
      console.log("isloaded called")

      setIsLoaded(true)
    }
  })

  return (
    <Center height="100vh">
      <Box textAlign="center">
        <Heading size="4xl" color={"blue.500"}>
          Coming Soon
        </Heading>
        <Text fontSize="2xl" mt="4" color={"white"}>
           We are working on it! 
        </Text>
        <Flex justifyContent="center" mt="8"></Flex>
      </Box>
    </Center>
  )
}

export default App


