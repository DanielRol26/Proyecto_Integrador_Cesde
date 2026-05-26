package com.example.remainders.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.User;
import com.example.remainders.repositories.IUserRepository;

@Service
public class UserService {

    // 1.Inyectar la dependencia del repositorio en el servicio
    @Autowired
    private IUserRepository userRepository;

    // 2.Objetivo: Activar mediante funciones las consultas que quiero ofrecer en mi
    // tabla

    // POST
    // Guardar un solo registro en la tabla
    public User saveUser(User dataUser) {
        User savedUser = userRepository.save(dataUser);
        return savedUser;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<User> listUsers() {
        List<User> usersList = userRepository.findAll();
        return usersList;
    }

    // GET
    // Buscar registro de la tabla por id
    public User searchUserById(UUID id) {
        Optional<User> searchedUser = userRepository.findById(id);
        if (searchedUser.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El usuario que buscas no existe en la BD");
        }
        return searchedUser.get();
    }

    // GET
    // Buscar registro por nombre
    public List<User> searchUsersByName(String name){
        List<User> usersList = userRepository.findByName(name);
        return usersList;
    }

    // GET
    // Buscar registro por tipo de documento
    public List<User> searchUsersByDocumentType(String documentType){
        List<User> usersList = userRepository.findByDocumentType(documentType);
        return usersList;
    }

    // GET 
    // Buscar registro por numero de documento
    public User searchUserByDocumentNumber(String documentNumber){
        Optional<User> searchedUser = userRepository.findByDocumentNumber(documentNumber);
        if (searchedUser.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "El usuario que buscas no existe en la BD");
        }
        return searchedUser.get();
    }

    //GET 
    // Buscar registro por genero
    public List<User> searchUsersByGender(String gender){
        List<User> usersList = userRepository.findByGender(gender);
        return usersList;
    }

    //GET
    // Buscar registro por fecha de nacimiento
    public List<User> searchUsersByBirthDate(LocalDate birthDate){
        List<User> usersList = userRepository.findByBirthDate(birthDate);
        return usersList;
    }

    //GET 
    // Buscar registro por fecha de nacimiento menor que
    public List<User> searchUsersByBirthDateLessThan(LocalDate birthDate){
        List<User> usersList = userRepository.findByBirthDateLessThan(birthDate);
        return usersList;
    }

    //GET 
    // Buscar registro por fecha de nacimiento mayor que
    public List<User> searchUsersByBirthDateGreaterThan(LocalDate birthDate){
        List<User> usersList = userRepository.findByBirthDateGreaterThan(birthDate);
        return usersList;
    }

    //GET 
    // Buscar registro por fecha de nacimiento entre
    public List<User> searchUsersByBirthDateBetween(LocalDate minBirthDate, LocalDate maxBirthDate){
        List<User> usersList = userRepository.findByBirthDateBetween(minBirthDate, maxBirthDate);
        return usersList;
    }

    // GET 
    // Buscar registro por email
    public User searchUserByEmail(String email){
        Optional<User> searchedUser = userRepository.findByEmail(email);
        if (searchedUser.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "El usuario que buscas no existe en la BD");
        }
        return searchedUser.get();
    }

    //GET 
    // Buscar registro por fecha de registro
    public List<User> searchUsersByCreatedAt(LocalDateTime createdAt){
        List<User> usersList = userRepository.findByCreatedAt(createdAt);
        return usersList;
    }

    //GET 
    // Buscar registro por estado de registro
    public List<User> searchUsersByStatus(Boolean status){
        List<User> usersList = userRepository.findByStatus(status);
        return usersList;
    }

    // PUT
    // Actualizar un registro de la tabla
    public User updateUser(UUID id, User newDataUser) {
        Optional<User> searchedUser = userRepository.findById(id);
        if (searchedUser.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El usuario que buscas no existe en la BD");
        }
        // Actualización de los campos modificables del usuario
        // Nombre, género, email, contraseña, avatar y estado de cuenta
        User userFoundInDB = searchedUser.get();
        userFoundInDB.setName(newDataUser.getName());
        userFoundInDB.setGender(newDataUser.getGender());
        userFoundInDB.setEmail(newDataUser.getEmail());
        userFoundInDB.setPassword(newDataUser.getPassword());
        userFoundInDB.setAvatar(newDataUser.getAvatar());
        userFoundInDB.setStatus(newDataUser.getStatus());
        return userRepository.save(userFoundInDB);
    }

    // DELETE
    // Eliminar un registro de la tabla
    public Boolean deleteUser(UUID id){
        Optional<User> searchedUser = userRepository.findById(id);
        if (searchedUser.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "El usuario que buscas no existe en la BD");
        }
        userRepository.deleteById(id);
        return true;
    }
}
