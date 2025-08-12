package com.banking.backend.backend_banking.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.banking.backend.backend_banking.repositories.ClientRepository;
import com.banking.backend.backend_banking.models.entities.Client;

@Service
public class ClientServiceImplement implements ClientService {

    @Autowired
    private ClientRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<Client> findAll() {
        // devuelve todos los clientes
        return (List<Client>) repository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Client> findById(Long id) {
        // devuelve un cliente por su ID
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Client save(Client client) {
        // guarda un cliente
        return repository.save(client);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        // elimina un cliente por su ID
        repository.deleteById(id);
    }

}

