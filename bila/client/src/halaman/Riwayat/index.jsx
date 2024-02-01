import React from 'react'
import { LuSearch } from "react-icons/lu";
import styles from "./styles.module.scss"
import usePengajuan from '../../hooks/usePengajuan';
import { FaEdit } from 'react-icons/fa';
import { Link } from "react-router-dom"

export default function Riwayat() {
  const listPengajuan = usePengajuan()
  return (
    <div className={styles.riwayat}>
      <div className={styles.cari}>
        <LuSearch/>
        <input type="text" placeholder='Search' />
      </div>
      <table>
        <thead>
          <tr>  
            <td>No</td>
            <td>Nama Peserta</td>
            <td>Notas</td>
            <td>Tanggal Pengajuan</td>
            <td>Aksi</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {listPengajuan.map((pengajuan, index) =>{
            const key = crypto.randomUUID()
            const tgl = new Date(pengajuan.tanggal)
            return (
              <tr key={key}>
                <td>{index + 1}</td>
                <td>{pengajuan.nama_peserta}</td>
                <td>{pengajuan.notas}</td>
                <td>{tgl.toLocaleDateString()}</td>
                <td><Link to={`/riwayat/${pengajuan.id}`}>
                <FaEdit />
                  </Link></td>
                <td>{pengajuan.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
