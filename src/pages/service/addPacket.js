import React, { Component } from "react";
import PropTypes from "prop-types";
import checkboxes from "../../utils/checkbox";
import Checkbox from "../../utils/Checkboxes";
import { getFood, addPacket } from "../../config/api";
import Swal from "sweetalert2";
import loading from "../../img/loading3.gif";
export default class AddCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listFood: [],
      foodItem: [],
      namaPaket: "",
      hargaPaket: "",
      descPaket: "",
      page: 1,
      limit: 100,
      keyword: "",
      isLoading: false,
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
    getFood(paging, token)
      .then((res) => {
        this.setState({ ...this.state, listFood: res });
      })
      .catch();
  };

  handleChange = (e) => {
    var nama = e.target.name;
    var value = e.target.value;
    this.setState({
      [nama]: value,
    });
  };

  handleSubmit = () => {
    this.setState({ ...this.state, isLoading: true });
    const paket = {
      packet_name: this.state.namaPaket,
      packet_price: this.state.hargaPaket,
      packet_desc: this.state.descPaket,
    };
    const token = sessionStorage.getItem("auth-token");

    const inputPacket = {
      packet: paket,
      list_food: this.state.foodItem,
    };
    addPacket(inputPacket, token)
      .then((res) => {
        Swal.fire("", "Tambah paket", "success");
        this.props.history.push({
          pathname: "/packets",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleCheckBox = (event) => {
    let list = this.state.foodItem;
    let check = event.target.checked;
    let checked_food = event.target.value;
    if (check) {
      this.setState({
        foodItem: [...this.state.foodItem, checked_food],
      });
    } else {
      var index = list.indexOf(checked_food);
      if (index > -1) {
        list.splice(index, 1);
        this.setState({
          foodItem: list,
        });
      }
    }
  };
  render() {
    const listData = this.state.listFood.map((foods, ind) => (
      <div className="col-4">
        <div key={ind} className="checks">
          <label>
            <input
              type="checkbox"
              name={foods.food_name}
              value={foods.food_id}
              // checked={res.list_food.includes(food.food_id)}
              onChange={this.handleCheckBox}
              disabled={this.state.isLoading}
            />
            {foods.food_name}
          </label>
        </div>
      </div>
    ));
    return (
      <div>
        <div class="content-wrapper">
          <div class="container-fluid">
            <div class="row mt-3 d-flex justify-content-center">
              <div class="card card-primary ">
                <div class="card-header">
                  <h3 class="card-title">Tambah Paket</h3>
                </div>

                <div class="card-body">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Nama Paket</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      name="namaPaket"
                      placeholder="Nama Paket"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Harga Paket</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      name="hargaPaket"
                      placeholder="Harga Paket"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Deskripsi Paket</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      name="descPaket"
                      placeholder="Deskripsi Paket"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div id="newDeal" className="formContainer">
                    <div className="checkBoxContainer">
                      <div className="row"> {listData}</div>
                    </div>
                  </div>
                </div>

                <div
                  class="card-footer d-flex justify-content-center"
                  style={{ background: "#add6f7ff" }}
                >
                  {this.state.isLoading ? (
                    <img src={loading} style={{ height: 50, width: 50 }} />
                  ) : (
                    <button
                      type="submit"
                      class="btn btn-primary "
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
