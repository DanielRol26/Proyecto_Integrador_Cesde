package com.example.remainders.services;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.Category;
import com.example.remainders.repositories.ICategoryRepository;

@Service
public class CategoryService {

    //1. Inyectar la dependencia del repositorio en el servicio
    @Autowired
    private ICategoryRepository categoryRepository;

    //2. Objetivo: Activar mediante funciones las consultas que quiero ofrecer en mi tabla

    // POST
    // Guardar un solo registro en la tabla
    public Category saveCategory(Category dataCategory) {
        Category savedCategory = categoryRepository.save(dataCategory);
        return savedCategory;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<Category> listCategories() {
        List<Category> categoriesList = categoryRepository.findAll();
        return categoriesList;
    }

    // GET
    // Buscar registro de la tabla por id
    public Category searchCategoryById(UUID id) {
        Optional<Category> searchedCategory = categoryRepository.findById(id);
        if (searchedCategory.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La categoría que buscas no existe en la BD");
        }
        return searchedCategory.get();
    }

    // GET
    // Buscar registros por nombre de la categoría
    public List<Category> searchCategoriesByName(String name) {
        List<Category> categoriesList = categoryRepository.findByName(name);
        return categoriesList;
    }

    // GET
    // Buscar registros por estado de la categoría
    public List<Category> searchCategoriesByStatus(Boolean status) {
        List<Category> categoriesList = categoryRepository.findByStatus(status);
        return categoriesList;
    }

    // PUT
    // Actualizar un registro de la tabla por id
    public Category updateCategoryById(UUID id, Category dataCategory) {
        Optional<Category> searchedCategory = categoryRepository.findById(id);
        if (searchedCategory.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La categoría que buscas no existe en la BD");
        }
        Category categoryFoundInDB = searchedCategory.get();
        categoryFoundInDB.setName(dataCategory.getName());
        categoryFoundInDB.setStatus(dataCategory.getStatus());
        return categoryRepository.save(categoryFoundInDB);
    }   

    // DELETE
    // Eliminar un registro de la tabla por id
    public Boolean deleteCategoryById(UUID id) {
        Optional<Category> searchedCategory = categoryRepository.findById(id);
        if (searchedCategory.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La categoría que buscas no existe en la BD");
        }
        categoryRepository.deleteById(id);
        return true;
    }
}
