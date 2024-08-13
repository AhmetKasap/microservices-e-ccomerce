package com.microservices.repository;

import com.microservices.model.ProductEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.UUID;

public interface ElasticRepo extends ElasticsearchRepository<ProductEntity, UUID> {
}
