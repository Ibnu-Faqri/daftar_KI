import { useEffect, useState } from "react"

function useAjuanById(idAjuan, token) {
  const [ajuan, setAjuan] = useState({})

  async function fetchAjuan() {
    const response = await fetch(`http://localhost:5000/ajuan/${idAjuan}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const jsonData = await response.json()
    const { nama_peserta, notas, tanggal } = jsonData

    const newDate = new Date(tanggal).toISOString()
    const formatTanggal = newDate.split("T")[0]
    setAjuan({
      notas,
      tanggal: formatTanggal,
      nama: nama_peserta,
    })
  }

  useEffect(() => {
    if (idAjuan) fetchAjuan()
  }, [])

  return ajuan
}

export default useAjuanById
