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

import com.ttss.prementenance.model.RestaurantsUpdateResponseModel;
import com.ttss.prementenance.service.RestaurantsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * rentals コンプライアンス情報アイテム
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("RestaurantsCompliance")
public class RestaurantsComplianceController {

  @Autowired
  private RestaurantsService restaurantsService;

  @Autowired
  private MessageSource messageSource;

  @Autowired
  private ApiContext apiContext;

  @Autowired
  public RestaurantsComplianceController() {}

  @Autowired
  private SessionUtil sessionUtil;

  /**
   * コンプライアンス情報アイテム取得
   *
   * @param model リクエスト内容[nodeId,storeCode]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Get")
  @ResponseBody
//KSD V001.000 20230816 DS
//  public RestaurantsCommonResponseModel restaurantsComplianceGet(@RequestBody @Validated Map<String, Object> model,
//		  Errors errors, HttpServletRequest request, HttpServletResponse response) {
//
//		var responseModel = new RestaurantsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
  public RestaurantsUpdateResponseModel restaurantsComplianceGet(@RequestBody @Validated Map<String, Object> model,
		  Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new RestaurantsUpdateResponseModel();
//KSD V001.000 20230816 AE
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
			model.get("storeCode").hashCode();
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
		responseModel = restaurantsService.RestaurantsComplianceGet(model,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

//KSD V001.000 20230901 AS
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
//KSD V001.000 20230901 AE

		return responseModel;
  }
  
  /**
   * コンプライアンス情報アイテム新規作成／更新
   *
   * @param model リクエスト内容[nodeId,storeCode]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Update")
  @ResponseBody
//KSD V001.000 20230816 DS
//  public RestaurantsCommonResponseModel restaurantsComplianceUpdate(@RequestBody @Validated Map<String, Object> model,
//		  Errors errors, HttpServletRequest request, HttpServletResponse response) {
//
//		var responseModel = new RestaurantsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
  public RestaurantsUpdateResponseModel restaurantsComplianceUpdate(@RequestBody @Validated Map<String, Object> model,
		  Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new RestaurantsUpdateResponseModel();
//KSD V001.000 20230816 AE
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
		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		//パラメータ部
		//Body部
		////////////////////////////////
		// POST要求（更新）
		////////////////////////////////
		responseModel = restaurantsService.RestaurantsComplianceUpdate(model,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		
//KSD V001.000 20230901 AS
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
//KSD V001.000 20230901 AE
		return responseModel;
  }
  
}
