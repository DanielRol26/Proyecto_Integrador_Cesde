package com.example.remainders.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.ProductVariant;
import com.example.remainders.repositories.IProductVariantRepository;

@Service
public class ProductVariantService {

    //1. Inyectar la dependencia del repositorio en el servicio
    @Autowired
    private IProductVariantRepository productVariantRepository;

    //2. Objetivo: Activar mediante funciones las consultas que quiero ofrecer en mi tabla

    // POST
    // Guardar un solo registro en la tabla
    public ProductVariant saveProductVariant(ProductVariant dataProductVariant) {
        ProductVariant savedProductVariant = productVariantRepository.save(dataProductVariant);
        return savedProductVariant;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<ProductVariant> listProductVariants() {
        List<ProductVariant> productVariantsList = productVariantRepository.findAll();
        return productVariantsList;
    }

    // GET
    // Buscar registro de la tabla por id
    public ProductVariant searchProductVariantById(UUID id) {
        Optional<ProductVariant> searchedProductVariant = productVariantRepository.findById(id);
        if (searchedProductVariant.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La variante del producto que buscas no existe en la BD");
        }
        return searchedProductVariant.get();
    }

    // GET
    // Buscar registro por stock exacto de la variante del producto
    public List<ProductVariant> searchProductVariantsByStock(Integer stock){
        List<ProductVariant> productVariantsList = productVariantRepository.findByStock(stock);
        return productVariantsList;
    }

    // GET
    // Buscar registro por stock menor que
    public List<ProductVariant> searchProductVariantsByStockLessThan(Integer stock){
        List<ProductVariant> productVariantsList = productVariantRepository.findByStockLessThan(stock);
        return productVariantsList;
    }

    // GET
    // Buscar registro por stock mayor que
    public List<ProductVariant> searchProductVariantsByStockGreaterThan(Integer stock){
        List<ProductVariant> productVariantsList = productVariantRepository.findByStockGreaterThan(stock);
        return productVariantsList;
    }

    // GET
    // Buscar registro por stock entre a y b
    public List<ProductVariant> searchProductVariantsByStockBetween(Integer minStock, Integer maxStock){
        List<ProductVariant> productVariantsList = productVariantRepository.findByStockBetween(minStock, maxStock);
        return productVariantsList;
    }

    // GET
    // Buscar registro por estado de la variante del producto
    public List<ProductVariant> searchProductVariantsByStatus(Boolean status){
        List<ProductVariant> productVariantsList = productVariantRepository.findByStatus(status);
        return productVariantsList;
    }

    // PUT
    // Actualizar un registro de la tabla
    public ProductVariant updateProductVariant(UUID id, ProductVariant newDataProductVariant) {
        Optional<ProductVariant> searchedProductVariant = productVariantRepository.findById(id);
        if (searchedProductVariant.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La variante del producto que buscas no existe en la BD");
        }
        // Actualización de los campos modificables de la variante del producto
        // Stock y estado
        ProductVariant productVariantFoundInDB = searchedProductVariant.get();
        productVariantFoundInDB.setStock(newDataProductVariant.getStock());
        productVariantFoundInDB.setStatus(newDataProductVariant.getStatus());
        return productVariantRepository.save(productVariantFoundInDB);
    }

    // DELETE
    // Eliminar un registro de la tabla
    public Boolean deleteProductVariant(UUID id){
        Optional<ProductVariant> searchedProductVariant = productVariantRepository.findById(id);
        if (searchedProductVariant.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "La variante del producto que buscas no existe en la BD");
        }
        productVariantRepository.deleteById(id);
        return true;
    }
}
