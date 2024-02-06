import { Router } from "express";
import ProductManager from "../dao/managersDB/ProductManager.js";


const router = Router()
const manager = new ProductManager();


const publicAccess = (req,res,next) =>{
    if(req.session.user){
        return res.redirect("/");    
    }
    next();
}

const privateAccess = (req,res,next) =>{
    if(!req.session.user){
        return res.redirect('/login');  
    }
    next();
}

router.get('/products', privateAccess, async (req, res) => {
    try {
        const { limit, page, sort, category, availability, query} = req.query

        // Get the paginated list of products
        const productsResponse = await manager.getProducts(limit, page, sort, category, availability, query);
        // Render the products view with the obtained list

        res.render('products',  {products: productsResponse.msg});
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).send('Internal Server Error');
    }
});



router.get("/register", publicAccess,  (req,res)=>{
    res.render("register");
})


router.get("/login", publicAccess, (req,res)=>{
    res.render("login");
})

router.get("/", privateAccess, (req,res)=>{
    res.render("products",{user:req.session.user,  products:req.session.products})
})

router.get('/resetpassword', (req,res)=>{
    res.render("resetpassword")
})

router.get('/profile', privateAccess, (req, res) => {
    res.render('profile', { user: req.session.user });
});

export default router;