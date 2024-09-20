import axios from '@/utils/axios'

const apiTest = {
  getTest: (params = {}) => axios.get<ApiTest.GetData>('/test', params),
  postTest: (params = {}) => axios.post<ApiTest.PostData>('/test', params),
}

export default apiTest
