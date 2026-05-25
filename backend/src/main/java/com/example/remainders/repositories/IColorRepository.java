package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.Color;
import java.util.List;

@Repository
public interface IColorRepository extends JpaRepository<Color, UUID>{

    //Personalizando busqueda de la tabla COLORS

    //Buscar por color del producto
    List<Color> findByColor(String color);

    //Buscar por estado del color del producto
    List<Color> findByStatus(Boolean status);
}
