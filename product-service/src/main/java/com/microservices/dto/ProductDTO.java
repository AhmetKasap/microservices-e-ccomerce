package com.microservices.dto;

import com.microservices.model.ProductEntity;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class ProductDTO {
    private UUID userId;
    private UUID productId;

    @NotNull(message = "product name cannot be null")
    private String productName;

    private String productDescription;

    @NotNull(message = "product price cannot be null")
    private double productPrice;

    private String productUrl;

    public ProductEntity toEntity() {
        ProductEntity entity = new ProductEntity();
        entity.userId = this.userId;
        entity.productName = this.productName;
        entity.productDescription = this.productDescription;
        entity.productPrice = this.productPrice;
        entity.productUrl = this.productUrl;
        return entity;
    }
}
