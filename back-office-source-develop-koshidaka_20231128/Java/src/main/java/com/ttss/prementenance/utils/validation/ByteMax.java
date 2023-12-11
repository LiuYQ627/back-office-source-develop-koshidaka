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
@Constraint(validatedBy = {ByteMaxValidator.class})
public @interface ByteMax {

  /**
   * エラーメッセージ.
   * 
   * @return エラーメッセージ
   */
  String message() default "{validation.ByteMax.message}";

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
   * @return 文字エンコーディング
   */
  String encoding() default "UTF-8";

  /**
   * 許容するバイトサイズの最大値.
   *
   * @return 許容するバイトサイズの最大値
   */
  int value();

  /**
   * 全角文字の許容する最大文字数.
   * 
   * @return 全角文字の許容する最大文字数
   */
  int fullWidthValue();

  /**
   * 許容する最大値のリスト用インターフェース.
   * 
   * @author TSS 小山田 峻登
   *
   */
  @Target({FIELD})
  @Retention(RUNTIME)
  @Documented
  @interface List {
    ByteMax[] value();
  }

}
