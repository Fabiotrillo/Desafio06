
import CartManager from "../dao/managersDB/CartManager.js"

const cartManager = new CartManager()


class CartsController {
  static getCarts = async (req, res) => {
    try {
      const carts = await cartManager.getCarts();
      res.status(200).send({
        status: "success",
        carts: carts,
      });
    } catch (error) {
      console.log("Error al obtener carritos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };

  static getCartById = async (req, res) => {
    const cid = req.params.cid;
    if (!cid) {
      return res.status(400).json({ error: "Debe ingresar Id. Cart" });
    }

    try {
      const cart = await cartManager.getCartByID(cid);
      res.status(200).json({
        status: "success",
        msg: "Cart encontrado",
        cart: cart,
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(404).json({
        status: "error",
        msg: error.message,
      });
    }
  };

  static createCarts = async (req, res) => {
    const { products, quantity } = req.body;

    if (!products || !quantity) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    try {
        const cart = await cartManager.createCarts();
      res.status(201).json({
        status: "success",
        msg: "Carrito creado",
        cart: cart,
      });
    } catch (error) {
      console.log("Error al crear el carrito:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };

  static addProductToCart = async (req, res) => {
    const { cid, pid, quantity } = req.body;

    if (!cid || !pid || !quantity) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    try {
      const result = await cartManager.addProductToCart(cid, pid, quantity);
      res.status(200).json({
        status: result.status,
        msg: result.msg,
      });
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error.message);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };

  static deleteCart = async (req, res) => {
    const cid = req.params.cid;

    if (!cid) {
      return res.status(400).json({ error: "Debe ingresar Id. Cart" });
    }

    try {
      const response = await cartManager.removeCart(cid);
      res.status(200).json(response);
    } catch (error) {
      console.error("Error al eliminar carrito:", error.message);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };

  static removeProductFromCart = async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    if (!cid || !pid) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    try {
      const response = await cartManager.removeProductFromCart(cid, pid);
      res.status(200).json(response);
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error.message);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };

}

export {CartsController};