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

import com.banking.backend.backend_banking.models.entities.Client;
import com.banking.backend.backend_banking.services.ClientService;

@RestController
@RequestMapping("/clients")
@CrossOrigin(originPatterns = "*")
public class ClientController {

    @Autowired
    private ClientService service;

    // obtiene todos los clientes
    @GetMapping 
    public List<Client> findAll() {
        return service.findAll();
    }

    // obtiene un cliente por su ID
    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        Optional<Client> client = service.findById(id);
        if (client.isPresent()) {
            return ResponseEntity.ok(client.get());
        } 
        return ResponseEntity.notFound().build();
    }

    // guarda un cliente
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Client client) {
        Client savedClient = service.save(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedClient);
    }

    //actualizar un cliente
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Client client) {
        Optional<Client> existingClient = service.findById(id);
        if (existingClient.isPresent()) {
            Client clientdb = existingClient.orElseThrow();
            clientdb.setNombre(client.getNombre()); 
            clientdb.setPaterno(client.getPaterno());
            clientdb.setMaterno(client.getMaterno());
            clientdb.setTipoDocumento(client.getTipoDocumento());
            clientdb.setDocumentoIdentidad(client.getDocumentoIdentidad());
            clientdb.setFechaNacimiento(client.getFechaNacimiento());
            clientdb.setGenero(client.getGenero());
            Client updatedClient = service.save(clientdb);
            return ResponseEntity.ok(updatedClient);
        }
        return ResponseEntity.notFound().build();
    }
    // elimina un cliente por su ID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Client> client = service.findById(id);
        if (client.isPresent()) {
            service.remove(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
