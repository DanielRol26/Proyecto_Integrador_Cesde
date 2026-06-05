package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.CartDetail;
import java.util.List;


@Repository
public interface ICartDetailRepository extends JpaRepository<CartDetail, UUID>{

    //Personalizando busquedas de la tabla CARTDETAILS

    //Buscar por cantidad exacta del producto
    List<CartDetail> findByQuantity(Integer quantity);

    //Buscar por cantidad del producto menor que 
    List<CartDetail> findByQuantityLessThan(Integer quantity);

    //Buscar por cantidad del producto mayor que
    List<CartDetail> findByQuantityGreaterThan(Integer quantity);

    //Buscar por cantidad del producto entre a y b
    List<CartDetail> findByQuantityBetween(Integer minQuantity, Integer maxQuantity);
}
