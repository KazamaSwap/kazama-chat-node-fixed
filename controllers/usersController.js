const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const ethers = require('ethers')
const {
  verifyMessage
} = require('ethers/lib/utils')

const types = {
  EditUsername: [{
      name: 'address',
      type: 'address'
    },
    {
      name: 'username',
      type: 'string'
    }
  ]
}
const domain = {
  name: 'chat',
  version: '1',
  // chainId: 1,
  // verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
};
module.exports.login = async (req, res, next) => {
  try {
    const {
      address
    } = req.body;
    const user = await User.findOne({
      address: {
        $regex: address.toLowerCase(),
        "$options": "i" 
      }
    });
    if (!user)
      return res.json({
        msg: "Incorrect Username ",
        status: false
      });
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid)
    //   return res.json({ msg: "Incorrect Password", status: false });
    // delete user.password;
    return res.json({
      status: true,
      user
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const {
      address
    } = req.body;
    // const usernameCheck = await User.findOne({ username });
    // if (usernameCheck)
    //   return res.json({ msg: "Username already used", status: false });
    const addressCheck = await User.findOne({
      address: {
        $regex: address.toLowerCase(),
        "$options": "i" 
      }
    });
    if (addressCheck)
      return res.json({
        msg: "Address already used",
        status: false
      });
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
    });
    // delete user.password;
    return res.json({
      status: true,
      user
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.isValidName = async (req, res, next) => {
  try {
    const {
      username
    } = req.body;
    const usernameCheck = await User.findOne({
      username: username
    });
    if (usernameCheck)
      return res.json({
        status: false
      });

    return res.json({
      status: true
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.loginOrRegister = async (req, res, next) => {
  try {
    const {
      address,
      balance,
      isSpacenaut,
      isKraken,
      isWhale,
      isShark,
      isOrca,
      isDolpin,
      isTurtle,
      isFish,
      isCrab,
      isShrimp,
      isHolder,
      isLiquidityProvider
    } = req.body;
    let user = await User.findOne({
      address: {
        $regex: address.toLowerCase(),
        "$options": "i" 
      }
    });

    if (user) {
      user = await User.findByIdAndUpdate(
        user._id, {
          balance: balance,
          isSpacenaut: isSpacenaut,
          isKraken: isKraken,
          isWhale: isWhale,
          isShark: isShark,
          isOrca: isOrca,
          isDolpin: isDolpin,
          isTurtle: isTurtle,
          isFish: isFish,
          isCrab: isCrab,
          isShrimp: isShrimp,
          isHolder: isHolder,
          isLiquidityProvider: isLiquidityProvider,
        }, {
          new: true
        }
      );
      return res.json({
        status: true,
        user
      });
    } else {
      user = await User.create({
        address,
        balance,
        isSpacenaut: isSpacenaut,
        isKraken: isKraken,
        isWhale: isWhale,
        isShark: isShark,
        isOrca: isOrca,
        isDolpin: isDolpin,
        isTurtle: isTurtle,
        isFish: isFish,
        isCrab: isCrab,
        isShrimp: isShrimp,
        isHolder: isHolder,
        isLiquidityProvider: isLiquidityProvider,
      });
    }

    return res.json({
      status: true,
      user
    });
  } catch (ex) {
    next(ex);
  }
}

module.exports.setUserName = async (req, res, next) => {
  try {
    const {
      address,
      username,
      signature
    } = req.body;
    const message = {
      type: 'EditUsername',
      address,
      username
    }
    // const signerAddr = await ethers.utils.verifyTypedData(domain, types['EditUsername'], message, signature);
    // console.log("signed Message", signature)
    const signedAddress = verifyMessage(username, signature);
    if (signedAddress.toLowerCase() !== address.toLowerCase()) {
      return res.json({
        message: "Not Allowed"
      });
    }
    const query = {
      address: address
    }
    const update = {
      $set: {
        username: username
      }
    }

    let user = await User.findOne({
      address: {
        $regex: address.toLowerCase(),
        "$options": "i" 
      }
    });

    if (user.username != username) {
      const userData = await User.updateOne(
        query,
        update,
      );
      return res.json({
        message: "Username Updated"
      });
    }
    return res.json({
      message: "Already Updated"
    });
  } catch (ex) {
    next(ex);
  }
}

module.exports.setSpacenaut = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const spacenaut = req.params.isSpacenaut;
    const userData = await User.findByIdAndUpdate(
      userId, {
        isSpacenaut: spacenaut,
      }, {
        new: true
      }
    );
    return res.json({
      userId: userData._id,
      isSpacenaut: userData.isSpacenaut
    });
  } catch (ex) {
    next(ex);
  }
}

module.exports.setKraken = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const kraken = req.params.isKraken;
    const userData = await User.findByIdAndUpdate(
      userId, {
        isKraken: kraken,
      }, {
        new: true
      }
    );
    return res.json({
      userId: userData._id,
      isKraken: userData.isKraken
    });
  } catch (ex) {
    next(ex);
  }
}

module.exports.setWhale = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const whale = req.params.isWhale;
    const userData = await User.findByIdAndUpdate(
      userId, {
        isWhale: whale,
      }, {
        new: true
      }
    );
    return res.json({
      userId: userData._id,
      isWhale: userData.isWhale
    });
  } catch (ex) {
    next(ex);
  }
}

module.exports.setShark = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const shark = req.params.isShark;
    const userData = await User.findByIdAndUpdate(
      userId, {
        isShark: shark,
      }, {
        new: true
      }
    );
    return res.json({
      userId: userData._id,
      isShark: userData.isShark
    });
  } catch (ex) {
    next(ex);
  }
}

module.exports.setOrca = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const orca = req.params.isOrca;
    const userData = await User.findByIdAndUpdate(
      userId, {
        isOrca: orca,
      }, {
        new: true
      }
    );
    return res.json({
      userId: userData._id,
      isOrca: userData.isOrca
    });
  } catch (ex) {
    next(ex);
  }
}

module.exports.setDolphin = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const dolphin = req.params.isDolphin;
    const userData = await User.findByIdAndUpdate(
      userId, {
        isDolphin: dolphin,
      }, {
        new: true
      }
    );
    return res.json({
      userId: userData._id,
      isDolphin: userData.isDolphin
    });
  } catch (ex) {
    next(ex);
  }
}

module.exports.setTurtle = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const turtle = req.params.isTurtle;
    const userData = await User.findByIdAndUpdate(
      userId, {
        isTurtle: turtle,
      }, {
        new: true
      }
    );
    return res.json({
      userId: userData._id,
      isTurtle: userData.isTurtle
    });
  } catch (ex) {
    next(ex);
  }
}

module.exports.setFish = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const fish = req.params.isFish;
    const userData = await User.findByIdAndUpdate(
      userId, {
        isFish: fish,
      }, {
        new: true
      }
    );
    return res.json({
      userId: userData._id,
      isFish: userData.isFish
    });
  } catch (ex) {
    next(ex);
  }
}

module.exports.setCrab = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const crab = req.params.isCrab;
    const userData = await User.findByIdAndUpdate(
      userId, {
        isCrab: crab,
      }, {
        new: true
      }
    );
    return res.json({
      userId: userData._id,
      isCrab: userData.isCrab
    });
  } catch (ex) {
    next(ex);
  }
}

module.exports.setShrimp = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const shrimp = req.params.isShrimp;
    const userData = await User.findByIdAndUpdate(
      userId, {
        isShrimp: shrimp,
      }, {
        new: true
      }
    );
    return res.json({
      userId: userData._id,
      isShrimp: userData.isShrimp
    });
  } catch (ex) {
    next(ex);
  }
}

module.exports.setHolder = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const holder = req.params.isHolder;
    const userData = await User.findByIdAndUpdate(
      userId, {
        isHolder: holder,
      }, {
        new: true
      }
    );
    return res.json({
      userId: userData._id,
      isHolder: userData.isHolder
    });
  } catch (ex) {
    next(ex);
  }
}

module.exports.setLiquidityProvider = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const liquidityprovider = req.params.isLiquidityProvider;
    const userData = await User.findByIdAndUpdate(
      userId, {
        isLiquidityProvider: liquidityprovider,
      }, {
        new: true
      }
    );
    return res.json({
      userId: userData._id,
      isLiquidityProvider: userData.isLiquidityProvider
    });
  } catch (ex) {
    next(ex);
  }
}

module.exports.setAvatar = async (req, res, next) => {
  try {
    const {
      address,
      avatarImage
    } = req.body;
    const query = {
      address: address
    }
    const update = {
      $set: {
        avatarImage: avatarImage
      }
    }
    const userData = await User.updateOne(
      query,
      update, {
        upsert: false
      },
      function (err, doc) {
        if (err) {
          return;
        } else {
          console.log("Avatar Updated");
        }
      });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({
      _id: {
        $ne: req.params.id
      }
    }).select([
      "address",
      "username",
      "balance",
      "role",
      "isSpacenaut",
      "isKraken",
      "isWhale",
      "isShark",
      "isOrca",
      "isDolphin",
      "isTurtle",
      "isFish",
      "isCrab",
      "isShrimp",
      "isHolder",
      "isLiquidityProvider",
      "avatarImage",
      "_id"
    ]);
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const {
      address
    } = req.body;
    const user = await User.findOne({
      address: {
        $regex: address.toLowerCase(),
        "$options": "i" 
      }
    })
    console.log("user", address, user)
    return res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({
      msg: "User id is required "
    });
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
