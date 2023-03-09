//                                  DESAFIO ENTREGABLE N°1                        //

// HECHO POR: JUAN PABLO SINKACHKUK

// Alumno de Programacion Back-End - CODERHOUSE 2023

// ------------------------------------------------------------------------------ //


// Clase constructora de productos
class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = this.idGenerator();
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }

  // Generador de ID usando un contador estático
  static idCounter = 1;

  idGenerator() {
    return Product.idCounter++;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  // Método para agregar producto con sus características
  addProduct(title, description, price, thumbnail, code, stock) {
    // Pushear el producto creado al array vacío
    this.products.push(
      new Product(title, description, price, thumbnail, code, stock),
    );
  }

  // Método para retornar los productos
  getProducts() {
    return this.products;
  }

  // Método para retornar un producto por su ID
  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }
}

// Creamos 2 productos nuevos en la variable productManager, usando el método .addProduct
const productManager = new ProductManager();
productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
productManager.addProduct('producto 2 de prueba', 'Este es un producto prueba', 2000, 'Sin imagen', 'abcd1234', 250000);

// Imprimimos los productos creados
console.log(productManager.getProducts());

// Obtenemos un producto por su ID
console.log(productManager.getProductById(1));