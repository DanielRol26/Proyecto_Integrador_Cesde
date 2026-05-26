package com.example.remainders.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.Cart;
import com.example.remainders.repositories.ICartRepository;

@Service
public class CartService {

    //1. Inyectar la dependencia del repositorio en le servicio
    @Autowired
    private ICartRepository cartRepository;

    //2. Objetivo: Activar mediante funciones las consultas que quiero ofrecer en mi tabla

    // POST
    // Guardar un solo registro en la tabla
    public Cart saveCart(Cart dataCart) {
        Cart savedCart = cartRepository.save(dataCart);
        return savedCart;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<Cart> listCarts() {
        List<Cart> cartsList = cartRepository.findAll();
        return cartsList;
    }

    // GET
    // Buscar registro de la tabla por id
    public Cart searchCartById(UUID id) {
        Optional<Cart> searchedCart = cartRepository.findById(id);
        if (searchedCart.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El carrito que buscas no existe en la BD");
        }
        return searchedCart.get();
    }

    // GET
    // Buscar registros por fecha de creación exacta
    public List<Cart> searchCartsByCreatedAt(LocalDateTime createdAt) {
        List<Cart> cartsList = cartRepository.findByCreatedAt(createdAt);
        return cartsList;
    }

    // GET
    // Buscar registros por fecha de creación menor que
    public List<Cart> searchCartsByCreatedAtLessThan(LocalDateTime createdAt) {
        List<Cart> cartsList = cartRepository.findByCreatedAtLessThan(createdAt);
        return cartsList;
    }

    // GET
    // Buscar registros por fecha de creación mayor que
    public List<Cart> searchCartsByCreatedAtGreaterThan(LocalDateTime createdAt) {
        List<Cart> cartsList = cartRepository.findByCreatedAtGreaterThan(createdAt);
        return cartsList;
    }

    // GET
    // Buscar registros por fecha de creación entre a y b
    public List<Cart> searchCartsByCreatedAtBetween(LocalDateTime minCreatedAt, LocalDateTime maxCreatedAt) {
        List<Cart> cartsList = cartRepository.findByCreatedAtBetween(minCreatedAt, maxCreatedAt);
        return cartsList;
    }

    // GET
    // Buscar registros por estado del carrito
    public List<Cart> searchCartsByStatus(Boolean status) {
        List<Cart> cartsList = cartRepository.findByStatus(status);
        return cartsList;
    }

    // PUT
    // Actualizar un registro de la tabla por id
    public Cart updateCartById(UUID id, Cart dataCart) {
        Optional<Cart> searchedCart = cartRepository.findById(id);
        if (searchedCart.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El carrito que buscas no existe en la BD");
        }
        Cart cartToUpdate = searchedCart.get();
        cartToUpdate.setStatus(dataCart.getStatus());
        return cartRepository.save(cartToUpdate);
    }

    // DELETE
    // Eliminar un registro de la tabla por id
    public Boolean deleteCartById(UUID id) {
        Optional<Cart> searchedCart = cartRepository.findById(id);
        if (searchedCart.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El carrito que buscas no existe en la BD");
        }
        cartRepository.deleteById(id);
        return true;
    }
}
