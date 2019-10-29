import axios from 'axios'
const OCTO_VHS_API = 'https://api-octovhs.herokuapp.com'
const categoryList = {
//  c124ccf81539cwmir14k: { name: 'Actualités' },
  c124cd0c0f8f2cu50e8j: { name: 'BOFs', img: '../images/bof.png' },
  c125159f81d17p0als7b: { name: 'Externe', img: '../images/events.png' },
  c124ccf81532boogbh2m: { name: 'Matinales', img: '../images/matinales.png' }
//  c124f23e8c015v7knn09: { name: 'Octo Academy' }
}

const getCategoryInformations = (categoryOid) => {
  return categoryList[categoryOid]
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
