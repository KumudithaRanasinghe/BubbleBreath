package com.bubble_breath.user_privileges.repository;

import com.bubble_breath.user_privileges.entity.Privilleges;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PrivillegesRepository extends JpaRepository<Privilleges, UUID> {

    List<Privilleges> findByIsDeleted(Boolean isDeleted);
}