package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Cart;
import com.ecommerce.project.model.CartItem;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.repositories.CartItemRepository;
import com.ecommerce.project.repositories.CartRepository;
import com.ecommerce.project.repositories.ProductRepository;
import com.ecommerce.project.repositories.UserRepository;
import com.ecommerce.project.util.AuthUtil;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService{

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;
    private final AuthUtil authUtil;


    public CartServiceImpl(UserRepository userRepository, CartRepository cartRepository, CartItemRepository cartItemRepository, ProductRepository productRepository, ModelMapper modelMapper, AuthUtil authUtil) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
        this.authUtil = authUtil;
    }


    @Override
    public CartDTO addProductToCart(Long productId, Integer quantity) {
        String emailId = authUtil.loggedInEmail();

        User user =userRepository.findByEmail(emailId).orElseThrow(()->
                new RuntimeException("User not found!"));

        Cart cart = cartRepository.findByUserEmail(emailId).orElseGet(()-> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
            });

        Product product = productRepository.findById(productId).orElseThrow(()->
        new ResourceNotFoundException("Product", "productId", productId));

        if (product.getQuantity()<quantity){
            throw new APIException("Not enough stock available");
        }

        cartItemRepository.findByCart_CartIdAndProduct_ProductId(cart.getCartId(), productId)
                .ifPresentOrElse(item ->{
                        item.setQuantity(item.getQuantity() + quantity);
                        cartItemRepository.save(item);
                        },()->{
                    CartItem cartItem = new CartItem();
                    cartItem.setCart(cart);
                    cartItem.setProduct(product);
                    cartItem.setQuantity(quantity);

                    cart.getCartItems().add(cartItem);
                    cartItemRepository.save(cartItem);
                });

        double totalPrice = cart.getCartItems().stream()
                .mapToDouble(i-> i.getProduct().getPrice()*i.getQuantity())
                .sum();

        cart.setTotalPrice(totalPrice);
        cartRepository.save(cart);

        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

        List<ProductDTO> products = cart.getCartItems().stream()
                .map(item -> {
                    ProductDTO dto = modelMapper.map(item.getProduct(), ProductDTO.class);
                    dto.setQuantity(item.getQuantity());
                    return dto;
                })
                .toList();

        cartDTO.setProducts(products);
        return cartDTO;
    }

    @Override
    public List<CartDTO> getAllCarts() {

        return List.of();
    }

    @Override
    public CartDTO getCart() {
     String emailId = authUtil.loggedInEmail();

     User user =  userRepository.findByEmail(emailId).orElseThrow(()->
             new ResourceNotFoundException("User", "emailId" , emailId));

     Cart cart = cartRepository.findByUserEmail(emailId).orElseThrow(()->
             new ResourceNotFoundException("Cart", "emailId", emailId));

     CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

        if (cart.getCartItems().isEmpty()) {
            cart.setTotalPrice(0.0);
        }

//                  Map items → products
         List<ProductDTO> products = cart.getCartItems().stream()
                 .map(item -> {
                     ProductDTO dto = modelMapper.map(item.getProduct(), ProductDTO.class);
                     dto.setQuantity(item.getQuantity()); // 🔥 important
                     return dto;
                 })
                 .toList();

         cartDTO.setProducts(products);

         return cartDTO;
    }

    @Override
    public CartDTO updateProductQuantityInCart(Long productId, Integer quantity) {
        String emailId = authUtil.loggedInEmail();

        User user = userRepository.findByEmail(emailId).orElseThrow(()->
                new ResourceNotFoundException("User", "email", emailId));

        Cart cart =cartRepository.findByUserEmail(emailId).orElseThrow(()->
                new ResourceNotFoundException("Cart", "email", emailId));

        Product product = productRepository.findById(productId).orElseThrow(()->
                new ResourceNotFoundException("Product", "productId", productId));

        CartItem cartItem = cartItemRepository.findByCart_CartIdAndProduct_ProductId(cart.getCartId(), productId)
                .orElseThrow(()->
                        new ResourceNotFoundException("CartItem", "productId", productId));

        if (product.getQuantity()<quantity){
            throw new APIException("Not enough stock available");
        }
        if (quantity<=0){
            cart.getCartItems().remove(cartItem);
            cartItemRepository.delete(cartItem);
        }else {
            cartItem.setQuantity(quantity);
            cartItemRepository.save(cartItem);
        }

        double total = cart.getCartItems().stream()
                .mapToDouble(i -> i.getProduct().getPrice() * i.getQuantity())
                .sum();

        cart.setTotalPrice(total);
        cartRepository.save(cart);

        //  Convert to DTO
        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

        List<ProductDTO> products = cart.getCartItems().stream()
                .map(item -> {
                    ProductDTO dto = modelMapper.map(item.getProduct(), ProductDTO.class);
                    dto.setQuantity(item.getQuantity());
                    return dto;
                })
                .toList();

        cartDTO.setProducts(products);

        return cartDTO;
    }

    @Override
    public CartDTO removeProductFromCart(Long productId) {

        String emailId = authUtil.loggedInEmail();

        User user = userRepository.findByEmail(emailId).orElseThrow(()->
                new ResourceNotFoundException("User", "email", emailId));

        Cart cart = cartRepository.findByUserEmail(emailId).orElseThrow(()->
                new ResourceNotFoundException("Cart", "cart", emailId));

        CartItem cartItem =cartItemRepository.findByCart_CartIdAndProduct_ProductId(cart.getCartId(), productId)
                .orElseThrow(()-> new ResourceNotFoundException("Product", "ProductId", productId));


        cart.getCartItems().remove(cartItem);
        cartItem.setCart(null);
        cartItemRepository.delete(cartItem);


        double total = cart.getCartItems().stream()
                .mapToDouble(i -> i.getProduct().getPrice() * i.getQuantity())
                .sum();

        cartItemRepository.save(cartItem);
        cart.setTotalPrice(total);

        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

        List<ProductDTO> products = cart.getCartItems().stream()
                .map(item -> {
                    ProductDTO dto = modelMapper.map(item.getProduct(), ProductDTO.class);
                    dto.setQuantity(item.getQuantity());
                    return dto;
                })
                .toList();

        cartDTO.setProducts(products);

        return cartDTO;
    }
}
