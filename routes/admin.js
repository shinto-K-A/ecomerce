var express = require('express');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')
const {home,postLogin,viewProduct,addproductGet,addproductPost,deleteproductGet,editproductGet,editproductPost,userView,blockuserGet,unblockuserGet,
    categoryGet,categoryPost,deletecategoryGet,editcategoryGet,editcategoryPost,stockGet,editstockGet
    ,bannerGet,editstockPost,editbannerPost,editbannerGet,orderGet,cancellorderGet,shipedorderGet,deliverorderGet,offerGet,addcouponPost,logoutGet}=require('../controllers/admin')


/*GET login*/
router.get('/', home)
/*POST login*/
router.post('/login',postLogin)
/*GET view products*/
router.get('/view',viewProduct)
/*GET add-product*/
router.get('/add-product',addproductGet)
/*POST add-product*/
router.post('/add-product',addproductPost)
/*GET delete-product*/
router.get('/delete-product/:id',deleteproductGet)
/*GET edit-product*/
router.get('/edit-product/',editproductGet)
/*POST edit-product*/
router.post('/edit-product/:id',editproductPost)
/*----USER----*/
router.get('/view-users',userView)
/*GET block-user*/
router.get('/block-user',blockuserGet)
/*GET unblock-user*/
router.get('/unblock-user',unblockuserGet)
/*GET add-category*/
router.get('/add-categorys',categoryGet)
/*POST add-category*/
router.post('/add-categorys',categoryPost)
/*GET delete-category*/
router.get('/delete-category/:id',deletecategoryGet)
/*GET edit-category*/
router.get('/edit-category',editcategoryGet)
/*POST edit-category*/
router.post('/edit-category',editcategoryPost)
/*GET stock*/
router.get('/stock',stockGet)
/*GET edit-stock*/
router.get('/edit-stock',editstockGet)
/*POST edit-stock*/
router.post('/edit-stock',editstockPost)
/*GET banner*/
router.get('/banner',bannerGet)
/*GET edit-banner*/
router.get('/edit-banner',editbannerGet)
/*POST banner*/
router.post('/edit-banner',editbannerPost)
/*GET orders*/
router.get('/orders',orderGet)
/*GET cancel-order*/
router.get('/cancel-order',cancellorderGet)
/*GET shipped-order*/
router.get('/shipped-order',shipedorderGet)
/*GET deliver-order*/
router.get('/deliver-order',deliverorderGet)
/*GET offers*/
router.get('/ofers',offerGet)
/*POST addcoupon*/
router.post('/addcoupon',addcouponPost)
/*GET logout*/
router.get('/logout',logoutGet)

module.exports = router;
