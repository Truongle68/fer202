import React, { useEffect, useState } from "react";
import { getAllStudent } from "../services/studentService";
import { Card, Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../services/config";

const Home = () => {
  const [listStudent, setListStudent] = useState([])

  const navigate = useNavigate()

  const getStudents = async () => {
    try {
      const {data} = await getAllStudent();
      if(data){
      // setListStudent(data.filter(student => student.gender == true)); filter
        // const sortList = data.sort((a,b)=> a.name.localeCompare(b.name))
        // setListStudent(sortList);  sort
        setListStudent(data)
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <>
      <Container>
        <h2 className="title">STUDENT LIST</h2>
        <div className="white-board">
          {listStudent !== null && listStudent.length > 0 &&
            listStudent.map((student) => {
              return (
                <div key={student.id}>
                  <Card  style={{ width: '18rem', marginBottom: '10px' }}>
                    <Card.Img width={286} height={190} variant="top" src={student.image} />
                    <Card.Body>
                      {/* <Card.Title>Card Title</Card.Title> */}
                      <Card.Text>
                        Id: <Link style={{ textDecoration: "none" }} to={`/detail/${student.id}`}>{student.id}</Link>
                      </Card.Text>
                      <Card.Text>Name: {student.name}</Card.Text>
                      <Card.Text>Date of birth: {formatDate(student.dateofbirth)}</Card.Text>
                      <Card.Text>Gender: {`${student.gender}` === "true" ? "male" : "female"}</Card.Text>
                      <Card.Text>Class: {student.class}</Card.Text>
                      <Card.Text>Feedback: {student.feedback}</Card.Text>
                      <Button className="detail-btn" variant="outline-primary" onClick={() => navigate(`/detail/${student.id}`)}>Detail</Button>
                    </Card.Body>
                  </Card>

                 
                </div>
              )
            })}
        </div>

      </Container>
    </>
  )
}

export default Home 