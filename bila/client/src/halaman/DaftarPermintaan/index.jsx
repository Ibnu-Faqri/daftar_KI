import React from "react"
import { LuSearch } from "react-icons/lu"
import styles from "./styles.module.scss"
import { Link } from "react-router-dom"
import usePengajuan from "../../hooks/usePengajuan"

export default function DaftarPermintaan() {
  const listPermintaan = usePengajuan()
  return (
    <div className={styles.riwayat}>
      <Link to="/tambah" className={styles.tambah}>
        + Tambah
      </Link>
      <table>
        <thead>
          <tr>
            <td>No</td>
            <td>Nama Peserta</td>
            <td>Notas</td>
            <td>Tanggal Pengajuan</td>
            <td>Aksi</td>
            <td>Status</td>
            <td>Deskripsi</td>
          </tr>
        </thead>
        <tbody>
          {listPermintaan.map((permintaan, index) => {
            const key = crypto.randomUUID()
            const tgl = new Date(permintaan.tanggal)

            return (
              <tr key={key}>
                <td>{index + 1}</td>
                <td>{permintaan.nama_peserta}</td>
                <td>{permintaan.notas}</td>
                <td>{tgl.toLocaleDateString()}</td>
                <td>
                  <Aksi status={permintaan.status} id={permintaan.id} />
                </td>
                <td>{permintaan.status}</td>
                <td>{permintaan.deskripsi}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function Aksi({ status, id }) {
  if (status == "Pending") {
    return <Link to={`/tambah/${id}`}>Buat</Link>
  }
  return <Link to={`/detail/${id}`}>Detail</Link>
}
