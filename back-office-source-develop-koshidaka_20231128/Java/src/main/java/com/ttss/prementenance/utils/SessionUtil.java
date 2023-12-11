package com.ttss.prementenance.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.session.MapSessionRepository;

/**
* セッション操作の共通クラス.
*
* @author TSS 廣田 敏明
* @version 1.0.0
*/
public class SessionUtil {
  
	
  // ログ出力
  private static final Logger log = LoggerFactory.getLogger(SessionUtil.class);
	
  // CookieへセッションIDを保存する際のKey
  private final String sessionIdSetCookieName = "SESSIONID";
  
  // セッションが生存する最大時間(秒)
  @Value("${server.session_cookie_age}")
  private int cookieMaxAge; 

  // セッションリポジトリ
  @Autowired
  protected MapSessionRepository repository;

  /**
   * セッションリポジトリよりログインユーザ情報を取得.
   * @param request HttpServletのリクエスト
   * @return ログインユーザ情報(存在しない場合はnull)
   */
  public SessionBeans getLoginUserFromSession(HttpServletRequest request) {
    
    var sessionId = this.getSessionId(request);
    if (sessionId.isEmpty()) {
      // CookieにセッションIDが存在しない場合はnullを返す
      var id = "";
      if (request.getSession() != null && request.getSession().getId() != null) {
    	  id = request.getSession().getId();
      }
      log.warn("*** NO SESSIONID IN COOKIE ***");
      log.warn("*** SessionId *** >>> " + id);
      return null;
    }
    
    // セッションリポジトリからセッションIDをキーにセッション情報を取得
    var session = this.repository.findById(sessionId);
    if (session == null) {
      // セッションが存在しなかった
      var id = "";
      if (request.getSession() != null && request.getSession().getId() != null) {
    	  id = request.getSession().getId();
      }
      log.warn("*** NO SESSIONID IN SESSION REPOSITORY ***");
      log.warn("*** SessionId *** >>> " + id);
      return null;
    }
    
    // セッションリポジトリからセッション情報を取得
    SessionBeans user = session.getAttribute("user");
    return user;
  }
  
  /**
   * セッションリポジトリより有効期限内のログインユーザ情報を返す.
   * @param request HttpServletのリクエスト
   * @return セッションリポジトリにセッションがある場合はログインユーザ情報を返す。それ以外はnullを返す
   */
  public SessionBeans getActiveLoginUser(HttpServletRequest request) {
    
    // セッションリポジトリからセッション情報を取得   
    var loginUser = this.getLoginUserFromSession(request);
    
    if (loginUser == null) {
      // セッションリポジトリに対象ログインユーザ情報が存在しない場合はnullを返す
      return null;
    }
    
    return loginUser;
  }

  /**
   * セッションリポジトリへユーザ情報を保存する.
   * @param user 保存するユーザ情報
   * @return セッションID
   */
  public String saveUserToRepository(SessionBeans user) {
   
    var toSave = this.repository.createSession();
    toSave.setAttribute("user", user);
    this.repository.save(toSave);
    return toSave.getId();
  }
  
  /**
   * セッションリポジトリからセッション情報を破棄する.
   * @param request HttpServletのリクエスト
   */
  public void deleteSession(HttpServletRequest request) {
    
    var sessionId = this.getSessionId(request);
    
    if (sessionId.isEmpty()) {
      // セッションがない場合は、処理終了
      return;
    }
    
    this.repository.deleteById(sessionId);
  }
  
  /**
   * レスポンスヘッダーにセッションID情報のsetCookieを設定.
   * @param response HttpServletのレスポンス
   * @param sessionId セッションID
   * @return セッションID情報をsetCookieで指定したHttpServletのレスポンス(セッションIDに値が存在しない場合はセットしない)
   */
  public HttpServletResponse setCookie(HttpServletResponse response, String sessionId) {
    
    if (sessionId.isEmpty()) {
      // セッションIDが設定されていない場合は、セットせずに返却
      return response;
    }
    
    String cookie = String.format(
        "%s=%s; max-age=%s; Path=/; HttpOnly; Secure; SameSite=Lax;", this.sessionIdSetCookieName,
        sessionId, this.cookieMaxAge);
    response.addHeader("Set-Cookie", cookie);
    return response; 
  }
  
  /**
   * CookieよりセッションIDを取得.
   * @param request HttpServletのリクエスト
   * @return セッションID(取得できなかった場合は空文字を返す)
   */
  public String getSessionId(HttpServletRequest request) {

    var sessionId = "";
    var cookies = request.getCookies();

    if (cookies != null) {
      for (int i = 0; i < cookies.length; i++) {
        if (cookies[i].getName().equals(this.sessionIdSetCookieName)) {
          sessionId = cookies[i].getValue();
        }
      }
    }
    return sessionId;
  }
}
