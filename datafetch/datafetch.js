import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const baseurl = "http://seventwelve.in:8080"
// const baseurl_test = "http://localhost:8082"
const baseurl_test = "http://192.168.178.20:8082"

export function menuitemfetcher(api, queryparms) {
  var title = ""
  var workMode = ""
  if (queryparms.workMode !== null) {
    workMode = `&workMode=${queryparms.workMode}`
  }
  if (queryparms.title !== null) {
    title = `&title=${queryparms.title}`
  }
  const { data, error, isLoading } = useSWR(
    `${baseurl_test}${api}?title=${queryparms.title}&page=${queryparms.page}&pagesize=10`,
    () =>
      fetcher(`${baseurl_test}${api}?page=${queryparms.page}&pagesize=10${title}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    {
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )

  return {
    data: data,
    isLoading,
    isError: error,
  }
}

export function learningitemfetcher(baseurl, api) {
  const { data, error, isLoading } = useSWR(baseurl + api, () =>
    fetcher(baseurl + api, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    })
  )

  return {
    data: data,
    isLoading,
    isError: error,
  }
}

export function learningpodfetcher(baseurl, api) {
  const { data, error, isLoading } = useSWR(baseurl + api, () =>
    fetcher(baseurl + api, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    })
  )

  return {
    data: data,
    isLoading,
    isError: error,
  }
}

export function companyfetcher(id) {
  const { data, error, isLoading } = useSWR(
    `${baseurl_test}/company/` + id,
    () =>
      fetcher(`${baseurl_test}/zoopcoop/get/company?company_id=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    {
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )
  return {
    company: data,
    isLoading,
    isError: error,
  }
}

export function candidatejobsfetcher(id) {
  const { data, error, isLoading } = useSWR(
    `${baseurl_test}/jobapplications/` + id,
    () =>
      fetcher(`${baseurl_test}/zoopcoop/get/jobapplications?candidate_id=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    {
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )
  return {
    candidatejobs: data,
    isLoading,
    isError: error,
  }
}

export function jobfetcher(ids) {
  const { data, error, isLoading } = useSWR(
    ids.length === 0 ? null : `${baseurl_test}/jobs/` + ids.join("~"),
    () =>
      fetcher(`${baseurl_test}/zoopcoop/get/jobs?job_ids=${ids.join("~")}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    {
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )
  return {
    jobs: data,
    isLoading,
    isError: error,
  }
}

export function jobdatafetcher(id) {
  const { data, error, isLoading } = useSWR(
    !id ? null : `${baseurl_test}/jobs/` + id,
    () =>
      fetcher(`${baseurl_test}/zoopcoop/get/jobs?job_id=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    {
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )
  return {
    job: data,
    isLoading,
    isError: error,
  }
}

export function jobsearchfetcher(filterobj) {
  const { data, error, isLoading } = useSWR(
    filterobj.location && filterobj.position
      ? `${baseurl_test}/jobs/` + filterobj.location + "/" + filterobj.position + "/" + filterobj.page
      : `${baseurl_test}/jobs/` + filterobj.page,
    () =>
      fetcher(
        filterobj.location && filterobj.position
          ? `${baseurl_test}/zoopcoop/get/jobs?location=${filterobj.location}&position=${filterobj.position}&page=${filterobj.page}&pagesize=10`
          : `${baseurl_test}/zoopcoop/get/jobs?page=${filterobj.page}&pagesize=10`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ),

    {
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )
  return {
    jobs: data,
    isLoading,
    isError: error,
  }
}

export function notificationfetcher(email) {
  const { data, error, isLoading } = useSWR(
    !email ? null : `${baseurl_test}/notifications/` + email,
    () =>
      fetcher(`${baseurl_test}/zoopcoop/get/notifications?email=${email}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    {
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )
  return {
    notifications: data,
    isLoading,
    isError: error,
  }
}

export function profilefetcher(email) {
  const { data, error, isLoading } = useSWR(
    !email ? null : `${baseurl_test}/candidate/` + email,
    () =>
      fetcher(`${baseurl_test}/zoopcoop/get/candidate?email=${email}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    {
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )
  return {
    profile: data,
    isLoading,
    isError: error,
  }
}

/// ---------- RECRUITER ------------------- ///

//get items related to a particular company (company page)

// get info related to the recruiter (/employer/home)

//get items related to a particular recuiter (/employer/profile)
//  all the posted jobs in her company by id
// all the job seekers who have applied to a job by id

//all notifications for the recruiter (notification page)

//get the job page by id (jobposting/[jobid] page)
//show metrics about a particular job
//show data related to the job seekers who have applied to the job
// ( using the cllassification model make it into 5 groups )
//show the starred candidates for all the jobs

/// -------- JOB SEEKER ------------------- ///

// get info related to the candidate (profile page)

//get items related to a particular candidate (myjobs page)
//  all the jobs applied by the candidate by id - applied jobs and saved jobs

//all notifications for the candidate (notificatiosn page)

//all jobs searched by the candidate (jobsearch page)

//details of a particular job by id searched by the candidate (job/[id] page)

//all the similar jobs to the job searched by the candidate (job/[id] page)
// use of nearest neighbour clustering to get similar jobs
