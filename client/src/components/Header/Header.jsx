import React, { useRef, useEffect, useContext, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/images/horizon.png';
import './header.css';
import { motion } from 'framer-motion';
import EnquiryFormModal from '../enquiry/enquirymodal';
import AnimatedWrapper from '../animation/Animation';

const navLinks = [
  { path: '/home', display: 'Home' },
  { path: '/tours', display: 'Tours' },
  { path: '/accommodations', display: 'Accommodations' },
  { path: '/customizedTourbookings', display: 'customized Tour bookings' },
  { path: '/packages', display: 'Packages' },
  { path: '/Dashboard', display: 'Dashboard', adminOnly: true }
];

const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        headerRef.current.classList.add('sticky');
      } else {
        headerRef.current.classList.remove('sticky');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar position="sticky" ref={headerRef} sx={{ bgcolor: 'white', boxShadow: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        
            <EnquiryFormModal open={open} onClose={() => setOpen(false)} />
        <motion.div whileHover={{ scale: 1.1 }}>
          <img src={logo} alt="Logo" style={{ height: '50px', cursor: 'pointer' }} onClick={() => navigate('/home')} />
        </motion.div>

        <AnimatedWrapper>

        <Button variant="contained" color='error' onClick={() => setOpen(true)}>
              Open Enquiry Form
            </Button>
        </AnimatedWrapper>

        {/* Navigation Links */}
        <div className="nav-links" style={{ display: 'flex', gap: '20px' }}>
          {navLinks.map((item, index) => (
            (!item.adminOnly || (item.adminOnly && user?.role === 'admin')) && (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, color: '#1976d2' }}
                transition={{ duration: 0.2 }}
              >
                <NavLink to={item.path} style={{ textDecoration: 'none', color: '#333', fontSize: '18px', fontWeight: 'bold' }}>
                  {item.display}
                </NavLink>
              </motion.div>
            )
          ))}
        </div>

        {/* User Actions */}
        <div>
          {user ? (
            <>
              <Typography variant="h6"  sx={{ cursor: 'pointer', fontWeight: 'bold',bgcolor:"black" , padding:"10px",borderRadius:"5px",boxShadow: 3 ,opacity:"80%" }} onClick={(e) => setMenuAnchor(e.currentTarget)}>
                {user.username}
              </Typography>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
              >
                <MenuItem onClick={() => navigate('/profile/user')}>Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
                
                <MenuItem onClick={() => navigate('/mytourbookings')}>My TourBookings</MenuItem>
                <MenuItem onClick={() => navigate('/MyAccommodationBooking')}>My Accommodation Booking</MenuItem>
                <MenuItem onClick={() => navigate('/myCustomizeTourBookings')}>My Customize TourBookings</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button variant="contained"  component={Link} to="/login">Login</Button>
              <Button variant="contained" component={Link} to="/register" sx={{ ml: 1 }}>Register</Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <IconButton edge="end" color="inherit" sx={{ display: { xs: 'block', md: 'none' } }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;