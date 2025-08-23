import React from 'react';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { BiUser } from 'react-icons/bi';
import { FaShoppingCart } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BackDrop from './BackDrop';
import { logOutUser } from '../store/actions';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = () => {
    dispatch(logOutUser(navigate));
  };

  return (
    <div className="relative z-30">
      <div
        className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        onClick={handleClick}
      >
        <Avatar alt="Menu" src="" />
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: { width: 160 },
        }}
      >
        {/* Profile Link */}
        <Link to="/profile" onClick={handleClose} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem className="flex gap-2">
            <BiUser className="text-xl" />
            <span className="font-bold text-[16px] mt-1">{user?.username}</span>
          </MenuItem>
        </Link>

        {/* Orders Link */}
        <Link to="/profile/orders" onClick={handleClose} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem className="flex gap-2">
            <FaShoppingCart className="text-xl" />
            <span className="font-semibold">Orders</span>
          </MenuItem>
        </Link>

        {/* Admin Section: Add Product Button */}
        {user?.role === 'ADMIN' && (
          <>
            <MenuItem onClick={handleClose} disableRipple>
              <Link to="/admin/add-product" style={{ width: '100%', textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  style={{
                    textTransform: 'none',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  + Add Product
                </Button>
              </Link>
            </MenuItem>
          </>
        )}

        {/* Logout */}
        <MenuItem onClick={logOutHandler} className="flex gap-2">
          <div className="font-semibold w-full flex gap-2 items-center bg-button-gradient px-4 py-1 text-white rounded-sm">
            <IoExitOutline className="text-xl" />
            <span className="font-bold text-[16px] mt-1">LogOut</span>
          </div>
        </MenuItem>
      </Menu>

      {open && <BackDrop />}
    </div>
  );
};

export default UserMenu;
