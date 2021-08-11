package com.linkedbook.serviceImpl;

import com.linkedbook.entity.AreaDB;
import com.linkedbook.entity.UserAreaDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.Response;
import com.linkedbook.service.JwtService;
import com.linkedbook.service.UserAreaService;
import com.linkedbook.dao.UserRepository;
import com.linkedbook.dao.AreaRepository;
import com.linkedbook.dao.UserAreaRepository;
import com.linkedbook.dto.userArea.createUserArea.CreateUserArea;
import com.linkedbook.dto.userArea.createUserArea.CreateUserAreaInput;
import com.linkedbook.dto.userArea.selectUserArea.SelectUserAreaOutput;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.linkedbook.response.ResponseStatus.*;

@Service("UserAreaService")
@AllArgsConstructor
public class UserAreaServiceImpl implements UserAreaService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final UserAreaRepository userAreaRepository;
    @Autowired
    private final AreaRepository areaRepository;
    @Autowired
    private final JwtService jwtService;

    @Override
    @Transactional
    public Response<Object> createUserArea(CreateUserAreaInput createUserAreaInput) {
        // 1. 값 형식 체크
        if (createUserAreaInput == null)
            return new Response<>(NO_VALUES);

        try {

            UserDB user = userRepository.findById(jwtService.getUserId()).orElse(null);

            if (user == null) {
                return new Response<>(BAD_ID_VALUE);
            }

            List<CreateUserArea> userArea = createUserAreaInput.getArea();
            List<UserAreaDB> userAreas = user.getUserAreaDBs();

            // 기존의 유저 지역들을 지워준다.
            for (UserAreaDB userAreaDB : userAreas) {
                userAreaRepository.deleteById(userAreaDB.getId());
            }

            for (CreateUserArea createUserArea : userArea) {
                AreaDB area = areaRepository.findById(createUserArea.getAreaId()).orElse(null);

                // 해당 지역 번호가 없을 때
                if (area == null) {
                    return new Response<>(BAD_AREA_VALUE);
                }

                UserAreaDB userAreaDB = UserAreaDB.builder().user(user).area(area).orders(createUserArea.getOrders())
                        .build();
                userAreaRepository.save(userAreaDB);
            }

        } catch (Exception e) {
            return new Response<>(DATABASE_ERROR);
        }

        return new Response<>(null, CREATED_USERAREA);
    }

    @Override
    public Response<List<SelectUserAreaOutput>> selectUserArea() {
        List<SelectUserAreaOutput> selectUserAreaOutput;
        try {
            selectUserAreaOutput = userAreaRepository.findByUserId(jwtService.getUserId());
        } catch (Exception e) {
            return new Response<>(DATABASE_ERROR);
        }

        return new Response<>(selectUserAreaOutput, SUCCESS_SELECT_USERAREA);
    }

}
