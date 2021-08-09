package com.linkedbook.service;

import com.linkedbook.dto.userArea.createUserArea.CreateUserAreaInput;
import com.linkedbook.response.Response;

public interface UserAreaService {
    Response<Object> createUserArea(CreateUserAreaInput bookInfoInput);

}
