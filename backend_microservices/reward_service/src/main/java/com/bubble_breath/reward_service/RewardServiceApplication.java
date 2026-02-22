package com.bubble_breath.reward_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(exclude = { UserDetailsServiceAutoConfiguration.class })
public class RewardServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RewardServiceApplication.class, args);
	}

}
