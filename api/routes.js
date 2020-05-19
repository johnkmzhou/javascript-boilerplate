//const passport = require('passport');
const jwt = require('jsonwebtoken');
//const { Op } = require('sequelize');
//const multer = require('multer');
//const path = require('path');
//const fs = require('fs');
const bcrypt = require('bcrypt');
const sequelize = require('./models');

module.exports = router => {
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await sequelize.models.users.findOne({
        where: { username },
      });
      if (!user) {
        res
          .status(401)
          .send([{ field: 'username', message: 'Incorrect username.' }]);
      } else if (bcrypt.compare(password, user.password)) {
        const payload = { id: user.id, username: user.username };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              res
                .status(500)
                .send([{ message: 'Error signing token', raw: err }]);
              console.error(err);
            } else {
              res.send({ token });
            }
          }
        );
      } else {
        res
          .status(401)
          .json({ field: 'password', message: 'Incorrect password.' });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  });

  router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      await sequelize.models.users.create({
        username,
        password: hash,
        createdAt: new Date(),
      });
      res.send({ message: 'Registration successful.' });
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  });
};
