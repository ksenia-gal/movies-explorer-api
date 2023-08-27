const router = require('express').Router();

const { validateChangeUserData } = require('../middlewares/validation');
const { getCurrentUser, changeUserInfo } = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getCurrentUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', validateChangeUserData, changeUserInfo);

module.exports = router;
