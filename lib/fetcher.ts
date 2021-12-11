const fetcher = async (endpoint: string): Promise<any> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`)
  if (res.ok) {
    return await res.json()
  }
  throw res
}

export default fetcher
