import React from 'react'
import styles from "./Navbar.module.scss"
import { LuLogOut } from "react-icons/lu";
import { Link } from 'react-router-dom';


export default function NavbarKepala({ setToken }) {
  const logout = () => {
    localStorage.setItem("token", "")
    localStorage.setItem("role", "")
    setToken("")
  }
  return (
    <div className={styles.navbar}>
      <img src="taspen.png" alt="" />
      <Link to="/" onClick={logout} className={styles.logout}>
        Logout
        <LuLogOut/>
      </Link>
    </div>
  )
}
