package com.microservices.model;

import com.microservices.dto.ProductDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.UUID;

@Entity
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public UUID id;

    public String productName;
    public String productDescription;
    public double productPrice;


    public ProductDTO toDTO() {
        ProductDTO dto = new ProductDTO();
        dto.productName = this.productName;
        dto.productDescription = this.productDescription;
        dto.productPrice = (int) this.productPrice;
        return dto;
    }
}
