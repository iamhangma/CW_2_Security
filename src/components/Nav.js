import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { IoLogOut } from "react-icons/io5";
import { RiShoppingCart2Line } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdSearch, MdKeyboardArrowRight } from "react-icons/md";
import { BsArrowRightShort } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

import { logout } from "../actions/userActions";
import Searchnav from "./Searchnav";

const Nav = () => {
  const [incart, setincart] = useState(0);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [nav, setNav] = useState(false);
  const Nav = useRef(null);
  const searchRef = useRef(null);
  const [showSearchIc, setShowSearchIc] = useState(false);
  const Buric = useRef(null);
  const navLinks = useRef(null);
  const rightItems = useRef(null);
  const [signin, setSignin] = useState(null);

  const navigate = useNavigate();

  const onSeacrhFun = () => {
    setShowSearchIc(!showSearchIc);
    searchRef.current.classList.toggle("searchActive");
    searchRef.current.style.animation = "moving 0.3s ease both 0.3s";
  };

  const onBurgActive = () => {
    const links = document.querySelectorAll(".navLinks li");
    navLinks.current.classList.toggle("burgerActive");
    rightItems.current.classList.toggle("burgerActive");
    links.forEach((link, index) => {
      link.style.animation = link.style.animation
        ? ""
        : `moving 0.5s ease forwards ${index / 5}s`;
      rightItems.current.style.animation = link.style.animation;
    });
    Buric.current.classList.toggle("toggle");
  };

  const onChangeBack = () => {
    setNav(window.scrollY >= 60);
  };

  useEffect(() => {
    window.addEventListener("scroll", onChangeBack);
    return () => {
      window.removeEventListener("scroll", onChangeBack);
    };
  }, []);

  useEffect(() => {
    setincart(cartItems.length || 0);
  }, [cartItems]);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav ref={Nav} className={`nav ${nav ? "active" : ""}`}>
      <div className="logo">
        <Link to="/">EAST CLOTHING</Link>
      </div>
      <ul className="navLinks" ref={navLinks}>
        <NavLink to="/" exact="true" activeclassname="activlink">
          <li>Home</li>
        </NavLink>
        <NavLink to="/shop" activeclassname="activlink">
          <li>Shop</li>
        </NavLink>
        <NavLink to="/contactus" activeclassname="activlink">
          <li>Contact us</li>
        </NavLink>
        <NavLink to="/about" activeclassname="activlink">
          <li>About</li>
        </NavLink>
      </ul>
      <div className="burger" ref={Buric} onClick={onBurgActive}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <div className="rightComp" ref={rightItems}>
        <div ref={searchRef} className="search">
          <Searchnav history={navigate} />
        </div>
        {!showSearchIc && (
          <MdSearch className="iconSearch" size="26" onClick={onSeacrhFun} />
        )}
        <Link to="/cart">
          <RiShoppingCart2Line className="iconCart" size="26" />
          {userInfo && !userInfo.isAdmin && (
            <div className="dotcart">{incart}</div>
          )}
        </Link>
        {userInfo ? (
          <div className="ic_sett_dis">
            <Link to="/profile">
              <CgProfile size="25" className="settingIcon" />
            </Link>
            <IoLogOut
              size="28"
              className="displayIcon"
              onClick={logoutHandler}
            />
          </div>
        ) : (
          <Link to="/login">
            <div
              className="signin"
              onMouseOver={() => setSignin(!signin)}
              onMouseOut={() => setSignin(!signin)}
            >
              Sign in
              {!signin ? (
                <BsArrowRightShort size="25" />
              ) : (
                <MdKeyboardArrowRight size="25" />
              )}
            </div>
          </Link>
        )}
        {userInfo && userInfo.isAdmin && (
          <Menu>
            <MenuButton as={Button} rightIcon={<IoMdArrowDropdown />}>
              Admin
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link to="/admin/userlist">Users</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/admin/productlist">Products</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/admin/orderlist">Orders</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </div>
    </nav>
  );
};

export default Nav;
