import axios from 'axios'
const OCTO_VHS_API = 'https://api-octovhs.herokuapp.com'

const getCategoryInformations = async (id) => {
  try {
    const result = await axios.get(`${OCTO_VHS_API}/categories/${id}`)
    return result.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getCategories = async () => {
  try {
    const result = await axios.get(`${OCTO_VHS_API}/categories`)
    return result.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getVideos = async categoryId => {
  try {
    const result = await axios.get(`${OCTO_VHS_API}/categories/${categoryId}/videos`)
    return result.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
// the api call will be cached (network first)
const getVideoInformations = async (videoId, categoryId) => {
  const result = await axios.get(`${OCTO_VHS_API}/categories/${categoryId}/videos/${videoId}`)
  return result.data
}

export default {
  getCategories,
  getCategoryInformations,
  getVideoInformations,
  getVideos
}
