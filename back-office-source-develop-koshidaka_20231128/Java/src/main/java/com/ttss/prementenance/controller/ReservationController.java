/**
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221212  dingxin(Neusoft)  G001.00.0  issue課題#1212を対応します.
 * 20221226  duyouwei(Neusoft) G001.00.1  issue課題#1161を対応します.
 * 20230207  dingxin(Neusoft)  G002.00.0  issue課題#1540を対応します.
 */
package com.ttss.prementenance.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
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

import com.ttss.prementenance.model.ConfigurationDetailResponseModel;
import com.ttss.prementenance.model.ConfigurationsChangePlanModel;
import com.ttss.prementenance.model.ConfigurationsDetailModel;
import com.ttss.prementenance.model.GetConfigurationDetailRequestModel;
import com.ttss.prementenance.model.GetReservationDateQueryRequestParamModel;
import com.ttss.prementenance.model.GetReservationDateRequestModel;
import com.ttss.prementenance.model.PostChangePlanRequestModel;
import com.ttss.prementenance.model.PostChangePlanResponseModel;
import com.ttss.prementenance.model.PostConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestBodyModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestParamModel;
import com.ttss.prementenance.model.PutConfigurationRequestModel;
import com.ttss.prementenance.model.PutConfigurationResponseModel;
import com.ttss.prementenance.model.PutReservationRequestModel;
import com.ttss.prementenance.model.PutReservationResponseModel;
import com.ttss.prementenance.model.ReservationDateResponseModel;
import com.ttss.prementenance.model.ReservationDetailModel;
import com.ttss.prementenance.model.ReservationDetailResponseModel;
import com.ttss.prementenance.service.ChangePlanService;
import com.ttss.prementenance.service.ConfigurationsService;
import com.ttss.prementenance.service.ReservationService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
import com.ttss.prementenance.utils.SessionUtil;


/**
 * 電子ジャーナル画面&API.
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("Reservation")
public class ReservationController {

	// G001.00.0 Delete Start
	// G001.00.1 Add-Start
	@Autowired
	private ConfigurationsService configurationsService;

	@Autowired
	private ChangePlanService changePlanService;
	// G001.00.1 Add-End
	// G001.00.0 Delete End

	@Autowired
	private ReservationService reservationService;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	private SessionUtil sessionUtil;

	@Autowired
	public ReservationController() {
	}

	/**
	 * 変更基準日一覧の取得リクエスト.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/FetchDateList")
	@ResponseBody
	public ReservationDateResponseModel fetchDateList(
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
		
		// G001.00.0 Add Start
		// 運用設定
		if (model.getNodeId() == null) {
			model.setNodeId(loginUser.getBusinessUnitCdStr());
		}
		// G001.00.0 Add End

		var paramReq = new GetReservationDateQueryRequestParamModel();
		paramReq.getRequestModel().setNodeId(model.getNodeId());
		paramReq.getRequestModel().setExcludeFields(model.getExcludeFields());
		//        paramReq.getRequestModel().setType(model.getType());

		var reservationDateQueryRes = reservationService.getReservationDate(paramReq, messageSource, apiContext,
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
	 * 変更基準日の詳細情報取得リクエスト.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/FetchDetail")
	@ResponseBody
	public ReservationDetailResponseModel fetchDateDetail(
			@RequestBody @Validated GetReservationDateRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			var responseModel = new ReservationDetailResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			var responseModel = new ReservationDetailResponseModel();
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		
		// G001.00.0 Add Start
		// 運用設定
		if (model.getNodeId() == null) {
			model.setNodeId(loginUser.getBusinessUnitCdStr());
		}
		// G001.00.0 Add End

		var paramReq = new GetReservationDateQueryRequestParamModel();
		paramReq.getRequestModel().setNodeId(model.getNodeId());
		paramReq.getRequestModel().setExcludeFields(model.getExcludeFields());
		paramReq.getRequestModel().setType(model.getType());
		paramReq.getRequestModel().setExecutionDate(model.getExecutionDate());

		var reservationDateQueryRes = reservationService.getReservationDetail(paramReq, messageSource, apiContext,
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
	 * 変更基準日の追加・更新リクエスト.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/UpdateDetail")
	@ResponseBody
	public PutReservationResponseModel updateReservation(
			@RequestBody @Validated PutReservationRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			var responseModel = new PutReservationResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			var responseModel = new PutReservationResponseModel();
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		
		// G001.00.0 Add Start
		// 運用設定
		if (model.getNodeId() == null) {
			model.setNodeId(loginUser.getBusinessUnitCdStr());
			model.getConfiguration().setNodeId(loginUser.getBusinessUnitCdStr());
		}	
		// G001.00.0 Add End

		var reservationDateQueryRes = reservationService.updateReservation(model.getNodeId(), model.getType(),
				model.getExecutionDate(),
				model.getConfiguration(), messageSource, apiContext,
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
	
	// G001.00.0 Add Start
	/**
	 * 変更基準日の削除リクエスト.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/DestroyDetail")
	@ResponseBody
	public PutReservationResponseModel destroyReservation(
			@RequestBody @Validated PutReservationRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			var responseModel = new PutReservationResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			var responseModel = new PutReservationResponseModel();
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		
		// G001.00.0 Add Start
		// 運用設定
		if (model.getNodeId() == null) {
			model.setNodeId(loginUser.getBusinessUnitCdStr());
		}
		// G001.00.0 Add End

		var reservationDateQueryRes = reservationService.destroyReservation(model.getNodeId(), model.getType(),
				model.getExecutionDate(), messageSource, apiContext,
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
	// G001.00.0 Add End

	/**
	 * 現在の設定の詳細情報取得リクエスト.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/FetchConfiguration")
	@ResponseBody
	public ConfigurationDetailResponseModel fetchConfigurationDetail(
			@RequestBody @Validated GetConfigurationDetailRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			var responseModel = new ConfigurationDetailResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			var responseModel = new ConfigurationDetailResponseModel();
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// 運用設定
		if (model.getNodeId() == null) {
			model.setNodeId(loginUser.getBusinessUnitCdStr());
		}

		var reservationDateQueryRes = reservationService.getConfigurationDetail(model.getNodeId(), messageSource,
				apiContext,
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

	// G001.00.0 Add-Start
	/**
	 * 現在の設定の詳細情報取得リクエスト.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/FetchConfigurationRecursive")
	@ResponseBody
	public ConfigurationDetailResponseModel fetchConfigurationDetailRecursive(
			@RequestBody @Validated GetConfigurationDetailRequestModel model, Errors	 errors,
			HttpServletRequest request, HttpServletResponse response) {
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			var responseModel = new ConfigurationDetailResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			var responseModel = new ConfigurationDetailResponseModel();
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// 運用設定
		if (model.getNodeId() == null) {
			model.setNodeId(loginUser.getBusinessUnitCdStr());
		}

		var reservationDateQueryRes = reservationService.getConfigurationDetailRecursive(model.getNodeId(), messageSource,
				apiContext,
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
	// G001.00.0 Add-End

	/**
	 * 現在の設定の更新リクエスト.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/UpdateConfiguration")
	@ResponseBody
	public PutConfigurationResponseModel updateConfiguration(
			@RequestBody @Validated PutConfigurationRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PutConfigurationResponseModel();
		// G001.00.0 Delete Start
//		var messageResourseUtil = new MessageSourceUtil(messageSource);
		// G001.00.0 Delete End

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
		
		// G001.00.0 Add Start
		// 運用設定
		if (model.getNodeId() == null) {
			model.setNodeId(loginUser.getBusinessUnitCdStr());
		}
		// G001.00.0 Add End

		// G001.00.0 Delete Start
//		String businessCd = loginUser.getBusinessUnitCdStr();
		// G001.00.0 Delete End
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		// G001.00.0 Delete Start	
//		try {
		// G001.00.0 Delete End	
			// 最初にresarvationを実行する
			// 日付
			Calendar cl = Calendar.getInstance();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			model.setExecutionDate(sdf.format(cl.getTime()));

			JSONObject configurationRev = new JSONObject(model.getConfiguration());
			// G001.00.0 Delete Start	
//			JSONObject jsonDataRev = configurationRev.getJSONObject("configurations");
//			ObjectMapper mapperRev = new ObjectMapper();
//			ConfigurationsDetailModel configurationsRev = mapperRev.readValue(jsonDataRev.toString(),
//					ConfigurationsDetailModel.class);
			// G001.00.0 Delete End	
			ReservationDetailModel reservationDetailModel = new ReservationDetailModel();
			reservationDetailModel.setConfigurationType(model.getType());
			reservationDetailModel.setNodeId(model.getNodeId());
			JSONObject configMap = configurationRev.getJSONObject("configurations");
			// G002.00.0 Update-Start
			if(FilterMapForConfigurations(configMap, model.getType()) != null) {
				reservationDetailModel.setConfigurationSetting(FilterMapForConfigurations(configMap, model.getType()));
			} else {
				reservationDetailModel.setConfigurationSetting(configMap.toMap());
			}
			//reservationDetailModel.setConfigurationSetting(configMap.toMap());
			// G002.00.0 Update-End
			reservationDetailModel.setExecutionDate(model.getExecutionDate());

			//			// 現在の情報を取得
			//			var requestModel = new GetConfigurationsNodesNodeIdRequestModel();
			//			var postConfigurationsResponseModel = configurationsService.getNodesNodeId(
			//					requestModel, model.getNodeId(), messageSource,
			//					apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
			//					loginUser.getPassWord());
			//
			//			// トークン情報の上書き
			//			if (postConfigurationsResponseModel.getResult().getWSO2Token() != null
			//					&& postConfigurationsResponseModel.getResult().getELERAToken() != null) {
			//				accessToken = postConfigurationsResponseModel.getResult().getWSO2Token();
			//				ELERAToken = postConfigurationsResponseModel.getResult().getELERAToken();
			//			}
			//
			//			if (postConfigurationsResponseModel.getResult().getCode() != 0) {
			//				// エラーメッセージをセット
			//				int intcode = postConfigurationsResponseModel.getResult().getCode().intValue();
			//				responseModel.getResult().setCode(Integer.valueOf(intcode));
			//				responseModel.getResult().setErrorMessageMap(
			//						postConfigurationsResponseModel.getResult().getErrorMessageMap());
			//				return responseModel;
			//			}

			//			// Configurationsを上書き
			//			postConfigurationsResponseModel.getResponseModel().setConfigurations(configurationsRev);
			//			var reservationDateQueryRes = reservationService.updateConfigReservation(model.getNodeId(), model.getType(),
			//					model.getExecutionDate(),
			//					postConfigurationsResponseModel, messageSource, apiContext,
			//					accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
			//					loginUser.getPassWord());

			var reservationDateQueryRes = reservationService.updateReservation(model.getNodeId(), model.getType(),
					model.getExecutionDate(),
					reservationDetailModel, messageSource, apiContext,
					accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// G001.00.0 Add Start
			if (reservationDateQueryRes.getResult().getCode() != 0) {
				// エラーメッセージをセット
				int intcode = reservationDateQueryRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult().setErrorMessageMap(
						reservationDateQueryRes.getResult().getErrorMessageMap());
				return responseModel;
			}
			// G001.00.0 Add End
			
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

			// reflect実行
			var reservationDateReflectRes = reservationService.updateReservationReflect(model.getNodeId(),
					model.getType(),
					model.getExecutionDate(),
					reservationDetailModel, messageSource, apiContext,
					accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// G001.00.0 Add Start
			if (reservationDateReflectRes.getResult().getCode() != 0) {
				// エラーメッセージをセット
				int intcode = reservationDateReflectRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult().setErrorMessageMap(
						reservationDateReflectRes.getResult().getErrorMessageMap());
				return responseModel;
			}
			// ここまで到達出来たら正常
			responseModel.getResult().setCode(0);
			// G001.00.0 Add End
			
			// セッションのトークン情報の上書き
			if (reservationDateReflectRes.getResult().getWSO2Token() != null
					&& reservationDateQueryRes.getResult().getELERAToken() != null) {

				loginUser.setWso2ApiToken(reservationDateReflectRes.getResult().getWSO2Token());
				loginUser.setELERAToken(reservationDateReflectRes.getResult().getELERAToken());
				// ユーザ情報をセッション管理用リポジトリに追加
				var sessionId = sessionUtil.saveUserToRepository(loginUser);
				// レスポンスのヘッダーにセッションID用のCookieをセットする
				response = sessionUtil.setCookie(response, sessionId);
			}
			
			
		// G001.00.0 Delete Start	
//		} catch (JsonMappingException e1) {
//			// TODO 自動生成された catch ブロック
//			e1.printStackTrace();
//		} catch (JsonProcessingException e1) {
//			// TODO 自動生成された catch ブロック
//			e1.printStackTrace();
//		}
//		// changeplans/records(draft)
//		var postChangePlanRequestModel = new PostChangePlanRequestModel();
//
//		// 運用設定用
//		if (model.getNodeId() == null) {
//			model.setNodeId(loginUser.getBusinessUnitCdStr());
//		}
//		String nodeId = model.getNodeId();
//		String changePlanNameUnitCdStr = "";
//
//		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
//		String timeStamp = date.format(new Date());
//
//		// changePlanName名の作成(名称：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ)
//		changePlanNameUnitCdStr = nodeId + loginUser.getUserId() + timeStamp;
//
//		postChangePlanRequestModel.setName(changePlanNameUnitCdStr);
//		postChangePlanRequestModel.setStatus("Draft");
//
//		var postChangePlanResponseModel = new PostChangePlanResponseModel();
//		postChangePlanResponseModel = changePlanService.postChangePlan(postChangePlanRequestModel,
//				messageSource, apiContext, accessToken, ELERAToken,
//				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
//				loginUser.getPassWord());
//
//		// トークン情報の上書き
//		if (postChangePlanResponseModel.getResult().getWSO2Token() != null
//				&& postChangePlanResponseModel.getResult().getELERAToken() != null) {
//			accessToken = postChangePlanResponseModel.getResult().getWSO2Token();
//			ELERAToken = postChangePlanResponseModel.getResult().getELERAToken();
//		}
//
//		if (postChangePlanResponseModel.getResult().getCode() != 0) {
//			// エラーメッセージをセット
//			int intcode = postChangePlanResponseModel.getResult().getCode().intValue();
//			responseModel.getResult().setCode(Integer.valueOf(intcode));
//			responseModel.getResult().setErrorMessageMap(
//					postChangePlanResponseModel.getResult().getErrorMessageMap());
//			return responseModel;
//		}
//
//		var postNodesParamModel = new PostConfigurationsNodesRequestParamModel();
//		var postNodesBodyModel = new PostConfigurationsNodesRequestBodyModel();
//
//		// 編集ならばConfigurationsを検索して、その値を取得する（その後に変更分を反映する）
//		if (model.getMode() != 1) {
//			// 編集
//			// 事前に取出し
//			var requestParamModel = new PostConfigurationsNodesRequestParamModel();
//			requestParamModel.getRequestModel().setChangePlanName(changePlanNameUnitCdStr);
//
//			// BODY
//			var requestNodesNodeIdBodyModel = new PostConfigurationsNodesNodeIdRequestModel();
//
//			var postConfigurationsResponseModel = configurationsService.postNodesNodeId(
//					requestParamModel, requestNodesNodeIdBodyModel, nodeId, messageSource,
//					apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
//					loginUser.getPassWord());
//
//			// トークン情報の上書き
//			if (postConfigurationsResponseModel.getResult().getWSO2Token() != null
//					&& postConfigurationsResponseModel.getResult().getELERAToken() != null) {
//				accessToken = postConfigurationsResponseModel.getResult().getWSO2Token();
//				ELERAToken = postConfigurationsResponseModel.getResult().getELERAToken();
//			}
//
//			if (postConfigurationsResponseModel.getResult().getCode() != 0) {
//				// エラーメッセージをセット
//				int intcode = postConfigurationsResponseModel.getResult().getCode().intValue();
//				responseModel.getResult().setCode(Integer.valueOf(intcode));
//				responseModel.getResult().setErrorMessageMap(
//						postConfigurationsResponseModel.getResult().getErrorMessageMap());
//				return responseModel;
//			}
//
//			// configurations/nodes?changePlanName={changePlanName}
//			postNodesBodyModel.setRequestModel(postConfigurationsResponseModel.getResponseModel());
//
//		} else {
//			// 新規で必要な情報をセット（ChangePlan関係）
//			postNodesBodyModel.getRequestModel().setChangePlan(new ConfigurationsChangePlanModel());
//			postNodesBodyModel.getRequestModel().getChangePlan().setName(changePlanNameUnitCdStr);
//			postNodesBodyModel.getRequestModel().getChangePlan().setDeleted(false);
//		}
//
//		try {
//			JSONObject configuration = new JSONObject(model.getConfiguration());
//			JSONObject jsonData = configuration.getJSONObject("configurations");
//
//			ObjectMapper mapper = new ObjectMapper();
//			ConfigurationsDetailModel configurations = mapper.readValue(jsonData.toString(),
//					ConfigurationsDetailModel.class);
//
//			postNodesBodyModel.getRequestModel().setConfigurations(configurations);
//
//			//			JSONObject jsonData = configuration.getJSONObject("configurations");
//			//			JSONObject optionsData = jsonData.getJSONObject("SYSTEM_OPTION_BARCODE");
//			//			JSONObject conversionData = jsonData.getJSONObject("BARCODE_CONVERSION");
//			//			JSONObject flagData = jsonData.getJSONObject("BARCODE_FLAG");
//			//			JSONObject revenueStampSetting = jsonData.getJSONObject("REVENUE_STAMP_SETTINGS");
//			//			JSONObject revenueStampConfiguration = jsonData.getJSONObject("REVENUE_STAMP_CONFIGURATION");
//			//			JSONObject transactionNameData = jsonData.getJSONObject("NAME_TRANSACTION_SETTINGS");
//			//			JSONObject businessDayStartTimeData = jsonData.getJSONObject("BUSINESS_DAY_START_TIME");
//			//			JSONObject storeOperationSData = jsonData.getJSONObject("STORE_OPERATIONS_SETTINGS");
//			//			JSONObject drawerMenuSettings = jsonData.getJSONObject("DRAWER_MENU_SETTINGS");
//			//			JSONObject itemDetailsSettings = jsonData.getJSONObject("ITEM_DETAILS_SETTINGS");
//			//			JSONObject accountingSettings = jsonData.getJSONObject("ACCOUNTING_SETTINGS");
//			//			JSONObject operationSData = jsonData.getJSONObject("OPERATIONS_SETTINGS");
//			//
//			//			ConfigurationsDetailModel configurations = new ConfigurationsDetailModel();
//			//			configurations.setSYSTEM_OPTION_BARCODE(optionsData.toMap());
//			//			configurations.setBARCODE_CONVERSION(conversionData.toMap());
//			//			configurations.setBARCODE_FLAG(flagData.toMap());
//			//			configurations.setREVENUE_STAMP_SETTINGS(revenueStampSetting.toMap());
//			//			configurations.setREVENUE_STAMP_CONFIGURATION(revenueStampConfiguration.toMap());
//			//			configurations.setNAME_TRANSACTION_SETTINGS(transactionNameData.toMap());
//			//			configurations.setBUSINESS_DAY_START_TIME_MAP(businessDayStartTimeData.toMap());
//			//			configurations.setSTORE_OPERATIONS_SETTINGS(storeOperationSData.toMap());
//			//			configurations.setDRAWER_MENU_SETTINGS(drawerMenuSettings.toMap());
//			//			configurations.setITEM_DETAILS_SETTINGS(itemDetailsSettings.toMap());
//			//			configurations.setACCOUNTING_SETTINGS(accountingSettings.toMap());
//			//			configurations.setOPERATIONS_SETTINGS(operationSData.toMap());
//			//
//			//			//			// 既存のConfigurationsも更新する
//			//			//			// 店舗の場合
//			//			//			JSONObject payment1Data = jsonData.getJSONObject("PAYMENT_01");
//			//			//			JSONObject payment2Data = jsonData.getJSONObject("PAYMENT_02");
//			//			//			JSONObject payment3Data = jsonData.getJSONObject("PAYMENT_03");
//			//			//			JSONObject payment4Data = jsonData.getJSONObject("PAYMENT_04");
//			//			//			JSONObject payment5Data = jsonData.getJSONObject("PAYMENT_05");
//			//			//			JSONObject payment6Data = jsonData.getJSONObject("PAYMENT_06");
//			//			//			JSONObject payment7Data = jsonData.getJSONObject("PAYMENT_07");
//			//			//			JSONObject payment8Data = jsonData.getJSONObject("PAYMENT_08");
//			//			//			JSONObject payment9Data = jsonData.getJSONObject("PAYMENT_09");
//			//			//			JSONObject payment10Data = jsonData.getJSONObject("PAYMENT_10");
//			//			//			JSONObject payment11Data = jsonData.getJSONObject("PAYMENT_11");
//			//			//			JSONObject payment12Data = jsonData.getJSONObject("PAYMENT_12");
//			//			//			JSONObject payment13Data = jsonData.getJSONObject("PAYMENT_13");
//			//			//			JSONObject payment14Data = jsonData.getJSONObject("PAYMENT_14");
//			//			//			JSONObject payment15Data = jsonData.getJSONObject("PAYMENT_15");
//			//			//			JSONObject payment16Data = jsonData.getJSONObject("PAYMENT_16");
//			//			//			JSONObject payment17Data = jsonData.getJSONObject("PAYMENT_17");
//			//			//			JSONObject payment18Data = jsonData.getJSONObject("PAYMENT_18");
//			//			//			JSONObject payment19Data = jsonData.getJSONObject("PAYMENT_19");
//			//			//			JSONObject payment20Data = jsonData.getJSONObject("PAYMENT_20");
//			//			//			JSONObject payment21Data = jsonData.getJSONObject("PAYMENT_21");
//			//			//			JSONObject payment22Data = jsonData.getJSONObject("PAYMENT_22");
//			//			//			JSONObject payment23Data = jsonData.getJSONObject("PAYMENT_23");
//			//			//			JSONObject payment24Data = jsonData.getJSONObject("PAYMENT_24");
//			//			//			JSONObject payment25Data = jsonData.getJSONObject("PAYMENT_25");
//			//			//			JSONObject payment26Data = jsonData.getJSONObject("PAYMENT_26");
//			//			//			JSONObject payment27Data = jsonData.getJSONObject("PAYMENT_27");
//			//			//			JSONObject payment28Data = jsonData.getJSONObject("PAYMENT_28");
//			//			//			JSONObject payment29Data = jsonData.getJSONObject("PAYMENT_29");
//			//			//			JSONObject payment30Data = jsonData.getJSONObject("PAYMENT_30");
//			//			//			JSONObject payment31Data = jsonData.getJSONObject("PAYMENT_31");
//			//			//			JSONObject payment32Data = jsonData.getJSONObject("PAYMENT_32");
//			//			//			JSONObject payment33Data = jsonData.getJSONObject("PAYMENT_33");
//			//			//			JSONObject payment34Data = jsonData.getJSONObject("PAYMENT_34");
//			//			//			JSONObject payment35Data = jsonData.getJSONObject("PAYMENT_35");
//			//			//			JSONObject payment36Data = jsonData.getJSONObject("PAYMENT_36");
//			//			//			JSONObject payment37Data = jsonData.getJSONObject("PAYMENT_37");
//			//			//			JSONObject payment38Data = jsonData.getJSONObject("PAYMENT_38");
//			//			//			JSONObject payment39Data = jsonData.getJSONObject("PAYMENT_39");
//			//			//			JSONObject payment40Data = jsonData.getJSONObject("PAYMENT_40");
//			//			//			JSONObject payment41Data = jsonData.getJSONObject("PAYMENT_41");
//			//			//			JSONObject payment42Data = jsonData.getJSONObject("PAYMENT_42");
//			//			//			JSONObject payment43Data = jsonData.getJSONObject("PAYMENT_43");
//			//			//			JSONObject payment44Data = jsonData.getJSONObject("PAYMENT_44");
//			//			//			JSONObject payment45Data = jsonData.getJSONObject("PAYMENT_45");
//			//			//			JSONObject payment46Data = jsonData.getJSONObject("PAYMENT_46");
//			//			//			JSONObject payment47Data = jsonData.getJSONObject("PAYMENT_47");
//			//			//			JSONObject payment48Data = jsonData.getJSONObject("PAYMENT_48");
//			//			//			JSONObject payment49Data = jsonData.getJSONObject("PAYMENT_49");
//			//			//			JSONObject payment50Data = jsonData.getJSONObject("PAYMENT_50");
//			//			//			JSONObject payment51Data = jsonData.getJSONObject("PAYMENT_51");
//			//			//			JSONObject payment52Data = jsonData.getJSONObject("PAYMENT_52");
//			//			//			JSONObject payment53Data = jsonData.getJSONObject("PAYMENT_53");
//			//			//			JSONObject payment54Data = jsonData.getJSONObject("PAYMENT_54");
//			//			//			JSONObject payment55Data = jsonData.getJSONObject("PAYMENT_55");
//			//			//			JSONObject payment56Data = jsonData.getJSONObject("PAYMENT_56");
//			//			//			JSONObject payment57Data = jsonData.getJSONObject("PAYMENT_57");
//			//			//			JSONObject payment58Data = jsonData.getJSONObject("PAYMENT_58");
//			//			//			JSONObject payment59Data = jsonData.getJSONObject("PAYMENT_59");
//			//			//			JSONObject payment60Data = jsonData.getJSONObject("PAYMENT_60");
//			//			//			JSONObject payment61Data = jsonData.getJSONObject("PAYMENT_61");
//			//			//			JSONObject payment62Data = jsonData.getJSONObject("PAYMENT_62");
//			//			//			JSONObject payment63Data = jsonData.getJSONObject("PAYMENT_63");
//			//			//			JSONObject payment64Data = jsonData.getJSONObject("PAYMENT_64");
//			//			//			JSONObject payment65Data = jsonData.getJSONObject("PAYMENT_65");
//			//			//			JSONObject payment66Data = jsonData.getJSONObject("PAYMENT_66");
//			//			//			JSONObject payment67Data = jsonData.getJSONObject("PAYMENT_67");
//			//			//			JSONObject payment68Data = jsonData.getJSONObject("PAYMENT_68");
//			//			//			JSONObject payment69Data = jsonData.getJSONObject("PAYMENT_69");
//			//			//			JSONObject payment70Data = jsonData.getJSONObject("PAYMENT_70");
//			//			//			JSONObject payment71Data = jsonData.getJSONObject("PAYMENT_71");
//			//			//			JSONObject payment72Data = jsonData.getJSONObject("PAYMENT_72");
//			//			//			JSONObject payment73Data = jsonData.getJSONObject("PAYMENT_73");
//			//			//			JSONObject payment74Data = jsonData.getJSONObject("PAYMENT_74");
//			//			//			JSONObject payment75Data = jsonData.getJSONObject("PAYMENT_75");
//			//			//			JSONObject payment76Data = jsonData.getJSONObject("PAYMENT_76");
//			//			//			JSONObject payment77Data = jsonData.getJSONObject("PAYMENT_77");
//			//			//			JSONObject payment78Data = jsonData.getJSONObject("PAYMENT_78");
//			//			//			JSONObject payment79Data = jsonData.getJSONObject("PAYMENT_79");
//			//			//			JSONObject payment80Data = jsonData.getJSONObject("PAYMENT_80");
//			//			//			JSONObject payment81Data = jsonData.getJSONObject("PAYMENT_81");
//			//			//			JSONObject payment82Data = jsonData.getJSONObject("PAYMENT_82");
//			//			//			JSONObject payment83Data = jsonData.getJSONObject("PAYMENT_83");
//			//			//			JSONObject payment84Data = jsonData.getJSONObject("PAYMENT_84");
//			//			//			JSONObject payment85Data = jsonData.getJSONObject("PAYMENT_85");
//			//			//			JSONObject payment86Data = jsonData.getJSONObject("PAYMENT_86");
//			//			//			JSONObject payment87Data = jsonData.getJSONObject("PAYMENT_87");
//			//			//			JSONObject payment88Data = jsonData.getJSONObject("PAYMENT_88");
//			//			//			JSONObject payment89Data = jsonData.getJSONObject("PAYMENT_89");
//			//			//			JSONObject payment90Data = jsonData.getJSONObject("PAYMENT_90");
//			//			//			JSONObject payment91Data = jsonData.getJSONObject("PAYMENT_91");
//			//			//			JSONObject payment92Data = jsonData.getJSONObject("PAYMENT_92");
//			//			//			JSONObject payment93Data = jsonData.getJSONObject("PAYMENT_93");
//			//			//			JSONObject payment94Data = jsonData.getJSONObject("PAYMENT_94");
//			//			//			JSONObject payment95Data = jsonData.getJSONObject("PAYMENT_95");
//			//			//			JSONObject payment96Data = jsonData.getJSONObject("PAYMENT_96");
//			//			//			JSONObject payment97Data = jsonData.getJSONObject("PAYMENT_97");
//			//			//			JSONObject payment98Data = jsonData.getJSONObject("PAYMENT_98");
//			//			//			JSONObject payment99Data = jsonData.getJSONObject("PAYMENT_99");
//			//			//			JSONObject catalogData = jsonData.getJSONObject("CATALOG");
//			//			//			JSONObject priceListsData = jsonData.getJSONObject("PRICE_LISTS");
//			//			//			JSONObject localeData = jsonData.getJSONObject("LOCALE");
//			//			//			JSONObject timezoneData = jsonData.getJSONObject("TIMEZONE");
//			//			//
//			//			//			// 企業ノード
//			//			//			JSONObject contractPeriodData = jsonData.getJSONObject("CONTRACT_PERIOD");
//			//			//			JSONObject opearationsSettingData = jsonData.getJSONObject("OPERATIONS_SETTINGS");
//			//
//			//			postNodesBodyModel.getRequestModel().setConfigurations(configurations);
//		} catch (Exception e) {
//			// 上記以外
//			responseModel.setResult(ApiUtil
//					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -30, e));
//		}
//
//		// configurations/nodes?changePlanName={changePlanName}
//		// 正常時
//		// ChangePlanNameを設定
//		postNodesParamModel.getRequestModel().setChangePlanName(changePlanNameUnitCdStr);
//
//		// BODY
//
//		//TODO 下記の企業コードの様に画面で設定した値をModelにセットする
//		// 企業コード
//		postNodesBodyModel.getRequestModel().setName(nodeId);
//
//		// 新規追加または更新
//		// {{base_url}}/configurations/nodes?changePlanName={{chage_plan_name}}の実行
//		var postConfigurationsNodesResponseModel = configurationsService.postNodes(
//				postNodesParamModel, postNodesBodyModel, messageSource, apiContext, accessToken,
//				ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
//
//		// トークン情報の上書き
//		if (postConfigurationsNodesResponseModel.getResult().getWSO2Token() != null
//				&& postConfigurationsNodesResponseModel.getResult().getELERAToken() != null) {
//			accessToken = postConfigurationsNodesResponseModel.getResult().getWSO2Token();
//			ELERAToken = postConfigurationsNodesResponseModel.getResult().getELERAToken();
//		}
//
//		if (postConfigurationsNodesResponseModel.getResult().getCode() != 0) {
//			// エラーメッセージをセット
//			int intcode = postConfigurationsNodesResponseModel.getResult().getCode().intValue();
//			responseModel.getResult().setCode(Integer.valueOf(intcode));
//			responseModel.getResult().setErrorMessageMap(
//					postConfigurationsNodesResponseModel.getResult().getErrorMessageMap());
//			return responseModel;
//		}
//
//		// changeplans/records(Pending)
//		postChangePlanRequestModel
//				.setName(postChangePlanResponseModel.getResponseModel().getName());
//		postChangePlanRequestModel
//				.setVersion(postChangePlanResponseModel.getResponseModel().getVersion());
//		postChangePlanRequestModel.setStatus("Pending");
//		postChangePlanRequestModel
//				.setNotes(postChangePlanResponseModel.getResponseModel().getNotes());
//
//		var postChangePlanPendingResponseModel = changePlanService.postChangePlan(
//				postChangePlanRequestModel, messageSource, apiContext, accessToken, ELERAToken,
//				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
//
//		// トークン情報の上書き
//		if (postChangePlanPendingResponseModel.getResult().getWSO2Token() != null
//				&& postChangePlanPendingResponseModel.getResult().getELERAToken() != null) {
//			accessToken = postChangePlanPendingResponseModel.getResult().getWSO2Token();
//			ELERAToken = postChangePlanPendingResponseModel.getResult().getELERAToken();
//		}
//
//		if (postChangePlanPendingResponseModel.getResult().getCode() != 0) {
//			// エラーメッセージをセット
//			int intcode = postChangePlanPendingResponseModel.getResult().getCode().intValue();
//			responseModel.getResult().setCode(Integer.valueOf(intcode));
//			responseModel.getResult().setErrorMessageMap(
//					postChangePlanPendingResponseModel.getResult().getErrorMessageMap());
//			return responseModel;
//		}
//
//		// changeplans/execute
//		var executeResponseModel = changePlanService.postChangePlanExecute(changePlanNameUnitCdStr,
//				messageSource, apiContext, accessToken, ELERAToken,
//				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
//				loginUser.getPassWord());
//
//		if (executeResponseModel.getResult().getCode() != 0) {
//			// 失敗
//			int intcode = executeResponseModel.getResult().getCode().intValue();
//			responseModel.getResult().setCode(Integer.valueOf(intcode));
//			responseModel.getResult()
//					.setErrorMessageMap(executeResponseModel.getResult().getErrorMessageMap());
//			return responseModel;
//		}
//
//		// ここまで到達出来たら正常
//		responseModel.getResult().setCode(0);
//
//		// セッションのトークン情報の上書き
//		if (executeResponseModel.getResult().getWSO2Token() != null
//				&& executeResponseModel.getResult().getELERAToken() != null) {
//			loginUser.setWso2ApiToken(executeResponseModel.getResult().getWSO2Token());
//			loginUser.setELERAToken(executeResponseModel.getResult().getELERAToken());
//			// ユーザ情報をセッション管理用リポジトリに追加
//			var sessionId = sessionUtil.saveUserToRepository(loginUser);
//			// レスポンスのヘッダーにセッションID用のCookieをセットする
//			response = sessionUtil.setCookie(response, sessionId);
//		}
		// G001.00.0 Delete End

		return responseModel;
	}
	
	// G002.00.0 Add-Start
	/**
     * 特定の業務から返されるデータを作成(バーコードフラグ設定/取引別名称設定/収入印紙設定/運用設定/店別運用設定).
     *
     * @param configMap 詳細データ
     * @param type ビジネスタイプ
     * @return フィルタされたデータ
     */
	public Map<String, Object> FilterMapForConfigurations(JSONObject configMap, String type) {
		Map<String, Object> ansMap = null;
		Map<String, JSONObject> jObjectMap = new HashMap<>();
		switch(type) {
			// バーコードフラグ設定
			case "BARCODE_SETTINGS":
				JSONObject systemOptionBarcode = (JSONObject) configMap.get("SYSTEM_OPTION_BARCODE");
				JSONObject barcodeConversion = (JSONObject) configMap.get("BARCODE_CONVERSION");
				JSONObject barcodeFlag = (JSONObject) configMap.get("BARCODE_FLAG");
				jObjectMap.put("SYSTEM_OPTION_BARCODE", systemOptionBarcode);
				jObjectMap.put("BARCODE_CONVERSION", barcodeConversion);
				jObjectMap.put("BARCODE_FLAG", barcodeFlag);
				break;
			// 取引別名称設定
			case "NAME_TRANSACTION_SETTINGS":
				JSONObject nameTransactionSettings = (JSONObject) configMap.get("NAME_TRANSACTION_SETTINGS");
				jObjectMap.put("NAME_TRANSACTION_SETTINGS", nameTransactionSettings);
				break;
			// 収入印紙設定
			case "REVENUE_STAMP_SETTINGS":
				JSONObject revenueStampSettings = (JSONObject) configMap.get("REVENUE_STAMP_SETTINGS");
				JSONObject revenueStampConfiguration = (JSONObject) configMap.get("REVENUE_STAMP_CONFIGURATION");
				jObjectMap.put("REVENUE_STAMP_SETTINGS", revenueStampSettings);
				jObjectMap.put("REVENUE_STAMP_CONFIGURATION", revenueStampConfiguration);
				break;
			// 運用設定
			case "OPERATIONS_SETTINGS":
				JSONObject operationsSettings = (JSONObject) configMap.get("OPERATIONS_SETTINGS");
				jObjectMap.put("OPERATIONS_SETTINGS", operationsSettings);
				break;
			// 店別運用設定
			case "STORE_OPERATIONS_SETTINGS":
				JSONObject storeOperationsSettings = (JSONObject) configMap.get("STORE_OPERATIONS_SETTINGS");
				jObjectMap.put("STORE_OPERATIONS_SETTINGS", storeOperationsSettings);
				break;
//2023.04.20 ST
			// 店舗グループ１登録
			case "STORE_GROUP_1":
				JSONObject storeGroup1 = (JSONObject) configMap.get("STORE_GROUP_1");
				jObjectMap.put("STORE_GROUP_1", storeGroup1);
				break;
			// 店舗グループ２登録
			case "STORE_GROUP_2":
				JSONObject storeGroup2 = (JSONObject) configMap.get("STORE_GROUP_2");
				jObjectMap.put("STORE_GROUP_2", storeGroup2);
				break;
//2023.04.20 ED
			// KSD V001.000 AS
			// 時間帯設定
			case "HOUR_ZONE_SETTING":
				JSONObject hourZoneList = (JSONObject) configMap.get("HOURZONE_LIST");
				jObjectMap.put("HOURZONE_LIST", hourZoneList);
				break;
			// KSD V001.000 AE
			default:
				break;
		}
		ansMap = new JSONObject(jObjectMap).toMap();
		return ansMap;
	}
	// G002.00.0 Add-End

	// G001.00.1 Add-Start
	/**
	 * 現在の設定の更新リクエスト.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/UpdateConfigurationBy5Step")
	@ResponseBody
	public PutConfigurationResponseModel updateConfigurationBy5Step(
			@RequestBody @Validated PutConfigurationRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PutConfigurationResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

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
		// 最初にresarvationを実行する
		// 日付
		Calendar cl = Calendar.getInstance();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		model.setExecutionDate(sdf.format(cl.getTime()));

		// changeplans/records(draft)
		var postChangePlanRequestModel = new PostChangePlanRequestModel();

		// 運用設定用
		if (model.getNodeId() == null) {
			model.setNodeId(loginUser.getBusinessUnitCdStr());
		}
		String nodeId = model.getNodeId();
		String changePlanNameUnitCdStr = "";

		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
		String timeStamp = date.format(new Date());

		// changePlanName名の作成(名称：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ)
		changePlanNameUnitCdStr = nodeId + loginUser.getUserId() + timeStamp;

		postChangePlanRequestModel.setName(changePlanNameUnitCdStr);
		postChangePlanRequestModel.setStatus("Draft");

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
			int intcode = postChangePlanResponseModel.getResult().getCode();
			responseModel.getResult().setCode(intcode);
			responseModel.getResult().setErrorMessageMap(
					postChangePlanResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		var postNodesParamModel = new PostConfigurationsNodesRequestParamModel();
		var postNodesBodyModel = new PostConfigurationsNodesRequestBodyModel();

		// 編集ならばConfigurationsを検索して、その値を取得する（その後に変更分を反映する）
		if (model.getMode() != 1) {
			// 編集
			// 事前に取出し
			var requestParamModel = new PostConfigurationsNodesRequestParamModel();
			requestParamModel.getRequestModel().setChangePlanName(changePlanNameUnitCdStr);

			// BODY
			var requestNodesNodeIdBodyModel = new PostConfigurationsNodesNodeIdRequestModel();

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
				int intcode = postConfigurationsResponseModel.getResult().getCode();
				responseModel.getResult().setCode(intcode);
				responseModel.getResult().setErrorMessageMap(
						postConfigurationsResponseModel.getResult().getErrorMessageMap());
				return responseModel;
			}

			// configurations/nodes?changePlanName={changePlanName}
			postNodesBodyModel.setRequestModel(postConfigurationsResponseModel.getResponseModel());

		} else {
			// 新規で必要な情報をセット（ChangePlan関係）
			postNodesBodyModel.getRequestModel().setChangePlan(new ConfigurationsChangePlanModel());
			postNodesBodyModel.getRequestModel().getChangePlan().setName(changePlanNameUnitCdStr);
			postNodesBodyModel.getRequestModel().getChangePlan().setDeleted(false);
			// KSD V001.000 AS
			postNodesBodyModel.getRequestModel().setConfigurations(new ConfigurationsDetailModel());
			// KSD V001.000 AE
		}

		try {

			Map<String, Object> configuration = (Map<String, Object>)model.getConfiguration().get("configurations");
			Map<String, Object> accountingSettingsMap = (Map<String, Object>)configuration.get("ACCOUNTING_SETTINGS");
			Map<String, Object> drawerMenuSettingsMap = (Map<String, Object>)configuration.get("DRAWER_MENU_SETTINGS");
			Map<String, Object> itemDetailsSettingsMap = (Map<String, Object>)configuration.get("ITEM_DETAILS_SETTINGS");
			Map<String, Object> nameTransactionSettingsMap = (Map<String, Object>)configuration.get("NAME_TRANSACTION_SETTINGS");
			// KSD V001.000 AS
			Map<String, Object> codePayPropertySettingsMap = (Map<String, Object>)configuration.get("CODEPAY_PROPERTY_SETTINGS");
			postNodesBodyModel.getRequestModel().getConfigurations().setCODEPAY_PROPERTY_SETTINGS(codePayPropertySettingsMap);
			Map<String, Object> codePayAlarmMessageSettings = (Map<String, Object>)configuration.get("CODEPAY_ALARMMESSAGE_SETTINGS");
			postNodesBodyModel.getRequestModel().getConfigurations().setCODEPAY_ALARMMESSAGE_SETTINGS(codePayAlarmMessageSettings);
			Map<String, Object> selfOptionSettings = (Map<String, Object>)configuration.get("SELF_OPTION_SETTINGS");
			postNodesBodyModel.getRequestModel().getConfigurations().setSELF_OPTION_SETTINGS(selfOptionSettings);
			Map<String, Object> selfTimerSettings = (Map<String, Object>)configuration.get("SELF_TIMER_SETTINGS");
			postNodesBodyModel.getRequestModel().getConfigurations().setSELF_TIMER_SETTINGS(selfTimerSettings);
			Map<String, Object> selfPaymentSettings = (Map<String, Object>)configuration.get("SELF_PAYMENT_SETTINGS");
			postNodesBodyModel.getRequestModel().getConfigurations().setSELF_PAYMENT_SETTINGS(selfPaymentSettings);
			Map<String, Object> selfMessageSettings = (Map<String, Object>)configuration.get("SELF_MESSAGE_SETTINGS");
			postNodesBodyModel.getRequestModel().getConfigurations().setSELF_MESSAGE_SETTINGS(selfMessageSettings);
			Map<String, Object> selfElementFileSettings = (Map<String, Object>)configuration.get("SELF_ELEMENTFILE_SETTINGS");
			postNodesBodyModel.getRequestModel().getConfigurations().setSELF_ELEMENTFILE_SETTINGS(selfElementFileSettings);
// KSD V001.000 20231002 AS
			Map<String, Object> customer_OPTION_SETTINGS = (Map<String, Object>)configuration.get("CUSTOMER_OPTION_SETTINGS");
			postNodesBodyModel.getRequestModel().getConfigurations().setCUSTOMER_OPTION_SETTINGS(customer_OPTION_SETTINGS);
			Map<String, Object> customer_FILE_SETTINGS = (Map<String, Object>)configuration.get("CUSTOMER_FILE_SETTINGS");
			postNodesBodyModel.getRequestModel().getConfigurations().setCUSTOMER_FILE_SETTINGS(customer_FILE_SETTINGS);
// KSD V001.000 20231002 AE
			Map<String, Object> couponUsageMap = (Map<String, Object>)configuration.get("COUPON_USAGE_SETTINGS");
			postNodesBodyModel.getRequestModel().getConfigurations().setCOUPON_USAGE_SETTINGS(couponUsageMap);
			Map<String, Object> nameDisplayPrintSettings = (Map<String, Object>)configuration.get("NAME_DISPLAY_PRINT_SETTING");
			postNodesBodyModel.getRequestModel().getConfigurations().setNAME_DISPLAY_PRINT_SETTING(nameDisplayPrintSettings);
			Map<String, Object> unpaidDeleteReasonCodeValues = (Map<String, Object>)configuration.get("UNPAID_DELETE_REASON_CODE_VALUES");
			postNodesBodyModel.getRequestModel().getConfigurations().setUNPAID_DELETE_REASON_CODE_VALUES(unpaidDeleteReasonCodeValues);
			// KSD V001.000 AE
			postNodesBodyModel.getRequestModel().getConfigurations().setACCOUNTING_SETTINGS(accountingSettingsMap);
			postNodesBodyModel.getRequestModel().getConfigurations().setDRAWER_MENU_SETTINGS(drawerMenuSettingsMap);
			postNodesBodyModel.getRequestModel().getConfigurations().setITEM_DETAILS_SETTINGS(itemDetailsSettingsMap);
			postNodesBodyModel.getRequestModel().getConfigurations().setNAME_TRANSACTION_SETTINGS(nameTransactionSettingsMap);
			// KSD V001.000 AS
			Map<String, Object> selfPricingTableDefaultSettingsMap = (Map<String, Object>)configuration.get("SELF_PRICINGTABLE_DEFAULT_SETTINGS");
			// KSD V001.000 DS 不具合No.79：セットするテーブル名不正対応
			//postNodesBodyModel.getRequestModel().getConfigurations().setACCOUNTING_SETTINGS(selfPricingTableDefaultSettingsMap);
			// KSD V001.000 DE 不具合No.79：セットするテーブル名不正対応
			// KSD V001.000 AS 不具合No.79：セットするテーブル名不正対応
			postNodesBodyModel.getRequestModel().getConfigurations().setSELF_PRICINGTABLE_DEFAULT_SETTINGS(selfPricingTableDefaultSettingsMap);
			// KSD V001.000 AE 不具合No.79：セットするテーブル名不正対応
			Map<String, Object> selfPricingTable = (Map<String, Object>)configuration.get("SELF_PRICINGTABLE");
			// KSD V001.000 DS 不具合No.79：セットするテーブル名不正対応
			//postNodesBodyModel.getRequestModel().getConfigurations().setACCOUNTING_SETTINGS(selfPricingTable);
			// KSD V001.000 DE 不具合No.79：セットするテーブル名不正対応
			// KSD V001.000 AS 不具合No.79：セットするテーブル名不正対応
			postNodesBodyModel.getRequestModel().getConfigurations().setSELF_PRICINGTABLE(selfPricingTable);
			// KSD V001.000 AE 不具合No.79：セットするテーブル名不正対応
			// KSD V001.000 AE
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -30, e));
		}

		// configurations/nodes?changePlanName={changePlanName}
		// 正常時
		// ChangePlanNameを設定
		postNodesParamModel.getRequestModel().setChangePlanName(changePlanNameUnitCdStr);

		// BODY
		// 企業コード
		postNodesBodyModel.getRequestModel().setName(nodeId);

		// 新規追加または更新
		// {{base_url}}/configurations/nodes?changePlanName={{chage_plan_name}}の実行
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
			int intcode = postConfigurationsNodesResponseModel.getResult().getCode();
			responseModel.getResult().setCode(intcode);
			responseModel.getResult().setErrorMessageMap(
					postConfigurationsNodesResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		// changeplans/records(Pending)
		postChangePlanRequestModel
				.setName(postChangePlanResponseModel.getResponseModel().getName());
		postChangePlanRequestModel
				.setVersion(postChangePlanResponseModel.getResponseModel().getVersion());
		postChangePlanRequestModel.setStatus("Pending");
		postChangePlanRequestModel
				.setNotes(postChangePlanResponseModel.getResponseModel().getNotes());

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
			int intcode = postChangePlanPendingResponseModel.getResult().getCode();
			responseModel.getResult().setCode(intcode);
			responseModel.getResult().setErrorMessageMap(
					postChangePlanPendingResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		// changeplans/execute
		var executeResponseModel = changePlanService.postChangePlanExecute(changePlanNameUnitCdStr,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		if (executeResponseModel.getResult().getCode() != 0) {
			// 失敗
			int intcode = executeResponseModel.getResult().getCode();
			responseModel.getResult().setCode(intcode);
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
			sessionUtil.setCookie(response, sessionId);
		}

		return responseModel;
	}
	// G001.00.1 Add-End
}
