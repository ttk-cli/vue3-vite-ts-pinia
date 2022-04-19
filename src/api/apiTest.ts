import axios from '@/utils/axios'

const apiTest = {
  getTest: (data = {}) => axios.get('/test', data),
  postTest: (data = {}) => axios.post('/test', data),
}

export default apiTest
