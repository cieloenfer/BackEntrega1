const { Router } = require('express');
const CartManager = require('../Managers/CartManager');
const router = Router();
const cartManager = new CartManager();

// POST: Crear un nuevo carrito
router.post('/', async (req, res) => {
  const newCart = await cartManager.addCart();
  res.status(201).json(newCart);
});

// GET: Obtener productos del carrito
router.get('/:cid', async (req, res) => {
  const cart = await cartManager.getById(req.params.cid);
  if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
  res.json(cart.products);
});

// POST: Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartManager.addProductToCart(cid, pid);
  if (!cart) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
  res.json(cart);
});

module.exports = router;
