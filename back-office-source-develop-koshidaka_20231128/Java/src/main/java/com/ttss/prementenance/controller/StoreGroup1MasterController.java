// KSD V001.000 20230829 AS
package com.ttss.prementenance.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.ConfigurationsChangePlanModel;
import com.ttss.prementenance.model.PostChangePlanRequestModel;
import com.ttss.prementenance.model.PostChangePlanResponseModel;
import com.ttss.prementenance.model.PostConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestBodyModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestParamModel;
import com.ttss.prementenance.model.PutStoreResponseModel;
import com.ttss.prementenance.service.ChangePlanService;
import com.ttss.prementenance.service.ConfigurationsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * 店舗グループ１マスタ
 *
 */
@RestController
@RequestMapping("StoreGroup1Master")
public class StoreGroup1MasterController {

	@Autowired
	private ConfigurationsService configurationsService;

	@Autowired
	private ChangePlanService changePlanService;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	private SessionUtil sessionUtil;

	@Autowired
	public StoreGroup1MasterController() {
	}

	/**
	 * 店舗グループ１マスタ更新処理.
	 *
	 * @param stores リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 店舗マスタ更新＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/Update")
	@ResponseBody
	public PutStoreResponseModel storeGroup1MasterUpdate(
			@RequestBody @Validated Map<String, Object> model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PutStoreResponseModel();
		responseModel.setResult(new ApiCommonResponseModel());

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		String businessCd = loginUser.getBusinessUnitCdStr();
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		/////////////////////////////////////
		// changeplans/records(draft)
		/////////////////////////////////////
		var postChangePlanRequestModel = new PostChangePlanRequestModel();
		String nodeId = businessCd;
		String changePlanNameUnitCdStr = "";

		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
		String timeStamp = date.format(new Date());

		// 名称：企業コード＋ユーザーID＋タイムスタンプ
		changePlanNameUnitCdStr = nodeId + loginUser.getUserId() + timeStamp;

		postChangePlanRequestModel.setName(changePlanNameUnitCdStr);
		postChangePlanRequestModel.setStatus("Draft");

		// サービス呼出
		//changeplans/records
		var postChangePlanResponseModel = new PostChangePlanResponseModel();
		postChangePlanResponseModel = changePlanService.postChangePlan(postChangePlanRequestModel,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// トークン情報の上書き
		if (postChangePlanResponseModel.getResult().getWSO2Token() != null
				&& postChangePlanResponseModel.getResult().getELERAToken() != null) {
			accessToken = postChangePlanResponseModel.getResult().getWSO2Token();
			ELERAToken = postChangePlanResponseModel.getResult().getELERAToken();
		}

		if (postChangePlanResponseModel.getResult().getCode() != 0) {
			// エラーメッセージをセット
			int intcode = postChangePlanResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					postChangePlanResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		/////////////////////////////
		//現在の設定情報を取得
		/////////////////////////////
		var requestParamModel = new PostConfigurationsNodesRequestParamModel();
		requestParamModel.getRequestModel().setChangePlanName(changePlanNameUnitCdStr);
		// BODY
		var requestNodesNodeIdBodyModel = new PostConfigurationsNodesNodeIdRequestModel();

		// サービス呼出
		//configurations/nodes/企業ｺｰﾄﾞ/?changePlanName=[Node+User+Date]
		var postConfigurationsResponseModel = configurationsService.postNodesNodeId(
				requestParamModel, requestNodesNodeIdBodyModel, nodeId, messageSource,
				apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());
		// トークン情報の上書き
		if (postConfigurationsResponseModel.getResult().getWSO2Token() != null
				&& postConfigurationsResponseModel.getResult().getELERAToken() != null) {
			accessToken = postConfigurationsResponseModel.getResult().getWSO2Token();
			ELERAToken = postConfigurationsResponseModel.getResult().getELERAToken();
		}
		if (postConfigurationsResponseModel.getResult().getCode() != 0) {
			// エラーメッセージをセット
			// 失敗
			int intcode = postConfigurationsResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					postConfigurationsResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}
				
		/////////////////////////////////////
		// 更新
		// configurations/nodes?changePlanName=[Node+User+Date]
		/////////////////////////////////////
		var postNodesParamModel = new PostConfigurationsNodesRequestParamModel();
		var postNodesBodyModel = new PostConfigurationsNodesRequestBodyModel();

		//取得した設定情報をセット
		postNodesBodyModel.setRequestModel(postConfigurationsResponseModel.getResponseModel());
		// "changePlan"追加(false=削除しない)
		postNodesBodyModel.getRequestModel().setChangePlan(new ConfigurationsChangePlanModel());
		postNodesBodyModel.getRequestModel().getChangePlan().setName(changePlanNameUnitCdStr);
		postNodesBodyModel.getRequestModel().getChangePlan().setDeleted(false);
		// "STORE_GROUP_1"追加
//KSD V001.000 20230904 DS
//		postNodesBodyModel.getRequestModel().getConfigurations().setSTORE_GROUP_1(model);
//KSD V001.000 20230904 DE
//KSD V001.000 20230904 AS
		Map<String, Object> model_wk = (Map<String, Object>)model.get("STORE_GROUP_1");
		postNodesBodyModel.getRequestModel().getConfigurations().setSTORE_GROUP_1(model_wk);
//KSD V001.000 20230904 AE
		
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//		changePlanNameUnitCdStr = "000000000000001tecsys20230123456789";	//WireMock対応
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
		// パラメータにchangePlanNameをセット
		postNodesParamModel.getRequestModel().setChangePlanName(changePlanNameUnitCdStr);

		// サービス呼出
		// configurations/nodes?changePlanName={changePlanName}
		var postConfigurationsNodesResponseModel = configurationsService.postNodes(
				postNodesParamModel, postNodesBodyModel, messageSource, apiContext, accessToken,
				ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (postConfigurationsNodesResponseModel.getResult().getWSO2Token() != null
				&& postConfigurationsNodesResponseModel.getResult().getELERAToken() != null) {
			accessToken = postConfigurationsNodesResponseModel.getResult().getWSO2Token();
			ELERAToken = postConfigurationsNodesResponseModel.getResult().getELERAToken();
		}

		if (postConfigurationsNodesResponseModel.getResult().getCode() != 0) {
			// エラーメッセージをセット
			int intcode = postConfigurationsNodesResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					postConfigurationsNodesResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		/////////////////////////////////////
		// changeplans/records(Pending)
		/////////////////////////////////////
		postChangePlanRequestModel.setName(postChangePlanResponseModel.getResponseModel().getName());
		postChangePlanRequestModel.setVersion(postChangePlanResponseModel.getResponseModel().getVersion());
		postChangePlanRequestModel.setStatus("Pending");
		postChangePlanRequestModel.setNotes(postChangePlanResponseModel.getResponseModel().getNotes());

		// サービス呼出
		var postChangePlanPendingResponseModel = changePlanService.postChangePlan(
				postChangePlanRequestModel, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (postChangePlanPendingResponseModel.getResult().getWSO2Token() != null
				&& postChangePlanPendingResponseModel.getResult().getELERAToken() != null) {
			accessToken = postChangePlanPendingResponseModel.getResult().getWSO2Token();
			ELERAToken = postChangePlanPendingResponseModel.getResult().getELERAToken();
		}

		if (postChangePlanPendingResponseModel.getResult().getCode() != 0) {
			// エラーメッセージをセット
			int intcode = postChangePlanPendingResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					postChangePlanPendingResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		/////////////////////////////////////
		// changeplans/execute
		/////////////////////////////////////
		// サービス呼出（"Complete"応答まで待つ）
		var executeResponseModel = changePlanService.postChangePlanExecute(changePlanNameUnitCdStr,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		if (executeResponseModel.getResult().getCode() != 0) {
			// 失敗
			int intcode = executeResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(executeResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		// ここまで到達出来たら正常
		responseModel.getResult().setCode(0);

		// セッションのトークン情報の上書き
		if (executeResponseModel.getResult().getWSO2Token() != null
				&& executeResponseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(executeResponseModel.getResult().getWSO2Token());
			loginUser.setELERAToken(executeResponseModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
		return responseModel;
	}

	/**
	 * 店舗グループ１マスタ削除処理. 未使用です。更新処理に統一
	 *
	 * @param storeCd 店舗コード
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 店舗マスタ削除＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/Delete")
	public PutStoreResponseModel storeGroup1MasterDeleted(
			@RequestBody @Validated Map<String, Object> model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PutStoreResponseModel();
		responseModel.setResult(new ApiCommonResponseModel());
		
		responseModel.getResult().setCode(99);
		return responseModel;
	}
}
//KSD V001.000 20230829 AE
