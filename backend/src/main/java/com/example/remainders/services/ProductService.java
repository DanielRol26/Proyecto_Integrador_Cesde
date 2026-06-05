package com.example.remainders.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.Product;
import com.example.remainders.repositories.IProductRepository;

@Service
public class ProductService {

    //1. Inyectar la dependecia del repositorio en el servicio
    @Autowired
    private IProductRepository productRepository;

    //2. Objetivo: Activar mediante funciones las consultas que quiero ofrecer en mi tabla

    // POST
    // Guardar un solo registro en la tabla
    public Product saveProduct(Product dataProduct) {
        Product savedProduct = productRepository.save(dataProduct);
        return savedProduct;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<Product> listProducts() {
        List<Product> productsList = productRepository.findAll();
        return productsList;
    }

    // GET
    // Buscar registro de la tabla por id
    public Product searchProductById(UUID id){
        Optional<Product> searchedProduct = productRepository.findById(id);
        if (searchedProduct.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El producto que buscas no existe en la BD");
        }
        return searchedProduct.get();
    }

    // GET
    // Buscar registro por nombre del producto
    public List<Product> searchProductsByName(String name){
        List<Product> productsList = productRepository.findByName(name);
        return productsList;
    }

    // GET
    // Buscar registro por precio exacto del producto
    public List<Product> searchProductsByPrice(Double price){
        List<Product> productsList = productRepository.findByPrice(price);
        return productsList;
    }

    // GET
    // Buscar registro por precio menor que
    public List<Product> searchProductsByPriceLessThan(Double price){
        List<Product> productsList = productRepository.findByPriceLessThan(price);
        return productsList;
    }

    // GET
    // Buscar registro por precio mayor que
    public List<Product> searchProductsByPriceGreaterThan(Double price){
        List<Product> productsList = productRepository.findByPriceGreaterThan(price);
        return productsList;
    }

    // GET
    // Buscar registro por precio entre a y b
    public List<Product> searchProductsByPriceBetween(Double minPrice, Double maxPrice){
        List<Product> productsList = productRepository.findByPriceBetween(minPrice, maxPrice);
        return productsList;
    }

    // GET
    // Buscar registro por fecha de registro exacta
    public List<Product> searchProductsByCreatedAt(LocalDateTime createdAt){
        List<Product> productsList = productRepository.findByCreatedAt(createdAt);
        return productsList;
    }

    // GET
    // Buscar registro por fecha de registro menor que
    public List<Product> searchProductsByCreatedAtLessThan(LocalDateTime createdAt){
        List<Product> productsList = productRepository.findByCreatedAtLessThan(createdAt);
        return productsList;
    }

    // GET
    // Buscar registro por fecha de registro mayor que
    public List<Product> searchProductsByCreatedAtGreaterThan(LocalDateTime createdAt){
        List<Product> productsList = productRepository.findByCreatedAtGreaterThan(createdAt);
        return productsList;
    }

    // GET
    // Buscar registro por fecha de registro entre a y b
    public List<Product> searchProductsByCreatedAtBetween(LocalDateTime minCreatedAt, LocalDateTime maxCreatedAt){
        List<Product> productsList = productRepository.findByCreatedAtBetween(minCreatedAt, maxCreatedAt);
        return productsList;
    }

    // GET
    // Buscar registro por estado del producto
    public List<Product> searchProductsByStatus(Boolean status){
        List<Product> productsList = productRepository.findByStatus(status);
        return productsList;
    }

    // PUT
    // Actualizar un registro de la tabla por id
    public Product updateProductByID(UUID id, Product dataProduct) {
        Optional<Product> searchedProduct = productRepository.findById(id);
        if (searchedProduct.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El producto que buscas no existe en la BD");
        }
        Product productFoundInDB = searchedProduct.get();
        productFoundInDB.setName(dataProduct.getName());
        productFoundInDB.setDescription(dataProduct.getDescription());
        productFoundInDB.setPrice(dataProduct.getPrice());
        productFoundInDB.setStatus(dataProduct.getStatus());
        return productRepository.save(productFoundInDB);
    }

    // DELETE
    // Eliminar un registro de la tabla por id
    public Boolean deleteProductByID(UUID id) {
        Optional<Product> searchedProduct = productRepository.findById(id);
        if (searchedProduct.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El producto que buscas no existe en la BD");
        }
        productRepository.deleteById(id);
        return true;
    }
}
