const AjuanController = require("../../controller/ajuanController");
const authentication = require("../../middlewares/authentication");
// const isUserOwnReviewandAnswer = require("../../middlewares/authorization");

const router = require("express").Router();

router.post('/', authentication, AjuanController.createAjuan);
router.get('/', authentication, AjuanController.getAjuan);
router.get('/:id', authentication, AjuanController.getAjuanId);
// router.put("/:id", authentication, isUserOwnReviewandAnswer, AnswerController.updateAnswer);
// router.delete("/:id", authentication, isUserOwnReviewandAnswer, AnswerController.deleteAnswer);

module.exports = router;