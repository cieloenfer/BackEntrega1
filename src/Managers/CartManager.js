const fs = require('fs');
const path = './src/data/carts.json';

class CartManager {
  async getAll() {
    const data = await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(data);
  }

  async getById(id) {
    const carts = await this.getAll();
    return carts.find(c => c.id == id);
  }

  async addCart() {
    const carts = await this.getAll();
    const newCart = { id: carts.length ? carts[carts.length - 1].id + 1 : 1, products: [] };
    carts.push(newCart);
    await fs.promises.writeFile(path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const carts = await this.getAll();
    const cart = carts.find(c => c.id == cartId);
    if (!cart) return null;

    const existingProduct = cart.products.find(p => p.product == productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await fs.promises.writeFile(path, JSON.stringify(carts, null, 2));
    return cart;
  }
}

module.exports = CartManager;
