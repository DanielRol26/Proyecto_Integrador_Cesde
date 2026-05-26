package com.example.remainders.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.Color;
import com.example.remainders.repositories.IColorRepository;

@Service
public class ColorService {

    //1. Inyectar la dependencia del repositorio en el servicio
    @Autowired
    private IColorRepository colorRepository;

    //2. Objetivo: Activar mediante funciones las consultas que quiero ofrecer en mi tabla

    // POST
    // Guardar un solo registro en la tabla
    public Color saveColor(Color dataColor) {
        Color savedColor = colorRepository.save(dataColor);
        return savedColor;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<Color> listColors() {
        List<Color> colorsList = colorRepository.findAll();
        return colorsList;
    }

    // GET
    // Buscar registro de la tabla por id
    public Color searchColorById(UUID id) {
        Optional<Color> searchedColor = colorRepository.findById(id);
        if (searchedColor.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El color que buscas no existe en la BD");
        }
        return searchedColor.get();
    }

    // GET
    // Buscar registros por color del producto
    public List<Color> searchColorsByColor(String color) {
        List<Color> colorsList = colorRepository.findByColor(color);
        return colorsList;
    }

    // GET
    // Buscar registros por estado del color del producto
    public List<Color> searchColorsByStatus(Boolean status) {
        List<Color> colorsList = colorRepository.findByStatus(status);
        return colorsList;
    }

    // PUT
    // Actualizar un registro de la tabla por id
    public Color updateColorById(UUID id, Color dataColor) {
        Optional<Color> searchedColor = colorRepository.findById(id);
        if (searchedColor.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El color que buscas no existe en la BD");
        }
        Color colorFoundInDB = searchedColor.get();
        colorFoundInDB.setColor(dataColor.getColor());
        colorFoundInDB.setStatus(dataColor.getStatus());
        return colorRepository.save(colorFoundInDB);
    }

    // DELETE
    // Eliminar un registro de la tabla por id
    public Boolean deleteColorById(UUID id) {
        Optional<Color> searchedColor = colorRepository.findById(id);
        if (searchedColor.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El color que buscas no existe en la BD");
        }
        colorRepository.deleteById(id);
        return true;
    }

}
