package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.Brand;
import java.util.List;


@Repository
public interface IBrandRepository extends JpaRepository<Brand, UUID>{

    //Personalizando busqueda de la tabla BRANDS

    //Buscar por nombre
    List<Brand> findByName(String name);

    //Buscar por estado de marca
    List<Brand> findByStatus(Boolean status);
}
