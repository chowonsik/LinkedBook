package com.linkedbook.controller;

import com.linkedbook.dto.alert.AlertInput;
import com.linkedbook.response.Response;
import com.linkedbook.service.AlertService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/alerts")
@AllArgsConstructor
@Slf4j
public class AlertController {

    private final AlertService alertService;

    /**
     * 알람 정보 생성 API
     * [POST] /alerts
     * @return Response<Object>
     */
    // Body
    @ResponseBody
    @PostMapping
    public Response<Object> createAlertInfo(@RequestBody AlertInput alertInput) {
        log.info("[POST] /alerts");
        return alertService.createAlertInfo(alertInput);
    }
}
