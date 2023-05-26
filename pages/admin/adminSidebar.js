import Link from "next/link";

function Sidebar() {
    return (  <div class="border-end bg-white admin-side-menu-cls" id="sidebar-wrapper">
    <div class="sidebar-heading border-bottom bg-light">FuturePedia Admin</div>
    <div class="list-group list-group-flush">
        <Link class="list-group-item list-group-item-action list-group-item-light p-3" href="/admin/dashboard">Dashboard</Link>
        <Link class="list-group-item list-group-item-action list-group-item-light p-3" href="/admin/user">User</Link>
        <Link class="list-group-item list-group-item-action list-group-item-light p-3"href="/admin/product">Product</Link>
        <Link class="list-group-item list-group-item-action list-group-item-light p-3"href="/admin/news">News</Link>
        <Link class="list-group-item list-group-item-action list-group-item-light p-3"href="/admin/newsletter">NewsLetter</Link>
        <Link class="list-group-item list-group-item-action list-group-item-light p-3"href="/admin/comment">comment</Link>
        <Link class="list-group-item list-group-item-action list-group-item-light p-3"href="/admin/category">category</Link>
        {/* <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Status</a> */}
    </div>
</div>);
}

export default Sidebar;