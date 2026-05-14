package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.*;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.OrderDTO;
import com.ecommerce.project.payload.OrderItemDTO;
import com.ecommerce.project.repositories.AddressRepository;
import com.ecommerce.project.repositories.OrderRepository;
import com.ecommerce.project.repositories.UserRepository;
import com.ecommerce.project.util.AuthUtil;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final AuthUtil authUtil;
    private final AddressRepository addressRepository;
    private final CartService cartService;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;


    public OrderServiceImpl(AuthUtil authUtil, AddressRepository addressRepository, CartService cartService, ModelMapper modelMapper, UserRepository userRepository, OrderRepository orderRepository) {
        this.authUtil = authUtil;
        this.addressRepository = addressRepository;
        this.cartService = cartService;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }


    @Override
    public OrderDTO placeOrder(Long addressId) {
        String email = authUtil.loggedInEmail();
         User user = userRepository.findByEmail(email).orElseThrow(()->
                 new ResourceNotFoundException("User", "email", email)         );
        CartDTO cart = cartService.getCart();

        if (cart.getProducts().isEmpty()){
            throw new APIException("Cart is empty");
        }
        Address address = addressRepository.findById(addressId).orElseThrow(()->
                        new ResourceNotFoundException("Address", "addressId", addressId)
        );
        Order order = new Order();
        order.setEmail(email);
        order.setAddress(address);
        order.setOrderDate(LocalDate.now());
        order.setOrderStatus(OrderStatus.PLACED);

        order.setTotalAmount(cart.getTotalPrice());
        Order saveOrder = orderRepository.save(order);

        return modelMapper.map(saveOrder,OrderDTO.class);
    }

//    @Override
//    @Transactional
//    public OrderDTO placeOrder(String emailId, Long addressId, String paymentMethod) {
//
//        Cart cart = cartRepository.findCartByEmail(emailId);
//        if (cart == null || cart.getCartItems().isEmpty()) {
//            throw new APIException("Cart is empty");
//        }
//
//        Address address = addressRepository.findById(addressId)
//                .orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));
//
//        if (!address.getUser().getEmail().equals(emailId)) {
//            throw new APIException("Address does not belong to user");
//        }
//
//        Order order = new Order();
//        order.setEmail(emailId);
//        order.setOrderDate(LocalDate.now());
//        order.setTotalAmount(cart.getTotalPrice());
//        order.setOrderStatus("PLACED");
//        order.setAddress(address);
//
//        Order savedOrder = orderRepository.save(order);
//
//        List<OrderItem> orderItems = new ArrayList<>();
//
//        for (CartItem cartItem : cart.getCartItems()) {
//
//            Product product = cartItem.getProduct();
//
//            if (product.getQuantity() < cartItem.getQuantity()) {
//                throw new APIException("Insufficient stock: " + product.getProductName());
//            }
//
//            product.setQuantity(product.getQuantity() - cartItem.getQuantity());
//            productRepository.save(product);
//
//            OrderItem orderItem = new OrderItem();
//            orderItem.setProduct(product);
//            orderItem.setQuantity(cartItem.getQuantity());
//            orderItem.setOrderedProductPrice(cartItem.getProductPrice());
//            orderItem.setOrder(savedOrder);
//
//            orderItems.add(orderItem);
//        }
//
//        orderItems = orderItemRepository.saveAll(orderItems);
//
//        // clear cart AFTER loop
//        cart.getCartItems().clear();
//        cartRepository.save(cart);
//
//        // DTO mapping
//        OrderDTO orderDTO = modelMapper.map(savedOrder, OrderDTO.class);
//
//        List<OrderItemDTO> itemDTOs = orderItems.stream()
//                .map(item -> modelMapper.map(item, OrderItemDTO.class))
//                .toList();
//
//        orderDTO.setOrderItems(itemDTOs);
//        orderDTO.setAddressId(addressId);
//
//        return orderDTO;
//    }

//    @Override
//    public List<OrderDTO> getOrdersByUser() {
//
//        List<Order> orders = orderRepository.find();
//
//        if (orders.isEmpty()) {
//            throw new APIException("Orders are empty");
//        }
//
//
//        return orders.stream()
//                .map(this::convertToDTO)
//                .toList();
//    }
    private OrderDTO convertToDTO(Order order) {

        OrderDTO dto = modelMapper.map(order, OrderDTO.class);

        List<OrderItemDTO> items = order.getOrderItems().stream()
                .map(item -> modelMapper.map(item, OrderItemDTO.class))
                .toList();

        dto.setOrderItems(items);

        if (order.getAddress() != null) {
            dto.setAddressId(order.getAddress().getAddressId());
        }

        return dto;
    }



}
