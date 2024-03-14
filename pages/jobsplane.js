import {
  Box,
  Button,
  HStack,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react"
import React from "react"
import Layout from "../components/layout"

// Sample data for applied and saved jobs
const appliedJobs = [
  { id: 1, title: "Senior Frontend Developer", company: "Tech Innovations Inc.", status: "Applied" },
  { id: 2, title: "Product Manager", company: "Creative Solutions Ltd.", status: "Interview" },
]

const savedJobs = [
  { id: 3, title: "UI/UX Designer", company: "DesignDreams Agency", status: "Saved" },
  { id: 4, title: "Data Analyst", company: "Analytics Now", status: "Saved" },
]

// Component to display each job
const JobItem = ({ job }) => (
  <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
    <Heading fontSize="xl">{job.title}</Heading>
    <Text mt={2}>{job.company}</Text>
    <HStack justifyContent="space-between" mt={2}>
      <Tag size="sm" colorScheme={job.status.toLowerCase() === "applied" ? "blue" : "teal"}>
        {job.status}
      </Tag>
      <Button size="sm">View</Button>
    </HStack>
  </Box>
)

export default function JobPlane() {
  return (
    <Box p={5}>
      <Tabs variant="enclosed" orientation="vertical">
        <TabList>
          <Tab>Applied Jobs</Tab>
          <Tab>Saved Jobs</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={4}>
              {appliedJobs.map((job) => (
                <JobItem key={job.id} job={job} />
              ))}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4}>
              {savedJobs.map((job) => (
                <JobItem key={job.id} job={job} />
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

JobPlane.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
