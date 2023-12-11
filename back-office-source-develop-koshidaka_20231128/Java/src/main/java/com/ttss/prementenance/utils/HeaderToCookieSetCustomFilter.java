package com.ttss.prementenance.utils;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
* レスポンスヘッダーのset-CokkieへセッションIDをセットするフィルター.
*
* @author TSS 小山田 峻登
* @version 1.0.0
*/
public class HeaderToCookieSetCustomFilter implements Filter {
  
  // セッションUtil
  private SessionUtil sessionUtil;
  
  // ログ出力
  private static final Logger log = LoggerFactory.getLogger(HeaderToCookieSetCustomFilter.class);
  
  /**
   * コンストラクタ.
   * @param sessionUtil セッションUtil
   */
  public HeaderToCookieSetCustomFilter(SessionUtil sessionUtil) {
    this.sessionUtil = sessionUtil;
  }

  /**
   * リクエストのCookieにセッションIDがある場合に、レスポンスヘッダーへセッションIDをセットする.
   * @param request サーブレットリクエスト(SpringBootが自動設定)
   * @param response サーブレットレスポンス(SpringBootが自動設定)
   * @param chain フィルターチェーン(SpringBootが自動設定)
   */
  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {

    // cookieからセッションIDの取得
    var sessionId = sessionUtil.getSessionId((HttpServletRequest) request);

    if (!sessionId.isEmpty()) {
      // cookieにセッションIDが存在する場合はレスポンスにセッションIDを付与
      response = sessionUtil.setCookie((HttpServletResponse) response, sessionId);
      log.info("*** SESSION COOKIE AGE UPDATE ***");
      log.info("*** SessionId *** >>> " + sessionId);
    }
    
    chain.doFilter(request, response);
  }

}
