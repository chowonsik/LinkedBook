package com.linkedbook.service;

import com.linkedbook.dto.alert.AlertInput;
import com.linkedbook.dto.alert.AlertSearchInput;
import com.linkedbook.dto.alert.AlertSearchOutput;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;

public interface AlertService {
    Response<Object> createAlertInfo(AlertInput alertInput);
    Response<Object> updateAlertStatus(int id);
    PageResponse<AlertSearchOutput> getAlertList(AlertSearchInput alertSearchInput);
    Response<Object> checkNewAlert();
}
