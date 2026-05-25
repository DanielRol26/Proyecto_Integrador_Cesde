package com.example.remainders.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.remainders.models.Payment;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;


@Repository
public interface IPaymentRepository extends JpaRepository<Payment, UUID>{

    //Personalizando busqueda de la tabla PAYMENTS

    //Buscar por fecha de pago exacta
    List<Payment> findByPaymentDate(LocalDateTime paymentDate);

    //Buscar por fecha de pago menor que
    List<Payment> findByPaymentDateLessThan(LocalDateTime paymentDate);

    //Buscar por fecha de pago mayor que
    List<Payment> findByPaymentDateGreaterThan(LocalDateTime paymentDate);

    //Buscar por fecha de pago entre a y b
    List<Payment> findByPaymentDateBetween(LocalDateTime minPaymentDate, LocalDateTime maxPaymentDate);

    //Buscar por montos exactos
    List<Payment> findByAmount(Double amount);

    //Buscar por montos menor que
    List<Payment> findByAmountLessThan(Double amount);

    //Buscar por montos entre a y b
    List<Payment> findByAmountBetween(Double minAmount, Double maxAmount);

    //Buscar por estado del pago
    List<Payment> findByStatus(Boolean status);

    //Buscar por referencia de pago
    Optional<Payment> findByPaymentReference(String paymentReference);
}
