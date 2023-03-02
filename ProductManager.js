//                                  DESAFIO ENTREGABLE N°2                        //

// HECHO POR: JUAN PABLO SINKACHKUK

// Alumno de Programacion Back-End - CODERHOUSE 2023

// ------------------------------------------------------------------------------ //

// Importamos fs
const fs = require("fs");

// Clase ProductManager & this.path
class ProductManager {
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify([]));
    }
  }

  // Método que agrega el producto
  addProduct(product) {
    const products = this._readFile();
    const newProduct = { ...product, id: this._generateId(products) };
    products.push(newProduct);
    this._writeFile(products);
    return newProduct;
  }

  // Método que retorna un producto
  getProducts() {
    return this._readFile();
  }

  // Método que retorna un producto por su ID
  getProductById(id) {
    const products = this._readFile();
    const product = products.find((p) => p.id === id);
    if (!product) {
      throw new Error(`El producto con el id ${id} no fue encontrado`);
    }
    return product;
  }

  // Método para actualizar los productos
  updateProduct(id, update) {
    const products = this._readFile();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`El producto con el id ${id} no fue encontrado`);
    }
    const updatedProduct = { ...products[index], ...update };
    products[index] = updatedProduct;
    this._writeFile(products);
    return updatedProduct;
  }

  // Metodo para eliminar producto
  deleteProduct(id) {
    const products = this._readFile();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`El producto con el ${id} no fue encontrado`);
    }
    products.splice(index, 1);
    this._writeFile(products);
  }

// MANEJO DE ARCHIVOS: leer, escribir y generar id

  _readFile() {
    const fileContent = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(fileContent);
  }

  _writeFile(content) {
    fs.writeFileSync(this.path, JSON.stringify(content, null, 2));
  }

  _generateId(products) {
    const lastProduct = products[products.length - 1];
    return lastProduct ? lastProduct.id + 1 : 1;
  }

}

// TESTS

/*
                                <<        PROCESO DE TESTING        >>

- Se creará una instancia de la clase “ProductManager”
- Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
- Se llamará al método “addProduct” con los campos:
    title: “producto prueba”
    description:”Este es un producto prueba”
    price:200,
    thumbnail:”Sin imagen”
    code:”abc123”,
    stock:25
- El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
- Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
- Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
- Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
- Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.

*/

// Funcion asincrona que realiza los tests estipulados en el "Proceso de Testing" y genera el archivo "productos.txt"

const runTests = async () => {
  try {
    const productManager = new ProductManager("productos.txt");

    // Test 1: getProducts debe devolver un arreglo vacío
    console.log("Test 1: getProducts devuelve un arreglo vacío");
    const products = productManager.getProducts();
    console.log(products);
    console.log("------------------------");

    // Test 2: addProduct debe agregar un nuevo producto
    console.log("Test 2: addProduct agrega un nuevo producto");
    const newProduct = {
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    };
    const addedProduct = productManager.addProduct(newProduct);
    console.log(addedProduct);
    console.log("------------------------");

    // Test 3: getProducts debe devolver el producto agregado anteriormente
    console.log("Test 3: getProducts devuelve el producto agregado");
    const productsAfterAdd = productManager.getProducts();
    console.log(productsAfterAdd);
    console.log("------------------------");

    // Test 4: getProductById debe devolver el producto agregado anteriormente
    console.log("Test 4: getProductById devuelve el producto con el id especificado");
    const productById = productManager.getProductById(addedProduct.id);
    console.log(productById);
    console.log("------------------------");

    // Test 5: updateProduct debe actualizar un campo del producto especificado
    console.log("Test 5: updateProduct actualiza un campo del producto especificado");
    const update = { price: 300 };
    const updatedProduct = productManager.updateProduct(addedProduct.id, update);
    console.log(updatedProduct);
    console.log("------------------------");

    // Test 6: deleteProduct debe eliminar el producto especificado
    console.log("Test 6: deleteProduct elimina el producto especificado");
    productManager.deleteProduct(addedProduct.id);
    const productsAfterDelete = productManager.getProducts();
    console.log(productsAfterDelete);
    console.log("------------------------");
  } catch (error) {
    console.log(error.message);
  }
};

// LLAMAMOS A LA FUNCIÓN QUE EJECUTA LOS TESTS
runTests();