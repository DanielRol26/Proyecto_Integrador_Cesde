package com.example.remainders.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.ProductImage;
import com.example.remainders.repositories.IProductImageRepository;

@Service
public class ProductImageService {

    //1. Inyectar la dependencia del repositorio en el servicio
    @Autowired
    private IProductImageRepository productImageRepository;

    //2. Objetivo: Activar mediante funciones las consultas que quiero ofrecer en mi tabla

    // POST
    // Guardar un solo registro en la tabla
    public ProductImage saveProductImage(ProductImage dataProductImage) {
        ProductImage savedProductImage = productImageRepository.save(dataProductImage);
        return savedProductImage;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<ProductImage> listProductImages() {
        List<ProductImage> productImagesList = productImageRepository.findAll();
        return productImagesList;
    }

    // GET
    // Buscar registro de la tabla por id
    public ProductImage searchProductImageById(UUID id) {
        Optional<ProductImage> searchedProductImage = productImageRepository.findById(id);
        if (searchedProductImage.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La imagen del producto que buscas no existe en la BD");
        }
        return searchedProductImage.get();
    }
    
    // GET
    // Buscar registro por imagen principal o secundaria
    public List<ProductImage> searchProductImagesByIsPrimary(Boolean isPrimary){
        List<ProductImage> productImagesList = productImageRepository.findByIsPrimary(isPrimary);
        return productImagesList;
    }

    // GET
    // Buscar registro por estado de la imagen
    public List<ProductImage> searchProductImagesByStatus(Boolean status){
        List<ProductImage> productImagesList = productImageRepository.findByStatus(status);
        return productImagesList;
    }

    // PUT
    // Actualizar un registro de la tabla por id
    public ProductImage updateProductImageById(UUID id, ProductImage dataProductImage) {
        Optional<ProductImage> searchedProductImage = productImageRepository.findById(id);
        if (searchedProductImage.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La imagen del producto que buscas no existe en la BD");
        }
        ProductImage productImageFoundInDB = searchedProductImage.get();
        productImageFoundInDB.setImageUri(dataProductImage.getImageUri());
        productImageFoundInDB.setIsPrimary(dataProductImage.getIsPrimary());
        productImageFoundInDB.setStatus(dataProductImage.getStatus());
        return productImageRepository.save(productImageFoundInDB);
    }

    // DELETE
    // Eliminar un registro de la tabla por id
    public Boolean deleteProductImageById(UUID id) {
        Optional<ProductImage> searchedProductImage = productImageRepository.findById(id);
        if (searchedProductImage.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La imagen del producto que buscas no existe en la BD");
        }
        productImageRepository.deleteById(id);
        return true;
    }
}
