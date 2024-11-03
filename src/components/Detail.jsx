import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentById } from '../services/studentService';
import { Button, Container } from 'react-bootstrap';
import { formatDate } from '../services/config';

const DetailPage = () => {
  
  const [student, setStudent] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()

  const getStudent = async() => {
    try {
      const {data} = await getStudentById(id)
      if(data){
        setStudent(data)
      }
    } catch (error) {
      console.error(error.error)
    }
  }

  useEffect(()=>{
    getStudent()
  },[id])

  return (
    <div>
            <Button variant="outline-primary" style={{margin:"10px"}} onClick={()=>navigate(-1)}>Back</Button>
        <Container>
            <div className="detail-container">
                <h2>STUDENT INFORMATION</h2>
                <div className="content-container">
                    <div className="img-container">
                        <img src={student.image} />
                    </div>
                    <div className="detail-content">
                        <label>Id: {student.id}</label>
                        <label>Name: {student.name}</label>
                        <label>Date of birth: {formatDate(student.dateofbirth)}</label>
                        <label>Gender: {`${student.gender}` === "true" ? "male" : "female"}</label>
                        <label>Class: {student.class}</label>
                        <label>Feedback: {student.feedback}</label>
                    </div>
                </div>
            </div>
        </Container >
        </div>
  )
}

export default DetailPage
