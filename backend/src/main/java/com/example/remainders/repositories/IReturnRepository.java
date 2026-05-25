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
}
