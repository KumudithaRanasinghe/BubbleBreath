package com.bubble_breath.user_privileges.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class PrivillegesResponse {

    private UUID id;

    private UUID userId;

    private String privilegeKey;

    private Boolean isAdmin;

    private String createdBy;

    private LocalDateTime createdDateTime;

    private String modifiedBy;

    private LocalDateTime modifiedDateTime;

    private Boolean isDeleted;
}
