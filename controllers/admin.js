var productHelper=require('../helpers/product-helpers')
var adminHelper=require('../helpers/admin-helpers')

const adminEmail = 'shinto@gmail.com'
const adminPassword = '123'
module.exports = {
    
    home: async function (req, res, next) {
        res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0")
        let User = req.session.admin;
        let totalOrders=await adminHelper.getTotalOrders()
        let totalProducts=await adminHelper.getAllProductCount()
        let salesData=await adminHelper.getAllSales()
        let TotalUsers= await adminHelper.getTotalUsers()
        let yearly=await adminHelper.getYearlySalesGraph();
        let monthly=await adminHelper.getMonthlySalesGraph();
        let daily=await adminHelper.getDailySalesGraph();




        console.log(daily,'2222222222222222222222222222222222222222222222222');



        // console.log(salesData,'kkkkkkkkkkkkkkkkkkkklllllllllll');
        
        
        if (User) {
            res.render('admin/landing', {layout: 'admin-layout',totalOrders,totalProducts,salesData,TotalUsers,daily,yearly,monthly})
        }//already loged in annengil home pageill pookum
        else { res.render('admin/login', { layout: null }) }
    },
    postLogin: (req, res) => {
        const userData = { email, password } = req.body
        if (email === adminEmail && password === adminPassword) {
            req.session.admin = userData
            res.render('admin/landing', { layout: 'admin-layout' })
        } 
        else {
            console.log("error")
            res.redirect('/admin')
        }


    },
    viewProduct: function (req, res, next) {
        res.header("Cache-Control","no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0")
        productHelper.getAllproducts().then((products) => {
            res.render('admin/view-products', { layout: 'admin-layout', products })
        })
    },
    addproductGet: async(req, res) => {
        res.header("Cache-Control","no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0")
        await productHelper.getAllCategories().then((response) => {
            res.render('admin/add-product', { layout: 'admin-layout', response })
        })
    },
    addproductPost: (req, res) => {
        productHelper.addProduct(req.body, (id) => {
            let image = req.files.image
            image.mv('./public/product-images/' + id + '.jpg', (err, done) => {
                if (!err) {
                    res.redirect('/admin/add-product')
                }
                else console.log(`error due to ${err}`)
            })
        })
    },
    deleteproductGet: (req, res) => {
        let userID = req.params.id
        productHelper.deleteProduct(userID).then((response) => {
            res.redirect('/admin/view')
        })

    },
    editproductGet: async (req, res) => {
        let product = await productHelper.getOneproduct(req.query.id)
        console.log(product);
        res.render('admin/edit-product', { layout: 'admin-layout', product });
    },
    editproductPost: (req, res) => {
        productHelper.updateProduct(req.params.id, req.body).then(() => {
            console.log(req.params.id);
            let id = req.params.id
            res.redirect('/admin/view')
            if (req.files?.image) {
                let image = req.files.image
                image.mv('./public/product-images/' + id + '.jpg')
            }
        })
    },
    categoryGet:(req,res)=>{
        res.header("Cache-Control","no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0")
        productHelper.getAllCategories().then((categor)=>{
            res.render('admin/add-category',{layout:'admin-layout',categor})

        })
        
    },
    categoryPost: (req, res) => {
        productHelper.addCategory(req.body).then((response) => {
            res.redirect('/admin/add-categorys')

        })
    },
    deletecategoryGet:(req,res)=>{
        let cateID = req.params.id
        productHelper.deleteCategory(cateID).then((response) => {
            res.redirect('/admin/add-categorys')
        })

    },
    editcategoryGet:async(req,res)=>{
        await productHelper.findoneCategory(req.query.id).then((response) => {
            res.render('admin/edit-category',{layout:'admin-layout',response})
            console.log(response);
        })   
    },
    editcategoryPost:(req,res)=>{
        productHelper.editCategory(req.query.id,req.body).then((response)=>{
            res.redirect('/admin/add-categorys')
        })
    },
    stockGet:(req,res)=>{
        productHelper.getAllproducts().then((categor)=>{
        res.render('admin/stock',{layout:'admin-layout',categor})
    })
    },

    //ADMINS USER OPERATIONS//
    userView:(req,res)=>{
        adminHelper.getallUsers().then((user) => {
            res.render('admin/view-user', { layout: 'admin-layout', user })
        })
    },
    blockuserGet:(req,res)=>{
        let userId=req.query.id
        adminHelper.blockUser(userId).then((response)=>{
            res.redirect('/admin/view-users')
        })

    },
    unblockuserGet:(req,res)=>{
        let usersId=req.query.id
        adminHelper.unblockUser(usersId).then((response)=>{
            res.redirect('/admin/view-users')
        })

    },
    editstockGet:(req,res)=>{
        productHelper.getOneproduct(req.query.id).then((response)=>{
            res.render('admin/edit-stock',{layout:'admin-layout',response})

        })
    },
    editstockPost:(req,res)=>{
        productHelper.updateStock(req.query.id,req.body).then((response)=>{
            res.redirect('/admin/stock')

        })
    },
    bannerGet:(req,res)=>{
        productHelper.getAllBanner().then((produc) => {
            

        res.render('admin/banner',{layout:'admin-layout',produc})
        })
    },
    editbannerGet: (req, res) => {
        productHelper.getOneBanner(req.query.id).then((baners) => {
            res.render('admin/edit-banner', { layout: 'admin-layout', baners })


        })

    },
    editbannerPost: (req, res) => {
            productHelper.updateBaner(req.query.id, req.body).then(() => {
                
                let id = req.query.id
                res.redirect('/admin/banner')
                if (req.files?.image) {
                    let image = req.files.image
                    image.mv('./public/banner-images/' + id + '.jpg')
                }
            })
        },
        orderGet:async(req,res)=>{
            let orders=await productHelper.getAllOrders()
            
            res.render('admin/all-orders',{layout:'admin-layout',orders})
        },
        cancellorderGet:(req,res)=>{
            adminHelper.cancellOrder(req.query.id).then((response)=>{
                res.redirect('/admin/orders')
            })

        },
        shipedorderGet:(req,res)=>{
            adminHelper.shipedOrder(req.query.id).then((response)=>{
                res.redirect('/admin/orders')
            })
        },
        deliverorderGet:(req,res)=>{
            adminHelper.deliveredOrder(req.query.id).then((response)=>{
                res.redirect('/admin/orders')
            })

        },
        
     
    
}