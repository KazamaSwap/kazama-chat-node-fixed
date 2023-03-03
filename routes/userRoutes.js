const { register, loginOrRegister, setUserName, setAvatar, setSpacenaut, setKraken, setWhale, setShark, setOrca, setDolphin, setTurtle, setFish, setCrab, setShrimp, setHolder, setLiquidityProvider, getAllUsers, getUser, isValidName } = require("../controllers/usersController");
const { login } = require("../controllers/usersController");
const { logOut } = require("../controllers/usersController");

const router = require("express").Router();

// router.post("/register", register);
router.post("/connect", loginOrRegister);
router.post("/getUser", getUser);
router.post("/isValidName", isValidName);
router.post("/setAvatar/", setAvatar);
router.post("/setSpacenaut/:id", setSpacenaut);
router.post("/setKraken/:id", setKraken);
router.post("/setWhale/:id", setWhale);
router.post("/setShark/:id", setShark);
router.post("/setOrca/:id", setOrca);
router.post("/setDolphin/:id", setDolphin);
router.post("/setTurtle/:id", setTurtle);
router.post("/setFish/:id", setFish);
router.post("/setCrab/:id", setCrab);
router.post("/setShrimp/:id", setShrimp);
router.post("/setHolder/:id", setHolder);
router.post("/setLiquidityProvider/:id", setLiquidityProvider);
router.post("/setUserName", setUserName);
router.get("/allUsers/:id", getAllUsers);
router.get("/logout/:id", logOut);

module.exports = router;
