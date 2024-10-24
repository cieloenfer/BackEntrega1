const fs = require('fs');
const path = './src/data/products.json';

class ProductManager {
  async getAll() {
    const data = await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(data);
  }

  async getById(id) {
    const products = await this.getAll();
    return products.find(p => p.id == id);
  }

  async add(product) {
    const products = await this.getAll();
    product.id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push(product);
    await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
    return product;
  }

  async update(id, newData) {
    const products = await this.getAll();
    const index = products.findIndex(p => p.id == id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...newData };
    await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async delete(id) {
    let products = await this.getAll();
    products = products.filter(p => p.id != id);
    await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
    return true;
  }
}

module.exports = ProductManager;
