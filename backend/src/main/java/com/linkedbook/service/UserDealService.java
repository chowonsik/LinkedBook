package com.linkedbook.service;

import com.linkedbook.dto.userDeal.createUserDeal.CreateUserDealInput;
import com.linkedbook.response.Response;

import java.util.List;

public interface UserDealService {
    Response<Object> createUserDeal(CreateUserDealInput createUserDeal);
}
