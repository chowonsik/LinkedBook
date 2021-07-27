package com.linkedbook.service;

import com.linkedbook.model.Role;

public interface JwtService {
    <T> String createAccessToken(Role role, int userId);
    String getAccessToken();
    int getUserId();
}
