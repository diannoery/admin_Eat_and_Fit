import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { BaseUrl } from "./const";
export default class DetailMakanan extends Component {
  render() {
    let { show, handleClose, detail } = this.props;
    return (
      <div>
        {" "}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Detail Makanan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-4">
                <label>Nama Makanan</label>
                {detail.food_name}
              </div>
              <div className="col-4">
                <label>Kalori</label>
                <br />
                {detail.food_calories}
              </div>
              <div className="col-4">
                <label>Lemat</label>
                <br />
                {detail.food_fat}
              </div>
            </div>

            <div className="row">
              <div className="col-4"></div>
              <div className="col-4">
                <label>Karbonhidrat</label>
                <br />
                {detail.food_carbs}
              </div>
              <div className="col-4">
                <label>Protein</label>
                <br />
                {detail.food_protein}
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <label>Harga</label>
                <br />
                {`Rp.${detail.food_price}`}
              </div>
              <div className="col-8">
                <label>Deskripsi</label>
                <br />
                {`${detail.food_desc}`}
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col">
                <img
                  src={`${BaseUrl}/images/${detail.food_id}.jpg`}
                  style={{ width: "100%", marginTop: 10 }}
                />
              </div>
            </div>
          </Modal.Body>
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
