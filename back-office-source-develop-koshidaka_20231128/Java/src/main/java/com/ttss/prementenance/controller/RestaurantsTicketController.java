package com.ttss.prementenance.controller;

import java.util.ArrayList;
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

import com.ttss.prementenance.model.PostRestaurantsQueryRequestBodyModel;
import com.ttss.prementenance.model.PostRestaurantsQueryRequestParamModel;
import com.ttss.prementenance.model.RestaurantsCommonResponseModel;
import com.ttss.prementenance.model.RestaurantsUpdateResponseModel;
import com.ttss.prementenance.service.RestaurantsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * rentals 券種設定
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("RestaurantsTicket")
public class RestaurantsTicketController {

  @Autowired
  private RestaurantsService restaurantsService;

  @Autowired
  private MessageSource messageSource;

  @Autowired
  private ApiContext apiContext;

  @Autowired
  public RestaurantsTicketController() {}

  @Autowired
  private SessionUtil sessionUtil;

  /**
   * 券種設定　取得
   *
   * @param model リクエスト内容[nodeId]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Query")
  @ResponseBody
  public RestaurantsCommonResponseModel restaurantsTicketQuery(@RequestBody @Validated Map<String, Object> model,
		  Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new RestaurantsCommonResponseModel();
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
//2023.05.25 ST fuse "code" -> "Code"対応
//			model.get("code").hashCode();
			model.get("Code").hashCode();
//2023.05.25 ED fuse "code" -> "Code"対応
		} catch (Exception e) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		//パラメータ部
		var  paramReq = new PostRestaurantsQueryRequestParamModel();
//2023.05.25 ST fuse "code" -> "Code"対応
//		paramReq.getRequestModel().setOrderBy("code");
		paramReq.getRequestModel().setOrderBy("Code");
//2023.05.25 ED fuse "code" -> "Code"対応
		paramReq.getRequestModel().setAscending(true);
		paramReq.getRequestModel().setStartIndex(0);
		paramReq.getRequestModel().setBatchSize(Long.valueOf(0));
		//Body部
		var  bodyReq = new PostRestaurantsQueryRequestBodyModel();
		var nodeIdList = new ArrayList<String>();
		nodeIdList.add(model.get("nodeId").toString());
//KSD V001.000 20230810 DS
//		bodyReq.getRequestModel().getKeys().setNodeId(nodeIdList);
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
		bodyReq.getRequestModel().setNodeId(nodeIdList);
//KSD V001.000 20230810 AE

//2023.05.25 ST fuse "code" -> "Code"対応
//		if(model.get("code").hashCode() !=0 ) 
//		{
//			ArrayList<Long>  codeList = new ArrayList<Long>();
//			codeList.add((long)model.get("code").hashCode());
//			bodyReq.getRequestModel().getKeys().setCode(codeList);
//		}
		if(model.get("Code").hashCode() !=0 ) 
		{
			ArrayList<Long>  codeList = new ArrayList<Long>();
			codeList.add((long)model.get("Code").hashCode());
//KSD V001.000 20230810 DS
//			bodyReq.getRequestModel().getKeys().setCode(codeList);
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
			bodyReq.getRequestModel().setCode(codeList);
//KSD V001.000 20230810 AE
		}
//2023.05.25 ED fuse "code" -> "Code"対応
		////////////////////////////////
		// POST要求（取得）
		////////////////////////////////
		responseModel = restaurantsService.RestaurantsTicketQuery(paramReq, bodyReq,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		
// KSD V001.000 20230922 AS
		// セッションのトークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null
				&& responseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(responseModel.getResult().getWSO2Token());
			loginUser.setELERAToken(responseModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
// KSD V001.000 20230922 AE
		return responseModel;
  }
  
  /**
   * 券種設定　新規作成／更新
   *
   * @param model リクエスト内容[...]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Update")
  @ResponseBody
//KSD V001.000 20230810 DS
//  public RestaurantsCommonResponseModel restaurantsMemberRankUpdate(@RequestBody @Validated Map<String, Object> model,
//		  Errors errors, HttpServletRequest request, HttpServletResponse response) {
//
//		var responseModel = new RestaurantsCommonResponseModel();
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
  public RestaurantsUpdateResponseModel restaurantsMemberRankUpdate(@RequestBody @Validated Map<String, Object> model,
		  Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new RestaurantsUpdateResponseModel();
//KSD V001.000 20230810 AE
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
		responseModel = restaurantsService.RestaurantsTicketUpdate(model,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		
// KSD V001.000 20230922 AS
		// セッションのトークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null
				&& responseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(responseModel.getResult().getWSO2Token());
			loginUser.setELERAToken(responseModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
// KSD V001.000 20230922 AE
		return responseModel;
  }
  
  /**
   * 券種設定　削除
   *
   * @param model リクエスト内容[nodeId,indexNo]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Delete")
  @ResponseBody
  public RestaurantsCommonResponseModel restaurantsTicketDelete(@RequestBody @Validated Map<String, Object> model,
		  Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new RestaurantsCommonResponseModel();
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
//2023.05.25 ST fuse "code" -> "Code"対応
//			model.get("code").hashCode();
			model.get("Code").hashCode();
//2023.05.25 ED fuse "code" -> "Code"対応
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
		// POST要求
		////////////////////////////////
		responseModel = restaurantsService.RestaurantsTicketDelete(model,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		
// KSD V001.000 20230922 AS
		// セッションのトークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null
				&& responseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(responseModel.getResult().getWSO2Token());
			loginUser.setELERAToken(responseModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
// KSD V001.000 20230922 AE
		return responseModel;
  }

}
