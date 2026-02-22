package com.bubble_breath.reward_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "REWARD")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true, nullable = false, updatable = false)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "REWARD_TYPE", nullable = false)
    private RewardType rewardType;

    @Column(name = "GAME_ID", nullable = false)
    private UUID gameId;

    @Column(name = "POINTS_REQUIRED", nullable = false)
    private Double pointsRequired;

    @CreationTimestamp
    @Column(name = "CREATED_DATE_TIME", updatable = false)
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    @Column(name = "MODIFIED_DATE_TIME")
    private LocalDateTime modifiedDateTime;

    @Column(name = "IS_DELETED", nullable = false)
    private Boolean isDeleted = false;
}