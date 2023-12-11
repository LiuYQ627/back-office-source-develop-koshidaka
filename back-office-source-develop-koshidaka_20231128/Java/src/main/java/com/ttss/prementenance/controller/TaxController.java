// KSD V001.000 AS
package com.ttss.prementenance.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.GetReservationDateQueryRequestParamModel;
import com.ttss.prementenance.model.GetReservationDateRequestModel;
import com.ttss.prementenance.model.RentalsUpdateResponseModel;
import com.ttss.prementenance.model.ReservationDateResponseModel;
import com.ttss.prementenance.model.RestaurantsCommonResponseModel;
import com.ttss.prementenance.model.TaxRateReservationRequestModel;
import com.ttss.prementenance.request.TaxSetsRequest;
import com.ttss.prementenance.response.TaxSetsResponse;
import com.ttss.prementenance.service.TaxService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * 税率設定セット API.
 *
 * @author E.J.Mesa(AWS)
 * @version 1.0.0
 */
@RestController
@RequestMapping("TaxTaxes")
public class TaxController {

	@Autowired
	private TaxService taxService;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	private SessionUtil sessionUtil;

	public TaxController() {
	}

	/**
	 * 税率設定セットPOSTの検索プロセス.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 税率設定セット検索＋αレスポンス
	 */
	@CrossOrigin
	@PostMapping("/Query")
	public TaxSetsResponse postTaxRequest(
		@RequestBody @Validated TaxSetsRequest model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {
		var responseModel = new TaxSetsResponse();

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

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

//KSD V001.000 20230810 DS
//		var getTaxSetsResponseModel = taxService.getTaxTaxes(
//				model, messageSource, apiContext, accessToken, ELERAToken,
//				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
//
//		// トークン情報の上書き
//		if (getTaxSetsResponseModel.getResult().getWSO2Token() != null
//				&& getTaxSetsResponseModel.getResult().getELERAToken() != null) {
//			accessToken = getTaxSetsResponseModel.getResult().getWSO2Token();
//			ELERAToken = getTaxSetsResponseModel.getResult().getELERAToken();
//		}
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
		responseModel = taxService.getTaxTaxes(
				model, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null
				&& responseModel.getResult().getELERAToken() != null) {
			accessToken = responseModel.getResult().getWSO2Token();
			ELERAToken = responseModel.getResult().getELERAToken();
		}
//KSD V001.000 20230810 AE

		// セッションのトークン情報の上書き
		if (accessToken != null && ELERAToken != null) {
			loginUser.setWso2ApiToken(accessToken);
			loginUser.setELERAToken(ELERAToken);
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
//KSD V001.000 20230810 DS
//		responseModel.setResponseModel(getTaxSetsResponseModel.getResponseModel());
//
//		// 正常
//		responseModel.getResult().setCode(Integer.valueOf(0));
//			return responseModel;
//KSD V001.000 20230810 DE
		return responseModel;
	}

	/**
	 * 税率設定セット更新
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @param response HttpServletResponseのリクエスト
	 * @return 税率設定セットの更新応答
	 */
	@CrossOrigin
	@PostMapping("/ReservationUpdate")
//KSD V001.000 20230816 DS
//	public RestaurantsCommonResponseModel postTaxUpdateRequest(
//			@RequestBody @Validated Map<String, Object> model,
//			Errors errors,
//				HttpServletRequest request, HttpServletResponse response) {
//
//			RestaurantsCommonResponseModel responseModel = new RestaurantsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	public RentalsUpdateResponseModel postTaxUpdateRequest(
		@RequestBody @Validated Map<String, Object> model,
		Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		RentalsUpdateResponseModel responseModel = new RentalsUpdateResponseModel();
//KSD V001.000 20230816 AE

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		responseModel = taxService.updateTaxTaxes2(
			model, messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null
				&& responseModel.getResult().getELERAToken() != null) {
			accessToken = responseModel.getResult().getWSO2Token();
			ELERAToken = responseModel.getResult().getELERAToken();
		}

		// セッションのトークン情報の上書き
		if (accessToken != null && ELERAToken != null) {
			loginUser.setWso2ApiToken(accessToken);
			loginUser.setELERAToken(ELERAToken);
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
		return responseModel;
	}

	/**
	 * 税率設定セット更新（設定変更の即時反映）
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @param response HttpServletResponseのリクエスト
	 * @return 税率設定セットの更新応答
	 */
	@CrossOrigin
	@PostMapping("/ReservationUpdateReflect")
//KSD V001.000 20230816 DS
//	public RestaurantsCommonResponseModel postTaxUpdateReflectRequest(
//			@RequestBody @Validated Map<String, Object> model,
//			Errors errors,
//				HttpServletRequest request, HttpServletResponse response) {
//
//			RestaurantsCommonResponseModel responseModel = new RestaurantsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	public RentalsUpdateResponseModel postTaxUpdateReflectRequest(
		@RequestBody @Validated Map<String, Object> model,
		Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		RentalsUpdateResponseModel responseModel = new RentalsUpdateResponseModel();
//KSD V001.000 20230816 AE

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		
		//更新
		responseModel = taxService.updateTaxTaxes2(
			model, messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
			loginUser.getPassWord());

//KSD V001.000 20231027 AS
		// トークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null
				&& responseModel.getResult().getELERAToken() != null) {
			accessToken = responseModel.getResult().getWSO2Token();
			ELERAToken = responseModel.getResult().getELERAToken();
		}
//KSD V001.000 20231027 AE

		if (responseModel.getResult().getCode() != 0) {
			return responseModel;
		}
		//idを抜取り
//KSD V001.000 20230816 DS
//		Map<String, Object> list = responseModel.getResponseModel().get(0);
//		String reservationsid = (String)list.get("id");
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
		String reservationsid = (String)responseModel.getResponseModel().get("id");
//KSD V001.000 20230816 AE

		//Reflect
		responseModel = taxService.updateTaxTaxesReflect(
				reservationsid, messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());
		
		// トークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null
				&& responseModel.getResult().getELERAToken() != null) {
			accessToken = responseModel.getResult().getWSO2Token();
			ELERAToken = responseModel.getResult().getELERAToken();
		}

		// セッションのトークン情報の上書き
		if (accessToken != null && ELERAToken != null) {
			loginUser.setWso2ApiToken(accessToken);
			loginUser.setELERAToken(ELERAToken);
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
		return responseModel;
	}

	/**
	 * 変更基準日一覧の取得
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/ReservationList")
	@ResponseBody
	public ReservationDateResponseModel postTaxRateReservationListRequest(
			@RequestBody @Validated GetReservationDateRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {
		
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			var responseModel = new ReservationDateResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		if (errors.hasErrors()) {
			// バリデーションエラー時
			var responseModel = new ReservationDateResponseModel();
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
	
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		
		if (model.getNodeId() == null) {
			model.setNodeId(loginUser.getBusinessUnitCdStr());
		}
	
		var paramReq = new GetReservationDateQueryRequestParamModel();
		paramReq.getRequestModel().setNodeId(model.getNodeId());
		paramReq.getRequestModel().setExcludeFields(model.getExcludeFields());
	
		var reservationDateQueryRes = taxService.getTaxRateReservationList(paramReq, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());
		
		// セッションのトークン情報の上書き
		if (reservationDateQueryRes.getResult().getWSO2Token() != null
				&& reservationDateQueryRes.getResult().getELERAToken() != null) {
	
			loginUser.setWso2ApiToken(reservationDateQueryRes.getResult().getWSO2Token());
			loginUser.setELERAToken(reservationDateQueryRes.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
		return reservationDateQueryRes;
	}
	/**
	 * 変更基準日の取得
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/ReservationGet")
	@ResponseBody
//KSD V001.000 20230816 DS
//	public RestaurantsCommonResponseModel getTaxRateReservation(
//			@RequestBody @Validated TaxRateReservationRequestModel model, Errors errors,
//			HttpServletRequest request, HttpServletResponse response) {
//		
//		var responseModel = new RestaurantsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	public RentalsUpdateResponseModel getTaxRateReservation(
			@RequestBody @Validated TaxRateReservationRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {
		
		var responseModel = new RentalsUpdateResponseModel();
//KSD V001.000 20230816 AE
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

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		
		responseModel = taxService.getTaxRateReservation(model.getId(), messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());
		
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

		return responseModel;
	}
	/**
	 * 変更基準日の削除
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/ReservationDel")
	@ResponseBody
	public RestaurantsCommonResponseModel deleteTaxRateReservation(
			@RequestBody @Validated TaxRateReservationRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new RestaurantsCommonResponseModel();
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

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		
		responseModel = taxService.delTaxRateReservation(model.getId(), messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());
		
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
		return responseModel;
	}
}

