import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react"
import React from "react"
import JobItem from "../components/jobitem"
import Layout from "../components/layout"
import { candidatejobsfetcher, jobfetcher } from "../datafetch/datafetch"

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

export default function JobPlane(props) {
  const { candidatejobs, loading, error } = candidatejobsfetcher(props.candidate_id)

  const { jobs, isloading, iserror } = jobfetcher(candidatejobs ? candidatejobs.map((item) => item.job_id) : [])
  // const { candidatesavedjobs , error , loading } = candidatejobsfetcher(candidate_id)

  function jobfilter(jobs, type) {
    const data = jobs.filter((jobitem) =>
      candidatejobs
        .filter((item) => item.application_status === type)
        .map((item) => item.job_id)
        .includes(jobitem.id)
    )
    return data
  }

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  if (!jobs) return <div>No data found</div>

  return (
    <Box p={5}>
      <Tabs flex={1} variant="unstyled" orientation={["horizontal", "horizontal", "vertical", "vertical"]}>
        <TabList bg={"white"} borderRadius={"10px"}>
          <Tab flex={1} borderLeftRadius={"10px"} _selected={{ color: "white", bg: "blue.500" }}>
            Applied
          </Tab>
          <Tab flex={1} _selected={{ color: "white", bg: "blue.500" }}>
            in Process
          </Tab>
          <Tab flex={1} borderRightRadius={"10px"} _selected={{ color: "white", bg: "blue.500" }}>
            Rejected
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid
              marginX={["0vh", "1vh", "2vh", "4vh"]}
              templateColumns={["repeat(1, 1fr)"]}
              padding={["4%", "5%", "6%", "7%"]}
              gap={6}
            >
              {jobfilter(jobs, "applied").map((item) => (
                <JobItem
                  key={item.id}
                  id={item.id}
                  itemid={item.title}
                  title={item.title}
                  summary={item.item_type}
                  image_url={item.image_url}
                />
              ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid
              marginX={["0vh", "1vh", "2vh", "4vh"]}
              templateColumns={["repeat(1, 1fr)"]}
              padding={["4%", "5%", "6%", "7%"]}
              gap={6}
            >
              {jobfilter(jobs, "accepted").map((item) => (
                <JobItem
                  key={item.id}
                  id={item.id}
                  itemid={item.title}
                  title={item.title}
                  summary={item.item_type}
                  image_url={item.image_url}
                />
              ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid
              marginX={["0vh", "1vh", "2vh", "4vh"]}
              templateColumns={["repeat(1, 1fr)"]}
              padding={["4%", "5%", "6%", "7%"]}
              gap={6}
            >
              {jobfilter(jobs, "rejected").map((item) => (
                <JobItem
                  key={item.id}
                  id={item.id}
                  itemid={item.title}
                  title={item.title}
                  summary={item.item_type}
                  image_url={item.image_url}
                />
              ))}
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export async function getServerSideProps({ req }) {
  // Access the query parameters from the req object

  return { props: { candidate_id: 2 } }
}

JobPlane.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
