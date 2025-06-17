package com.example.TMS.service.employee;

import com.example.TMS.dto.CommentDto;
import com.example.TMS.dto.TaskDto;

import java.util.List;

public interface EmployeeService {

    List<TaskDto> getTaskByUserId();

    TaskDto updateTask(Long id,String status);

    CommentDto createComment(Long taskId, String content);

    List<CommentDto> getCommentsByTaskId(Long id);

    TaskDto getTaskById(Long id);

}
