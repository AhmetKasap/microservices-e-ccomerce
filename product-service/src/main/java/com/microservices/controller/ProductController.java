package com.microservices.controller;

import com.microservices.dto.ProductDTO;
import com.microservices.service.ProductService;
import com.microservices.service.S3Service;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/products")
public class ProductController {



    @Autowired
    private ProductService productService;

    private final S3Service s3Service;
    public ProductController(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    //@RequestHeader("user-id") UUID userId
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestPart("product") ProductDTO productDTO,
                                                    @RequestPart("file") MultipartFile file) throws IOException {
        UUID userId = UUID.fromString("b2a2d65b-0d28-4c88-9c77-8a4a731cfd1e");
        if(userId != null) {
            productDTO.setUserId(userId);
            String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            s3Service.uploadFile(uniqueFileName, file);
            var fileUrl = s3Service.getFileUrl(uniqueFileName);
            productDTO.setProductUrl(fileUrl);
            ProductDTO createdProduct = productService.createProduct(productDTO);
            return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    //@RequestHeader("user-id") UUID userId
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") UUID id) {

        UUID userId = UUID.fromString("b2a2d65b-0d28-4c88-9c77-8a4a731cfd1e");
        if(userId != null) {
            boolean result = productService.deleteProduct(id,userId);

            if(result == true) {
                return new ResponseEntity<>("product deleted", HttpStatus.CREATED);
            }else {
                return new ResponseEntity<>("product not found", HttpStatus.NOT_FOUND);
            }
        }
        else {
            return new ResponseEntity<>("user not found", HttpStatus.NOT_FOUND);
        }


    }

    @GetMapping("/")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> productDTOs = productService.getAllProducts();
        return new ResponseEntity<>(productDTOs, HttpStatus.OK);
    }



    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") UUID id) {
        ProductDTO productDTO = productService.getProductById(id);
        if(productDTO != null) {
            return new ResponseEntity<>(productDTO, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @GetMapping("/users/{id}")
    public ResponseEntity<List<ProductDTO>> getAllProductByUserId(@PathVariable("id") UUID userId) {
        List<ProductDTO> products = productService.getAllProductByUserId(userId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }



    /*


    @PutMapping("/:id")
    public ResponseEntity<ProductDTO> updateProduct(@RequestParam("id") Long id) {

    }


    * */


    //popüler ürünler, kategoriye göre ürünler, query ile üreünler, search vs.




}
