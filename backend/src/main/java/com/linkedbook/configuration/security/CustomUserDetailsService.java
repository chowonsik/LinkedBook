package com.linkedbook.configuration.security;

import com.linkedbook.dao.UserRepository;
import com.linkedbook.dto.common.UserDetail;
import com.linkedbook.entity.UserDB;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDB user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return null;
        }
        return UserDetail.builder().id(user.getId()).user(user).build();
    }

}