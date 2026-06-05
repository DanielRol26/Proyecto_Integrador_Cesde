package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.Order;
import java.util.List;
import java.time.LocalDateTime;

@Repository
public interface IOrderRepository extends JpaRepository<Order, UUID>{

    //Personalizando busqueda de la tabla ORDERS

    //Buscar por fecha de pedido exacta
    List<Order> findByOrderDate(LocalDateTime orderDate);

    //Buscar por fecha de pedido menor que
    List<Order> findByOrderDateLessThan(LocalDateTime orderDate);

    //Buscar por fecha de pedido mayor que
    List<Order> findByOrderDateGreaterThan(LocalDateTime orderDate);

    //Buscar por fecha de pedido entre a y b
    List<Order> findByOrderDateBetween(LocalDateTime minOrderDate, LocalDateTime maxOrderDate);

    //Buscar por subtotal del pedido exacto
    List<Order> findBySubtotal(Double subtotal);

    //Buscar por subtotal del pedido menor que
    List<Order> findBySubtotalLessThan(Double subtotal);

    //Buscar por subtotal del pedido mayor que
    List<Order> findBySubtotalGreaterThan(Double subtotal);

    //Buscar por subtotal del pedido entre a y b
    List<Order> findBySubtotalBetween(Double minSubtotal, Double maxSubtotal);

    //Buscar por valor de descuento del pedido exacto
    List<Order> findByDiscount(Double discount);

    //Buscar por valor de descuento del pedido menor que
    List<Order> findByDiscountLessThan(Double discount);

    //Buscar por valor de descuento del pedido mayor que
    List<Order> findByDiscountGreaterThan(Double discount);

    //Buscar por valor de descuento del pedido entre
    List<Order> findByDiscountBetween(Double minDiscount, Double maxDiscount);

    //Buscar por total exacto del pedido
    List<Order> findByTotal(Double total);

    //Buscar por total del pedido menor que 
    List<Order> findByTotalLessThan(Double total);

    //Buscar por total del pedido mayor que
    List<Order> findByTotalGreaterThan(Double total);

    //Buscar por total del pedido entre
    List<Order> findByTotalBetween(Double minTotal, Double maxTotal);

    //Buscar por estado del pedido
    List<Order> findByStatus(Boolean status);
}
