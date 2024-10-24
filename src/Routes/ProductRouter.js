const { Router } = require('express');
const ProductManager = require('../Managers/ProductManager');
const router = Router();
const productManager = new ProductManager();

// GET: Listar todos los productos
router.get('/', async (req, res) => {
  const products = await productManager.getAll();
  res.json(products);
});

// GET: Obtener producto por ID
router.get('/:pid', async (req, res) => {
  const product = await productManager.getById(req.params.pid);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
});

// POST: Crear nuevo producto
router.post('/', async (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  if (!title || !description || !code || !price || !status || !stock || !category) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  const newProduct = await productManager.add({ title, description, code, price, status, stock, category, thumbnails });
  res.status(201).json(newProduct);
});

// PUT: Actualizar producto
router.put('/:pid', async (req, res) => {
  const updatedProduct = await productManager.update(req.params.pid, req.body);
  if (!updatedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(updatedProduct);
});

// DELETE: Eliminar producto
router.delete('/:pid', async (req, res) => {
  const success = await productManager.delete(req.params.pid);
  if (!success) return res.status(404).json({ error: 'Producto no encontrado' });
  res.status(204).end();
});

module.exports = router;
