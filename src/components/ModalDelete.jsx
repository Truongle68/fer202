import { Modal, Button, Form } from 'react-bootstrap';
import { deleteStudent } from '../services/studentService';
import { toast } from 'react-toastify';

const ModalDelete = (props) => {
  const { show, handleClose, studentData, onStudentDeleted } = props;

  const handleDeleteStudent = async () => {
    if (window.confirm(`Are you sure you want to delete student data id=${studentData.id}?`)) {
      try {
        let res = await deleteStudent(studentData.id);
        if(res.status===200){
          toast.success('Student deleted successfully!')
          onStudentDeleted(studentData.id); // Cập nhật danh sách sinh viên trong component cha
          handleClose();
        }else{
          toast.error('Failed to delete student');
        }        
      } catch (e) {
        console.error(e.error);
        toast.error('An error occurred while deleting student');
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Id: {studentData.id}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name: {studentData.name}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date of birth: {studentData.dateofbirth}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gender: {studentData.gender ? "male" : "female"}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Class: {studentData.class}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image: <img src={studentData.image} alt="Student" style={{ width: '30%' }} /></Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Feedback: {studentData.feedback}</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDeleteStudent}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelete;
