package com.ttss.prementenance.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

import com.ttss.prementenance.model.CatalogsCommonAllowableTimeOfSaleModel;
import com.ttss.prementenance.model.CatalogsCommonPaymentRestrictionsModel;
import com.ttss.prementenance.model.CatalogsCommonPaymentTypeModel;
import com.ttss.prementenance.model.CommonValueOrderModel;
import com.ttss.prementenance.model.ConfigurationsPriceExtendsDetailModel;
import com.ttss.prementenance.model.GetCatalogsCatalogNameItemsItemIdRequestModel;
import com.ttss.prementenance.model.GetCatalogsCatalogNameItemsRequestModel;
import com.ttss.prementenance.model.GetConfigurationsMetadataGroupRequestModel;
import com.ttss.prementenance.model.GetConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.GetItemsResponseModel;
import com.ttss.prementenance.model.GetPaymentResponseModel;
import com.ttss.prementenance.model.GetPricelistsItemsRequestModel;
import com.ttss.prementenance.model.GetPricelistsNodeNodeIdItemsSkuIdRequestModel;
import com.ttss.prementenance.model.GetProductMasterProductQueryRequestModel;
import com.ttss.prementenance.model.GetProductMasterProductQueryResponseModel;
import com.ttss.prementenance.model.GetProductMasterProductSearchRequestModel;
import com.ttss.prementenance.model.GetProductMasterProductSearchResponseModel;
import com.ttss.prementenance.model.GetTaxRatesResponseModel;
import com.ttss.prementenance.model.PostCatalogsCatalogNameItemsItemIdRequestModel;
import com.ttss.prementenance.model.PostCatalogsCatalogNameItemsRequestBodyModel;
import com.ttss.prementenance.model.PostCatalogsCatalogNameItemsRequestParamModel;
import com.ttss.prementenance.model.PostChangePlanRequestModel;
import com.ttss.prementenance.model.PostChangePlanResponseModel;
import com.ttss.prementenance.model.PostPricelistsPriceListNameItemRequestModel;
import com.ttss.prementenance.model.PostPricelistsRecordPriceListRecordIdRequestParamModel;
import com.ttss.prementenance.model.PostProductMasterProductDeleteRequestModel;
import com.ttss.prementenance.model.PostProductMasterProductDeleteResponseModel;
import com.ttss.prementenance.model.PostProductMasterProductRegistCsvRequestModel;
import com.ttss.prementenance.model.PostProductMasterProductRegistRequestModel;
import com.ttss.prementenance.model.PostProductMasterProductRegistRequestModel.GroupKanjiOrder;
import com.ttss.prementenance.model.PostProductMasterProductRegistResponseModel;
import com.ttss.prementenance.model.PricelistsRecordCommonModel;
import com.ttss.prementenance.model.ProductMasterProductResponseModel;
import com.ttss.prementenance.service.CatalogsService;
import com.ttss.prementenance.service.ChangePlanService;
import com.ttss.prementenance.service.ConfigurationsService;
import com.ttss.prementenance.service.PricelistsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
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
 * 20221227  bai.ry(Neusoft)  G001.00.0  issue課題#1295を対応します.
 * 20221229  bai.ry(Neusoft)  G002.00.0  issue課題#699を対応します.
 * 20230103  bai.ry(Neusoft)  G003.00.0  issue課題#1343を対応します.
 * 20230131  bai.ry(Neusoft)  G004.00.0  issue課題#1143を対応します.
 * 20230307  bai.ry(Neusoft)  G005.00.0  issue課題#1677を対応します.
 * 20230725  qinshh(Neusoft)  G006.00.0  issue課題#903を対応します.
 */
@RestController
@RequestMapping("ProductMaster")
public class ProductMasterController {
	private final static int ITEMLISTLIMIT = 51;

	@Autowired
	private ConfigurationsService configurationsService;

	@Autowired
	private ChangePlanService changePlanService;

	@Autowired
	private CatalogsService catalogsService;

	@Autowired
	private PricelistsService pricelistsService;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	private SessionUtil sessionUtil;

	@Autowired
	public ProductMasterController() {
	}

	/**
	 * 商品マスタ検索処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 商品マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/ProductQuery")
	@ResponseBody
	public GetProductMasterProductQueryResponseModel productQuery(
			@Validated GetProductMasterProductQueryRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new GetProductMasterProductQueryResponseModel();
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

		// 商品マスタ検索
		// ストア設定取得
		var nodeId = model.getNodeId();
		var configurationsNodesNodeIdReq = new GetConfigurationsNodesNodeIdRequestModel();
		var configurationsNodesNodeIdRes = configurationsService.getNodesNodeId(
				configurationsNodesNodeIdReq, nodeId, messageSource, apiContext, accessToken,
				ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
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

		// 取得できないケースは０件として取り扱う
		// List<CommonValueOrderModel>
		List<CommonValueOrderModel> catalogLists;
		if (configurationsNodesNodeIdRes.getResponseModel().getConfigurations() == null) {
			// なし
			catalogLists = new ArrayList<CommonValueOrderModel>();
		} else if (configurationsNodesNodeIdRes.getResponseModel().getConfigurations()
				.getCATALOG() == null) {
			// なし
			catalogLists = new ArrayList<CommonValueOrderModel>();
		} else if (configurationsNodesNodeIdRes.getResponseModel().getConfigurations().getCATALOG()
				.getValue() == null) {
			// なし
			catalogLists = new ArrayList<CommonValueOrderModel>();
		} else {
			catalogLists = configurationsNodesNodeIdRes.getResponseModel().getConfigurations()
					.getCATALOG().getValue();
		}
		// 取得できないケースは０件として取り扱う
		// List<ConfigurationsPriceExtendsDetailModel>
		List<ConfigurationsPriceExtendsDetailModel> priceLists;

		if (configurationsNodesNodeIdRes.getResponseModel().getConfigurations() == null) {
			// なし
			priceLists = new ArrayList<ConfigurationsPriceExtendsDetailModel>();
		} else if (configurationsNodesNodeIdRes.getResponseModel().getConfigurations()
				.getPRICE_LISTS() == null) {
			// なし
			priceLists = new ArrayList<ConfigurationsPriceExtendsDetailModel>();
		} else if (configurationsNodesNodeIdRes.getResponseModel().getConfigurations()
				.getPRICE_LISTS().getValue() == null) {
			// なし
			priceLists = new ArrayList<ConfigurationsPriceExtendsDetailModel>();
		} else if (configurationsNodesNodeIdRes.getResponseModel().getConfigurations()
				.getPRICE_LISTS().getValue().getList() == null) {
			// なし
			priceLists = new ArrayList<ConfigurationsPriceExtendsDetailModel>();
		} else {
			priceLists = configurationsNodesNodeIdRes.getResponseModel().getConfigurations()
					.getPRICE_LISTS().getValue().getList();
		}

		// skuId紐づけ用
		var itemHash = new HashMap<String, ProductMasterProductResponseModel>();
		responseModel.setResponseModel(new ArrayList<ProductMasterProductResponseModel>());

		// カタログ分取得
		for (int i = 0; i < catalogLists.size(); i++) {
			// カタログアイテム一覧取得
			var catalogsReq = new GetCatalogsCatalogNameItemsRequestModel();
			catalogsReq.getRequestModel().setSparse(true);
			catalogsReq.getRequestModel().setFilter("FALLTHROUGH");
			catalogsReq.getRequestModel().setAscending(true);
			catalogsReq.getRequestModel().setStartIndex(Long.valueOf(0));
			catalogsReq.getRequestModel().setBatchSize(Long.valueOf(0));
			var catalogName = catalogLists.get(i).getValue();
			var catalogsRes = catalogsService.getCatalogsCatalogNameItems(catalogsReq, catalogName,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// トークン情報の上書き
			if (catalogsRes.getResult().getWSO2Token() != null
					&& catalogsRes.getResult().getELERAToken() != null) {
				accessToken = catalogsRes.getResult().getWSO2Token();
				ELERAToken = catalogsRes.getResult().getELERAToken();
			}

			if (catalogsRes.getResult().getCode() == 2) {
				// データ無しは飛ばして次へ
				continue;
			} else if (catalogsRes.getResult().getCode() != 0) {
				// 失敗
				int intcode = catalogsRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(catalogsRes.getResult().getErrorMessageMap());
				return responseModel;
			}
			// アイテムをまとめておく
			for (int j = 0; j < catalogsRes.getResponseModel().size(); j++) {

				var resModel = new ProductMasterProductResponseModel();
				resModel.setCatalogs(catalogsRes.getResponseModel().get(j));
				resModel.setSkuId(catalogsRes.getResponseModel().get(j).getSkuId());

				responseModel.getResponseModel().add(resModel);

				// skuId検索用マップ
				itemHash.put(catalogsRes.getResponseModel().get(j).getSkuId(), resModel);
			}
		}

		for (int i = 0; i < priceLists.size(); i++) {
			// pricelist商品一覧取得
			var pricelistsReq = new GetPricelistsItemsRequestModel();
			pricelistsReq.getRequestModel().setPriceListName(priceLists.get(i).getPriceListName());
			// G005.00.0 Add -Start
			pricelistsReq.getRequestModel().setBatchSize(0L);
			// G005.00.0 Add -End
			var pricelistsRes = pricelistsService.getPricelistsItems(pricelistsReq, messageSource,
					apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// トークン情報の上書き
			if (pricelistsRes.getResult().getWSO2Token() != null
					&& pricelistsRes.getResult().getELERAToken() != null) {
				accessToken = pricelistsRes.getResult().getWSO2Token();
				ELERAToken = pricelistsRes.getResult().getELERAToken();
			}

			if (pricelistsRes.getResult().getCode() == 2) {
				// データ無しは飛ばして次へ
				continue;
			} else if (pricelistsRes.getResult().getCode() != 0) {
				// 失敗
				int intcode = pricelistsRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(pricelistsRes.getResult().getErrorMessageMap());
				return responseModel;
			}
			// アイテムをまとめておく
			for (int j = 0; j < pricelistsRes.getResponseModel().size(); j++) {
				var resModel = itemHash.get(pricelistsRes.getResponseModel().get(j).getSkuId());
				if (resModel == null) {
					// カタログがないものは取り扱わない
					// resModel = new ProductMasterProductResponseModel();
					// resModel.setPricelists(pricelistsRes.getResponseModel().get(j));
					// resModel.setSkuId(pricelistsRes.getResponseModel().get(j).getSkuId());
					//
					// responseModel.getResponseModel().add(resModel);
					//
					// // skuId検索用マップ
					// itemHash.put(pricelistsRes.getResponseModel().get(j).getSkuId(), resModel);
					continue;
				} else {
					resModel.setPricelists(pricelistsRes.getResponseModel().get(j));
				}
			}
		}

		if (responseModel.getResponseModel().size() == 0) {
			// データ無し
			responseModel.getResult().setCode(Integer.valueOf(2));

		} else {
			// 正常で返却0
			responseModel.getResult().setCode(Integer.valueOf(0));
		}

		// セッションのトークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null
				&& responseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(accessToken);
			loginUser.setELERAToken(ELERAToken);
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		return responseModel;
	}
	//G002.00.0 Add-Start
	/**
	 * 商品マスタ検索処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 商品マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/ProductQuery/limit")
	@ResponseBody
	public GetItemsResponseModel productQueryLimit(
			@Validated GetProductMasterProductQueryRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {
		var responseModel = new GetItemsResponseModel();
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

		// 商品マスタ検索
		var nodeId = model.getNodeId();
		var res = configurationsService.queryItemsLimit( nodeId, messageSource, apiContext, accessToken,
				ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord(),model.getItemListLimit(),model.getSearchParams());
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
	// G002.00.0 Add-End


	/**
	 * 商品マスタ取得処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 商品マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/ProductSearch")
	@ResponseBody
	public GetProductMasterProductSearchResponseModel productSearch(
			@Validated GetProductMasterProductSearchRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new GetProductMasterProductSearchResponseModel();

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
		var catalogsReq = new GetCatalogsCatalogNameItemsItemIdRequestModel();
		var catalogName = model.getNodeId();
		var itemId = model.getItemId();

		var catalogRes = catalogsService.getCatalogsCatalogNameItemsItemId(catalogsReq, catalogName,
				itemId, messageSource, apiContext, accessToken, ELERAToken,
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
			responseModel.getResponseModel().setSkuId(catalogRes.getResponseModel().getSkuId());
			responseModel.getResponseModel().setCatalogs(catalogRes.getResponseModel());
		}

		// 店舗価格情報取得
		var pricelistReqParam = new GetPricelistsNodeNodeIdItemsSkuIdRequestModel();
		var nodeId = model.getNodeId();
		var skuId = model.getItemId();
		var pricelistsRes = pricelistsService.getPricelistsNodeNodeIdItemsSkuIdList(pricelistReqParam,
				nodeId, skuId, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		var pricelistsResList = pricelistsService.getPricelistsNodeNodeIdItemsSkuIdList(pricelistReqParam,
				nodeId, skuId, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		if (pricelistsRes.getResult().getCode() == 2) {
			// 何もしない
			responseModel.getResponseModel().setPricelists(new PricelistsRecordCommonModel());
			if (catalogRes.getResponseModel() != null
					&& catalogRes.getResponseModel().getAllowableTimeOfSale() != null) {
				pricelistsRes.getResponseModel()
						.setStartDate(catalogRes.getResponseModel().getAllowableTimeOfSale().getStartDate());
				pricelistsRes.getResponseModel()
						.setEndDate(catalogRes.getResponseModel().getAllowableTimeOfSale().getEndDate());
			}
			responseModel.getResponseModel().setSkuId(pricelistsRes.getResponseModel().getSkuId());
			responseModel.getResponseModel().setPricelists(pricelistsRes.getResponseModel());
		} else if (pricelistsRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = pricelistsRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(pricelistsRes.getResult().getErrorMessageMap());
			return responseModel;
		} else {

			// startDateとendDateを上書き
			//			if (pricelistsResList.getResponseModel().getStartDate() != null) {
			//				pricelistsRes.getResponseModel().setStartDate(pricelistsResList.getResponseModel().getStartDate());
			//			}
			//			if (pricelistsResList.getResponseModel().getEndDate() != null) {
			//				pricelistsRes.getResponseModel().setEndDate(pricelistsResList.getResponseModel().getEndDate());
			//			}
			if (catalogRes.getResponseModel() != null
					&& catalogRes.getResponseModel().getAllowableTimeOfSale() != null) {
				pricelistsRes.getResponseModel()
						.setStartDate(catalogRes.getResponseModel().getAllowableTimeOfSale().getStartDate());
				pricelistsRes.getResponseModel()
						.setEndDate(catalogRes.getResponseModel().getAllowableTimeOfSale().getEndDate());
			}
			responseModel.getResponseModel().setSkuId(pricelistsRes.getResponseModel().getSkuId());
			responseModel.getResponseModel().setPricelists(pricelistsRes.getResponseModel());
		}

		// セッションのトークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null
				&& responseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(pricelistsRes.getResult().getWSO2Token());
			loginUser.setELERAToken(pricelistsRes.getResult().getELERAToken());
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
	 * 商品マスタ更新処理.
	 *
	 * @param reqBodyModel リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 商品マスタ更新＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/ProductRegist")
	@ResponseBody
	public PostProductMasterProductRegistResponseModel productRegist(
			@RequestBody @Validated({ Default.class,
					GroupKanjiOrder.class }) PostProductMasterProductRegistRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PostProductMasterProductRegistResponseModel();
		// バリデーションエラー発生フラグ
		boolean isValiderr = false;
		// バリデーションエラー発生フラグ（販売開始日、販売終了日）
		boolean isDateValiderr = false;
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
			isValiderr = true;
		}

		// 日付チェック
		// 販売開始日
		if (!isDate(model.getStartDate())) {
			isDateValiderr = true;
			map.add("startDate", messageResourseUtil.getMessage("VALIDA.DATE_CHECK", null));
		}
		// 販売終了日
		if (!isDate(model.getEndDate())) {
			isDateValiderr = true;
			map.add("endDate", messageResourseUtil.getMessage("VALIDA.DATE_CHECK", null));
		}

		// AS #1479
		// 開始日、終了日を日付変換する
		Date startDate = new Date();
		Date endDate = new Date();
		SimpleDateFormat sFormat = new SimpleDateFormat("yyyy/MM/dd");
		// 開始日
		try {
			startDate = sFormat.parse(model.getStartDate());
		} catch (ParseException e1) {
			// TODO 自動生成された catch ブロック
			isDateValiderr = true;
			map.add("endDate", messageResourseUtil.getMessage("VALIDA.DATE_CHECK", null));
		}
		// 終了日
		try {
			endDate = sFormat.parse(model.getEndDate());
		} catch (ParseException e1) {
			// TODO 自動生成された catch ブロック
			isDateValiderr = true;
			map.add("endDate", messageResourseUtil.getMessage("VALIDA.DATE_CHECK", null));
		}
		// AE #1479
		
		// 販売開始日と終了日の相関チェック
		// CS #1479
		//if (isDate(model.getStartDate())) {
		//	if (isDate(model.getEndDate())) {
		//		if (model.getStartDate().compareTo(model.getEndDate()) > 0) {
		//			isDateValiderr = true;
		//			map.add("endDate", messageResourseUtil.getMessage("VALIDA.DATE_DIFF_CHECK", null));
		//		}
		//	}
		//}
		if (startDate.compareTo(endDate) > 0) {
					isDateValiderr = true;
					map.add("endDate", messageResourseUtil.getMessage("VALIDA.DATE_DIFF_CHECK", null));
		}
		// CE #1479

		// バリデーションチェックの結果エラーがあればレスポンス作成
		if (isValiderr) {
			// 通常のバリデーションエラー発生時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			if (isDateValiderr) {
				responseModel.getResult().addErrorMessageMap(map);
			}
		} else {
			responseModel.setResult(ApiUtil.createValidationErrorModelfromMap(map));
		}

		if (isValiderr || isDateValiderr) {
			// バリデーションエラー
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

		// catalogに登録
		var catalogReqParam = new PostCatalogsCatalogNameItemsRequestParamModel();
// KSD V001.000 20230921 DS
//		catalogReqParam.getRequestModel().setCatalogGroup(loginUser.getBusinessUnitCdStr()); // カタロググループは企業コード
// KSD V001.000 20230921 DE
// KSD V001.000 20230925 AS
		//「groupName:企業コード（15桁）+商品階層No（1桁）+リンクコード」をセット
		catalogReqParam.getRequestModel().setCatalogGroup(model.getLinkCode());
// KSD V001.000 20230925 AE

		var catalogReqBody = new PostCatalogsCatalogNameItemsRequestBodyModel();
		catalogReqBody.getRequestModel().getChangePlan()
				.setName(changePlanRes.getResponseModel().getName()); // 実行計画名
		catalogReqBody.getRequestModel().setCatalogName(model.getNodeId()); // カタログ名はnodeId
// KSD V001.000 20230925 DS
//		catalogReqBody.getRequestModel().setGroupName(loginUser.getBusinessUnitCdStr()); // カタロググループは企業コード
// KSD V001.000 20230925 DE
// KSD V001.000 20230925 AS
		//「groupName:企業コード（15桁）+商品階層No（1桁）+リンクコード」をセット
		catalogReqBody.getRequestModel().setGroupName(model.getLinkCode());
// KSD V001.000 20230925 AE
		
		catalogReqBody.getRequestModel().setSkuId(model.getItemId()); // skuidはバーコードに合わせておく
		catalogReqBody.getRequestModel().setProductId(model.getItemId()); // バーコード
		catalogReqBody.getRequestModel().getDisplayName().setKanji(model.getKanji()); // 漢字名称
		catalogReqBody.getRequestModel().getDisplayName().setKana(model.getKana()); // カナ名称
		catalogReqBody.getRequestModel().getDisplayName().setReceipt(model.getReceipt()); // レシート印字名称
		catalogReqBody.getRequestModel().getDisplayName().setDefaultValue(model.getKanji()); // 漢字名称
		//		// レシート印字区分がレシート印字名称の場合(レシート印字名称を「kanji」にセット)
		//		if (model.getReceiptPrintType() == 2) {
		//			catalogReqBody.getRequestModel().getDisplayName().setKanji(model.getReceipt()); // レシート印字名称
		//		}
		// レシート印字区分が漢字名称の場合(レシート印字名称に漢字名称をセット)
		if (model.getReceiptPrintType() == 1) {
			catalogReqBody.getRequestModel().getDisplayName().setReceipt(model.getKanji()); // レシート印字名称
		}
		if (catalogReqBody.getRequestModel().getPaymentRestrictions() == null) {
			catalogReqBody.getRequestModel()
					.setPaymentRestrictions(new CatalogsCommonPaymentRestrictionsModel());
		}
		if (catalogReqBody.getRequestModel().getPaymentRestrictions()
				.getPaymentTypeExclusions() == null) {
			catalogReqBody.getRequestModel().getPaymentRestrictions()
					.setPaymentTypeExclusions(new ArrayList<CatalogsCommonPaymentTypeModel>());
		}
		//DS #1577
		//CatalogsCommonPaymentTypeModel paymentTypeModel = new CatalogsCommonPaymentTypeModel();
		//paymentTypeModel.setPaymentType(model.getPaymentType());
		//DE #1577
		catalogReqBody.getRequestModel().getPaymentRestrictions().getPaymentTypeExclusions()
				.clear();
		//AS #1577
		for (String paymentType : model.getPaymentType())
		{
			CatalogsCommonPaymentTypeModel paymentTypeModel = new CatalogsCommonPaymentTypeModel();
			paymentTypeModel.setPaymentType(paymentType);
		catalogReqBody.getRequestModel().getPaymentRestrictions().getPaymentTypeExclusions()
				.add(paymentTypeModel);
		}
		//AE #1577

		// 区分系
		// レシート印字区分(true:漢字名称 false:レシート名称)
		if (model.getReceiptPrintType() != null) {
			if (model.getReceiptPrintType() == 1) {
				catalogReqBody.getRequestModel()
						.setReceiptPrint(true);
			} else {
				catalogReqBody.getRequestModel()
						.setReceiptPrint(false);
			}
		}
		// 商品区分
		if (model.getProductType() != null) {
			catalogReqBody.getRequestModel().setProductClassification(model.getProductType());
		}
		if (model.getPricedownType() == 1) {
			catalogReqBody.getRequestModel().setDiscountable(true);
		} else if (model.getPricedownType() == 2) {
			catalogReqBody.getRequestModel().setDiscountable(false);
		}
		// G003.00.0 Update-Start
		if (model.getPriceChangeType() == 1) {
//			catalogReqBody.getRequestModel().setPriceOverrideAllowed(true);
			catalogReqBody.getRequestModel().setPriceChangeOperation(true);
		} else if (model.getPriceChangeType() == 2) {
//			catalogReqBody.getRequestModel().setPriceOverrideAllowed(false);
			catalogReqBody.getRequestModel().setPriceChangeOperation(false);
		}
		// G003.00.0 Update-End
		if (model.getDiscountParType() == 1) {
			catalogReqBody.getRequestModel().setSubTotalDiscountable(true);
		} else if (model.getDiscountParType() == 2) {
			catalogReqBody.getRequestModel().setSubTotalDiscountable(false);
		}
		if (model.getPriceRequiredType() == 1) {
			catalogReqBody.getRequestModel().setPriceRequired(true);
		} else if (model.getPriceRequiredType() == 2) {
			catalogReqBody.getRequestModel().setPriceRequired(false);
		}
		if (model.getSellStopType() == 1) {
			catalogReqBody.getRequestModel().setNotForSale(true);
		} else if (model.getSellStopType() == 2) {
			catalogReqBody.getRequestModel().setNotForSale(false);
		}
		catalogReqBody.getRequestModel().setDutyFreeClassification(model.getDutyFreeType());
		// 年齢確認
		if (model.getAgeToBuy() == 20) {
			catalogReqBody.getRequestModel().setAgeToBuy(20);
		} else if (model.getAgeToBuy() == 2) {
			//catalogReqBody.getRequestModel().setAgeToBuy(null);
		}

		// 年月
		if (model.getStartDate() != null) {
			if (catalogReqBody.getRequestModel().getAllowableTimeOfSale() == null) {
				CatalogsCommonAllowableTimeOfSaleModel timeModel = new CatalogsCommonAllowableTimeOfSaleModel();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
				sdf.setLenient(false);
				Date dt;
				try {
					dt = sdf.parse(model.getStartDate());
					Calendar cal = Calendar.getInstance();
					cal.setTime(dt);
					// G001.00.0 Update-Start
//					cal.add(Calendar.DATE, -1);
					cal.add(Calendar.DATE, -0);
					// G001.00.0 Update -End
					model.setStartDate(sdf.format(cal.getTime()));
				} catch (ParseException e) {
					e.printStackTrace();
				}
				// G001.00.0 Update-Start
				timeModel.setStartDate(convDateFormat(model.getStartDate()) + "T00:00:00.000Z");
				if (model.getEndDate() != null) {
					timeModel.setEndDate(convDateFormat(model.getEndDate()) + "T23:59:59.999Z");
				}
				// G001.00.0 Update -End
				catalogReqBody.getRequestModel().setAllowableTimeOfSale(timeModel);
			} else {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
				sdf.setLenient(false);
				Date dt;
				try {
					dt = sdf.parse(model.getStartDate());
					Calendar cal = Calendar.getInstance();
					cal.setTime(dt);
					// G001.00.0 Update-Start
//					cal.add(Calendar.DATE, -1);
					cal.add(Calendar.DATE, -0);
					// G001.00.0 Update-End
					model.setStartDate(sdf.format(cal.getTime()));
				} catch (ParseException e) {
					e.printStackTrace();
				}
				// G001.00.0 Update-Start
				catalogReqBody.getRequestModel().getAllowableTimeOfSale()
						.setStartDate(model.getStartDate() + "T00:00:00.000Z");
				if (model.getEndDate() != null) {
					catalogReqBody.getRequestModel().getAllowableTimeOfSale()
							.setEndDate(model.getEndDate() + "T23:59:59.999Z");
				}
				// G001.00.0 Update -End
			}
		}

		// POS売上税区分
		if (model.getTaxCode() != null) {
			List<String> productTaxCodes = new ArrayList<String>();
// KSD V001.000 20231017 AS model.getTaxCode():"9" -> "TAX9"
			if (model.getTaxCode().equals("TAX1")) {
				productTaxCodes.add("TAX1");
			}
			if (model.getTaxCode().equals("TAX2")) {
				productTaxCodes.add("TAX2");
			}
			if (model.getTaxCode().equals("TAX3")) {
				productTaxCodes.add("TAX3");
			}
			if (model.getTaxCode().equals("TAX4")) {
				productTaxCodes.add("TAX4");
			}
			if (model.getTaxCode().equals("TAX5")) {
				productTaxCodes.add("TAX5");
			}
// KSD V001.000 20230921 AS
			if (model.getTaxCode().equals("TAX6")) {
				productTaxCodes.add("TAX6");
			}
			if (model.getTaxCode().equals("TAX7")) {
				productTaxCodes.add("TAX7");
			}
			if (model.getTaxCode().equals("TAX8")) {
				productTaxCodes.add("TAX8");
			}
			if (model.getTaxCode().equals("TAX9")) {
				productTaxCodes.add("TAX9");
			}
			if (model.getTaxCode().equals("TAX10")) {
				productTaxCodes.add("TAX10");
			}
// KSD V001.000 20230921 AE
// KSD V001.000 20231017 AE model.getTaxCode():"9" -> "TAX9"
			catalogReqBody.getRequestModel().setProductTaxCodes(productTaxCodes); // POS売上税区分
		}

		catalogReqBody.getRequestModel().setDescription(null);

		var catalogName = model.getNodeId();

		var catalogRes = catalogsService.postCatalogsCatalogNameItems(catalogReqParam,
				catalogReqBody, catalogName, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (catalogRes.getResult().getWSO2Token() != null
				&& catalogRes.getResult().getELERAToken() != null) {
			accessToken = catalogRes.getResult().getWSO2Token();
			ELERAToken = catalogRes.getResult().getELERAToken();
		}

		if (catalogRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = catalogRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(catalogRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		if (model.getMode() != 1) {
			// 更新
			// pricelistレコード更新
			var pricelistsRecordPriceListRecordIdParamReq = new PostPricelistsRecordPriceListRecordIdRequestParamModel();
			pricelistsRecordPriceListRecordIdParamReq.getRequestModel()
					.setChangePlanName(changePlanRes.getResponseModel().getName());

			var priceListRecordPriceListRecordIdBodyReq = new PostPricelistsPriceListNameItemRequestModel();
			if (model.getSellPrice() != null) {
				priceListRecordPriceListRecordIdBodyReq.getRequestModel()
						.setPrice(model.getSellPrice());
			} else {
				priceListRecordPriceListRecordIdBodyReq.getRequestModel().setPrice(0);
			}
			priceListRecordPriceListRecordIdBodyReq.getRequestModel().setUnitPrice(model.getCost());
			priceListRecordPriceListRecordIdBodyReq.getRequestModel()
					.setManufacturerPrice(model.getManufacturerPrice());

			//			priceListRecordPriceListRecordIdBodyReq.getRequestModel()
			//					.setStartDate(convDateFormat(model.getStartDate()) + "T00:00:00Z"); // 販売開始日
			//			priceListRecordPriceListRecordIdBodyReq.getRequestModel()
			//					.setEndDate(convDateFormat(model.getEndDate()) + "T00:00:00Z"); // 販売終了日
			// 固定の日付で更新する
			priceListRecordPriceListRecordIdBodyReq.getRequestModel()
					.setStartDate(convDateFormat("2022-01-01T00:00:00.000Z")); // 販売開始日
			priceListRecordPriceListRecordIdBodyReq.getRequestModel()
					.setEndDate(convDateFormat("2999-12-31T23:59:59.999Z")); // 販売終了日
			priceListRecordPriceListRecordIdBodyReq.getRequestModel().setSkuId(model.getItemId());
			priceListRecordPriceListRecordIdBodyReq.getRequestModel()
					.setPriceList(model.getNodeId());
			priceListRecordPriceListRecordIdBodyReq.getRequestModel().getChangePlan()
					.setName(changePlanRes.getResponseModel().getName()); // 実行計画名
			priceListRecordPriceListRecordIdBodyReq.getRequestModel().getChangePlan().setDeleted(false);
			priceListRecordPriceListRecordIdBodyReq.getRequestModel().setActive(true);
			// G004.00.0 Update -Start
			priceListRecordPriceListRecordIdBodyReq.getRequestModel().setId(model.getPriceId());

			var pricelistsRecordPriceListRecordIdRes = pricelistsService.updatePricelistsPriceListNameItem(
					priceListRecordPriceListRecordIdBodyReq,
					priceListRecordPriceListRecordIdBodyReq.getRequestModel().getPriceList(), messageSource,
					apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());
			//var pricelistsRecordPriceListRecordIdRes = pricelistsService.postPricelistsPriceListNameItem(
			//		priceListRecordPriceListRecordIdBodyReq,
			//		priceListRecordPriceListRecordIdBodyReq.getRequestModel().getPriceList(), messageSource,
			//		apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
			//		loginUser.getPassWord());
            // G004.00.0 Update -End

			//			var priceRecordId = model.getPricelistRecordId();
			//			var pricelistsRecordPriceListRecordIdRes = pricelistsService.postPricelistsRecordPriceListRecordId(
			//					pricelistsRecordPriceListRecordIdParamReq,
			//					priceListRecordPriceListRecordIdBodyReq, priceRecordId, messageSource,
			//					apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
			//					loginUser.getPassWord());

			// トークン情報の上書き
			if (pricelistsRecordPriceListRecordIdRes.getResult().getWSO2Token() != null
					&& pricelistsRecordPriceListRecordIdRes.getResult().getELERAToken() != null) {
				accessToken = pricelistsRecordPriceListRecordIdRes.getResult().getWSO2Token();
				ELERAToken = pricelistsRecordPriceListRecordIdRes.getResult().getELERAToken();
			}

			if (pricelistsRecordPriceListRecordIdRes.getResult().getCode() != 0) {
				// 失敗
				int intcode = pricelistsRecordPriceListRecordIdRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult().setErrorMessageMap(
						pricelistsRecordPriceListRecordIdRes.getResult().getErrorMessageMap());
				return responseModel;
			}

		} else {
			// 新規
			// pricelistsに登録
			var pricelistsReq = new PostPricelistsPriceListNameItemRequestModel();
			pricelistsReq.getRequestModel().getChangePlan()
					.setName(changePlanRes.getResponseModel().getName()); // 実行計画名
			pricelistsReq.getRequestModel().getChangePlan().setDeleted(false);
			pricelistsReq.getRequestModel().setSkuId(model.getItemId());
			if (model.getSellPrice() != null) {
				pricelistsReq.getRequestModel().setPrice(model.getSellPrice());
			} else {
				pricelistsReq.getRequestModel().setPrice(0);
			}
			pricelistsReq.getRequestModel().setUnitPrice(model.getCost());
			pricelistsReq.getRequestModel().setManufacturerPrice(model.getManufacturerPrice());
			//			pricelistsReq.getRequestModel()
			//					.setStartDate(convDateFormat(model.getStartDate()) + "T00:00:00Z"); // 販売開始日
			//			pricelistsReq.getRequestModel()
			//					.setEndDate(convDateFormat(model.getEndDate()) + "T00:00:00Z"); // 販売終了日
			// 固定の日付で更新する
			pricelistsReq.getRequestModel()
					.setStartDate(convDateFormat("2022-01-01T00:00:00.000Z")); // 販売開始日
			pricelistsReq.getRequestModel()
					.setEndDate(convDateFormat("2999-12-31T23:59:59.999Z")); // 販売終了日
			pricelistsReq.getRequestModel().setPriceList(model.getNodeId());

			var priceListName = model.getNodeId();
			var priceListRes = pricelistsService.postPricelistsPriceListNameItem(pricelistsReq,
					priceListName, messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			// トークン情報の上書き
			if (priceListRes.getResult().getWSO2Token() != null
					&& priceListRes.getResult().getELERAToken() != null) {
				accessToken = priceListRes.getResult().getWSO2Token();
				ELERAToken = priceListRes.getResult().getELERAToken();
			}

			if (priceListRes.getResult().getCode() != 0) {
				// 失敗
				int intcode = priceListRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(priceListRes.getResult().getErrorMessageMap());
				return responseModel;
			}
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
	 * 商品マスタ削除処理.
	 *
	 * @param reqBodyModel リクエスト内容DeleteDevicesResponseModel
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 商品マスタ削除＋αレスポンス
	 */
	@CrossOrigin
	@DeleteMapping("/ProductDeleted")
	public PostProductMasterProductDeleteResponseModel productDeleted(
			@RequestBody PostProductMasterProductDeleteRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PostProductMasterProductDeleteResponseModel();

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

		// カタログアアイテム追加
		var catalogsCatalogNameItemsItemIdReq = new PostCatalogsCatalogNameItemsItemIdRequestModel();
		catalogsCatalogNameItemsItemIdReq.getRequestModel().setGroupName(model.getNodeId());
		catalogsCatalogNameItemsItemIdReq.getRequestModel()
				.setChangePlanName(changePlanRes.getResponseModel().getName());

		var catalogName = model.getNodeId();
		var itemId = model.getItemId();
		var catalogsCatalogNameItemsItemIdRes = catalogsService.postCatalogsCatalogNameItemsItemId(
				catalogsCatalogNameItemsItemIdReq, catalogName, itemId, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// トークン情報の上書き
		if (catalogsCatalogNameItemsItemIdRes.getResult().getWSO2Token() != null
				&& catalogsCatalogNameItemsItemIdRes.getResult().getELERAToken() != null) {
			accessToken = catalogsCatalogNameItemsItemIdRes.getResult().getWSO2Token();
			ELERAToken = catalogsCatalogNameItemsItemIdRes.getResult().getELERAToken();
		}

		if (catalogsCatalogNameItemsItemIdRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = catalogsCatalogNameItemsItemIdRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					catalogsCatalogNameItemsItemIdRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// カタログアイテム登録
		var catalogsCatalogNameItemsParamReq = new PostCatalogsCatalogNameItemsRequestParamModel();
		catalogsCatalogNameItemsParamReq.getRequestModel()
				.setCatalogGroup(loginUser.getBusinessUnitCdStr());
// KSD V001.000 20230925 AS
		//「groupName:企業コード（15桁）+商品階層No（1桁）+リンクコード」をセット
		catalogsCatalogNameItemsParamReq.getRequestModel().setCatalogGroup(model.getLinkCode());
// KSD V001.000 20230925 AE

		var catalogsCatalogNameItemsBodyReq = new PostCatalogsCatalogNameItemsRequestBodyModel();
		catalogsCatalogNameItemsBodyReq
				.setRequestModel(catalogsCatalogNameItemsItemIdRes.getResponseModel());
		catalogsCatalogNameItemsBodyReq.getRequestModel().getChangePlan().setDeleted(true); // 直前のレスポンスからDeletedのみfalse⇒trueに変える

		var catalogsCatalogNameItemsRes = catalogsService.postCatalogsCatalogNameItems(catalogsCatalogNameItemsParamReq,
				catalogsCatalogNameItemsBodyReq, catalogName, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// トークン情報の上書き
		if (catalogsCatalogNameItemsRes.getResult().getWSO2Token() != null
				&& catalogsCatalogNameItemsRes.getResult().getELERAToken() != null) {
			accessToken = catalogsCatalogNameItemsRes.getResult().getWSO2Token();
			ELERAToken = catalogsCatalogNameItemsRes.getResult().getELERAToken();
		}

		if (catalogsCatalogNameItemsRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = catalogsCatalogNameItemsRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					catalogsCatalogNameItemsRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// pricelistレコード更新
		var pricelistsRecordPriceListRecordIdParamReq = new PostPricelistsRecordPriceListRecordIdRequestParamModel();
		pricelistsRecordPriceListRecordIdParamReq.getRequestModel()
				.setChangePlanName(changePlanRes.getResponseModel().getName());

		var priceListRecordPriceListRecordIdBodyReq = new PostPricelistsPriceListNameItemRequestModel();
		priceListRecordPriceListRecordIdBodyReq.getRequestModel().setPrice(0);
		priceListRecordPriceListRecordIdBodyReq.getRequestModel().setSkuId(model.getItemId());
		priceListRecordPriceListRecordIdBodyReq.getRequestModel().setPriceList(model.getNodeId());

		//		priceListRecordPriceListRecordIdBodyReq.getRequestModel().setChangePlan(null);
		//
		//		var priceRecordId = model.getPricelistRecordId();
		//		var pricelistsRecordPriceListRecordIdRes = pricelistsService
		//				.postPricelistsRecordPriceListRecordId(pricelistsRecordPriceListRecordIdParamReq,
		//						priceListRecordPriceListRecordIdBodyReq, priceRecordId, messageSource,
		//						apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
		//						loginUser.getPassWord());

		priceListRecordPriceListRecordIdBodyReq.getRequestModel().getChangePlan()
				.setName(changePlanRes.getResponseModel().getName()); // 実行計画名
		// G004.00.0 Update -Start
		priceListRecordPriceListRecordIdBodyReq.getRequestModel().setId(model.getPricelistRecordId());
		var pricelistsRecordPriceListRecordIdRes = pricelistsService.updatePricelistsPriceListNameItem(
				priceListRecordPriceListRecordIdBodyReq,
				priceListRecordPriceListRecordIdBodyReq.getRequestModel().getPriceList(), messageSource,
				apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());
		//var pricelistsRecordPriceListRecordIdRes = pricelistsService.postPricelistsPriceListNameItem(
		//		priceListRecordPriceListRecordIdBodyReq,
		//		priceListRecordPriceListRecordIdBodyReq.getRequestModel().getPriceList(), messageSource,
		//		apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
		//		loginUser.getPassWord());
        // G004.00.0 Update -Start
		// トークン情報の上書き
		if (pricelistsRecordPriceListRecordIdRes.getResult().getWSO2Token() != null
				&& pricelistsRecordPriceListRecordIdRes.getResult().getELERAToken() != null) {
			accessToken = pricelistsRecordPriceListRecordIdRes.getResult().getWSO2Token();
			ELERAToken = pricelistsRecordPriceListRecordIdRes.getResult().getELERAToken();
		}

		if (pricelistsRecordPriceListRecordIdRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = pricelistsRecordPriceListRecordIdRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					pricelistsRecordPriceListRecordIdRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// pricelist商品追加
		var pricelistsPriceListNameItemReq = new PostPricelistsPriceListNameItemRequestModel();
		pricelistsPriceListNameItemReq
				.setRequestModel(pricelistsRecordPriceListRecordIdRes.getResponseModel());
		pricelistsPriceListNameItemReq.getRequestModel().getChangePlan().setDeleted(true); // 直前のレスポンスからDeletedのみfalse⇒trueに変える

		var priceListName = model.getNodeId();
		var pricelistsPriceListNameItemRes = pricelistsService.postPricelistsPriceListNameItem(
				pricelistsPriceListNameItemReq, priceListName, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// トークン情報の上書き
		if (pricelistsPriceListNameItemRes.getResult().getWSO2Token() != null
				&& pricelistsPriceListNameItemRes.getResult().getELERAToken() != null) {
			accessToken = pricelistsPriceListNameItemRes.getResult().getWSO2Token();
			ELERAToken = pricelistsPriceListNameItemRes.getResult().getELERAToken();
		}

		if (pricelistsPriceListNameItemRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = pricelistsPriceListNameItemRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					pricelistsPriceListNameItemRes.getResult().getErrorMessageMap());
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
	 * 税率一覧の取得.
	 *
	 * <br>
	 *
	 * 本来は tax マイクロサービスから取得するが API が未実装なので, STEP0 では仮措置として nodes configurations から読み取る.
	 *
	 * @see https://tccloud2.toshiba.co.jp/tec/gitlab/soshinkai-ngp/cloud-pos/application/smartphone-pos-cloudpos/-/issues/160
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 税率一覧＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/TaxRates")
	@ResponseBody
	public GetTaxRatesResponseModel taxRates(
			@Validated GetProductMasterProductQueryRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {
		var responseModel = new GetTaxRatesResponseModel();

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

		// 店舗情報を取得
		var nodeId = model.getNodeId();
		var configurationsNodesNodeIdReq = new GetConfigurationsNodesNodeIdRequestModel();
		var configurationsNodesNodeIdRes = configurationsService.getNodesNodeId(
				configurationsNodesNodeIdReq, nodeId, messageSource, apiContext, accessToken,
				ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
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

		// 税率の読み取り
		responseModel.setResponseModel(configurationsNodesNodeIdRes.getResponseModel()
				.getConfigurations().getOFFLINE_TAX_RATES().getValue());

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
	 * 税率一覧の取得.
	 *
	 * <br>
	 *
	 * 本来は tax マイクロサービスから取得するが API が未実装なので, STEP0 では仮措置として nodes configurations から読み取る.
	 *
	 * @see https://tccloud2.toshiba.co.jp/tec/gitlab/soshinkai-ngp/cloud-pos/application/smartphone-pos-cloudpos/-/issues/160
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 税率一覧＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/Payments")
	@ResponseBody
	public GetPaymentResponseModel payments(
			@Validated GetConfigurationsMetadataGroupRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {
		var responseModel = new GetPaymentResponseModel();

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

		// 店舗情報を取得
		var nodeId = model.getNodeId();

		// 決済種別リスト
		var metadataReq = new GetConfigurationsMetadataGroupRequestModel();
		GetPaymentResponseModel metaResponse = configurationsService.getMetadataGroup(metadataReq,
				"", messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord(), nodeId);
		if (metaResponse.getResult().getCode() == 0) {
			// G006.00.0 Add-Start
			Map<String, Object> tempMap = new TreeMap<>();
			for(String key : metaResponse.getResponseModel().getConfigurations().keySet()) {
				Pattern pattern = Pattern.compile("PAYMENT_[0-9]{2}");
				Matcher matcher = pattern.matcher(key);
				if(matcher.find()) {
					Object object = metaResponse.getResponseModel().getConfigurations().get(key);
					tempMap.put(key, object);
				}
			}
			metaResponse.getResponseModel().setConfigurations(tempMap);
			// G006.00.0 Add-End
			responseModel.setResponseModel(metaResponse.getResponseModel());
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

		// 正常
		responseModel.getResult().setCode(Integer.valueOf(0));
		return responseModel;
	}

	/**
	 * 商品マスタ更新処理.
	 *
	 * @param reqBodyModel リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 商品マスタ更新＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/Csv")
	@ResponseBody
	public PostProductMasterProductRegistResponseModel productCsv(
			@RequestBody @Validated({ Default.class,
					GroupKanjiOrder.class }) PostProductMasterProductRegistCsvRequestModel postModel,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PostProductMasterProductRegistResponseModel();
		// バリデーションエラー発生フラグ
		boolean isValiderr = false;
		// バリデーションエラー発生フラグ（販売開始日、販売終了日）
		boolean isDateValiderr = false;
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
			isValiderr = true;
		}

		// データ数分ループ
		//AS #1577
		long index = 0;
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		PostChangePlanResponseModel changePlanRestemp = null;
		//AE #1577
		for (PostProductMasterProductRegistRequestModel model : postModel.getProductDataList()) {

			// 日付チェック
			//			// 販売開始日
			//			if (!isDate(model.getStartDate())) {
			//				isDateValiderr = true;
			//				map.add("startDate", messageResourseUtil.getMessage("VALIDA.DATE_CHECK", null));
			//			}
			//			// 販売終了日
			//			if (!isDate(model.getEndDate())) {
			//				isDateValiderr = true;
			//				map.add("endDate", messageResourseUtil.getMessage("VALIDA.DATE_CHECK", null));
			//			}
			//
			//			// 販売開始日と終了日の相関チェック
			//			if (isDate(model.getStartDate())) {
			//				if (isDate(model.getEndDate())) {
			//					if (model.getStartDate().compareTo(model.getEndDate()) > 0) {
			//						isDateValiderr = true;
			//						map.add("endDate", messageResourseUtil.getMessage("VALIDA.DATE_DIFF_CHECK", null));
			//					}
			//				}
			//			}
			//
			//			// バリデーションチェックの結果エラーがあればレスポンス作成
			//			if (isValiderr) {
			//				// 通常のバリデーションエラー発生時
			//				responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			//				if (isDateValiderr) {
			//					responseModel.getResult().addErrorMessageMap(map);
			//				}
			//			} else {
			//				responseModel.setResult(ApiUtil.createValidationErrorModelfromMap(map));
			//			}
			//
			//			if (isValiderr || isDateValiderr) {
			//				// バリデーションエラー
			//				return responseModel;
			//			}

			//DS #1577
			//String accessToken = loginUser.getWso2ApiToken();
			//String ELERAToken = loginUser.getELERAToken();
			//DE #1577

			// カタログ取得
			var catalogsReq1 = new GetCatalogsCatalogNameItemsItemIdRequestModel();
			var catalogName1 = model.getNodeId();
			var itemId1 = model.getItemId();

			var catalogRes1 = catalogsService.getCatalogsCatalogNameItemsItemId(catalogsReq1, catalogName1,
					itemId1, messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// トークン情報の上書き
			if (catalogRes1.getResult().getWSO2Token() != null
					&& catalogRes1.getResult().getELERAToken() != null) {
				accessToken = catalogRes1.getResult().getWSO2Token();
				ELERAToken = catalogRes1.getResult().getELERAToken();
			}
			String priceId = "";
			// データが無ければ新規
			if (catalogRes1.getResult().getCode() == 2) {
				//model.setMode(0);
				model.setMode(1);
			}else {
				model.setMode(2);
				var pricelistReqParam = new GetPricelistsNodeNodeIdItemsSkuIdRequestModel();
				var pricelistsRes = pricelistsService.getPricelistsNodeNodeIdItemsSkuIdList(pricelistReqParam,
						catalogName1, itemId1, messageSource, apiContext, accessToken, ELERAToken,
						loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

				if (pricelistsRes.getResult().getCode() == 0) {
					priceId = pricelistsRes.getResponseModel().getId();
				}
			}


			// 実行計画を作成
			var changePlanReq = new PostChangePlanRequestModel();
			// 新規の場合は企業コード＋店舗コード＋ユーザーID＋タイムスタンプ
			SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
			String timeStamp = date.format(new Date());
			var changePlanName = model.getNodeId() + loginUser.getUserId() + timeStamp;
			changePlanReq.setName(changePlanName);
			// draftで作成
			changePlanReq.setStatus("Draft");
			//AS #1577
			if (index == 0l) {
			//AE #1577
			var changePlanRes = changePlanService.postChangePlan(changePlanReq, messageSource, apiContext,
					accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

				//AS #1577
				changePlanRestemp = changePlanRes;
				//AE #1577
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
			//AS #1577
			}
			//AE #1577
			// catalogに登録
			var catalogReqParam = new PostCatalogsCatalogNameItemsRequestParamModel();
			catalogReqParam.getRequestModel().setCatalogGroup(loginUser.getBusinessUnitCdStr()); // カタロググループは企業コード
			var catalogReqBody = new PostCatalogsCatalogNameItemsRequestBodyModel();
			//CS #1577
			//catalogReqBody.getRequestModel().getChangePlan()
			//		.setName(changePlanRes.getResponseModel().getName()); // 実行計画名
			catalogReqBody.getRequestModel().getChangePlan()
					.setName(changePlanRestemp.getResponseModel().getName()); // 実行計画名
			//CE #1577
			catalogReqBody.getRequestModel().setCatalogName(model.getNodeId()); // カタログ名はnodeId
			catalogReqBody.getRequestModel().setGroupName(loginUser.getBusinessUnitCdStr()); // カタロググループは企業コード
			catalogReqBody.getRequestModel().setSkuId(model.getItemId()); // skuidはバーコードに合わせておく
			catalogReqBody.getRequestModel().setProductId(model.getItemId()); // バーコード
			catalogReqBody.getRequestModel().getDisplayName().setKanji(model.getKanji()); // 漢字名称
			catalogReqBody.getRequestModel().getDisplayName().setKana(model.getKana()); // カナ名称
			catalogReqBody.getRequestModel().getDisplayName().setReceipt(model.getReceipt()); // レシート印字名称
			catalogReqBody.getRequestModel().getDisplayName().setDefaultValue(model.getKanji()); // 漢字名称
			//		// レシート印字区分がレシート印字名称の場合(レシート印字名称を「kanji」にセット)
			//		if (model.getReceiptPrintType() == 2) {
			//			catalogReqBody.getRequestModel().getDisplayName().setKanji(model.getReceipt()); // レシート印字名称
			//		}
			// レシート印字区分が漢字名称の場合(レシート印字名称に漢字名称をセット)
			if (model.getReceiptPrintType() == 1) {
				catalogReqBody.getRequestModel().getDisplayName().setReceipt(model.getKanji()); // レシート印字名称
			}
			if (catalogReqBody.getRequestModel().getPaymentRestrictions() == null) {
				catalogReqBody.getRequestModel()
						.setPaymentRestrictions(new CatalogsCommonPaymentRestrictionsModel());
			}
			if (catalogReqBody.getRequestModel().getPaymentRestrictions()
					.getPaymentTypeExclusions() == null) {
				catalogReqBody.getRequestModel().getPaymentRestrictions()
						.setPaymentTypeExclusions(new ArrayList<CatalogsCommonPaymentTypeModel>());
			}
			//DS #1577
			//CatalogsCommonPaymentTypeModel paymentTypeModel = new CatalogsCommonPaymentTypeModel();
			//paymentTypeModel.setPaymentType(model.getPaymentType());
			//DE #1577
			catalogReqBody.getRequestModel().getPaymentRestrictions().getPaymentTypeExclusions()
					.clear();
			//AS #1577
			for (String paymentType : model.getPaymentType())
			{
				CatalogsCommonPaymentTypeModel paymentTypeModel = new CatalogsCommonPaymentTypeModel();
				paymentTypeModel.setPaymentType(paymentType);
			catalogReqBody.getRequestModel().getPaymentRestrictions().getPaymentTypeExclusions()
					.add(paymentTypeModel);
			}
			//AE #1577
			// 区分系
			// レシート印字区分(true:漢字名称 false:レシート名称)
			if (model.getReceiptPrintType() != null && model.getReceiptPrintType() != null) {
				if (model.getReceiptPrintType() == 1) {
					catalogReqBody.getRequestModel()
							.setReceiptPrint(true);
				} else {
					catalogReqBody.getRequestModel()
							.setReceiptPrint(false);
				}
			}
			if (model.getProductType() != null && model.getProductType() != null) {
				catalogReqBody.getRequestModel().setProductClassification(model.getProductType());
			} // 商品区分
			if (model.getPricedownType() != null && model.getPricedownType() == 1) {
				catalogReqBody.getRequestModel().setDiscountable(true);
			} else if (model.getPricedownType() != null && model.getPricedownType() == 2) {
				catalogReqBody.getRequestModel().setDiscountable(false);
			}
			// G003.00.0 Update-Start
			if (model.getPriceChangeType() != null && model.getPriceChangeType() == 1) {
//				catalogReqBody.getRequestModel().setPriceOverrideAllowed(true);
				catalogReqBody.getRequestModel().setPriceChangeOperation(true);
			} else if (model.getPriceChangeType() != null && model.getPriceChangeType() == 2) {
//				catalogReqBody.getRequestModel().setPriceOverrideAllowed(false);
				catalogReqBody.getRequestModel().setPriceChangeOperation(false);
			}
			// G003.00.0 Update-End
			if (model.getDiscountParType() != null && model.getDiscountParType() == 1) {
				catalogReqBody.getRequestModel().setSubTotalDiscountable(true);
			} else if (model.getDiscountParType() != null && model.getDiscountParType() == 2) {
				catalogReqBody.getRequestModel().setSubTotalDiscountable(false);
			}
			if (model.getPriceRequiredType() != null && model.getPriceRequiredType() == 1) {
				catalogReqBody.getRequestModel().setPriceRequired(true);
			} else if (model.getPriceRequiredType() != null && model.getPriceRequiredType() == 2) {
				catalogReqBody.getRequestModel().setPriceRequired(false);
			}
			if (model.getSellStopType() != null && model.getSellStopType() == 1) {
				catalogReqBody.getRequestModel().setNotForSale(true);
			} else if (model.getSellStopType() != null && model.getSellStopType() == 2) {
				catalogReqBody.getRequestModel().setNotForSale(false);
			}
			catalogReqBody.getRequestModel().setDutyFreeClassification(model.getDutyFreeType());
			// 年齢確認
			if (model.getAgeToBuy() != null && model.getAgeToBuy() == 20) {
				catalogReqBody.getRequestModel().setAgeToBuy(20);
			} else if (model.getAgeToBuy() != null && model.getAgeToBuy() == 2) {
				//catalogReqBody.getRequestModel().setAgeToBuy(null);
			}

			// 販売開始日/終了日
			if (model.getStartDate() != null) {
				if (catalogReqBody.getRequestModel().getAllowableTimeOfSale() == null) {
					CatalogsCommonAllowableTimeOfSaleModel timeModel = new CatalogsCommonAllowableTimeOfSaleModel();
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
					sdf.setLenient(false);
					Date dt;
					try {
						dt = sdf.parse(model.getStartDate());
						Calendar cal = Calendar.getInstance();
						cal.setTime(dt);
						cal.add(Calendar.DATE, -0);
						model.setStartDate(sdf.format(cal.getTime()));
					} catch (ParseException e) {
						e.printStackTrace();
					}
					timeModel.setStartDate(convDateFormat(model.getStartDate()) + "T00:00:00.000Z");
					if (model.getEndDate() != null) {
						timeModel.setEndDate(convDateFormat(model.getEndDate()) + "T23:59:59.999Z");
					}
					catalogReqBody.getRequestModel().setAllowableTimeOfSale(timeModel);
				} else {
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
					sdf.setLenient(false);
					Date dt;
					try {
						dt = sdf.parse(model.getStartDate());
						Calendar cal = Calendar.getInstance();
						cal.setTime(dt);
						cal.add(Calendar.DATE, -0);
						model.setStartDate(sdf.format(cal.getTime()));
					} catch (ParseException e) {
						e.printStackTrace();
					}
					catalogReqBody.getRequestModel().getAllowableTimeOfSale()
							.setStartDate(model.getStartDate() + "T00:00:00.000Z");
					if (model.getEndDate() != null) {
						catalogReqBody.getRequestModel().getAllowableTimeOfSale()
								.setEndDate(model.getEndDate() + "T23:59:59.999Z");
					}
				}
			}

			// POS売上税区分
			catalogReqBody.getRequestModel().setProductTaxCodes(model.getProductTaxCodes());
			//if (model.getTaxCode() != null) {
			//	List<String> productTaxCodes = new ArrayList<String>();
			//	if (model.getTaxCode().equals("1")) {
			//		productTaxCodes.add("TAX1");
			//	}
			//	if (model.getTaxCode().equals("2")) {
			//		productTaxCodes.add("TAX2");
			//	}
			//	if (model.getTaxCode().equals("3")) {
			//		productTaxCodes.add("TAX3");
			//	}
			//	if (model.getTaxCode().equals("4")) {
			//		productTaxCodes.add("TAX4");
			//	}
			//	if (model.getTaxCode().equals("5")) {
			//		productTaxCodes.add("TAX5");
			//	}
			//	catalogReqBody.getRequestModel().setProductTaxCodes(productTaxCodes); // POS売上税区分
			//}

			// 不要分はnullで塗りつぶしておく
			catalogReqBody.getRequestModel().setDescription(null);

			var catalogName = model.getNodeId();
			var catalogRes = catalogsService.postCatalogsCatalogNameItems(catalogReqParam,
					catalogReqBody, catalogName, messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			// トークン情報の上書き
			if (catalogRes.getResult().getWSO2Token() != null
					&& catalogRes.getResult().getELERAToken() != null) {
				accessToken = catalogRes.getResult().getWSO2Token();
				ELERAToken = catalogRes.getResult().getELERAToken();
			}

			if (catalogRes.getResult().getCode() != 0) {
				// 失敗
				int intcode = catalogRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(catalogRes.getResult().getErrorMessageMap());
				return responseModel;
			}

			if (model.getMode() != 1) {
				// 更新
				// pricelistレコード更新
				var pricelistsRecordPriceListRecordIdParamReq = new PostPricelistsRecordPriceListRecordIdRequestParamModel();
				//CS #1577
				//pricelistsRecordPriceListRecordIdParamReq.getRequestModel()
				//		.setChangePlanName(changePlanRes.getResponseModel().getName());
				pricelistsRecordPriceListRecordIdParamReq.getRequestModel()
						.setChangePlanName(changePlanRestemp.getResponseModel().getName());
				//CE #1577

				var priceListRecordPriceListRecordIdBodyReq = new PostPricelistsPriceListNameItemRequestModel();
				if (model.getSellPrice() != null) {
					priceListRecordPriceListRecordIdBodyReq.getRequestModel()
							.setPrice(model.getSellPrice());
				} else {
					priceListRecordPriceListRecordIdBodyReq.getRequestModel().setPrice(0);
				}
				priceListRecordPriceListRecordIdBodyReq.getRequestModel().setUnitPrice(model.getCost());
				priceListRecordPriceListRecordIdBodyReq.getRequestModel()
						.setManufacturerPrice(model.getManufacturerPrice());
				priceListRecordPriceListRecordIdBodyReq.getRequestModel()
						.setStartDate(convDateFormat("2022-01-01T00:00:00.000Z")); // 販売開始日
				priceListRecordPriceListRecordIdBodyReq.getRequestModel()
						.setEndDate(convDateFormat("2999-12-31T23:59:59.999Z")); // 販売終了日
				priceListRecordPriceListRecordIdBodyReq.getRequestModel().setSkuId(model.getItemId());
				priceListRecordPriceListRecordIdBodyReq.getRequestModel()
						.setPriceList(model.getNodeId());
				priceListRecordPriceListRecordIdBodyReq.getRequestModel().getChangePlan()
						.setName(changePlanRestemp.getResponseModel().getName()); // 実行計画名
				priceListRecordPriceListRecordIdBodyReq.getRequestModel().getChangePlan().setDeleted(false);
				priceListRecordPriceListRecordIdBodyReq.getRequestModel().setActive(true);

				priceListRecordPriceListRecordIdBodyReq.getRequestModel().setId(priceId);
				var pricelistsRecordPriceListRecordIdRes = pricelistsService.updatePricelistsPriceListNameItem(
						priceListRecordPriceListRecordIdBodyReq,
						priceListRecordPriceListRecordIdBodyReq.getRequestModel().getPriceList(), messageSource,
						apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
						loginUser.getPassWord());

				// トークン情報の上書き
				if (pricelistsRecordPriceListRecordIdRes.getResult().getWSO2Token() != null
						&& pricelistsRecordPriceListRecordIdRes.getResult().getELERAToken() != null) {
					accessToken = pricelistsRecordPriceListRecordIdRes.getResult().getWSO2Token();
					ELERAToken = pricelistsRecordPriceListRecordIdRes.getResult().getELERAToken();
				}

				if (pricelistsRecordPriceListRecordIdRes.getResult().getCode() != 0) {
					// 失敗
					int intcode = pricelistsRecordPriceListRecordIdRes.getResult().getCode().intValue();
					responseModel.getResult().setCode(Integer.valueOf(intcode));
					responseModel.getResult().setErrorMessageMap(
							pricelistsRecordPriceListRecordIdRes.getResult().getErrorMessageMap());
					return responseModel;
				}

			} else {
				// 新規
				// pricelistsに登録
				var pricelistsReq = new PostPricelistsPriceListNameItemRequestModel();
				//CS #1577
				//pricelistsReq.getRequestModel().getChangePlan()
				//		.setName(changePlanRes.getResponseModel().getName()); // 実行計画名
				pricelistsReq.getRequestModel().getChangePlan()
						.setName(changePlanRestemp.getResponseModel().getName()); // 実行計画名
				//CE #1577
				pricelistsReq.getRequestModel().getChangePlan().setDeleted(false);
				pricelistsReq.getRequestModel().setSkuId(model.getItemId());
				if (model.getSellPrice() != null) {
					pricelistsReq.getRequestModel().setPrice(model.getSellPrice());
				} else {
					pricelistsReq.getRequestModel().setPrice(0);
				}
				pricelistsReq.getRequestModel().setUnitPrice(model.getCost());
				pricelistsReq.getRequestModel().setManufacturerPrice(model.getManufacturerPrice());
				//				pricelistsReq.getRequestModel()
				//						.setStartDate(convDateFormat(model.getStartDate()) + "T00:00:00Z"); // 販売開始日
				//				pricelistsReq.getRequestModel()
				//						.setEndDate(convDateFormat(model.getEndDate()) + "T00:00:00Z");
				// 固定の日付で更新する
				pricelistsReq.getRequestModel()
						.setStartDate(convDateFormat("2022-01-01T00:00:00.000Z")); // 販売開始日
				pricelistsReq.getRequestModel()
						//.setEndDate(convDateFormat("2999-12-31T23:59:59.999Z")); // 販売終了日				pricelistsReq.getRequestModel().setPriceList(model.getNodeId());
						.setEndDate(convDateFormat("2999-12-31T23:59:59.999Z")); // 販売終了日
				pricelistsReq.getRequestModel().setPriceList(model.getNodeId());

				var priceListName = model.getNodeId();
				var priceListRes = pricelistsService.postPricelistsPriceListNameItem(pricelistsReq,
						priceListName, messageSource, apiContext, accessToken, ELERAToken,
						loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

				// トークン情報の上書き
				if (priceListRes.getResult().getWSO2Token() != null
						&& priceListRes.getResult().getELERAToken() != null) {
					accessToken = priceListRes.getResult().getWSO2Token();
					ELERAToken = priceListRes.getResult().getELERAToken();
				}

				if (priceListRes.getResult().getCode() != 0) {
					// 失敗
					int intcode = priceListRes.getResult().getCode().intValue();
					responseModel.getResult().setCode(Integer.valueOf(intcode));
					responseModel.getResult()
							.setErrorMessageMap(priceListRes.getResult().getErrorMessageMap());
					return responseModel;
				}
			}
			//AS #1577
			index++;
			//AE #1577

			//DS #1577
			/*
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
			*/
			//DE #1577
		}
		//AS #1577
		// 実行計画をPendingに変更
		var changePlanReq = new PostChangePlanRequestModel();
		changePlanReq.setVersion(changePlanRestemp.getResponseModel().getVersion());
		changePlanReq.setName(changePlanRestemp.getResponseModel().getName());
		changePlanReq.setStatus("Pending");
		changePlanRestemp = changePlanService.postChangePlan(changePlanReq, messageSource, apiContext,
			accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
			loginUser.getPassWord());
		// トークン情報の上書き
		if (changePlanRestemp.getResult().getWSO2Token() != null
				&& changePlanRestemp.getResult().getELERAToken() != null) {
			accessToken = changePlanRestemp.getResult().getWSO2Token();
			ELERAToken = changePlanRestemp.getResult().getELERAToken();
		}

		if (changePlanRestemp.getResult().getCode() != 0) {
			// 失敗
			int intcode = changePlanRestemp.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(changePlanRestemp.getResult().getErrorMessageMap());
			return responseModel;
		}
		// 実行計画を実行
		var changePlanExecuteRes = changePlanService.postChangePlanExecute(
				changePlanRestemp.getResponseModel().getName(), messageSource, apiContext, accessToken,
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
		//AE #1577

		// 正常で返却
		responseModel.getResult().setCode(Integer.valueOf(0));
		return responseModel;
	}

	/**
	 * 日付チェック.
	 *
	 * @param value 検証対象の値
	 * @return 結果（true：日付、false：日付ではない）
	 */
	private static boolean isDate(String str) {
		try {
			// 指定無しの場合はOKとする
			//			if (str == null || str.equals("")) {
			//				return true;
			//			}

			SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
			sdf.setLenient(false);
			sdf.parse(str);

			return true;
		} catch (Exception ex) {
			return false;
		}
	}

	/**
	 * フォーマット変換処理.
	 *
	 * @param value 販売日(開始/終了)
	 * @return 結果（yyyy-MM-dd）
	 */
	private static String convDateFormat(String str) {
		try {
			// 「YYYY/MM/DD(文字列)」を日付型に変更
			SimpleDateFormat sdfFrom = new SimpleDateFormat("yyyy/MM/dd");
			Date date = sdfFrom.parse(str);
			// Date型を「yyyy-MM-dd」に変換
			SimpleDateFormat sdfTo = new SimpleDateFormat("yyyy-MM-dd");
			var recDate = sdfTo.format(date);

			return recDate;
		} catch (Exception ex) {
			return str;
		}
	}

}
