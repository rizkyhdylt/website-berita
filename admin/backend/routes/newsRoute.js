const router = require ('express').Router()
const middleware = require('../middlewares/middleware')
const newsController = require('../controllers/newsController')

// dashboard
router.post('/api/news/add', middleware.auth, newsController.add_news)
router.put('/api/news/update/:news_id', middleware.auth, newsController.update_news)
router.put('/api/news/status-update/:news_id', middleware.auth, newsController.update_news_update)



router.get('/api/images', middleware.auth, newsController.get_images)
router.post('/api/images/add', middleware.auth, newsController.add_images)

router.get('/api/news', middleware.auth, newsController.get_dashboard_news)
router.get('/api/news/:news_id', middleware.auth, newsController.get_dashboard_single_news)

router.post('/api/:id/view', middleware.auth, newsController.addView)

//website
router.get('/api/all/news',newsController.get_all_news)
router.get('/api/news/details/:slug',newsController.get_news)
router.get('/api/category/news/:category',newsController.get_category_news)
router.get('/api/category/all',newsController.get_categories)
router.get('/api/city/all', newsController.get_cities)
router.get('/api/city/news/:city', newsController.get_city_news)
router.get('/api/search/news',newsController.news_search)

router.delete('/api/news/delete/:news_id', middleware.auth, newsController.delete_news);


router.post('/api/category', newsController.addCategory);
router.get('/api/category', newsController.getAllCategories);
router.post('/api/city', newsController.addCity);
router.get('/api/city', newsController.getAllCities);
router.delete('/api/category/:id', newsController.deleteCategory); 
router.delete('/api/city/:id', newsController.deleteCity);  

router.get('/api/trending', newsController.getTrendingNews);

module.exports = router 