import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react"

import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"

export default function JobItem(props) {
  //define states here
  const [isloaded, setIsLoaded] = React.useState(false)

  //router
  const router = useRouter()

  useEffect(() => {
    if (!isloaded) {
      console.log("isloaded called")

      setIsLoaded(true)
    }
  })

  //function when clicked

  const handleOnClick = (e) => {
    router.push(`/job/${props.id}`)
  }

  return (
    <Card onClick={handleOnClick} h={["40vh"]} bg={"lightgrey"}>
      <CardBody h={"100%"}>
        <Flex h={"100%"}>
          <Image
            src={props.image_url}
            alt={props.image_desc}
            borderRadius="lg"
            margin={"auto"}
            objectFit={"contain"}
            h={"100%"}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{props.title}</Heading>
            <Text>{props.summary}</Text>
          </Stack>
        </Flex>
      </CardBody>
    </Card>
  )
}
