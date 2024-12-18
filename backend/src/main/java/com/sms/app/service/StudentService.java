package com.sms.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sms.app.model.Student;
import com.sms.app.repository.StudentRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;
    
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    @Transactional
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    @Transactional
    public Student updateStudent(Long id, @Valid Student studentDetails) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with ID: " + id));

        existingStudent.setGpa(studentDetails.getGpa());

        if (studentDetails.getCourses() != null) {
            existingStudent.setCourses(studentDetails.getCourses());
        }

        return studentRepository.save(existingStudent);
    }

    @Transactional
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with ID: " + id));

        studentRepository.delete(student);
    }

}