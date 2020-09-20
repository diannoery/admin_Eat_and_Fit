import React, { Component } from "react";
import PropTypes from "prop-types";
import checkboxes from "../../utils/checkbox";
import Checkbox from "../../utils/Checkboxes";
import { getFood, updatePacket, getPacketById } from "../../config/api";
import Swal from "sweetalert2";
import loading from "../../img/loading3.gif";
export default class EditPacket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listFood: [],
      foodItem: [],
      listFoodByID: [],
      idPacket: "",
      namaPaket: "",
      hargaPaket: "",
      descPaket: "",
      page: 1,
      limit: 100,
      keyword: "",
      isLoading: false,
      isCheked: false,
    };
  }

  componentDidMount() {
    this.loadData(this.state.page, this.state.limit, this.state.keyword);
    this.setState({
      ...this.state,
      listFoodByID: [],
    });
    this.packetById(this.props.match.params.id);
  }
  componentDidUpdate() {}

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

  packetById = (id) => {
    var token = sessionStorage.getItem("auth-token");
    getPacketById(id, token)
      .then((res) => {
        this.setState({
          ...this.state,
          listFoodByID: res.list_food,
          idPacket: res.packet.packet_id,
          namaPaket: res.packet.packet_name,
          hargaPaket: res.packet.packet_price,
          descPaket: res.packet.packet_desc,
        });
        for (var items of this.state.listFoodByID) {
          this.state.foodItem.push(items.food_id);
        }
        this.setState({
          isCheked: true,
        });
      })
      .catch((e) => {});
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
    console.log(this.state.foodItem);
    const inputPacket = {
      packet: paket,
      list_food: this.state.foodItem,
    };
    var idPacket = this.state.idPacket;
    updatePacket(idPacket, inputPacket, token)
      .then((res) => {
        Swal.fire("", "Edit paket", "success");
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

  checkFood = (id) => {
    var foods = this.state.foodItem;

    for (let index = 0; index < foods.length; index++) {
      const element = foods[index];
      if (element == id) {
        return true;
      }
    }

    // return false;
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
              //defaultChecked={this.checkFood(foods.food_id)}
              checked={this.checkFood(foods.food_id)}
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
        {console.log(this.state.foodItem)}
        <div class="content-wrapper">
          <div class="container-fluid">
            <div class="row mt-3 d-flex justify-content-center">
              <div class="card card-primary ">
                <div class="card-header">
                  <h3 class="card-title">Edit Paket</h3>
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
                      value={this.state.namaPaket}
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
                      value={this.state.hargaPaket}
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
                      value={this.state.descPaket}
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
