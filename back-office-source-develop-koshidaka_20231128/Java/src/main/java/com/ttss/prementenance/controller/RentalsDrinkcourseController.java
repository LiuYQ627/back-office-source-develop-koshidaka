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
import com.ttss.prementenance.model.RentalsUpdateResponseModel;
import com.ttss.prementenance.service.RentalsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * rentals ドリンクコースアイテム
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("RentalsDrinkcourse")
public class RentalsDrinkcourseController {

  @Autowired
  private RentalsService rentalsService;

  @Autowired
  private MessageSource messageSource;

  @Autowired
  private ApiContext apiContext;

  @Autowired
  public RentalsDrinkcourseController() {}

  @Autowired
  private SessionUtil sessionUtil;

  /**
   * ドリンクコースアイテム取得
   *
   * @param model リクエスト内容[nodeId,drinkCourseNo]
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
			model.get("drinkCourseNo").hashCode();
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
		paramReq.getRequestModel().setOrderBy("drinkCourseNo");
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
		
		if(model.get("drinkCourseNo").hashCode() !=0 ) 
		{
			ArrayList<Long> drinkCourseNoList= new ArrayList<Long>();
			drinkCourseNoList.add((long)model.get("drinkCourseNo").hashCode());
//KSD V001.000 20230810 DS
//			bodyReq.getRequestModel().getKeys().setDrinkCourseNo(drinkCourseNoList);
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
			bodyReq.getRequestModel().setDrinkCourseNo(drinkCourseNoList);
//KSD V001.000 20230810 AE
		}
		////////////////////////////////
		// POST要求（取得）
		////////////////////////////////
		responseModel = rentalsService.RentalsDrinkcourseQuery(paramReq, bodyReq,
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
   * ドリンクコースアイテム新規作成／更新
   *
   * @param model リクエスト内容[nodeId,drinkCourseNo,..]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Update")
  @ResponseBody
//KSD V001.000 20230816 DS
//  public RentalsCommonResponseModel rentalsDrinkcourseUpdate(@RequestBody @Validated Map<String, Object> model,
//		  Errors errors, HttpServletRequest request, HttpServletResponse response) {
//
//		var responseModel = new RentalsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	  public RentalsUpdateResponseModel rentalsDrinkcourseUpdate(@RequestBody @Validated Map<String, Object> model,
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
		// POST要求（更新）
		////////////////////////////////
		responseModel = rentalsService.RentalsDrinkcourseUpdate(model,
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
   * ドリンクコースアイテム削除
   *
   * @param model リクエスト内容[nodeId,drinkCourseNo]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Delete")
  @ResponseBody
  public RentalsCommonResponseModel rentalsDrinkcourseDelete(@RequestBody @Validated Map<String, Object> model,
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
			model.get("drinkCourseNo").hashCode();
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
		responseModel = rentalsService.RentalsDrinkcourseDelete(model,
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
