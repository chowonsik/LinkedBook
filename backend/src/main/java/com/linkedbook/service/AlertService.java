package com.linkedbook.service;

import com.linkedbook.dto.alert.AlertInput;
import com.linkedbook.response.Response;

public interface AlertService {
    Response<Object> createAlertInfo(AlertInput alertInput);
}
