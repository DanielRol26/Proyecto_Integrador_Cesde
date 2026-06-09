package com.example.remainders.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.Payment;
import com.example.remainders.repositories.IPaymentRepository;

@Service
public class PaymentService {

    // 1. Inyectar al dependecia del repositorio en el servicio
    @Autowired
    private IPaymentRepository paymentRepository;

    // 2. Objetivo: Activar mediante funciones las consultas que quiero ofrecer en
    // mi tabla

    // POST
    // Guardar un solo registro en la tabla
    public Payment savePayment(Payment dataPayment) {
        Payment savedPayment = paymentRepository.save(dataPayment);
        return savedPayment;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<Payment> listPayments() {
        List<Payment> paymentsList = paymentRepository.findAll();
        return paymentsList;
    }

    // GET
    // Buscar registro de la tabla por id
    public Payment searchPaymentById(UUID id) {
        Optional<Payment> searchedPayment = paymentRepository.findById(id);

        if (searchedPayment.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El pago que buscas no existe en la BD");
        }
        return searchedPayment.get();
    }

    // GET
    // Buscar registros por fecha de pago exacta
    public List<Payment> searchPaymentsByPaymentDate(LocalDateTime paymentDate) {
        List<Payment> paymentsList = paymentRepository.findByPaymentDate(paymentDate);
        return paymentsList;
    }

    // GET
    // Buscar registros por fecha de pago menor que
    public List<Payment> searchPaymentsByPaymentDateLessThan(LocalDateTime paymentDate) {
        List<Payment> paymentsList = paymentRepository.findByPaymentDateLessThan(paymentDate);
        return paymentsList;
    }

    // GET
    // Buscar registros por fecha de pago mayor que
    public List<Payment> searchPaymentsByPaymentDateGreaterThan(LocalDateTime paymentDate) {
        List<Payment> paymentsList = paymentRepository.findByPaymentDateGreaterThan(paymentDate);
        return paymentsList;
    }

    // GET
    // Buscar registros por fecha de pago entre a y b
    public List<Payment> searchPaymentsByPaymentDateBetween(LocalDateTime minPaymentDate,
            LocalDateTime maxPaymentDate) {
        List<Payment> paymentsList = paymentRepository.findByPaymentDateBetween(minPaymentDate, maxPaymentDate);
        return paymentsList;
    }

    // GET
    // Buscar registros por montos exactos
    public List<Payment> searchPaymentsByAmount(Double amount) {
        List<Payment> paymentsList = paymentRepository.findByAmount(amount);
        return paymentsList;
    }

    // GET
    // Buscar registros por montos menor que
    public List<Payment> searchPaymentsByAmountLessThan(Double amount) {
        List<Payment> paymentsList = paymentRepository.findByAmountLessThan(amount);
        return paymentsList;
    }

    // GET
    // Buscar registros por montos mayor que
    public List<Payment> searchPaymentsByAmountGreaterThan(Double amount) {
        List<Payment> paymentsList = paymentRepository.findByAmountGreaterThan(amount);
        return paymentsList;
    }

    // GET
    // Buscar registros por montos entre a y b
    public List<Payment> searchPaymentsByAmountBetween(Double minAmount, Double maxAmount) {
        List<Payment> paymentsList = paymentRepository.findByAmountBetween(minAmount, maxAmount);
        return paymentsList;
    }

    // GET
    // Buscar registros por estado del pago
    public List<Payment> searchPaymentsByStatus(Boolean status) {
        List<Payment> paymentsList = paymentRepository.findByStatus(status);
        return paymentsList;
    }

    // GET
    // Buscar registro por referencia de pago
    public Payment searchPaymentByReference(String paymentReference) {
        Optional<Payment> searchedPayment = paymentRepository.findByPaymentReference(paymentReference);
        if (searchedPayment.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El pago que buscas no existe en la BD");
        }
        return searchedPayment.get();
    }

    // PUT
    // Actualizar un registro por id
    public Payment updatePayment(UUID id, Payment newDataPayment) {
        Optional<Payment> searchedPayment = paymentRepository.findById(id);
        if (searchedPayment.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El pago que buscas no existe en la BD");
        }
        Payment paymentFoundInDB = searchedPayment.get();
        paymentFoundInDB.setAmount(newDataPayment.getAmount());
        paymentFoundInDB.setStatus(newDataPayment.getStatus());
        paymentFoundInDB.setPaymentReference(newDataPayment.getPaymentReference());
        return paymentRepository.save(paymentFoundInDB);
    }

    // DELETE
    // Eliminar un registro por id
    public Boolean deletePayment(UUID id) {
        Optional<Payment> searchedPayment = paymentRepository.findById(id);
        if (searchedPayment.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El pago que buscas no existe en la BD");
        }
        paymentRepository.deleteById(id);
        return true;
    }

}
