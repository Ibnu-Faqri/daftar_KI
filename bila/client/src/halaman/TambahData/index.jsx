import React from 'react'
import styles from "./styles.module.scss"
import { useNavigate, useParams } from 'react-router-dom'
import useAjuanById from '../../hooks/useAjuanById'

export default function TambahData({baru = true}) {
  const token = localStorage.getItem('token')
  const navigasi = useNavigate()
  const { idAjuan } = useParams()
  const ajuan = useAjuanById(idAjuan, token)
  
  const tambah = async (e) => {
    e.preventDefault()
    const form = e.target
    
    if (baru) {
      const respons = await fetch('http://localhost:5000/ajuan' , {
        method : 'POST',
        headers : {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify({
          notas: form.notas.value,
          nama_peserta: form.nama.value,
          tanggal: form.tanggal.value,
        })
      })
      const jsonData = await respons.json()
      const status = await updatePermintaan(form, jsonData.id)
      if (status){
        navigasi('/permintaan')
      }
      return
    }

    const status = await updatePermintaan(form, idAjuan)
    if (status){
      navigasi('/permintaan')
    }
  }

  const updatePermintaan = async (form, ajuanId) => {
    const respons = await fetch('http://localhost:5000/daftar_riwayat' , {
      method : 'POST',
      headers : {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      },
      body : JSON.stringify({
        ajuanId,
        TMT_Awal: form.tmtawal.value,
        TMT_Akhir: form.tmtakhir.value,
        GAPOK: form.gapok.value,
        KD_Pangkat: form.kdpangkat.value,
        Persentasi: form.persentase.value,
        Suskel: form.suskel.value,
      })
    })
    const jsonData = await respons.json()
    console.log(jsonData)
    return jsonData.status
  }
  
  return (
    <div className={styles.pengajuan}>
      <h1>Form Data</h1>
      <form onSubmit={tambah}>
        <label htmlFor="tanggal">Tanggal :</label>
        <input type="date" id='tanggal' name='tanggal' readOnly={!baru} value={ajuan.tanggal} />
        <label htmlFor="nama">Nama Peserta :</label>
        <input type="text" id='nama' name='nama' readOnly={!baru} value={ajuan.nama} />
        <label htmlFor="notas">Notas :</label>
        <input type="text" id='notas' name='notas' readOnly={!baru} value={ajuan.notas} />
        <label htmlFor="tmtawal">TMT Awal :</label>
        <input type="date" id='tmtawal' name='tmtawal' />
        <label htmlFor="tmtakhir">TMT Akhir :</label>
        <input type="date" id='tmtakhir' name='tmtakhir' />
        <label htmlFor="gapok">GAPOK :</label>
        <input type="number" id='gapok' name='gapok' />
        <label htmlFor="kdpangkat">KD Pangkat :</label>
        <input type="text" id='kdpangkat' name='kdpangkat' />
        <label htmlFor="persentase">Persentase (%) :</label>
        <input type="text" id='persentase' name='persentase' />
        <label htmlFor="suskel">SUSKEL :</label>
        <input type="text" id='suskel' name='suskel' />
        <button>
          Selesai
        </button>
      </form> 
    </div>
  )
}
