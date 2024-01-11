import { Router } from "express";
import userModel from "../dao/db/models/users.model.js";
import ProductManager from "../dao/managersDB/ProductManager.js";

const router = Router();
const manager = new ProductManager();

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    const exists = await userModel.findOne({ email })
    if (exists) {
        return res.status(400)
            .send({
                status: "Error",
                error: "El usuario ya existe!"
            })
    }
    const user = {
        first_name,
        last_name,
        email,
        age,
        password
    }

    let result = await userModel.create(user)
    res.send({
        status:"Success",
        message:"Usuario creado correctamente!"
    })
})


router.post('/login', async(req,res)=>{
    const {email,password} = req.body;
    //Buscar el usuario en la base de datos por su correo electronico
    const user = await userModel.findOne({email,password})

    if(!user){
      return  res.status(404).send({
            status:'Error',
            error:"Datos incorrectos"
        })
    }
    req.session.user = {
        full_name:`${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    const productsResponse = await manager.getProducts();
    req.session.products = productsResponse.msg;
    res.send({
        status:"Success",
        payload: req.session.user,
        message: "Usted ha ingresado con exito!"
    })
})

router.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.status(500).send({
                status:"Error",
                message:"No se pudo cerrar sesion."
            })
        }
        res.redirect('/login')
    })
})

export default router;