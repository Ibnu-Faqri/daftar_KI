const { daftar_riwayat, ajuan, sequelize } = require("../models");

class Controller {
  static async getKI(req, res) {
    try {
        const allDaftar_riwayat = await daftar_riwayat.findAll({
          include: ajuan
        });
            res.status(200).json(allDaftar_riwayat);
    //   const userId = req.userId;
    //   const isAdmin = req.isAdmin;
    //   // Jika pengguna adalah admin, izinkan akses ke semua reservasi
    //   if (isAdmin) {
    //     const allReservasis = await Reservasi.findAll();
    //     res.status(200).json(allReservasis);
    //   } else {
    //     // Jika bukan admin, kembalikan reservasi yang dimiliki pengguna
    //     const userReservasis = await Reservasi.findAll({ where: { userId } });
    //     res.status(200).json(userReservasis);
    //   }
    } catch (error) {
      console.error("Error in getReservasi:", error);
      res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  }

  static async getKIById(req, res) {
    const id = Number(req.params['id']);
    const riwayat = await daftar_riwayat.findOne({
      where: {
        ajuanId: id
      },
      include: ajuan
    })
      
    try  {
      if (!riwayat) {
        return res.status(404).json({ message: "KI tidak dapat ditemukan" });
      }           
        res.status(200).json(riwayat);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        console.log(error);
    };
  }

  static async createKI(req, res) {
    try {
      const { ajuanId, TMT_Awal, TMT_Akhir, GAPOK, KD_Pangkat, Persentasi, Suskel } = req.body;
      // Check if the room exists
      const Ajuan = await ajuan.findByPk(ajuanId);
      await ajuan.update({
        status: "Proses"
      }, {
        where: {
          id: ajuanId
        }
      })
      if (!Ajuan) {
        return res
          .status(404)
          .json({ error: "Kamar tidak ditemukan. Silahkan pilih kamar lain.", status: false });
      }
      const Daftar_riwayat = await daftar_riwayat.create(
        {
          ajuanId,
          TMT_Awal,
          TMT_Akhir,
          GAPOK,
          KD_Pangkat,
          Persentasi,
          Suskel
        },
      );
      res.status(201).json({...Daftar_riwayat, status: true});
    } catch (error) {
      console.error("Error in createReservasi:", error);
      res.status(500).json({ error: "Terjadi kesalahan server" , status: false});
    }
  }

  static async bayarReservasi(req, res) {
    try {
      const reservasi = req.reservasi;
      if (!reservasi) {
        return res.status(404).json({ message: "Reservasi tidak ditemukan" });
      }

      if (reservasi.status !== "menunggu pembayaran") {
        return res.status(400).json({
          message: "Reservasi tidak dapat dibayar. Status sudah berubah.",
        });
      }
      // Perform payment process (e.g., integrate with a payment gateway)
      // Setelah pembayaran berhasil, update status reservasi menjadi "booked"
      reservasi.status = "booked";
      await reservasi.save();
      res
        .status(200)
        .json({ message: "Pembayaran berhasil. Reservasi telah diproses." });
    } catch (error) {
      console.error("Error in bayarReservasi:", error);
      res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  }

  static async updateReservasiStatus(req, res) {
    const t = await sequelize.transaction(); // Mulai transaksi
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Cari reservasi berdasarkan ID
      const reservasi = await Reservasi.findByPk(id, { transaction: t });

      if (!reservasi) {
        await t.rollback();
        return res.status(404).json({ message: "Reservasi tidak ditemukan" });
      }

      // Pastikan status yang diberikan adalah valid
      if (status !== "done" && status !== "canceled") {
        await t.rollback();
        return res.status(400).json({ message: "Status tidak valid" });
      }

      // Ubah status reservasi sesuai permintaan admin
      reservasi.status = status;

      // Commit transaksi jika berhasil
      await reservasi.save({ transaction: t });
      await t.commit();

      res.status(200).json({
        message: `Status reservasi berhasil diubah menjadi ${status}`,
      });
    } catch (error) {
      console.error("Error in updateReservasiStatus:", error);
      // Rollback transaksi jika terjadi kesalahan
      await t.rollback();
      res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  }

  static async deleteReservasi(req, res) {
    const t = await sequelize.transaction(); // Mulai transaksi
    try {
      const { id } = req.params;
      // Cari reservasi berdasarkan ID
      const reservasi = await Reservasi.findByPk(id);
      if (!reservasi) {
        return res.status(404).json({ message: "Reservasi tidak ditemukan" });
      }
      // Hapus reservasi dalam transaksi
      await reservasi.destroy({ transaction: t });
      // Commit transaksi jika berhasil
      await t.commit();
      res.status(200).json({ message: "Reservasi berhasil dihapus" });
    } catch (error) {
      console.error("Error in deleteReservasi:", error);
      // Rollback transaksi jika terjadi kesalahan
      await t.rollback();
      res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  }
}

module.exports = Controller;