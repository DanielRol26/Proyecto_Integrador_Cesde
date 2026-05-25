package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.ProductVariant;
import java.util.List;


@Repository
public interface IProductVariantRepository extends JpaRepository<ProductVariant, UUID>{

    //Personalizando busqueda de la tabla PRODUCTVARIANTS

    //Buscar por stock exacto
    List<ProductVariant> findByStock(Integer stock);

    //Buscar por stock menor que
    List<ProductVariant> findByStockLessThan(Integer stock);

    //Buscar por stock mayor que 
    List<ProductVariant> findByStockGreaterThan(Integer stock);

    //Buscar por stock entre a y b
    List<ProductVariant> findByStockBetween(Integer minStock, Integer maxStock);

    //Buscar por estado de las variantes de los productos
    List<ProductVariant> findByStatus(Boolean status);
}
