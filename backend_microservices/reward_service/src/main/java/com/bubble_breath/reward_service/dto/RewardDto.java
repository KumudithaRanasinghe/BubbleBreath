package com.bubble_breath.reward_service.dto;

import com.bubble_breath.reward_service.enums.RewardType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RewardDto {
    private UUID id;
    private String name;
    private String description;
    private RewardType rewardType;
    private String iconUrl;
    private int pointsRequired;
}
