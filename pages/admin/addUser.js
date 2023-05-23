import Sidebar from "./adminSidebar";
import AdminNavBar from "./adminnavbar";

function AddUpdateUser() {
    return (<>


        <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" /></head>
        <div className="d-flex" id="wrapper">
            <Sidebar />
            <div id="page-content-wrapper" class="bg-white" style={{ background: "#fff" }}>
                <AdminNavBar />
                <div class="user">
                    <h4> Add User</h4>
                </div>
               
                <div className="container-fluid">
                    <div class="submit-form mt40 mb40">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="inner-form">

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>User Name</label>
                                                    <input type="text" name="" onChange={(e) => setregisterForm({ name: e.target.value, email: registerForm.email, password: registerForm.password })} />
                                                    {/* <p>{errors.name}</p> */}
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>email</label>
                                                    <input type="email" name="" onChange={(e) => setregisterForm({ name: registerForm.name, email: e.target.value, password: registerForm.password })} />
                                                    {/* <p>{errors.url}</p> */}
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>User URL</label>
                                                    <input type="Password" name="" onChange={(e) => setregisterForm({ name: registerForm.name, email: registerForm.email, password: e.target.value })} />
                                                    <p>{errors.url}</p>
                                                </div>
                                            </div>   
                                         
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>upload Image</label>
                                                    <input type="file" name=""
                                                    //      onChange={(e, fields) => {
                                                    //     handleChange(e, fields)
                                                    // }}
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <button type="submit" class="theme-btn"
                                                    //  onClick={(e) => submitForm()}
                                                    >Submit</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default AddUpdateUser;