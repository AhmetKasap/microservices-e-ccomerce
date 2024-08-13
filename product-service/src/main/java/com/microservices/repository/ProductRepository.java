package com.microservices.repository;

import com.microservices.model.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<ProductEntity, UUID> {
    Optional<ProductEntity> findByIdAndUserId(UUID id, UUID userId);
}
