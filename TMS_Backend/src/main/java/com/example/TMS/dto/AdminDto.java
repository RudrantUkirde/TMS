package com.example.TMS.dto;

import com.example.TMS.enums.UserRole;
import lombok.Data;

@Data
public class AdminDto {

    private String name;

    private String email;

    private String password;

    private UserRole userRole;

}
