import { Flex } from "@chakra-ui/react"
import React from "react"
import JobItem from "./jobitem"

const SimilarJobs = () => {
  const similarJobs = [
    { id: 1, title: "Job 1" },
    { id: 2, title: "Job 2" },
    { id: 3, title: "Job 3" },
    { id: 4, title: "Job 4" },
    { id: 5, title: "Job 5" },
  ]

  return (
    <Flex direction="column" flex={1} margin={"22"}>
      {similarJobs.map((job) => (
        <JobItem key={job.id} job={job} title={job.title} />
      ))}
    </Flex>
  )
}

export default SimilarJobs
