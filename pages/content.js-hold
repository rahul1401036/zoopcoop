import Head from "next/head"
import React, { useContext, useEffect, useState } from "react"
import Header from "../components/headbar"
import Layout from "../components/layout"
import Logincomponent from "../components/logincomponent"
import S3FileUpload from "../components/s3uploader"
import Signupcomponent from "../components/signupcomponent"
export default function Content(props) {
  const [isloaded, setIsLoaded] = React.useState(false)

  useEffect(() => {
    if (!isloaded) {
      console.log("isloaded called")

      setIsLoaded(true)
    }
  })

  return (
    <>
      
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

Content.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}