package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.Cart;
import java.util.List;
import java.time.LocalDateTime;


@Repository
public interface ICartRepository extends JpaRepository<Cart, UUID>{

    //Personalizando busqueda de la tabla CART

    //Buscar por fecha exacta de registro en el carrito
    List<Cart> findByCreatedAt(LocalDateTime createdAt);
    
    //Buscar por fecha de registro en el carrito menor que
    List<Cart> findByCreatedAtLessThan(LocalDateTime createdAt);

    //Buscar por fecha de registro en el carrito mayor que
    List<Cart> findByCreatedAtGreaterThan(LocalDateTime createdAt);

    //Buscar por fecha de registro en el carrito entre a y b
    List<Cart> findByCreatedAtBetween(LocalDateTime minCreatedAt, LocalDateTime maxCreatedAt);

    //Buscar por estado de registro
    List<Cart> findByStatus(Boolean status);

}
