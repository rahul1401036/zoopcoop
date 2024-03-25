import { Flex, Tag, TagLabel } from "@chakra-ui/react"
import React from "react"

const Tabber = () => {
  const buttons = [
    "Button 1",
    "Button 2",
    "Button 3",
    "Button 1",
    "Button 2",
    "Button 3",
    "Button 1",
    "Button 2",
    "Button 3",
    "Button 1",
    "Button 1",
    "Button 2",
    "Button 3",
    "Button 2",
    "Button 3",
    "Button 1",
    "Button 2",
    "Button 3",
    "Button 1",
    "Button 2",
    "Button 3",
    "Button 1",
    "Button 2",
    "Button 3",
  ]

  const handleClick = (button) => {
    console.log(`Clicked ${button}`)
    // Add your logic here
  }

  return (
    <Flex direction="row" align="center" flexWrap={"wrap"}>
      {buttons.map((button, index) => (
        <Tag
          key={index}
          onClick={() => handleClick(button)}
          cursor="pointer"
          variant="outline"
          colorScheme="teal"
          size="md"
          mr={2}
          mb={2}
        >
          <TagLabel>{button}</TagLabel>
        </Tag>
      ))}
    </Flex>
  )
}

export default Tabber
