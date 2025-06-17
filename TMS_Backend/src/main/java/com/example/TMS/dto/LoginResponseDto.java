package com.example.TMS.dto;


import com.example.TMS.enums.UserRole;
import lombok.Data;

@Data
public class LoginResponseDto {

    private String jwt;

    private Long userId;

    private UserRole userRole;
}
