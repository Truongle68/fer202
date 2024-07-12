import React, { useEffect, useState } from "react";
import { getAllStudent } from "../services/studentService";
import NavbarHeader from "./Navbar";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [listStudent, setListStudent] = useState([])

  const navigate = useNavigate()

  const getStudents = async () => {
    try {
      const res = await getAllStudent();
      setListStudent(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <>
      <NavbarHeader />
      <Container>
        <h2 className="title">STUDENT LIST</h2>
        <div className="white-board">
          {listStudent!==null && listStudent.length>0 &&
          listStudent.map((student)=>{
            return(
              <>
              
              <div className="info-container" key={student.id}>
                <div className="student-img">
                  <img src={student.image}/>
                </div>
                <div className="student-content">
                  <div className="left-content content">
                    <label>Id: <Link style={{textDecoration: "none"}} to={`/detail/${student.id}`}>{student.id}</Link></label>
                    <label>Name: {student.name}</label>
                    <label>Date of birth: {student.dateofbirth}</label>
                    <label>Gender: {`${student.gender}` === "true" ? "male" : "female"}</label>  
                    <label>Class: {student.class}</label>
                    <label>Feedback: {student.feedback}</label>          
                  </div>
                
                  <Button className="detail-btn" variant="outline-primary" onClick={() => navigate(`/detail/${student.id}`)}>Detail</Button>

                </div>
              </div>
              </>
            )
          })}
        </div>

      </Container>
    </>
  )
}

export default Home 