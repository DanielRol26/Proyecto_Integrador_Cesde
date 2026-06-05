package com.example.remainders.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.Order;
import com.example.remainders.repositories.IOrderRepository;

@Service
public class OrderService {

    //1. Inyectar la dependencia del repositorio en el servicio
    @Autowired
    private IOrderRepository orderRepository;

    //2. Objetivo: Activar mendiante funciones las consultas que quiero ofrecer en mi tabla

    // POST
    // Guardar un solo registro en la tabla
    public Order saveOrder(Order dataOrder) {
        Order savedOrder = orderRepository.save(dataOrder);
        return savedOrder;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<Order> listOrders() {
        List<Order> ordersList = orderRepository.findAll();
        return ordersList;
    }

    // GET
    // Buscar registro de la tabla por id
    public Order searchOrderById(UUID id) {
        Optional<Order> searchedOrder = orderRepository.findById(id);
        if (searchedOrder.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El pedido que buscas no existe en la BD");
        }
        return searchedOrder.get();
    }

    // GET
    // Buscar registros por fecha de pedido exacta
    public List<Order> searchOrdersByOrderDate(LocalDateTime orderDate) {
        List<Order> ordersList = orderRepository.findByOrderDate(orderDate);
        return ordersList;
    }

    // GET
    // Buscar registros por fecha de pedido menor que
    public List<Order> searchOrdersByOrderDateLessThan(LocalDateTime orderDate) {
        List<Order> ordersList = orderRepository.findByOrderDateLessThan(orderDate);
        return ordersList;
    }

    // GET
    // Buscar registros por fecha de pedido mayor que
    public List<Order> searchOrdersByOrderDateGreaterThan(LocalDateTime orderDate) {
        List<Order> ordersList = orderRepository.findByOrderDateGreaterThan(orderDate);
        return ordersList;
    }

    // GET
    // Buscar registros por fecha de pedido entre a y b
    public List<Order> searchOrdersByOrderDateBetween(LocalDateTime minOrderDate, LocalDateTime maxOrderDate) {
        List<Order> ordersList = orderRepository.findByOrderDateBetween(minOrderDate, maxOrderDate);
        return ordersList;
    }

    // GET
    // Buscar registros por subtotal del pedido exacto
    public List<Order> searchOrdersBySubtotal(Double subtotal) {
        List<Order> ordersList = orderRepository.findBySubtotal(subtotal);
        return ordersList;
    }

    // GET
    // Buscar registros por subtotal del pedido menor que
    public List<Order> searchOrdersBySubtotalLessThan(Double subtotal) {
        List<Order> ordersList = orderRepository.findBySubtotalLessThan(subtotal);
        return ordersList;
    }

    // GET
    // Buscar registros por subtotal del pedido mayor que
    public List<Order> searchOrdersBySubtotalGreaterThan(Double subtotal) {
        List<Order> ordersList = orderRepository.findBySubtotalGreaterThan(subtotal);
        return ordersList;
    }

    // GET
    // Buscar registros por subtotal del pedido entre a y b
    public List<Order> searchOrdersBySubtotalBetween(Double minSubtotal, Double maxSubtotal) {
        List<Order> ordersList = orderRepository.findBySubtotalBetween(minSubtotal, maxSubtotal);
        return ordersList;
    }

    // GET
    // Buscar registros por valor de descuento del pedido exacto
    public List<Order> searchOrdersByDiscount(Double discount) {
        List<Order> ordersList = orderRepository.findByDiscount(discount);
        return ordersList;
    }

    // GET
    // Buscar registros por valor de descuento del pedido menor que
    public List<Order> searchOrdersByDiscountLessThan(Double discount) {
        List<Order> ordersList = orderRepository.findByDiscountLessThan(discount);
        return ordersList;
    }

    // GET
    // Buscar registros por valor de descuento del pedido mayor que 
    public List<Order> searchOrdersByDiscountGreaterThan(Double discount) {
        List<Order> ordersList = orderRepository.findByDiscountGreaterThan(discount);
        return ordersList;
    }

    // GET
    // Buscar registros por valor de descuento del pedido entre a y b
    public List<Order> searchOrdersByDiscountBetween(Double minDiscount, Double maxDiscount) {
        List<Order> ordersList = orderRepository.findByDiscountBetween(minDiscount, maxDiscount);
        return ordersList;
    }
    
    // GET
    // Buscar registros por total exacto del pedido
    public List<Order> searchOrdersByTotal(Double total) {
        List<Order> ordersList = orderRepository.findByTotal(total);
        return ordersList;
    }

    // GET
    // Buscar registros por total del pedido menor que
    public List<Order> searchOrdersByTotalLessThan(Double total) {
        List<Order> ordersList = orderRepository.findByTotalLessThan(total);
        return ordersList;
    }

    // GET
    // Buscar registros por total del pedido mayor que
    public List<Order> searchOrdersByTotalGreaterThan(Double total) {
        List<Order> ordersList = orderRepository.findByTotalGreaterThan(total);
        return ordersList;
    }

    // GET
    // Buscar registros por total del pedido entre a y b
    public List<Order> searchOrdersByTotalBetween(Double minTotal, Double maxTotal) {
        List<Order> ordersList = orderRepository.findByTotalBetween(minTotal, maxTotal);
        return ordersList;
    }

    // GET
    // Buscar registros por estado del pedido
    public List<Order> searchOrdersByStatus(Boolean status) {
        List<Order> ordersList = orderRepository.findByStatus(status);
        return ordersList;
    }
    
    // PUT
    // Actualizar un registro por id
    public Order updateOrder(UUID id, Order newDataOrder) {
        Optional<Order> searchedOrder = orderRepository.findById(id);
        if (searchedOrder.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El pedido que buscas no existe en la BD");
        }
        Order orderFoundInDB = searchedOrder.get();
        orderFoundInDB.setSubtotal(newDataOrder.getSubtotal());
        orderFoundInDB.setDiscount(newDataOrder.getDiscount());
        orderFoundInDB.setTotal(newDataOrder.getTotal());
        orderFoundInDB.setStatus(newDataOrder.getStatus());
        return orderRepository.save(orderFoundInDB);
    }

    // DELETE
    // Eliminar un registro por id
    public Boolean deleteOrder(UUID id) {
        Optional<Order> searchedOrder = orderRepository.findById(id);
        if (searchedOrder.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El pedido que buscas no existe en la BD");
        }
        orderRepository.deleteById(id);
        return true;
    }
}
