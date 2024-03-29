import { Box, Flex, Link, Spacer, Text, VStack } from "@chakra-ui/react"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { colors } from "../utils/themes"

const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      bgGradient={colors.footer[100]}
      color="white"
      py="6"
      px={{ base: "4", md: "8" }}
    >
      <VStack spacing="1" align="center">
        <Flex>
          <Link href="#" isExternal>
            <FaFacebook size="24px" />
          </Link>
          <Spacer mx="2" />
          <Link href="#" isExternal>
            <FaTwitter size="24px" />
          </Link>
          <Spacer mx="2" />
          <Link href="#" isExternal>
            <FaInstagram size="24px" />
          </Link>
        </Flex>
        <Text fontSize="sm" textAlign="center">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </Text>
        <Text fontSize="sm">
          <Link href="#" color="white" fontWeight="bold">
            Privacy Policy
          </Link>{" "}
          &bull;{" "}
          <Link href="#" color="white" fontWeight="bold">
            Terms and Conditions
          </Link>
        </Text>
        <Text fontSize="sm">
          <Link href="#" color="white" fontWeight="bold">
            Download App
          </Link>
        </Text>
      </VStack>
    </Box>
  )
}

export default Footer
