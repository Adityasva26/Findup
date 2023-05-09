
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from './adminSidebar';
import AdminNavBar from "./adminnavbar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { URL } from '../../utility/api';




function User() {
  const [data, setdata] = useState([])
  const [userData, setuserData] = useState({});
  const [share, setShare] = useState("share-btn");
  useEffect(() => {
    getByid()
    setuserData()
  }, [])
  async function getByid(e) {
    axios.get(`${URL}userList`)
      .then(response => {
        let row_data = [];
        if (response.data.data.length > 0) {
          row_data = response.data.data.map((item, index) => {
            return {
              id: item.id,
              full_name: item.full_name,
              email: item.email,
              status: item.status,

            };
          });
        }
        setdata(row_data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  const columns = [
    { field: 'full_name', headerName: 'Full Name', width: 300 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'status', headerName: 'Status', width: 200 },
    {
      field: 'Action', headerName: 'Action', width: 200,
      renderCell: (rowData) => {
        return (
          <>
            <Link
              href={"/admin/addUpdateUser"}
            >
            <i class="far fa-eye" ></i>
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper">
        <AdminNavBar />

        <div className="container-fluid">
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          // checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}

export default User;