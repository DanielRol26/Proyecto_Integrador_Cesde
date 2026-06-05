package com.example.remainders.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.OrderDetail;
import com.example.remainders.repositories.IOrderDetailRepository;

@Service
public class OrderDetailService {

    //1. Inyectar la dependencia del repositorio en el servicio
    @Autowired
    private IOrderDetailRepository orderDetailRepository;

    //2. Objetivo: Activar mendiante funciones las consultas que quiero ofrecer en mi tabla

    // POST
    // Guardar un solo registro en la tabla
    public OrderDetail saveOrderDetail(OrderDetail dataOrderDetail) {
        OrderDetail savedOrderDetail = orderDetailRepository.save(dataOrderDetail);
        return savedOrderDetail;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<OrderDetail> listOrderDetails() {
        List<OrderDetail> orderDetailsList = orderDetailRepository.findAll();
        return orderDetailsList;
    }

    // GET
    // Buscar registro de la tabla por id
    public OrderDetail searchOrderDetailById(UUID id) {
        Optional<OrderDetail> searchedOrderDetail = orderDetailRepository.findById(id);
        if (searchedOrderDetail.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El detalle de pedido que buscas no existe en la BD");
        }
        return searchedOrderDetail.get();
    }

    // GET
    // Buscar registros por cantidad exacta del producto
    public List<OrderDetail> searchOrderDetailsByQuantity(Integer quantity) {
        List<OrderDetail> orderDetailsList = orderDetailRepository.findByQuantity(quantity);
        return orderDetailsList;
    }

    // GET
    // Buscar registros por cantidad del producto menor que
    public List<OrderDetail> searchOrderDetailsByQuantityLessThan(Integer quantity) {
        List<OrderDetail> orderDetailsList = orderDetailRepository.findByQuantityLessThan(quantity);
        return orderDetailsList;
    }

    // GET
    // Buscar registros por cantidad del producto mayor que
    public List<OrderDetail> searchOrderDetailsByQuantityGreaterThan(Integer quantity) {
        List<OrderDetail> orderDetailsList = orderDetailRepository.findByQuantityGreaterThan(quantity);
        return orderDetailsList;
    }

    // GET
    // Buscar registros por cantidad del producto entre a y b
    public List<OrderDetail> searchOrderDetailsByQuantityBetween(Integer minQuantity, Integer maxQuantity) {
        List<OrderDetail> orderDetailsList = orderDetailRepository.findByQuantityBetween(minQuantity, maxQuantity);
        return orderDetailsList;
    }

    // GET
    // Buscar registros por precio exacto del producto
    public List<OrderDetail> searchOrderDetailsByUnitPrice(Double unitPrice) {
        List<OrderDetail> orderDetailsList = orderDetailRepository.findByUnitPrice(unitPrice);
        return orderDetailsList;
    }

    // GET
    // Buscar registros por precio del producto menor que
    public List<OrderDetail> searchOrderDetailsByUnitPriceLessThan(Double unitPrice) {
        List<OrderDetail> orderDetailsList = orderDetailRepository.findByUnitPriceLessThan(unitPrice);
        return orderDetailsList;
    }

    // GET
    // Buscar registros por precio del producto mayor que
    public List<OrderDetail> searchOrderDetailsByUnitPriceGreaterThan(Double unitPrice) {
        List<OrderDetail> orderDetailsList = orderDetailRepository.findByUnitPriceGreaterThan(unitPrice);
        return orderDetailsList;
    }

    // GET
    // Buscar registros por precio del producto entre a y b
    public List<OrderDetail> searchOrderDetailsByUnitPriceBetween(Double minUnitPrice, Double maxUnitPrice) {
        List<OrderDetail> orderDetailsList = orderDetailRepository.findByUnitPriceBetween(minUnitPrice, maxUnitPrice);
        return orderDetailsList;
    }

    // GET
    // Buscar registros por subtotal del pedido exacto
    public List<OrderDetail> searchOrderDetailsBySubtotal(Double subtotal) {
        List<OrderDetail> orderDetailsList = orderDetailRepository.findBySubtotal(subtotal);
        return orderDetailsList;
    }

    // GET
    // Buscar registros por subtotal del pedido menor que
    public List<OrderDetail> searchOrderDetailsBySubtotalLessThan(Double subtotal) {
        List<OrderDetail> orderDetailsList = orderDetailRepository.findBySubtotalLessThan(subtotal);
        return orderDetailsList;
    }

    // GET
    // Buscar registros por subtotal del pedido mayor que
    public List<OrderDetail> searchOrderDetailsBySubtotalGreaterThan(Double subtotal) {
        List<OrderDetail> orderDetailsList = orderDetailRepository.findBySubtotalGreaterThan(subtotal);
        return orderDetailsList;
    }

    // GET
    // Buscar registros por subtotal del pedido entre a y b
    public List<OrderDetail> searchOrderDetailsBySubtotalBetween(Double minSubtotal, Double maxSubtotal) {
        List<OrderDetail> orderDetailsList = orderDetailRepository.findBySubtotalBetween(minSubtotal, maxSubtotal);
        return orderDetailsList;
    }

    // PUT
    // Actualizar un registro de la tabla por id
    public OrderDetail updateOrderDetail(UUID id, OrderDetail newDataOrderDetail) {
        Optional<OrderDetail> searchedOrderDetail = orderDetailRepository.findById(id);
        if (searchedOrderDetail.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El detalle de pedido que buscas no existe en la BD");
        }
        OrderDetail orderDetailFoundInDB = searchedOrderDetail.get();
        orderDetailFoundInDB.setQuantity(newDataOrderDetail.getQuantity());
        orderDetailFoundInDB.setUnitPrice(newDataOrderDetail.getUnitPrice());
        orderDetailFoundInDB.setSubtotal(newDataOrderDetail.getSubtotal());
        return orderDetailRepository.save(orderDetailFoundInDB);
    }

    // DELETE
    // Eliminar un registro de la tabla por id
    public Boolean deleteOrderDetail(UUID id) {
        Optional<OrderDetail> searchedOrderDetail = orderDetailRepository.findById(id);
        if (searchedOrderDetail.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El detalle de pedido que buscas no existe en la BD");
        }
        orderDetailRepository.deleteById(id);
        return true;
    }
}
