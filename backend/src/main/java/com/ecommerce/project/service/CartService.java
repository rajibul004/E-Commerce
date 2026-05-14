package com.ecommerce.project.service;

import com.ecommerce.project.payload.CartDTO;

import java.util.List;

public interface CartService {
    CartDTO addProductToCart(Long productId, Integer quantity);

    List<CartDTO> getAllCarts(); // Admin only

    CartDTO getCart();

    CartDTO updateProductQuantityInCart(Long productId, Integer quantity);

    CartDTO removeProductFromCart(Long productId);

}
