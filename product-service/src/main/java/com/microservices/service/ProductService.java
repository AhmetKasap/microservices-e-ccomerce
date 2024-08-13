package com.microservices.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.microservices.dto.ProductDTO;
import com.microservices.model.ProductEntity;
import com.microservices.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    private final S3Service s3Service;
    public ProductService(S3Service s3Service) {
        this.s3Service = s3Service;
    }


    public ProductDTO createProduct(ProductDTO productDTO) {
        // ProductDTO'yu ProductEntity'ye dönüştür
        ProductEntity productEntity = productDTO.toEntity();

        // ProductEntity'yi veritabanına kaydet
        ProductEntity savedEntity = productRepository.save(productEntity);

        // Kaydedilen entity'yi tekrar DTO'ya dönüştür
        return savedEntity.toDTO();
    }


    public boolean deleteProduct(UUID id, UUID userId) {
        Optional<ProductEntity> optionalProduct = productRepository.findByIdAndUserId(id, userId);

        if (optionalProduct.isPresent()) {
            ProductEntity product = optionalProduct.get();

            String photoKey = extractPhotoKeyFromUrl(product.getProductUrl());
            s3Service.deleteFile(photoKey);

            productRepository.deleteById(id);

            return true;
        } else {
            return false;
        }
    }


    private String extractPhotoKeyFromUrl(String url) {
        return url.substring(url.lastIndexOf("/") + 1);
    }



}
