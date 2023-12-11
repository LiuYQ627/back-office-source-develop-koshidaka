package com.ttss.prementenance.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.CommonDefaultModel;
import com.ttss.prementenance.model.CommonValueOrderModel;
import com.ttss.prementenance.model.ConfigurationsAddressModel;
import com.ttss.prementenance.model.ConfigurationsCatalogModel;
import com.ttss.prementenance.model.ConfigurationsChangePlanModel;
import com.ttss.prementenance.model.ConfigurationsDetailModel;
import com.ttss.prementenance.model.ConfigurationsLocaleDetailModel;
import com.ttss.prementenance.model.ConfigurationsLocaleModel;
import com.ttss.prementenance.model.ConfigurationsPriceExtendsDetailModel;
import com.ttss.prementenance.model.ConfigurationsPriceExtendsModel;
import com.ttss.prementenance.model.ConfigurationsPriceListsModel;
import com.ttss.prementenance.model.ConfigurationsTimezoneDetailModel;
import com.ttss.prementenance.model.ConfigurationsTimezoneModel;
import com.ttss.prementenance.model.DeleteStoreResponseModel;
import com.ttss.prementenance.model.GetConfigurationsNodesListRequestModel;
import com.ttss.prementenance.model.GetConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.GetStoreRequestRcvModel;
import com.ttss.prementenance.model.GetStoreResponseModel;
import com.ttss.prementenance.model.PostCatalogsRequestModel;
import com.ttss.prementenance.model.PostChangePlanRequestModel;
import com.ttss.prementenance.model.PostChangePlanResponseModel;
import com.ttss.prementenance.model.PostConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestBodyModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestParamModel;
import com.ttss.prementenance.model.PostPricelistsRequestModel;
import com.ttss.prementenance.model.PutStoreRequestModel;
import com.ttss.prementenance.model.PutStoreResponseModel;
import com.ttss.prementenance.model.StoreInfoModel;
import com.ttss.prementenance.model.StoreInfoUpdateRequestModel;
import com.ttss.prementenance.model.StoreInfoUpdateRequestModel.GroupNameOrder;
import com.ttss.prementenance.model.StoreInfoUpdateRequestModel.GroupPostNoOrder;
import com.ttss.prementenance.model.StoreInfoUpdateRequestModel.GroupTelNoOrder;
import com.ttss.prementenance.service.CatalogsService;
import com.ttss.prementenance.service.ChangePlanService;
import com.ttss.prementenance.service.ConfigurationsService;
import com.ttss.prementenance.service.DeleteS3storefolderService;
import com.ttss.prementenance.service.InitialDataService;
import com.ttss.prementenance.service.PricelistsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
import com.ttss.prementenance.utils.SessionUtil;

import io.micrometer.core.instrument.util.StringUtils;

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230220 litie(Neusoft)     G001.00.0  issue課題#1564を対応します.
 */

/**
 * 店舗マスタ画面&API.
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("StoreMaster")
public class StoreMasterController {

	@Autowired
	private ConfigurationsService configurationsService;
	// private CorporateMasterService corporateMasterService;

	@Autowired
	private ChangePlanService changePlanService;

	@Autowired
	private CatalogsService catalogsService;

	@Autowired
	private PricelistsService pricelistsService;

	@Autowired
	private InitialDataService initialdataService;
	
	@Autowired
	DeleteS3storefolderService deletes3storefolderService;
	
	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	private SessionUtil sessionUtil;

	@Autowired
	public StoreMasterController() {
	}

	/**
	 * 店舗マスタ検索処理.
	 *
	 * @param rcvmodel リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 店舗マスタ検索＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/StoreSearch")
	@ResponseBody
	public GetStoreResponseModel storeSearch(@Validated GetStoreRequestRcvModel rcvmodel,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new GetStoreResponseModel();
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

		Integer storeCd;
		if (rcvmodel.getStoreCd() == null) {
			storeCd = null;

		} else if (rcvmodel.getStoreCd().isEmpty()) {
			// バリデーションエラーとする
			var messageResourseUtil = new MessageSourceUtil(messageSource);
			responseModel.setResult(ApiUtil.createValidationErrorModelWhenDelete("storeCd",
					messageResourseUtil.getMessage("VALIDA.STRSIZE", new String[] { "1", "6" })));
			return responseModel;
		} else {
			storeCd = Integer.parseInt(rcvmodel.getStoreCd());
			if (storeCd == 0) {
				// バリデーションエラーとする
				var messageResourseUtil = new MessageSourceUtil(messageSource);
				responseModel.setResult(
						ApiUtil.createValidationErrorModelWhenDelete("storeCd", messageResourseUtil
								.getMessage("VALIDA.NUMSIZE", new String[] { "1", "999999" })));
				return responseModel;
			}
		}

		String businessCd = loginUser.getBusinessUnitCdStr() + String.format("%06d", storeCd);
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		var requestModel = new GetConfigurationsNodesNodeIdRequestModel();
		responseModel.setResult(new ApiCommonResponseModel());
		if (storeCd == null) {
			responseModel.getResult().setCode(2);
			return responseModel;
		}
		// 正常時
		// 店舗マスタ検索
		var nodeModel = configurationsService.getNodesNodeId(requestModel, businessCd,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		List<StoreInfoModel> storeInfos = new ArrayList<StoreInfoModel>();

		if (nodeModel.getResult().getCode() == 2) {
			responseModel.getResult().setCode(2);
			var setStoreInfoModel = new StoreInfoModel();
			var storeCdStr = String.format("%06d", storeCd);
			setStoreInfoModel.setStoreCd(storeCdStr.substring(storeCdStr.length() - 6));
			responseModel.setStoreInfos(storeInfos);
			return responseModel;

		} else if (nodeModel.getResult().getCode() != 0) {
			// エラーメッセージをセット
			int intcode = nodeModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(nodeModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		responseModel.getResult().setCode(nodeModel.getResult().getCode());

		var setStoreInfoModel = new StoreInfoModel();
		// 店舗コード
		var storeCdStr = nodeModel.getResponseModel().getName();
		setStoreInfoModel.setStoreCd(storeCdStr.substring(storeCdStr.length() - 6));
		// 店舗名称
		if (nodeModel.getResponseModel().getDisplayName() != null) {
			setStoreInfoModel
					.setName(nodeModel.getResponseModel().getDisplayName().getDefaultValue());
		}
		// 郵便番号
		if (nodeModel.getResponseModel().getAddress() == null) {
			setStoreInfoModel.setPostNo("");
		} else if (nodeModel.getResponseModel().getAddress().getPostalCode() == null) {
			setStoreInfoModel.setPostNo("");
		} else {
			setStoreInfoModel.setPostNo(
					nodeModel.getResponseModel().getAddress().getPostalCode().getDefaultValue());
		}
		// 住所
		if (nodeModel.getResponseModel().getAddress() == null) {
			setStoreInfoModel.setPostNo("");
		} else if (nodeModel.getResponseModel().getAddress().getAddress1() == null) {
			setStoreInfoModel.setPostNo("");
		} else {
			setStoreInfoModel.setAddress(
					nodeModel.getResponseModel().getAddress().getAddress1().getDefaultValue());
		}
		// KSD V001.000 AS
		setStoreInfoModel.setConfigurations(nodeModel.getResponseModel().getConfigurations());
		// KSD V001.000 AE
		// 電話番号
		setStoreInfoModel.setPhone(nodeModel.getResponseModel().getPhone());
		storeInfos.add(setStoreInfoModel);
		responseModel.setStoreInfos(storeInfos);
		// FAX
		setStoreInfoModel.setFax(nodeModel.getResponseModel().getFax());
		storeInfos.add(setStoreInfoModel);
		responseModel.setStoreInfos(storeInfos);
		// 運用形態
		if (nodeModel.getResponseModel().getOperationForm() != null) {
			setStoreInfoModel.setOperationForm(nodeModel.getResponseModel().getOperationForm());
			storeInfos.add(setStoreInfoModel);
			responseModel.setStoreInfos(storeInfos);
		}
		// 表示順
		if (nodeModel.getResponseModel().getDisplayOrder() != null) {
			setStoreInfoModel.setDisplayOrder(nodeModel.getResponseModel().getDisplayOrder());
			storeInfos.add(setStoreInfoModel);
			responseModel.setStoreInfos(storeInfos);
		}
		// KSD V001.000 AS
		// 店舗グループ１
		if (nodeModel.getResponseModel().getStoreGroup1() != null) {
			setStoreInfoModel.setStoreGroup1(nodeModel.getResponseModel().getStoreGroup1());
			storeInfos.add(setStoreInfoModel);
			responseModel.setStoreInfos(storeInfos);
		}
		// 店舗グループ２
		if (nodeModel.getResponseModel().getStoreGroup2() != null) {
			setStoreInfoModel.setStoreGroup2(nodeModel.getResponseModel().getStoreGroup2());
			storeInfos.add(setStoreInfoModel);
			responseModel.setStoreInfos(storeInfos);
		}
		// KSD V001.000 AE
		// セッションのトークン情報の上書き
		if (nodeModel.getResult().getWSO2Token() != null
				&& nodeModel.getResult().getELERAToken() != null) {

			if (!(nodeModel.getResult().getWSO2Token().equals(accessToken))
					|| !(nodeModel.getResult().getELERAToken().equals(ELERAToken))) {
				loginUser.setWso2ApiToken(nodeModel.getResult().getWSO2Token());
				loginUser.setELERAToken(nodeModel.getResult().getELERAToken());
				// ユーザ情報をセッション管理用リポジトリに追加
				var sessionId = sessionUtil.saveUserToRepository(loginUser);
				// レスポンスのヘッダーにセッションID用のCookieをセットする
				response = sessionUtil.setCookie(response, sessionId);
			}
		}

		return responseModel;
	}

	/**
	 * 店舗マスタ検索一括処理.
	 *
	 * @param rcvmodel リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 店舗マスタ検索＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/StoreAllSearch")
	@ResponseBody
	public GetStoreResponseModel storeAllSearch(@Validated GetStoreRequestRcvModel rcvmodel,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new GetStoreResponseModel();
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

		// STEP0 全件取得
		var requestModel = new GetConfigurationsNodesListRequestModel();
		requestModel.getRequestModel().setChangePlanName("");
		requestModel.getRequestModel().setFilter("ALL");
		requestModel.getRequestModel().setBatchSize((int) 0);
		requestModel.getRequestModel().setExcludeFields(true);
		requestModel.getRequestModel().setNodeNames(businessCd);

		// 正常時
		// 店舗マスタ検索
		var nodesListModel = configurationsService.getNodesList(requestModel, messageSource, apiContext,
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
		responseModel.setResult(nodesListModel.getResult());

		List<StoreInfoModel> storeInfos = new ArrayList<StoreInfoModel>();

		for (var i = 0; i < nodesListModel.getResponseModel().size(); i++) {
			// 一致する企業のみ
			var configurationsModel = nodesListModel.getResponseModel().get(i);
			if (configurationsModel.getChangePlan() != null) {
				// 変更計画中なのでとはず
				continue;
			} else if (configurationsModel.getParentName() == null) {
				// nullなので飛ばす
				continue;
			} else if (!configurationsModel.getParentName().equals(businessCd)) {
				continue;
			}

			var setStoreInfoModel = new StoreInfoModel();
			// 店舗コード
			var storeCd = nodesListModel.getResponseModel().get(i).getName();
			setStoreInfoModel.setStoreCd(storeCd.substring(storeCd.length() - 6));
			// 店舗名称
			if (nodesListModel.getResponseModel().get(i).getDisplayName() == null) {
				setStoreInfoModel.setName("");
			} else {
				setStoreInfoModel.setName(nodesListModel.getResponseModel().get(i).getDisplayName()
						.getDefaultValue());
			}
			// 郵便番号
			if (nodesListModel.getResponseModel().get(i).getAddress() == null) {
				setStoreInfoModel.setPostNo("");
			} else if (nodesListModel.getResponseModel().get(i).getAddress()
					.getPostalCode() == null) {
				setStoreInfoModel.setPostNo("");
			} else {
				setStoreInfoModel.setPostNo(nodesListModel.getResponseModel().get(i).getAddress()
						.getPostalCode().getDefaultValue());
			}
			// 住所
			if (nodesListModel.getResponseModel().get(i).getAddress() == null) {
				setStoreInfoModel.setPostNo("");
			} else if (nodesListModel.getResponseModel().get(i).getAddress()
					.getAddress1() == null) {
				setStoreInfoModel.setPostNo("");
			} else {
				setStoreInfoModel.setAddress(nodesListModel.getResponseModel().get(i).getAddress()
						.getAddress1().getDefaultValue());
			}
			// 電話番号
			setStoreInfoModel.setPhone(nodesListModel.getResponseModel().get(i).getPhone());
			// FAX
			setStoreInfoModel.setFax(nodesListModel.getResponseModel().get(i).getFax());
			// 運用形態
			if (nodesListModel.getResponseModel().get(i).getOperationForm() != null) {
				setStoreInfoModel.setOperationForm(
						nodesListModel.getResponseModel().get(i).getOperationForm());
			}
			// 表示順
			if (nodesListModel.getResponseModel().get(i).getDisplayOrder() != null) {
				setStoreInfoModel.setDisplayOrder(
						nodesListModel.getResponseModel().get(i).getDisplayOrder());
			}
// KSD V001.000 20230915 AS
//			if (nodesListModel.getResponseModel().get(i).getConfigurations() != null) {
//				setStoreInfoModel.setConfigurations(
//						nodesListModel.getResponseModel().get(i).getConfigurations());
//			}
			//店舗グループ1のｺｰﾄﾞをセット
			setStoreInfoModel.setStoreGroup1(nodesListModel.getResponseModel().get(i).getStoreGroup1());
			//店舗グループ2のｺｰﾄﾞをセット
			setStoreInfoModel.setStoreGroup2(nodesListModel.getResponseModel().get(i).getStoreGroup2());
// KSD V001.000 20230915 AE
			storeInfos.add(setStoreInfoModel);
		}
		// 絞り込み結果無しの場合
		if (storeInfos.size() == 0) {
			responseModel.getResult().setCode(2);
			return responseModel;
		}
		responseModel.setStoreInfos(storeInfos);

		// セッションのトークン情報の上書き
		if (nodesListModel.getResult().getWSO2Token() != null
				&& nodesListModel.getResult().getELERAToken() != null) {

			if (!(nodesListModel.getResult().getWSO2Token().equals(accessToken))
					|| !(nodesListModel.getResult().getELERAToken().equals(ELERAToken))) {
				// ユーザ情報をセッション管理用リポジトリに追加
				loginUser.setWso2ApiToken(nodesListModel.getResult().getWSO2Token());
				loginUser.setELERAToken(nodesListModel.getResult().getELERAToken());
				var sessionId = sessionUtil.saveUserToRepository(loginUser);
				// レスポンスのヘッダーにセッションID用のCookieをセットする
				response = sessionUtil.setCookie(response, sessionId);
			}
		}

		return responseModel;

		// GetStoreRequestModel model =
		// new GetStoreRequestModel(storeCd, rcvmodel.getStoreCdStr(), rcvmodel.getName());
		// return storeMasterService.getStores(model, messageSource, apiContext, businessCd,
		// accessToken, ELERAToken);
	}

	/**
	 * 店舗マスタ更新処理.
	 *
	 * @param stores リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 店舗マスタ更新＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/StoreInfoRegist")
	@ResponseBody
	public PutStoreResponseModel storeInfoRegist(
			@RequestBody @Validated({ Default.class, GroupNameOrder.class, GroupPostNoOrder.class,
					GroupTelNoOrder.class }) PutStoreRequestModel stores,
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

		// changeplans/records(draft)
		var postChangePlanRequestModel = new PostChangePlanRequestModel();
		StoreInfoUpdateRequestModel storeRequestModel = stores.getStores().get(0);
		String nodeId = businessCd + storeRequestModel.getStoreCdStr();
		String changePlanNameUnitCdStr = "";

		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
		String timeStamp = date.format(new Date());

		// 新規の処理(名称：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ)
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

		if (storeRequestModel.getMode() != 1) {
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

		// KSD V001.000 DS 処理タイミングを変更（セットしたconfiguration情報がカタログ作成時にクリアされてしまう為）
		//// KSD V001.000 AS
		//if (storeRequestModel.getConfigurations().getBUSINESS_DAY_START_TIME_MAP().get("value").equals(
		//	storeRequestModel.getConfigurations().getBUSINESS_DAY_SOFT_END_TIME().getValue())) {
		//	var errorResponseModel = new PutStoreResponseModel();
		//
		//	var commonResponseModel = new ApiCommonResponseModel();
		//	commonResponseModel.setApi(-99);
		//	commonResponseModel.setCode(-99);
		//	commonResponseModel.setMs(-99);
		//
		//	var messageResourceUtil = new MessageSourceUtil(messageSource);
		//	MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
		//	map.add("stores[0].configurations.BUSINESS_DAY_SOFT_END_TIME.value", messageResourceUtil.getMessage("F00003.E018"));
		//	commonResponseModel.setErrorMessageMap(map);
		//	errorResponseModel.setResult(commonResponseModel);
		//	return errorResponseModel;
		//} else {
		//	// KSD V001.000 AS configuration未取得でgetConfigurations()を行うとNULLポインターエラーとなる対応
		//	if (postNodesBodyModel.getRequestModel().getConfigurations() == null) {
		//		postNodesBodyModel.getRequestModel().setConfigurations(new ConfigurationsDetailModel());
		//	}
		//	// KSD V001.000 AE configuration未取得でgetConfigurations()を行うとNULLポインターエラーとなる対応
		//	Map<String, Object> map = new HashMap<String, Object>();
		//	map.putAll(storeRequestModel.getConfigurations().getBUSINESS_DAY_START_TIME_MAP());
		//	postNodesBodyModel.getRequestModel().getConfigurations().setBUSINESS_DAY_START_TIME_MAP(map);
		//	postNodesBodyModel.getRequestModel().getConfigurations().setBUSINESS_DAY_SOFT_END_TIME(
		//		storeRequestModel.getConfigurations().getBUSINESS_DAY_SOFT_END_TIME()
		//	);
		//	postNodesBodyModel.getRequestModel().getConfigurations().setBUSINESS_DAY_HARD_END_TIME(
		//		storeRequestModel.getConfigurations().getBUSINESS_DAY_HARD_END_TIME()
		//	);
		//}
		// KSD V001.000 AE
		// KSD V001.000 DE 処理タイミングを変更（セットしたconfiguration情報がカタログ作成時にクリアされてしまう為）
		// configurations/nodes?changePlanName={changePlanName}
		// 正常時
		// Node登録(企業コード入力値)
		postNodesParamModel.getRequestModel().setChangePlanName(changePlanNameUnitCdStr);

		// BODY

		// 企業コード
		postNodesBodyModel.getRequestModel().setName(nodeId);

		// 親コード
		postNodesBodyModel.getRequestModel().setParentName(businessCd);

		// 企業名称
		postNodesBodyModel.getRequestModel().getDisplayName()
				.setDefaultValue(storeRequestModel.getName());

		// 店舗グループ１
		postNodesBodyModel.getRequestModel().setStoreGroup1(storeRequestModel.getStoreGroup1());

		// 店舗グループ２
		postNodesBodyModel.getRequestModel().setStoreGroup2(storeRequestModel.getStoreGroup2());

		// 郵便番号
		if (storeRequestModel.getPostNo() != null) {
			if (postNodesBodyModel.getRequestModel().getAddress() == null) {
				postNodesBodyModel.getRequestModel().setAddress(new ConfigurationsAddressModel());
			}
			if (postNodesBodyModel.getRequestModel().getAddress().getPostalCode() == null) {
				postNodesBodyModel.getRequestModel().getAddress()
						.setPostalCode(new CommonDefaultModel());
			}
			postNodesBodyModel.getRequestModel().getAddress().getPostalCode()
					.setDefaultValue(storeRequestModel.getPostNo());
		}

		// 住所
		if (storeRequestModel.getAddress() != null) {
			if (postNodesBodyModel.getRequestModel().getAddress() == null) {
				postNodesBodyModel.getRequestModel().setAddress(new ConfigurationsAddressModel());
			}
			if (postNodesBodyModel.getRequestModel().getAddress().getAddress1() == null) {
				postNodesBodyModel.getRequestModel().getAddress()
						.setAddress1(new CommonDefaultModel());
			}
			postNodesBodyModel.getRequestModel().getAddress().getAddress1()
					.setDefaultValue(storeRequestModel.getAddress());
		}

		// 電話番号
		if (storeRequestModel.getPhone() != null) {
			postNodesBodyModel.getRequestModel().setPhone(storeRequestModel.getPhone());
		}

		// FAX番号
		if (storeRequestModel.getFax() != null) {
			postNodesBodyModel.getRequestModel().setFax(storeRequestModel.getFax());
		}

		// 運用形態
		postNodesBodyModel.getRequestModel()
				.setOperationForm(storeRequestModel.getOperationalForm());

		// 表示順
		postNodesBodyModel.getRequestModel().setDisplayOrder(storeRequestModel.getDisplayOrder());

		// 固定の項目追加
		ConfigurationsLocaleModel locale = new ConfigurationsLocaleModel();
		ConfigurationsLocaleDetailModel localeDetail = new ConfigurationsLocaleDetailModel();
		localeDetail.setDefaultValue("The currently configured default locale.");
		locale.setType("key");
		locale.setName("LOCALE");
		locale.setValue("ja-JP");
		locale.setGroup("STORE");
		locale.setSubGroup("INFO");
		locale.setDescription(localeDetail);
		if (postNodesBodyModel.getRequestModel().getConfigurations() == null) {
			postNodesBodyModel.getRequestModel().setConfigurations(new ConfigurationsDetailModel());
		}
		postNodesBodyModel.getRequestModel().getConfigurations().setLOCALE(locale);

		ConfigurationsTimezoneModel timezone = new ConfigurationsTimezoneModel();
		ConfigurationsTimezoneDetailModel timeZoneDetail = new ConfigurationsTimezoneDetailModel();
		timeZoneDetail.setDefaultValue("Defines the timezone for the node.");
		timezone.setType("key");
		timezone.setName("TIMEZONE");
		timezone.setValue("Asia/Tokyo");
		timezone.setGroup("STORE_OPEARATIONS");
		timezone.setSubGroup("CONFIG");
		timezone.setDescription(timeZoneDetail);
		postNodesBodyModel.getRequestModel().getConfigurations().setTIMEZONE(timezone);

		// 新規の場合はカタログとプライスリストを追加
		if (storeRequestModel.getMode() == 1) {
			// 新規
			// カタログ作成
			var catalogModel = new ConfigurationsCatalogModel();
			catalogModel.setGroup("STORE_OPERATIONS");
			catalogModel.setSubGroup("CONFIG");
			catalogModel.setType("List");
			catalogModel.setEntryType("Text");
			catalogModel.setInherited(false);
			catalogModel.setName("CATALOG");
			catalogModel.setValue(new ArrayList<CommonValueOrderModel>());

			var catalogName = new CommonValueOrderModel();
			catalogName.setOrder(0);
			catalogName.setValue(nodeId);

			catalogModel.getValue().add(catalogName);
			postNodesBodyModel.getRequestModel().setConfigurations(new ConfigurationsDetailModel());
			postNodesBodyModel.getRequestModel().getConfigurations().setLOCALE(locale);
			postNodesBodyModel.getRequestModel().getConfigurations().setTIMEZONE(timezone);
			postNodesBodyModel.getRequestModel().getConfigurations().setCATALOG(catalogModel);

			// プライスリスト作成
			var pricelistsModel = new ConfigurationsPriceListsModel();
			pricelistsModel.setGroup("STORE_OPERATIONS");
			pricelistsModel.setSubGroup("CONFIG");
			pricelistsModel.setType("Map");
			pricelistsModel.setInherited(false);
			pricelistsModel.setName("PRICE_LISTS");
			pricelistsModel.setValue(new ConfigurationsPriceExtendsModel());
			pricelistsModel.getValue().setExtends(true);
			pricelistsModel.getValue()
					.setList(new ArrayList<ConfigurationsPriceExtendsDetailModel>());

			var pricelistsName = new ConfigurationsPriceExtendsDetailModel();
			pricelistsName.setOrder(0);
			pricelistsName.setPriceListName(nodeId);
			pricelistsModel.getValue().getList().add(pricelistsName);

			postNodesBodyModel.getRequestModel().getConfigurations()
					.setPRICE_LISTS(pricelistsModel);

		}

		// KSD V001.000 AS 処理タイミングを変更（セットしたconfiguration情報がカタログ作成時にクリアされてしまう為）
		Map<String, Object> map = new HashMap<String, Object>();
		// KSD V001.000 AS 固定項目を追加
		storeRequestModel.getConfigurations().getBUSINESS_DAY_START_TIME_MAP().put("group", "CASH-MANAGEMENT");
		storeRequestModel.getConfigurations().getBUSINESS_DAY_START_TIME_MAP().put("subGroup", "CONFIG");
		storeRequestModel.getConfigurations().getBUSINESS_DAY_START_TIME_MAP().put("type", "Key");
		storeRequestModel.getConfigurations().getBUSINESS_DAY_START_TIME_MAP().put("inherited", false);
		storeRequestModel.getConfigurations().getBUSINESS_DAY_START_TIME_MAP().put("name", "BUSINESS_DAY_START_TIME");
		// KSD V001.000 AE 固定項目を追加
		map.putAll(storeRequestModel.getConfigurations().getBUSINESS_DAY_START_TIME_MAP());
		postNodesBodyModel.getRequestModel().getConfigurations().setBUSINESS_DAY_START_TIME_MAP(map);

		// KSD V001.000 AS 固定項目を追加
		storeRequestModel.getConfigurations().getBUSINESS_DAY_SOFT_END_TIME().setGroup("CASH-MANAGEMENT");
		storeRequestModel.getConfigurations().getBUSINESS_DAY_SOFT_END_TIME().setSubGroup("CONFIG");
		storeRequestModel.getConfigurations().getBUSINESS_DAY_SOFT_END_TIME().setType("Key");
		storeRequestModel.getConfigurations().getBUSINESS_DAY_SOFT_END_TIME().setInherited(false);
		storeRequestModel.getConfigurations().getBUSINESS_DAY_SOFT_END_TIME().setName("BUSINESS_DAY_SOFT_END_TIME");
		// KSD V001.000 AE 固定項目を追加
		postNodesBodyModel.getRequestModel().getConfigurations().setBUSINESS_DAY_SOFT_END_TIME(
			storeRequestModel.getConfigurations().getBUSINESS_DAY_SOFT_END_TIME()
		);

		// KSD V001.000 AS 固定項目を追加
		storeRequestModel.getConfigurations().getBUSINESS_DAY_HARD_END_TIME().setGroup("CASH-MANAGEMENT");
		storeRequestModel.getConfigurations().getBUSINESS_DAY_HARD_END_TIME().setSubGroup("CONFIG");
		storeRequestModel.getConfigurations().getBUSINESS_DAY_HARD_END_TIME().setType("Key");
		storeRequestModel.getConfigurations().getBUSINESS_DAY_HARD_END_TIME().setInherited(false);
		storeRequestModel.getConfigurations().getBUSINESS_DAY_HARD_END_TIME().setName("BUSINESS_DAY_HARD_END_TIME");
		// KSD V001.000 AE 固定項目を追加
		postNodesBodyModel.getRequestModel().getConfigurations().setBUSINESS_DAY_HARD_END_TIME(
			storeRequestModel.getConfigurations().getBUSINESS_DAY_HARD_END_TIME()
		);
		// KSD V001.000 AE 処理タイミングを変更（セットしたconfiguration情報がカタログ作成時にクリアされてしまう為）

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

		// 新規の場合はカタログとプライスリストを追加
		if (storeRequestModel.getMode() == 1) {
			// G001.00.0 Update-Start
			// カタログを取得
			var getCatalogReq = catalogsService.getCatalogs(nodeId, messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
			// トークン情報の上書き
			if (getCatalogReq.getResult().getWSO2Token() != null
					&& getCatalogReq.getResult().getELERAToken() != null) {
				accessToken = getCatalogReq.getResult().getWSO2Token();
				ELERAToken = getCatalogReq.getResult().getELERAToken();
			}
			if (getCatalogReq.getResult().getCode() != 0) {
				// エラーメッセージをセット
				int intcode = getCatalogReq.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(getCatalogReq.getResult().getErrorMessageMap());
				return responseModel;
			}
			if (getCatalogReq.getResponseModel() == null
					|| StringUtils.isBlank(getCatalogReq.getResponseModel().getName())) {
			// G001.00.0 Update-End
			// POST /catalogs
			// カタログ更新
			var postCatalogReq = new PostCatalogsRequestModel();
			postCatalogReq.getRequestModel().setPaymentRestrictions(null);
			postCatalogReq.getRequestModel().setDescription(null);

			postCatalogReq.getRequestModel().setName(nodeId);
			postCatalogReq.getRequestModel().getDisplayName().setDefaultValue(nodeId);
			postCatalogReq.getRequestModel().getChangePlan().setName(changePlanNameUnitCdStr);
			postCatalogReq.getRequestModel().getChangePlan().setDeleted(false);

			var postCatalogRes = catalogsService.postCatalogs(postCatalogReq, messageSource,
					apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// トークン情報の上書き
			if (postCatalogRes.getResult().getWSO2Token() != null
					&& postCatalogRes.getResult().getELERAToken() != null) {
				accessToken = postCatalogRes.getResult().getWSO2Token();
				ELERAToken = postCatalogRes.getResult().getELERAToken();
			}

			if (postCatalogRes.getResult().getCode() != 0) {
				// エラーメッセージをセット
				int intcode = postCatalogRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(postCatalogRes.getResult().getErrorMessageMap());
				return responseModel;
			}

			// KSD V001.000 DS Step2ではカタロググループは商品構成業務で作成する為、店舗追加時での追加は不要
			//// G001.00.0 Update-Start
			//}
			//// カタログを取得
			//var getCatalogGroupsReq = catalogsService.getCatalogsGroups(nodeId, messageSource, apiContext, accessToken,
			//		ELERAToken,
			//		loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
			//// トークン情報の上書き
			//if (getCatalogGroupsReq.getResult().getWSO2Token() != null
			//		&& getCatalogGroupsReq.getResult().getELERAToken() != null) {
			//	accessToken = getCatalogGroupsReq.getResult().getWSO2Token();
			//	ELERAToken = getCatalogGroupsReq.getResult().getELERAToken();
			//}
			//if (getCatalogGroupsReq.getResult().getCode() != 0) {
			//	// エラーメッセージをセット
			//	int intcode = getCatalogGroupsReq.getResult().getCode().intValue();
			//	responseModel.getResult().setCode(Integer.valueOf(intcode));
			//	responseModel.getResult()
			//			.setErrorMessageMap(getCatalogGroupsReq.getResult().getErrorMessageMap());
			//	return responseModel;
			//}
			//if (getCatalogGroupsReq.getResponseModel() == null || getCatalogGroupsReq.getResponseModel().isEmpty()) {
			//// G001.00.0 Update-End
			//
			//// POST /catalogs/groups?catalogName={CatalogName
			//// カタロググループ更新
			//var postCatalogGroupsReqParam = new PostCatalogsGroupsRequestParamModel();
			//postCatalogGroupsReqParam.getRequestModel().setCatalogName(nodeId);
			//
			//var postCatalogGroupsReqBody = new PostCatalogsGroupsRequestBodyModel();
			//postCatalogGroupsReqBody.getRequestModel().setPaymentRestrictions(null);
			//postCatalogGroupsReqBody.getRequestModel().setDescription(null);
			//
			//postCatalogGroupsReqBody.getRequestModel().getChangePlan()
			//		.setName(changePlanNameUnitCdStr);
			//postCatalogGroupsReqBody.getRequestModel().getChangePlan().setDeleted(false);
			//postCatalogGroupsReqBody.getRequestModel().setName(businessCd);
			//postCatalogGroupsReqBody.getRequestModel().setCatalogName(nodeId);
			//postCatalogGroupsReqBody.getRequestModel().getDisplayName().setDefaultValue(nodeId);
			//
			//var postCatalogGroupsRes = catalogsService.postCatalogsGroups(postCatalogGroupsReqParam,
			//		postCatalogGroupsReqBody, messageSource, apiContext, accessToken, ELERAToken,
			//		loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
			//
			//// トークン情報の上書き
			//if (postCatalogGroupsRes.getResult().getWSO2Token() != null
			//		&& postCatalogGroupsRes.getResult().getELERAToken() != null) {
			//	accessToken = postCatalogGroupsRes.getResult().getWSO2Token();
			//	ELERAToken = postCatalogGroupsRes.getResult().getELERAToken();
			//}
			//
			//if (postCatalogGroupsRes.getResult().getCode() != 0) {
			//	// エラーメッセージをセット
			//	int intcode = postCatalogGroupsRes.getResult().getCode().intValue();
			//	responseModel.getResult().setCode(Integer.valueOf(intcode));
			//	responseModel.getResult()
			//			.setErrorMessageMap(postCatalogGroupsRes.getResult().getErrorMessageMap());
			//	return responseModel;
			//}
			// KSD V001.000 DE Step2ではカタロググループは商品構成業務で作成する為、店舗追加時での追加は不要

			// G001.00.0 Update-Start
			}
			// カタログを取得
			var getPricelistsReq = pricelistsService.getPricelists(nodeId, messageSource, apiContext, accessToken,
					ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
			// トークン情報の上書き
			if (getPricelistsReq.getResult().getWSO2Token() != null
					&& getPricelistsReq.getResult().getELERAToken() != null) {
				accessToken = getPricelistsReq.getResult().getWSO2Token();
				ELERAToken = getPricelistsReq.getResult().getELERAToken();
			}
			if (getPricelistsReq.getResult().getCode() != 0) {
				// エラーメッセージをセット
				int intcode = getPricelistsReq.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(getPricelistsReq.getResult().getErrorMessageMap());
				return responseModel;
			}
			if (getPricelistsReq.getResponseModel() == null || getPricelistsReq.getResponseModel().isEmpty()) {
			// G001.00.0 Update-End

			// POST /pricelists
			var priceListsReq = new PostPricelistsRequestModel();
			priceListsReq.getRequestModel().setName(nodeId);
			priceListsReq.getRequestModel().setDisplayName(nodeId);
			priceListsReq.getRequestModel().getChangePlan().setName(changePlanNameUnitCdStr);
			priceListsReq.getRequestModel().getChangePlan().setDeleted(false);

			// 適用開始日は現在日時にしておく
			Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
			df.setTimeZone(cal.getTimeZone());
			String timestamp = df.format(cal.getTime());
			priceListsReq.getRequestModel().setStartDate(timestamp);
			priceListsReq.getRequestModel().setCurrencyCode("JPY");

			var priceListsRes = pricelistsService.postPricelists(priceListsReq, messageSource,
					apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// トークン情報の上書き
			if (priceListsRes.getResult().getWSO2Token() != null
					&& priceListsRes.getResult().getELERAToken() != null) {
				accessToken = priceListsRes.getResult().getWSO2Token();
				ELERAToken = priceListsRes.getResult().getELERAToken();
			}

			if (priceListsRes.getResult().getCode() != 0) {
				// エラーメッセージをセット
				int intcode = priceListsRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(priceListsRes.getResult().getErrorMessageMap());
				return responseModel;
			}
			// G001.00.0 Update-Start
			}
			// G001.00.0 Update-End

		}

// KSD V001.000 20231024 AS
		///////////////////////////////////////////////////
		// 店舗新規追加 初期データ投入
		///////////////////////////////////////////////////
		if (storeRequestModel.getMode() == 1) {
			//新規の場合、
			//初期データ投入[Elera_Micro_ServicesとAPI一覧 - application-facade.xlsx]参照
			var initialData = initialdataService.postInitialData(nodeId, 
					messageSource, apiContext, accessToken,ELERAToken,
			loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
			
			// トークン情報の上書き
			if (initialData.getResult().getWSO2Token() != null
					&& initialData.getResult().getELERAToken() != null) {
				accessToken = initialData.getResult().getWSO2Token();
				ELERAToken = initialData.getResult().getELERAToken();
			}
			if (initialData.getResult().getCode() != 0) {
				// エラーメッセージをセット
				int intcode = initialData.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(initialData.getResult().getErrorMessageMap());
				return responseModel;
			}
	    }
// KSD V001.000 20231024 AE

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

		// 正常時
		// 店舗マスタ更新
		// return storeMasterService.putStores(stores, messageSource, apiContext, businessCd,
		// accessToken, ELERAToken);
	}

	/**
	 * 店舗マスタ削除処理.
	 *
	 * @param storeCd 店舗コード
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 店舗マスタ削除＋αレスポンス
	 */
	@CrossOrigin
	@DeleteMapping("/StoreInfoDeleted/{storeCd}")
	public DeleteStoreResponseModel storeInfoDeleted(@PathVariable int storeCd,
			HttpServletRequest request, HttpServletResponse response) {

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			DeleteStoreResponseModel responseModel = new DeleteStoreResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		String businessCd = loginUser.getBusinessUnitCdStr();
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// バリデーションチェック
		if (storeCd < 1 | storeCd > 999999) {
			// バリデーションエラー
			var responseModel = new DeleteStoreResponseModel();
			var messageResourseUtil = new MessageSourceUtil(messageSource);
			responseModel.setResult(ApiUtil.createValidationErrorModelWhenDelete("storeCd",
					messageResourseUtil.getMessage("VALIDA.SIZE", new String[] { "1", "999999" })));
			return responseModel;
		}

		// 正常時
		// 店舗マスタ削除
		var responseModel = new DeleteStoreResponseModel();
		responseModel.setResult(new ApiCommonResponseModel());

		// changeplans/records(draft)
		var postChangePlanRequestModel = new PostChangePlanRequestModel();
		String nodeId = businessCd + String.format("%06d", storeCd);
		String changePlanNameUnitCdStr = "";

		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
		String timeStamp = date.format(new Date());
		// 新規の処理(名称：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ)
		// 企業のため店舗コードなし
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
// KSD V001.000 20231031 AS
		///////////////////////////////////////////////////
		// S3内店舗フォルダ削除処理
		///////////////////////////////////////////////////
		//S3店舗フォルダ一括削除[Elera_Micro_ServicesとAPI一覧 - application-facade.xlsx]参照
		var deletes3storefolder = deletes3storefolderService.postDeleteS3storefolder(nodeId, 
										messageSource, apiContext, accessToken,ELERAToken,
								loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
											
		// トークン情報の上書き
		if (deletes3storefolder.getResult().getWSO2Token() != null
				&& deletes3storefolder.getResult().getELERAToken() != null) {
			accessToken = deletes3storefolder.getResult().getWSO2Token();
			ELERAToken = deletes3storefolder.getResult().getELERAToken();
		}
		if (deletes3storefolder.getResult().getCode() != 0) {
			// エラーメッセージをセット
			int intcode = deletes3storefolder.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(deletes3storefolder.getResult().getErrorMessageMap());
			return responseModel;
		}
// KSD V001.000 20231031 AE

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
				
		// セッションのトークン情報の上書き
		if (postChangePlanPendingResponseModel.getResult().getWSO2Token() != null
				&& postChangePlanPendingResponseModel.getResult().getELERAToken() != null) {
			loginUser
					.setWso2ApiToken(postChangePlanPendingResponseModel.getResult().getWSO2Token());
			loginUser.setELERAToken(postChangePlanPendingResponseModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		responseModel.getResult().setCode(0);

		return responseModel;

		// 正常時
		// 店舗マスタ削除
		// return storeMasterService.deleteStores(storeCd, messageSource, apiContext, businessCd,
		// accessToken, ELERAToken);
	}

	// /**
	// * 店舗グループマスタ検索処理.
	// *
	// * @param request HttpServletのリクエスト(FWが自動で設定)
	// * @return 店舗グループマスタ検索＋αレスポンス
	// */
	// @CrossOrigin
	// @GetMapping("/StoreGroups")
	// @ResponseBody
	// public GetStoreGroupResponseModel storeGroupSearch(HttpServletRequest request) {
	//
	// var loginUser = this.sessionUtil.getActiveLoginUser(request);
	// if (loginUser == null) {
	// GetStoreGroupResponseModel responseModel = new GetStoreGroupResponseModel();
	// responseModel.setResult(ApiUtil.getSessionError());
	// return responseModel;
	// }
	//
	// String businessCd = loginUser.getBusinessUnitCdStr();
	// String accessToken = loginUser.getWso2ApiToken();
	// String ELERAToken = loginUser.getELERAToken();
	//
	// // 正常時
	// // 店舗マスタ検索
	// return storeMasterService.getStoreGroups(messageSource, apiContext, businessCd, accessToken,
	// ELERAToken);
	// }
	//
	// /**
	// * 店舗運用形態検索処理.
	// *
	// * @param request HttpServletのリクエスト(FWが自動で設定)
	// * @return 店舗運用形態検索＋αレスポンス
	// */
	// @CrossOrigin
	// @GetMapping("/OperationalForm")
	// @ResponseBody
	// public GetOperationalFormResponseModel operationalFormSearch(HttpServletRequest request) {
	//
	// var loginUser = this.sessionUtil.getActiveLoginUser(request);
	// if (loginUser == null) {
	// GetOperationalFormResponseModel responseModel = new GetOperationalFormResponseModel();
	// responseModel.setResult(ApiUtil.getSessionError());
	// return responseModel;
	// }
	//
	// String businessCd = loginUser.getBusinessUnitCdStr();
	// String accessToken = loginUser.getWso2ApiToken();
	// String ELERAToken = loginUser.getELERAToken();
	//
	// // 正常時
	// // 店舗マスタ検索
	// return storeMasterService.getOperationalForm(messageSource, apiContext, businessCd,
	// accessToken, ELERAToken);
	// }
}
