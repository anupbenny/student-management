package com.sms.app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sms.app.model.Student;
import com.sms.app.service.StudentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping
    public ResponseEntity<Student> addStudent(@Valid @RequestBody Student payload) {
        Student student = studentService.addStudent(payload);
        return ResponseEntity.status(201).body(student);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @Valid @RequestBody Student payload) {
        Student student = studentService.updateStudent(id, payload);
        return ResponseEntity.ok(student);
    }
    
    /*
    @PostMapping("/{studentId}/enroll/{courseId}")
    public ResponseEntity<Student> enroll(@PathVariable Long studentId, @PathVariable Long courseId) {
        Student updatedStudent = studentService.enroll(studentId, courseId);
        return ResponseEntity.ok(updatedStudent);
    }*/

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
