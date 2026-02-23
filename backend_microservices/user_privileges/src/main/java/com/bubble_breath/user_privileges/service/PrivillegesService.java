package com.bubble_breath.user_privileges.service;

import com.bubble_breath.user_privileges.dto.request.PrivillegesRequest;
import com.bubble_breath.user_privileges.dto.request.PrivillegesUpdateRequest;
import com.bubble_breath.user_privileges.dto.response.PrivillegesResponse;

import java.util.List;
import java.util.UUID;

public interface PrivillegesService {

    PrivillegesResponse save(PrivillegesRequest request);

    PrivillegesResponse update(PrivillegesUpdateRequest request);

    PrivillegesResponse getById(UUID id);

    List<PrivillegesResponse> getAll();


    Integer delete(UUID id);
}