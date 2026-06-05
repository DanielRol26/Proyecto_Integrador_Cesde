package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.UserAddress;
import java.util.List;


@Repository
public interface IUserAddressRepository extends JpaRepository<UserAddress, UUID>{

    //Personalizando busquedas de la tabla USERADDRESSES

    //Busqueda por ciudad
    List<UserAddress> findByCity(String city);

    //Busqueda por barrio
    List<UserAddress> findByNeighborhood(String neighborhood);

    //Busqueda por estado de direccion
    List<UserAddress> findByStatus(Boolean status);
}
