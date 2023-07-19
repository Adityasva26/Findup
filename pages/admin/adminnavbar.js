function AdminNavBar() {
    return ( <>
    <nav className="navbar cust-nav navbar-expand-lg navbar-light bg-light border-bottom">
                    <div className="container-fluid">
                        {/* <button className="btn btn-primary" id="sidebarToggle">Toggle Menu</button> */}
                        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button> */}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                                <li className="nav-item ">
                                    <a className="nav-link " href="#" role="button">Logout</a>
                                    
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
    </> );
}

export default AdminNavBar;