package com.ecommerce.project.repositories;

import com.ecommerce.project.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    // Find cart item
    Optional<CartItem> findByCart_CartIdAndProduct_ProductId(Long cartId, Long productId);
    // Delete one item
//    void deleteByCart_IdAndProduct_Id(Long cartId, Long productId);

    // Clear cart
//    void deleteByCart_Id(Long cartId);
}