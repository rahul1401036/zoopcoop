import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Button, Divider, Flex, Heading, List, ListIcon, ListItem, Text, VStack } from "@chakra-ui/react"
import React, { useState } from "react"
import Layout from "../components/layout"

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

export default function UserManagementPage(props) {
  const [selectedUser, setSelectedUser] = useState(usersData[0])

  return (
    <Flex>
      <Box w="30%" p={5} borderRight="1px" borderColor="gray.200">
        <Heading size="md" mb={4}>
          Your Buddies
        </Heading>
        <Divider />
        <List spacing={3} mt={4}>
          {usersData.map((user) => (
            <ListItem key={user.id} cursor="pointer" _hover={{ bg: "gray.100" }} p={2} borderRadius="md">
              <Flex justify="space-between" align="center" onClick={() => setSelectedUser(user)}>
                <Text>{user.name}</Text>
                <ListIcon as={ChevronRightIcon} />
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box w="70%" p={5}>
        {selectedUser ? <UserDetails user={selectedUser} key={selectedUser.id} /> : <Text>No user selected</Text>}
      </Box>
    </Flex>
  )
}

/**This place should be used to get any information from the server side
 * example : we need to get the session token
 * or any thing related to the page  */

UserManagementPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
