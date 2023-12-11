package com.ttss.prementenance.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
* ログ出力の共通処理.
*
* @author TSS 小山田 峻登
* @version 1.0.0
*/

public final class LogUtil {

  // ログ出力
  private static final Logger log = LoggerFactory.getLogger(LogUtil.class);

  public LogUtil() {}

  /**
   * 実行時エラーログの出力.
   * 
   * @param e Exception
   */
  public static void printRuntimeErrorLog(Exception e) {
    // 例外が発生した場合はWARNでエラーログを出力する
    log.warn("*** RUNTIME ERROR ***");
    log.warn("*** ExceptionCatchMethod *** >>> "
        + Thread.currentThread().getStackTrace()[2].getClassName() + "."
        + Thread.currentThread().getStackTrace()[2].getMethodName());
    log.warn("*** Exception *** >>> " + e.getClass().getName());
    log.warn("*** StackTrace *** >>>");
    var stack = e.getStackTrace();
    for (var i = 0; i < stack.length; i++) {
      log.warn(stack[i].toString());
    }
  }
}
