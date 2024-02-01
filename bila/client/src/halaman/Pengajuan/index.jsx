import React, { useRef } from 'react'
import styles from "./styles.module.scss"
import { useNavigate } from "react-router-dom";

export default function Pengajuan() {
  const tanggalRef = useRef()
  const namaRef = useRef()
  const notasRef = useRef()
  const token = localStorage.getItem('token')
  const navigasi = useNavigate()
  const submitPengajuan = async () =>{
    const respons = await fetch('http://localhost:5000/ajuan' , {
      method : 'POST',
      headers : {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      },
      body : JSON.stringify({
        nama_peserta : namaRef.current.value ,
        tanggal : tanggalRef.current.value ,
        notas : notasRef.current.value ,  
      })
    })
    const data = await respons.json()
    if (data.status){
      navigasi('/riwayat')
    }
  }
  return (
    <div className={styles.pengajuan}>
      <h1>Pengajuan Baru</h1>
      <div>
        <label htmlFor="tanggal">Tanggal :</label>
        <input type="date" id='tanggal' name='tanggal' ref={tanggalRef} />
        <label htmlFor="nama">Nama Peserta :</label>
        <input type="text" id='nama' name='nama' ref={namaRef} />
        <label htmlFor="notas">Notas :</label>
        <input type="text" id='notas' name='notas' ref={notasRef} />
        <button onClick={submitPengajuan}>
          Send
        </button>
      </div> 
    </div>
  )
}
