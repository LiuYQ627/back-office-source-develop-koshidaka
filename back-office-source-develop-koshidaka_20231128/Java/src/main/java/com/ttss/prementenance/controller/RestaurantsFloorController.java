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
import com.ttss.prementenance.service.RestaurantsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * rentals フロアマスタ設定
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("RestaurantsFloor")
public class RestaurantsFloorController {

  @Autowired
  private RestaurantsService restaurantsService;

  @Autowired
  private MessageSource messageSource;

  @Autowired
  private ApiContext apiContext;

  @Autowired
  public RestaurantsFloorController() {}

  @Autowired
  private SessionUtil sessionUtil;

  /**
   * フロアマスタ設定　取得
   *
   * @param model リクエスト内容[nodeId,indexNo]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Query")
  @ResponseBody
  public RestaurantsCommonResponseModel restaurantsFloorQuery(@RequestBody @Validated Map<String, Object> model,
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
			model.get("IndexNo").hashCode();
// KSD V001.000 20230719 DS
//			model.get("floorNo").hashCode();
// KSD V001.000 20230719 DE
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
		paramReq.getRequestModel().setOrderBy("IndexNo");
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

		if( model.get("IndexNo").hashCode() != 0 ) {
			ArrayList<Long>  indexNoList = new ArrayList<Long>();
			indexNoList.add((long)model.get("IndexNo").hashCode());
//KSD V001.000 20230810 DS
//			bodyReq.getRequestModel().getKeys().setIndexNo(indexNoList);
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
			bodyReq.getRequestModel().setIndexNo(indexNoList);
//KSD V001.000 20230810 AE
		}
// KSD V001.000 20230719 DS
//		if( model.get("floorNo").hashCode() != 0 ) {
//			ArrayList<Long>  floorNoList = new ArrayList<Long>();
//			floorNoList.add((long)model.get("floorNo").hashCode());
//			bodyReq.getRequestModel().getKeys().setFloorNo(floorNoList);
//		}
// KSD V001.000 20230719 DE
		////////////////////////////////
		// POST要求（取得）
		////////////////////////////////
		responseModel = restaurantsService.RestaurantsFloorQuery(paramReq, bodyReq,
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
   * フロアマスタ設定　新規作成／更新
   *
   * @param model リクエスト内容[...]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Update")
  @ResponseBody
  public RestaurantsCommonResponseModel restaurantsMemberRankUpdate(@RequestBody @Validated Map<String, Object> model,
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
		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		//パラメータ部
		//Body部
		////////////////////////////////
		// POST要求（更新）
		////////////////////////////////
		responseModel = restaurantsService.RestaurantsFloorUpdate(model,
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
   * フロアマスタ設定 削除
   *
   * @param model リクエスト内容[nodeId,indexNo]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Delete")
  @ResponseBody
  public RestaurantsCommonResponseModel restaurantsFloorDelete(@RequestBody @Validated Map<String, Object> model,
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
			model.get("IndexNo").hashCode();
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
		responseModel = restaurantsService.RestaurantsFloorDelete(model,
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
