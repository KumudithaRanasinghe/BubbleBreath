package com.bubble_breath.reward_service.dto.request;

import com.bubble_breath.reward_service.entity.RewardType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.UUID;

@Data
public class RewardUpdateRequest {

    @NotNull(message = "ID is required")
    private UUID id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Reward type is required")
    private RewardType rewardType;

    @NotNull(message = "Game ID is required")
    private UUID gameId;

    @NotNull(message = "Points required is required")
    @Positive(message = "Points required must be positive")
    private Double pointsRequired;
}
