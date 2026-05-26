package com.example.remainders.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.Size;
import com.example.remainders.repositories.ISizeRepository;

@Service
public class SizeService {

    //1. Inyectar la dependencia del repositorio en el servicio
    @Autowired
    private ISizeRepository sizeRepository;

    //2. Objetivo: Activar mediante funciones las consultas que quiero ofrecer en mi tabla

    // POST
    // Guardar un solo registro en la tabla
    public Size saveSize(Size dataSize) {
        Size savedSize = sizeRepository.save(dataSize);
        return savedSize;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<Size> listSize() {
        List<Size> sizesList = sizeRepository.findAll();
        return sizesList;
    }

    // GET
    // Buscar registro de la tabla por id
    public Size searchSizeById(UUID id) {
        Optional<Size> searchedSize = sizeRepository.findById(id);
        if (searchedSize.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La talla que buscas no existe en la BD");
        }
        return searchedSize.get();
    }

    // GET
    // Buscar registro por talla
    public List<Size> searchSizesBySize(String size){
        List<Size> sizesList = sizeRepository.findBySize(size);
        return sizesList;
    }

    // GET
    // Buscar registro por estado de talla
    public List<Size> searchSizesByStatus(Boolean status){
        List<Size> sizesList = sizeRepository.findByStatus(status);
        return sizesList;
    }

    // PUT
    // Actualizar un registro de la tabla
    public Size updateSize(UUID id, Size newDataSize) {
        Optional<Size> searchedSize = sizeRepository.findById(id);
        if (searchedSize.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La talla que buscas no existe en la BD");
        }
        // Actualización de los campos modificables de la talla
        // Talla y estado de la talla
        Size sizeFoundInDB = searchedSize.get();
        sizeFoundInDB.setSize(newDataSize.getSize());
        sizeFoundInDB.setStatus(newDataSize.getStatus());
        return sizeRepository.save(sizeFoundInDB);
    }

    // DELETE
    // Eliminar un registro de la tabla
    public Boolean deleteSize(UUID id){
        Optional<Size> searchedSize = sizeRepository.findById(id);
        if (searchedSize.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "La talla que buscas no existe en la BD");
        }
        sizeRepository.deleteById(id);
        return true;
    }
}
