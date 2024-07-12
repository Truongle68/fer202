import { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { updateStudent } from '../services/studentService';
import { isURL } from 'validator';

const ModalUpdate = (props) => {
  const { show, handleClose, updateStudentData, onStudentUpdated } = props;
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(true);
  const [classes, setClasses] = useState("");
  const [image, setImage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("")

  const handleUpdateStudent = async (e) => {
    e.preventDefault()

    // Validate fields
    if (name.split(' ').length < 2) {
      setError('Name must contain more than 2 words!')
      return
    }
    if (!isURL(image)) {
      setError('Image must be a valid URL!')
      return
    }

    const studentData = {
      id: updateStudentData.id,
      name: name,
      dateofbirth: dateOfBirth,
      gender: gender,
      class: classes,
      image: image,
      feedback: feedback,
    };

    try {
      await updateStudent(updateStudentData.id, studentData);
      onStudentUpdated(studentData); 
      handleClose();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  useEffect(() => {
    if (show) {
      setName(updateStudentData.name || "");
      setDateOfBirth(updateStudentData.dateofbirth || "");
      setGender(updateStudentData.gender);
      setClasses(updateStudentData.class || "");
      setImage(updateStudentData.image || "");
      setFeedback(updateStudentData.feedback || "");
    }
  }, [updateStudentData]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter date of birth"
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <option value={true}>Male</option>
              <option value={false}>Female</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Class</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter class"
              value={classes}
              onChange={(event) => setClasses(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter feedback"
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleUpdateStudent}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdate;
