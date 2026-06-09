package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.Product;
import java.util.List;
import java.time.LocalDateTime;



@Repository
public interface IProductRepository extends JpaRepository<Product, UUID>{

    //Personalizando busquedas de la tabla PRODUCTS

    //Buscar por nombre
    List<Product> findByName(String name);

    //Buscar por precio exacto
    List<Product> findByPrice(Double price);

    //Buscar por precio menor que
    List<Product> findByPriceLessThan(Double price);

    //Buscar por precio mayor que
    List<Product> findByPriceGreaterThan(Double price);

    //Buscar por precio entre a y b
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);

    //Buscar por fecha de registro exacta
    List<Product> findByCreatedAt(LocalDateTime createdAt);

    //Buscar por fecha de registro menor que
    List<Product> findByCreatedAtLessThan(LocalDateTime createdAt);

    //Buscar por fecha de registro mayor que
    List<Product> findByCreatedAtGreaterThan(LocalDateTime createdAt);

    //Buscar por fecha de registro entre a y b
    List<Product> findByCreatedAtBetween(LocalDateTime minCreatedAt, LocalDateTime maxCreatedAt);

    //Buscar por estado de productos
    List<Product> findByStatus(Boolean status);
}
