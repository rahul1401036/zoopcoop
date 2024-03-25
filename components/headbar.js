import { Box, Button, Flex, Link, Stack, Text } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Input,
  VStack,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { MdDragHandle, MdMessage, MdNotifications, MdSearch } from "react-icons/md"
import Logo from "./logo"
import { colors } from "../utils/themes"

function DrawerWindow() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const router = useRouter()
  return (
    <>
      <Button ref={btnRef} colorScheme="transparent" onClick={onOpen}>
        <Icon as={MdDragHandle}>
          <div></div>
        </Icon>
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent w={["50vw"]}>
          <DrawerCloseButton />
          <DrawerHeader>ZoopCoop</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Button
                to="/home"
                variant="ghost"
                onClick={() => {
                  router.push("/home")
                  onClose()
                }}
              >
                Home
              </Button>
              <Button
                to="/buddy"
                variant="ghost"
                onClick={() => {
                  router.push("/buddy")
                  onClose()
                }}
              >
                Buddy
              </Button>
              <Button
                to="/jobsplane"
                variant="ghost"
                onClick={() => {
                  router.push("/jobsplane")
                  onClose()
                }}
              >
                Myjobs
              </Button>
              <Button
                to="/notifications"
                variant="ghost"
                onClick={() => {
                  router.push("/notifications")
                  onClose()
                }}
              >
                notifications
              </Button>

              {/* Add more navigation links as needed */}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <VStack spacing={4} align="stretch">
              <Button colorScheme="red" w={"100%"}>
                Logout
              </Button>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <NavBarContainer {...props} h={["15vh"]}>
      <DrawerWindow />
      <LogoItem />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  )
}

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
)

const MenuIcon = () => (
  <svg width="24px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="white">
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
)

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  )
}

const LogoItem = () => {
  return (
    <Link href={"/home"}>
      <Logo w="100px" color={["white", "white"]}></Logo>
    </Link>
  )
}

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest} align={"center"} paddingTop={["15px", "15px", "10px", "10px"]}>
        {children}
      </Text>
    </Link>
  )
}

const LoginSignup = (props) => {
  const router = useRouter()

  if (!props.login) {
    return (
      <Flex>
        <Stack
          spacing={[6, 8, 10]}
          align="center"
          justify={["flex-end", "flex-end", "center", "center"]}
          direction={["column", "column", "row", "row"]}
          pt={[0, 0, 0, 0]}
        >
          <Button to="/login" onClick={() => router.push("/login")}>
            Login
          </Button>
          <Button to="/signup" onClick={() => router.push("/signup")}>
            Sign Up
          </Button>
        </Stack>
      </Flex>
    )
  } else {
    return (
      <Flex>
        <Stack
          spacing={[6, 8, 10]}
          align="center"
          justify={["flex-end", "flex-end", "center", "center"]}
          direction={["column", "column", "row", "row"]}
          pt={[0, 0, 0, 0]}
        >
          {router.asPath === "/buddy" ? (
            <></>
          ) : (
            <LinksButt href={"/buddy"} label="buddy" hideicon onClick={() => router.push("/buddy")} />
          )}
          {/* { router.asPath === "/notifications" ?<></>:<LinksButt href={"/notifications"} label="notifications" as={MdNotifications} onClick={()=> router.push("/notifications")} />}
          { router.asPath === "/messages" ?<></>:<LinksButt href={"/messages"} label="messages" as={MdMessage} onClick={()=> router.push("/messages")} />} */}
          {router.asPath === "/jobsplane" ? (
            <></>
          ) : (
            <LinksButt href={"/jobsplane"} label="myjobs" hideicon onClick={() => router.push("/jobsplane")} />
          )}

          <Avatar name={props.name} src={props.imageurl} onClick={() => router.push("/profile")} />
        </Stack>
      </Flex>
    )
  }
}

const LinksButt = (props) => {
  return (
    <Button bgColor={"white"} onClick={props.onClick}>
      {!props.hideicon ? <Icon as={props.as} /> : <></>}
      <label>{props.label}</label>
    </Button>
  )
}
const MenuLinks = ({ isOpen }) => {
  const [isLogin, setIsLogin] = React.useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      console.log(token)
      if (token) {
        setIsLogin(true)
      }
    }
    console.log("menu links")
  }, [isLogin])
  return (
    <Box display={{ base: isOpen ? "block" : "none", md: "block" }} flexBasis={{ base: "100%", md: "auto" }}>
      <Stack
        spacing={[6, 8, 10]}
        align="center"
        justify={["flex-end", "flex-end", "center", "center"]}
        direction={["column", "column", "row", "row"]}
        pt={[0, 0, 0, 0]}
      >
        <LoginSignup login={isLogin} />
      </Stack>
    </Box>
  )
}

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={[4, 6, 6, 6]}
      top={0}
      position="sticky"
      zIndex={10}
      bgGradient={colors.headbar[100]}
      color={"white"}
      {...props}
    >
      {children}
    </Flex>
  )
}

export default NavBar
