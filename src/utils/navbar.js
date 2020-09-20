import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div >
        <nav class="main-header navbar navbar-expand navbar-black navbar-light">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" data-widget="pushmenu" href="#" role="button">
                <i class="fas fa-bars"></i>
              </a>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                this.props.logout();
              }}
            >
              Logout
            </button>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
