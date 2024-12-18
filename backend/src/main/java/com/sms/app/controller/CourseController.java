package com.sms.app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sms.app.model.Course;
import com.sms.app.service.CourseService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final Validator courseValidator;
    
    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.addValidators(courseValidator);
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @PostMapping
    public ResponseEntity<Course> addCourse(@Valid @RequestBody Course course, BindingResult bindingResult) {
    	if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(null);
        }
        Course savedCourse = courseService.addCourse(course, bindingResult);
        return ResponseEntity.status(201).body(savedCourse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @Valid @RequestBody Course course, BindingResult bindingResult) {
    	if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(null);
        }
        Course updatedCourse = courseService.updateCourse(id, course, bindingResult);
        return ResponseEntity.ok(updatedCourse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}