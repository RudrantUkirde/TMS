package com.example.TMS.service.employee;


import com.example.TMS.dto.CommentDto;
import com.example.TMS.dto.TaskDto;
import com.example.TMS.entity.Comment;
import com.example.TMS.entity.Task;
import com.example.TMS.entity.User;
import com.example.TMS.enums.TaskStatus;
import com.example.TMS.repositories.CommentRepository;
import com.example.TMS.repositories.TaskRepository;
import com.example.TMS.utils.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{

    private final TaskRepository taskRepository;

    private final JwtUtil jwtUtil;

    private final CommentRepository commentRepository;


    @Override
    public List<TaskDto> getTaskByUserId() {
        User user=jwtUtil.getLoggedInUser();
        if(user != null){

        return taskRepository.findAllByUserId(user.getId())
                    .stream()
                    .sorted(Comparator.comparing(Task::getDueDate).reversed())
                    .map(Task::getTaskDto)
                    .toList();

        }
        throw new EntityNotFoundException("User not found");
    }

    @Override
    public TaskDto updateTask(Long id, String status) {
        Optional<Task> opTask=taskRepository.findById(id);

        if(opTask.isPresent()){

            Task existingTask=opTask.get();

            existingTask.setTaskStatus(mapStringToTaskStatus(status));

           return taskRepository.save(existingTask).getTaskDto();
        }
        throw new EntityNotFoundException("Task Not Found");
    }


    @Override
    public CommentDto createComment(Long taskId, String content) {

        Optional<Task> opTask=taskRepository.findById(taskId);
        User user=jwtUtil.getLoggedInUser();

        if(opTask.isPresent() && user != null){

            Comment comment=new Comment();
            comment.setCreatedAt(new Date());
            comment.setContent(content);
            comment.setTask(opTask.get());
            comment.setUser(user);


            return commentRepository.save(comment).getCommentDto();

        }
        throw new EntityNotFoundException("User Not Found");
    }

    @Override
    public List<CommentDto> getCommentsByTaskId(Long id) {
        return commentRepository.findAllByTaskId(id).stream().map(Comment::getCommentDto).toList();
    }

    @Override
    public TaskDto getTaskById(Long id) {
        Optional<Task> optionalTask=taskRepository.findById(id);

        return optionalTask.map(Task::getTaskDto).orElse(null);
    }


    private TaskStatus mapStringToTaskStatus(String status){

        System.out.println("mapStringStatus method called, Value:"+status);
        System.out.println(status);
        return switch (status){
            case "PENDING" -> TaskStatus.PENDING;
            case "INPROGRESS" -> TaskStatus.INPROGRESS;
            case "COMPLETED" -> TaskStatus.COMPLETED;
            case "DEFERRED" -> TaskStatus.DEFERRED;
            default -> TaskStatus.CANCELLED;
        };
    }
}
