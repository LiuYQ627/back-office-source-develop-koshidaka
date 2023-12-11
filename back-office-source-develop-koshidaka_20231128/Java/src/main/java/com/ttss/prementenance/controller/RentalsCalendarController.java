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

import com.ttss.prementenance.model.PostRentalsQueryRequestParamModel;
import com.ttss.prementenance.model.RentalsCommonResponseModel;
import com.ttss.prementenance.model.RentalsUpdateResponseModel;
import com.ttss.prementenance.service.RentalsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * rentals カレンダーアイテム
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("RentalsCalendar")
public class RentalsCalendarController {

  @Autowired
  private RentalsService rentalsService;

  @Autowired
  private MessageSource messageSource;

  @Autowired
  private ApiContext apiContext;

  @Autowired
  public RentalsCalendarController() {}

  @Autowired
  private SessionUtil sessionUtil;

  /**
   * カレンダーアイテム取得
   *
   * @param model リクエスト内容[nodeId,mmDate]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Query")
  @ResponseBody
  public RentalsCommonResponseModel rentalsCalendarQuery(@RequestBody @Validated Map<String, Object> model,
		  Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new RentalsCommonResponseModel();
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
			model.get("yyDate").hashCode();
			model.get("mmDate").hashCode();
		} catch (Exception e) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		// KSD V001.000 20230719 AS
		int startIndexFlag = 0;
		try {
			model.get("startIndex").hashCode();
		} catch (Exception e) {
			// エラーの場合
			startIndexFlag = 1;
		}
		int batchSizeFlag = 0;
		try {
			model.get("batchSize").hashCode();
		} catch (Exception e) {
			// エラーの場合
			batchSizeFlag = 1;
		}
		int ascendingFlag = 0;
		try {
			model.get("ascending").hashCode();
		} catch (Exception e) {
			// エラーの場合
			ascendingFlag = 1;
		}
		int orderByFlag = 0;
		try {
			model.get("orderBy").toString();
		} catch (Exception e) {
			// エラーの場合
			orderByFlag = 1;
		}
		// KSD V001.000 20230719 AE
		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		//パラメータ部
		var  paramReq = new PostRentalsQueryRequestParamModel();
// KSD V001.000 20230719 DS
//		paramReq.getRequestModel().setOrderBy("mmDate");
//		paramReq.getRequestModel().setAscending(true);
//		paramReq.getRequestModel().setStartIndex(0);
//		paramReq.getRequestModel().setBatchSize(Long.valueOf(0));
// KSD V001.000 20230719 DE
// KSD V001.000 20230719 AS
		if(startIndexFlag == 0 ) {
			paramReq.getRequestModel().setStartIndex(model.get("startIndex").hashCode());
		}else {
			paramReq.getRequestModel().setStartIndex(0);
		}
		if(batchSizeFlag == 0 ) {
			long i_data = model.get("batchSize").hashCode();
			paramReq.getRequestModel().setBatchSize((Long)i_data);
		}else {
			paramReq.getRequestModel().setBatchSize(Long.valueOf(0));
		}
		if(ascendingFlag == 0 ) {
			Boolean b_data = (Boolean)model.get("ascending");
			paramReq.getRequestModel().setAscending((Boolean)b_data);
		}else {
			paramReq.getRequestModel().setAscending(true);
		}
		if(orderByFlag == 0 ) {
			String str_data = model.get("orderBy").toString();
			paramReq.getRequestModel().setOrderBy(str_data);
		}else {
			paramReq.getRequestModel().setOrderBy("mmDate");
		}
// KSD V001.000 20230719 AE
		//Body部
// KSD V001.000 20230719 DS
//		var  bodyReq = new PostRentalsQueryRequestBodyModel();
//		var nodeIdList = new ArrayList<String>();
//		nodeIdList.add(model.get("nodeId").toString());
//		bodyReq.getRequestModel().getKeys().setNodeId(nodeIdList);
//		if(model.get("yyDate").hashCode() !=0 ) 
//		{
//			ArrayList<Long> yyDateList= new ArrayList<Long>();
//			yyDateList.add((long)model.get("yyDate").hashCode());
//			bodyReq.getRequestModel().getKeys().setYyDate(yyDateList);
//		}
//		if(model.get("mmDate").hashCode() !=0 ) 
//		{
//			ArrayList<Long> mmDateList= new ArrayList<Long>();
//			mmDateList.add((long)model.get("mmDate").hashCode());
//			bodyReq.getRequestModel().getKeys().setMmDate(mmDateList);
//		}
// KSD V001.000 20230719 DE
// KSD V001.000 20230719 AS
		//paramReqにセットしたので削除（本文に入らないので削除）
		model.remove("orderBy");
		model.remove("ascending");
		model.remove("startIndex");
		model.remove("batchSize");
		//"nodeId"="000000000000001000002" -> "nodeId"=["000000000000001000002"]
		var nodeIdList = new ArrayList<String>();
		nodeIdList.add(model.get("nodeId").toString());
		model.put("nodeId", nodeIdList);
// KSD V001.000 20230719 AE
		////////////////////////////////
		// POST要求（取得）
		////////////////////////////////
// KSD V001.000 20230719 DS
//		responseModel = rentalsService.RentalsCalendarQuery(paramReq, bodyReq,
//				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
// KSD V001.000 20230719 DE
// KSD V001.000 20230719 AS
		responseModel = rentalsService.RentalsCalendarQuery(paramReq, model,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
// KSD V001.000 20230719 AE
		
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
   * カレンダーアイテム新規作成／更新
   *
   * @param model リクエスト内容[tableNo,...,reservedAvailable]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Update")
  @ResponseBody
//KSD V001.000 20230816 DS
//  public RentalsCommonResponseModel rentalsCalendarUpdate(@RequestBody @Validated Map<String, Object> model,
//		  Errors errors, HttpServletRequest request, HttpServletResponse response) {
//
//		var responseModel = new RentalsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	  public RentalsUpdateResponseModel rentalsCalendarUpdate(@RequestBody @Validated Map<String, Object> model,
		  Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new RentalsUpdateResponseModel();
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
//KSD V001.000 20230816 AS VUE側からセットされている。応答エラーになるのでここで削除
		model.remove("lastModifiedUserId");
		model.remove("lastModifiedTimestamp");
		model.remove("createTimestamp");
		model.remove("_id");
//KSD V001.000 20230816 AE
		////////////////////////////////
		// POST要求（更新）
		////////////////////////////////
		responseModel = rentalsService.RentalsCalendarUpdate(model,
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
