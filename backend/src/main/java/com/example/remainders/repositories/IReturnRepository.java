package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.Return;
import java.util.List;
import java.time.LocalDateTime;


@Repository
public interface IReturnRepository extends JpaRepository<Return, UUID>{

    //Personalizando busquedas en la tabla RETURNS

    //Buscar por fecha de solicitud exacta
    List<Return> findByRequestDate(LocalDateTime requestDate);

    //Buscar por fecha de solicitud menor que
    List<Return> findByRequestDateLessThan(LocalDateTime requestDate);

    //Buscar por fecha de solicitud mayor que
    List<Return> findByRequestDateGreaterThan(LocalDateTime requestDate);

    //Buscar por fecha de solicitud entre a y b
    List<Return> findByRequestDateBetween(LocalDateTime minRequestDate, LocalDateTime maxRequestDate);
    
    //Buscar por motivo
    List<Return> findByReason(String reason);

    //Buscar por cantidad de productos devueltos
    List<Return> findByQuantity(Integer quantity);

    //Buscar por cantidad de productos devueltos menor a
    List<Return> findByQuantityLessThan(Integer quantity);

    //Buscar por cantidad de productos devueltos mayor a
    List<Return> findByQuantityGreaterThan(Integer quantity);

    //Buscar por cantidad de productos devueltos entre a y b
    List<Return> findByQuantityBetween(Integer minQuantity, Integer maxQuantity);

    //Buscar por estado de devolución
    List<Return> findByStatus(Boolean status);
}
