package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.PaymentMethod;
import java.util.List;


@Repository
public interface IPaymentMethodRepository extends JpaRepository<PaymentMethod, UUID>{

    //Personalizando busqueda de la tabla PAYMENTMETHODS

    //Buscar por nombre
    List<PaymentMethod> findByName(String name);

    //Buscar por estado del metodo de pago
    List<PaymentMethod> findByStatus(Boolean status);
}
