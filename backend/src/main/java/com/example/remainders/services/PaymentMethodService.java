package com.example.remainders.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.remainders.models.PaymentMethod;
import com.example.remainders.repositories.IPaymentMethodRepository;

@Service
public class PaymentMethodService {

    // 1. Inyectar al dependecia del repositorio en el servicio
    @Autowired
    private IPaymentMethodRepository paymentMethodRepository;

    // 2. Objetivo: Activar mediante funciones las consultas que quiero ofrecer en
    // mi tabla

    // POST
    // Guardar un solo registro en la tabla
    public PaymentMethod savePaymentMethod(PaymentMethod paymentMethod) {
        PaymentMethod savedPaymentMethod = paymentMethodRepository.save(paymentMethod);
        return savedPaymentMethod;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<PaymentMethod> listPaymentMethods() {
        List<PaymentMethod> paymentMethodsList = paymentMethodRepository.findAll();
        return paymentMethodsList;
    }

    // GET
    // Buscar registro de la tabla por id
    public PaymentMethod searchPaymentMethodById(UUID id) {
        Optional<PaymentMethod> searchedPaymentMethod = paymentMethodRepository.findById(id);
        if (searchedPaymentMethod.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El método de pago que buscas no existe en la BD");
        }
        return searchedPaymentMethod.get();
    }

    // GET
    // Buscar registros por nombre
    public List<PaymentMethod> searchPaymentMethodsByName(String name) {
        List<PaymentMethod> paymentMethodsList = paymentMethodRepository.findByName(name);
        return paymentMethodsList;
    }

    // GET
    // Buscar registros por estado del método de pago
    public List<PaymentMethod> searchPaymentMethodsByStatus(Boolean status) {
        List<PaymentMethod> paymentMethodsList = paymentMethodRepository.findByStatus(status);
        return paymentMethodsList;
    }

    // PUT
    // Actualizar un registro por id
    public PaymentMethod updatePaymentMethod(UUID id, PaymentMethod newDataPaymentMethod) {
        Optional<PaymentMethod> searchedPaymentMethod = paymentMethodRepository.findById(id);
        if (searchedPaymentMethod.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El método de pago que buscas no existe en la BD");
        }
        PaymentMethod paymentMethodFoundInDB = searchedPaymentMethod.get();
        paymentMethodFoundInDB.setName(newDataPaymentMethod.getName());
        paymentMethodFoundInDB.setStatus(newDataPaymentMethod.getStatus());
        return paymentMethodRepository.save(paymentMethodFoundInDB);
    }

    // DELETE
    // Eliminar un registro por id
    public Boolean deletePaymentMethod(UUID id) {
        Optional<PaymentMethod> searchedPaymentMethod = paymentMethodRepository.findById(id);
        if (searchedPaymentMethod.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El método de pago que buscas no existe en la BD");
        }
        paymentMethodRepository.deleteById(id);
        return true;
    }

}
