package com.ttss.prementenance.utils;

import java.util.Locale;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;

/**
* メッセージリソース.
*
* @author TSS 小山田 峻登
* @version 1.0.0
*/
public class MessageSourceUtil {

  private MessageSource messageSource;
  
  private static final Logger log = LoggerFactory.getLogger(MessageSourceUtil.class);

  /**
   * コンストラクタ.
   * 
   * @param messageSource メッセージリソース
   */
  public MessageSourceUtil(MessageSource messageSource) {
    this.messageSource = messageSource;
  }

  /**
   * 実行時エラー用マップ作成処理.
   * 
   * @param messageKey メッセージリソースのKey
   * @param url MSアクセス先URL
   * @param responseBody MSからのレスポンスボディ 
   * @return メッセージがglobalで設定されたmap(messageKeyが空もしくはnullの場合は未設定のmapを返す)
   */
  public MultiValueMap<String, String> createGlobalErrorMessageMap(String messageKey, String url,
      String responseBody) {
    if (StringUtils.isEmpty(messageKey)) {
      return new LinkedMultiValueMap<>();
    }

    MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
    try {
      var message = messageSource.getMessage(messageKey, null, Locale.getDefault());
      map.add("global", message);
      // ログの出力
      log.warn("*** API ERROR ***");
      log.warn("*** RequestMethod *** >>> "
          + Thread.currentThread().getStackTrace()[2].getClassName() + "."
          + Thread.currentThread().getStackTrace()[2].getMethodName());
      log.warn("*** AccessApiUrl *** >>> " + url);
      log.warn("*** DispErrorMessage *** >>> " + message);
      log.warn("*** ApiResponseBody *** >>> " + responseBody);
    } catch (Exception e) {
      // 対象メッセージが存在しない場合などは空のmapを返す
    }
    return map;
  }

  /**
   * 実行時エラー用マップ作成処理.
   * 
   * @param messageKey メッセージリソースのKey
   * @param url MSアクセス先URL
   * @param responseBody MSからのレスポンスボディ 
   * @param args メッセージに対する引数
   * @return メッセージがglobalで設定されたmap(messageKeyが空もしくはnullの場合は未設定のmapを返す)
   */
  public MultiValueMap<String, String> createGlobalErrorMessageMap(String messageKey,
      String url, String responseBody, Object[] args) {
    if (StringUtils.isEmpty(messageKey)) {
      return new LinkedMultiValueMap<>();
    }

    MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
    try {
      var message = messageSource.getMessage(messageKey, args, Locale.getDefault());
      map.add("global", message);

      // ログの出力
      log.warn("*** API ERROR ***");
      log.warn("*** RequestMethod *** >>> "
          + Thread.currentThread().getStackTrace()[2].getClassName() + "."
          + Thread.currentThread().getStackTrace()[2].getMethodName());
      log.warn("*** MS URL *** >>> " + url);
      log.warn("*** DispErrorMessage *** >>> " + message);
      log.warn("*** MS ResponseBody *** >>> " + responseBody);
    } catch (Exception e) {
      // 対象メッセージが存在しない場合などは空のmapを返す
    }
    return map;
  }

  /**
   * メッセージの取得(置換なし).
   * 
   * @param messageKey メッセージリソースのKey
   * @return メッセージ
   */
  public String getMessage(String messageKey) {
    var message = "";
    if (StringUtils.isEmpty(messageKey)) {
      return message;
    }

    try {
      message = messageSource.getMessage(messageKey, null, Locale.getDefault());
    } catch (Exception e) {
      // 対象メッセージが存在しない場合など
    }
    return message;
  }

  /**
   * メッセージの取得(置換あり).
   * 
   * @param messageKey メッセージリソースのKey
   * @param replaceWords 置換文字列
   * @return メッセージ(置換済み)
   */
  public String getMessage(String messageKey, String[] replaceWords) {
    var message = "";
    if (StringUtils.isEmpty(messageKey)) {
      return message;
    }

    try {
      message = messageSource.getMessage(messageKey, replaceWords, Locale.getDefault());
    } catch (Exception e) {
      // 対象メッセージが存在しない場合など
    }
    return message;
  }
}
