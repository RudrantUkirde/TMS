package com.example.TMS.service.auth;

import com.example.TMS.dto.AdminDto;
import com.example.TMS.dto.SignUpRequestDto;
import com.example.TMS.dto.UserDto;

public interface AuthService {

    UserDto signupUser(SignUpRequestDto signUpRequestDto);

    Boolean verifyUserWithEmail(String email);

    Boolean createNewAdmin(AdminDto adminDto);
}
