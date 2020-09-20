import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
export default class ModalPacket extends Component {
  render() {
    let { show, handleClose, listFood } = this.props;
    const listMenu = listFood.map((food) => {
      return <div>{food.food_name}</div>;
    });
    return (
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Makanan Pada Paket Ini</Modal.Title>
          </Modal.Header>
          <Modal.Body>{listMenu}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
