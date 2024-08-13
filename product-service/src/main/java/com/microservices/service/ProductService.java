package com.microservices.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.microservices.dto.ProductDTO;
import com.microservices.model.ProductEntity;
import com.microservices.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    private final S3Service s3Service;
    public ProductService(S3Service s3Service) {
        this.s3Service = s3Service;
    }


    public ProductDTO createProduct(ProductDTO productDTO) {
        ProductEntity productEntity = productDTO.toEntity();
        ProductEntity savedEntity = productRepository.save(productEntity);
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


    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(productEntity -> productEntity.toDTO())
                .collect(Collectors.toList());
    }

    public ProductDTO getProductById(UUID id) {
        Optional<ProductEntity> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            return optionalProduct.get().toDTO();
        }else{
            return null;
        }

    }

    public List<ProductDTO> getAllProductByUserId(UUID userId) {
        return productRepository.findByUserId(userId)
                .stream()
                .map(productEntity -> productEntity.toDTO())
                .collect(Collectors.toList());
    }







}
