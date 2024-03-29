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
