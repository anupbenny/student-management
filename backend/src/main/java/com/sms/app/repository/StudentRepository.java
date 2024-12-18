package com.sms.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sms.app.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
