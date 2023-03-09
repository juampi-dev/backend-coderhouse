//                                  DESAFIO ENTREGABLE N°3                        //
//                                   Servidor con Express                         //
// HECHO POR: JUAN PABLO SINKACHKUK

// Alumno de Programacion Back-End - CODERHOUSE 2023

// ------------------------------------------------------------------------------ //

//Importamos los módulos necesarios e iniciamos Express
const express = require("express");
const ProductManager = require("./ProductManager");
const app = express();
const PORT = 8080;

const productManager = new ProductManager("./productos.txt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint para obtener todos los productos o los primeros n productos
app.get("/products", (req, res) => {
  const { limit } = req.query;
  const products = productManager.getProducts();
  if (limit) {
    res.json(products.slice(0, parseInt(limit)));
  } else {
    res.json(products);
  }
});

// Endpoint para obtener un producto por su id
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  try {
    const product = productManager.getProductById(parseInt(id));
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});