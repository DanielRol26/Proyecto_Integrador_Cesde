package com.example.remainders.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.User;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Repository
public interface IUserRepository extends JpaRepository<User, UUID>{

    //Personalizando busquedas de la tabla USERS

    //Buscar por nombre
    List<User> findByName(String name);

    //Buscar por tipo de documento
    List<User> findByDocumentType(String documentType);

    //Buscar por numero de documento
    Optional<User> findByDocumentNumber(String documentNumber);

    //Buscar por genero
    List<User> findByGender(String gender);

    //Buscar por fecha de nacimiento exacta
    List<User> findByBirthDate(LocalDate birthDate);

    //Buscar por fecha de nacimiento menor que 
    List<User> findByBirthDateLessThan(LocalDate birthDate);

    //Buscar por fecha de nacimiento mayor que 
    List<User> findByBirthDateGreaterThan(LocalDate birthDate);

    //Buscar por fecha de nacimiento entre a y b
    List<User> findByBirthDateBetween(LocalDate minBirthDate, LocalDate maxBirthDate);

    //Buscar por correo
    Optional<User> findByEmail(String email);

    //Buscar por fecha de registro
    List<User> findByCreatedAt(LocalDateTime createdAt);

    //Buscar por estado del usuario
    List<User> findByStatus(Boolean status);

}
