package com.bubble_breath.user_privileges.dto.request;

import lombok.Data;

import java.util.UUID;

@Data
public class PrivillegesUpdateRequest {

    private UUID id;

    private UUID userId;

    private String privilegeKey;

    private Boolean isAdmin;
}
