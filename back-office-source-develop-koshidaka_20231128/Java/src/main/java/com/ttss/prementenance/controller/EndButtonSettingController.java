package com.ttss.prementenance.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.ConfigurationsChangePlanModel;
import com.ttss.prementenance.model.ConfigurationsDetailModel;
import com.ttss.prementenance.model.PostChangePlanRequestModel;
import com.ttss.prementenance.model.PostChangePlanResponseModel;
import com.ttss.prementenance.model.PostConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestBodyModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestParamModel;
import com.ttss.prementenance.model.PutConfigurationRequestModel;
import com.ttss.prementenance.model.PutConfigurationResponseModel;
import com.ttss.prementenance.service.ChangePlanService;
import com.ttss.prementenance.service.ConfigurationsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
import com.ttss.prementenance.utils.SessionUtil;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.text.SimpleDateFormat;
import java.util.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.beans.BeanMap;
import org.springframework.context.MessageSource;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221220  duyouwei(Neusoft)  G001.00.0  issue課題#1150を対応します.
 * 20230629  wangchunmei(Neusoft)  G002.00.0  issue課題#1451を対応します.
 */
@RestController
@RequestMapping("EndButtonSetting")
public class EndButtonSettingController {
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
	public EndButtonSettingController() {
	}

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

		String businessCd = loginUser.getBusinessUnitCdStr();
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// 最初にresarvationを実行する

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
			int intcode = postChangePlanResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
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
				int intcode = postConfigurationsResponseModel.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
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
		}

		try {
			// G001.00.0 Add-Start
			Map<String, Object> paymentMap = new HashMap<>();
			for (Map.Entry<String, Object> entry : model.getConfiguration().entrySet()) {
				// G002.00.0 Update-Start
//				 if ((entry.getKey().length() == 10 && entry.getKey().startsWith("PAYMENT_"))
//				 		|| entry.getKey().equals("NAME_TRANSACTION_SETTINGS")) {
				if ((entry.getKey().length() == 10 && entry.getKey().startsWith("PAYMENT_"))
						|| entry.getKey().equals("NAME_TRANSACTION_SETTINGS")
						|| entry.getKey().equals("PAYMENT_SEQUENCE_NO")
						|| entry.getKey().startsWith("PAYMENT_") && entry.getKey().endsWith("_SUB_SEQUENCE_NO")) {
					// G002.00.0 Update-End
					paymentMap.put(entry.getKey(), entry.getValue());
				}
			}
			// G001.00.0 Add-End
			// G001.00.0 Update-Start
			// JSONObject configuration = new JSONObject(model.getConfiguration());
			JSONObject configuration = new JSONObject(paymentMap);
			// G001.00.0 Update-End
			ObjectMapper mapper = new ObjectMapper();
			ConfigurationsDetailModel configurations = mapper.readValue(configuration.toString(),
					ConfigurationsDetailModel.class);

			// G001.00.0 Update-Start
			// postNodesBodyModel.getRequestModel().setConfigurations(configurations);
			Map<String, Object> currentMap = springBean2Map(postNodesBodyModel.getRequestModel().getConfigurations());
			Map<String, Object> currConfWithoutpaymentMap = new HashMap<>();
			for (Map.Entry<String, Object> entry : currentMap.entrySet()) {
				if (!entry.getKey().startsWith("PAYMENT_")) {
					currConfWithoutpaymentMap.put(entry.getKey(), entry.getValue());
				}
			}
			JSONObject currentConfiguration = new JSONObject(currConfWithoutpaymentMap);
			ObjectMapper currentMapper = new ObjectMapper();
			ConfigurationsDetailModel currConfigurations = currentMapper.readValue(currentConfiguration.toString(),
					ConfigurationsDetailModel.class);
			postNodesBodyModel.getRequestModel().setConfigurations(mergeObject(configurations, currConfigurations));
			// G001.00.0 Update-End
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
			int intcode = postConfigurationsNodesResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
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
			int intcode = postChangePlanPendingResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
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

	// G001.00.0 Add-Start

	/**
	 * Bean To Map
	 * @param bean javaBean
	 * @return 変換したマップ
	 */
	private Map<String, Object> springBean2Map(Object bean) {

		Map<String, Object> map = new HashMap<>();
		BeanMap beanMap = BeanMap.create(bean);
		for (Object object : beanMap.entrySet()) {
			if (object instanceof Map.Entry) {
				Map.Entry<String , Object> entry = (Map.Entry<String, Object>)object ;
				String key = entry.getKey();
				map.put(key, beanMap.get(key));
			}
		}

		return map;
	}

	/**
	 * マージConfigurationsDetailModel
	 * @param conf1 コンフィグ１
	 * @param conf2 コンフィグ２
	 * @return マージしたコンフィグ
	 * @throws Exception 　
	 */
	private ConfigurationsDetailModel mergeObject(ConfigurationsDetailModel conf1, ConfigurationsDetailModel conf2) throws Exception {

		Class conf1Class = conf1.getClass();
		Class conf2Class = conf2.getClass();

		Field[] conf1Fields = conf1Class.getDeclaredFields();
		Field[] conf2Fields = conf2Class.getDeclaredFields();
		for (int i = 0; i < conf1Fields.length; i++) {
			Field sourceField = conf1Fields[i];
			if (Modifier.isStatic(sourceField.getModifiers())) {
				continue;
			}
			Field targetField = conf2Fields[i];
			if (Modifier.isStatic(targetField.getModifiers())) {
				continue;
			}
			sourceField.setAccessible(true);
			targetField.setAccessible(true);

			if (sourceField.get(conf1) != null) {
				targetField.set(conf2, sourceField.get(conf1));
			}
		}
		return conf2;
	}
	// G001.00.0 Add-End
}
