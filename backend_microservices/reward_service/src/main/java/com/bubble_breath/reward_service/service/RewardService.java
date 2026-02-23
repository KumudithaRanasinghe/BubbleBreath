package com.bubble_breath.reward_service.service;

import com.bubble_breath.reward_service.dto.RewardDto;
import com.bubble_breath.reward_service.entity.Reward;
import com.bubble_breath.reward_service.exceptions.RewardNotFoundException;
import com.bubble_breath.reward_service.repository.RewardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RewardService {

    private final RewardRepository rewardRepository;

    public RewardDto createReward(RewardDto rewardDto) {
        Reward reward = Reward.builder()
                .name(rewardDto.getName())
                .description(rewardDto.getDescription())
                .rewardType(rewardDto.getRewardType())
                .iconUrl(rewardDto.getIconUrl())
                .pointsRequired(rewardDto.getPointsRequired())
                .build();
        
        Reward savedReward = rewardRepository.save(reward);
        return mapToDto(savedReward);
    }

    public List<RewardDto> getAllRewards() {
        return rewardRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public RewardDto getRewardById(UUID id) {
        Reward reward = rewardRepository.findById(id)
                .orElseThrow(() -> new RewardNotFoundException("Reward not found with ID: " + id));
        return mapToDto(reward);
    }

    public RewardDto updateReward(UUID id, RewardDto rewardDto) {
        Reward existingReward = rewardRepository.findById(id)
                .orElseThrow(() -> new RewardNotFoundException("Reward not found with ID: " + id));

        existingReward.setName(rewardDto.getName());
        existingReward.setDescription(rewardDto.getDescription());
        existingReward.setRewardType(rewardDto.getRewardType());
        existingReward.setIconUrl(rewardDto.getIconUrl());
        existingReward.setPointsRequired(rewardDto.getPointsRequired());

        Reward updatedReward = rewardRepository.save(existingReward);
        return mapToDto(updatedReward);
    }

    public void deleteReward(UUID id) {
        if (!rewardRepository.existsById(id)) {
            throw new RewardNotFoundException("Reward not found with ID: " + id);
        }
        rewardRepository.deleteById(id);
    }

    private RewardDto mapToDto(Reward reward) {
        return RewardDto.builder()
                .id(reward.getId())
                .name(reward.getName())
                .description(reward.getDescription())
                .rewardType(reward.getRewardType())
                .iconUrl(reward.getIconUrl())
                .pointsRequired(reward.getPointsRequired())
                .build();
    }
}
