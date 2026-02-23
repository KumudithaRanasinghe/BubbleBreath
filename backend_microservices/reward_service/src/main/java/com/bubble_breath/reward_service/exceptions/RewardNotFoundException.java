package com.bubble_breath.reward_service.exceptions;

public class RewardNotFoundException extends RuntimeException {
    public RewardNotFoundException(String message) {
        super(message);
    }
}
