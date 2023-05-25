
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from './adminSidebar';
import AdminNavBar from "./adminnavbar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { URL } from '../../utility/api';
import { useRouter } from 'next/router'




function User() {
  const router = useRouter()
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
          <div class="icon-boxes">
            <Link
              href={`/admin/updateUser/${rowData.id}`}
            >
         <i class="	fas fa-edit"></i>
         </Link>
         <a
            onClick={()=>handleDelete(rowData.id)}
            >
          <i class="fas fa-trash-alt" ></i>
            </a>
            </div>
          </>
        );
      },
    },
  ];
  const handleDelete = (e)=>{
    axios.post(`${URL}userDelete`, {id:e})
    .then(response => {
      getByid()
        toast.success(response.data.message)
    
        
    })
    .catch(error => {
        console.log(error);
    }); 
  }
  const handleNavigate=()=>{
    router.push("/admin/addUser")
  }
  return (<>
  <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" /></head>
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper"  class="bg-white" style={{background:"#fff"}}>
        <AdminNavBar />
        <div class="tp-user-cls">
        <div class="user">
                    <h4>User</h4>
            </div>
            <div class="user add-btn">
                    <button onClick={()=>handleNavigate()}> Add User+</button>
                </div>
                </div>
        <div className="container-fluid cust-table-box-cls">
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
    </>
  );
}

export default User;