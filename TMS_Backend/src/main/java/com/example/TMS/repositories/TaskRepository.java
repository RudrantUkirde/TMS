package com.example.TMS.repositories;

import com.example.TMS.dto.TaskDto;
import com.example.TMS.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {

    List<Task> findAllByTitleContaining(String title);

    List<Task> findAllByUserId(Long id);
}
