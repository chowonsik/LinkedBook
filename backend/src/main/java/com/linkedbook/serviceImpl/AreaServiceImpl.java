package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.AreaRepository;
import com.linkedbook.dto.area.selectArea.SelectAreaInput;
import com.linkedbook.dto.area.selectArea.SelectAreaOutput;
import com.linkedbook.entity.AreaDB;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.AreaService;
import com.linkedbook.service.JwtService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.linkedbook.response.ResponseStatus.*;

import java.util.List;

@Service("AreaService")
@AllArgsConstructor
@Slf4j
public class AreaServiceImpl implements AreaService {

    private final AreaRepository areaRepository;
    private final JwtService jwtService;

    @Override
    public PageResponse<SelectAreaOutput> selectAreaList(SelectAreaInput selectAreaInput) {
        // 값 형식 체크

        Page<SelectAreaOutput> areaList;
        Pageable pageable;
        try {
            pageable = PageRequest.of(selectAreaInput.getPage(), selectAreaInput.getSize());
            areaList = areaRepository.findByArea(selectAreaInput.getSearch(), pageable);

        } catch (Exception e) {
            log.error("[reports/post] database error", e);
            return new PageResponse<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new PageResponse<>(areaList, CREATED_REPORT);
    }

}
