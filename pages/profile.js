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
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useEditableControls,
} from "@chakra-ui/react"
import React, { useState } from "react"
import Layout from "../components/layout"
import S3FileUpload from "../components/s3uploader"

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
  const [isOpen, setIsOpen] = useState(false)

  const profiledata = {
    name: "John Doe",
    title: "Full Stack Developer",
    location: "Mumbai",
    bio: "I am a full stack developer",
    image_url: "https://avatars.githubusercontent.com/u/37272663?v=4",
    skills: ["React", "Node.js", "JavaScript"],
    contactinfo: ["Email: 7C6zH@example.com", "Phone: 123-456-7890"],
    experience: [
      {
        title: "Software Engineer",
        company: "Amazon",
        location: "Seattle",
        date: "2018-2021",
      },
    ],
    education: [
      {
        title: "Bachelor of Science",
        school: "University of California, Berkeley",
        location: "Berkeley, CA",
        date: "2015-2018",
      },
    ],
    projects: [
      {
        title: "Project 1",
        description: "This is project 1",
        image_url: "https://avatars.githubusercontent.com/u/37272663?v=4",
        url: "https://github.com/kr716",
        date: "2021-2022",
      },
      {
        title: "Project 2",
        description: "This is project 2",
        image_url: "https://avatars.githubusercontent.com/u/37272663?v=4",
        url: "https://github.com/kr716",
        date: "2021-2022",
      },
    ],
    certifications: [
      {
        title: "Certification 1",
        url: "https://www.freecodecamp.org/certification/kr716/responsive-web-design",
        date: "2021-2022",
        image_url: "https://avatars.githubusercontent.com/u/37272663?v=4",
      },
    ],
    resumeurl: "https://www.freecodecamp.org/certification/kr716/responsive-web-design",
  }

  const handleUploadnewResume = (event) => {
    setIsOpen(true)
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack spacing={6} align="center">
          <Avatar size="xl" src="https://avatars.githubusercontent.com/u/37272663?v=4" alt="Avatar Alt" />
          <EditableText defaultValue="John Doe" fontSize="2xl" isPreviewFocusable={false} value={profiledata.name} />

          <EditableText
            defaultValue="Full Stack Developer"
            fontWeight="bold"
            isPreviewFocusable={false}
            value={profiledata.title}
          />

          <Stack direction="row" spacing={4}>
            {profiledata.skills.map((skill) => (
              <Badge px={2} py={1} bg="gray.50" key={skill} fontWeight="400">
                {skill}
              </Badge>
            ))}
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
              value={profiledata.bio}
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
              {profiledata.contactinfo.map((info) => (
                <Editable key={info} defaultValue={info} isPreviewFocusable={false}>
                  <EditablePreview />
                  <EditableInput />
                  <EditableControls />
                </Editable>
              ))}
            </Stack>
          </Stack>
          <Flex>
            <Text>Resume:</Text>
            {profiledata.resumeurl ? (
              <Link href={profiledata.resumeurl} color={"blue"}>
                Resume
              </Link>
            ) : (
              <S3FileUpload />
            )}
            <Button colorScheme="blue" onClick={handleUploadnewResume}>
              Upload new Resume
            </Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Upload Resume</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <S3FileUpload />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={() => setIsOpen(false)}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
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
