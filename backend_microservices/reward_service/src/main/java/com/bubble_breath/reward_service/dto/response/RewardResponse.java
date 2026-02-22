package com.bubble_breath.reward_service.dto.response;

import com.bubble_breath.reward_service.entity.RewardType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class RewardResponse {

    private UUID id;

    private String name;

    private String description;

    private RewardType rewardType;

    private UUID gameId;

    private Double pointsRequired;

    private LocalDateTime createdDateTime;

    private LocalDateTime modifiedDateTime;
}
