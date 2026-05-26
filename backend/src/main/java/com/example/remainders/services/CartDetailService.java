package com.example.remainders.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.CartDetail;
import com.example.remainders.repositories.ICartDetailRepository;

@Service
public class CartDetailService {

    //1. Inyectar la dependencia del repositorio en el servicio
    @Autowired
    private ICartDetailRepository cartDetailRepository;

    //2. Objetivo: Activar mendiante funciones las consultas que quiero ofrecer en mi tabla

    // POST
    // Guardar un solo registro en la tabla
    public CartDetail saveCartDetail(CartDetail dataCartDetail) {
        CartDetail savedCartDetail = cartDetailRepository.save(dataCartDetail);
        return savedCartDetail;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<CartDetail> listCartDetails() {
        List<CartDetail> cartDetailsList = cartDetailRepository.findAll();
        return cartDetailsList;
    }

    // GET
    // Buscar registro de la tabla por id
    public CartDetail searchCartDetailById(UUID id) {
        Optional<CartDetail> searchedCartDetail = cartDetailRepository.findById(id);
        if (searchedCartDetail.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El detalle de carrito que buscas no existe en la BD");
        }
        return searchedCartDetail.get();
    }

    // GET
    // Buscar registros por cantidad exacta del producto
    public List<CartDetail> searchCartDetailsByQuantity(Integer quantity) {
        List<CartDetail> cartDetailsList = cartDetailRepository.findByQuantity(quantity);
        return cartDetailsList;
    }

    // GET
    // Buscar registros por cantidad del producto menor que
    public List<CartDetail> searchCartDetailsByQuantityLessThan(Integer quantity) {
        List<CartDetail> cartDetailsList = cartDetailRepository.findByQuantityLessThan(quantity);
        return cartDetailsList;
    }

    // GET
    // Buscar registros por cantidad del producto mayor que
    public List<CartDetail> searchCartDetailsByQuantityGreaterThan(Integer quantity) {
        List<CartDetail> cartDetailsList = cartDetailRepository.findByQuantityGreaterThan(quantity);
        return cartDetailsList;
    }

    // GET
    // Buscar registros por cantidad del producto entre a y b   
    public List<CartDetail> searchCartDetailsByQuantityBetween(Integer minQuantity, Integer maxQuantity) {
        List<CartDetail> cartDetailsList = cartDetailRepository.findByQuantityBetween(minQuantity, maxQuantity);
        return cartDetailsList;
    }

    // PUT
    // Actualizar un registro de la tabla por id
    public CartDetail updateCartDetailById(UUID id, CartDetail newCartDetailData) {
        Optional<CartDetail> searchedCartDetail = cartDetailRepository.findById(id);
        if (searchedCartDetail.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El detalle de carrito que buscas no existe en la BD");
        }
        CartDetail cartFoundInDB = searchedCartDetail.get();
        cartFoundInDB.setQuantity(newCartDetailData.getQuantity());
        return cartDetailRepository.save(cartFoundInDB);
    }

    // DELETE
    // Eliminar un registro de la tabla por id
    public Boolean deleteCartDetailById(UUID id) {
        Optional<CartDetail> searchedCartDetail = cartDetailRepository.findById(id);
        if (searchedCartDetail.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El detalle de carrito que buscas no existe en la BD");
        }
        cartDetailRepository.deleteById(id);
        return true;
    }
}
