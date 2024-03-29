import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
} from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"

import { useRouter } from "next/router"
import React, { useState } from "react"
import FormLabelInput from "./formlabelinput"
import { geturlFormdata, siterooturl } from "../constants"

export default function Signupcomponent(props) {
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirm_password, setConfirmPassword] = React.useState("")
  const router = useRouter()

  const [show, setShow] = useState(true)

  const validateForm = () => {
    return email.length > 0 && (phone.length >= 10 || phone.length == 0) && password.length > 0
  }

  const handleSubmit = (event) => {
    console.log(email, password, confirm_password, phone)
    if (phone.length > 0 && phone.length < 10) {
      //popup
    }
    event.preventDefault()
    var urlForm
    if (email.length == 0) {
      urlForm = geturlFormdata("user", "signup", {}, { phone: phone, password: password })
    } else if (phone.length == 0) {
      urlForm = geturlFormdata("user", "signup", {}, { mail: email, password: password })
    } else {
      urlForm = geturlFormdata("user", "signup", {}, { mail: email, phone: phone, password: password })
    }

    if (password !== confirm_password) {
      setShow(true)
      return
    }
    try {
      // postsignup(urlForm.url, urlForm.formdata).then(() => {
      //   router.push("/info")
      // })
    } catch (e) {}
  }

  const handleEmailChange = (val) => {
    setEmail(val)
  }
  const handlePhoneChange = (val) => {
    setPhone(val)
  }
  const handlePasswordChange = (val) => {
    setPassword(val)
  }
  const handleConfirmPasswordChange = (val) => {
    setConfirmPassword(val)
  }

  return (
    <Flex justifyContent={"center"} bgColor={"white"} align="center" margin="auto" mt={[10]} borderRadius={10}>
      <Flex direction={"column"} justifyContent={"center"} mb={6} flex={1} mx={10}>
        <Heading mx={"auto"} mb={6}>
          Sign up
        </Heading>
        <Flex direction={"column"} justifyContent={"center"} mb={6} flex={1}>
          <Flex direction={"row"} justifyContent={"center"} mb={6} flex={1}>
            <Flex flex={1}>
              <Text h={"100%"} flex={1}>
                Email
              </Text>
            </Flex>
            <Flex flex={1}>
              <Input
                inputtype="email"
                label="Email*"
                placeholder="abc@xyz.uvw"
                onChange={(e) => handleEmailChange(e)}
              />
            </Flex>
          </Flex>

          <Flex direction={"row"} justifyContent={"center"} mb={6} flex={1}>
            <Flex flex={1}>
              <Text h={"100%"} flex={1}>
                password
              </Text>
            </Flex>
            <Flex flex={1}>
              <Input
                inputtype="password"
                label="Password"
                placeholder="type your password"
                onChange={(e) => handlePasswordChange(e)}
              />
            </Flex>
          </Flex>

          <Flex direction={"row"} justifyContent={"center"} mb={6} flex={1}>
            <Flex flex={1}>
              <Text h={"100%"} flex={1}>
                confirm password
              </Text>
            </Flex>
            <Flex flex={1}>
              <Input
                inputtype="password"
                label="Password"
                placeholder="type your password"
                onChange={(e) => handlePasswordChange(e)}
              />
            </Flex>
          </Flex>
          <Button className="btn" onClick={() => handleSubmit(email, password)} w={["70vw", "60vw", "50vw"]}>
            Sign up
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
