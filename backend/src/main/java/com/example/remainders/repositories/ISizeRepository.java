package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.Size;
import java.util.List;


@Repository
public interface ISizeRepository extends JpaRepository<Size, UUID>{

    //Personalizando busquedas de la tabla SIZES

    //Buscar por talla
    List<Size> findBySize(String size);

    //Buscar por estado de talla
    List<Size> findByStatus(Boolean status);
}
