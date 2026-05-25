package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.ProductImage;
import java.util.List;


@Repository
public interface IProductImageRepository extends JpaRepository<ProductImage, UUID>{

    //Personalizando busqueda de la tabla PRODUCTIMAGES

    //Buscar por imagenes principales y secundarias
    List<ProductImage> findByIsPrimary(Boolean isPrimary);

    //Buscar por estado de las imagenes
    List<ProductImage> findByStatus(Boolean status);
}
