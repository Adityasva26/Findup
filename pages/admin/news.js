import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./adminSidebar";
import AdminNavBar from "./adminnavbar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { URL } from "../../utility/api";
import { useRouter } from 'next/router'

function NewsAdmin() {
  const router = useRouter()
  const [data, setdata] = useState([]);
  const [userData, setuserData] = useState({});
  const [share, setShare] = useState("share-btn");
  useEffect(() => {
    getByid();
    setuserData();
  }, []);
  async function getByid(e) {
    axios
      .get(`${URL}newsList`)
      .then((response) => {
        let row_data = [];
        if (response.data.data.length > 0) {
          row_data = response.data.data.map((item, index) => {
            return {
              id: item.id,
              title: item.title,
              discription: item.discription,
              verified: item.verified,
              status: item.status,
            };
          });
        }
        setdata(row_data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const columns = [
    { field: "title", headerName: "Title", width: 300 },
    { field: "verified", headerName: "Verified", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      renderCell: (rowData) => {
        return (
          <>
            <div className="icon-boxes">
              <a onClick={()=>handleValidate(rowData.id)}>
              <i class="fa fa-check" aria-hidden="true" name="Validate"></i>
              </a>
              <Link href={`/admin/updateNews/${rowData.id}`}>
                <i className="	fas fa-edit" name="Edit"></i>
              </Link>
              <a onClick={()=>handleDelete(rowData.id)}>
                <i className="fas fa-trash-alt" name="Delete"></i>
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
    axios.post(`${URL}newsStatusUpdate`, {id:e})
    .then(response => {
      getByid()
        toast.success(response.data.message)
    })
    .catch(error => {
        console.log(error);
    }); 
  }
  const handleNavigate=()=>{
    router.push("/admin/addNews")
  }
  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </head>
      <div className="d-flex" id="wrapper">
        <Sidebar />
        <div
          id="page-content-wrapper"
          className="bg-white"
          style={{ background: "#fff" }}
        >
          <AdminNavBar />
          <div className="tp-user-cls">
            <div className="user">
              <h4>News</h4>
            </div>
            <div className="user add-btn">
              <button onClick={() => handleNavigate()}> Add News+</button>
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

export default NewsAdmin;
