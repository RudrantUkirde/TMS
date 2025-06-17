package com.example.TMS.service.admin;


import com.example.TMS.dto.CommentDto;
import com.example.TMS.dto.TaskDto;
import com.example.TMS.dto.UserDto;
import com.example.TMS.entity.Comment;
import com.example.TMS.entity.Task;
import com.example.TMS.entity.User;
import com.example.TMS.enums.TaskStatus;
import com.example.TMS.enums.UserRole;
import com.example.TMS.repositories.CommentRepository;
import com.example.TMS.repositories.TaskRepository;
import com.example.TMS.repositories.UserRepository;
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
public class AdminServiceImpl  implements AdminService{

    private final UserRepository userRepository;

    private final TaskRepository taskRepository;

    private final CommentRepository commentRepository;

    private final JwtUtil jwtUtil;

    @Override
    public List<UserDto> getUsers() {

        System.out.println("Get method reached");
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getUserRole()== UserRole.EMPLOYEE)
                .map(User::getUserDto)
                .collect(Collectors.toList());
    }


    @Override
    public TaskDto createTask(TaskDto taskDto) {

        Optional<User> user=userRepository.findById(taskDto.getEmployeeId());

        if(user.isPresent()){
            Task task=new Task();

            task.setTitle(taskDto.getTitle());
            task.setDescription(taskDto.getDescription());
            task.setPriority(taskDto.getPriority());
            task.setDueDate(taskDto.getDueDate());
            task.setTaskStatus(TaskStatus.INPROGRESS);
            task.setUser(user.get());

            return taskRepository.save(task).getTaskDto();

        }
        return null;
    }

    @Override
    public List<TaskDto> getAllTask() {
        return taskRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Task::getDueDate).reversed())
                .map(Task::getTaskDto)
                .collect(Collectors.toList());


    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public TaskDto updateTask(Long id, TaskDto taskDto) {
        Optional<Task> opTask=taskRepository.findById(id);
        Optional<User> optionalUser=userRepository.findById(taskDto.getEmployeeId());

        if(opTask.isPresent() && optionalUser.isPresent()){
            Task existingTask=opTask.get();

            existingTask.setTitle(taskDto.getTitle());
            existingTask.setDescription(taskDto.getDescription());
            existingTask.setDueDate(taskDto.getDueDate());
            existingTask.setPriority(taskDto.getPriority());
            existingTask.setTaskStatus(mapStringToTaskStatus(String.valueOf(taskDto.getTaskStatus())));
            existingTask.setUser(optionalUser.get());
            return taskRepository.save(existingTask).getTaskDto();
        }

        return null;
    }

    @Override
    public List<TaskDto> searchTaskByTitle(String title) {
        return taskRepository.findAllByTitleContaining(title)
                .stream()
                .sorted(Comparator.comparing(Task::getDueDate).reversed())
                .map(Task::getTaskDto)
                .toList();
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
