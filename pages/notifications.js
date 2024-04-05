import { Box, Button, Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import Layout from "../components/layout"
import Notification from "../components/notification"
import { SearchBar } from "../components/searchbar"
import { notificationfetcher } from "../datafetch/datafetch"

export default function NotificationsHome(props) {
  useEffect(() => {
    if (!isloaded) {
      console.log("isloaded called")
    }
  })

  const router = useRouter()

  const { notifications, isloaded, isError } = notificationfetcher("nicole31@example.org")

  // Assuming you have an array of notification objects called "notifications"
  if (isError) {
    return <div>Failed to load</div>
  }

  if (isloaded) {
    return <div>Loading...</div>
  }
  if (notifications) {
    return (
      <Flex direction="column" padding={[3, 4, 16, 18, 20]} rowGap={[5]}>
        {notifications.map((notification) => (
          <Notification key={notification.id} message={notification.notification_status} />
        ))}
      </Flex>
    )
  }
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
