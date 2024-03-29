import { Box, Button, Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import Layout from "../components/layout"
import Notification from "../components/notification"
import { SearchBar } from "../components/searchbar"

export default function NotificationsHome(props) {
  const [isloaded, setIsLoaded] = React.useState(false)

  useEffect(() => {
    if (!isloaded) {
      console.log("isloaded called")

      setIsLoaded(true)
    }
  })

  const router = useRouter()

  // Assuming you have an array of notification objects called "notifications"
  const notifications = [
    { id: 1, message: "Notification 1" },
    { id: 2, message: "Notification 2" },
    { id: 3, message: "Notification 3" },
  ]

  return (
    <Flex direction="column" padding={[3, 4, 16, 18, 20]} rowGap={[5]}>
      {notifications.map((notification) => (
        <Notification key={notification.id} message={notification.message} />
      ))}
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

NotificationsHome.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
