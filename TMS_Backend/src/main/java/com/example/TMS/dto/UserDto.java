package com.example.TMS.dto;


import com.example.TMS.entity.User;
import com.example.TMS.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {

    private Long id;

    private String name;

    private String email;

    private String password;

    private UserRole userRole;

}
