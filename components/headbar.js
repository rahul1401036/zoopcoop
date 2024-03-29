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
import { RxArrowDown, RxArrowRight, RxArrowUp, RxDropdownMenu } from "react-icons/rx"
import Logo from "./logo"
import { colors, fontsmooth, themes } from "../utils/themes"

function DrawerWindow() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const router = useRouter()
  return (
    <>
      <Button ref={btnRef} onClick={onOpen} bgColor={"white"}>
        <Icon as={RxArrowRight} color={"blue"} boxSize={7}></Icon>
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent w={["50vw"]}>
          <DrawerCloseButton />
          <DrawerHeader style={fontsmooth.smooth}>ZoopCoop</DrawerHeader>

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
    <NavBarContainer {...props} h={["10vh", "12vh", "15vh"]} bgColor={"white"}>
      <DrawerWindow />
      <LogoItem />
      <MenuToggle toggle={toggle} isOpen={isOpen} bgColor={"white"} />
      <MenuLinks isOpen={isOpen} bgColor={"white"} />
    </NavBarContainer>
  )
}

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} bgColor={"white"} m={2} onClick={toggle}>
      {isOpen ? (
        <Icon as={RxArrowUp} color={"blue"} boxSize={7}></Icon>
      ) : (
        <Icon as={RxDropdownMenu} color={"blue"} boxSize={7}></Icon>
      )}
    </Box>
  )
}

const LogoItem = () => {
  return (
    <Link href={"/home"} h={"100%"} alignContent={"center"} justifyContent={"center"}>
      <Logo width={[20]} style={fontsmooth.smooth}></Logo>
    </Link>
  )
}

const LoginSignup = (props) => {
  const router = useRouter()

  if (!props.login) {
    return (
      <Flex pb={[2, 3, 0]}>
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
      <Flex pb={[2, 3, 0]}>
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
    <Button bgColor={"white"} onClick={props.onClick} style={fontsmooth.smooth} border={"solid 1px"}>
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
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      bgColor={"white"}
      flexBasis={{ base: "100%", md: "auto" }}
    >
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
      pt={[2, 4, 6]}
      top={0}
      position="sticky"
      zIndex={10}
      bgGradient={colors.headbar[100]}
      color={"white"}
      borderBottom={"1px solid #f0f0f0"}
      {...props}
    >
      {children}
    </Flex>
  )
}

export default NavBar
