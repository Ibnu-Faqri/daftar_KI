import React, { useState } from 'react'
import styles from "./styles.module.scss"
import usePengajuan from '../../hooks/usePengajuan'
import { Link } from 'react-router-dom'

export default function Persetujuan() {
  const listAjuan = usePengajuan()
  
  return (
    <div className={styles.riwayat}>
      <h1>
        Daftar Persetujuan
      </h1>
      <table>
        <thead>
          <tr>
            <td>No</td>
            <td>Nama Peserta</td>
            <td>Notas</td>
            <td>Tanggal Pengajuan</td>
            <td>Lampiran</td>
            <td>Status</td>
            <td>Deskripsi</td>
          </tr>
        </thead>
        <tbody>
          {listAjuan.map((ajuan, index) => {
            const key = crypto.randomUUID()
            const tgl = new Date(ajuan.tanggal).toLocaleDateString()

            return (
              <tr key={key}>
                <td>{index + 1}</td>
                <td>{ajuan.nama_peserta}</td>
                <td>{ajuan.notas}</td>
                <td>{tgl}</td>
                <td>
                  <Link to={`/detail/${ajuan.id}`}>Detail</Link>
                </td>
                <td>{ajuan.status}</td>
                <td>{ajuan.deskripsi}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
