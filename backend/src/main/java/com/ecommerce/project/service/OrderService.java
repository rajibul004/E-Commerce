package com.ecommerce.project.service;

import com.ecommerce.project.model.Order;
import com.ecommerce.project.payload.OrderDTO;

import java.util.List;


public interface OrderService {
    OrderDTO placeOrder(Long Address);
}
