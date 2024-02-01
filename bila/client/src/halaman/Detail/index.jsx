import React from 'react'
import styles from "./styles.module.scss"
import { useParams } from 'react-router-dom'
import useRiwayatById from '../../hooks/useRiwayatById'

export default function Detail() {
  const { id } = useParams()
  const permintaan = useRiwayatById(id)

  return (
    <div className={styles.detail}>
      <p>
        FORMULIR KERJA
      </p>
      <h1>
        DAFTAR RIWAYAT PENGHASILAN KI/PI
      </h1>
      <table className={styles.nama}>
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
    </div>
  )
}
