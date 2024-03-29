import { CloseIcon } from "@chakra-ui/icons"
import { Box, HStack, IconButton, Text } from "@chakra-ui/react"
import React from "react"

const Notification = (props) => {
  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <HStack justify="space-between">
        <Text fontWeight="bold">{props.title}</Text>
        <IconButton icon={<CloseIcon />} variant="ghost" size="sm" aria-label="Close" />
      </HStack>
      <Text mt={2}>{props.message}</Text>
    </Box>
  )
}

export default Notification
