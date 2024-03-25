import { Box, Divider, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"

import Layout from "../../components/layout"
import { companyfetcher } from "../../datafetch/datafetch"

function CompanyPage({ companyid }) {
  const { company, isLoading, error } = companyfetcher(companyid)

  if (isLoading) {
    return <Text>Loading...</Text>
  }
  if (error) {
    return <Text>Failed to load company</Text>
  }

  if (company) {
    var companydata = company[0]

    return (
      <VStack align="start" spacing={4}>
        <HStack spacing={3}>
          <Image boxSize="100px" objectFit="cover" src={companydata.logo} alt={companydata.name} />
          <VStack align="start">
            <Heading>{companydata.name}</Heading>
            <Text color="gray.500">{companydata.country}</Text>
          </VStack>
        </HStack>
        <Divider />
        <Text>{companydata.about}</Text>
        {/* Render other company details */}
      </VStack>
    )
  } else {
    return <Text>404 not found</Text>
  }
}

export default CompanyPage

export async function getServerSideProps({ req, res }) {
  const companyid = req.url.split("/")[req.url.split("/").length - 1]
  console.log(companyid)
  // Pass data to the page via props
  return { props: { companyid } }
}

CompanyPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
