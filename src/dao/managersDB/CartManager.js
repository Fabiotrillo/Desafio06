import cartModel from "../db/models/carts.model.js"
import productModel from "../db/models/products.model.js";


class CartManager {
    getCarts = async () => {
        try {
          const carts = await cartModel.find();
          return carts;
        } catch (error) {
          console.error("Error fetching carts:", error);
        }
      };
    

    async getCartByID(cid) {
        const cart = await cartModel.findById(cid);
        return cart;
    }

    createCarts = async () => {
        const cart = {
          products: [],
          quantity:0
        };
        try {
          const carts = await cartModel.create(cart);
          return carts;
        } catch {}
      };

    async addProductToCart(cid, pid, quantity = 1) {
        try {
            const cart = await cartModel.findById(cid).populate('products.product');

            if (!cart) {
                throw new Error(`El carrito con el id ${cid} no existe`);
            }

            const product = await productModel.findById(pid);

            if (!product) {
                throw new Error(`El producto con el id ${pid} no existe`);
            }

            const productInCart = cart.products.find(item => item.product._id.equals(pid));

            if (!productInCart) {
                cart.products.push({
                    product: product,
                    quantity: quantity
                });
            } else {
                productInCart.quantity += quantity;
            }

           
            cart.total = cart.products.reduce((total, item) => total + item.product.price * item.quantity, 0);

            await cart.save();

            return {
                status: "Success",
                msg: "Producto agregado correctamente al carrito"
            };
        } catch (error) {
            console.error('Error al intentar agregar producto al carrito:', error.message);
            throw new Error('Error al intentar agregar producto al carrito');
        }
    }
}

export default CartManager;