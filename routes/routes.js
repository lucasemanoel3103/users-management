const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const adminAuth = require("../middleware/adminAuth")

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get("/user", adminAuth, UserController.index);
router.get("/user/:id", UserController.findUser);
router.put("/user", UserController.edit);
router.delete("/user/:id", UserController.remove);
router.post("/user/recoverypassword", UserController.recoveryPassword);
router.post("/user/changepassword", UserController.changePassword);
router.post("/user/login", UserController.login);

module.exports = router;