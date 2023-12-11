package com.ttss.prementenance.utils.validation;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;

/**
* (バリデーションチェック独自アノテーション)文字列のサイズをバイト単位でチェックする.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
@Target({FIELD})
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = {ByteSizeValidator.class})
public @interface ByteSize {

  /**
   * エラーメッセージ.
   * 
   * @return エラーメッセージ
   */
  String message() default "{validation.ByteSize.message}";

  /**
   * グループ.
   * 
   * @return グループ
   */
  Class<?>[] groups() default {};

  /**
   * ペイロード.
   * 
   * @return ペイロード
   */
  Class<? extends Payload>[] payload() default {};

  /**
   * 文字サイズを計測する文字エンコーディング.
   * 
   * @return 文字サイズを計測する文字エンコーディング
   */
  String encoding() default "UTF-8";

  /**
   * 許容するバイトサイズの最大値.
   * 
   * @return 許容するバイトサイズの最大値
   */
  int max() default Integer.MAX_VALUE;

  /**
   * 許容するバイトサイズの最小値.
   * 
   * @return 許容するバイトサイズの最小値
   */
  int min() default 0;

  /**
   * 全角文字の許容する最大文字数.
   * 
   * @return 全角文字の許容する最大文字数.
   */
  int fullWidthMax() default Integer.MAX_VALUE / 2;

  /**
   * 全角文字の許容する最小文字数.
   * 
   * @return 全角文字の許容する最小文字数.
   */
  int fullWidthMin() default 0;

  /**
   * 許容するバイトサイズのリスト用インターフェース.
   * 
   * @author TSS 小山田 峻登
   *
   */
  @Target({FIELD})
  @Retention(RUNTIME)
  @Documented
  @interface List {
    ByteSize[] value();
  }

}
