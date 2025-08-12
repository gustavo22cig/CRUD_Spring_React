package com.banking.backend.backend_banking.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.banking.backend.backend_banking.models.entities.Account;
import com.banking.backend.backend_banking.services.AccountService;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(originPatterns = "*")
public class AccountController {

    @Autowired
    private AccountService service;

    // obtiene todas las cuentas
    @GetMapping
    public List<Account> findAll() {
        return service.findAll();
    }

    // obtiene una cuenta por su ID
    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        Optional<Account> account = service.findById(id);
        if (account.isPresent()) {
            return ResponseEntity.ok(account.get());
        } 
        return ResponseEntity.notFound().build();
    }

    // guarda una cuenta
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Account account) {
        Account savedAccount = service.save(account);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAccount);
    }

    //Actualiza una cuenta
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Account account) {
        Optional<Account> existingAccount = service.findById(id);
        if (existingAccount.isPresent()) {
            Account accountDb = existingAccount.orElseThrow();
            accountDb.setTipo(account.getTipo());
            accountDb.setNumeroCuenta(account.getNumeroCuenta());
            accountDb.setMoneda(account.getMoneda());
            accountDb.setMonto(account.getMonto());
            accountDb.setFechaCreacion(account.getFechaCreacion());
            accountDb.setSucursal(account.getSucursal());

            Account updatedAccount = service.save(accountDb);
            return ResponseEntity.ok(updatedAccount);
        }
        return ResponseEntity.notFound().build();
    }

    // elimina una cuenta
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Account> account = service.findById(id);
        if (account.isPresent()) {
            service.remove(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }


    // obtiene las cuentas de un cliente por su ID
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Account>> getAccountsByClient(@PathVariable Long clientId) {
        List<Account> accounts = service.findAccountsByClientId(clientId);
        if (accounts.isEmpty()) { 
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(accounts);
    }

}
