package com.linkedbook.service;

import java.util.List;

import com.linkedbook.dto.userArea.createUserArea.CreateUserAreaInput;
import com.linkedbook.dto.userArea.selectUserArea.SelectUserAreaOutput;
import com.linkedbook.response.Response;

public interface UserAreaService {
    Response<Object> createUserArea(CreateUserAreaInput bookInfoInput);

    Response<List<SelectUserAreaOutput>> selectUserArea();

}
