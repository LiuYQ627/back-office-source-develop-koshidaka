package com.ttss.prementenance.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

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

import com.ttss.prementenance.model.CatalogsCommonPaymentRestrictionsModel;
import com.ttss.prementenance.model.CatalogsCommonPaymentTypeModel;
import com.ttss.prementenance.model.CatalogsCommonProductGroupModel;
import com.ttss.prementenance.model.GetCatalogsGroupsCatalogNameItemsRequestModel;
import com.ttss.prementenance.model.GetCatalogsGroupsHierarchyRequestModel;
import com.ttss.prementenance.model.GetProductGroupHierarchyRequestModel;
import com.ttss.prementenance.model.GetProductGroupHierarchyResponseModel;
import com.ttss.prementenance.model.GetProductGroupMasterProductGroupSearchRequestModel;
import com.ttss.prementenance.model.GetProductGroupMasterProductGroupSearchResponseModel;
import com.ttss.prementenance.model.GetProductGroupQueryPageRequestModel;
import com.ttss.prementenance.model.GetProductGroupQueryPageResponseModel;
import com.ttss.prementenance.model.PostCatalogsCatalogNameGroupsItemsQueryRequestModel;
import com.ttss.prementenance.model.PostCatalogsCatalogNameGroupsItemsQueryResponseModel;
import com.ttss.prementenance.model.PostCatalogsGroupsProductGroupRequestBodyModel;
import com.ttss.prementenance.model.PostCatalogsGroupsRequestParamModel;
import com.ttss.prementenance.model.PostChangePlanRequestModel;
import com.ttss.prementenance.model.PostProductGroupMasterProductGroupQueryRequestModel;
import com.ttss.prementenance.model.PostProductGroupMasterProductRegistRequestModel;
import com.ttss.prementenance.model.PostProductGroupMasterProductRegistRequestModel.GroupKanjiOrder;
import com.ttss.prementenance.model.PostProductGroupMasterProductRegistResponseModel;
import com.ttss.prementenance.model.PostProductMasterProductGroupDeleteRequestModel;
import com.ttss.prementenance.model.PostProductMasterProductGroupDeleteResponseModel;
import com.ttss.prementenance.service.CatalogsService;
import com.ttss.prementenance.service.ChangePlanService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * 商品マスタ画面&API.
 *
 * @author
 * @version 1.0.0
 */
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 */
@RestController
@RequestMapping("ProductGroupMaster")
public class ProductGroupMasterController {
	@Autowired
	private ChangePlanService changePlanService;

	@Autowired
	private CatalogsService catalogsService;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	private SessionUtil sessionUtil;

	public ProductGroupMasterController() {
	}

	/**
	 * 商品構成マスタページング検索処理.
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @param response HttpServletのレスポンス
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/ProductQuery/Page")
	@ResponseBody
	public GetProductGroupQueryPageResponseModel productGroupQueryPage(
			@Validated GetProductGroupQueryPageRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new GetProductGroupQueryPageResponseModel();
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

		// 商品構成マスタの検索
		var paramReq = new GetCatalogsGroupsCatalogNameItemsRequestModel();
		paramReq.getRequestModel().setCatalogName(model.getCatalogName());
		paramReq.getRequestModel().setProductClassificationNumber(model.getProductClassificationNumber());
		paramReq.getRequestModel().setOrderBy(model.getOrderBy());
		paramReq.getRequestModel().setAscending(model.getAscending());
		paramReq.getRequestModel().setStartIndex(model.getStartIndex());
		paramReq.getRequestModel().setBatchSize(model.getBatchSize());
		var catalogRes =
				catalogsService.getCatalogsGroupsCatalogNameItems(paramReq, messageSource, apiContext,
						accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		if (catalogRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = catalogRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(catalogRes.getResult().getErrorMessageMap());
		}else {
			// 正常で返却0
			responseModel.getResult().setCode(Integer.valueOf(0));
			responseModel.setResponseModel(catalogRes.getResponseModel());
		}

		return responseModel;
    }

	/**
	 * 商品構成マスタ条件検索処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @param response HttpServletのレスポンス
	 * @return 商品マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/ProductQuery/limit")
	@ResponseBody
	public PostCatalogsCatalogNameGroupsItemsQueryResponseModel productGroupQueryLimit(
			@Validated PostProductGroupMasterProductGroupQueryRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {
		var responseModel = new PostCatalogsCatalogNameGroupsItemsQueryResponseModel();
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

		// 商品構成マスタ検索
		var requestModel = new PostCatalogsCatalogNameGroupsItemsQueryRequestModel();
		var catalogName = model.getNodeId();
		requestModel.setNodeId(model.getNodeId());
		requestModel.setQueryMode(model.getQueryMode());
		requestModel.setQueryLimit(model.getQueryLimit());
		requestModel.setKeyword(model.getSearchParams());
		var res = catalogsService.postCatalogsGroupsQueryLimit( requestModel, catalogName, messageSource, apiContext, accessToken,
				ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		if (res.getResult().getCode() != 0) {
			// 失敗
			int intcode = res.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(res.getResult().getErrorMessageMap());
		}else {
			// 正常で返却0
			responseModel.getResult().setCode(Integer.valueOf(0));
			responseModel.setResponseModel(res.getResponseModel());
		}
		return responseModel;
	}

	/**
	 * 商品構成マスタ取得処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @param response HttpServletのレスポンス
	 * @return 商品マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/ProductSearch")
	@ResponseBody
	public GetProductGroupMasterProductGroupSearchResponseModel productGroupSearch(
			@Validated GetProductGroupMasterProductGroupSearchRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new GetProductGroupMasterProductGroupSearchResponseModel();

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

		// カタログ取得
		var catalogName = model.getNodeId();
		var productId = model.getProductId();
		var productClassificationNumber = model.getProductClassificationNumber().toString();

		var catalogRes = catalogsService.getCatalogsGroupsGroupId(
				catalogName, productId, productClassificationNumber,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// トークン情報の上書き
		if (catalogRes.getResult().getWSO2Token() != null
				&& catalogRes.getResult().getELERAToken() != null) {
			accessToken = catalogRes.getResult().getWSO2Token();
			ELERAToken = catalogRes.getResult().getELERAToken();
		}

		if (catalogRes.getResult().getCode() == 2) {
			// データなしで返却
			responseModel.getResult().setCode(Integer.valueOf(2));
			return responseModel;

		} else if (catalogRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = catalogRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(catalogRes.getResult().getErrorMessageMap());
			return responseModel;
		} else {
			responseModel.getResponseModel().setProductId(catalogRes.getResponseModel().getProductId());
			responseModel.getResponseModel().setCatalogs(catalogRes.getResponseModel());
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

		// 正常で返却
		responseModel.getResult().setCode(Integer.valueOf(0));
		return responseModel;
	}

	/**
	 * 商品構成マスタ更新処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @param response HttpServletのレスポンス
	 * @return 商品構成マスタ更新＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/ProductRegist")
	@ResponseBody
	public PostProductGroupMasterProductRegistResponseModel productRegist(
			@RequestBody @Validated({ Default.class,
					GroupKanjiOrder.class }) PostProductGroupMasterProductRegistRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PostProductGroupMasterProductRegistResponseModel();
		// バリデーションエラーメッセージで使用
		MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
		// ValidationMessages.property からメッセージを持ってくるための記述
		ReloadableResourceBundleMessageSource validationMessageSource = new ReloadableResourceBundleMessageSource();
		validationMessageSource.setBasename("classpath:/ValidationMessages");
		validationMessageSource.setDefaultEncoding("UTF-8");

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			responseModel.getResult().addErrorMessageMap(map);
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// 実行計画を作成
		var changePlanReq = new PostChangePlanRequestModel();
		// 新規の場合は企業コード＋店舗コード＋ユーザーID＋タイムスタンプ
		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
		String timeStamp = date.format(new Date());
		var changePlanName = model.getNodeId() + loginUser.getUserId() + timeStamp;
		changePlanReq.setName(changePlanName);
		// draftで作成
		changePlanReq.setStatus("Draft");
		var changePlanRes = changePlanService.postChangePlan(changePlanReq, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// トークン情報の上書き
		if (changePlanRes.getResult().getWSO2Token() != null
				&& changePlanRes.getResult().getELERAToken() != null) {
			accessToken = changePlanRes.getResult().getWSO2Token();
			ELERAToken = changePlanRes.getResult().getELERAToken();
		}

		if (changePlanRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = changePlanRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(changePlanRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// catalogsGroupsに登録
		var catalogsGroupsReqParam = new PostCatalogsGroupsRequestParamModel();
		catalogsGroupsReqParam.getRequestModel().setCatalogName(model.getNodeId()); // カタログ名←nodeId
		var catalogsGroupsReqBody = new PostCatalogsGroupsProductGroupRequestBodyModel();
		// 実行計画名
		catalogsGroupsReqBody.getRequestModel().getChangePlan()
				.setName(changePlanRes.getResponseModel().getName());
		// カタログ名←nodeId
		catalogsGroupsReqBody.getRequestModel().setCatalogName(model.getNodeId());
		// グループ名←企業コード+分類No+商品構成コード
		var productId = model.getProductId();
		catalogsGroupsReqBody.getRequestModel()
				.setName(loginUser.getBusinessUnitCdStr() + 
						 model.getProductClassificationNumber() + 
						 productId);
		// リンクするグループ名
		catalogsGroupsReqBody.getRequestModel().setParentName(model.getParentName());
		// リンクするコード
		catalogsGroupsReqBody.getRequestModel().setParentId(model.getParentId());
		// 分類No.
		catalogsGroupsReqBody.getRequestModel().setProductClassificationNumber(model.getProductClassificationNumber());
		// 商品構成コード
		catalogsGroupsReqBody.getRequestModel().setProductId(productId);
		// 名称
		catalogsGroupsReqBody.getRequestModel().getDisplayName().setKanji(model.getKanji());		// 漢字名称
		catalogsGroupsReqBody.getRequestModel().getDisplayName().setDefaultValue(model.getKanji());	// 漢字名称
		// POS売上税区分
		if (model.getProductTaxCodes() != null) {
			catalogsGroupsReqBody.getRequestModel().getNamedAttributes().setProductTaxCodes(model.getProductTaxCodes()); // POS売上税区分
		}
		// 商品区分
		if (model.getProductClassification() != null) {
			catalogsGroupsReqBody.getRequestModel().getNamedAttributes().setProductClassification(model.getProductClassification());
		}
		// 年齢確認商品
		if (model.getAgeToBuy() != null) {
			if (model.getAgeToBuy() == 20L) {
				catalogsGroupsReqBody.getRequestModel().getNamedAttributes().setAgeToBuy(20L);
			}
		}
		// アイテム値割引区分
		if (model.getDiscountable() != null) {
			if (model.getDiscountable() == true) {
				catalogsGroupsReqBody.getRequestModel().getNamedAttributes().setDiscountable(true);
			} else if (model.getDiscountable() == false) {
				catalogsGroupsReqBody.getRequestModel().getNamedAttributes().setDiscountable(false);
			}
		}
		// アイテム売変区分
		if (model.getPriceChangeOperation() != null) {
			if (model.getPriceChangeOperation() == true) {
				catalogsGroupsReqBody.getRequestModel().getNamedAttributes().setPriceChangeOperation(true);
			} else if (model.getPriceChangeOperation() == false) {
				catalogsGroupsReqBody.getRequestModel().getNamedAttributes().setPriceChangeOperation(false);
			}
		}
		// 小計値引割引対象
		if (model.getSubTotalDiscountable() != null) {
			if (model.getSubTotalDiscountable() == true) {
				catalogsGroupsReqBody.getRequestModel().getNamedAttributes().setSubTotalDiscountable(true);
			} else if (model.getSubTotalDiscountable() == false) {
				catalogsGroupsReqBody.getRequestModel().getNamedAttributes().setSubTotalDiscountable(false);
			}
		}
		// 決済種別
		if (model.getPaymentType() != null) {
			if (catalogsGroupsReqBody.getRequestModel().getNamedAttributes().getPaymentRestrictions() == null) {
				catalogsGroupsReqBody.getRequestModel().getNamedAttributes()
						.setPaymentRestrictions(new CatalogsCommonPaymentRestrictionsModel());
			}
			if (catalogsGroupsReqBody.getRequestModel().getNamedAttributes().getPaymentRestrictions()
					.getPaymentTypeExclusions() == null) {
				catalogsGroupsReqBody.getRequestModel().getNamedAttributes().getPaymentRestrictions()
						.setPaymentTypeExclusions(new ArrayList<CatalogsCommonPaymentTypeModel>());
			}
			catalogsGroupsReqBody.getRequestModel().getNamedAttributes().getPaymentRestrictions().getPaymentTypeExclusions().clear();
			for (String paymentType : model.getPaymentType())
			{
				CatalogsCommonPaymentTypeModel paymentTypeModel = new CatalogsCommonPaymentTypeModel();
				paymentTypeModel.setPaymentType(paymentType);
				catalogsGroupsReqBody.getRequestModel().getNamedAttributes().getPaymentRestrictions().getPaymentTypeExclusions().add(paymentTypeModel);
			}
		}
		// 免税区分
		if (model.getDutyFreeClassification() != null) {
			catalogsGroupsReqBody.getRequestModel().getNamedAttributes().setDutyFreeClassification(model.getDutyFreeClassification());
		}
		// 販売停止区分
		if (model.getNotForSale() != null) {
			if (model.getNotForSale() == true) {
				catalogsGroupsReqBody.getRequestModel().getNamedAttributes().setNotForSale(true);
			} else if (model.getNotForSale() == false) {
				catalogsGroupsReqBody.getRequestModel().getNamedAttributes().setNotForSale(false);
			}
		}
		// 金額強制入力
		if (model.getPriceRequired() != null) {
			if (model.getPriceRequired() == true) {
				catalogsGroupsReqBody.getRequestModel().getNamedAttributes().setPriceRequired(true);
			} else if (model.getPriceRequired() == false) {
				catalogsGroupsReqBody.getRequestModel().getNamedAttributes().setPriceRequired(false);
			}
		}
		catalogsGroupsReqBody.getRequestModel().getChangePlan().setDeleted(false);

		var catalogsGroupsRes = catalogsService.postCatalogsGroupsProductGroup(catalogsGroupsReqParam,
				catalogsGroupsReqBody, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (catalogsGroupsRes.getResult().getWSO2Token() != null
				&& catalogsGroupsRes.getResult().getELERAToken() != null) {
			accessToken = catalogsGroupsRes.getResult().getWSO2Token();
			ELERAToken = catalogsGroupsRes.getResult().getELERAToken();
		}

		if (catalogsGroupsRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = catalogsGroupsRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(catalogsGroupsRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// 実行計画をPendingに変更
		changePlanReq = new PostChangePlanRequestModel();
		changePlanReq.setVersion(changePlanRes.getResponseModel().getVersion());
		changePlanReq.setName(changePlanRes.getResponseModel().getName());
		changePlanReq.setStatus("Pending");
		changePlanRes = changePlanService.postChangePlan(changePlanReq, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// トークン情報の上書き
		if (changePlanRes.getResult().getWSO2Token() != null
				&& changePlanRes.getResult().getELERAToken() != null) {
			accessToken = changePlanRes.getResult().getWSO2Token();
			ELERAToken = changePlanRes.getResult().getELERAToken();
		}

		if (changePlanRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = changePlanRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(changePlanRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// 実行計画を実行
		var changePlanExecuteRes = changePlanService.postChangePlanExecute(
				changePlanRes.getResponseModel().getName(), messageSource, apiContext, accessToken,
				ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		if (changePlanExecuteRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = changePlanExecuteRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(changePlanExecuteRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// セッションのトークン情報の上書き
		if (changePlanExecuteRes.getResult().getWSO2Token() != null
				&& changePlanExecuteRes.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(changePlanExecuteRes.getResult().getWSO2Token());
			loginUser.setELERAToken(changePlanExecuteRes.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		// 正常で返却
		responseModel.getResult().setCode(Integer.valueOf(0));
		return responseModel;
	}

	/**
	 * 商品構成マスタ削除処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @param response HttpServletのレスポンス
	 * @return 商品構成マスタ削除＋αレスポンス
	 */
	@CrossOrigin
	@DeleteMapping("/ProductDeleted")
	public PostProductMasterProductGroupDeleteResponseModel productGroupDeleted(
			@RequestBody PostProductMasterProductGroupDeleteRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PostProductMasterProductGroupDeleteResponseModel();

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

		// 実行計画を作成
		var changePlanReq = new PostChangePlanRequestModel();
		// 新規の場合は企業コード＋店舗コード＋ユーザーID＋タイムスタンプ
		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
		String timeStamp = date.format(new Date());
		var changePlanName = model.getNodeId() + loginUser.getUserId() + timeStamp;
		changePlanReq.setName(changePlanName);
		// draftで作成
		changePlanReq.setStatus("Draft");
		var changePlanRes = changePlanService.postChangePlan(changePlanReq, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// トークン情報の上書き
		if (changePlanRes.getResult().getWSO2Token() != null
				&& changePlanRes.getResult().getELERAToken() != null) {
			accessToken = changePlanRes.getResult().getWSO2Token();
			ELERAToken = changePlanRes.getResult().getELERAToken();
		}

		if (changePlanRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = changePlanRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(changePlanRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// カタログアイテム登録
		var catalogsGroupsReqParam = new PostCatalogsGroupsRequestParamModel();
		catalogsGroupsReqParam.getRequestModel().setCatalogName(model.getNodeId()); // カタログ名←nodeId

		var catalogsGroupsReqBody = new PostCatalogsGroupsProductGroupRequestBodyModel();
		catalogsGroupsReqBody.setRequestModel(new CatalogsCommonProductGroupModel());
		var groupName = model.getNodeId().subSequence(0, 15) + model.getProductClassificationNumber().toString() + model.getProductId();
		catalogsGroupsReqBody.getRequestModel().setName(groupName);
		catalogsGroupsReqBody.getRequestModel().setCatalogName(model.getNodeId());
		catalogsGroupsReqBody.getRequestModel().getChangePlan().setDeleted(true); // 直前のレスポンスからDeletedのみfalse⇒trueに変える
		catalogsGroupsReqBody.getRequestModel().getChangePlan().setName(changePlanRes.getResponseModel().getName());

		var catalogsGroupsRes = catalogsService.postCatalogsGroupsProductGroup(catalogsGroupsReqParam,
				catalogsGroupsReqBody, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (catalogsGroupsRes.getResult().getWSO2Token() != null
				&& catalogsGroupsRes.getResult().getELERAToken() != null) {
			accessToken = catalogsGroupsRes.getResult().getWSO2Token();
			ELERAToken = catalogsGroupsRes.getResult().getELERAToken();
		}

		if (catalogsGroupsRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = catalogsGroupsRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					catalogsGroupsRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// 実行計画をPendingに変更
		changePlanReq = new PostChangePlanRequestModel();
		changePlanReq.setVersion(changePlanRes.getResponseModel().getVersion());
		changePlanReq.setName(changePlanRes.getResponseModel().getName());
		changePlanReq.setStatus("Pending");
		changePlanRes = changePlanService.postChangePlan(changePlanReq, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// トークン情報の上書き
		if (changePlanRes.getResult().getWSO2Token() != null
				&& changePlanRes.getResult().getELERAToken() != null) {
			accessToken = changePlanRes.getResult().getWSO2Token();
			ELERAToken = changePlanRes.getResult().getELERAToken();
		}

		if (changePlanRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = changePlanRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(changePlanRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// 実行計画を実行
		var changePlanExecuteRes = changePlanService.postChangePlanExecute(
				changePlanRes.getResponseModel().getName(), messageSource, apiContext, accessToken,
				ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		if (changePlanExecuteRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = changePlanExecuteRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(changePlanExecuteRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// セッションのトークン情報の上書き
		if (changePlanExecuteRes.getResult().getWSO2Token() != null
				&& changePlanExecuteRes.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(changePlanExecuteRes.getResult().getWSO2Token());
			loginUser.setELERAToken(changePlanExecuteRes.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		// 正常で返却
		responseModel.getResult().setCode(Integer.valueOf(0));
		return responseModel;
	}

	/**
	 * 商品構成マスタリンク階層取得処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @param response HttpServletのレスポンス
	 * @return 商品マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/hierarchy")
	@ResponseBody
	public GetProductGroupHierarchyResponseModel productGroupHierarchy(
			@Validated GetProductGroupHierarchyRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {
		var responseModel = new GetProductGroupHierarchyResponseModel();
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

		// 商品構成マスタリンク階層取得
		var requestModel = new GetCatalogsGroupsHierarchyRequestModel();
		var catalogName = model.getCatalogName();
		requestModel.getRequestModel().setGroupName(model.getGroupName());
		requestModel.getRequestModel().setLevel(model.getLevel());
		var res = catalogsService.getCatalogsGroupsHierarchy( requestModel, catalogName, messageSource, apiContext, accessToken,
				ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		if (res.getResult().getCode() != 0) {
			// 失敗
			int intcode = res.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(res.getResult().getErrorMessageMap());
		}else {
			// 正常で返却0
			responseModel.getResult().setCode(Integer.valueOf(0));
			responseModel.setResponseModel(res.getResponseModel());
		}
		return responseModel;
	}

}
