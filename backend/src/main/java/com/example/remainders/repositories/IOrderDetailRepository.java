package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.OrderDetail;
import java.util.List;


@Repository
public interface IOrderDetailRepository extends JpaRepository<OrderDetail, UUID>{

    //Personalizando busqueda de la tabla ORDERDETAILS

    //Buscar por cantidad de producto exactos
    List<OrderDetail> findByQuantity(Integer quantity);

    //Buscar por cantidad de producto menor que
    List<OrderDetail> findByQuantityLessThan(Integer quantity);

    //Buscar por cantidad de producto mayor que
    List<OrderDetail> findByQuantityGreaterThan(Integer quantity);

    //Buscar por cantidad de producto entre a y b
    List<OrderDetail> findByQuantityBetween(Integer minQuantity, Integer maxQuantity);

    //Buscar por precio unitario exacto
    List<OrderDetail> findByUnitPrice(Double unitPrice);

    //Buscar por precio unitario menor que
    List<OrderDetail> findByUnitPriceLessThan(Double unitPrice);

    //Buscar por precio unitario mayor que
    List<OrderDetail> findByUnitPriceGreaterThan(Double unitPrice);

    //Buscar por precio unitario entre a y b
    List<OrderDetail> findByUnitPriceBetween(Double minUnitPrice, Double maxUnitPrice);

    //Buscar por subtoal del pedido exacto
    List<OrderDetail> findBySubtotal(Double subtotal);

    //Buscar por subtotal del pedido menor que 
    List<OrderDetail> findBySubtotalLessThan(Double subtotal);

    //Buscar por subtotal del pedido mayor que
    List<OrderDetail> findBySubtotalGreaterThan(Double subtotal);

    //Buscar por subtotal del pedido entre a y b
    List<OrderDetail> findBySubtotalBetween(Double minSubtotal, Double maxSubtotal);
}
