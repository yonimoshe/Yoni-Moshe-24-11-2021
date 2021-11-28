import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './Navigation.css';

function Navigation() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <>
           <header className="header-container">
                   <Link className="logo-link" to="/">Logo</Link>
                  <nav> 
                    {/* small size nav handleing    */}
                        <Button
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <div className="hamburger">
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                            </div>   
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                <NavLink className={(navData) =>  navData.isActive ? "nav-link-active" : "nav-link"} to="/">
                                  Home
                               </NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose}> 
                                <NavLink className={(navData) =>  navData.isActive ? "nav-link-active" : "nav-link"} to="/favorites">
                                 Favorites
                                </NavLink>                        
                            </MenuItem>
                        </Menu>
                 
                 {/* large size nav handleing  */}
                   <ul className="list-container">
                       <li>
                           <NavLink className={(navData) =>  navData.isActive ? "nav-link-active" : "nav-link"} to="/">
                               Home
                           </NavLink>
                       </li>
                       <li>
                           <NavLink className={(navData) =>  navData.isActive ? "nav-link-active" : "nav-link"} to="/favorites">
                               Favorites
                           </NavLink>
                       </li>
                    </ul>
                   </nav> 
           </header>
        </>
    );
}

export default Navigation;