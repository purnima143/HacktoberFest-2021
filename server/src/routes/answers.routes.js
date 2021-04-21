const express = require("express");
const {
    requireSignin,
    userMiddleWare
} = require("../common-middleware/middleware");
const answerController = require("../controllers/answers.controller");
const router = express.Router();

router.post(
    "/question/answer",
    requireSignin,
    userMiddleWare,
    answerController.createAnswers
);
router.delete('/deleteAnswer/:id', requireSignin, userMiddleWare, answerController.deleteAnswer)

module.exports = router;
