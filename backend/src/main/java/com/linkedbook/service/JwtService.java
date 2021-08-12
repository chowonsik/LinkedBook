package com.linkedbook.service;

import com.linkedbook.entity.UserDB;
import com.linkedbook.model.Role;

import org.springframework.security.core.Authentication;

public interface JwtService {
    <T> String createAccessToken(Role role, int userId);

    String getAccessToken();

    int getUserId();

    UserDB getUserDB();

    Authentication getAuthentication(String token);

    boolean validateToken(String jwtToken);
}