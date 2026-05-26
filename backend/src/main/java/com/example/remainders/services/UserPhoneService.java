package com.example.remainders.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.UserPhone;
import com.example.remainders.repositories.IUserPhoneRepository;

@Service
public class UserPhoneService {

    //1. Inyectar la dependencia del repositorio en el servicio
    @Autowired
    private IUserPhoneRepository userPhoneRepository;

    //2. Objetivo: Activar mediante funciones las consultas que quiero ofrecer en mi tabla

    //POST
    //Guardar un solo registro en la tabla
    public UserPhone saveUserPhone(UserPhone dataUserPhone){
        UserPhone savedUserPhone = userPhoneRepository.save(dataUserPhone);
        return savedUserPhone;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<UserPhone> listUsers() {
        List<UserPhone> usersList = userPhoneRepository.findAll();
        return usersList;
    }

    // GET
    // Buscar registro de la tabla por id
    public UserPhone searchUserPhoneById(UUID id) {
        Optional<UserPhone> searchedPhone = userPhoneRepository.findById(id);
        if (searchedPhone.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El número telefónico que buscas no existe en la BD");
        }
        return searchedPhone.get();
    }

    // GET
    // Buscar registro por número telefónico
    public List<UserPhone> searchUserPhonesByPhoneNumber(String phoneNumber){
        List<UserPhone> userPhonesList = userPhoneRepository.findByPhoneNumber(phoneNumber);
        return userPhonesList;
    }

    // GET
    // Buscar registro por tipo de teléfono
    public List<UserPhone> searchUserPhonesByPhoneType(String phoneType){
        List<UserPhone> userPhonesList = userPhoneRepository.findByPhoneType(phoneType);
        return userPhonesList;
    }

    // GET
    // Buscar registro por estado del número telefóno
    public List<UserPhone> searchUserPhonesByStatus(Boolean status){
        List<UserPhone> userPhonesList = userPhoneRepository.findByStatus(status);
        return userPhonesList;
    }

    // PUT
    // Actualizar un registro de la tabla
    public UserPhone updateUser(UUID id, UserPhone newDataUserPhone) {
        Optional<UserPhone> searchedUserPhone = userPhoneRepository.findById(id);
        if (searchedUserPhone.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El número telefónico que buscas no existe en la BD");
        }
        // Actualización de los campos modificables del telefono de usuario
        // Número telefónico, tipo de teléfono y estado del número telefónico
        UserPhone userPhoneFoundInDB = searchedUserPhone.get();
        userPhoneFoundInDB.setPhoneNumber(newDataUserPhone.getPhoneNumber());
        userPhoneFoundInDB.setPhoneType(newDataUserPhone.getPhoneType());
        userPhoneFoundInDB.setStatus(newDataUserPhone.getStatus());
        return userPhoneRepository.save(userPhoneFoundInDB);
    }

    // DELETE
    // Eliminar un registro de la tabla
    public Boolean deleteUserPhone(UUID id){
        Optional<UserPhone> searchedUserPhone = userPhoneRepository.findById(id);
        if (searchedUserPhone.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "El número telefónico que buscas no existe en la BD");
        }
        userPhoneRepository.deleteById(id);
        return true;
    }

}
