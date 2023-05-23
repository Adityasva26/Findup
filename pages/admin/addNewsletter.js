import Sidebar from "./adminSidebar";
import AdminNavBar from "./adminnavbar";

function AddNewsletter() {
    return (<>


        <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" /></head>
        <div className="d-flex" id="wrapper">
            <Sidebar />
            <div id="page-content-wrapper" class="bg-white" style={{ background: "#fff" }}>
                <AdminNavBar />
                <div class="user">
                    <h4> Add Newsletter</h4>
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
                                                    <label>News Title</label>
                                                    <input type="text" placeholder="Copy AI"
                                                    // onChange={(e)=>setData({name:e.target.value,url:data.url,category:data.category})} 
                                                    />
                                                    {/* <p>{errors.name}</p> */}
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>News URL</label>
                                                    <input type="text" placeholder="https://copy.ai"
                                                    // onChange={(e)=>setData({name:data.name,url:e.target.value,category:data.category})} 
                                                    />
                                                    {/* <p>{errors.url}</p> */}
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Select categories (max 3)</label>
                                                    <select
                                                    // onChange={(e)=>setData({name:data.name,url:data.url,category:e.target.value})}
                                                    >

                                                        {/* {categoryListing?.Category?.map((item)=><option value={item.id}>{item.title}</option>)} */}
                                                        {/* <p>{errors.category}</p> */}
                                                    </select>
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

export default AddNewsletter;