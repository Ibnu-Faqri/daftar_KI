const daftar_riwayatController = require("../../controller/daftar_riwayatController");
const authentication = require("../../middlewares/authentication");
const isAdmin = require("../../middlewares/isAdmin");

const router = require("express").Router();

router.post('/', authentication, isAdmin, daftar_riwayatController.createKI);
router.get('/', authentication, daftar_riwayatController.getKI);
// router.get('/:id', authentication, AjuanController.getAjuanId);
// router.put("/:id", authentication, isUserOwnReviewandAnswer, AnswerController.updateAnswer);
// router.delete("/:id", authentication, isUserOwnReviewandAnswer, AnswerController.deleteAnswer);

module.exports = router;