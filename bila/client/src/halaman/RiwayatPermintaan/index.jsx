import React, { useRef, useState, useEffect } from 'react';
import styles from "./styles.module.scss";
import useAjuanById from '../../hooks/useAjuanById';
import { useNavigate, useParams } from 'react-router-dom';

export default function DetailRiwayat() {
  const { id } = useParams();
  const [namaPeserta, setNamaPeserta] = useState("");
  const [notas, setNotas] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const pengajuan = useAjuanById(id, token);

  useEffect(() => {
    setNamaPeserta(pengajuan.nama || "");
    setNotas(pengajuan.notas || "");
  }, [pengajuan]);

  const updatePeserta = (event) => {
    setNamaPeserta(event.target.value);
  };

  const updateNotas = (event) => {
    setNotas(event.target.value);
  };

  const approve = () => {
    submit(true);
  };

  const batal = () => {
    navigate("/riwayat");
  };

  const submit = async (approve) => {
    try {
      const response = await fetch(`http://localhost:5000/ajuan/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama_peserta: namaPeserta,
          notas: notas,
        }),
      });

      if (response.status === 200) {
        navigate("/riwayat");
      } else {
        // Handle error response if needed
        console.error("Failed to update ajuan:", response.statusText);
      }
    } catch (error) {
      console.error("Error in submit:", error);
      // Handle any other errors that may occur
    }
  };

  return (
    <div className={styles.detail}>
      <div className={styles.nama}>
        <h1>DAFTAR RIWAYAT</h1>
      </div>
      <table className={styles.penghasilan}>
        <thead>
          <tr>
            <td>Nama Peserta</td>
            <td>Notas</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                value={namaPeserta}
                onChange={updatePeserta}
              />
            </td>
            <td>
              <input
                type="number"
                value={notas}
                onChange={updateNotas}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button onClick={approve}>Submit</button>
        <button onClick={batal}>Kembali</button>
      </div>
    </div>
  );
}
