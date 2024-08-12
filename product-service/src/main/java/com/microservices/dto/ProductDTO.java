package com.microservices.dto;


import com.microservices.model.ProductEntity;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class ProductDTO {
    @NotNull(message = "product name cannot be null")
    public String productName;

    public String productDescription;

    public int productPrice;

    public ProductEntity toEntity() {
        ProductEntity entity = new ProductEntity();
        entity.productName = this.productName;
        entity.productDescription = this.productDescription;
        entity.productPrice = this.productPrice;
        return entity;
    }


}
