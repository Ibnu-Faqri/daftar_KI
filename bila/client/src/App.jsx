import Header from "./Komponen/Header"
import Navbar from "./Komponen/Navbar"
import NavbarAdmin from "./Komponen/NavbarAdmin"
import DaftarPermintaan from "./halaman/DaftarPermintaan"
import Karyawan from "./halaman/Dashboard/Karyawan"
import Detail from "./halaman/Detail"
import Persetujuan from "./halaman/Persetujuan"
import Login from "./halaman/Login"
import Pengajuan from "./halaman/Pengajuan"
import Riwayat from "./halaman/Riwayat"
import TambahData from "./halaman/TambahData"
import "./styles.scss"
import DetailPersetujuan from "./halaman/DetailPersetujuan"
import NavbarKepala from "./Komponen/NavbarKepala"
import { Outlet, Route, Routes } from "react-router-dom"
import DashboardAdmin from "./halaman/DashboardAdmin"
import { useState } from "react"
import DetailRiwayat from "./halaman/RiwayatPermintaan"

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const role = localStorage.getItem("role")

  if (!token) return <Login setToken={setToken} />

  function getMainPage() {
    if (role == "kepala") return <Persetujuan />
    if (role == "admin") return <DashboardAdmin />
    return <Karyawan />
  }

  return (
    <>
      <Routes>
        <Route path="/" element = {<Layout role={role} setToken={setToken} />}>
          <Route path="/" element={getMainPage()} />
          <Route path="/detail/:id" element={role == "kepala" ? <DetailPersetujuan /> : <Detail />} />
          <Route path="/persetujuan" element = {<Persetujuan/>}/>
          <Route path="/permintaan" element = {<DaftarPermintaan/>}/>
          <Route path="/pengajuan" element = {<Pengajuan/>}/>
          <Route path="/tambah" element = {<TambahData/>}/>
          <Route path="/riwayat/:id" element={<DetailRiwayat />} />
          <Route path="/tambah/:idAjuan" element = {<TambahData baru={false} />}/>
          <Route path="/riwayat" element = {<Riwayat/>}/>
        </Route>
      </Routes>
    </>
  )
}

function Layout({ setToken, role }) {
  const getNavbar = () => {
    if (role == "kepala") return <NavbarKepala setToken={setToken} />
    if (role == "admin") return <NavbarAdmin />
    return <Navbar setToken={setToken} />
  }
  
  return (
    <>
      {getNavbar()}
      <Header/>
      <div id="content">
        <Outlet/>
      </div>
    </>
  )
}

export default App
