package com.example.TMS.controller.employee;


import com.example.TMS.dto.CommentDto;
import com.example.TMS.dto.TaskDto;
import com.example.TMS.service.employee.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/employeeTasks")
    public ResponseEntity<List<TaskDto>> getTaskByUserId(){

        return ResponseEntity.ok(employeeService.getTaskByUserId());
    }

    @GetMapping("updateStatus/{id}/{status}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long id,@PathVariable String status){
        TaskDto updatedTask=employeeService.updateTask(id,status);

        if(updatedTask==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(updatedTask);
    }

    @GetMapping("/getTask/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Long id){

        return ResponseEntity.ok(employeeService.getTaskById(id));
    }

    @PostMapping("/comment/{taskId}")
    public ResponseEntity<CommentDto> createComment(@PathVariable Long taskId, @RequestParam String content){

        CommentDto commentDto = employeeService.createComment(taskId,content);

        if(commentDto == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(commentDto);
    }

    @GetMapping("/getAllComments/{taskId}")
    public ResponseEntity<List<CommentDto>> getCommentsByTaskId(@PathVariable Long taskId){

        return ResponseEntity.ok(employeeService.getCommentsByTaskId(taskId));
    }
}
