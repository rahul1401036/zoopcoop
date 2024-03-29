import { ChevronRightIcon } from "@chakra-ui/icons"
import { Button, Card, Divider, Flex, Heading, Image, List, ListIcon, ListItem, Text, VStack } from "@chakra-ui/react"
import { Tab, TabList, Tabs } from "@chakra-ui/react"
import React, { useState } from "react"
import Layout from "../components/layout"
import { cards, fontsmooth, themes } from "../utils/themes"
import { getQueryParamsFromUrl } from "../utils/utils"

// Mock data for users
const usersData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Administrator" },
  { id: 2, name: "Jane Doe", email: "jane@example.com", role: "Editor" },
  { id: 3, name: "William Smith", email: "william@example.com", role: "Subscriber" },
]

const UserDetails = ({ user }) => (
  <VStack align="start" spacing={4}>
    <Heading size="md">{user.name}</Heading>
    <Text>Email: {user.email}</Text>
    <Text>Role: {user.role}</Text>
  </VStack>
)

export default function Buddy(props) {
  const [selectedUser, setSelectedUser] = useState(usersData[0])

  return (
    <Flex direction={"column"} alignItems={"center"}>
      <Heading size="lg">{props.groupname}</Heading>
      <Flex direction={["row-reverse", "row", "row"]}>
        <Flex flex={1} m={"2vh"}>
          <Flex direction={["column-reverse", "column-reverse", "row", "row"]}>
            <Flex direction={"column"} flex={[1]}>
              {usersData.map((question, index) => (
                <Uselinks key={index} question={question.name} />
              ))}
            </Flex>

            <Flex direction={"column"} flex={[1]}>
              <Text fontSize="lg" fontWeight="bold" m={"2vh"}>
                More happening in the area
              </Text>
              <Flex direction={"column"} flex={1} gap={10}>
                {usersData.map((user) => (
                  <Question key={user.id} question={user.name} />
                ))}
              </Flex>
            </Flex>

            <Flex direction={"column"} flex={[1]} gap={10}>
              {usersData.map((user) => (
                <LearnBox
                  key={user.id}
                  Title={user.name}
                  Image="https://bit.ly/2k1H1t6"
                  Description={`Email: ${user.email}, Role: ${user.role}`}
                  Link="Learn More"
                />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

function LearnBox(props) {
  return (
    <Card style={cards.learncard} alignItems={"center"}>
      <Heading size="md" my={2}>
        {props.Title}
      </Heading>

      <Image src={props.Image} alt={props.Title} />
      <Text>{props.Description}</Text>

      <Button as="a" href={props.referurl} style={fontsmooth.smooth} bgColor={"white"}>
        Learn More
      </Button>
    </Card>
  )
}

function Question(props) {
  const handleClick = () => {
    // Code to navigate to another page
    // You can use React Router or any other navigation library
  }

  return <Text onClick={handleClick}>{props.question}</Text>
}

function Uselinks(props) {
  const handleClick = () => {
    // Code to navigate to another page
    // You can use React Router or any other navigation library
  }

  return <Text onClick={handleClick}>{props.question}</Text>
}
/**This place should be used to get any information from the server side
 * example : we need to get the session token
 * or any thing related to the page  */

export async function getServerSideProps({ req }) {
  // Access the query parameters from the req object

  var params = getQueryParamsFromUrl(req.url)

  if (params.searchword == undefined || params.searchword === "Any") {
    params.searchword = null
    console.log(params)
  }
  return { props: { groupname: params.searchword } }
}

Buddy.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
