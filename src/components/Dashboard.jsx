import React, { useEffect, useState } from "react";
import { getAllStudent } from "../services/studentService";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { formatDate } from "../services/config";
import { deleteStudent } from "../services/studentService";
import { toast } from "react-toastify";


const DashBoard = () => {
  const [listStudent, setListStudent] = useState([]);
  const navigate = useNavigate()

  const getStudents = async () => {
    try {
      const {data} = await getAllStudent()
      if(data){
        setListStudent(data)
      }
    } catch (error) {
      console.error({message: error.message})
    }
  };

  const handleDeleteStudent = async(studentId) => {
    try {
      if(window.confirm("Are you sure deleting this item?")){
        const {data} = await deleteStudent(studentId)
        if(data){
          toast.success('Delete successfully!')
          setListStudent(prevList => prevList.filter(student => student.id != studentId))
          navigate('/dashboard')
        }else{
          toast.error('Fail to delete!')
        }
      }
    } catch (error) {
      console.error({message: error.message})
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <Container>
        <div className="body-header">
          <h2>STUDENT MANAGEMENT</h2>
          <Button
            className="add-btn"
            variant="success"
            onClick={() => navigate('/addform')}
          >
            Add New Student
          </Button>

        </div>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Date of birth</th>
              <th>Gender</th>
              <th>Class</th>
              <th style={{ width: '150px' }}>Image</th>
              <th>Feedback</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listStudent !== null && listStudent.length > 0 &&
              listStudent.map((student) => {
                return (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{formatDate(student.dateofbirth)}</td>
                    <td>{`${student.gender}` === "true" ? "male" : "female"}</td>
                    <td>{student.class}</td>
                    <td><img src={student.image} alt='student' style={{ width: '100%' }} /></td>
                    <td>{student.feedback}</td>
                    <td>
                      <Button className="action-btn" variant="outline-primary" onClick={() => navigate(`/detail/${student.id}`)}>Detail</Button>
                      <Button className="action-btn" variant="outline-success" onClick={() => { navigate(`/updateform/${student.id}`) }}>Edit</Button>
                      <Button className="action-btn" variant="outline-danger" onClick={() => { handleDeleteStudent(student.id) }}>Delete</Button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </Container>
    </>
  );
};

export default DashBoard;
