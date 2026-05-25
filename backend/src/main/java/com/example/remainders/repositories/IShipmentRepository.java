package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.Shipment;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Repository
public interface IShipmentRepository extends JpaRepository<Shipment, UUID>{

    //Personalizando busquedas de la tabla SHIPMENTS

    //Buscar por nombre de transportadora
    List<Shipment> findByCarrier(String carrier);

    //Buscar por número de guía
    Optional<Shipment> findByTrackingNumber(Integer trackingNumber);

    //Buscar por fecha de envío exacta
    List<Shipment> findByShipmentDate(LocalDateTime shipmentDate);

    //Buscar por fecha de envío menor que
    List<Shipment> findByShipmentDateLessThan(LocalDateTime shipmentDate);

    //Buscar por fecha de envío mayor que
    List<Shipment> findByShipmentDateGreaterThan(LocalDateTime shipmentDate);

    //Buscar por fecha de entrega exacta
    List<Shipment> findByDeliveryDate(LocalDateTime deliveryDate);

    //Buscar por fecha de entrega menor que
    List<Shipment> findByDeliveryDateLessThan(LocalDateTime deliveryDate);

    //Buscar por fecha de entrega mayor que
    List<Shipment> findByDeliveryDateGreaterThan(LocalDateTime deliveryDate);

    //Buscar por costo del envío exacto
    List<Shipment> findByShippingCost(Double shippingCost);

    //Buscar por costo del envío menor que
    List<Shipment> findByShippingCostLessThan(Double shippingCost);

    //Buscar por costo del envío mayor que
    List<Shipment> findByShippingCostGreaterThan(Double shippingCost);

    //Buscar por estado del envío
    List<Shipment> findByShippingStatus(Boolean shippingStatus);
}
