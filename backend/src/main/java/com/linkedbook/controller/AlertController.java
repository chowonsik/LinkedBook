package com.linkedbook.controller;

import com.linkedbook.dto.alert.AlertSearchInput;
import com.linkedbook.dto.alert.AlertSearchOutput;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.AlertService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/alerts")
@RequiredArgsConstructor
@Slf4j
public class AlertController {

    private final AlertService alertService;

    /**
     * 알람 상태 수정 API
     * [PATCH] /alerts/{id}
     * @return Response<Object>
     */
    // Path-Variable
    @PatchMapping("/{id}")
    public Response<Object> updateAlertStatus(@PathVariable("id") int id) {
        log.info("[POST] /alerts");
        return alertService.updateAlertStatus(id);
    }

    /**
     * 알람 정보 조회 API
     * [GET] /alerts?type={type}
     * @return PageResponse<AlertSearchOutput>
     */
    // Params
    @GetMapping
    public PageResponse<AlertSearchOutput> getAlertList(AlertSearchInput alertSearchInput) {
        log.info("[GET] /alerts");
        return alertService.getAlertList(alertSearchInput);
    }

    /**
     * 새로운 알람 여부 조회 API
     * [GET] /alerts/check
     * @return Response<Object>
     */
    // Params
    @GetMapping("/check")
    public Response<Object> checkNewAlert() {
        log.info("[GET] /alerts/check");
        return alertService.checkNewAlert();
    }
}
