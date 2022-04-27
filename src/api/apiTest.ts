import axios from '@/utils/axios'

const apiTest = {
  getTest: (params: GetTest.params) => axios.get<GetTest.data>('/test', params),
  postTest: (params: PostTest.params) => axios.post<PostTest.data>('/test', params),
}

export default apiTest
