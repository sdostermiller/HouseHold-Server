const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User } = require("../models");
const { UniqueConstraintError } = require("sequelize");
const { body, validationResult } = require("express-validator");
const validateSession = require("../middleware/validate-session")

const router = Router();

router.get("/test", (res) => {
  res.send("testing the user route")
});

/*
======================================================
   Register Account with valid unique email address
======================================================
*/
router.post("/register", body("email").isEmail(), 

async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Please use a valid email: example@email.com",
      errors: errors.array()
    });

  };

    try{

      const { firstName, lastName, userName, email, passwordhash, houseId, userRole } = req.body;


      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        userRole: userRole,
        houseId: houseId,
        passwordhash: bcrypt.hashSync(passwordhash, 10),
      })

      //session token generated and stored according to validate-session in middleware
      
      const token = jwt.sign({
          id: newUser.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24
      });
  
      res.status(201).json({
        message: "Registration successful!",
        newUser,
        token
        ,
      });
    

  } catch (e) {

    if (e instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "Email already in use.  Please log in.",
        error: e
      });

    } else {

    res.status(500).json({
        message: "Unable to register user.",
        error: e
      });
    }
  }
 
  });


/*
======================
        Login
======================
*/

router.post("/login", async (req, res) => {
  const { email, passwordhash } = req.body;

  try{
    let loginUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (loginUser) {
      let passwordComparison = await bcrypt.compare(
        passwordhash, loginUser.passwordhash);
    
      if (passwordComparison) {
        let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

        res.status(200).json({
          user: loginUser,
          message: "Login Successful!",
          sessionToken: token
        });

      }  else {
        res.status(401).json({
          message: "Incorrect password.",
          error: e
        });
      }
    } else {
      res.status(401).json({
        message: "Email not found.  Please register for an account.",
        error: e
      });
    }
      
  } catch (e) {
    res.status(500).json({
      message: "Login failed.",
      error: e
    })
  }
});

/*
=======================
    Get User by ID
=======================
*/

router.get("/:id", validateSession, async (req, res) => {

  try {
      const thisUser = await User.findOne({
          where: {
              id: req.params.id
          }
      });
      res.status(200).json(thisUser);
  } catch (e) {
      res.status(500).json({ error: e });
  }
});


/*
===================
    Edit User
===================
*/

router.put("/edit/:id",  validateSession, async (req, res) => {
  const { userName, email, passwordhash, firstName, lastName, userRole, houseId } = req.body;
  const userId = req.params.id;

  const query = {
      where: {
          id: userId
      }
  };

  const editedUser = {
      userName,
      email,
      passwordhash,
      firstName,
      lastName,
      userRole,
      houseId
  };

  try {
      await User.update(editedUser, query);
      res.status(200).json({
          message: "User updated successfully!",
          editedUser
      });
  } catch (e) {
      res.status(500).json({ error: e });
  }
});

/*
===================
  Delete User
===================
*/

router.delete("/delete/:id", validateSession, async (req, res) => {
  const userId = req.params.id;

  try {
      const query = {
          where: {
              id: userId
          }
      };

      await User.destroy(query);
      res.status(200).json({ message: "User Account Deleted" });
  } catch (e) {
      res.status(500).json({ error: e });
  }
});

module.exports = router;
module.exports = router;
