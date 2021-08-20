package com.linkedbook.controller;

import com.linkedbook.dto.report.ReportInput;
import com.linkedbook.response.Response;
import com.linkedbook.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
@Slf4j
public class ReportController {

    private final ReportService reportService;

    /**
     * 유저 신고 생성 API
     * [POST] /reports
     * @return Response<Object>
     */
    // Body
    @PostMapping
    public Response<Object> createReport(@RequestBody ReportInput reportInput) {
        log.info("[POST] /reports");
        return reportService.createReport(reportInput);
    }
}
