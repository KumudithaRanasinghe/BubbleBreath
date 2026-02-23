package com.bubble_breath.user_privileges.controller;

import com.bubble_breath.user_privileges.dto.request.PrivillegesRequest;
import com.bubble_breath.user_privileges.dto.request.PrivillegesUpdateRequest;
import com.bubble_breath.user_privileges.dto.response.PrivillegesResponse;
import com.bubble_breath.user_privileges.service.PrivillegesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RequestMapping("Privilleges")
@RestController
@CrossOrigin
public class PrivillegesController {

    @Autowired
    private PrivillegesService privillegesService;

    @PostMapping
    public ResponseEntity<PrivillegesResponse> save(@Valid @RequestBody PrivillegesRequest request) {
        PrivillegesResponse save = privillegesService.save(request);
        return ResponseEntity.ok(save);
    }

    @PutMapping
    public ResponseEntity<PrivillegesResponse> update(@Valid @RequestBody PrivillegesUpdateRequest request) {
        PrivillegesResponse updated = privillegesService.update(request);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @GetMapping("{id}")
    public ResponseEntity<PrivillegesResponse> getById(@PathVariable("id") UUID id) {
        PrivillegesResponse get = privillegesService.getById(id);
        if (get == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(get);
    }

    @GetMapping()
    public ResponseEntity<List<PrivillegesResponse>> getAll() {
        List<PrivillegesResponse> getall = privillegesService.getAll();
        return ResponseEntity.ok(getall);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Integer> delete(@PathVariable("id") UUID id) {
        int deleted = privillegesService.delete(id);
        if (deleted == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(deleted);
    }
}