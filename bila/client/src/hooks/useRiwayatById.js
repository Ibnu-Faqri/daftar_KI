import { useEffect, useState } from "react"

function useRiwayatById(idAjuan) {
  const token = localStorage.getItem('token')
  const [ajuan, setAjuan] = useState({})

  async function fetchAjuan() {
    const response = await fetch(`http://localhost:5000/daftar_riwayat/${idAjuan}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const jsonData = await response.json()
    const {
      TMT_Awal,
      TMT_Akhir,
      GAPOK,
      KD_Pangkat,
      Persentasi,
      Suskel,
      ajuan: { notas, nama_peserta, tanggal },
      deskripsi,
    } = jsonData

    const newTgl = new Date(tanggal).toISOString()
    const newAwal = new Date(TMT_Awal).toISOString()
    const newAkhir = new Date(TMT_Akhir).toISOString()

    const formatTanggal = newTgl.split("T")[0]
    const formatAwal = newAwal.split("T")[0]
    const formatAkhir = newAkhir.split("T")[0]
    setAjuan({
      notas,
      tanggal: formatTanggal,
      nama: nama_peserta,
      deskripsi,
      TMT_Awal: formatAwal,
      TMT_Akhir: formatAkhir,
      GAPOK,
      KD_Pangkat,
      Persentasi,
      Suskel,
    })
  }

  useEffect(() => {
    fetchAjuan()
  }, [])

  return ajuan
}

export default useRiwayatById
