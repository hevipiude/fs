import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
  return axios.get(baseUrl)
}

const addPerson = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => {
    console.log(response, newObject)
  })
}

const updatePerson = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const removePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getPersons: getPersons,
  addPerson: addPerson,
  updatePerson: updatePerson,
  removePerson: removePerson,
}
