


import Sidebar from "./adminSidebar";
import AdminNavBar from "./adminnavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from '../../utility/api';

function Dashboard() {
    const [userData, setuserData] = useState({});
    const [data, setdata] = useState({})
    useEffect(() => {
        setuserData(JSON?.parse(window.localStorage.getItem('data')))
        loadDashboard()
    },[])
    const loadDashboard = (e)=>{
        axios.get(`${URL}adminDashboard`, {id:e})
        .then(response => {
         setdata(response.data)
        })
        .catch(error => {
            console.log(error);
        }); 
      }
    return (
        <div class="d-flex" id="wrapper">
            
           <Sidebar/>
            
            <div id="page-content-wrapper" class="bg-white">
              
                <AdminNavBar/>
              
                <div class="container-fluid cust-text-box-cls">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="inner-det first">
                                <h3>User</h3>
                                <p>{data?.users}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                        <div class="inner-det second">
                                <h3>Product</h3>
                                <p>{data?.products}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                        <div class="inner-det third">
                                <h3>News</h3>
                                <p>{data?.newss}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                        <div class="inner-det four">
                                <h3>Newsletter</h3>
                               <p>{data?.newsletters}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                        <div class="inner-det five">
                                <h3>Category</h3>
                               <p>{data?.categories}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                        <div class="inner-det six">
                                <h3>Comment</h3>
                               <p>{data?.comments}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default Dashboard;