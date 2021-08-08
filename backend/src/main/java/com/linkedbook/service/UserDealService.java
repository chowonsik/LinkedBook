package com.linkedbook.service;

import com.linkedbook.dto.userDeal.createUserDeal.CreateUserDealInput;
import com.linkedbook.dto.userDeal.selectUserDeal.SelectUserDealInput;
import com.linkedbook.dto.userDeal.selectUserDeal.SelectUserDealOutput;
import com.linkedbook.dto.userDeal.updateUserDeal.UpdateUserDealInput;
import com.linkedbook.response.Response;

import org.springframework.data.domain.Page;
import com.linkedbook.response.Response;

public interface UserDealService {

    Response<Object> createUserDeal(CreateUserDealInput createUserDeal);

    Response<Page<SelectUserDealOutput>> selectUserDeal(SelectUserDealInput selectUserDealInput);

    Response<Object> updateUserDeal(UpdateUserDealInput updateUserDeal, int userDealId);
}
