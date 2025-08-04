import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/employees',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
