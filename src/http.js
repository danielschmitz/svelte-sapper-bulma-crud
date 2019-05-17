import axios from 'axios'

const http = axios.create({
    baseURL: "https://northwind.now.sh/api",
    timeout: 100000,
    headers: { 'Content-Type': 'application/json' }
  })

export default http