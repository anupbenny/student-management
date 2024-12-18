package com.sms.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sms.app.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
}