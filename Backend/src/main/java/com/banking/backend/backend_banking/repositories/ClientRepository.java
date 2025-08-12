package com.banking.backend.backend_banking.repositories;

import org.springframework.data.repository.CrudRepository;

import com.banking.backend.backend_banking.models.entities.Client;

public interface ClientRepository extends CrudRepository<Client, Long> {
    
     

}
