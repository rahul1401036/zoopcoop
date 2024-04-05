import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Grid,
  Heading,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  Show,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"

import { useRouter } from "next/router"
import { NextRequest } from "next/server"
import React, { useContext, useEffect, useState } from "react"
import JobItem from "../components/jobitem"
import Layout from "../components/layout"
import { jobsearchfetcher, jobsearchfetcherall, menuitemfetcher } from "../datafetch/datafetch"

import { themes } from "../utils/themes"
import { getQueryParamsFromUrl } from "../utils/utils"
// import { Box, Checkbox, CheckboxGroup, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";

function Menubox(props) {
  const { jobs, isLoading, isError } = jobsearchfetcher({
    location: props.location,
    position: props.position,
    page: props.page,
  })

  if (isLoading) return <Spinner />
  if (isError) return <>It has been an error</>

  if (jobs) {
    return (
      <Box display="flex">
        <Box flex="1">
          <>
            <Grid
              marginX={["0vh", "1vh", "2vh", "4vh"]}
              templateColumns={["repeat(1, 1fr)"]}
              padding={["4%", "5%", "6%", "7%"]}
              gap={6}
            >
              {jobs.map((item) => (
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
          </>
        </Box>
      </Box>
    )
  }

  if (!jobs) return <div>No data found</div>
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const visiblePages = 10
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2))
  const endPage = Math.min(startPage + visiblePages - 1, totalPages)

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <Flex
      direction={["row", "row", "column"]}
      alignItems={"center"}
      height={"fit-content"}
      maxW={"100vw"}
      m={["auto", "auto", 0, 0]}
      position="sticky"
      top={["10vh", "12vh", "18vh"]}
    >
      {pageNumbers.map((pageNumber) => (
        <Button
          bgColor={currentPage === pageNumber ? themes.theme2.colors.primary[900] : "white"}
          key={pageNumber}
          variant={currentPage === pageNumber ? "solid" : "outline"}
          borderRadius={"full"}
          size={["sm", "sm", "md"]}
          colorScheme="blue"
          onClick={() => goToPage(pageNumber)}
          my={1}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        variant="outline"
        size={["sm", "sm", "md"]}
        colorScheme="blue"
        borderRadius={"full"}
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        my={1}
      >
        ...
      </Button>
    </Flex>
  )
}

export default function MenuPage(props) {
  const [isloaded, setIsLoaded] = React.useState(true)
  const [page, setPage] = React.useState(1)
  const [filteropen, setFilteropen] = React.useState(true)
  const [searchtext, setSearchtext] = React.useState(props.searchtext)
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [location, setLocation] = useState()
  const [position, setPosition] = useState()

  const [locationtext, setLocationtext] = useState()
  const [positiontext, setPositiontext] = useState()

  useEffect(() => {
    if (!isloaded) {
      console.log("isloaded called")
      setIsLoaded(true)
    }
  })

  return (
    <>
      {/* <SearchBar /> */}
      <Input placeholder="Location" onChange={(e) => setLocationtext(e.target.value)} />
      <Input placeholder="Position" onChange={(e) => setPositiontext(e.target.value)} />
      <Button
        onClick={() => {
          setLocation(locationtext)
          setPosition(positiontext)
        }}
      >
        Search
      </Button>
      <Flex flexDirection={["column-reverse", "column-reverse", "row", "row"]}>
        <Show above="lg">
          <FilterBox onSearchPress={(val) => setSearchtext(val)} />
        </Show>

        <Show below="lg">
          <Button position={"fixed"} left={0} top={"50vh"} onClick={onOpen}></Button>

          <Modal isOpen={isOpen} onClose={onClose} position="fixed" bottom={0}>
            <ModalOverlay />
            <ModalContent>
              {" "}
              <FilterBox onClose={() => onClose()} onSearchPress={(val) => setSearchtext(val)} />
            </ModalContent>
          </Modal>
        </Show>
        <Box flex="1">
          <Menubox searchtext={searchtext} page={page} location={location} position={position} />
        </Box>
        <Pagination currentPage={page} totalPages={100} onPageChange={(page) => setPage(page)} />
      </Flex>
    </>
  )
}

function SearchBar(props) {
  const [search, setSearch] = useState("")

  return (
    <Flex direction="row" bg="white" borderRadius="md" boxShadow="md" position="sticky" top={"15vh"} zIndex={10}>
      <Input
        name="search"
        placeholder="Search..."
        size="md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mr={2}
      />
      <Button
        onClick={() => {
          props.onSearchPress(search)
        }}
        colorScheme="blue"
      >
        Search
      </Button>
    </Flex>
  )
}
/**This place should be used to get any information from the server side
 * example : we need to get the session token
 * or any thing related to the page  */
export async function getServerSideProps({ req }) {
  // Access the query parameters from the req object

  var params = getQueryParamsFromUrl(req.url)
  if (params.searchword === "Any") {
    params.searchword = null
    console.log(params)
  }
  return { props: { searchtext: params.searchword } }
}

MenuPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

function FilterBox(props) {
  const [datePosted, setDatePosted] = useState("alltime")
  const [salary, setSalary] = useState([0, 200000])
  const [workMode, setWorkMode] = useState()
  const [workType, setWorkType] = useState()
  const [workShift, setWorkShift] = useState()
  const [departments, setDepartments] = useState()
  const [experience, setExperience] = useState([0, 10])
  const [sortBy, setSortBy] = useState("")

  return (
    <Flex
      direction="column"
      height={"fit-content"}
      p={5}
      bg="gray.100"
      borderRadius="md"
      boxShadow="md"
      m={6}
      position="sticky"
      top={"15vh"}
    >
      <Heading size="md" mb={3}>
        Filters
      </Heading>

      <Heading size="sm" mb={2}>
        Date Posted
      </Heading>
      <Select
        placeholder="All time"
        defaultValue={"alltime"}
        value={datePosted}
        onChange={(e) => setDatePosted(e.target.value)}
      >
        <option value="24hours">Last 24 hours</option>
        <option value="7days">Last 7 days</option>
        <option value="30days">Last 30 days</option>
        <option value="alltime">All time</option>
      </Select>

      <Heading size="sm" mb={2}>
        Salary
      </Heading>
      <Slider
        aria-label="slider-ex-4"
        value={salary}
        min={0}
        max={200000}
        step={1000}
        onChange={(value) => setSalary(value)}
        onChangeEnd={() => {
          console.log("set to fetch")
        }}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>

      <Heading size="sm" mb={2}>
        Work Mode
      </Heading>
      <CheckboxGroup value={workMode} onChange={(value) => setWorkMode(value)}>
        <Checkbox value="remote">Remote</Checkbox>
        <Checkbox value="hybrid">Hybrid</Checkbox>
        <Checkbox value="onsite">Onsite</Checkbox>
      </CheckboxGroup>

      <Heading size="sm" mb={2}>
        Work Type
      </Heading>
      <CheckboxGroup value={workType} onChange={(value) => setWorkType(value)}>
        <Checkbox value="full-time">Full Time</Checkbox>
        <Checkbox value="part-time">Part Time</Checkbox>
      </CheckboxGroup>

      <Heading size="sm" mb={2}>
        Work Shift
      </Heading>
      <CheckboxGroup value={workShift} onChange={(value) => setWorkShift(value)}>
        <Checkbox value="morning">Morning</Checkbox>
        <Checkbox value="afternoon">Afternoon</Checkbox>
        <Checkbox value="night">Night</Checkbox>
      </CheckboxGroup>

      <Heading size="sm" mb={2}>
        Department
      </Heading>
      <Select placeholder="Select department" value={departments} onChange={(e) => setDepartments(e.target.value)}>
        <option value="engineering">Engineering</option>
        <option value="marketing">Marketing</option>
        <option value="sales">Sales</option>
        <option value="hr">HR</option>
      </Select>

      <Heading size="sm" mb={2}>
        Experience
      </Heading>
      <Slider
        aria-label="slider-ex-5"
        value={experience}
        min={0}
        max={10}
        step={1}
        onChange={(value) => setExperience(value)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>

      <Heading size="sm" mb={2}>
        Sort By
      </Heading>
      <Select placeholder="Sort by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="date">Date</option>
        <option value="salary">Salary</option>
        <option value="experience">Experience</option>
      </Select>
    </Flex>
  )
}
