import Link from "next/link";


function Sidebar() {
 
    console.log("id",window.location.pathname)
    return (  <div class="border-end bg-white admin-side-menu-cls" id="sidebar-wrapper">
    <div class="sidebar-heading border-bottom bg-light">
        <div className="side-logo">
            <img src="../img/logo-inner.png" />
        </div>
    </div>
    <div class="list-group list-group-flush">
        <Link class={window.location.pathname=="/admin/dashboard"?"list-group-item list-group-item-action list-group-item-light p-3 active":"list-group-item list-group-item-action list-group-item-light p-3"} href="/admin/dashboard">Dashboard</Link>
        <Link class={window.location.pathname=="/admin/user"?"list-group-item list-group-item-action list-group-item-light p-3 active":"list-group-item list-group-item-action list-group-item-light p-3"} href="/admin/user">User</Link>
        <Link class={window.location.pathname=="/admin/product"?"list-group-item list-group-item-action list-group-item-light p-3 active":"list-group-item list-group-item-action list-group-item-light p-3"}href="/admin/product">Product</Link>
        <Link class={window.location.pathname=="/admin/news"?"list-group-item list-group-item-action list-group-item-light p-3 active":"list-group-item list-group-item-action list-group-item-light p-3"}href="/admin/news">News</Link>
        <Link class={window.location.pathname=="/admin/newsletter"?"list-group-item list-group-item-action list-group-item-light p-3 active":"list-group-item list-group-item-action list-group-item-light p-3"}href="/admin/newsletter">NewsLetter</Link>
        <Link class={window.location.pathname=="/admin/comment"?"list-group-item list-group-item-action list-group-item-light p-3 active":"list-group-item list-group-item-action list-group-item-light p-3"}href="/admin/comment">comment</Link>
        <Link class={window.location.pathname=="/admin/category"?"list-group-item list-group-item-action list-group-item-light p-3 active":"list-group-item list-group-item-action list-group-item-light p-3"}href="/admin/category">category</Link>
        {/* <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Status</a> */}
    </div>
</div>);
}

export default Sidebar;