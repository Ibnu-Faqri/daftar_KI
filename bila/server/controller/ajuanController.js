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
          if (!await ajuan.findByPk(id)) {
            return res.status(404).json({ message: "ajuan tidak dapat ditemukan" });
          }           
            res.status(200).json(await ajuan.findByPk(id));
          } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            console.log(error);
        };
    }


    static async createAjuan(req, res) {
      const { notas, nama_peserta, tanggal } = req.body;
        ajuan.create({
            userId: req.userId,
            notas,
            nama_peserta,
            tanggal
        }).then((ajuans) => {
            res.status(201).json(ajuans);
        }).catch((error) => {
            res.status(500).json(error);
        });
    }

    static async updateAjuan (req, res) {
      const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { nama_peserta, notas } = req.body;
        await ajuan.update(
        {
          nama_peserta, notas
        },
        {
            where: {
                id: id
            }
        }
      );
      const ajuans = await ajuan.findByPk(id);
      if (!ajuans) {
          return res.status(404).json({ message: "Ajuan tidak ditemukan" });
      }
      res.status(200).json(ajuans
          );
    } catch (error) {
      console.error("Error in updateReservasiStatus:", error);
      // Rollback transaksi jika terjadi kesalahan
      await t.rollback();
      res.status(500).json({ error: "Terjadi kesalahan server" });
    }
    }

    static async updateStatusAjuan(req, res) {
      const { id, status, deskripsi } = req.body;

      ajuan.update({
        id,
        status,
        deskripsi,
      }, {
        where: {
          id: parseInt(id)
        }
      }).then(() => {
        res.status(200).json({
          status: true,
          data: {
            id,
            status,
            deskripsi,
          }
        })
      }).catch((err) => {
        console.log(err)
        res.status(500).json({
          status: false,
          ajuan: {},
          error: err,
        })
      })
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