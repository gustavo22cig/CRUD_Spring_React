package com.banking.backend.backend_banking.repositories;


import java.util.List;

import org.springframework.data.repository.CrudRepository;
import com.banking.backend.backend_banking.models.entities.Account;

public interface AccountRepository extends CrudRepository<Account, Long> {

    // Método para buscar cuentas por ID de cliente
    List<Account> findByCliente_Id(Long clienteId);
}