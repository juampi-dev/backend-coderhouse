//                                  DESAFIO ENTREGABLE N°2                        //

// HECHO POR: JUAN PABLO SINKACHKUK

// Alumno de Programacion Back-End - CODERHOUSE 2023

// ------------------------------------------------------------------------------ //

// Importamos fs
const fs = require("fs");

class FileManager {
    #path;
    constructor(path) {
        this.#path = path;
    }

    readFile() {
        if (!fs.existsSync(this.#path)) {
            return [];
        }

        const fileContent = fs.readFileSync(this.#path, "utf-8");
        return JSON.parse(fileContent);
    }

    writeFile(content) {
        fs.writeFileSync(this.#path, JSON.stringify(content, null, 2));
    }
}

class Product {
    constructor({ id, title, description, price, thumbnail, code, stock }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    #fileManager;
    #products;
    constructor(path) {
        this.#fileManager = new FileManager(path);
        this.#products = this.#fileManager.readFile();
    }

    #generateId() {
        return this.#products[this.#products.length - 1] ? this.#products[this.#products.length - 1].id + 1 : 1;
    }

    // Método que agrega el producto
    addProduct(product) {
        const newProduct = new Product({ id: this.#generateId(), ...product });
        this.#products.push(newProduct);
        this.#fileManager.writeFile(this.#products);
        return newProduct;
    }

    // Método que retorna todos los productos o los primeros n productos
    getProducts(limit) {
        if (limit) {
            return this.#products.slice(0, limit);
        }
        return this.#products;
    }

    // Método que retorna un producto por su ID
    getProductById(id) {
        const product = this.#products.find((p) => p.id === id);
        if (!product) {
            throw new Error(`El producto con el id ${id} no fue encontrado`);
        }
        return product;
    }

    // Método para actualizar los productos
    updateProduct(id, update) {
        const index = this.#products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new Error(`El producto con el id ${id} no fue encontrado`);
        }

        const updatedProduct = { ...this.#products[index], ...update };
        this.#products[index] = updatedProduct;
        this.#fileManager.writeFile(this.#products);

        return updatedProduct;
    }

    // Metodo para eliminar producto
    deleteProduct(id) {
        const index =  this.#products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new Error(`El producto con el ${id} no fue encontrado`);
        }

        this.#products.splice(index, 1);
        this.#fileManager.writeFile(this.#products);
    }
}

// EXPORTAMOS EL MÓDULO
module.exports = ProductManager;