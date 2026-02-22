package com.bubble_breath.reward_service.service.impl;

import com.bubble_breath.reward_service.dto.request.RewardRequest;
import com.bubble_breath.reward_service.dto.request.RewardUpdateRequest;
import com.bubble_breath.reward_service.dto.response.RewardResponse;
import com.bubble_breath.reward_service.entity.Reward;
import com.bubble_breath.reward_service.entity.RewardType;
import com.bubble_breath.reward_service.repository.RewardRepository;
import com.bubble_breath.reward_service.service.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RewardServiceImpl implements RewardService {

    @Autowired
    private RewardRepository rewardRepository;

    @Override
    @Transactional
    public RewardResponse save(RewardRequest request) {
        Reward reward = new Reward();
        reward.setName(request.getName());
        reward.setDescription(request.getDescription());
        reward.setRewardType(request.getRewardType());
        reward.setGameId(request.getGameId());
        reward.setPointsRequired(request.getPointsRequired());
        reward.setIsDeleted(false);

        Reward saved = rewardRepository.save(reward);
        return convert(saved);
    }

    @Override
    @Transactional
    public RewardResponse update(RewardUpdateRequest request) {
        Reward reward = rewardRepository.findById(request.getId()).orElse(null);
        if (reward == null || reward.getIsDeleted()) {
            return null;
        }

        reward.setName(request.getName());
        reward.setDescription(request.getDescription());
        reward.setRewardType(request.getRewardType());
        reward.setGameId(request.getGameId());
        reward.setPointsRequired(request.getPointsRequired());

        Reward updated = rewardRepository.save(reward);
        return convert(updated);
    }

    @Override
    public RewardResponse getById(UUID id) {
        return rewardRepository.findById(id)
                .filter(reward -> !reward.getIsDeleted())
                .map(RewardServiceImpl::convert)
                .orElse(null);
    }

    @Override
    public List<RewardResponse> getAll() {
        return rewardRepository.findByIsDeleted(false)
                .stream()
                .map(RewardServiceImpl::convert)
                .collect(Collectors.toList());
    }

    @Override
    public List<RewardResponse> getByGameId(UUID gameId) {
        return rewardRepository.findByGameIdAndIsDeleted(gameId, false)
                .stream()
                .map(RewardServiceImpl::convert)
                .collect(Collectors.toList());
    }

    @Override
    public List<RewardResponse> getByRewardType(RewardType rewardType) {
        return rewardRepository.findByRewardTypeAndIsDeleted(rewardType, false)
                .stream()
                .map(RewardServiceImpl::convert)
                .collect(Collectors.toList());
    }

    @Override
    public List<RewardResponse> getByGameIdAndRewardType(UUID gameId, RewardType rewardType) {
        return rewardRepository.findByGameIdAndRewardTypeAndIsDeleted(gameId, rewardType, false)
                .stream()
                .map(RewardServiceImpl::convert)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Integer delete(UUID id) {
        Reward reward = rewardRepository.findById(id).orElse(null);
        if (reward == null || reward.getIsDeleted()) {
            return 0;
        }

        reward.setIsDeleted(true);
        rewardRepository.save(reward);
        return 1;
    }

    private static RewardResponse convert(Reward reward) {
        RewardResponse response = new RewardResponse();
        response.setId(reward.getId());
        response.setName(reward.getName());
        response.setDescription(reward.getDescription());
        response.setRewardType(reward.getRewardType());
        response.setGameId(reward.getGameId());
        response.setPointsRequired(reward.getPointsRequired());
        response.setCreatedDateTime(reward.getCreatedDateTime());
        response.setModifiedDateTime(reward.getModifiedDateTime());
        return response;
    }
}