package com.microservices.service;

import com.microservices.dto.ProductDTO;
import com.microservices.model.ProductEntity;
import com.microservices.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public ProductDTO createProduct(ProductDTO productDTO) {
        // ProductDTO'yu ProductEntity'ye dönüştür
        ProductEntity productEntity = productDTO.toEntity();

        // ProductEntity'yi veritabanına kaydet
        ProductEntity savedEntity = productRepository.save(productEntity);

        // Kaydedilen entity'yi tekrar DTO'ya dönüştür
        return savedEntity.toDTO();
    }
}
