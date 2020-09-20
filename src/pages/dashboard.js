import React, { Component } from "react";

class Dashboard extends Component {
  render() {
    return (
      <div >
        <div class="content-wrapper" style={{backgroundColor:"#f8b02b"}}>
          <div class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1 style={{fontFamily:"'Lora'", color:"#f8b02b",fontSize:"40px", fontStyle:"bold"}} class="m-0 text-dark">Dashboard</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <a style={{color:"whitesmoke"}} href="#">Home</a>
                    </li>
                    <li style={{color:"whitesmoke"}} href="#" class="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>
              </div>
              <div class="row">
                <div  class="col-md-3 col-sm-6 col-12">
                  <div style={{background:"#720421"}} class="info-box">
                    <span class="info-box-icon bg-warning">
                      <i style={{color:"white"}} class="fas fa-clipboard-list"></i>
                    </span>

                    <div  class="info-box-content">
                      <span style={{fontFamily:"Lora", color:"white", fontSize:"23px"}} class="info-box-text">Total Menu</span>
                      <span style={{fontFamily:"Lora", color:"white", fontSize:"15px"}} class="info-box-number">7</span>
                    </div>
                  </div>
                </div>

                <div class="col-md-3 col-sm-6 col-12">
                  <div style={{background:"#720421"}} class="info-box">
                    <span class="info-box-icon bg-warning">
                      <i style={{color:"white"}} class="far fa-flag"></i>
                    </span>

                    <div class="info-box-content">
                      <span  style={{fontFamily:"Lora", color:"white", fontSize:"23px"}} class="info-box-text">Total Paket</span>
                      <span  style={{fontFamily:"Lora", color:"white", fontSize:"15px"}} class="info-box-number">4</span>
                    </div>
                  </div>
                </div>

                <div  class="col-md-3 col-sm-6 col-12">
                  <div style={{background:"#720421"}} class="info-box">
                    <span class="info-box-icon bg-warning">
                      <i style={{color:"white"}} class="far fa-copy"></i>
                    </span>

                    <div class="info-box-content">
                      <span style={{fontFamily:"Lora", color:"white", fontSize:"23px"}} class="info-box-text">Total Order</span>
                      <span style={{fontFamily:"Lora", color:"white", fontSize:"15px"}} class="info-box-number">100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside class="control-sidebar control-sidebar-dark"></aside>
      </div>
    );
  }
}

export default Dashboard;
