import { useEffect, useState } from "react"

function usePengajuan() {
  const [listPengajuan, setPengajuan] = useState([])
  const token = localStorage.getItem("token")
  const getPengajuan = async () => {
    const respons = await fetch("http://localhost:5000/ajuan", {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
    const data = await respons.json()
    setPengajuan(data)
  }
  useEffect(() => {
    getPengajuan()
  }, [])
  return listPengajuan
}

export default usePengajuan
