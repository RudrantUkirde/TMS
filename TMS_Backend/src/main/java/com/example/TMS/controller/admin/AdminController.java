package com.example.TMS.controller.admin;


import com.example.TMS.dto.CommentDto;
import com.example.TMS.dto.TaskDto;
import com.example.TMS.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<?> getUsers(){

        System.out.println("request reached");
        return ResponseEntity.ok(adminService.getUsers());
    }

    @PostMapping("/createTask")
    public ResponseEntity<?> createTask(@RequestBody TaskDto taskDto){

        TaskDto createdTask= adminService.createTask(taskDto);

        if(createdTask == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @GetMapping("/getAllTasks")
    public ResponseEntity<?> getAllTask(){
        return ResponseEntity.ok(adminService.getAllTask());
    }


    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id){

        adminService.deleteTask(id);

        return ResponseEntity.ok(null);

    }

    @PutMapping("/updateTask/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id,@RequestBody TaskDto taskDto){
        TaskDto updatedTask=adminService.updateTask(id,taskDto);
        if (updatedTask==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedTask);
    }

    @GetMapping("/searchTask/{title}")
    public ResponseEntity<List<TaskDto>> searchByTitle(@PathVariable String title){

        return ResponseEntity.ok(adminService.searchTaskByTitle(title));
    }

    @GetMapping("/getTask/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Long id){

        return ResponseEntity.ok(adminService.getTaskById(id));
    }

    @PostMapping("/comment/{taskId}")
    public ResponseEntity<CommentDto> createComment(@PathVariable Long taskId,@RequestParam String content){

        CommentDto commentDto = adminService.createComment(taskId,content);

        if(commentDto == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(commentDto);
    }

    @GetMapping("/getAllComments/{taskId}")
    public ResponseEntity<List<CommentDto>> getCommentsByTaskId(@PathVariable Long taskId){

        return ResponseEntity.ok(adminService.getCommentsByTaskId(taskId));
    }


}
