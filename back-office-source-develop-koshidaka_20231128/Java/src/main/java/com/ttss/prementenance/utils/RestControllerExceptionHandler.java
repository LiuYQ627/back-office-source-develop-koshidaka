package com.ttss.prementenance.utils;

import com.ttss.prementenance.model.ApiCommonErrorResponseModel;
import javax.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
* エラーハンドラークラス.
*
* @author TSS 小山田 峻登
* @version 1.0.0
*/

@RestControllerAdvice
public class RestControllerExceptionHandler extends ResponseEntityExceptionHandler {

  @Autowired
  private MessageSource messageSource;

  @Override
  protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body,
      HttpHeaders headers, HttpStatus status, WebRequest request) {
    if (body == null) {
      body = ex.getClass().toString();
    }
    return super.handleExceptionInternal(ex, body, headers, status, request);
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
      HttpHeaders headers, HttpStatus status, WebRequest request) {
    return handleExceptionInternal(ex, "MethodArgumentNotValid", headers, status, request);
  }

  @Override
  protected ResponseEntity<Object> handleBindException(BindException ex, HttpHeaders headers,
      HttpStatus status, WebRequest request) {
    var response = new ApiCommonErrorResponseModel();
    response.setResult(ApiUtil.getValidationErrorResponse(ex, messageSource));
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @Override
  protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
      HttpHeaders headers, HttpStatus status, WebRequest request) {
    return handleExceptionInternal(ex, "HttpMessageNotReadable", headers, status, request);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException ex,
      WebRequest request) {
    return handleExceptionInternal(ex, "Constraint", null, HttpStatus.BAD_REQUEST, request);
  }

}
