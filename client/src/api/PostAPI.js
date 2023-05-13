import request from '../utils/request'

const ENDPOINT = '/api/post'

const PostAPI = {
  post: async ({ prompt, comment, image }) => await request(),
}
