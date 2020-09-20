import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  deleteFoodById,
  getFood,
  getTotalUser,
  getFoodById,
} from "../config/api";
import loading from "../img/loading.gif";
import { Modal, Button, Pagination } from "react-bootstrap";
import DetailMakanan from "../utils/detailMakanan";
import Swal from "sweetalert2";
class DataMakanan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuList: [],
      detailFood: [],
      idFood: "",
      page: 1,
      limit: 5,
      total: 0,
      keyword: "",
      show: false,
      delete: false,
      isLoading: false,
    };
  }
  componentDidMount() {
    this.loadData(this.state.page, this.state.limit, this.state.keyword);
    this.getTotal();
  }
  loadData = (page, limit, keyword) => {
    var token = sessionStorage.getItem("auth-token");
    const paging = {
      page,
      limit,
      keyword,
    };
    getFood(paging, token).then((res) => {
      if (res.code != 200) {
        this.setState({ ...this.state, menuList: res, isLoading: true });
      } else {
        Swal.fire("", `Gagal Load data ${res.code}`, "error");
      }
    });
  };
  detailFood = (id) => {
    var token = sessionStorage.getItem("auth-token");
    getFoodById(id, token)
      .then((res) => {
        console.log(res);
        this.setState({
          detailFood: res,
          show: true,
        });
      })
      .catch((e) => {});
  };
  deleteFood = () => {
    var token = sessionStorage.getItem("auth-token");
    deleteFoodById(this.state.idFood, token)
      .then((res) => {
        Swal.fire("", "Hapus Makanan", "success");
        this.setState({ ...this.state, delete: false });
        this.loadData(this.state.page, this.state.limit, this.state.keyword);
      })
      .catch((e) => {});
  };
  deleteModal = (id) => {
    this.setState({
      delete: true,
      idFood: id,
    });
  };

  handleClose = () => {
    this.setState({ ...this.state, show: false, delete: false });
  };
  getTotal = () => {
    var token = sessionStorage.getItem("auth-token");
    getTotalUser(token)
      .then((res) => {
        this.setState({ ...this.state, total: res.total_data });
      })
      .catch((e) => {});
  };

  render() {
    let maks = this.state.total / this.state.limit;
    let items = [];
    if (this.state.total % this.state.limit != 0) {
      maks++;
    }

    for (let number = 1; number <= maks; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number == this.state.page}
          onClick={() => {
            this.setState({ ...this.state, isLoading: false });
            this.loadData(number, this.state.limit, this.state.keyword);
          }}
        >
          {number}
        </Pagination.Item>
      );
    }
    var menu = "";

    if (this.state.menuList == null) {
      menu = "Data Not Found";
    } else {
      menu = this.state.menuList.map((list, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{list.food_name}</td>
          <td>{list.food_portion}</td>
          <td>{list.food_price}</td>
          <td>{list.food_desc}</td>
          <td>
            <button
              title="Detail"
              className="btn btn-info btn-sm"
              style={{ marginRight: 15 }}
              onClick={() => {
                this.detailFood(list.food_id);
              }}
            >
              <i class="fas fa-list" />
            </button>
            <Link
              title="Edit"
              style={{ marginRight: 15 }}
              to={`/editFood/${list.food_id}`}
            >
              <button className="btn btn-success btn-sm">
                <i class="fas fa-edit" />
              </button>
            </Link>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                this.deleteModal(list.food_id);
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
                  <h1 style={{fontFamily:"Lora",fontSize:"30px"}}>Tabel Data Makanan</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <a style={{color:"white"}} href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item active">Data Makanan</li>
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
                      <h3 class="card-title" style={{fontFamily:"Lora", fontSize:"20px"}}>Daftar Makanan</h3>
                      <div className="d-flex flex-row-reverse">
                        <Link className="brand-link" to="/addFood">
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
                              <th>Nama Makanan</th>
                              <th>Porsi</th>
                              <th>Harga (Rp)</th>
                              <th >Deskripsi</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody >{menu}</tbody>
                        </table>
                      ) : (
                        <img src={loading} style={{ marginLeft: 180 }} />
                      )}
                    </div>
                    <div className="card-footer d-flex justify-content-end">
                      <Pagination size="sm">
                        <Pagination.Prev
                          disabled={this.state.page == 1}
                          onClick={() => {
                            this.setState({ ...this.state, isLoading: false });

                            this.loadData(
                              this.state.page - 1,
                              this.state.limit,
                              this.state.keyword
                            );
                          }}
                        />{" "}
                        {items}
                        <Pagination.Next
                          disabled={this.state.page == Math.floor(maks)}
                          onClick={() => {
                            this.setState({ ...this.state, isLoading: false });
                            this.loadData(
                              this.state.page + 1,
                              this.state.limit,
                              this.state.keyword
                            );
                          }}
                        />
                      </Pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <DetailMakanan
            show={this.state.show}
            handleClose={this.handleClose}
            detail={this.state.detailFood}
          />
          <Modal show={this.state.delete} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>Apakah Ingin Menghapus Makanan Ini ?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="danger" onClick={this.deleteFood}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default DataMakanan;
