import React, { Component } from "react";
import {
  updateFood,
  uploadImage,
  getFoodById,
  getImage,
} from "../../config/api";
import Swal from "sweetalert2";
import loading from "../../img/loading3.gif";
import { BaseUrl } from "../../utils/const";
export default class EditFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foodId: "",
      foodPortion: "",
      foodName: "",
      foodCalories: "",
      foodFat: "",
      foodCarbs: "",
      foodProtein: "",
      foodPrice: "",
      foodDesc: "",
      imageFoodId: "",
      imageFood: "",
      isLoading: false,
      imageLoad: false,
      disable: false,
    };
  }

  componentDidMount() {
    this.foodById(this.props.match.params.id);
  }
  foodById = (id) => {
    var token = sessionStorage.getItem("auth-token");
    getFoodById(id, token)
      .then((res) => {
        this.setState({
          ...this.state,
          foodId: res.food_id,
          foodPortion: res.food_portion,
          foodName: res.food_name,
          foodCalories: res.food_calories,
          foodFat: res.food_fat,
          foodCarbs: res.food_carbs,
          foodProtein: res.food_protein,
          foodPrice: res.food_price,
          foodDesc: res.food_desc,
          imageFoodId: res.food_id,
          imageLoad: true,
        });
      })
      .catch((e) => {});
  };

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleChangeFile = (event) => {
    let name = event.target.name;
    let value = event.target.files[0];
    console.log(value);
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    this.setState({ ...this.state, isLoading: true });
    const food = {
      food_portion: this.state.foodPortion,
      food_name: this.state.foodName,
      food_calories: this.state.foodCalories,
      food_fat: this.state.foodFat,
      food_carbs: this.state.foodCarbs,
      food_protein: this.state.foodProtein,
      food_price: this.state.foodPrice,
      food_desc: this.state.foodDesc,
    };
    const token = sessionStorage.getItem("auth-token");

    var idFood = this.state.foodId;
    updateFood(idFood, food, token)
      .then((res) => {
        if (this.state.imageFood != "") {
          uploadImage(idFood, this.state.imageFood, token)
            .then((res) => {
              Swal.fire("", "Update Makananan", "success");
              this.props.history.push({
                pathname: "/makanan",
              });
            })
            .catch((e) => {
              Swal.fire("", "Update Image", "error");
              this.props.history.push({
                pathname: "/makanan",
              });
            });
        } else {
          Swal.fire("", "Edit Food", "success");
          this.props.history.push({
            pathname: "/makanan",
          });
        }
      })
      .catch((e) => {
        Swal.fire("", "Update Makananan", "error");
        this.props.history.push({
          pathname: "/makanan",
        });
      });
  };

  render() {
    const imageUrl = (
      <img
        src={`${BaseUrl}/images/${this.state.foodId}.jpg`}
        style={{ height: 50, width: 50, marginTop: 10 }}
      />
    );
    return (
      <div>
        <div class="content-wrapper">
          <div class="container-fluid">
            <div class="row mt-3 d-flex justify-content-center">
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Tambah Makanan</h3>
                </div>

                <div class="card-body">
                  <div class="form-group">
                    <label for="exampleInputPassword1">Nama Menu</label>

                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                      name="foodName"
                      disabled={this.state.isLoading}
                      placeholder="Nama Menu"
                      value={this.state.foodName}
                      onChange={this.handleChange}
                    />
                  </div>

                  <label for="exampleInputPassword1">AKG Makanan</label>
                  <div className="row">
                    <div className="col-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Protein</label>

                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputPassword1"
                          name="foodProtein"
                          placeholder="Protein"
                          value={this.state.foodProtein}
                          disabled={this.state.isLoading}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Karbohidrat</label>

                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputPassword1"
                          name="foodCarbs"
                          placeholder="Karbohidrat"
                          disabled={this.state.isLoading}
                          value={this.state.foodCarbs}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Lemak</label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputPassword1"
                          name="foodFat"
                          placeholder="Lemak"
                          disabled={this.state.isLoading}
                          value={this.state.foodFat}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">kalori</label>

                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputPassword1"
                          name="foodCalories"
                          placeholder="kalori"
                          disabled={this.state.isLoading}
                          value={this.state.foodCalories}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="exampleInputPassword1">Deskripsi Menu</label>

                    <textarea
                      class="form-control"
                      rows="3"
                      placeholder="Deskripsi Menu"
                      name="foodDesc"
                      disabled={this.state.isLoading}
                      value={this.state.foodDesc}
                      onChange={this.handleChange}
                    ></textarea>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Harga Menu</label>

                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputPassword1"
                          name="foodPrice"
                          placeholder="Harga Menu"
                          disabled={this.state.isLoading}
                          value={this.state.foodPrice}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Porsi Menu</label>

                        <input
                          type="number"
                          class="form-control"
                          id="exampleInputPassword1"
                          name="foodPortion"
                          placeholder="Porsi Menu"
                          disabled={this.state.isLoading}
                          value={this.state.foodPortion}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="exampleInputFile">Gambar Menu</label>
                    <div class="input-group">
                      <div class="custom-file">
                        <label class="custom-file-label" for="exampleInputFile">
                          {this.state.imageFood.name || "choose file"}
                        </label>

                        <input
                          type="file"
                          name="imageFood"
                          class="custom-file-input"
                          id="exampleInputFile"
                          disabled={this.state.isLoading}
                          onChange={this.handleChangeFile}
                        />
                      </div>
                    </div>
                    {imageUrl}
                  </div>
                </div>

                <div class="card-footer" style={{ background: "#add6f7ff" }}>
                  <div className="row  d-flex justify-content-center">
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
      </div>
    );
  }
}
