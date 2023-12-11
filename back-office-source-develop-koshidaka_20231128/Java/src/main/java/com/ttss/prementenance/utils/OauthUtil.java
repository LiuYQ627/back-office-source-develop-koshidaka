package com.ttss.prementenance.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.Wso2AccessTokenModel;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * OAuth認証を行う機能全般.
 * 
 * @author 1170523
 *
 */
public class OauthUtil {
  
  // ログ出力
  private static final Logger log = LoggerFactory.getLogger(OauthUtil.class);

  private static final String GRANT_TYPE = "/token?grant_type=client_credentials";
  
  private static final String CONTENT_TYPE = "application/x-www-form-urlencoded";

  /**
   * REST APIの認証tokenを取得してセッションに登録する.
   * 
   * @throws IOException APIレスポンス結果をモデルクラスに変換エラー
   * @throws InterruptedException API接続時のスレッド割込みエラー
   */
  public String createOauthToken(OauthContext authConte) throws IOException, InterruptedException {
    String url = authConte.getHostname() + GRANT_TYPE;

    String customerInfo = authConte.getConsumerKey() + ":" + authConte.getConsumerSecret();

    String encStr = Base64.getEncoder().encodeToString(customerInfo.getBytes());
    String auth = "Basic " + encStr;

    var build = HttpRequest.newBuilder(URI.create(url));
    build = build.POST(HttpRequest.BodyPublishers.ofString(""));
    build.header("Authorization", auth);
    build.headers("Content-Type", CONTENT_TYPE);

    HttpClient cli = HttpClient.newBuilder().version(HttpClient.Version.HTTP_2).build();

    log.info("*** API ACCESS ***");
    log.info("*** HTTP Method *** >>> " + build.build().method());
    log.info("*** URI *** >>> " + build.build().uri());
    log.info("*** Content-Type *** >>> " + CONTENT_TYPE);
    HttpResponse<String> response = cli.send(build.build(), HttpResponse.BodyHandlers.ofString());

    // APIレスポンスのログを出力
    log.info("*** API RESPONSE ***");
    log.info("*** URI *** >>> " + response.uri());
    log.info("*** BODY *** >>> " + response.body());

    ObjectMapper mapper = new ObjectMapper();
    Wso2AccessTokenModel tokenModel = mapper.readValue(response.body(), Wso2AccessTokenModel.class);
    
    // sessionに保存
    return tokenModel.getTokenType() + " " + tokenModel.getAccessToken();
  }
}
