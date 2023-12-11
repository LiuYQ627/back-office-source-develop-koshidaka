/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 */
package com.ttss.prementenance.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.ConfigurationsChangePlanModel;
import com.ttss.prementenance.model.ConfigurationsProductDivisionsModel;
import com.ttss.prementenance.model.ConfigurationsProductDivisionsDetailModel;
import com.ttss.prementenance.model.ProductDivisionsInfoUpdateRequestModel;
import com.ttss.prementenance.model.ProductDivisionsInfoUpdateRequestModel.GroupNameOrder;
import com.ttss.prementenance.model.GetConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.GetProductDivisionsRequestRcvModel;
import com.ttss.prementenance.model.GetProductDivisionsResponseModel;
import com.ttss.prementenance.model.PostChangePlanRequestModel;
import com.ttss.prementenance.model.PostChangePlanResponseModel;
import com.ttss.prementenance.model.PostConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestBodyModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestParamModel;
import com.ttss.prementenance.model.PostProductDivisionsRegistRequestModel;
import com.ttss.prementenance.model.PostProductDivisionsResponseModel;
import com.ttss.prementenance.service.ChangePlanService;
import com.ttss.prementenance.service.ConfigurationsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * 商品分類階層設定画面&API.
 *
 * @author
 * @version 
 */
@RestController
@RequestMapping("ProductDivisions")
public class ProductDivisionsController {

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

	//@Autowired
	public ProductDivisionsController() {
	}

	/**
	 * 商品分類階層設定検索処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 商品分類階層設定検索＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/divisionInfoSearch")
	@ResponseBody
	public GetProductDivisionsResponseModel divisionInfoSearch(
			@Validated GetProductDivisionsRequestRcvModel model, Errors errors, HttpServletRequest request,
			HttpServletResponse response) {

		GetProductDivisionsResponseModel responseModel = new GetProductDivisionsResponseModel();
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

		var requestModel = new GetConfigurationsNodesNodeIdRequestModel();
		String nodeId = model.getNodeId();
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// 正常時
		// 店舗別設定検索
		var configurationsNodesNodeIdRes = configurationsService.getNodesNodeId(requestModel, nodeId, messageSource,
				apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// トークンの更新
		if (configurationsNodesNodeIdRes.getResult().getWSO2Token() != null
				&& configurationsNodesNodeIdRes.getResult().getELERAToken() != null) {
			accessToken = configurationsNodesNodeIdRes.getResult().getWSO2Token();
			ELERAToken = configurationsNodesNodeIdRes.getResult().getELERAToken();
		}

		if (configurationsNodesNodeIdRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = configurationsNodesNodeIdRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					configurationsNodesNodeIdRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// 商品分類階層設定の読み取り
		responseModel.setResponseModel(configurationsNodesNodeIdRes.getResponseModel()
				.getConfigurations().getPRODUCT_DIVISIONS());

		// セッションのトークン情報の上書き
		if (accessToken != null && ELERAToken != null) {
			loginUser.setWso2ApiToken(accessToken);
			loginUser.setELERAToken(ELERAToken);
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		// 正常
		responseModel.getResult().setCode(Integer.valueOf(0));

		return responseModel;
	}

	/**
	 * 商品分類階層設定更新処理.
	 *
	 * @param divisions リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 商品分類階層設定更新＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/divisionInfoRegist")
	@ResponseBody
	public PostProductDivisionsResponseModel divisionInfoRegist(
			@RequestBody @Validated({ Default.class, GroupNameOrder.class }) PostProductDivisionsRegistRequestModel divisions,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PostProductDivisionsResponseModel();
		responseModel.setResult(new ApiCommonResponseModel());
		// バリデーションエラーメッセージで使用
		MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
		// ValidationMessages.property からメッセージを持ってくるための記述
		ReloadableResourceBundleMessageSource validationMessageSource = new ReloadableResourceBundleMessageSource();
		validationMessageSource.setBasename("classpath:/ValidationMessages");
		validationMessageSource.setDefaultEncoding("UTF-8");
		MessageSourceUtil messageResourseUtil = new MessageSourceUtil(messageSource);

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

		// 妥当性チェック
		boolean isValiderr = false;
		// １）階層設定数チェック
		if (divisions.getValue().size() != 8) {
			map.add("value", messageResourseUtil.getMessage("F00203.E011", null));
			isValiderr = true;
		}

		boolean seqErr = false;
		int usedFlgCount = 0;
		boolean typErr = false;
		int count = 0;
		int dpCnt = 0, dpErr = -1, clsCnt = 0, clsErr = -1;
		for (Iterator<ProductDivisionsInfoUpdateRequestModel> it = divisions.getValue().iterator(); it.hasNext(); count++) {
			var value = it.next();
			if (value.getProductClassificationNumber() != count + 1) {
				seqErr = true;
				break;
			}
			if (value.getUsedFlg() == true) {
				usedFlgCount++;
				if (usedFlgCount > 1) {
					break;
				}
			}
			String type = value.getRegistrationType();
			if (!"".equals(type) && !"dp".equals(type) && !"cls".equals(type)) {
				typErr = true;
				break;
			}
			else {
				if ("dp".equals(type) && dpCnt < 2) {
					dpCnt++;
					dpErr = count;
				}
				else if ("cls".equals(type) && clsCnt < 2) {
					clsCnt++;
					clsErr = count;
				}
			}
		}
		// 分類Noシーケンスチェック
		if (seqErr == true) {
			map.add("productClassificationNumber", messageResourseUtil.getMessage("F00203.E012", null));
			isValiderr = true;
		}

		// 最上位構成フラグチェック
		if (usedFlgCount == 0) {
			map.add("usedFlg", messageResourseUtil.getMessage("F00203.W001", null));
			isValiderr = true;
		}
		else if (usedFlgCount > 1) {
			map.add(String.format("value[%d].usedFlg", count), messageResourseUtil.getMessage("F00203.E013", null));
			isValiderr = true;
		}
		// 登録種別チェック
		if (typErr == true) {
			map.add(String.format("value[%d].registrationType", count), messageResourseUtil.getMessage("F00203.E014", null));
			isValiderr = true;
		}
		else {
			int err = -1;
			String msg = null;
			if (dpCnt > 1) {
				err = dpErr;
				msg = messageResourseUtil.getMessage("F00203.W003", null);
			}
			if (clsCnt > 1) {
				if (err == -1 || clsErr < err) {
					err = clsErr;
					msg = messageResourseUtil.getMessage("F00203.W004", null);
				}
			}
			if (err >= 0 && msg != null) {
				map.add(String.format("value[%d].registrationType", err), msg);
				isValiderr = true;
			}
		}

		if (isValiderr) {
			// 通常のバリデーションエラー発生時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			responseModel.getResult().addErrorMessageMap(map);
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// changeplans/records(draft)
		var postChangePlanRequestModel = new PostChangePlanRequestModel();
		String nodeId = divisions.getNodeId();
		String changePlanNameUnitCdStr = "";

		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
		String timeStamp = date.format(new Date());
		// 新規の処理(名称：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ)
		changePlanNameUnitCdStr = divisions.getNodeId() + loginUser.getUserId() + timeStamp;

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

		// 事前に取出し
		// configurations/nodes/{nodeId}?changePlanName={changePlanName}
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
			// 失敗
			int intcode = postConfigurationsResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					postConfigurationsResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		// configurations/nodes?changePlanName={changePlanName}
		postNodesBodyModel.setRequestModel(postConfigurationsResponseModel.getResponseModel());
		if (postNodesBodyModel.getRequestModel().getConfigurations().getPRODUCT_DIVISIONS() != null) {
			postNodesBodyModel.getRequestModel().getConfigurations().getPRODUCT_DIVISIONS().getValue().clear();
		}
		else {
			postNodesBodyModel.getRequestModel().getConfigurations().setPRODUCT_DIVISIONS(new ConfigurationsProductDivisionsModel());
			postNodesBodyModel.getRequestModel().getConfigurations().getPRODUCT_DIVISIONS().setGroup("STORE_OPERATIONS");
			postNodesBodyModel.getRequestModel().getConfigurations().getPRODUCT_DIVISIONS().setSubGroup("CONFIG");
			postNodesBodyModel.getRequestModel().getConfigurations().getPRODUCT_DIVISIONS().setType("List");
			postNodesBodyModel.getRequestModel().getConfigurations().getPRODUCT_DIVISIONS().setName("PRODUCT_DIVISIONS");
			postNodesBodyModel.getRequestModel().getConfigurations().getPRODUCT_DIVISIONS().setValue(new ArrayList<ConfigurationsProductDivisionsDetailModel>());
		}

		// テーブルデータセット
		for (Iterator<ProductDivisionsInfoUpdateRequestModel> it = divisions.getValue().iterator(); it.hasNext();) {
			var value = it.next();
			var division  = new ConfigurationsProductDivisionsDetailModel();
			division.setOrder(value.getOrder());
			division.setProductClassificationNumber(value.getProductClassificationNumber());
			division.setProductName(value.getProductName());
			division.setLength(value.getLength());
			division.setUsedFlg(value.getUsedFlg());
			division.setRegistrationType(value.getRegistrationType());
			postNodesBodyModel.getRequestModel().getConfigurations().getPRODUCT_DIVISIONS().getValue().add(division);
		}

		// configurations/nodes?changePlanName={changePlanName}
		// 正常時
		// Node登録
		postNodesParamModel.getRequestModel().setChangePlanName(changePlanNameUnitCdStr);

		// BODY
		// 店舗コード
		postNodesBodyModel.getRequestModel().setName(nodeId);
		// 変更計画
		postNodesBodyModel.getRequestModel().setChangePlan(new ConfigurationsChangePlanModel());
		postNodesBodyModel.getRequestModel().getChangePlan().setName(changePlanNameUnitCdStr);
		postNodesBodyModel.getRequestModel().getChangePlan().setDeleted(false);

		// 新規追加または更新
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
}
