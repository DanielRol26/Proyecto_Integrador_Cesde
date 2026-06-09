package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.UserPhone;
import java.util.List;


@Repository
public interface IUserPhoneRepository extends JpaRepository<UserPhone, UUID>{

    //Personalizando busquedas de la tabla USERPHONES

    //Buscar por número telefónico
    List<UserPhone> findByPhoneNumber(String phoneNumber);

    //Buscar por tipo de número telefónico
    List<UserPhone> findByPhoneType(String phoneType);

    //Buscar por estado de número telefónico
    List<UserPhone> findByStatus(Boolean status);
}
