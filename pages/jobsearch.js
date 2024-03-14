import { Button, Error, Grid, Spinner, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import JobItem from "../components/jobitem"
import Layout from "../components/layout"

import { menuitemfetcher } from "../datafetch/datafetch"

function Menubox(props) {
  const { data, isLoading, isError } = menuitemfetcher()
  const [showedcount, setShowedcount] = React.useState(40)

  if (isLoading) return <Spinner />
  if (isError) return <Error />

  const container = (
    <>
      <Grid
        marginX={["5vh", "6vh", "8vh", "10vh"]}
        templateColumns={["repeat(1, 1fr)"]}
        padding={["4%", "5%", "6%", "7%"]}
        gap={6}
      >
        {data.slice(1, showedcount).map((item) => (
          <JobItem
            key={item.id}
            id={item.id}
            itemid={item.userId}
            title={item.title}
            summary={item.summary}
            image_url={"https://i.etsystatic.com/41743066/r/il/51b87b/5227514595/il_1140xN.5227514595_gkk6.jpg"}
          />
        ))}
      </Grid>
      <Button onClick={() => setShowedcount(showedcount + 40)}>Load more</Button>
    </>
  )
  return container
}

export default function MenuPage(props) {
  const [isloaded, setIsLoaded] = React.useState(false)

  const router = useRouter()

  useEffect(() => {
    if (!isloaded) {
      console.log("isloaded called")

      setIsLoaded(true)
    }
  })

  return (
    <>
      <Text>Search Results for </Text>
      <Menubox />
    </>
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

MenuPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
