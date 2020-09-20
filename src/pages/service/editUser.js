import React, { Component } from "react";
import { getLevel, updateUser, getUserById } from "../../config/api";
import Swal from "sweetalert2";
export default class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: "",
      firstName: "",
      lastName: "",
      email: "",
      level: "",
      gender: "",
      password: "",
      isLoading: false,
      disable: false,
      levels: [],
    };
  }
  componentDidMount() {
    this.loadData();
    this.userById(this.props.match.params.id);
  }
  loadData = () => {
    var token = sessionStorage.getItem("auth-token");
    getLevel(token).then((res) => {
      this.setState({ ...this.state, levels: res });
    });
  };

  userById = (id) => {
    var token = sessionStorage.getItem("auth-token");
    getUserById(id, token)
      .then((res) => {
        this.setState({
          ...this.state,
          user_id: res.user_id,
          firstName: res.user_f_name,
          lastName: res.user_l_name,
          email: res.user_email,
          level: res.user_level,
          gender: res.user_gender,
          password: res.user_password,
          isLoading: true,
        });
      })
      .catch((e) => {});
  };

  handleSubmit = () => {
    this.setState({ ...this.state, disable: true });
    const user = {
      user_email: this.state.email,
      user_password: this.state.password,
      user_f_name: this.state.firstName,
      user_l_name: this.state.lastName,
      user_gender: this.state.gender,
      user_balance: "0",
      user_level: this.state.level,
      user_status: "1",
    };
    const token = sessionStorage.getItem("auth-token");
    var idUser = this.state.user_id;
    updateUser(idUser, user, token)
      .then((res) => {
        Swal.fire("", "Edit User", "success");
        this.props.history.push({
          pathname: "/user",
        });
      })
      .catch((e) => {
        Swal.fire("", "Edit User", "failed");
      });
  };

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const levelUser = this.state.levels.map((level, index) => (
      <option value={level.level_id}>{level.level_name}</option>
    ));
    return (
      <div>
        <div class="content-wrapper">
          <div class="container-fluid">
            <div class="row mt-3 d-flex justify-content-center">
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Edit User</h3>
                </div>
                <div class="card-body">
                  <div className="row">
                    <div className="col-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Nama Depan</label>
                        <input
                          type="text"
                          class="form-control"
                          id="Nama_Depan"
                          name="firstName"
                          placeholder="Nama Depan"
                          value={this.state.firstName}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Nama Belakang</label>
                        <input
                          type="text"
                          class="form-control"
                          id="Nama_Belakang"
                          name="lastName"
                          placeholder="Nama Belakang"
                          value={this.state.lastName}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">email</label>
                        <input
                          type="email"
                          class="form-control"
                          id="exampleInputPassword1"
                          name="email"
                          placeholder="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">gender</label>
                        <select
                          class="form-control"
                          name="gender"
                          onChange={this.handleChange}
                        >
                          <option>--Gender--</option>
                          <option value="L">Laki-Laki</option>
                          <option value="P">Perempuan</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Level User</label>
                        <select
                          class="form-control"
                          name="level"
                          onChange={this.handleChange}
                        >
                          {levelUser}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card-footer d-flex  justify-content-center">
                  {this.state.disable ? (
                    <button
                      type="submit"
                      class="btn btn-primary"
                      onClick={this.handleSubmit}
                      disabled
                    >
                      Edit User
                    </button>
                  ) : (
                    <button
                      type="submit"
                      class="btn btn-primary"
                      onClick={this.handleSubmit}
                    >
                      Edit User
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
