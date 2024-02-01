import React from 'react'
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import styles from "./styles.module.scss"
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router-dom";
export default function Karyawan() {
  return (
    <div className={styles.dashboard}>
      <h1>DASHBOARD</h1>
      <hr />
      <h1 className={styles.selamat}>Selamat Datang,</h1>
      <h2>KARYAWAN PT TASPEN (Persero) KC LHOKSEUMAWE</h2>
      <div className={styles.list}>
        {/* Permintaan */}
        <div className={styles.navigasi}>
          <div>
            <VscGitPullRequestGoToChanges color='#483D8B'/>
            <p>Pengajuan</p>
          </div>
          <div>
            <Link to="/pengajuan">view details</Link >
            <IoIosArrowDroprightCircle color='#9370DB'/>
          </div>
        </div>

        {/* Riwayat */}
        <div className={styles.navigasi} style={{ backgroundColor: '#E6C12033' }}>
          <div>
            <MdOutlineHistoryToggleOff color='#E9967A'/>
            <p>Riwayat</p>
          </div>
          <div>
            <Link to="/riwayat">view details</Link>
            <IoIosArrowDroprightCircle color='#FFA07A'/>
          </div>
        </div>
      </div>
    </div>
  )

}
