/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221230  tianxh(Neusoft)  G001.00.0  issue課題#1169を対応します.
 * 20230117  litie(Neusoft)   G002.00.0  issue課題#1088を対応します.
 * 20230223  dingxin(Neusoft) G003.00.0  issue課題#1054を対応します.
 */
package com.ttss.prementenance.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.CommonDefaultModel;
import com.ttss.prementenance.model.ConfigurationsAddressModel;
import com.ttss.prementenance.model.ConfigurationsChangePlanModel;
import com.ttss.prementenance.model.ConfigurationsContractPeriodDetailModel;
import com.ttss.prementenance.model.ConfigurationsContractPeriodModel;
import com.ttss.prementenance.model.ConfigurationsDetailModel;
import com.ttss.prementenance.model.ConfigurationsModel;
import com.ttss.prementenance.model.ConfigurationsTaxSetsDetailModel;
import com.ttss.prementenance.model.ConfigurationsTaxSetsModel;
import com.ttss.prementenance.model.CorporateInfoUpdateRequestModel;
import com.ttss.prementenance.model.CorporateInfoUpdateRequestModel.GroupFaxNoOrder;
import com.ttss.prementenance.model.CorporateInfoUpdateRequestModel.GroupNameOrder;
import com.ttss.prementenance.model.CorporateInfoUpdateRequestModel.GroupPostNoOrder;
import com.ttss.prementenance.model.CorporateInfoUpdateRequestModel.GroupTelNoOrder;
import com.ttss.prementenance.model.DeleteCorporateRequestRcvModel;
import com.ttss.prementenance.model.DeleteCorporateResponseModel;
import com.ttss.prementenance.model.GetConfigurationsNodesListRequestModel;
import com.ttss.prementenance.model.GetConfigurationsNodesListResponseModel;
import com.ttss.prementenance.model.GetConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.GetConfigurationsNodesNodeIdResponseModel;
import com.ttss.prementenance.model.GetCorporateRequestRcvModel;
import com.ttss.prementenance.model.PostAuthorizationUsersDeleteUserRequestModel;
import com.ttss.prementenance.model.PostAuthorizationUsersRequestModel;
import com.ttss.prementenance.model.PostAuthorizationUsersRolesRequestModel;
import com.ttss.prementenance.model.PostChangePlanRequestModel;
import com.ttss.prementenance.model.PostChangePlanResponseModel;
import com.ttss.prementenance.model.PostConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestBodyModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestParamModel;
import com.ttss.prementenance.model.PutCorporateRequestRcvModel;
import com.ttss.prementenance.model.PutCorporateResponseModel;
import com.ttss.prementenance.request.FailureReasonRequest;
import com.ttss.prementenance.request.PostDataRetentionNodeAddRequestModel;
// KSD V001.000 AE
import com.ttss.prementenance.request.TaxSetsNewRequest;
// KSD V001.000 AS
import com.ttss.prementenance.request.TaxSetsRequest;
import com.ttss.prementenance.request.TaxSetsUpdateRequest;
// KSD V001.000 AE
import com.ttss.prementenance.service.AuthorizationService;
import com.ttss.prementenance.service.ChangePlanService;
import com.ttss.prementenance.service.ConfigurationsService;
import com.ttss.prementenance.service.DataManagementService;
import com.ttss.prementenance.service.FailureReasonService;
import com.ttss.prementenance.service.PresetMasterService;
// KSD V001.000 AS
import com.ttss.prementenance.service.TaxService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * 企業マスタ画面&API.
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("CorporateMaster")
public class CorporateMasterController {

	@Autowired
	private ConfigurationsService configurationsService;
	// private CorporateMasterService corporateMasterService;

	@Autowired
	private ChangePlanService changePlanService;

	@Autowired
	private AuthorizationService authorizationService;

	@Autowired
	private PresetMasterService presetMasterService;
	// KSD V001.000 AS
	@Autowired
	private TaxService taxTaxesService;
	// KSD V001.000 AE
	// KSD V001.000 AS issue#1349:企業を追加する時に、tgcp_data_management_data_retention_settingsにNode設定を追加する対応
	@Autowired
	private DataManagementService dataManagementService;
	// KSD V001.000 AS issue#1349:企業を追加する時に、tgcp_data_management_data_retention_settingsにNode設定を追加する対応
	
	// KSD V001.000 20231027 AS
	@Autowired
	private FailureReasonService failureReasonService;
	// KSD V001.000 20231027 AE

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	private SessionUtil sessionUtil;

	private String defaultSysUserName = "tecsys";

	@Autowired
	public CorporateMasterController() {
	}

	/**
	 * 企業マスタ検索処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 企業マスタ検索＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/ConfigurationSearch")
	@ResponseBody
	public GetConfigurationsNodesNodeIdResponseModel corporateSearch(
			@Validated GetCorporateRequestRcvModel model, Errors errors, HttpServletRequest request,
			HttpServletResponse response) {

		GetConfigurationsNodesNodeIdResponseModel responseModel = new GetConfigurationsNodesNodeIdResponseModel();
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			// GetConfigurationsNodesNodeIdResponseModel responseModel = new
			// GetConfigurationsNodesNodeIdResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			// GetConfigurationsNodesNodeIdResponseModel responseModel = new
			// GetConfigurationsNodesNodeIdResponseModel();
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		var requestModel = new GetConfigurationsNodesNodeIdRequestModel();
		String nodeId = model.getBusinessUnitCd();
		// String nodeId = loginUser.getBusinessUnitCdStr();
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// 正常時
		// 企業マスタ検索
		// return configurationsService.getNodesNodeId(requestModel, nodeId, messageSource,
		// apiContext,accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		responseModel = configurationsService.getNodesNodeId(requestModel, nodeId, messageSource,
				apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
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
	 * 企業マスタ検索処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 企業マスタ検索＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/ConfigurationsAllSearch")
	@ResponseBody
	public GetConfigurationsNodesListResponseModel corporateAllSearch(
			@Validated GetConfigurationsNodesListRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new GetConfigurationsNodesListResponseModel();
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

		// STEP0 全件取得
		model.getRequestModel().setChangePlanName("");
		model.getRequestModel().setFilter("ALL");
		model.getRequestModel().setBatchSize((int) 0);
		model.getRequestModel().setExcludeFields(true);
		model.getRequestModel().setNodeNames("CLOUDPOS");

		// 正常時
		// 企業マスタ検索
		var nodesListModel = configurationsService.getNodesList(model, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		if (nodesListModel.getResult().getCode() == 2) {
			responseModel.getResult().setCode(2);
			return responseModel;

		} else if (nodesListModel.getResult().getCode() != 0) {
			// エラーメッセージをセット
			int intcode = nodesListModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(nodesListModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		// 返却用に結果設定
		responseModel.setResult(nodesListModel.getResult());
		responseModel.setResponseModel(new ArrayList<ConfigurationsModel>());

		// 親がCLOUDPOSが企業として取り扱う
		for (var i = 0; i < nodesListModel.getResponseModel().size(); i++) {

			var configurationsModel = nodesListModel.getResponseModel().get(i);
			if (configurationsModel.getChangePlan() != null) {
				// 変更計画中なのでとはず
			} else if (configurationsModel.getParentName() == null) {
				// nullなので飛ばす
			} else if (configurationsModel.getParentName().equals("CLOUDPOS")) {
				responseModel.getResponseModel().add(configurationsModel);
			}
		}
		// 絞り込み結果無しの場合
		if (responseModel.getResponseModel().size() == 0) {
			responseModel.getResult().setCode(2);
		}

		// セッションのトークン情報の上書き
		if (nodesListModel.getResult().getWSO2Token() != null
				&& nodesListModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(nodesListModel.getResult().getWSO2Token());
			loginUser.setELERAToken(nodesListModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		return responseModel;
	}

	/**
	 * 企業マスタ更新処理.
	 *
	 * @param corporates リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 企業マスタ更新＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/CorporateInfoRegist")
	@ResponseBody
	public PutCorporateResponseModel corporateInfoRegist(
			@RequestBody @Validated({ Default.class, GroupNameOrder.class, GroupPostNoOrder.class,
					GroupTelNoOrder.class,
					GroupFaxNoOrder.class }) PutCorporateRequestRcvModel corporates,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PutCorporateResponseModel();
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
			responseModel = new PutCorporateResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		// 日付チェック
		boolean isValiderr = false;
		// 販売開始日
		if (!isDate(corporates.getCorporateInfos().get(0).getUseStartMonth())) {
			map.add("useStartMonth", messageResourseUtil.getMessage("VALIDA.MONTH_CHECK", null));
			isValiderr = true;
		}
		// 販売終了日
		if (!isDate(corporates.getCorporateInfos().get(0).getUseEndMonth())) {
			map.add("useEndMonth", messageResourseUtil.getMessage("VALIDA.MONTH_CHECK", null));
			isValiderr = true;
		}
		if (isValiderr) {
			// 通常のバリデーションエラー発生時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			responseModel.getResult().addErrorMessageMap(map);
			return responseModel;
		}

		List<CorporateInfoUpdateRequestModel> infos = corporates.getCorporateInfos();

		// String businessCd = loginUser.getBusinessUnitCdStr();
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// changeplans/records(draft)
		var postChangePlanRequestModel = new PostChangePlanRequestModel();
		CorporateInfoUpdateRequestModel corporateRequestModel = infos.get(0);
		String nodeId = corporateRequestModel.getBusinessUnitCd();
		String changePlanNameUnitCdStr = "";

		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
		String timeStamp = date.format(new Date());
		// 新規の処理(名称：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ)
		// 企業のため店舗コードなし
		changePlanNameUnitCdStr = corporateRequestModel.getBusinessUnitCd() + loginUser.getUserId() + timeStamp;

        // ■DraftでChangePlanを作成 --------------------------------------------------------------
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
        // ■DraftでChangePlanを作成 --------------------------------------------------------------

		if (!corporates.getIsMasterCreate()) {
			// 編集
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

		} else {
			// 新規
			postNodesBodyModel.getRequestModel().setChangePlan(new ConfigurationsChangePlanModel());
			postNodesBodyModel.getRequestModel().getChangePlan().setName(changePlanNameUnitCdStr);
			postNodesBodyModel.getRequestModel().getChangePlan().setDeleted(false);

			// 企業名称
			postNodesBodyModel.getRequestModel().setDisplayName(new CommonDefaultModel());
			// 郵便番号
			postNodesBodyModel.getRequestModel().setAddress(new ConfigurationsAddressModel());
			postNodesBodyModel.getRequestModel().getAddress()
					.setPostalCode(new CommonDefaultModel());
			// 住所
			postNodesBodyModel.getRequestModel().getAddress().setAddress1(new CommonDefaultModel());
		}

		// configurations/nodes?changePlanName={changePlanName}
		// 正常時
		// Node登録(企業コード入力値)
		postNodesParamModel.getRequestModel().setChangePlanName(changePlanNameUnitCdStr);

		// BODY
		// 企業コード
		postNodesBodyModel.getRequestModel().setName(nodeId);

		// 親コード
		postNodesBodyModel.getRequestModel().setParentName("CLOUDPOS");

		// .企業名称
		if (corporateRequestModel.getName() != null) {
			if (postNodesBodyModel.getRequestModel().getDisplayName() == null) {
				postNodesBodyModel.getRequestModel().setDisplayName(new CommonDefaultModel());
			}
			postNodesBodyModel.getRequestModel().getDisplayName()
					.setDefaultValue(corporateRequestModel.getName());
		}

		// 住所
		if (corporateRequestModel.getAddress() != null) {
			if (postNodesBodyModel.getRequestModel().getAddress() == null) {
				postNodesBodyModel.getRequestModel().setAddress(new ConfigurationsAddressModel());
			}
			if (postNodesBodyModel.getRequestModel().getAddress().getAddress1() == null) {
				postNodesBodyModel.getRequestModel().getAddress()
						.setAddress1(new CommonDefaultModel());
			}
			postNodesBodyModel.getRequestModel().getAddress().getAddress1()
					.setDefaultValue(corporateRequestModel.getAddress());
		}

		// 郵便番号
		if (corporateRequestModel.getPostNo() != null) {
			if (postNodesBodyModel.getRequestModel().getAddress() == null) {
				postNodesBodyModel.getRequestModel().setAddress(new ConfigurationsAddressModel());
			}
			if (postNodesBodyModel.getRequestModel().getAddress().getPostalCode() == null) {
				postNodesBodyModel.getRequestModel().getAddress()
						.setPostalCode(new CommonDefaultModel());
			}
			postNodesBodyModel.getRequestModel().getAddress().getPostalCode()
					.setDefaultValue(corporateRequestModel.getPostNo());
		}

		// 電話番号
		if (corporateRequestModel.getTelNo() != null) {
			postNodesBodyModel.getRequestModel().setPhone(corporateRequestModel.getTelNo());
		}

		// FAX番号
		if (corporateRequestModel.getFaxNo() != null) {
			postNodesBodyModel.getRequestModel().setFax(corporateRequestModel.getFaxNo());
		}

		// スマートレシート連携企業コード
		if (corporateRequestModel.getSmartReceiptCode() != null) {
			postNodesBodyModel.getRequestModel()
					.setSmartReceiptCode(corporateRequestModel.getSmartReceiptCode());
		}

		// 登録事業者番号
		if (corporateRequestModel.getRegisterBusinessCode() != null) {
			postNodesBodyModel.getRequestModel()
					.setRegisterBusinessCode(corporateRequestModel.getRegisterBusinessCode());
		}

		// インボイス発行事業者
		if (corporateRequestModel.getInvoiceIssueName() != null) {
			postNodesBodyModel.getRequestModel()
					.setInvoiceIssueName(corporateRequestModel.getInvoiceIssueName());
		}

		// 利用開始日
		if (corporateRequestModel.getUseStartMonth() != null) {
			if (postNodesBodyModel.getRequestModel().getConfigurations() == null) {
				postNodesBodyModel.getRequestModel()
						.setConfigurations(new ConfigurationsDetailModel());
			}
			if (postNodesBodyModel.getRequestModel().getConfigurations()
					.getCONTRACT_PERIOD() == null) {
				postNodesBodyModel.getRequestModel().getConfigurations()
						.setCONTRACT_PERIOD(new ConfigurationsContractPeriodModel());
			}
			if (postNodesBodyModel.getRequestModel().getConfigurations().getCONTRACT_PERIOD()
					.getValue() == null) {
				postNodesBodyModel.getRequestModel().getConfigurations().getCONTRACT_PERIOD()
						.setValue(new ConfigurationsContractPeriodDetailModel());
			}
			postNodesBodyModel.getRequestModel().getConfigurations().getCONTRACT_PERIOD()
					.setSubGroup("CONFIG");
			postNodesBodyModel.getRequestModel().getConfigurations().getCONTRACT_PERIOD()
					.setName("CONTRACT_PERIOD");
			postNodesBodyModel.getRequestModel().getConfigurations().getCONTRACT_PERIOD()
					.setType("Map");
			postNodesBodyModel.getRequestModel().getConfigurations().getCONTRACT_PERIOD()
					.setGroup("STORE_OPERATIONS");
			postNodesBodyModel.getRequestModel().getConfigurations().getCONTRACT_PERIOD().getValue()
					.setUseStartMonth(corporateRequestModel.getUseStartMonth());
		}
		if (corporateRequestModel.getUseEndMonth() != null) {
			if (postNodesBodyModel.getRequestModel().getConfigurations() == null) {
				postNodesBodyModel.getRequestModel()
						.setConfigurations(new ConfigurationsDetailModel());
			}
			if (postNodesBodyModel.getRequestModel().getConfigurations()
					.getCONTRACT_PERIOD() == null) {
				postNodesBodyModel.getRequestModel().getConfigurations()
						.setCONTRACT_PERIOD(new ConfigurationsContractPeriodModel());
			}
			if (postNodesBodyModel.getRequestModel().getConfigurations().getCONTRACT_PERIOD()
					.getValue() == null) {
				postNodesBodyModel.getRequestModel().getConfigurations().getCONTRACT_PERIOD()
						.setValue(new ConfigurationsContractPeriodDetailModel());
			}
			postNodesBodyModel.getRequestModel().getConfigurations().getCONTRACT_PERIOD()
					.setSubGroup("CONFIG");
			postNodesBodyModel.getRequestModel().getConfigurations().getCONTRACT_PERIOD()
					.setName("CONTRACT_PERIOD");
			postNodesBodyModel.getRequestModel().getConfigurations().getCONTRACT_PERIOD()
					.setType("Map");
			postNodesBodyModel.getRequestModel().getConfigurations().getCONTRACT_PERIOD()
					.setGroup("STORE_OPERATIONS");
			postNodesBodyModel.getRequestModel().getConfigurations().getCONTRACT_PERIOD().getValue()
					.setUseEndMonth(corporateRequestModel.getUseEndMonth());
		}

		// KSD V001.000 AS 2023.09.19 issue#1253 企業追加時にconfiguration下にTAX_SETSが作成されていない不具合
        // ■税セット（configuration下）を新規作成 -----------------------------------------------
		if (corporates.getIsMasterCreate()) {
			//新規作成
			var taxSets = new ConfigurationsTaxSetsModel();
			taxSets.setType("List");
			taxSets.setGroup("STORE_OPERATIONS");
			taxSets.setSubGroup("CONFIG");
			taxSets.setName("TAX_SETS");
			taxSets.setValue(new ArrayList<ConfigurationsTaxSetsDetailModel>());
			
			var taxsetsValue = new ConfigurationsTaxSetsDetailModel();
			taxsetsValue.setOrder(0);
			taxsetsValue.setValue(corporateRequestModel.getBusinessUnitCd());

			taxSets.getValue().add(taxsetsValue);

			postNodesBodyModel.getRequestModel().getConfigurations().setTAX_SETS(taxSets);
		}
        // ■税セット（configuration下）を新規作成 -----------------------------------------------
		// KSD V001.000 AE 2023.09.19 issue#1253 企業追加時にconfiguration下にTAX_SETSが作成されていない不具合

		// KSD V001.000 AS
		Map<String, Object> timesMap = new HashMap<String, Object>();
		corporateRequestModel.getConfigurations().getBUSINESS_DAY_START_TIME_MAP().put("group", "CASH-MANAGEMENT");
		corporateRequestModel.getConfigurations().getBUSINESS_DAY_START_TIME_MAP().put("subGroup", "CONFIG");
		corporateRequestModel.getConfigurations().getBUSINESS_DAY_START_TIME_MAP().put("type", "Key");
		corporateRequestModel.getConfigurations().getBUSINESS_DAY_START_TIME_MAP().put("inherited", false);
		corporateRequestModel.getConfigurations().getBUSINESS_DAY_START_TIME_MAP().put("name", "BUSINESS_DAY_START_TIME");

		timesMap.putAll(corporateRequestModel.getConfigurations().getBUSINESS_DAY_START_TIME_MAP());
		postNodesBodyModel.getRequestModel().getConfigurations().setBUSINESS_DAY_START_TIME_MAP(timesMap);

		corporateRequestModel.getConfigurations().getBUSINESS_DAY_SOFT_END_TIME().setGroup("CASH-MANAGEMENT");
		corporateRequestModel.getConfigurations().getBUSINESS_DAY_SOFT_END_TIME().setSubGroup("CONFIG");
		corporateRequestModel.getConfigurations().getBUSINESS_DAY_SOFT_END_TIME().setType("Key");
		corporateRequestModel.getConfigurations().getBUSINESS_DAY_SOFT_END_TIME().setInherited(false);
		corporateRequestModel.getConfigurations().getBUSINESS_DAY_SOFT_END_TIME().setName("BUSINESS_DAY_SOFT_END_TIME");

		postNodesBodyModel.getRequestModel().getConfigurations().setBUSINESS_DAY_SOFT_END_TIME(
			corporateRequestModel.getConfigurations().getBUSINESS_DAY_SOFT_END_TIME()
		);

		corporateRequestModel.getConfigurations().getBUSINESS_DAY_HARD_END_TIME().setGroup("CASH-MANAGEMENT");
		corporateRequestModel.getConfigurations().getBUSINESS_DAY_HARD_END_TIME().setSubGroup("CONFIG");
		corporateRequestModel.getConfigurations().getBUSINESS_DAY_HARD_END_TIME().setType("Key");
		corporateRequestModel.getConfigurations().getBUSINESS_DAY_HARD_END_TIME().setInherited(false);
		corporateRequestModel.getConfigurations().getBUSINESS_DAY_HARD_END_TIME().setName("BUSINESS_DAY_HARD_END_TIME");

		postNodesBodyModel.getRequestModel().getConfigurations().setBUSINESS_DAY_HARD_END_TIME(
			corporateRequestModel.getConfigurations().getBUSINESS_DAY_HARD_END_TIME()
		);
		// KSD V001.000 AE

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

		// KSD V001.000 AS
		if (corporates.getIsMasterCreate()) {
			//新規作成
			
            // ■税セットを新規作成 ------------------------------------------------------------------
			///////////////////////////
			//税セット新規作成 520_Web業務_企業マスタ登録（シーケンス図）参照
			///////////////////////////
			var newTaxSetsRequestModel = new TaxSetsNewRequest();
			newTaxSetsRequestModel.setName(corporateRequestModel.getBusinessUnitCd());
			var defaultChangePlan_wk = new ConfigurationsChangePlanModel();
			defaultChangePlan_wk.setDeleted(false);
			defaultChangePlan_wk.setName(changePlanNameUnitCdStr);
			newTaxSetsRequestModel.setChangePlan(defaultChangePlan_wk);
			//税セット新規作成要求
			var postTaxSetsResponseModel = taxTaxesService.newTaxSets(
					newTaxSetsRequestModel, messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			// トークン情報の上書き
			if (postTaxSetsResponseModel.getResult().getWSO2Token() != null
					&& postTaxSetsResponseModel.getResult().getELERAToken() != null) {
				accessToken = postTaxSetsResponseModel.getResult().getWSO2Token();
				ELERAToken = postTaxSetsResponseModel.getResult().getELERAToken();
			}
			// 応答コードチェック
			if (postTaxSetsResponseModel.getResult().getCode() != 0) {
				int intcode = postTaxSetsResponseModel.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult().setErrorMessageMap(
						postTaxSetsResponseModel.getResult().getErrorMessageMap());
				return responseModel;
			}
            // ■税セットを新規作成 ------------------------------------------------------------------
			
            // ■デフォルト税区分を取得 --------------------------------------------------------------
			///////////////////////////
			//税率取得
			///////////////////////////
			var getTaxSetsRequestModel = new TaxSetsRequest();
			getTaxSetsRequestModel.setNodeId("CLOUDPOS");
			var getTaxSetsResponseModel = taxTaxesService.getTaxTaxes(
					getTaxSetsRequestModel, messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			if (getTaxSetsResponseModel.getResult().getWSO2Token() != null
					&& getTaxSetsResponseModel.getResult().getELERAToken() != null) {
				accessToken = getTaxSetsResponseModel.getResult().getWSO2Token();
				ELERAToken = getTaxSetsResponseModel.getResult().getELERAToken();
			}

			if (getTaxSetsResponseModel.getResult().getCode() == 2) {
				var errorResponseModel = new PutCorporateResponseModel();

				var commonResponseModel = new ApiCommonResponseModel();
				commonResponseModel.setApi(null);
				commonResponseModel.setCode(2);
				commonResponseModel.setMs(null);

				var messageResourceUtil = new MessageSourceUtil(messageSource);
				MultiValueMap<String, String> errorMap = new LinkedMultiValueMap<>();
				errorMap.add("global", messageResourceUtil.getMessage("F00004.E047"));
				commonResponseModel.setErrorMessageMap(errorMap);
				errorResponseModel.setResult(commonResponseModel);
				return errorResponseModel;
			}

			if (getTaxSetsResponseModel.getResult().getCode() != 0) {
				int intcode = getTaxSetsResponseModel.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult().setErrorMessageMap(
						getTaxSetsResponseModel.getResult().getErrorMessageMap());
				return responseModel;
			}
            // ■デフォルト税区分を取得 --------------------------------------------------------------

            // ■税率テーブルを追加 ------------------------------------------------------------------
			///////////////////////////
			//税率更新（１レコード単位）
			///////////////////////////
			for (var i = 0; i < getTaxSetsResponseModel.getResponseModel().size(); i++) {
				var postTaxSetsRequestModel = new TaxSetsUpdateRequest();
				var taxSet = getTaxSetsResponseModel.getResponseModel().get(i);
				postTaxSetsRequestModel.setType(taxSet.getType());
				postTaxSetsRequestModel.setNodeId(nodeId);
				postTaxSetsRequestModel.setDisplayName(taxSet.getDisplayName());
				postTaxSetsRequestModel.setTaxType(taxSet.getTaxType());
                // KSD V001.000 DS issue#xxx対応 不要項目をセットしないよう修正
				//postTaxSetsRequestModel.setJurisdictionName(corporateRequestModel.getBusinessUnitCd());
                // KSD V001.000 DE issue#xxx対応 不要項目をセットしないよう修正
				postTaxSetsRequestModel.setJurisdictionType(corporateRequestModel.getBusinessUnitCd());
                // KSD V001.000 DS issue#xxx対応 不要項目をセットしないよう修正
				//postTaxSetsRequestModel.setTaxSource(taxSet.getTaxSource());
                // KSD V001.000 DE issue#xxx対応 不要項目をセットしないよう修正
				postTaxSetsRequestModel.setRate(taxSet.getRate());
				postTaxSetsRequestModel.setOriginalTaxSource(taxSet.getOriginalTaxSource());
                // KSD V001.000 DS issue#xxx対応 不要項目をセットしないよう修正
				//postTaxSetsRequestModel.setRateType(taxSet.getRateType());
                // KSD V001.000 DE issue#xxx対応 不要項目をセットしないよう修正
				postTaxSetsRequestModel.setIndicator(taxSet.getIndicator());
				postTaxSetsRequestModel.setName(taxSet.getName());
				postTaxSetsRequestModel.setTaxMark(taxSet.getTaxMark());
				postTaxSetsRequestModel.setRoundingMode(taxSet.getRoundingMode());
				postTaxSetsRequestModel.setStartDateTime(taxSet.getStartDateTime());
				postTaxSetsRequestModel.setTaxSet(corporateRequestModel.getBusinessUnitCd());
				postTaxSetsRequestModel.setReducedTax(taxSet.getReducedTax());
				var defaultChangePlan = new ConfigurationsChangePlanModel();
				defaultChangePlan.setDeleted(false);
				defaultChangePlan.setName(changePlanNameUnitCdStr);
				postTaxSetsRequestModel.setChangePlan(defaultChangePlan);

				//税率更新
				postTaxSetsResponseModel = taxTaxesService.updateTaxTaxes(
						postTaxSetsRequestModel, messageSource, apiContext, accessToken, ELERAToken,
						loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

				if (postTaxSetsResponseModel.getResult().getCode() != 0) {
					int intcode = postTaxSetsResponseModel.getResult().getCode().intValue();
					responseModel.getResult().setCode(Integer.valueOf(intcode));
					responseModel.getResult().setErrorMessageMap(
							postTaxSetsResponseModel.getResult().getErrorMessageMap());
					return responseModel;
				}
			}
            // ■税率テーブルを追加 ------------------------------------------------------------------
		}
		// KSD V001.000 AE

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
		
		// G002.00.0 Update-Start
		// S3バケットに商品プリセット画像を保存する企業フォルダを作成
		{
			String corpId = nodeId;
			var createPresetFolderResponse = presetMasterService.createPresetFolder(corpId, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
			if (createPresetFolderResponse.getResult().getCode() != 0) {
				responseModel.setResult(createPresetFolderResponse.getResult());
				return responseModel;
			}
		}
		// G002.00.0 Update-End

		// 新規の場合には保守用ユーザーを作成する
		if (corporates.getIsMasterCreate()) {

			// 更新パラメータを設定
			var userReq = new PostAuthorizationUsersRequestModel();

			userReq.getRequestModel().setUsername(nodeId + "tecsys");
			userReq.getRequestModel().setHeadquartersPermission(true);
			userReq.getRequestModel().setPosUserName(null);
			userReq.getRequestModel().setPosPassword(null);
			userReq.getRequestModel().setFirstName("");
			userReq.getRequestModel().setLastName("");

			// パスワード
			userReq.getRequestModel().setPassword("Tec$y$1048");
			// 現在ミリ秒
			long nowSec = new Date().getTime();
			userReq.getRequestModel().setPasswordSetTS(nowSec);
			// Authorities
			var hmap = new HashMap<String, String>();
			hmap.put("*", "rw");
			userReq.getRequestModel().setAuthorities(hmap);

			// 登録に必要なアイテム
			userReq.getRequestModel().setBirthdate("1900-01-01");
			userReq.getRequestModel().setAddress(null); // 使わないので塗りつぶしておく
			userReq.getRequestModel().setRightHanded(true);
			userReq.getRequestModel().setUsingSystemTimeout(false);
			userReq.getRequestModel().setLocale("ja-JP");
			// G003.00.0 Add-Start
			userReq.getRequestModel().setAccessAuthority("CLOUDPOS_ADMIN");
			// G003.00.0 Add-End
			
			// KSD V001.000 AS 要件定義書「11.00.POS端末動作モード」での仕様追加
			//userReq.getRequestModel().setPosUserName("99999999");
			userReq.getRequestModel().setPosPassword("Tec$y$1048");
			userReq.getRequestModel().setPosPrintingName("TTEC");
			// KSD V001.000 AE 要件定義書「11.00.POS端末動作モード」での仕様追加

			// ユーザマスタ更新
			var userRes = authorizationService.postUsers(userReq, messageSource, apiContext,
					accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// トークン情報の上書き
			if (userRes.getResult().getWSO2Token() != null
					&& userRes.getResult().getELERAToken() != null) {
				accessToken = userRes.getResult().getWSO2Token();
				ELERAToken = userRes.getResult().getELERAToken();
			}

			if (userRes.getResult().getCode() != 0) {
				// 失敗
				responseModel.setResult(userRes.getResult());
				return responseModel;
			}

			// ロールの登録
			var userRolesReq = new PostAuthorizationUsersRolesRequestModel();

			userRolesReq.getRequestModel().setRoles(new ArrayList<String>());
			userRolesReq.getRequestModel().getRoles().add("ADMIN");
			userRolesReq.getRequestModel().getRoles().add("POS_CASHIER");
			userRolesReq.getRequestModel().getRoles().add("POS_MANAGER");
			userRolesReq.getRequestModel().getRoles().add("CLOUDPOS_ADMIN");
			userRolesReq.getRequestModel().setUserId(userRes.getResponseModel().getId());
			userRolesReq.getRequestModel().setHomeStore(true);
			userRolesReq.getRequestModel().setNodeId(nodeId);

			var userRolesRes = authorizationService.postUsersRoles(userRolesReq, messageSource,
					apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// トークン情報の上書き
			if (userRolesRes.getResult().getWSO2Token() != null
					&& userRolesRes.getResult().getELERAToken() != null) {
				accessToken = userRolesRes.getResult().getWSO2Token();
				ELERAToken = userRolesRes.getResult().getELERAToken();
			}

			if (userRes.getResult().getCode() != 0) {
				// 失敗
				responseModel.setResult(userRolesRes.getResult());
				return responseModel;
			}

			// ロールの登録(SYSTEM)
			var userRolesReqSys = new PostAuthorizationUsersRolesRequestModel();

			userRolesReqSys.getRequestModel().setRoles(new ArrayList<String>());
			userRolesReqSys.getRequestModel().getRoles().add("ADMIN");
			userRolesReqSys.getRequestModel().getRoles().add("POS_CASHIER");
			userRolesReqSys.getRequestModel().getRoles().add("POS_MANAGER");
			userRolesReqSys.getRequestModel().setUserId(userRes.getResponseModel().getId());
			userRolesReqSys.getRequestModel().setHomeStore(false);
			userRolesReqSys.getRequestModel().setNodeId("SYSTEM");

			var userRolesSysRes = authorizationService.postUsersRoles(userRolesReqSys, messageSource,
					apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// トークン情報の上書き
			if (userRolesSysRes.getResult().getWSO2Token() != null
					&& userRolesSysRes.getResult().getELERAToken() != null) {
				accessToken = userRolesSysRes.getResult().getWSO2Token();
				ELERAToken = userRolesSysRes.getResult().getELERAToken();
			}

			if (userRolesSysRes.getResult().getCode() != 0) {
				// 失敗
				responseModel.setResult(userRolesSysRes.getResult());
				return responseModel;
			}
		}
		
		// KSD V001.000 AS issue#1349:企業を追加する時に、tgcp_data_management_data_retention_settingsにNode設定を追加する対応
		// 新規の場合には保持期間外データ情報へNodeを追加する
		if (corporates.getIsMasterCreate()) {
			String groupname = "";
			
			// Node設定追加（tgcp_totalizer：売上実績データ）
			var NodeAddTotalReq = new PostDataRetentionNodeAddRequestModel();
			NodeAddTotalReq.setNodeId(nodeId);
			NodeAddTotalReq.setNodeRetentionPeriod(732);
			groupname = "tgcp_totalizer";
			var NodeAddTotalRes = dataManagementService.DataRetentionNodeAdd(
					groupname,
					NodeAddTotalReq, messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			// トークン情報の上書き
			if (NodeAddTotalRes.getResult().getWSO2Token() != null
					&& NodeAddTotalRes.getResult().getELERAToken() != null) {
				accessToken = NodeAddTotalRes.getResult().getWSO2Token();
				ELERAToken = NodeAddTotalRes.getResult().getELERAToken();
			}
			// 応答コードチェック
			if (NodeAddTotalRes.getResult().getCode() != 0) {
				int intcode = NodeAddTotalRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult().setErrorMessageMap(
						NodeAddTotalRes.getResult().getErrorMessageMap());
				return responseModel;
			}

			// Node設定追加（tgcp_totalizer：トランザクション）
			var NodeAddTranReq = new PostDataRetentionNodeAddRequestModel();
			NodeAddTranReq.setNodeId(nodeId);
			NodeAddTranReq.setNodeRetentionPeriod(732);
			groupname = "tgcp_transactions";
			var NodeAddTranRes = dataManagementService.DataRetentionNodeAdd(
					groupname,
					NodeAddTranReq, messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			// トークン情報の上書き
			if (NodeAddTranRes.getResult().getWSO2Token() != null
					&& NodeAddTranRes.getResult().getELERAToken() != null) {
				accessToken = NodeAddTranRes.getResult().getWSO2Token();
				ELERAToken = NodeAddTranRes.getResult().getELERAToken();
			}
			// 応答コードチェック
			if (NodeAddTranRes.getResult().getCode() != 0) {
				int intcode = NodeAddTranRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult().setErrorMessageMap(
						NodeAddTranRes.getResult().getErrorMessageMap());
				return responseModel;
			}

			// Node設定追加（tgcp_totalizer：電子ジャーナル）
			var NodeAddJournalReq = new PostDataRetentionNodeAddRequestModel();
			NodeAddJournalReq.setNodeId(nodeId);
			NodeAddJournalReq.setNodeRetentionPeriod(366);
			groupname = "tgcp_receipts_ejournal_ejournal";
			var NodeAddJournalRes = dataManagementService.DataRetentionNodeAdd(
					groupname,
					NodeAddJournalReq, messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			// トークン情報の上書き
			if (NodeAddJournalRes.getResult().getWSO2Token() != null
					&& NodeAddJournalRes.getResult().getELERAToken() != null) {
				accessToken = NodeAddJournalRes.getResult().getWSO2Token();
				ELERAToken = NodeAddJournalRes.getResult().getELERAToken();
			}
			// 応答コードチェック
			if (NodeAddJournalRes.getResult().getCode() != 0) {
				int intcode = NodeAddJournalRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult().setErrorMessageMap(
						NodeAddJournalRes.getResult().getErrorMessageMap());
				return responseModel;
			}
		}
		// KSD V001.000 AE issue#1349:企業を追加する時に、tgcp_data_management_data_retention_settingsにNode設定を追加する対応

// KSD V001.000 20231027 AS
		///////////////////////////////////////////////
		// 故障理由の新規追加
		///////////////////////////////////////////////
		if (corporates.getIsMasterCreate()) {
			var FailureReasonRequestModel = new FailureReasonRequest();
			FailureReasonRequestModel.setNodeId(nodeId);				//nodeId
			FailureReasonRequestModel.setMessage_1("エアコン");			//message_1
			FailureReasonRequestModel.setMessage_2("カラオケ機器");		//message_2
			FailureReasonRequestModel.setMessage_3("アンプ");			//message_3
			FailureReasonRequestModel.setMessage_4("スピーカー");		//message_4
			FailureReasonRequestModel.setMessage_5("モニター");			//message_5
			FailureReasonRequestModel.setMessage_6("周辺機器");			//message_6
			FailureReasonRequestModel.setMessage_7("異臭");				//message_7
			FailureReasonRequestModel.setMessage_8("ルーム内破損");		//message_8
			FailureReasonRequestModel.setMessage_9("その他");			//message_9

			var FailureReasonResponseModel = failureReasonService.updateFailureReason(
					FailureReasonRequestModel, messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			// トークン情報の上書き
			if (FailureReasonResponseModel.getResult().getWSO2Token() != null
					&& FailureReasonResponseModel.getResult().getELERAToken() != null) {
				accessToken = FailureReasonResponseModel.getResult().getWSO2Token();
				ELERAToken = FailureReasonResponseModel.getResult().getELERAToken();
			}
			// 応答コードチェック
			if (FailureReasonResponseModel.getResult().getCode() != 0) {
				int intcode = FailureReasonResponseModel.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult().setErrorMessageMap(
						FailureReasonResponseModel.getResult().getErrorMessageMap());
				return responseModel;
			}
		}
// KSD V001.000 20231027 AE
		
		//		// 新規の場合にはPOS保守用ユーザーを作成する
		//		if (corporates.getIsMasterCreate()) {
		//
		//			// 更新パラメータを設定
		//			var userReq = new PostAuthorizationUsersRequestModel();
		//
		//			userReq.getRequestModel().setUsername(corporateRequestModel.getBusinessUnitCd() + "tabletpos");
		//			userReq.getRequestModel().setFirstName("タブレットPOS");
		//			userReq.getRequestModel().setLastName("読み込み専用");
		//			// パスワード
		//			userReq.getRequestModel().setPassword("tabletpo$21122021");
		//			// 現在ミリ秒
		//			long nowSec = new Date().getTime();
		//			userReq.getRequestModel().setPasswordSetTS(nowSec);
		//			// Authorities
		//			var hmap = new HashMap<String, String>();
		//			hmap.put("*", "r");
		//			hmap.put("cash-management", "rw");
		//			hmap.put("endpoint-status", "rw");
		//			userReq.getRequestModel().setAuthorities(hmap);
		//
		//			// 登録に必要なアイテム
		//			userReq.getRequestModel().setBirthdate("1900-01-01");
		//			userReq.getRequestModel().setAddress(null); // 使わないので塗りつぶしておく
		//			userReq.getRequestModel().setRightHanded(true);
		//			userReq.getRequestModel().setUsingSystemTimeout(false);
		//			userReq.getRequestModel().setLocale("ja-JP");
		//
		//			// ユーザマスタ更新
		//			var userRes = authorizationService.postUsers(userReq, messageSource, apiContext,
		//					accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
		//					loginUser.getPassWord());
		//
		//			// トークン情報の上書き
		//			if (userRes.getResult().getWSO2Token() != null
		//					&& userRes.getResult().getELERAToken() != null) {
		//				accessToken = userRes.getResult().getWSO2Token();
		//				ELERAToken = userRes.getResult().getELERAToken();
		//			}
		//
		//			if (userRes.getResult().getCode() != 0) {
		//				// 失敗
		//				responseModel.setResult(userRes.getResult());
		//				return responseModel;
		//			}
		//
		//			// ロールの登録
		//			var userRolesReq = new PostAuthorizationUsersRolesRequestModel();
		//
		//			userRolesReq.getRequestModel().setRoles(new ArrayList<String>());
		//			userRolesReq.getRequestModel().getRoles().add("ADMIN");
		//			userRolesReq.getRequestModel().getRoles().add("POS_CASHIER");
		//			userRolesReq.getRequestModel().getRoles().add("POS_MANAGER");
		//			userRolesReq.getRequestModel().setUserId(userRes.getResponseModel().getId());
		//			userRolesReq.getRequestModel().setHomeStore(true);
		//			userRolesReq.getRequestModel().setNodeId("SYSTEM");
		//
		//			var userRolesRes = authorizationService.postUsersRoles(userRolesReq, messageSource,
		//					apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
		//					loginUser.getPassWord());
		//
		//			// トークン情報の上書き
		//			if (userRolesRes.getResult().getWSO2Token() != null
		//					&& userRolesRes.getResult().getELERAToken() != null) {
		//				accessToken = userRolesRes.getResult().getWSO2Token();
		//				ELERAToken = userRolesRes.getResult().getELERAToken();
		//			}
		//
		//			if (userRes.getResult().getCode() != 0) {
		//				// 失敗
		//				responseModel.setResult(userRolesRes.getResult());
		//				return responseModel;
		//			}
		//		}

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
	 * 企業マスタ削除処理.
	 *
	 * @param model リクエスト内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 企業マスタ削除＋αレスポンス
	 */
	@CrossOrigin
	@DeleteMapping("/CorporateInfoDeleted")
	public DeleteCorporateResponseModel corporateInfoDeleted(
			@Validated DeleteCorporateRequestRcvModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			DeleteCorporateResponseModel responseModel = new DeleteCorporateResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// 正常時
		// 企業マスタ削除
		var responseModel = new DeleteCorporateResponseModel();
		responseModel.setResult(new ApiCommonResponseModel());

		// changeplans/records(draft)
		var postChangePlanRequestModel = new PostChangePlanRequestModel();
		String nodeId = model.getBusinessUnitCd();
		String changePlanNameUnitCdStr = "";

		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
		String timeStamp = date.format(new Date());
		// 新規の処理(名称：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ)
		// 企業のため店舗コードなし
		changePlanNameUnitCdStr = model.getBusinessUnitCd() + loginUser.getUserId() + timeStamp;

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

		// configurations/nodes/{nodeId}?changePlanName={changePlanName}
		var requestParamModel = new PostConfigurationsNodesRequestParamModel();
		requestParamModel.getRequestModel().setChangePlanName(changePlanNameUnitCdStr);

		// BODY
		var requestNodesNodeIdBodyModel = new PostConfigurationsNodesNodeIdRequestModel();

		var postConfigurationsResponseModel = configurationsService.postNodesNodeId(
				requestParamModel, requestNodesNodeIdBodyModel, nodeId, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
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
		// Node削除
		var postConfigurationsNodesNodeIdRequestModel = new PostConfigurationsNodesRequestParamModel();
		postConfigurationsNodesNodeIdRequestModel.getRequestModel()
				.setChangePlanName(changePlanNameUnitCdStr);

		// BODY
		var requestNodesBodyModel = new PostConfigurationsNodesRequestBodyModel();
		requestNodesBodyModel.setRequestModel(postConfigurationsResponseModel.getResponseModel());

		// 変更計画を削除に設定
		requestNodesBodyModel.getRequestModel().getChangePlan().setDeleted(true);

		var postConfigurationsNodesResponseModel = configurationsService.postNodes(
				requestParamModel, requestNodesBodyModel, messageSource, apiContext, accessToken,
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

		// G001.00.0 Add-Start
		// 企業を削除した際に企業ノードの削除に続いて、S3バケット・保守ユーザ・保守ユーザroleの削除が必要
		// 1. S3バケットの削除
		{
			String corpId = nodeId;
			var deletePresetFolderResponse = presetMasterService.deletePresetFolder(corpId, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
			if (deletePresetFolderResponse.getResult().getCode() != 0) {
				responseModel.setResult(deletePresetFolderResponse.getResult());
				return responseModel;
			}
		}
		// 2. 保守ユーザの削除
		String userId = null;
		{
			String username = nodeId + defaultSysUserName;
			var requestModel = new PostAuthorizationUsersDeleteUserRequestModel();
			requestModel.getRequestModel().setUsername(username);
			var userRes = authorizationService.postUsersDeleteUser(requestModel, messageSource, apiContext,
					accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// トークン情報の上書き
			if (userRes.getResult().getWSO2Token() != null
					&& userRes.getResult().getELERAToken() != null) {
				accessToken = userRes.getResult().getWSO2Token();
				ELERAToken = userRes.getResult().getELERAToken();
			}

			if (userRes.getResult().getCode() != 0 && userRes.getResult().getCode() != 412) {
				// 失敗
				responseModel.setResult(userRes.getResult());
				return responseModel;
			}
			userId = userRes.getResponseModel().getId();
		}
		// 3. 保守ユーザroleの削除
		{
			// SYSTEM NODE
			var userRolesReqSys = new AuthorizationService.DeleteRolesRequestModel();
			userRolesReqSys.setUserId(userId);
			userRolesReqSys.setNodeId("SYSTEM");

			var userRolesSysRes = authorizationService.postUsersDeleteRoles(userRolesReqSys, messageSource,
					apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// トークン情報の上書き
			if (userRolesSysRes.getResult().getWSO2Token() != null
					&& userRolesSysRes.getResult().getELERAToken() != null) {
				accessToken = userRolesSysRes.getResult().getWSO2Token();
				ELERAToken = userRolesSysRes.getResult().getELERAToken();
			}

			if (userRolesSysRes.getResult().getCode() != 0) {
				// 失敗
				responseModel.setResult(userRolesSysRes.getResult());
				return responseModel;
			}
		}
		{
			// 企業　NODE
			var userRolesReqSys = new AuthorizationService.DeleteRolesRequestModel();
			userRolesReqSys.setUserId(userId);
			userRolesReqSys.setNodeId(nodeId);

			var userRolesSysRes = authorizationService.postUsersDeleteRoles(userRolesReqSys, messageSource,
					apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// トークン情報の上書き
			if (userRolesSysRes.getResult().getWSO2Token() != null
					&& userRolesSysRes.getResult().getELERAToken() != null) {
				accessToken = userRolesSysRes.getResult().getWSO2Token();
				ELERAToken = userRolesSysRes.getResult().getELERAToken();
			}

			if (userRolesSysRes.getResult().getCode() != 0) {
				// 失敗
				responseModel.setResult(userRolesSysRes.getResult());
				return responseModel;
			}
		}
		// G001.00.0 Add-End

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
	 * 契約サービス親マスタ検索処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 企業マスタ検索＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/ContractServiceParentSearch")
	@ResponseBody
	// public GetContractServiceParentResponseModel contractServiceParentSearch(
	// @Validated GetContractServiceParentRequestModel model,
	// Errors errors, HttpServletRequest request) {
	//
	// var loginUser = this.sessionUtil.getActiveLoginUser(request);
	// if (loginUser == null) {
	// GetContractServiceParentResponseModel responseModel =
	// new GetContractServiceParentResponseModel();
	// responseModel.setResult(ApiUtil.getSessionError());
	// return responseModel;
	// }
	//
	// if (errors.hasErrors()) {
	// // バリデーションエラー時
	// GetContractServiceParentResponseModel responseModel =
	// new GetContractServiceParentResponseModel();
	// responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
	// return responseModel;
	// }
	//
	// String businessCd = loginUser.getBusinessUnitCdStr();
	// String accessToken = loginUser.getWso2ApiToken();
	// String ELERAToken = loginUser.getELERAToken();
	// // 正常時
	// // 契約サービス親マスタ検索
	// return configurationsService.getContractServiceParents(model, messageSource,
	// apiContext, businessCd, accessToken, ELERAToken);
	// }

	/**
	 * 日付チェック.
	 *
	 * @param value 検証対象の値
	 * @return 結果（true：日付、false：日付ではない）
	 */
	private static boolean isDate(String value) {
		try {
			if (value != null) {
				if (value.length() != 6) {
					return false;
				}
				// 年月に"01"(一日)を追加して日付文字列判定
				String dateStr = value + "01";
				SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
				sdf.setLenient(false);
				sdf.parse(dateStr);
				return true;
			} else {
				return true;
			}
		} catch (Exception ex) {
			return false;
		}
	}
	//
	// /**
	// * 時刻チェック.
	// *
	// * @param value 検証対象の値
	// * @return 結果（true：時刻、false：時刻ではない）
	// */
	// private static boolean isTime(Integer value) {
	// if (value != null) {
	// String timeStr = String.format("%02d:%02d", value / 100, value % 100);
	// return timeStr.matches("^([0-1][0-9]|[2][0-3]):[0-5][0-9]$");
	// } else {
	// return true;
	// }
	// }
}
