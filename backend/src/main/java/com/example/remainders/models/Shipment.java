package com.example.remainders.models;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Shipments")
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String carrier;
    private Integer trackingNumber;
    private LocalDateTime shipmentDate;
    private LocalDateTime deliveryDate;
    private Double shippingCost;
    private Boolean shippingStatus;
    
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getCarrier() {
        return carrier;
    }
    public void setCarrier(String carrier) {
        this.carrier = carrier;
    }
    public Integer getTrackingNumber() {
        return trackingNumber;
    }
    public void setTrackingNumber(Integer trackingNumber) {
        this.trackingNumber = trackingNumber;
    }
    public LocalDateTime getShipmentDate() {
        return shipmentDate;
    }
    public void setShipmentDate(LocalDateTime shipmentDate) {
        this.shipmentDate = shipmentDate;
    }
    public LocalDateTime getDeliveryDate() {
        return deliveryDate;
    }
    public void setDeliveryDate(LocalDateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }
    public Double getShippingCost() {
        return shippingCost;
    }
    public void setShippingCost(Double shippingCost) {
        this.shippingCost = shippingCost;
    }
    public Boolean getShippingStatus() {
        return shippingStatus;
    }
    public void setShippingStatus(Boolean shippingStatus) {
        this.shippingStatus = shippingStatus;
    }
}
