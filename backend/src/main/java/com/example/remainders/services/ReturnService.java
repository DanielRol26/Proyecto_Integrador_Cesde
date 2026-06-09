package com.example.remainders.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.Return;
import com.example.remainders.repositories.IReturnRepository;

@Service
public class ReturnService {

    //1. Inyectar la dependencia del repositorio en el servicio
    @Autowired
    private IReturnRepository returnRepository;

    //2. Objetivo: Activar mediante funciones las consultas que quiero ofrecer en mi tabla

    // POST
    // Guardar un solo registro en la tabla
    public Return saveReturn(Return dataReturn) {
        Return savedReturn = returnRepository.save(dataReturn);
        return savedReturn;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<Return> listReturns() {
        List<Return> returnsList = returnRepository.findAll();
        return returnsList;
    }

    // GET
    // Buscar registro de la tabla por id
    public Return searchReturnById(UUID id) {
        Optional<Return> searchedReturn = returnRepository.findById(id);
        if (searchedReturn.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La solicitud de devolución que buscas no existe en la BD");
        }
        return searchedReturn.get();
    }

    // GET
    // Buscar registro por fecha de solicitud exacta de devolución
    public List<Return> searchReturnsByRequestDate(LocalDateTime requestDate){
        List<Return> returnList = returnRepository.findByRequestDate(requestDate);
        return returnList;
    }

    // GET
    // Buscar registro por fecha de solictud menor que
    public List<Return> searchReturnsByRequestDateLessThan(LocalDateTime requestDate){
        List<Return> returnList = returnRepository.findByRequestDateLessThan(requestDate);
        return returnList;
    }

    // GET
    // Buscar registro por fecha de solictud mayor que
    public List<Return> searchReturnsByRequestDateGreaterThan(LocalDateTime requestDate){
        List<Return> returnList = returnRepository.findByRequestDateGreaterThan(requestDate);
        return returnList;
    }

    // GET
    // Buscar registro por fecha de solictud entre a y b
    public List<Return> searchReturnsByRequestDateBetween(LocalDateTime minRequestDate, LocalDateTime maxRequestDate){
        List<Return> returnList = returnRepository.findByRequestDateBetween(minRequestDate, maxRequestDate);
        return returnList;
    }

    // GET
    // Buscar registro por motivo
    public List<Return> searchReturnsByReason(String reason){
        List<Return> returnsList = returnRepository.findByReason(reason);
        return returnsList;
    }

    // GET
    // Buscar registro por cantidad exacta
    public List<Return> searchReturnsByQuantity(Integer quantity){
        List<Return> returnsList = returnRepository.findByQuantity(quantity);
        return returnsList;
    }

    // GET
    // Buscar registro por cantidad menor que
    public List<Return> searchReturnsByQuantityLessThan(Integer quantity){
        List<Return> returnsList = returnRepository.findByQuantityLessThan(quantity);
        return returnsList;
    }

    // GET
    // Buscar registro por cantidad mayor que
    public List<Return> searchReturnsByQuantityGreaterThan(Integer quantity){
        List<Return> returnsList = returnRepository.findByQuantityGreaterThan(quantity);
        return returnsList;
    }

    // GET
    // Buscar registro por cantidad entre a y b
    public List<Return> searchReturnsByQuantityBetween(Integer minQuantity, Integer maxQuantity){
        List<Return> returnsList = returnRepository.findByQuantityBetween(minQuantity, maxQuantity);
        return returnsList;
    }

    // GET
    // Buscar registro por estado de devolución
    public List<Return> searchReturnsByStatus(Boolean status){
        List<Return> returnsList = returnRepository.findByStatus(status);
        return returnsList;
    }

    // PUT
    // Actualizar un registro de la tabla
    public Return updateReturn(UUID id, Return newDataReturn) {
        Optional<Return> searchedReturn = returnRepository.findById(id);
        if (searchedReturn.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La solicitud de devolución que buscas no existe en la BD");
        }
        // Actualización de los campos modificables de la devolución
        // Fecha de solicitud, motivo, cantidad y estado
        Return returnFoundInDB = searchedReturn.get();
        returnFoundInDB.setReason(newDataReturn.getReason());
        returnFoundInDB.setQuantity(newDataReturn.getQuantity());
        returnFoundInDB.setStatus(newDataReturn.getStatus());
        return returnRepository.save(returnFoundInDB);
    }

    // DELETE
    // Eliminar un registro de la tabla
    public Boolean deleteReturn(UUID id){
        Optional<Return> searchedReturn = returnRepository.findById(id);
        if (searchedReturn.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "La solicitud de devolución que buscas no existe en la BD");
        }
        returnRepository.deleteById(id);
        return true;
    }
}
