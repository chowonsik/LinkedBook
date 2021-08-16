package com.linkedbook.service;

import com.linkedbook.dto.report.ReportInput;
import com.linkedbook.response.Response;

public interface ReportService {
    Response<Object> createReport(ReportInput reportInput);
}
