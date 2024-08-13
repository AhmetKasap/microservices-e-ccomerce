package com.microservices.model;

import com.microservices.dto.ProductDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
@Data
@NoArgsConstructor
@Entity
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public UUID id;

    public UUID userId;
    public String productName;
    public String productDescription;
    public double productPrice;
    public String productUrl;


    public ProductDTO toDTO() {
        ProductDTO dto = new ProductDTO();
        dto.setUserId(this.userId);
        dto.setProductName(this.productName);
        dto.setProductDescription(this.productDescription);
        dto.setProductPrice(this.productPrice);
        dto.setProductUrl(this.productUrl);

        return dto;
    }
}
