package com.linkedbook.service;

import com.linkedbook.dto.alert.AlertSearchInput;
import com.linkedbook.dto.alert.AlertSearchOutput;
import com.linkedbook.dto.alert.AlertStatus;
import com.linkedbook.entity.*;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;

import java.util.List;

public interface AlertService {
    boolean createAlertInfo(AlertDB inputAlertDB);
    boolean createAlertInfo(List<AlertDB> inputAlertDBList);
    Response<Object> updateAlertStatus(int id);
    PageResponse<AlertSearchOutput> getAlertList(AlertSearchInput alertSearchInput);
    Response<Object> checkNewAlert();
    boolean checkDuplicateUncheckedAlert(AlertStatus type, CommentDB comment, DealDB deal, UserDealDB eval,
                                         UserDB fromUser, UserDB toUser);
}
