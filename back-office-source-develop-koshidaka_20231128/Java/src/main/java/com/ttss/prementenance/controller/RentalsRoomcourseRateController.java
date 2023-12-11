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

import com.ttss.prementenance.model.PostRentalsQueryRequestBodyModel;
import com.ttss.prementenance.model.PostRentalsQueryRequestParamModel;
import com.ttss.prementenance.model.RentalsCommonResponseModel;
import com.ttss.prementenance.service.RentalsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * rentals ルームコース料金アイテム
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("RentalsRoomcourseRate")
public class RentalsRoomcourseRateController {

  @Autowired
  private RentalsService rentalsService;

  @Autowired
  private MessageSource messageSource;

  @Autowired
  private ApiContext apiContext;

  @Autowired
  public RentalsRoomcourseRateController() {}

  @Autowired
  private SessionUtil sessionUtil;

  /**
   * ルームコース料金アイテム取得
   *
   * @param model リクエスト内容[nodeId,..]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Query")
  @ResponseBody
  public RentalsCommonResponseModel rentalsRoomcourseQuery(@RequestBody @Validated Map<String, Object> model,
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
			model.get("weekdayCode").toString();
			model.get("chargeCode").toString();
			model.get("memberPrice").toString();
			model.get("ageDivisionCode").toString();
			model.get("countSetting").toString();
		} catch (Exception e) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		//パラメータ部
		var  paramReq = new PostRentalsQueryRequestParamModel();
		paramReq.getRequestModel().setOrderBy("weekdayCode");
		paramReq.getRequestModel().setAscending(true);
		paramReq.getRequestModel().setStartIndex(0);
		paramReq.getRequestModel().setBatchSize(Long.valueOf(0));
		//Body部
		var  bodyReq = new PostRentalsQueryRequestBodyModel();
		var nodeIdList = new ArrayList<String>();
		nodeIdList.add(model.get("nodeId").toString());
//KSD V001.000 20230810 DS
//		bodyReq.getRequestModel().getKeys().setNodeId(nodeIdList);
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
		bodyReq.getRequestModel().setNodeId(nodeIdList);
//KSD V001.000 20230810 AE

		if(model.get("weekdayCode").hashCode() !=0 ) 
		{
			ArrayList<Long> weekdayCodeList= new ArrayList<Long>();
			weekdayCodeList.add((long)model.get("weekdayCode").hashCode());
//KSD V001.000 20230810 DS
//			bodyReq.getRequestModel().getKeys().setWeekdayCode(weekdayCodeList);
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
			bodyReq.getRequestModel().setWeekdayCode(weekdayCodeList);
//KSD V001.000 20230810 AE
		}
		if(model.get("chargeCode").hashCode() !=0 ) 
		{
			ArrayList<Long> chargeCodeList= new ArrayList<Long>();
			chargeCodeList.add((long)model.get("chargeCode").hashCode());
//KSD V001.000 20230810 DS
//			bodyReq.getRequestModel().getKeys().setChargeCode(chargeCodeList);
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
			bodyReq.getRequestModel().setChargeCode(chargeCodeList);
//KSD V001.000 20230810 AE
		}
		if(model.get("memberPrice").hashCode() !=0 ) 
		{
			ArrayList<Long> memberPriceList= new ArrayList<Long>();
			memberPriceList.add((long)model.get("memberPrice").hashCode());
//KSD V001.000 20230810 DS
//			bodyReq.getRequestModel().getKeys().setMemberPrice(memberPriceList);
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
			bodyReq.getRequestModel().setMemberPrice(memberPriceList);
//KSD V001.000 20230810 AE
		}
		if(model.get("ageDivisionCode").hashCode() !=0 ) 
		{
			ArrayList<Long> ageDivisionCodeList= new ArrayList<Long>();
			ageDivisionCodeList.add((long)model.get("ageDivisionCode").hashCode());
//KSD V001.000 20230810 DS
//			bodyReq.getRequestModel().getKeys().setAgeDivisionCode(ageDivisionCodeList);
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
			bodyReq.getRequestModel().setAgeDivisionCode(ageDivisionCodeList);
//KSD V001.000 20230810 AE
		}
		if(model.get("countSetting").hashCode() !=0 ) 
		{
			ArrayList<Long> countSettingList= new ArrayList<Long>();
			countSettingList.add((long)model.get("countSetting").hashCode());
//KSD V001.000 20230810 DS
//			bodyReq.getRequestModel().getKeys().setCountSetting(countSettingList);
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
			bodyReq.getRequestModel().setCountSetting(countSettingList);
//KSD V001.000 20230810 AE
		}
		////////////////////////////////
		// POST要求（取得）
		////////////////////////////////
		responseModel = rentalsService.RentalsRoomcourseRateQuery(paramReq, bodyReq,
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
   * ルームコース料金アイテム新規作成／更新
   *
   * @param model リクエスト内容[nodeId,weekdayCode,..]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Update")
  @ResponseBody
  public RentalsCommonResponseModel rentalsRoomcourseUpdate(@RequestBody @Validated Map<String, Object> model,
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
		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		//パラメータ部
		//Body部
		////////////////////////////////
		// POST要求（更新）
		////////////////////////////////
		responseModel = rentalsService.RentalsRoomcourseRateUpdate(model,
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
