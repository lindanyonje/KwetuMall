import { UserAvatarFilled, ShoppingCart } from '@carbon/icons-react';
const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2 className="h2">KwetuMall</h2>
      </div>
      <div className="icons">
        <li><UserAvatarFilled /></li>
        <li><span><ShoppingCart /></span></li>
        
      </div>
    </nav>
  );
};

export default NavBar;
