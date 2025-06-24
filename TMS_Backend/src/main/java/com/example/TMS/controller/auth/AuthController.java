package com.example.TMS.controller.auth;


import com.example.TMS.dto.*;
import com.example.TMS.entity.User;
import com.example.TMS.repositories.UserRepository;
import com.example.TMS.service.auth.AuthService;
import com.example.TMS.service.jwt.UserService;
import com.example.TMS.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    private final UserRepository  userRepository;

    private final JwtUtil jwtUtil;

    private final UserService userService;

    private final AuthenticationManager authenticationManager;


    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto signUpRequestDto){

        if(authService.verifyUserWithEmail(signUpRequestDto.getEmail())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("User Already Exist with this email");
        }

        UserDto createdUserDto=authService.signupUser(signUpRequestDto);

        if(createdUserDto == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User Not Created");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUserDto);
    }


    @PostMapping("/login")
    public LoginResponseDto Login(@RequestBody LoginRequestDto loginRequestDto){

        try{

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(),loginRequestDto.getPassword()));

        }catch (BadCredentialsException e){

            throw new BadCredentialsException("Incorrect Username Password");
        }

        final UserDetails userDetails=userService.userDetailsService().loadUserByUsername(loginRequestDto.getEmail());

        Optional<User> optionalUser=userRepository.findFirstByEmail(loginRequestDto.getEmail());

        final String jwtToken=jwtUtil.generateToken(userDetails);

        LoginResponseDto loginResponseDto=new LoginResponseDto();

        if(optionalUser.isPresent()){
            loginResponseDto.setJwt(jwtToken);
            loginResponseDto.setUserId(optionalUser.get().getId());
            loginResponseDto.setUserRole(optionalUser.get().getUserRole());
        }

        return loginResponseDto;

    }

    @PostMapping("/createAdmin")
    public ResponseEntity<?> createNewAdmin(@RequestBody AdminDto adminDto){

        if(authService.createNewAdmin(adminDto)){
            return ResponseEntity.status(HttpStatus.CREATED).body("Admin created successfully!!");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exist");
    }
}
