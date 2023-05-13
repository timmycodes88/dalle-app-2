import request from '../utils/request'

const ENDPOINT = '/api/dalle'

const DalleAPI = {
  post: async prompt => await request(ENDPOINT, { prompt }),
}

export default DalleAPI
