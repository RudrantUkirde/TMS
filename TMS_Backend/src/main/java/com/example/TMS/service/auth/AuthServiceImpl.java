package com.example.TMS.service.auth;


import com.example.TMS.dto.AdminDto;
import com.example.TMS.dto.SignUpRequestDto;
import com.example.TMS.dto.UserDto;
import com.example.TMS.entity.User;
import com.example.TMS.enums.UserRole;
import com.example.TMS.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;

    @PostConstruct
    public void createAdminAccount(){

        Optional<User> optionalUser=userRepository.findByUserRole(UserRole.ADMIN);

        if(optionalUser.isEmpty()){

            User user=new User();
            user.setEmail("admin@gmail.com");
            user.setName("admin");
            user.setPassword(new BCryptPasswordEncoder().encode("Admin@1234"));
            user.setUserRole(UserRole.ADMIN);

            userRepository.save(user);
            System.out.println("ADMIN created successfully");
        }else{
            System.out.println("ADMIN already Exist");
        }
    }

    @Override
    public UserDto signupUser(SignUpRequestDto signUpRequestDto) {
        User user =new User();

        user.setName(signUpRequestDto.getName());
        user.setEmail(signUpRequestDto.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signUpRequestDto.getPassword()));
        user.setUserRole(UserRole.EMPLOYEE);

        User createdUser=userRepository.save(user);

        return createdUser.getUserDto();

    }

    @Override
    public Boolean verifyUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }

    @Override
    public Boolean createNewAdmin(AdminDto adminDto) {

        Optional<User> opUser=userRepository.findFirstByEmail(adminDto.getEmail());

        if(opUser.isEmpty()){

            User user=new User();
            user.setName(adminDto.getName());
            user.setEmail(adminDto.getEmail());
            user.setPassword(new BCryptPasswordEncoder().encode(adminDto.getPassword()));
            user.setUserRole(UserRole.ADMIN);

            userRepository.save(user);
            return true;
        }

        System.out.println("Email already Exist");
        return false;
    }
}
