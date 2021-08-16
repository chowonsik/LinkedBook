package com.linkedbook.service;

import com.linkedbook.entity.UserDB;

import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

public interface JwtService {
    <T> String createAccessToken(int userId);

    String getAccessToken();

    int getUserId();

    UserDB getUserDB();

    UserDB getChatUserDB(String accessToken);

    Authentication getAuthentication(String token);

    boolean validateToken(String jwtToken);

    Jws<Claims> getClaims(String jwtToken);
}