import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getTransaction } from "../config/api";
import ModalPacket from "../utils/modalPacket";
import loading from "../img/loading.gif";
import Swal from "sweetalert2";
import DeletePacket from "../utils/deletePacket";
class OrderMakanan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderList: [],
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
    getTransaction(paging, token).then((res) => {
      this.setState({ ...this.state, orderList: res, isLoading: true });
    });
  };

  render() {
    var order = "";
    if (this.state.orderList == null) {
      order = "Data Not Found";
    } else {
      order = this.state.orderList.map((list, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{list.trans_date}</td>
          <td>{list.portion}</td>
          <td>{list.total_price}</td>
          <td>{list.address}</td>
          <td>{list.order_status == 0 ? "Belum bayar" : "Lunas"}</td>

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
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                this.deleteModal(list.trans_id);
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
        <div style={{ backgroundColor: "#f8b02b" }} class="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1 style={{ fontFamily: "Lora", fontSize: "30px" }}>
                    Data Tabel User
                  </h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <a style={{ color: "white" }} href="#">
                        Home
                      </a>
                    </li>
                    <li class="breadcrumb-item active">Orderan Makanan</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <div style={{ background: "#facc6b" }} class="card">
                    <div class="card-header">
                      <h3
                        class="card-title"
                        style={{ fontFamily: "Lora", fontSize: "20px" }}
                      >
                        Daftar Orderan Makanan
                      </h3>
                    </div>

                    <div class="card-body">
                      <table
                        id="example2"
                        class="table table-bordered table-hover"
                      >
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Tanggal Transaksi</th>
                            <th>Banyak Porsi</th>
                            <th>Total Harga</th>
                            <th>Alamat</th>
                            <th>Status Pembayaran</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>{order}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default OrderMakanan;
