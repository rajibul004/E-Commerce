package com.ecommerce.project.controller;

import com.ecommerce.project.model.Order;
import com.ecommerce.project.payload.OrderDTO;
import com.ecommerce.project.payload.OrderRequestDTO;
import com.ecommerce.project.service.AddressService;
import com.ecommerce.project.service.OrderService;
import com.ecommerce.project.service.OrderServiceImpl;
import com.ecommerce.project.util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {


    private final OrderServiceImpl orderService;

    @Autowired
    public OrderController(OrderServiceImpl orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders/")
    public ResponseEntity<OrderDTO> placedOrder(@RequestParam Long addressId){
        OrderDTO order= orderService.placeOrder(addressId);
        return ResponseEntity.ok(order);
    }


//    @PostMapping("/orders")
//    public ResponseEntity<OrderDTO> orderProducts(@PathVariable String paymentMethod, @RequestBody OrderRequestDTO orderRequestDTO) {
//        String emailId = authUtil.loggedInEmail();
//        System.out.println("orderRequestDTO DATA: " + orderRequestDTO);
//        OrderDTO order = orderService.placeOrder(
//                emailId,
//                orderRequestDTO.getAddressId(),
//                orderRequestDTO.getPaymentMethod()
//        );
//        return new ResponseEntity<>(order, HttpStatus.CREATED);
//    }

//    @GetMapping("/orders")
//    public ResponseEntity<OrderDTO> getAllOrders() {
//        String emailId= authUtil.loggedInEmail();
//
//        List<OrderDTO> orderDTOS = orderService.getAllOrders();
//    }

}
