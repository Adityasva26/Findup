
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from './adminSidebar';
import AdminNavBar from "./adminnavbar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { URL } from '../../utility/api';
import { useRouter } from 'next/router'
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";



function category() {
  const router = useRouter()
  const [data, setdata] = useState([])
  const [form, setForm] = useState({title:"",type:""})
  const [userData, setuserData] = useState({});
  const [share, setShare] = useState("share-btn");
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    getByid()
    setuserData()
  }, [])
  async function getByCategory (e) {
    axios.post(`${URL}categoryById`, { id: e})
    .then(response => {
        setForm({title:response.data.data.title,type:response.data.data.type})
    })
    .catch(error => {
        console.log(error);
    });
 }
  async function getByid(e) {
    axios.get(`${URL}categoryList`)
      .then(response => {
        let row_data = [];
        if (response.data.data.length > 0) {
          row_data = response.data.data.map((item, index) => {
            return {
              id: item.id,
              title: item.title,
              type: item.type,
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
    { field: 'type', headerName: 'Type', width: 300 },
    { field: 'status', headerName: 'Status', width: 200 },
    {
      field: 'Action', headerName: 'Action', width: 200,
      renderCell: (rowData) => {
        return (
          <>
          <div className="icon-boxes">
            <a
             onClick={()=>handleEdit(rowData.id)}
            >
           <i className="	fas fa-edit"></i>
           </a>
           <a
             onClick={()=>handleDelete(rowData.id)}
            >
           <i className="fas fa-trash-alt" ></i>
            </a>
            </div>
          </>
        );
      },
    },
  ];
  const handleDelete = (e)=>{
    axios.post(`${URL}categoryDelete`, {id:e})
    .then(response => {
      getByid()
        toast.success(response.data.message)
    
        
    })
    .catch(error => {
        console.log(error);
    }); 
  }
  const handleNavigate=()=>{
    router.push("/admin/addNewsletter")
  }
  const submitForm = () => {
    var addUpdateUrl=""
    if(id==""){
        addUpdateUrl="addcategory"
    }
    else{
        addUpdateUrl="categoryUpdate"
    }
    if (validateForm(data)) {
        
        axios.post(`${URL}${addUpdateUrl}`, { title: form.title,type: form.type})
        .then(response => { 
            toast.success(response.data.message)
            handleClose()
          getByid()
            
        })
        .catch(error => {
            console.log(error);
        }); 
    }
}
function validateForm(fieldsValue) {
    let fields = fieldsValue;
    let errors = {};
    let formIsValid = true;
    if (fields.title == "") {
        console.error("fields.name")
        formIsValid = false;
        errors.name = "*Please enter your name.";
    }
    if (fields.type == "") {
        console.error("url")
        formIsValid = false;
        errors.url = "*Please enter your url.";
    }
    // if (fields.category == "") {
    //     console.error("category")
    //     formIsValid = false;
    //     errors.category = "*Please enter your category.";
    // }
    setErrors(errors);
    return formIsValid;
}
const handleEdit = (e) => {
    getByCategory(e)
    handleShow()
    setId(e)
}
const handleADD = (e) => {
    handleShow()
    setId(e)
}

  return (
    <>
  <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" /></head>
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper" className="bg-white" style={{background:"#fff"}}>
        <AdminNavBar />
        <div className="tp-user-cls">
        <div className="user">
                    <h4>Category</h4>
            </div>
            <div className="user add-btn">
                    <button onClick={()=>handleADD("")}> Add Category+</button>
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
        <Modal show={show} onHide={handleClose} className="login_frm-cls cat-add-cls">
        <Modal.Header closeButton>
          <Modal.Title>{id==""?"ADD+":"UPDATE"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <div className="inner-form">
                {/* <form> */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Category Title</label>
                      <input value={form.title} onChange={(e)=>setForm({title:e.target.value,type:form.type})}/>
                      <p>{errors.title}</p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>What is your review of the tool?</label>
                     <select value={form.type} onChange={(e)=>setForm({title:form.title,type:e.target.value})}>
                        <option hidden>choose Type</option>
                        <option value="product">product</option>
                        <option value="news">news</option>
                     </select>
                     <p>{errors.type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="theme-btn first"
            data-bs-dismiss="modal"
            onClick={() => handleClear()}
          >
            Cancle
          </button>
          <button
            type="button"
            className="theme-btn"
            onClick={() => submitForm()}
          >
           Add {"->"}
          </button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
    </>
  );
}

export default category;