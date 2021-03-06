const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const sequelize = require('./models');

const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        const dir = './uploads/' + req.user.id;
        await fs.promises.mkdir(dir, { recursive: true });
        cb(null, dir);
      } catch (e) {
        console.error(e);
        cb(e, null);
      }
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.originalname.slice(0, -4) +
          '-' +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only pdf files are allowed!'), false);
    }
    cb(null, true);
  },
});

module.exports = router => {
  router.post(
    '/create-post',
    [
      passport.authenticate('jwt', { session: false }),
      upload.single('attachment'),
    ],
    async (req, res) => {
      try {
        const values = {
          userId: req.user.id,
          post: req.body.post,
          publishedAt: new Date(),
        };
        if (req.file) {
          values.attachmentPath = '/' + req.file.path.replace(/\\/g, '/');
        }
        const result = await sequelize.models.posts.create(values);
        res.send(result);
      } catch (e) {
        console.error(e);
        res.status(500).send();
      }
    }
  );

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

  router.get('/posts', async (req, res) => {
    let query = req.query;

    try {
      if (Object.keys(query).length !== 0) {
        Object.keys(query).forEach(key => {
          if (query[key].gt) {
            query[key][Op.gt] = query[key].gt;
            delete query[key].gt;
          }
        });
      }

      const result = await sequelize.models.posts.findAll({
        include: [{ model: sequelize.models.users, attributes: ['username'] }],
        where: query,
      });
      res.send(result);
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  });

  router.get('/posts/:id', async (req, res) => {
    try {
      const result = await sequelize.models.posts.findOne({
        include: [{ model: sequelize.models.users, attributes: ['username'] }],
        where: { id: req.params.id },
      });
      res.send(result);
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
