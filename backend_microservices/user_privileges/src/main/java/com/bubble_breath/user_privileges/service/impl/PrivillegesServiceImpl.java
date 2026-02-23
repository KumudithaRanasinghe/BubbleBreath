package com.bubble_breath.user_privileges.service.impl;

import com.bubble_breath.user_privileges.dto.request.PrivillegesRequest;
import com.bubble_breath.user_privileges.dto.request.PrivillegesUpdateRequest;
import com.bubble_breath.user_privileges.dto.response.PrivillegesResponse;
import com.bubble_breath.user_privileges.entity.Privilleges;
import com.bubble_breath.user_privileges.repository.PrivillegesRepository;
import com.bubble_breath.user_privileges.service.PrivillegesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PrivillegesServiceImpl implements PrivillegesService {

    @Autowired
    private PrivillegesRepository privillegesRepository;

    @Override
    @Transactional
    public PrivillegesResponse save(PrivillegesRequest request) {
        Privilleges privilleges = new Privilleges();
        privilleges.setUserId(request.getUserId());
        privilleges.setPrivilegeKey(request.getPrivilegeKey());
        privilleges.setIsAdmin(request.getIsAdmin());
        privilleges.setIsDeleted(false);
        Privilleges save = privillegesRepository.save(privilleges);
        return convert(save);
    }

    @Override
    @Transactional
    public PrivillegesResponse update(PrivillegesUpdateRequest request) {
        Privilleges privilleges = privillegesRepository.findById(request.getId()).orElse(null);
        if (privilleges == null) {
            return null;
        }
        privilleges.setUserId(request.getUserId());
        privilleges.setPrivilegeKey(request.getPrivilegeKey());
        privilleges.setIsAdmin(request.getIsAdmin());
        Privilleges updated = privillegesRepository.save(privilleges);
        return convert(updated);
    }

    @Override
    public PrivillegesResponse getById(UUID id) {
        return privillegesRepository.findById(id).map(PrivillegesServiceImpl::convert).orElse(null);
    }

    @Override
    public List<PrivillegesResponse> getAll() {
        return privillegesRepository.findByIsDeleted(false)
                .stream().map(PrivillegesServiceImpl::convert).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Integer delete(UUID id) {
        Privilleges got = privillegesRepository.findById(id).orElse(null);
        if (got == null) {
            return 0;
        }
        got.setIsDeleted(true);
        privillegesRepository.save(got);
        return 1;
    }

    private static PrivillegesResponse convert(Privilleges privilleges) {
        PrivillegesResponse response = new PrivillegesResponse();
        response.setId(privilleges.getId());
        response.setUserId(privilleges.getUserId());
        response.setPrivilegeKey(privilleges.getPrivilegeKey());
        response.setIsAdmin(privilleges.getIsAdmin());
        response.setCreatedBy(privilleges.getCreatedBy());
        response.setCreatedDateTime(privilleges.getCreatedDateTime());
        response.setModifiedBy(privilleges.getModifiedBy());
        response.setModifiedDateTime(privilleges.getModifiedDateTime());
        response.setIsDeleted(privilleges.getIsDeleted());
        return response;
    }
}