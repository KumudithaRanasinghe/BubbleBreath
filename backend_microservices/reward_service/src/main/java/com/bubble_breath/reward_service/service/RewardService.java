package com.bubble_breath.reward_service.service;

import com.bubble_breath.reward_service.dto.request.RewardRequest;
import com.bubble_breath.reward_service.dto.request.RewardUpdateRequest;
import com.bubble_breath.reward_service.dto.response.RewardResponse;
import com.bubble_breath.reward_service.entity.RewardType;

import java.util.List;
import java.util.UUID;

public interface RewardService {

    RewardResponse save(RewardRequest request);

    RewardResponse update(RewardUpdateRequest request);

    RewardResponse getById(UUID id);

    List<RewardResponse> getAll();

    List<RewardResponse> getByGameId(UUID gameId);

    List<RewardResponse> getByRewardType(RewardType rewardType);

    List<RewardResponse> getByGameIdAndRewardType(UUID gameId, RewardType rewardType);

    Integer delete(UUID id);
}