import React, { useRef } from 'react'
import styles from "./styles.module.scss"
import { useNavigate, useParams } from 'react-router-dom'
import useRiwayatById from '../../hooks/useRiwayatById'

export default function DetailPersetujuan() {
  const { id } = useParams()
  const permintaan = useRiwayatById(id)
  const token = localStorage.getItem("token")
  const deskripsiRef = useRef()
  const navigate = useNavigate()

  const approve = () => {
    updateStatus("Approve")
  }
  const tolak = () => {
    updateStatus("Ditolak")
  }

  const updateStatus = async (status) => {
    console.log(token)
    const response = await fetch("http://localhost:5000/ajuan", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status,
        deskripsi: deskripsiRef.current.value,
      })
    })

    const jsonData = await response.json()
    if (jsonData.status) {
      navigate("/")
    }
  }
  
  return (
    <div className={styles.detail}>
      <p>
        FORMULIR KERJA
      </p>
      <h1>
        DAFTAR RIWAYAT PENGHASILAN KI/PI
      </h1>
      <table className={styles.nama}>
        <tbody>
          <tr>
            <td>
              NOTAS 
            </td>
            <td>
              : {permintaan.notas}
            </td>
          </tr>
          <tr>
            <td>
              NAMA PESERTA
            </td>
            <td>
              : {permintaan.nama}
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        RIWAYAT PENGHASILAN
      </p>
      <table className={styles.penghasilan}>
        <thead>
          <tr>
            <td>
              TMT AWAL
            </td>
            <td>
              TMT AKHIR
            </td>
            <td>
              GAPOK
            </td>
            <td>
              KD PANGKAT
            </td>
            <td>
              PERSENTASE (%)
            </td>
            <td>
              SUSKEL
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{permintaan.TMT_Awal}</td>
            <td>{permintaan.TMT_Akhir}</td>
            <td>{permintaan.GAPOK}</td>
            <td>{permintaan.KD_Pangkat}</td>
            <td>{permintaan.Persentasi}</td>
            <td>{permintaan.Suskel}</td>
          </tr>
        </tbody>
      </table>
      <textarea type="text" className={styles.deskripsi} placeholder='Deskripsi' ref={deskripsiRef} />
      <div>
        <button onClick={approve}>
          Approve
        </button>
        <button onClick={tolak}>
          Tolak
        </button>
      </div>
    </div> 
  )
}
