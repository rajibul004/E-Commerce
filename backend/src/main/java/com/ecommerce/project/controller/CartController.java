package com.ecommerce.project.controller;

import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.CartItemDTO;
import com.ecommerce.project.service.CartServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class CartController {

    @Autowired
    private CartServiceImpl cartService;

    @PostMapping("/carts/items")
    public ResponseEntity<CartDTO> addProductToCart(@RequestBody CartItemDTO cartItemDTO){
        CartDTO cartDTO = cartService.addProductToCart(cartItemDTO.getProductId(),cartItemDTO.getQuantity());
        return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.CREATED);
    }

    @GetMapping("/cart")
    public ResponseEntity<CartDTO> getCart() {
        CartDTO cart = cartService.getCart();
        return ResponseEntity.ok(cart);
    }


    @PutMapping("/cart/products/{productId}")
    public ResponseEntity<CartDTO> updateProductQuantityInCart
            (@PathVariable Long productId, @RequestParam Integer quantity){
        CartDTO cart = cartService.updateProductQuantityInCart(productId, quantity);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/cart/products/{productId}")
    public ResponseEntity<CartDTO> removeProductFromCart (@PathVariable Long productId){
        CartDTO cart = cartService.removeProductFromCart(productId);
        return ResponseEntity.ok(cart);
    }

//    @DeleteMapping("/carts/{cartId}/product/{productId}")
//    public ResponseEntity<String> deleteProductFromCart(@PathVariable Long cartId,
//                                                        @PathVariable Long productId) {
//        String status = cartService.deleteProductFromCart(cartId, productId);
//
//        return new ResponseEntity<String>(status, HttpStatus.OK);
//    }
}
