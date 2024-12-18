package com.sms.app.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.sms.app.model.Course;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CourseValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return Course.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Course course = (Course) target;

        if (course.getStartDate() != null && course.getEndDate() != null) {
            if (course.getStartDate().isAfter(course.getEndDate())) {
            	log.error("Start date cannot be after end date");
                errors.rejectValue("startDate", "course.startDate.afterEndDate", "Start date cannot be after end date");
            }
            
            int duration = course.getStartDate().until(course.getEndDate()).getDays();
            log.error("duration: " + duration);
            
            if (duration < 10) {
            	log.error("Course should be of minimum 10 days");
                errors.rejectValue("endDate", "course.endDate.notLongEnough", "Course should be of minimum 10 days");
            }
        }
    }
}