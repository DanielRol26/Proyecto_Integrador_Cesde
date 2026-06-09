package com.example.remainders.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.UserAddress;
import com.example.remainders.repositories.IUserAddressRepository;

@Service
public class UserAddressService {

    // 1. Inyectar la dependencia del repositorio en el servicio
    @Autowired
    private IUserAddressRepository userAddressRepository;

    // 2. Objetivo: Activar mediante funciones las consulta que quiero ofrecer en mi
    // tabla

    // POST
    // Guardar un solo registro en la tabla
    public UserAddress saveUserAddress(UserAddress dataUserAddress) {
        UserAddress savedUserAddress = userAddressRepository.save(dataUserAddress);
        return savedUserAddress;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<UserAddress> listUserAddressess() {
        List<UserAddress> userAddressesList = userAddressRepository.findAll();
        return userAddressesList;
    }

    // GET
    // Buscar registro de la tabla por id
    public UserAddress searchUserAddressById(UUID id) {
        Optional<UserAddress> searchedUserAddress = userAddressRepository.findById(id);
        if (searchedUserAddress.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La dirección que buscas no existe en la BD");
        }
        return searchedUserAddress.get();
    }

    // GET
    // Buscar registro por ciudad
    public List<UserAddress> searchUserAddressesByCity(String city){
        List<UserAddress> userAddressesList = userAddressRepository.findByCity(city);
        return userAddressesList;
    }

    // GET
    // Buscar registro por barrio
    public List<UserAddress> searchUserAddressesByNeighborhood(String neighborhood){
        List<UserAddress> userAddressesList = userAddressRepository.findByNeighborhood(neighborhood);
        return userAddressesList;
    }

    // GET
    // Buscar registro por estado de dirección
    public List<UserAddress> searchUserAddressesByStatus(Boolean status){
        List<UserAddress> userAddressesList = userAddressRepository.findByStatus(status);
        return userAddressesList;
    }

    // PUT
    // Actualizar un registro de la tabla
    public UserAddress updateUserAddress(UUID id, UserAddress newDataUserAddress) {
        Optional<UserAddress> searchedUserAddress = userAddressRepository.findById(id);
        if (searchedUserAddress.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La dirección que buscas no existe en la BD");
        }
        // Actualización de los campos modificables de la dirección del usuario
        // Dirección, Ciudad, barrio y estado de la dirección
        UserAddress userAddressFoundInDB = searchedUserAddress.get();
        userAddressFoundInDB.setAddressLine(newDataUserAddress.getAddressLine());
        userAddressFoundInDB.setCity(newDataUserAddress.getCity());
        userAddressFoundInDB.setNeighborhood(newDataUserAddress.getNeighborhood());
        return userAddressRepository.save(userAddressFoundInDB);
    }

    // DELETE
    // Eliminar un registro de la tabla
    public Boolean deleteUserAddress(UUID id) {
        Optional<UserAddress> searchedUserAddress = userAddressRepository.findById(id);
        if (searchedUserAddress.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La dirección que buscas no existe en la BD");
        }
        userAddressRepository.deleteById(id);
        return true;
    }
}
