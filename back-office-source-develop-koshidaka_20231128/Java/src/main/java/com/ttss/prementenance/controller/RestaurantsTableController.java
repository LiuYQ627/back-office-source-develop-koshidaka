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
 * rentals テーブルマスタ設定
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("RestaurantsTable")
public class RestaurantsTableController {

  @Autowired
  private RestaurantsService restaurantsService;

  @Autowired
  private MessageSource messageSource;

  @Autowired
  private ApiContext apiContext;

  @Autowired
  public RestaurantsTableController() {}

  @Autowired
  private SessionUtil sessionUtil;

  /**
   * テーブルマスタ設定　取得
   *
   * @param model リクエスト内容[nodeId,tableNo]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Query")
  @ResponseBody
  public RestaurantsCommonResponseModel restaurantsTabaleQuery(@RequestBody @Validated Map<String, Object> model,
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
// KSD V001.000 DS
//		String strWork = model.get("tblNo").toString();
//		if( StringUtils.isEmpty(strWork) != true ) {
//			var tblNoList = new ArrayList<String>();
//			tblNoList.add(model.get("tblNo").toString());
//			bodyReq.getRequestModel().getKeys().setTblNo(tblNoList);
//		}
// KSD V001.000 DE
		////////////////////////////////
		// POST要求（取得）
		////////////////////////////////
		responseModel = restaurantsService.RestaurantsTableQuery(paramReq, bodyReq,
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
   * テーブルマスタ設定　新規作成／更新
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
  public RestaurantsUpdateResponseModel restaurantsTableUpdate(@RequestBody @Validated Map<String, Object> model,
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
		
//KSD V001.000 20230821 AS
		//　更新・新規　確認
		Integer i_new_flg = 0;
		try {
			model.get("version").hashCode();
		} catch (Exception e) {
			// 無しの場合、Vue側からは新規作成指定
			i_new_flg = 1;
		}
		if(i_new_flg == 1)
		{
			//新規作成だが、テーブルが存在するか否かを確認
			
			//テーブルマスタ設定　取得"indexNo"の場合、全件取得/"IndexNo"の場合、該当テーブル取得
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
			bodyReq.getRequestModel().setNodeId(nodeIdList);
			if( model.get("IndexNo").hashCode() != 0 ) {
				ArrayList<Long>  indexNoList = new ArrayList<Long>();
				indexNoList.add((long)model.get("IndexNo").hashCode());
				bodyReq.getRequestModel().setIndexNo(indexNoList);
			}
			var responseModel2 = new RestaurantsCommonResponseModel();
			var loginUser2 = this.sessionUtil.getActiveLoginUser(request);
			if (loginUser2 == null) {
				responseModel2.setResult(ApiUtil.getSessionError());
				return responseModel;
			}
			////////////////////////////////
			// POST要求（取得）
			////////////////////////////////
			responseModel2 = restaurantsService.RestaurantsTableQuery(paramReq, bodyReq,
					messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
			
			// トークンの更新
			if (responseModel2.getResult().getWSO2Token() != null
					&& responseModel2.getResult().getELERAToken() != null) {
				accessToken = responseModel2.getResult().getWSO2Token();
				ELERAToken = responseModel2.getResult().getELERAToken();
			}

			switch( responseModel2.getResult().getCode() ) {
			case 0:
				//正常
				//応答のテーブルの"IndexNo"と比較する。HITした場合、"version"をセット
				Integer IndexNo_wk= (Integer)model.get("IndexNo").hashCode();
				for (var i = 0; i < responseModel2.getResponseModel().size(); i++) {
					Map<String, Object> responseModel3 = responseModel2.getResponseModel().get(i);
					Integer IndexNo = (Integer)responseModel3.get("IndexNo");
					// KSD V001.000 DS refs #82767(No128以降の部屋Noについて更新時にエラーが発生する対応)
					// if( IndexNo == IndexNo_wk ) {
					// KSD V001.000 DS refs #82767(No128以降の部屋Noについて更新時にエラーが発生する対応)
					// KSD V001.000 AS refs #82767(No128以降の部屋Noについて更新時にエラーが発生する対応)
					if(IndexNo.equals(IndexNo_wk)) {
					// KSD V001.000 AE refs #82767(No128以降の部屋Noについて更新時にエラーが発生する対応)
						//テーブルが存在したので、"version"をセット（更新指定）
						model.put("version", responseModel3.get("version"));
						break;
					}
				}
					break;
			case 2:
				//応答データ無し：新規作成
				break;
			default:
				//エラー
				responseModel.setResult(responseModel2.getResult());
				return responseModel;
			}
		}
//KSD V001.000 20230821 AE

		//パラメータ部
		//Body部
		////////////////////////////////
		// POST要求（更新）
		////////////////////////////////
		responseModel = restaurantsService.RestaurantsTableUpdate(model,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		
//KSD V001.000 20230821 AS
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
//KSD V001.000 20230821 AE

		return responseModel;
  }
  
  /**
   * テーブルマスタ設定　削除(初期値で更新)
   *
   * @param model リクエスト内容[...]
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/UpdateDelete")
  @ResponseBody
  public RestaurantsCommonResponseModel restaurantsTableDelete(@RequestBody @Validated Map<String, Object> model,
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
//KSD V001.000 20230816 AS VUE側からセットされている。応答エラーになるのでここで削除
		model.remove("lastModifiedUserId");
		model.remove("lastModifiedTimestamp");
		model.remove("createTimestamp");
		model.remove("_id");
//KSD V001.000 20230816 AE
		////////////////////////////////
		// POST要求（更新）
		////////////////////////////////
		responseModel = restaurantsService.RestaurantsTableUpdateDelete(model,
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
