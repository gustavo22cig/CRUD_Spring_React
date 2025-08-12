package com.banking.backend.backend_banking.services;

import java.util.List;
import java.util.Optional;

import com.banking.backend.backend_banking.models.entities.Account;

public interface AccountService {

    List<Account> findAll();

    // Buscar cuenta por ID
    Optional<Account> findById(Long id);

    // guardar cuenta
    Account save(Account account);

    // eliminar cuenta
    void remove(Long id);

    // Nuevo método: obtener cuentas por ID de cliente
    List<Account> findAccountsByClientId(Long clientId);
}
