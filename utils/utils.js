export function getQueryParamsFromUrl(url) {
  url = url.split("?")[1]
  const params = new URLSearchParams(url)

  const queryParams = {}
  for (const [key, value] of params.entries()) {
    queryParams[key] = value
  }
  return queryParams
}
