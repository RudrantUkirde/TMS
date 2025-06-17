package com.example.TMS.service.admin;

import com.example.TMS.dto.CommentDto;
import com.example.TMS.dto.TaskDto;
import com.example.TMS.dto.UserDto;
import com.example.TMS.entity.User;

import java.util.List;
import java.util.Optional;

public interface AdminService {

    List<UserDto> getUsers();

    TaskDto createTask(TaskDto taskDto);

    List<TaskDto> getAllTask();

    void deleteTask(Long id);

    TaskDto updateTask(Long id,TaskDto taskDto);

    List<TaskDto> searchTaskByTitle(String title);

    CommentDto createComment(Long taskId,String content);

    List<CommentDto> getCommentsByTaskId(Long id);

    TaskDto getTaskById(Long id);
}
