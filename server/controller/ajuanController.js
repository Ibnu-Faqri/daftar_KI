const { User, ajuan, sequelize } = require("../models");

class Controller {
    static getAjuan(req, res) {
        ajuan.findAll({ 
            include:[
                { model: User, attributes: ['name', 'email']}
            ]
        })
        .then((ajuans) => {
            res.status(200).json(ajuans);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
    }

    static async getAjuanId(req, res) {
        const id = Number(req.params['id']);
       
        try  {
            if (!await Answer.findByPk(id)) {
            return res.status(404).json({ message: "Answer tidak dapat ditemukan" });
            }           
              res.status(200).json(await Answer.findByPk(id, {
                include: [Task, User]
            }));
            } catch (error) {
              res.status(500).json({ error: "Internal Server Error" });
            };
    }


    static async createAjuan(req, res) {
        const { notas, nama_peserta } = req.body;
        ajuan.create({
            userId: req.userId,
            notas,
            nama_peserta, 
        }).then((ajuans) => {
            res.status(201).json(ajuans);
        }).catch((error) => {
            res.status(500).json(error);
        });
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