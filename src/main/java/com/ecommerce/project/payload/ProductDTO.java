package com.ecommerce.project.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long productId;
    private String productName;

    @JsonProperty("image")
    private String imageBase64; // Changed from image to imageBase64 for Base64-encoded image

    private String description;
    private Integer quantity;
    private double price;
    private double discount;
    private double specialPrice;
}