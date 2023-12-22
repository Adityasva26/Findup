import Link from "next/link";


function Sidebar() {
 
    console.log("id",window.location.pathname)
    return (  <div className="border-end bg-white admin-side-menu-cls" id="sidebar-wrapper">
    <div className="sidebar-heading border-bottom bg-light">
        <div className="side-logo">
            <img src="../img/Logo-inner.png" />
        </div>
    </div>
    <div className="list-group list-group-flush">
        <Link className={window.location.pathname=="/admin/dashboard"?"list-group-item list-group-item-action list-group-item-light p-3 active":"list-group-item list-group-item-action list-group-item-light p-3"} href="/admin/dashboard">Dashboard</Link>
        <Link className={window.location.pathname=="/admin/user"?"list-group-item list-group-item-action list-group-item-light p-3 active":"list-group-item list-group-item-action list-group-item-light p-3"} href="/admin/user">User</Link>
        <Link className={window.location.pathname=="/admin/product"?"list-group-item list-group-item-action list-group-item-light p-3 active":"list-group-item list-group-item-action list-group-item-light p-3"}href="/admin/product">Product</Link>
        <Link className={window.location.pathname=="/admin/news"?"list-group-item list-group-item-action list-group-item-light p-3 active":"list-group-item list-group-item-action list-group-item-light p-3"}href="/admin/news">News</Link>
        <Link className={window.location.pathname=="/admin/newsletter"?"list-group-item list-group-item-action list-group-item-light p-3 active":"list-group-item list-group-item-action list-group-item-light p-3"}href="/admin/newsletter">NewsLetter</Link>
        <Link className={window.location.pathname=="/admin/comment"?"list-group-item list-group-item-action list-group-item-light p-3 active":"list-group-item list-group-item-action list-group-item-light p-3"}href="/admin/comment">comment</Link>
        <Link className={window.location.pathname=="/admin/category"?"list-group-item list-group-item-action list-group-item-light p-3 active":"list-group-item list-group-item-action list-group-item-light p-3"}href="/admin/category">category</Link>
        {/* <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Status</a> */}
    </div>
</div>);
}

export default Sidebar;