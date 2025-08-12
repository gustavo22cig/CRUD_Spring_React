package com.banking.backend.backend_banking.services;

import java.util.List;
import java.util.Optional;

import com.banking.backend.backend_banking.models.entities.Client;

public interface ClientService {

    //Listar clientes
    List<Client> findAll();

    //Buscar cliente por ID
    Optional<Client> findById(Long id);

    // guardar cliente
    Client save(Client client);
    
    // eliminar cliente
    void remove(Long id);
}
