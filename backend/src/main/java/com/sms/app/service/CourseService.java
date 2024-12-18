package com.sms.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;

import com.sms.app.model.Course;
import com.sms.app.repository.CourseRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final Validator courseValidator;


    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public Course addCourse(Course course, BindingResult bindingResult) {
    	courseValidator.validate(course, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new IllegalArgumentException("Invalid course data");
        }

        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course courseDetails, BindingResult bindingResult) {
        Optional<Course> course = courseRepository.findById(id);
        courseValidator.validate(course, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new IllegalArgumentException("Invalid course data");
        }
        if (course.isPresent()) {
            Course existingCourse = course.get();
            existingCourse.setName(courseDetails.getName());
            return courseRepository.save(existingCourse);
        }
        return null;
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}
