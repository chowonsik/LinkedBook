package com.linkedbook.controller;

import com.linkedbook.dto.area.selectArea.SelectAreaInput;
import com.linkedbook.dto.area.selectArea.SelectAreaOutput;
import com.linkedbook.response.PageResponse;
import com.linkedbook.service.AreaService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/areas")
@AllArgsConstructor
@Slf4j
public class AreaController {

    private final AreaService areaService;

    /**
     * 지역 조회 API [GET] /areas
     * 
     * @return PageResponse<SelectAreaOutput>
     */
    // Params
    @ResponseBody
    @GetMapping
    public PageResponse<SelectAreaOutput> getFollowList(SelectAreaInput selectAreaInput) {
        log.info("[GET] /areas");
        return areaService.selectAreaList(selectAreaInput);
    }
}
