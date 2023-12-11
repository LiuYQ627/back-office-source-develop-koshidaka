package com.ttss.prementenance.utils;

import java.net.URI;
import java.net.http.HttpClient.Version;
import java.net.http.HttpHeaders;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

import javax.net.ssl.SSLSession;

/**
 * WSO2トークン有効期限切れ時のレスポンスモデル.
 *
 * @author TSS 小山田 峻登
 * @version 1.0.0
 */
public class Wso2TokenErrorResponse implements HttpResponse<String> {

  @Override
  public int statusCode() {
    return -90;
  }

  @Override
  public HttpRequest request() {
    return null;
  }

  @Override
  public Optional<HttpResponse<String>> previousResponse() {
    return null;
  }

  @Override
  public HttpHeaders headers() {
    return null;
  }

  @Override
  public String body() {
    // セッション切れ扱いとするため、応答コードには「-90(セッション切れ)」を設定する
    return "{\"result\":{\"ms\":0,\"api\":0,\"code\":-90}}";
  }

  @Override
  public Optional<SSLSession> sslSession() {
    return null;
  }

  @Override
  public URI uri() {
    return null;
  }

  @Override
  public Version version() {
    return null;
  }

}
