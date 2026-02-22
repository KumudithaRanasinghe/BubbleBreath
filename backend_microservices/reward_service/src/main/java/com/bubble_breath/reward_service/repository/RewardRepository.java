package com.bubble_breath.reward_service.repository;

import com.bubble_breath.reward_service.entity.Reward;
import com.bubble_breath.reward_service.entity.RewardType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RewardRepository extends JpaRepository<Reward, UUID> {

    List<Reward> findByIsDeleted(Boolean isDeleted);

    List<Reward> findByGameIdAndIsDeleted(UUID gameId, Boolean isDeleted);

    List<Reward> findByRewardTypeAndIsDeleted(RewardType rewardType, Boolean isDeleted);

    List<Reward> findByGameIdAndRewardTypeAndIsDeleted(UUID gameId, RewardType rewardType, Boolean isDeleted);
}