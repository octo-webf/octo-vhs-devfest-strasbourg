import axios from 'axios'
const OCTO_VHS_API = 'http://api-octovhs.herokuapp.com'
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

const getVideoInformations = async videoId => {
  const result = await axios.get(`${OCTO_VHS_API}/videos/${videoId}`)
  return result.data
}

const getVideoURL = video => {
  return video && video.names && video.names[0] && video[video.names[0]] && video[video.names[0]].html5
}

const calculateTime = (minutes, seconds) => {
  return minutes * 60 + seconds
}
const getVideoTime = time => {
  const minutes = parseInt(time.replace(/(\d{2}) m (\d{2}) s/, '$1'))
  const seconds = parseInt(time.replace(/(\d{2}) m (\d{2}) s/, '$2'))
  return calculateTime(minutes, seconds)
}

export default {
  getCategories,
  getCategoryInformations,
  getVideoInformations,
  getVideos,
  getVideoTime,
  getVideoURL
}
