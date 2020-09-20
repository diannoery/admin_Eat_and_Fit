import React, { Component } from "react";

import Dashboard from "../pages/dashboard";
import Navbar from "../utils/navbar";
import Sidebar from "../utils/sidebar";
import Packets from "./packets";
import Food from "../pages/dataMakanan";
import OrderFood from "../pages/order";
import AddPackets from "./service/addPacket";
import AddFood from "./service/addFood";
import AddUser from "./service/addUser";
import { Route } from "react-router-dom";
import DataUser from "./user";
import EditUser from "./service/editUser";
import EditFood from "./service/editFood";
import EditPacket from "./service/editPacket";
class AdminPage extends Component {
  render() {
    let { logOut } = this.props;
    return (
      <div>
        <Navbar logout={logOut} />
        <Sidebar />
        <Route exact path="/" component={Dashboard} />

        <Route path="/packets" component={Packets} />
        <Route path="/makanan" component={Food} />
        <Route path="/order" component={OrderFood} />
        <Route path="/addPackets" component={AddPackets} />
        <Route path="/addFood" component={AddFood} />
        <Route path="/addUser" component={AddUser} />
        <Route path="/editUser/:id" component={EditUser} />
        <Route path="/editFood/:id" component={EditFood} />
        <Route path="/editPackets/:id" component={EditPacket} />
        <Route path="/user" component={DataUser} />
      </div>
    );
  }
}

export default AdminPage;
