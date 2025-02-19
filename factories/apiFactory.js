export function createApiRequest(endpoint, method = 'GET', body = null) {
  return useFetch(endpoint, {
    method,
    body
  })
}
