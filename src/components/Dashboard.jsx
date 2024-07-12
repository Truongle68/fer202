import React, { useEffect, useState } from "react";
import { getAllStudent } from "../services/studentService";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "./Navbar";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import ModalUpdate from "./ModalUpdate";
import ModalDelete from "./ModalDelete";


const DashBoard = () => {
  const [listStudent, setListStudent] = useState([]);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [studentData, setStudentData] = useState({});
  const [updateStudentData, setUpdateStudentData] = useState({});


  const navigate = useNavigate()

  const getStudents = async () => {
    await getAllStudent()
      .then((res) => {
        setListStudent(res.data);
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  const handleClose = () => {
    setIsShowEditModal(false);
    setIsShowDeleteModal(false);
  };

 
  const handleEditStudent = (data) => {
    setIsShowEditModal(true);
    setUpdateStudentData(data);
  };

  const handleDeleteStudent = (data) => {
    setStudentData('');
    setIsShowDeleteModal(true);
    setStudentData(data);
  };

  const handleStudentUpdated = (updatedStudent) => {

    setListStudent((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  const handleStudentDeleted = (deletedStudentId) => {
    setListStudent((prevStudents) =>
      prevStudents.filter((student) => student.id !== deletedStudentId)
    );
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <NavbarHeader />
      <Container>
        <div className="body-header">
          <h2>STUDENT MANAGEMENT</h2>
          <Button
            className="add-btn"
            variant="warning"
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
                    <td>{student.dateofbirth}</td>
                    <td>{`${student.gender}` === "true" ? "male" : "female"}</td>
                    <td>{student.class}</td>
                    <td><img src={student.image} alt='student' style={{ width: '100%' }} /></td>
                    <td>{student.feedback}</td>
                    <td>
                      <Button className="action-btn" variant="outline-primary" onClick={() => navigate(`/detail/${student.id}`)}>Detail</Button>
                      <Button className="action-btn" variant="outline-success" onClick={() => { handleEditStudent(student) }}>Edit</Button>
                      <Button className="action-btn" variant="outline-danger" onClick={() => { handleDeleteStudent(student) }}>Delete</Button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>


        <ModalUpdate
          show={isShowEditModal}
          handleClose={handleClose}
          updateStudentData={updateStudentData}
          onStudentUpdated={handleStudentUpdated}
        />

        <ModalDelete
          show={isShowDeleteModal}
          handleClose={handleClose}
          studentData={studentData}
          onStudentDeleted={handleStudentDeleted}
        />
      </Container>
    </>
  );
};

export default DashBoard;
