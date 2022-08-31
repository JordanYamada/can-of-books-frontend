import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';



class BookFormModal extends React.Component {
  render() {
    return(
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        keyboard="true"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100">Create a Book!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form 
        onSubmit={this.props.handleSubmit}
        >
          <Form.Label>Enter a Book Title!
            <Form.Control
              type="text"
              name="title"
              placeholder="(Really Cool Book)"
            />
          </Form.Label>
          <Form.Label>Give The Book a Description!
            <Form.Control
              type="text"
              name="description"
              placeholder="(Description)"
            />
          </Form.Label>
          <Form.Label>Status!
            <Form.Control
              type="text"
              name="status"
              placeholder="(Status)"
            />
          </Form.Label>
          <Button type="submit">Add Book!</Button>
        </Form>
        </Modal.Body>
      </Modal>
    )
  }

}




  export default BookFormModal;
