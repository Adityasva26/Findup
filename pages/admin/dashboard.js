


import Sidebar from "./adminSidebar";
import AdminNavBar from "./adminnavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from '../../utility/api';
import Link from "next/link";

function Dashboard() {
    const [userData, setuserData] = useState({});
    const [data, setdata] = useState({})
    useEffect(() => {
        setuserData(JSON?.parse(window.localStorage.getItem('adminData')))
        loadDashboard()
    }, [])
    const loadDashboard = (e) => {
        axios.get(`${URL}adminDashboard`, { id: e })
            .then(response => {
                setdata(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div className="d-flex" id="wrapper">

            <Sidebar />

            <div id="page-content-wrapper" className="bg-white">

                <AdminNavBar />

                <div className="container-fluid cust-text-box-cls">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="inner-det first">
                                <Link href="/admin/user">
                                    <h3>User</h3>
                                    <p>{data?.users}</p>
                                </Link>
                            </div>

                        </div>
                        <div className="col-md-4">
                            <div className="inner-det second">
                                <Link href="/admin/product">
                                    <h3>Product</h3>
                                    <p>{data?.products}</p>
                                </Link>
                            </div>

                        </div>
                        <div className="col-md-4">
                            <div className="inner-det third">
                                <Link href="/admin/news">
                                    <h3>News</h3>
                                    <p>{data?.newss}</p>
                                </Link>
                            </div>

                        </div>
                        <div className="col-md-4">
                            <div className="inner-det four">
                                <Link href="/admin/newsletter">
                                    <h3>Newsletter</h3>
                                    <p>{data?.newsletters}</p>
                                </Link>
                            </div>

                        </div>
                        <div className="col-md-4">
                            <div className="inner-det five">
                                <Link href="/admin/category">
                                    <h3>Category</h3>
                                    <p>{data?.categories}</p>
                                </Link>
                            </div>

                        </div>
                        <div className="col-md-4">
                            <div className="inner-det six">
                                <Link href="/admin/comment">
                                    <h3>Comment</h3>
                                    <p>{data?.comments}</p>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default Dashboard;