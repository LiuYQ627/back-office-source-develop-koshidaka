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
public class ByteSizeValidator implements ConstraintValidator<ByteSize, String> {

  /**
   * 文字エンコーディング.
   */
  private String encoding;

  /**
   * 許容する最大バイト数.
   */
  private int max;
  /**
   * 許容する最小バイト数.
   */
  private int min;

  @Override
  public void initialize(ByteSize byteSize) {
    encoding = byteSize.encoding();
    max = byteSize.max();
    min = byteSize.min();
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }

    return isByteSizeValid(value);
  }

  /**
   * 引数で指定した文字列のバイトサイズを検証します.
   *
   * @param value 検証する文字列
   * @return trueの場合、指定した許容サイズ範囲内
   */
  private boolean isByteSizeValid(String value) {

    try {
      byte[] bytes = value.getBytes(encoding);

      if (bytes.length > max) {
        // 大きい
        return false;
      }

      if (bytes.length < min) {
        // 小さい
        return false;
      }
    } catch (UnsupportedEncodingException e) {
      return false;
    }

    return true;
  }
}
