//KSD V001.000 20230821 AS
package com.ttss.prementenance.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.RentalsUpdateResponseModel;
import com.ttss.prementenance.service.AuthorizationService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * 従業員コード印字
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("Authorization")
public class AuthorizationController {

  @Autowired
  private AuthorizationService authorizationService;

  @Autowired
  private MessageSource messageSource;

  @Autowired
  private ApiContext apiContext;

  @Autowired
  public AuthorizationController() {}

  @Autowired
  private SessionUtil sessionUtil;

  /**
   * 暗号化POSパスワード取得
   *
   * @param model リクエスト内容[nodeId]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/EncodepwdGet")
  @ResponseBody
  public RentalsUpdateResponseModel authorizationEncodepwdGet(@RequestBody @Validated Map<String, Object> model,
		  Errors errors, HttpServletRequest request, HttpServletResponse response) {

	  var responseModel = new RentalsUpdateResponseModel();
	  var loginUser = this.sessionUtil.getActiveLoginUser(request);
	  if (loginUser == null) {
		  responseModel.setResult(ApiUtil.getSessionError());
		  return responseModel;
	  }
	  // バリデーション確認
	  if (errors.hasErrors()) {
		  // エラーの場合
		  responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
		  return responseModel;
	  }
	  //フィールド確認
	  try {
		  model.get("nodeId").toString();
	  } catch (Exception e) {
		  // エラーの場合
		  responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
		  return responseModel;
	  }
	  // ログイン情報
	  String accessToken = loginUser.getWso2ApiToken();
	  String ELERAToken = loginUser.getELERAToken();
	  //パラメータ部
	  //Body部
		
	  ////////////////////////////////
	  // POST要求（取得）
	  ////////////////////////////////
	  responseModel = authorizationService.AuthorizationEncodepwdGet(model,
			  messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

	  // セッションのトークン情報の上書き
	  if (responseModel.getResult().getWSO2Token() != null &&
		  responseModel.getResult().getELERAToken() != null) {

		  loginUser.setWso2ApiToken(responseModel.getResult().getWSO2Token());
		  loginUser.setELERAToken(responseModel.getResult().getELERAToken());
		  // ユーザ情報をセッション管理用リポジトリに追加
		  var sessionId = sessionUtil.saveUserToRepository(loginUser);
		  // レスポンスのヘッダーにセッションID用のCookieをセットする
		  response = sessionUtil.setCookie(response, sessionId);
	  }
	  return responseModel;
  }

}
//KSD V001.000 20230821 AE
