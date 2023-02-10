import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = async () => {
  const request = axios.get(baseUrl)
  console.log(request)
  return request.then((response) => response.data)
}

const addPerson = async (newObject) => {
  const request = axios.post(baseUrl, newObject)
  console.log(request)
  return request.then((response) => response.data)
}

const updatePerson = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  console.log('Payload:', newObject)
  console.log(request)
  return request.then((response) => response.data)
}

const removePerson = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  console.log(request)
  return request.then((response) => response.data)
}

export default {
  getPersons,
  addPerson,
  updatePerson,
  removePerson,
}
