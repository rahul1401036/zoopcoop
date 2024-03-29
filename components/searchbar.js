import { Search2Icon } from "@chakra-ui/icons"
import { Button, Flex, Input } from "@chakra-ui/react"
import React, { ReactElement, ReactNode } from "react"
import { fontsmooth, themes } from "../utils/themes"

export const SearchBar = (props) => {
  const [location, setLocation] = React.useState("All Locations")
  const [searchword, setSearchword] = React.useState("Any")
  return (
    <>
      <Flex justify="center">
        {props.noloc ? <></> : <Button width={["10vw"]} height={["3rem", "4rem", "5rem"]} borderLeftRadius={"full"} />}
        <Input
          borderRightColor={themes.theme2.colors.primary[500]}
          borderLeftColor={themes.theme2.colors.primary[500]}
          bgColor={"white"}
          placeholder="Type here.."
          width={["50vw"]}
          height={["3rem", "4rem", "5rem"]}
          borderRadius={0}
          fontSize={["1rem", "1.2rem", "1.7rem"]}
          onChange={(e) => setSearchword(e.target.value)}
        />
        <Button
          width={["10vw"]}
          height={["3rem", "4rem", "5rem"]}
          fontSize={[".5rem", "1rem", "1.7rem"]}
          borderRightRadius={"full"}
          onClick={() => props.onClick({ location: location, searchword: searchword })}
          style={fontsmooth.smooth}
          bg={"white"}
        >
          Search
        </Button>
      </Flex>
    </>
  )
}
