package com.example.remainders.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.Category;

@Repository
public interface ICategoryRepository extends JpaRepository<Category, UUID>{

    //Personalizando busqueda de la tabla CATEGORIES

    //Buscar por nombre
    List<Category> findByName(String name);

    //Buscar por estado de categoria
    List<Category> findByStatus(Boolean status);
}
