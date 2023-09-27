
const Sidebar = () => {
  return (
    <div className="sidebar">
        <h5 className="text">KwetuMall Admin Panel</h5>
      <div className="top-buttons">
        <button className="sidebar-button">Products</button>
        <button className="sidebar-button">Categories</button>
        <button className="sidebar-button">Pickup points</button>
        <button className="sidebar-button">Users</button>
        <button className="sidebar-button">Admins</button>
      </div>
      <div className="bottom-buttons">
        <button className="sidebar-button">My Account</button>
        <button className="sidebar-button">Log Out</button>
      </div>
    </div>

    


  )
}

export default Sidebar