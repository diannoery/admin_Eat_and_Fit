import React, { Component } from "react";
import { Modal, Button, Pagination } from "react-bootstrap";
import { deletePacket } from "../config/api";
import Swal from "sweetalert2";
export default class DeletePacket extends Component {
  render() {
    let { show, handleClose, deletePacket } = this.props;
    return (
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>Apakah Ingin Menghapus Packet Ini ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={deletePacket}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
