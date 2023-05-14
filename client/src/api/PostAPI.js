import request from '../utils/request'

const ENDPOINT = '/api/posts'

const PostAPI = {
  post: async comment => await request(ENDPOINT, { comment }),
  get: async () => await request(ENDPOINT),
}

export default PostAPI
