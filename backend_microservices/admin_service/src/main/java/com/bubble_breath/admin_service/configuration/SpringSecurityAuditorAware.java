package com.bubble_breath.admin_service.configuration;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class SpringSecurityAuditorAware implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        // Check if there is an Authentication object in the SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            // No authenticated user, return the fallback/default value
            return Optional.of("anonymousUser");
        }

        // If authenticated, return the principal name (the logged-in username)
        // You might need to cast principal to your UserDetails implementation if it's not a String
        return Optional.of(authentication.getName());
    }
}