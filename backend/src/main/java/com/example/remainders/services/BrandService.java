package com.example.remainders.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.Brand;
import com.example.remainders.repositories.IBrandRepository;

@Service
public class BrandService {

    //1. Inyectar la dependencia del repositorio en le servico
    @Autowired
    private IBrandRepository brandRepository;

    //2. Objetivo: Activar mediante funciones las consultas que quiero ofrecer en mi tabla

    // POST
    // Guardar un solo registro en la tabla
    public Brand saveBrand(Brand dataBrand) {
        Brand savedBrand = brandRepository.save(dataBrand);
        return savedBrand;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<Brand> listBrands() {
        List<Brand> brandsList = brandRepository.findAll();
        return brandsList;
    }

    // GET
    // Buscar registro de la tabla por id
    public Brand searchBrandById(UUID id) {
        Optional<Brand> searchedBrand = brandRepository.findById(id);
        if (searchedBrand.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La marca que buscas no existe en la BD");
        }
        return searchedBrand.get();
    }

    // GET
    // Buscar registros por nombre exacto
    public List<Brand> searchBrandsByName(String name) {
        List<Brand> brandsList = brandRepository.findByName(name);
        return brandsList;
    }

    // GET
    // Buscar registros por estado de marca
    public List<Brand> searchBrandsByStatus(Boolean status) {
        List<Brand> brandsList = brandRepository.findByStatus(status);
        return brandsList;
    }

    // PUT
    // Actualizar el estado de una marca por id
    public Brand updateBrandStatusById(UUID id, Boolean status) {
        Optional<Brand> searchedBrand = brandRepository.findById(id);
        if (searchedBrand.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La marca que buscas no existe en la BD");
        }
        Brand brandFoundInDB = searchedBrand.get();
        brandFoundInDB.setName(brandFoundInDB.getName());
        brandFoundInDB.setDescription(brandFoundInDB.getDescription());
        brandFoundInDB.setStatus(status);
        return brandRepository.save(brandFoundInDB);
    }

    // DELETE
    // Eliminar un registro de la tabla por id
    public Boolean deleteBrandById(UUID id) {
        Optional<Brand> searchedBrand = brandRepository.findById(id);
        if (searchedBrand.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La marca que buscas no existe en la BD");
        }
        brandRepository.deleteById(id);
        return true;
    }

}
