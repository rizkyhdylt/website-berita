const router = require ('express').Router()
const authControllers = require('../controllers/authControllers')
const middleware = require('../middlewares/middleware')

router.post('/api/login', authControllers.login)
router.post('/api/news/writer/add',middleware.auth, middleware.role,authControllers.add_writer)
router.get('/api/news/writers',middleware.auth, middleware.role,authControllers.get_writers)

module.exports = router