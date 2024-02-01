import React from 'react'
import { TbListTree } from "react-icons/tb";
import styles from "./styles.module.scss"
import { MdOutlineAddChart } from "react-icons/md";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router-dom";
export default function DashboardAdmin() {
  return (
    <div className={styles.dashboard}>
      <h1>DASHBOARD</h1>
      <hr />
      <h1 className={styles.selamat}>Selamat Datang,</h1>
      <h2>ADMIN PT TASPEN (Persero) KC LHOKSEUMAWE</h2>
      <div className={styles.list}>
        {/* Permintaan */}
        <div className={styles.navigasi}>
          <div>
            <TbListTree color='maroon'/>
            <p>Daftar Permintaan</p>
          </div>
          <div>
            <Link to="/permintaan">view details</Link >
            <IoIosArrowDroprightCircle color='red'/>
          </div>
        </div>

        {/* Riwayat */}
        <div className={styles.navigasi} style={{ backgroundColor: '#00FFFF22 ' }}>
          <div>
            <MdOutlineAddChart color='aqua'/>
            <p>Tambah Data</p>
          </div>
          <div>
            <Link to="/tambah">view details</Link>
            <IoIosArrowDroprightCircle color='aquamarine'/>
          </div>
        </div>
      </div>
    </div>
  )

}
