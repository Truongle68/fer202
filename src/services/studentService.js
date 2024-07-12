import axios from "./api"

const getAllStudent = () => {
  return axios.get('/studentManagement')
}

const getStudentById = (id) => {
  return axios.get(`/studentManagement/${id}`)
}

const postNewStudent = (studentData) => {
  return axios.post('/studentManagement', studentData)
}

const updateStudent = (id, studentData) => {
  return axios.put(`/studentManagement/${id}`, studentData)
}

const deleteStudent = (id, studentData) => {
  return axios.delete(`/studentManagement/${id}`)
}

export {
  getAllStudent,
  postNewStudent,
  updateStudent,
  deleteStudent,
  getStudentById
}