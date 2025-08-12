package com.banking.backend.backend_banking.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.banking.backend.backend_banking.models.entities.Account;
import com.banking.backend.backend_banking.repositories.AccountRepository;

@Service
public class AccountServiceImplement implements AccountService {

    @Autowired
    private AccountRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<Account> findAll() {
        return (List<Account>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Account> findById(Long id) {
        // devuelve una cuenta por su ID
        return repository.findById(id);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        repository.deleteById(id);
        
    }

    @Override
    @Transactional
    public Account save(Account account) {
        return repository.save(account);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Account> findAccountsByClientId(Long clienteId) {
        return repository.findByCliente_Id(clienteId);
    }
}
