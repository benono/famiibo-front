import axios from 'axios'

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
})

export default apiClient
