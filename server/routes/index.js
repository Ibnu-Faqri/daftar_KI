const router = require("express").Router();
const ajuanRouter = require("./ajuan/index");
const daftar_riwayatRouter = require("./daftar_riwayat/index");
const userRouter = require("./Users/index");

router.use('/ajuan', ajuanRouter);
router.use('/daftar_riwayat', daftar_riwayatRouter);
router.use(userRouter);

module.exports = router;