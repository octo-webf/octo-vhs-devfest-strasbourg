import axios from 'axios'

const OCTOTV_API = 'https://tv.octo.com/api/v2'
const categoryList = {
//  c124ccf81539cwmir14k: { name: 'Actualités' },
  c124cd0c0f8f2cu50e8j: { name: 'BOFs', img: '../images/bof.png' },
  c125159f81d17p0als7b: { name: 'Externe', img: '../images/events.png' },
  c124ccf81532boogbh2m: { name: 'Matinales', img: '../images/matinales.png' }
//  c124f23e8c015v7knn09: { name: 'Octo Academy' }
}
const availableCategory = Object.keys(categoryList)

const getCategoryInformations = (categoryOid) => {
  return categoryList[categoryOid]
}

const getCategories = async () => {
  try {
    const result = await axios.get(`${OCTOTV_API}/channels/tree/`)
    if (!result.data || !result.data.success) {
      throw new Error('Unknown error')
    }
    const availableCategoryToDisplay = result.data.channels.filter(channel => availableCategory.includes(channel.oid))
    return availableCategoryToDisplay
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getVideos = async categoryId => {
  try {
    const result = await axios.get(`${OCTOTV_API}/channels/content/?parent_oid=${categoryId}`)
    if (!result.data || !result.data.success) {
      throw new Error('Unknown error')
    }
    return result.data.videos
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getVideoInformations = async videoId => {
  const result = await axios.get(`${OCTOTV_API}/medias/modes/?oid=${videoId}&html5=mp4`)
  if (!result.data || !result.data.success || result.data.names.length === 0) {
    throw new Error('Unknown error')
  }
  return Promise.resolve(result.data)
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
