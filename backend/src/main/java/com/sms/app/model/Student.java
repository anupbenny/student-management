package com.sms.app.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Student name is mandatory")
    @Size(min = 2, max = 100, message = "Student name must be between 2 and 100 characters")
    private String name;

    @DecimalMin(value = "0.0", message = "GPA should be at least 0.0")
    @DecimalMax(value = "4.0", message = "GPA cannot exceed 4.0")
    private double gpa;

    /*@ManyToMany
    @JoinTable(
            name = "student_course",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )*/
    private List<Integer> courses;
}