import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useEditableControls,
} from "@chakra-ui/react"
import React from "react"
import Layout from "../components/layout"

function EditableControls() {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls()

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
    </Flex>
  )
}

const EditableText = (props) => {
  return (
    <Editable
      defaultValue={props.default}
      fontSize="2xl"
      isPreviewFocusable={props.isPreviewFocusable}
      value={props.value}
    >
      <Flex>
        <EditablePreview />
        <EditableInput />
        <EditableControls />
      </Flex>
    </Editable>
  )
}

export default function ProfileHome(props) {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack spacing={6} align="center">
          <Avatar size="xl" src="https://avatars.githubusercontent.com/u/37272663?v=4" alt="Avatar Alt" />
          <EditableText defaultValue="John Doe" fontSize="2xl" isPreviewFocusable={false} value={"John Doe"} />

          <EditableText
            defaultValue="Full Stack Developer"
            fontWeight="bold"
            isPreviewFocusable={false}
            value={"Full Stack Developer"}
          />

          <Stack direction="row" spacing={4}>
            <Badge px={2} py={1} bg="gray.50" fontWeight="400">
              #React
            </Badge>
            <Badge px={2} py={1} bg="gray.50" fontWeight="400">
              #Node.js
            </Badge>
            <Badge px={2} py={1} bg="gray.50" fontWeight="400">
              #JavaScript
            </Badge>
          </Stack>
        </Stack>
        <Stack spacing={10}>
          <Stack spacing={4}>
            <Text fontSize="xl" fontWeight="500">
              About Me
            </Text>
            <Editable
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              isPreviewFocusable={false}
            >
              <Flex>
                <EditablePreview />
                <EditableInput />
                <EditableControls />
              </Flex>
            </Editable>
          </Stack>
          <Stack spacing={4}>
            <Text fontSize="xl" fontWeight="500">
              Contact Information
            </Text>
            <Stack spacing={2}>
              <Editable defaultValue="johndoe@example.com" isPreviewFocusable={false}>
                <EditablePreview />
                <EditableInput />
                <EditableControls />
              </Editable>
              <Editable defaultValue="+123 456 789" isPreviewFocusable={false}>
                <EditablePreview />
                <EditableInput />
                <EditableControls />
              </Editable>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  )
}

/**This place should be used to get any information from the server side
 * example : we need to get the session token
 * or any thing related to the page  */
export async function getServerSideProps() {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos").then((response) => {
    response.json()
  })

  return { props: { title: "rahul" } }
}

ProfileHome.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
