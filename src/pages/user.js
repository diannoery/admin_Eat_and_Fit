import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getUser, deleteUser, getTotalUser } from "../config/api";
import loading from "../img/loading.gif";
import { Modal, Button, Pagination } from "react-bootstrap";

const DataUser = () => {
  const [show, setShow] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [page, setPage] = useState("1");
  const [limit, setLimit] = useState("10");
  const [keyword, setKeyword] = useState("");
  const [total, setTotal] = useState("");

  const loadData = (page, limit, keyword) => {
    var token = sessionStorage.getItem("auth-token");
    const paging = {
      page,
      limit,
      keyword,
    };
    getUser(paging, token).then((res) => {
      setUserList(res);

      setPage(page);

      setLoading(true);
    });
  };

  const deleteModal = (id) => {
    setIdUser(id);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const deleteUserId = () => {
    var token = sessionStorage.getItem("auth-token");
    deleteUser(idUser, token)
      .then((res) => {
        Swal.fire("", "Hapus User", "success");
        setShow(false);
        loadData();
      })
      .catch((e) => {});
  };
  const getTotal = () => {
    var token = sessionStorage.getItem("auth-token");
    getTotalUser(token)
      .then((res) => {
        setTotal(res.total_data);
      })
      .catch((e) => {});
  };
  useEffect(() => {
    loadData(page, limit, keyword);
    getTotal();
  }, []);

  let maks = total / limit;
  let items = [];
  if (total % limit != 0) {
    maks++;
  }

  for (let number = 1; number <= maks; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number == page}
        onClick={() => {
          setLoading(false);
          loadData(number, limit, keyword);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  const user = userList.map((list, index) => (
    <tr>
      <td>{page == 1 ? index + 1 : index + 1 + Number(limit)}</td>
      <td>{list.user_f_name}</td>
      <td>{list.user_l_name}</td>
      <td>{list.user_email}</td>
      <td>{list.user_balance}</td>
      <td>
        <Link
          title="Edit"
          style={{ marginRight: 15 }}
          to={`/editUser/${list.user_id}`}
        >
          <button className="btn btn-success">
            <i class="fas fa-edit" />
          </button>
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteModal(list.user_id);
          }}
        >
          <i class="fas fa-trash" />
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <div style={{backgroundColor:"#f8b02b"}} class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 style={{fontFamily:"Lora",fontSize:"30px"}}>Data Tabel User</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <a style={{color:"white"}} href="#">Home</a>
                  </li>
                  <li class="breadcrumb-item active">Data User</li>
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
                    <h3 class="card-title">Daftar User</h3>
                    <div className="d-flex flex-row-reverse">
                      <Link className="brand-link" to="/addUser">
                        <button style={{fontFamily:"Lora", color:"black"}} className="btn btn-outline-info">Tambah</button>
                      </Link>
                    </div>
                  </div>

                  <div class="card-body">
                    {isLoading ? (
                      <table
                        id="example2"
                        class="table table-bordered table-hover"
                      >
                        <thead  style={{fontFamily:"PT Serif"}}>
                          <tr>
                            <th>No</th>
                            <th>First Name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Balance</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>{user} </tbody>
                      </table>
                    ) : (
                      <img src={loading} style={{ marginLeft: 180 }} />
                    )}
                  </div>
                  <div className="card-footer d-flex justify-content-end">
                    <Pagination size="sm">
                      <Pagination.Prev
                        disabled={page == 1}
                        onClick={() => {
                          setLoading(false);
                          loadData(page - 1, limit, keyword);
                        }}
                      />{" "}
                      {items}
                      <Pagination.Next
                        disabled={page == Math.floor(maks)}
                        onClick={() => {
                          setLoading(false);
                          loadData(Number(page) + 1, limit, keyword);
                        }}
                      />
                    </Pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Ingin Menghapus User Ini ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteUserId}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataUser;
