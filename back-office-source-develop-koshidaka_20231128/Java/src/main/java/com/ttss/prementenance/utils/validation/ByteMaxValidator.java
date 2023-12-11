package com.ttss.prementenance.utils.validation;

import java.io.UnsupportedEncodingException;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
* 文字列のサイズをバイト単位でチェック.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
public class ByteMaxValidator implements ConstraintValidator<ByteMax, String> {

  /**
   * 文字エンコーディング.
   */
  private String encoding;

  /**
   * 許容する最大バイト数.
   */
  private int value;

  @Override
  public void initialize(ByteMax byteMax) {
    encoding = byteMax.encoding();
    value = byteMax.value();
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }

    return isByteMaxValid(value);
  }

  /**
   * 引数で指定した文字列のバイトサイズを検証します.
   *
   * @param value 検証する文字列
   * @return trueの場合、指定した許容サイズ以下
   */
  private boolean isByteMaxValid(String str) {

    try {
      byte[] bytes = str.getBytes(encoding);

      if (bytes.length > value) {
        // 大きい
        return false;
      }
    } catch (UnsupportedEncodingException e) {
      return false;
    }

    return true;
  }
}
