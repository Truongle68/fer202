import { useEffect } from 'react'
import { getAllStudent } from '../services/studentService'

const FullDetailPage = () => {

  const getStudent = async()=>{
    try {
      const res = await getAllStudent()
      console.log(res.data)
    } catch (error) {
      console.error(error.error)
    }
  }

  useEffect(()=>{
    getStudent()
  },[])
}

export default FullDetailPage