import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPacket, getDetailPacket, deletePacket } from "../config/api";
import ModalPacket from "../utils/modalPacket";
import loading from "../img/loading.gif";
import Swal from "sweetalert2";
import DeletePacket from "../utils/deletePacket";

class Packets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packetList: [],
      detailListFood: [],
      page: 1,
      limit: 5,
      total: 0,
      keyword: "",
      idPacket: "",
      isLoading: false,
      show: false,
      delete: false,
    };
  }
  componentDidMount() {
    this.loadData(this.state.page, this.state.limit, this.state.keyword);
  }

  loadData = (page, limit, keyword) => {
    var token = sessionStorage.getItem("auth-token");
    const paging = {
      page,
      limit,
      keyword,
    };
    getPacket(paging, token).then((res) => {
      this.setState({ ...this.state, packetList: res, isLoading: true });
    });
  };
  deleteModal = (id) => {
    this.setState({
      delete: true,
      idPacket: id,
    });
  };
  handleClose = () => {
    this.setState({ ...this.state, show: false, delete: false });
  };

  detailPacket = (idPacket) => {
    var token = sessionStorage.getItem("auth-token");
    getDetailPacket(idPacket, token).then((res) => {
      this.setState({
        ...this.state,
        detailListFood: res.list_food,
        isLoading: true,
        show: true,
      });
    });
  };

  deletePacketId = () => {
    var token = sessionStorage.getItem("auth-token");
    deletePacket(this.state.idPacket, token)
      .then((res) => {
        Swal.fire("", "Hapus Packet", "success");
        this.setState({ ...this.state, delete: false });
        this.loadData(this.state.page, this.state.limit, this.state.keyword);
      })
      .catch((e) => {});
  };

  render() {
    var packet = "";
    if (this.state.packetList == null) {
      packet = "Data Not Found";
    } else {
      packet = this.state.packetList.map((list, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{list.packet_name}</td>
          <td>{list.packet_price}</td>
          <td>{list.packet_desc}</td>
          <td>
            <button
              title="Detail"
              className="btn btn-info btn-sm"
              style={{ marginRight: 15 }}
              onClick={() => {
                this.detailPacket(list.packet_id);
              }}
            >
              <i class="fas fa-list" />
            </button>
            <Link
              title="Edit"
              style={{ marginRight: 15 }}
              to={`/editPackets/${list.packet_id}`}
            >
              <button className="btn btn-success btn-sm">
                <i class="fas fa-edit" />
              </button>
            </Link>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                this.deleteModal(list.packet_id);
              }}
            >
              <i class="fas fa-trash" />
            </button>
          </td>
        </tr>
      ));
    }
    return (
      <div>
        <div style={{backgroundColor:"#f8b02b"}} class="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1 style={{fontFamily:"Lora",fontSize:"30px"}}>Tabel Data Paket</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <a style={{color:"white"}} href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item active">Data Paket</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <div style={{background:"#facc6b"}} class="card">
                    <div class="card-header">
                      <h3 class="card-title" style={{fontFamily:"Lora", fontSize:"20px"}}>Daftar Paket</h3>
                      <div className="d-flex flex-row-reverse">
                        <Link className="brand-link" to="/addPackets">
                          <button style={{fontFamily:"Lora", color:"black"}} className="btn btn-outline-info">Tambah</button>
                        </Link>
                      </div>
                    </div>

                    <div class="card-body">
                      {this.state.isLoading ? (
                        <table
                          id="example2"
                          class="table table-bordered table-hover"
                        >
                          <thead style={{fontFamily:"PT Serif"}}>
                            <tr>
                              <th>No</th>
                              <th>Nama Paket</th>
                              <th>Harga (Rp)</th>
                              <th>Deskripsi</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>{packet}</tbody>
                        </table>
                      ) : (
                        <img src={loading} style={{ marginLeft: 180 }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <ModalPacket
            show={this.state.show}
            handleClose={this.handleClose}
            listFood={this.state.detailListFood}
          />
          <DeletePacket
            show={this.state.delete}
            handleClose={this.handleClose}
            deletePacket={this.deletePacketId}
          />
        </div>
      </div>
    );
  }
}

export default Packets;
