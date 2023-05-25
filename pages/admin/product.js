
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from './adminSidebar';
import AdminNavBar from "./adminnavbar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { URL } from '../../utility/api';
import { useRouter } from 'next/router'



function AdminProduct() {
  const router = useRouter()
  const [data, setdata] = useState([])
  const [userData, setuserData] = useState({});
  const [share, setShare] = useState("share-btn");
  useEffect(() => {
    getByid()
    setuserData()
  }, [])
  async function getByid(e) {
    axios.get(`${URL}productList`)
      .then(response => {
        let row_data = [];
        if (response.data.data.length > 0) {
          row_data = response.data.data.map((item, index) => {
            return {
              id: item.id,
              title: item.title,
              description: item.description,
              verified: item.verified,
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
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'verified', headerName: 'Verified', width: 300 },
    { field: 'status', headerName: 'Status', width: 200 },
    {
      field: 'Action', headerName: 'Action', width: 200,
      renderCell: (rowData) => {
        return (
          <>
          <div class="icon-boxes">
            <a
             onClick={()=>handleValidate(rowData.id)}
            >
               <i class="fa-solid fa-check"></i>
               </a>
               <Link
              href={`/admin/updateProduct/${rowData.id}`}
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
    axios.post(`${URL}newsdelete`, {id:e})
    .then(response => {
      getByid()
        toast.success(response.data.message)
    
        
    })
    .catch(error => {
        console.log(error);
    }); 
  }
  const handleValidate=(e)=>{
    axios.post(`${URL}productStatusUpdate`, {id:e})
    .then(response => {
      getByid()
        toast.success(response.data.message)
    })
    .catch(error => {
        console.log(error);
    }); 
  }
  const handleNavigate=()=>{
    router.push("/admin/addProduct")
  }
  return (
    <>
  <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" /></head>
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper" class="bg-white" style={{background:"#fff"}} >
        <AdminNavBar />
        <div class="tp-user-cls">
        <div class="user">
                    <h4>Product</h4>
            </div>
            <div class="user add-btn">
                    <button onClick={()=>handleNavigate()}> Add Product+</button>
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

export default AdminProduct;