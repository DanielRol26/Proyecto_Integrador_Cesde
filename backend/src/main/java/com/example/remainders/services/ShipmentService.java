package com.example.remainders.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.Shipment;
import com.example.remainders.repositories.IShipmentRepository;

@Service
public class ShipmentService {

    //1. Inyectar la dependencia del repositorio en el servicio
    @Autowired
    private IShipmentRepository shipmentRepository;

    //2. Objetivo: Activar mendiante funciones las consultas que quiero ofrecer en mi tabla

    // POST
    // Guardar un solo registro en la tabla
    public Shipment saveShipment(Shipment dataShipment) {
        Shipment savedShipment = shipmentRepository.save(dataShipment);
        return savedShipment;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<Shipment> listShipments() {
        List<Shipment> shipmentsList = shipmentRepository.findAll();
        return shipmentsList;
    }

    // GET
    // Buscar registro de la tabla por id
    public Shipment searchShipmentById(UUID id) {
        Optional<Shipment> searchedShipment = shipmentRepository.findById(id);
        if (searchedShipment.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El envío que buscas no existe en la BD");
        }
        return searchedShipment.get();
    }

    // GET
    // Buscar registro por nombre de transportadora
    public List<Shipment> searchShipmentByCarrier(String carrier){
        List<Shipment> shipmentsList = shipmentRepository.findByCarrier(carrier);
        return shipmentsList;
    }

    // GET
    // Buscar registro por número de guía
    public Shipment searchShipmentByTrackingNumber(Integer trackingNumber){
        Optional<Shipment> searchedShipment = shipmentRepository.findByTrackingNumber(trackingNumber);
        if (searchedShipment.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "El envío que buscas no existe en la BD");
        }
        return searchedShipment.get();
    }

    // GET
    // Buscar registro por fecha de envío exacta
    public List<Shipment> searchShipmentByShipmentDate(LocalDateTime shipmentDate){
        List<Shipment> shipmentsList = shipmentRepository.findByShipmentDate(shipmentDate);
        return shipmentsList;
    }

    // GET
    // Buscar registro por fecha de envío menor que
    public List<Shipment> searchShipmentByShipmentDateLessThan(LocalDateTime shipmentDate){
        List<Shipment> shipmentsList = shipmentRepository.findByShipmentDateLessThan(shipmentDate);
        return shipmentsList;
    }

    // GET
    // Buscar registro por fecha de envío mayor que
    public List<Shipment> searchShipmentByShipmentDateGreaterThan(LocalDateTime shipmentDate){
        List<Shipment> shipmentsList = shipmentRepository.findByShipmentDateGreaterThan(shipmentDate);
        return shipmentsList;
    }

    // GET
    // Buscar registro por fecha de envío entre a y b
    public List<Shipment> searchShipmentByShipmentDateBetween(LocalDateTime minShipmentDate, LocalDateTime maxShipmentDate){
        List<Shipment> shipmentsList = shipmentRepository.findByShipmentDateBetween(minShipmentDate, maxShipmentDate);
        return shipmentsList;
    }

    // GET
    // Buscar registro por fecha de entrega exacta
    public List<Shipment> searchShipmentByDeliveryDate(LocalDateTime deliveryDate){
        List<Shipment> shipmentsList = shipmentRepository.findByDeliveryDate(deliveryDate);
        return shipmentsList;
    }

    // GET
    // Buscar registro por fecha de entrega menor que
    public List<Shipment> searchShipmentByDeliveryDateLessThan(LocalDateTime deliveryDate){
        List<Shipment> shipmentsList = shipmentRepository.findByDeliveryDateLessThan(deliveryDate);
        return shipmentsList;
    }

    // GET
    // Buscar registro por fecha de entrega mayor que
    public List<Shipment> searchShipmentByDeliveryDateGreaterThan(LocalDateTime deliveryDate){
        List<Shipment> shipmentsList = shipmentRepository.findByDeliveryDateGreaterThan(deliveryDate);
        return shipmentsList;
    }

    // GET
    // Buscar registro por fecha de entrega entre a y b
    public List<Shipment> searchShipmentByDeliveryDateBetween(LocalDateTime minDeliveryDate, LocalDateTime maxDeliveryDate){
        List<Shipment> shipmentsList = shipmentRepository.findByDeliveryDateBetween(minDeliveryDate, maxDeliveryDate);
        return shipmentsList;
    }

    // GET
    // Buscar registro por precio exacto de envío
    public List<Shipment> searchShipmentByShippingCost(Double shippingCost){
        List<Shipment> shipmentsList = shipmentRepository.findByShippingCost(shippingCost);
        return shipmentsList;
    }

    // GET
    // Buscar registro por precio de envío menor que
    public List<Shipment> searchShipmentByShippingCostLessThan(Double shippingCost){
        List<Shipment> shipmentsList = shipmentRepository.findByShippingCostLessThan(shippingCost);
        return shipmentsList;
    }

    // GET
    // Buscar registro por precio de envío mayor que
    public List<Shipment> searchShipmentByShippingCostGreaterThan(Double shippingCost){
        List<Shipment> shipmentsList = shipmentRepository.findByShippingCostGreaterThan(shippingCost);
        return shipmentsList;
    }

    // GET
    // Buscar registro por precio de envío entre a y b
    public List<Shipment> searchShipmentByShippingCostBetween(Double minShippingCost, Double maxShippingCost){
        List<Shipment> shipmentsList = shipmentRepository.findByShippingCostBetween(minShippingCost, maxShippingCost);
        return shipmentsList;
    }

    // GET
    // Buscar registro por estado de envío
    public List<Shipment> searchShipmentByShippingStatus(Boolean shippingStatus){
        List<Shipment> shipmentsList = shipmentRepository.findByShippingStatus(shippingStatus);
        return shipmentsList;
    }

    // PUT
    // Actualizar un registro de la tabla
    public Shipment updateShipment(UUID id, Shipment newDataShipment) {
        Optional<Shipment> searchedShipment = shipmentRepository.findById(id);
        if (searchedShipment.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El envío que buscas no existe en la BD");
        }
        // Actualización de los campos modificables del envío
        // Nombre de transportadora, número de guía, fecha de envío, fecha de entrega, costo de envío y el estado del envío
        Shipment shipmentFoundInDB = searchedShipment.get();
        shipmentFoundInDB.setCarrier(newDataShipment.getCarrier());
        shipmentFoundInDB.setTrackingNumber(newDataShipment.getTrackingNumber());
        shipmentFoundInDB.setShipmentDate(newDataShipment.getShipmentDate());
        shipmentFoundInDB.setDeliveryDate(newDataShipment.getDeliveryDate());
        shipmentFoundInDB.setShippingCost(newDataShipment.getShippingCost());
        shipmentFoundInDB.setShippingStatus(newDataShipment.getShippingStatus());
        return shipmentRepository.save(shipmentFoundInDB);
    }

    // DELETE
    // Eliminar un registro de la tabla
    public Boolean deleteShipment(UUID id){
        Optional<Shipment> searchedShipment = shipmentRepository.findById(id);
        if (searchedShipment.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "El envío que buscas no existe en la BD");
        }
        shipmentRepository.deleteById(id);
        return true;
    }

}
