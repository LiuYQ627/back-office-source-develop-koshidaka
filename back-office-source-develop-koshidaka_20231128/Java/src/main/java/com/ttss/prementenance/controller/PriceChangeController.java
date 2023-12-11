package com.ttss.prementenance.controller;

import com.ttss.prementenance.model.CatalogsCommonModel;
import com.ttss.prementenance.model.ConfigurationsPriceExtendsDetailModel;
import com.ttss.prementenance.model.DeletePriceChangePriceChangeDeleteRequestModel;
import com.ttss.prementenance.model.DeletePriceChangePriceChangeDeleteResponseModel;
import com.ttss.prementenance.model.DeletePriceChangeProductDeleteRequestModel;
import com.ttss.prementenance.model.DeletePriceChangeProductDeleteResponseModel;
import com.ttss.prementenance.model.GetCatalogsCatalogNameItemsItemIdRequestModel;
import com.ttss.prementenance.model.GetCatalogsCatalogNameItemsRequestModel;
import com.ttss.prementenance.model.GetPriceChangePriceChangeQueryRequestModel;
import com.ttss.prementenance.model.GetPriceChangePriceChangeQueryResponseModel;
import com.ttss.prementenance.model.GetPriceChangePriceChangeSearchRequestModel;
import com.ttss.prementenance.model.GetPriceChangePriceChangeSearchResponseModel;
import com.ttss.prementenance.model.GetPriceChangePriceChangeSelectRequestModel;
import com.ttss.prementenance.model.GetPriceChangePriceChangeSelectResponseModel;
import com.ttss.prementenance.model.GetPriceChangeProductSearchRequestModel;
import com.ttss.prementenance.model.GetPriceChangeProductSearchResponseModel;
import com.ttss.prementenance.model.GetPricelistsItemsRequestModel;
import com.ttss.prementenance.model.GetPricelistsPriceListNameItemRequestModel;
import com.ttss.prementenance.model.GetPricelistsRequestModel;
import com.ttss.prementenance.model.PostChangePlanRequestModel;
import com.ttss.prementenance.model.PostConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestBodyModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestParamModel;
import com.ttss.prementenance.model.PostPricelistsPriceListNameItemRequestModel;
import com.ttss.prementenance.model.PostPricelistsPriceListNameRequestModel;
import com.ttss.prementenance.model.PostPricelistsPriceListNameRequestParamModel;
import com.ttss.prementenance.model.PostPricelistsRecordPriceListRecordIdRequestBodyModel;
import com.ttss.prementenance.model.PostPricelistsRecordPriceListRecordIdRequestParamModel;
import com.ttss.prementenance.model.PostPricelistsRequestModel;
import com.ttss.prementenance.model.PriceChangeProductResponseModel;
import com.ttss.prementenance.model.PricelistsCommonModel;
import com.ttss.prementenance.model.PricelistsRecordCommonModel;
import com.ttss.prementenance.model.PutPriceChangePriceChangeClearRequestModel;
import com.ttss.prementenance.model.PutPriceChangePriceChangeClearResponseModel;
import com.ttss.prementenance.model.PutPriceChangePriceChangeDateSetRequestModel;
import com.ttss.prementenance.model.PutPriceChangePriceChangeDateSetResponseModel;
import com.ttss.prementenance.model.PutPriceChangePriceChangeNameSetRequestModel;
import com.ttss.prementenance.model.PutPriceChangePriceChangeNameSetResponseModel;
import com.ttss.prementenance.model.PutPriceChangePriceChangeSaveRequestModel;
import com.ttss.prementenance.model.PutPriceChangePriceChangeSaveResponseModel;
import com.ttss.prementenance.model.PutPriceChangeProductPriceChangeRequestModel;
import com.ttss.prementenance.model.PutPriceChangeProductPriceChangeResponseModel;
import com.ttss.prementenance.service.CatalogsService;
import com.ttss.prementenance.service.ChangePlanService;
import com.ttss.prementenance.service.ConfigurationsService;
import com.ttss.prementenance.service.PricelistsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
import com.ttss.prementenance.utils.SessionUtil;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

/**
* 売価変更画面&API.
*
* @author
* @version 1.0.0
*/
@RestController
@RequestMapping("PriceChange")
public class PriceChangeController {

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
	public PriceChangeController() {
	}

	/**
	 * 売価変更No取得処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 売価変更No情報＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/PriceChangeSearch")
	@ResponseBody
	public GetPriceChangePriceChangeSearchResponseModel priceChangeSearch(
			@Validated GetPriceChangePriceChangeSearchRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		// バリデーションエラー発生フラグ
		boolean isValiderr = false;
		// バリデーションエラー発生フラグ
		boolean isNumValiderr = false;
		// バリデーションエラーメッセージで使用
		MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
		// ValidationMessages.property からメッセージを持ってくるための記述
		ReloadableResourceBundleMessageSource validationMessageSource = new ReloadableResourceBundleMessageSource();
		validationMessageSource.setBasename("classpath:/ValidationMessages");
		validationMessageSource.setDefaultEncoding("UTF-8");
		MessageSourceUtil messageResourseUtil = new MessageSourceUtil(messageSource);

		var responseModel = new GetPriceChangePriceChangeSearchResponseModel();
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			isValiderr = true;
		}

		// 店舗コードが同じものを配列化
		// 売価変更Noは10桁
		var nowNo = Long.valueOf(0);
		try {
			nowNo = Long.parseLong(model.getPriceChangeNo());
		} catch (Exception ex) {
			// 変換エラーはないはず
		}
		// 0～999999999以外はエラー
		if (Long.compare(nowNo, Long.valueOf(0)) < 0 || Long.compare(Long.parseLong("9999999999"), nowNo) < 0) {
			isNumValiderr = true;
			map.add("priceChangeNo",
					messageResourseUtil.getMessage("VALIDA.NUMSIZE", new String[] { "1", "9999999999" }));
		}

		// バリデーションチェックの結果エラーがあればレスポンス作成
		if (isValiderr) {
			// 通常のバリデーションエラー発生時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			if (isNumValiderr) {
				responseModel.getResult().addErrorMessageMap(map);
			}
		} else {
			responseModel.setResult(ApiUtil.createValidationErrorModelfromMap(map));
		}

		if (isValiderr || isNumValiderr) {
			// バリデーションエラー
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// 売価変更No取得
		// pricelist一覧取得
		var getPricelistsReq = new GetPricelistsRequestModel();
		// changePlanがないpricelist一覧を取得
		getPricelistsReq.getRequestModel().setFilter("FALLTHROUGH");
		var getPricelistsRes = pricelistsService.getPricelists(
				getPricelistsReq,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (getPricelistsRes.getResult().getWSO2Token() != null
				&& getPricelistsRes.getResult().getELERAToken() != null) {
			accessToken = getPricelistsRes.getResult().getWSO2Token();
			ELERAToken = getPricelistsRes.getResult().getELERAToken();
		}

		if (getPricelistsRes.getResult().getCode() == 2) {
			// 取得無し
			// 空で作成しておく
			getPricelistsRes.setResponseModel(new ArrayList<PricelistsCommonModel>());
		} else if (getPricelistsRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = getPricelistsRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(getPricelistsRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// 一致する売価変更Noを取得
		PricelistsCommonModel nowPricelists = null;
		for (int i = 0; i < getPricelistsRes.getResponseModel().size(); i++) {
			var priceChangeNo = getPricelistsRes.getResponseModel().get(i).getName();
			// 一致店舗コード分を使用
			if (priceChangeNo.indexOf(model.getNodeId()) == 0) {
				if (priceChangeNo.length() != 31) {
					// 売価変更Noなし
					continue;
				} else {
					var noStr = priceChangeNo.substring(21);
					var noLong = Long.valueOf(0);
					try {
						noLong = Long.parseLong(noStr);
					} catch (Exception ex) {
						// 変換エラーは０とする
					}
					// nowNoはフロントからの売価変更番号
					if (nowNo.equals(noLong)) {
						nowPricelists = getPricelistsRes.getResponseModel().get(i);
						break;
					}
				}
			}
		}
		// 10桁（文字列）
		var newNo = String.format("%010d", nowNo);

		if (nowPricelists == null) {
			// 売価変更なし⇒新規と同様とする
			// 実行計画を作成
			var changePlanReq = new PostChangePlanRequestModel();
			// 新規の場合は企業コード＋店舗コード＋ユーザーID＋タイムスタンプ
			SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
			String timeStamp = date.format(new Date());
			var changePlanName = model.getNodeId() + loginUser.getUserId() + timeStamp;
			changePlanReq.setName(changePlanName);
			// draftで作成
			changePlanReq.setStatus("Draft");
			var changePlanRes = changePlanService.postChangePlan(
					changePlanReq,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

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

			// pricelist追加
			var postPriceListsReq = new PostPricelistsRequestModel();
			postPriceListsReq.getRequestModel().getChangePlan().setDeleted(false);
			postPriceListsReq.getRequestModel().getChangePlan()
					.setReferenceVersion(changePlanRes.getResponseModel().getVersion());
			postPriceListsReq.getRequestModel().getChangePlan().setName(changePlanRes.getResponseModel().getName());
			postPriceListsReq.getRequestModel().setActive(true);
			postPriceListsReq.getRequestModel().setName(model.getNodeId() + newNo);
			postPriceListsReq.getRequestModel().setCurrencyCode("JPY");
			// 「開始日/終了日」を初期値としてシステム日付を設定
			SimpleDateFormat startDateSdf = new SimpleDateFormat("yyyy-MM-dd");
			SimpleDateFormat endDateSdf = new SimpleDateFormat("yyyy-MM-dd");
			postPriceListsReq.getRequestModel().setStartDate(startDateSdf.format(new Date()) + "T00:00:00Z");
			postPriceListsReq.getRequestModel().setEndDate(endDateSdf.format(new Date()) + "T00:00:00Z");

			var postPricelistsRes = pricelistsService.postPricelists(
					postPriceListsReq,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			// トークン情報の上書き
			if (postPricelistsRes.getResult().getWSO2Token() != null
					&& postPricelistsRes.getResult().getELERAToken() != null) {
				accessToken = postPricelistsRes.getResult().getWSO2Token();
				ELERAToken = postPricelistsRes.getResult().getELERAToken();
			}

			if (postPricelistsRes.getResult().getCode() != 0) {
				// 失敗
				int intcode = postPricelistsRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(postPricelistsRes.getResult().getErrorMessageMap());
				return responseModel;
			}

			// 事前に取出し
			var requestParamModel = new PostConfigurationsNodesRequestParamModel();
			requestParamModel.getRequestModel().setChangePlanName(changePlanRes.getResponseModel().getName());

			// BODY
			var requestNodesNodeIdBodyModel = new PostConfigurationsNodesNodeIdRequestModel();

			var postConfigurationsResponseModel = configurationsService.postNodesNodeId(
					requestParamModel, requestNodesNodeIdBodyModel, model.getNodeId(),
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			if (postConfigurationsResponseModel.getResult().getCode() != 0) {
				// エラーメッセージをセット
				int intcode = postConfigurationsResponseModel.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(postConfigurationsResponseModel.getResult().getErrorMessageMap());
				return responseModel;
			}

			// ノード設定
			var postNodesReqParam = new PostConfigurationsNodesRequestParamModel();
			postNodesReqParam.getRequestModel().setChangePlanName(changePlanRes.getResponseModel().getName());

			var postNodesReqBody = new PostConfigurationsNodesRequestBodyModel();
			postNodesReqBody.setRequestModel(postConfigurationsResponseModel.getResponseModel());

			// PRICE_LISTS向けの構成
			var pricelistsName = new ConfigurationsPriceExtendsDetailModel();
			pricelistsName.setOrder(postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue()
					.getList().size());
			pricelistsName.setPriceListName(model.getNodeId() + newNo);
			postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue().getList()
					.add(pricelistsName);

			// ソート処理
			Collections.sort(
					postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue().getList(),
					new Comparator<ConfigurationsPriceExtendsDetailModel>() {
						public int compare(ConfigurationsPriceExtendsDetailModel t1,
								ConfigurationsPriceExtendsDetailModel t2) {
							var intrec = 0;
							if (t1.getPriceListName().length() != 31) {
								return intrec = 1;
							} else if (t2.getPriceListName().length() != 31) {
								return intrec = -1;
							}
							var int1 = Integer.parseInt(t1.getPriceListName().substring(21));
							var int2 = Integer.parseInt(t2.getPriceListName().substring(21));
							if (int1 < int2) {
								intrec = -1;
							} else if (int1 == int2) {
								intrec = 0;
							} else if (int1 > int2) {
								intrec = 1;
							}
							return intrec;
						}
					});

			// Order情報の採番
			for (int i = 0; i < postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue()
					.getList().size(); i++) {
				postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue().getList().get(i)
						.setOrder(i + 1);
			}

			var postNodesRes = configurationsService.postNodes(
					postNodesReqParam, postNodesReqBody,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			if (postNodesRes.getResult().getCode() != 0) {
				// 失敗
				int intcode = postNodesRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(postNodesRes.getResult().getErrorMessageMap());
				return responseModel;
			}

			// セッションのトークン情報の上書き
			if (postNodesRes.getResult().getWSO2Token() != null
					&& postNodesRes.getResult().getELERAToken() != null) {
				loginUser.setWso2ApiToken(postNodesRes.getResult().getWSO2Token());
				loginUser.setELERAToken(postNodesRes.getResult().getELERAToken());
				// ユーザ情報をセッション管理用リポジトリに追加
				var sessionId = sessionUtil.saveUserToRepository(loginUser);
				// レスポンスのヘッダーにセッションID用のCookieをセットする
				response = sessionUtil.setCookie(response, sessionId);
			}

			// 正常で返却
			responseModel.getResponseModel().setChangePlanName(changePlanRes.getResponseModel().getName());
			responseModel.getResponseModel().setChangePlanVersion(changePlanRes.getResponseModel().getVersion());
			responseModel.getResponseModel().setPriceLists(postPricelistsRes.getResponseModel());
			responseModel.getResponseModel().setProductLists(new ArrayList<PriceChangeProductResponseModel>());
			responseModel.getResult().setCode(Integer.valueOf(0));
			return responseModel;
		}

		// 売価変更Noあり
		var changePlanName = "";
		var changePlanVersion = 0;
		// changePlan無し
		// 実行計画を作成
		var changePlanReq = new PostChangePlanRequestModel();
		// 新規の場合は企業コード＋店舗コード＋ユーザーID＋タイムスタンプ
		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
		String timeStamp = date.format(new Date());
		changePlanName = model.getNodeId() + loginUser.getUserId() + timeStamp;
		changePlanReq.setName(changePlanName);
		// draftで作成
		changePlanReq.setStatus("Draft");
		var changePlanRes = changePlanService.postChangePlan(
				changePlanReq,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

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
		changePlanName = changePlanRes.getResponseModel().getName();
		changePlanVersion = changePlanRes.getResponseModel().getVersion();

		// skuId紐づけ用
		var itemHash = new HashMap<String, PriceChangeProductResponseModel>();
		//
		responseModel.getResponseModel().setProductLists((new ArrayList<PriceChangeProductResponseModel>()));

		var priceListName = model.getNodeId() + newNo; // 売価変更Noは店舗(21)＋売価変更No(10)

		// pricelist商品一覧取得（新売価）ChangePlanが無い一覧を取得
		var getPriceListItemReq = new GetPricelistsItemsRequestModel();
		getPriceListItemReq.getRequestModel().setPriceListName(priceListName);
		//	  getPriceListItemReq.getRequestModel().setFilter("ALL");
		getPricelistsReq.getRequestModel().setFilter("FALLTHROUGH");
		var getPriceListItemRes = pricelistsService.getPricelistsItems(
				getPriceListItemReq,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (getPriceListItemRes.getResult().getWSO2Token() != null
				&& getPriceListItemRes.getResult().getELERAToken() != null) {
			accessToken = getPriceListItemRes.getResult().getWSO2Token();
			ELERAToken = getPriceListItemRes.getResult().getELERAToken();
		}

		if (getPriceListItemRes.getResult().getCode() == 2) {
			// データ無しは飛ばして次へ
			getPriceListItemRes.setResponseModel(new ArrayList<PricelistsRecordCommonModel>());
		} else if (getPriceListItemRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = getPriceListItemRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(getPriceListItemRes.getResult().getErrorMessageMap());
			return responseModel;
		}
		// アイテムをまとめておく
		for (int j = 0; j < getPriceListItemRes.getResponseModel().size(); j++) {
			var resModel = new PriceChangeProductResponseModel();
			resModel.setSkuId(getPriceListItemRes.getResponseModel().get(j).getSkuId());
			resModel.setPricelists(getPriceListItemRes.getResponseModel().get(j));
			responseModel.getResponseModel().getProductLists().add(resModel);

			itemHash.put(getPriceListItemRes.getResponseModel().get(j).getSkuId(), resModel);

		}

		// カタログアイテム一覧取得
		var getCatalogItemsReq = new GetCatalogsCatalogNameItemsRequestModel();
		// カタログは店舗コードを使用
		var catalogName = model.getNodeId();
		var getCatalogItemsRes = catalogsService.getCatalogsCatalogNameItems(
				getCatalogItemsReq, catalogName,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (getCatalogItemsRes.getResult().getWSO2Token() != null
				&& getCatalogItemsRes.getResult().getELERAToken() != null) {
			accessToken = getCatalogItemsRes.getResult().getWSO2Token();
			ELERAToken = getCatalogItemsRes.getResult().getELERAToken();
		}

		if (getCatalogItemsRes.getResult().getCode() == 2) {
			// データ無しは飛ばして次へ
			getCatalogItemsRes.setResponseModel(new ArrayList<CatalogsCommonModel>());
		} else if (getCatalogItemsRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = getCatalogItemsRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(getCatalogItemsRes.getResult().getErrorMessageMap());
			return responseModel;
		}
		for (int j = 0; j < getCatalogItemsRes.getResponseModel().size(); j++) {
			var resModel = itemHash.get(getCatalogItemsRes.getResponseModel().get(j).getSkuId());
			if (resModel == null) {
				// ないものは取り扱わない
				continue;
			} else {
				resModel.setCatalogs(getCatalogItemsRes.getResponseModel().get(j));
			}
		}

		// 旧売価取得
		// pricelist商品一覧取得
		var getPriceListItemOldReq = new GetPricelistsPriceListNameItemRequestModel();
		priceListName = model.getNodeId(); // 売価変更Noは店舗(21)のみでさがす
		var getPriceListItemOldRes = pricelistsService.getPricelistsPriceListNameItem(
				getPriceListItemOldReq, priceListName,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (getPriceListItemOldRes.getResult().getWSO2Token() != null
				&& getPriceListItemOldRes.getResult().getELERAToken() != null) {
			accessToken = getPriceListItemOldRes.getResult().getWSO2Token();
			ELERAToken = getPriceListItemOldRes.getResult().getELERAToken();
		}

		if (getPriceListItemOldRes.getResult().getCode() == 2) {
			// データ無しは飛ばして次へ
			getPriceListItemOldRes.setResponseModel(new ArrayList<PricelistsRecordCommonModel>());
		} else if (getPriceListItemOldRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = getPriceListItemOldRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(getPriceListItemOldRes.getResult().getErrorMessageMap());
			return responseModel;
		}
		// アイテムをまとめておく
		for (int j = 0; j < getPriceListItemOldRes.getResponseModel().size(); j++) {

			// skuId検索用マップ
			var resModel = itemHash.get(getPriceListItemOldRes.getResponseModel().get(j).getSkuId());
			if (resModel == null) {
				// 無いので何もしない
			} else {
				// 旧売価用エリアに設定しておく
				resModel.setPricelistsbase(getPriceListItemOldRes.getResponseModel().get(j));
			}
		}

		// 売価変更エントリ（pricelist更新）
		var pricelistsReqParam = new PostPricelistsPriceListNameRequestParamModel();
		pricelistsReqParam.getRequestModel().setChangePlanName(changePlanRes.getResponseModel().getName());

		var pricelistsReq = new PostPricelistsPriceListNameRequestModel();
		var pricelistsRes = pricelistsService.postPricelistsPriceListName(
				pricelistsReqParam, pricelistsReq, priceListName,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		if (pricelistsRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = pricelistsRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(pricelistsRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// セッションのトークン情報の上書き
		if (pricelistsRes.getResult().getWSO2Token() != null
				&& pricelistsRes.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(pricelistsRes.getResult().getWSO2Token());
			loginUser.setELERAToken(pricelistsRes.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
		// 正常で返却
		responseModel.getResult().setCode(Integer.valueOf(0));
		responseModel.getResponseModel().setChangePlanName(changePlanName);
		responseModel.getResponseModel().setChangePlanVersion(changePlanVersion);
		responseModel.getResponseModel().setPriceLists(nowPricelists);
		return responseModel;
	}

	/**
	 * 売価変更No一覧取得処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 売価変更No情報＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/PriceChangeQuery")
	@ResponseBody
	public GetPriceChangePriceChangeQueryResponseModel priceChangeQuery(
			@Validated GetPriceChangePriceChangeQueryRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new GetPriceChangePriceChangeQueryResponseModel();
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

		// 売価変更No取得
		// pricelist一覧取得
		var getPricelistsReq = new GetPricelistsRequestModel();
		getPricelistsReq.getRequestModel().setFilter("FALLTHROUGH");
		var getPricelistsRes = pricelistsService.getPricelists(
				getPricelistsReq,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		if (getPricelistsRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = getPricelistsRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(getPricelistsRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// 同一店舗の売価変更Noを取得
		// 重複は除外する
		var priceListHash = new HashMap<String, PricelistsCommonModel>();
		responseModel.setResponseModel(new ArrayList<PricelistsCommonModel>());
		for (int i = 0; i < getPricelistsRes.getResponseModel().size(); i++) {
			var priceChangeNo = getPricelistsRes.getResponseModel().get(i).getName();

			// 一致店舗コード分を使用
			if (priceChangeNo.indexOf(model.getNodeId()) == 0) {
				if (priceChangeNo.length() != 31) {
					// 売価変更Noなし
					continue;
				} else {
					// 売価変更あり
					priceListHash.put(priceChangeNo, getPricelistsRes.getResponseModel().get(i));
				}
			}
		}
		// ハッシュから設定
		Object[] mapkey = priceListHash.keySet().toArray();
		Arrays.sort(mapkey);
		for (Object nKey : mapkey) {
			responseModel.getResponseModel().add(priceListHash.get(nKey));
		}

		if (responseModel.getResponseModel().size() == 0) {
			// データなし
			responseModel.getResult().setCode(Integer.valueOf(2));
		} else {
			// 正常で返却0
			responseModel.getResult().setCode(Integer.valueOf(0));
		}

		// セッションのトークン情報の上書き
		if (getPricelistsRes.getResult().getWSO2Token() != null
				&& getPricelistsRes.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(getPricelistsRes.getResult().getWSO2Token());
			loginUser.setELERAToken(getPricelistsRes.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		return responseModel;
	}

	/**
	 * 売価変更No取得処理（確定）.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 売価変更No情報＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/PriceChangeSelect")
	@ResponseBody
	public GetPriceChangePriceChangeSelectResponseModel priceChangeSelect(
			@Validated GetPriceChangePriceChangeSelectRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		// バリデーションエラー発生フラグ
		boolean isValiderr = false;
		// バリデーションエラー発生フラグ
		boolean isNumValiderr = false;
		// バリデーションエラーメッセージで使用
		MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
		// ValidationMessages.property からメッセージを持ってくるための記述
		ReloadableResourceBundleMessageSource validationMessageSource = new ReloadableResourceBundleMessageSource();
		validationMessageSource.setBasename("classpath:/ValidationMessages");
		validationMessageSource.setDefaultEncoding("UTF-8");
		MessageSourceUtil messageResourseUtil = new MessageSourceUtil(messageSource);

		var responseModel = new GetPriceChangePriceChangeSelectResponseModel();
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			isValiderr = true;
		}

		// 店舗コードが同じものを配列化
		// 売価変更Noは10桁
		var nowNo = Long.valueOf(0);
		try {
			nowNo = Long.parseLong(model.getPriceChangeNo());
		} catch (Exception ex) {
			// 変換エラーはないはず
		}
		// 0～999999999以外はエラー
		// 本ルートは基本的にエラーとならないはず
		if (Long.compare(nowNo, Long.valueOf(0)) < 0 || Long.compare(Long.parseLong("9999999999"), nowNo) < 0) {
			isNumValiderr = true;
			map.add("priceChangeNo",
					messageResourseUtil.getMessage("VALIDA.NUMSIZE", new String[] { "1", "9999999999" }));
		}

		// バリデーションチェックの結果エラーがあればレスポンス作成
		if (isValiderr) {
			// 通常のバリデーションエラー発生時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			if (isNumValiderr) {
				responseModel.getResult().addErrorMessageMap(map);
			}
		} else {
			responseModel.setResult(ApiUtil.createValidationErrorModelfromMap(map));
		}

		if (isValiderr || isNumValiderr) {
			// バリデーションエラー
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// 売価変更No取得
		// pricelist一覧取得
		var getPricelistsReq = new GetPricelistsRequestModel();
		// changePlanがないpricelist一覧を取得
		getPricelistsReq.getRequestModel().setFilter("FALLTHROUGH");
		var getPricelistsRes = pricelistsService.getPricelists(
				getPricelistsReq,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (getPricelistsRes.getResult().getWSO2Token() != null
				&& getPricelistsRes.getResult().getELERAToken() != null) {
			accessToken = getPricelistsRes.getResult().getWSO2Token();
			ELERAToken = getPricelistsRes.getResult().getELERAToken();
		}

		if (getPricelistsRes.getResult().getCode() == 2) {
			// 取得無し
			// 空で作成しておく
			getPricelistsRes.setResponseModel(new ArrayList<PricelistsCommonModel>());
		} else if (getPricelistsRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = getPricelistsRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(getPricelistsRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// 一致する売価変更Noを取得
		PricelistsCommonModel nowPricelists = null;
		for (int i = 0; i < getPricelistsRes.getResponseModel().size(); i++) {
			var priceChangeNo = getPricelistsRes.getResponseModel().get(i).getName();
			// 一致店舗コード分を使用
			if (priceChangeNo.indexOf(model.getNodeId()) == 0) {
				if (priceChangeNo.length() != 31) {
					// 売価変更Noなし
					continue;
				} else {
					var noStr = priceChangeNo.substring(21);
					var noLong = Long.valueOf(0);
					try {
						noLong = Long.parseLong(noStr);
					} catch (Exception ex) {
						// 変換エラーは０とする
					}
					// nowNoはフロントからの売価変更番号
					if (nowNo.equals(noLong)) {
						nowPricelists = getPricelistsRes.getResponseModel().get(i);
						break;
					}
				}
			}
		}
		// 10桁（文字列）
		var newNo = String.format("%010d", nowNo);

		if (nowPricelists == null) {
			// 通過しないはず
			// 売価変更なし⇒新規と同様とする
			// 実行計画を作成
			var changePlanReq = new PostChangePlanRequestModel();
			// 新規の場合は企業コード＋店舗コード＋ユーザーID＋タイムスタンプ
			SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
			String timeStamp = date.format(new Date());
			var changePlanName = model.getNodeId() + loginUser.getUserId() + timeStamp;
			changePlanReq.setName(changePlanName);
			// draftで作成
			changePlanReq.setStatus("Draft");
			var changePlanRes = changePlanService.postChangePlan(
					changePlanReq,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

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

			// pricelist追加
			var postPriceListsReq = new PostPricelistsRequestModel();
			postPriceListsReq.getRequestModel().getChangePlan().setDeleted(false);
			postPriceListsReq.getRequestModel().getChangePlan()
					.setReferenceVersion(changePlanRes.getResponseModel().getVersion());
			postPriceListsReq.getRequestModel().getChangePlan().setName(changePlanRes.getResponseModel().getName());
			postPriceListsReq.getRequestModel().setActive(true);
			postPriceListsReq.getRequestModel().setName(model.getNodeId() + newNo);
			postPriceListsReq.getRequestModel().setCurrencyCode("JPY");
			// 「開始日/終了日」を初期値としてシステム日付を設定
			SimpleDateFormat startDateSdf = new SimpleDateFormat("yyyy-MM-dd");
			SimpleDateFormat endDateSdf = new SimpleDateFormat("yyyy-MM-dd");
			postPriceListsReq.getRequestModel().setStartDate(startDateSdf.format(new Date()) + "T00:00:00Z");
			postPriceListsReq.getRequestModel().setEndDate(endDateSdf.format(new Date()) + "T00:00:00Z");

			var postPricelistsRes = pricelistsService.postPricelists(
					postPriceListsReq,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			// トークン情報の上書き
			if (postPricelistsRes.getResult().getWSO2Token() != null
					&& postPricelistsRes.getResult().getELERAToken() != null) {
				accessToken = postPricelistsRes.getResult().getWSO2Token();
				ELERAToken = postPricelistsRes.getResult().getELERAToken();
			}

			if (postPricelistsRes.getResult().getCode() != 0) {
				// 失敗
				int intcode = postPricelistsRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(postPricelistsRes.getResult().getErrorMessageMap());
				return responseModel;
			}

			// 事前に取出し
			var requestParamModel = new PostConfigurationsNodesRequestParamModel();
			requestParamModel.getRequestModel().setChangePlanName(changePlanRes.getResponseModel().getName());

			// BODY
			var requestNodesNodeIdBodyModel = new PostConfigurationsNodesNodeIdRequestModel();

			var postConfigurationsResponseModel = configurationsService.postNodesNodeId(
					requestParamModel, requestNodesNodeIdBodyModel, model.getNodeId(),
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

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
				responseModel.getResult()
						.setErrorMessageMap(postConfigurationsResponseModel.getResult().getErrorMessageMap());
				return responseModel;
			}

			// ノード設定
			var postNodesReqParam = new PostConfigurationsNodesRequestParamModel();
			postNodesReqParam.getRequestModel().setChangePlanName(changePlanRes.getResponseModel().getName());

			var postNodesReqBody = new PostConfigurationsNodesRequestBodyModel();
			postNodesReqBody.setRequestModel(postConfigurationsResponseModel.getResponseModel());

			// PRICE_LISTS向けの構成
			var pricelistsName = new ConfigurationsPriceExtendsDetailModel();
			pricelistsName.setOrder(postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue()
					.getList().size());
			pricelistsName.setPriceListName(model.getNodeId() + newNo);
			postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue().getList()
					.add(pricelistsName);

			// ソート処理
			Collections.sort(
					postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue().getList(),
					new Comparator<ConfigurationsPriceExtendsDetailModel>() {
						public int compare(ConfigurationsPriceExtendsDetailModel t1,
								ConfigurationsPriceExtendsDetailModel t2) {
							var intrec = 0;
							if (t1.getPriceListName().length() != 31) {
								return intrec = 1;
							} else if (t2.getPriceListName().length() != 31) {
								return intrec = -1;
							}
							var int1 = Integer.parseInt(t1.getPriceListName().substring(21));
							var int2 = Integer.parseInt(t2.getPriceListName().substring(21));
							if (int1 < int2) {
								intrec = -1;
							} else if (int1 == int2) {
								intrec = 0;
							} else if (int1 > int2) {
								intrec = 1;
							}
							return intrec;
						}
					});

			// Order情報の上書き
			for (int i = 0; i < postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue()
					.getList().size(); i++) {
				postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue().getList().get(i)
						.setOrder(i + 1);
			}

			var postNodesRes = configurationsService.postNodes(
					postNodesReqParam, postNodesReqBody,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			if (postNodesRes.getResult().getCode() != 0) {
				// 失敗
				int intcode = postNodesRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(postNodesRes.getResult().getErrorMessageMap());
				return responseModel;
			}

			// セッションのトークン情報の上書き
			if (postNodesRes.getResult().getWSO2Token() != null
					&& postNodesRes.getResult().getELERAToken() != null) {
				loginUser.setWso2ApiToken(postNodesRes.getResult().getWSO2Token());
				loginUser.setELERAToken(postNodesRes.getResult().getELERAToken());
				// ユーザ情報をセッション管理用リポジトリに追加
				var sessionId = sessionUtil.saveUserToRepository(loginUser);
				// レスポンスのヘッダーにセッションID用のCookieをセットする
				response = sessionUtil.setCookie(response, sessionId);
			}

			// 正常で返却
			responseModel.getResponseModel().setChangePlanName(changePlanRes.getResponseModel().getName());
			responseModel.getResponseModel().setChangePlanVersion(changePlanRes.getResponseModel().getVersion());
			responseModel.getResponseModel().setPriceLists(postPricelistsRes.getResponseModel());
			responseModel.getResponseModel().setProductLists(new ArrayList<PriceChangeProductResponseModel>());
			responseModel.getResult().setCode(Integer.valueOf(0));
			return responseModel;
		}

		// 売価変更Noあり
		var changePlanName = "";
		var changePlanVersion = 0;
		// changePlan無し
		// 実行計画を作成
		var changePlanReq = new PostChangePlanRequestModel();
		// 新規の場合は企業コード＋店舗コード＋ユーザーID＋タイムスタンプ
		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
		String timeStamp = date.format(new Date());
		changePlanName = model.getNodeId() + loginUser.getUserId() + timeStamp;
		changePlanReq.setName(changePlanName);
		// draftで作成
		changePlanReq.setStatus("Draft");
		var changePlanRes = changePlanService.postChangePlan(
				changePlanReq,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

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
		changePlanName = changePlanRes.getResponseModel().getName();
		changePlanVersion = changePlanRes.getResponseModel().getVersion();

		// skuId紐づけ用
		var itemHash = new HashMap<String, PriceChangeProductResponseModel>();
		//
		responseModel.getResponseModel().setProductLists((new ArrayList<PriceChangeProductResponseModel>()));

		var priceListName = model.getNodeId() + newNo; // 売価変更Noは店舗(21)＋売価変更No(10)

		// pricelist商品一覧取得（新売価）ChangePlanが無い一覧を取得
		var getPriceListItemReq = new GetPricelistsItemsRequestModel();
		getPriceListItemReq.getRequestModel().setPriceListName(priceListName);
		//	  getPriceListItemReq.getRequestModel().setFilter("ALL");
		getPricelistsReq.getRequestModel().setFilter("FALLTHROUGH");
		var getPriceListItemRes = pricelistsService.getPricelistsItems(
				getPriceListItemReq,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (getPriceListItemRes.getResult().getWSO2Token() != null
				&& getPriceListItemRes.getResult().getELERAToken() != null) {
			accessToken = getPriceListItemRes.getResult().getWSO2Token();
			ELERAToken = getPriceListItemRes.getResult().getELERAToken();
		}

		if (getPriceListItemRes.getResult().getCode() == 2) {
			// データ無しは飛ばして次へ
			getPriceListItemRes.setResponseModel(new ArrayList<PricelistsRecordCommonModel>());
		} else if (getPriceListItemRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = getPriceListItemRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(getPriceListItemRes.getResult().getErrorMessageMap());
			return responseModel;
		}
		// アイテムをまとめておく
		for (int j = 0; j < getPriceListItemRes.getResponseModel().size(); j++) {
			var resModel = new PriceChangeProductResponseModel();
			resModel.setSkuId(getPriceListItemRes.getResponseModel().get(j).getSkuId());
			resModel.setPricelists(getPriceListItemRes.getResponseModel().get(j));
			responseModel.getResponseModel().getProductLists().add(resModel);

			itemHash.put(getPriceListItemRes.getResponseModel().get(j).getSkuId(), resModel);

		}

		// カタログアイテム一覧取得
		var getCatalogItemsReq = new GetCatalogsCatalogNameItemsRequestModel();
		// カタログは店舗コードを使用
		var catalogName = model.getNodeId();
		var getCatalogItemsRes = catalogsService.getCatalogsCatalogNameItems(
				getCatalogItemsReq, catalogName,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (getCatalogItemsRes.getResult().getWSO2Token() != null
				&& getCatalogItemsRes.getResult().getELERAToken() != null) {
			accessToken = getCatalogItemsRes.getResult().getWSO2Token();
			ELERAToken = getCatalogItemsRes.getResult().getELERAToken();
		}

		if (getCatalogItemsRes.getResult().getCode() == 2) {
			// データ無しは飛ばして次へ
			getCatalogItemsRes.setResponseModel(new ArrayList<CatalogsCommonModel>());
		} else if (getCatalogItemsRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = getCatalogItemsRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(getCatalogItemsRes.getResult().getErrorMessageMap());
			return responseModel;
		}
		for (int j = 0; j < getCatalogItemsRes.getResponseModel().size(); j++) {
			var resModel = itemHash.get(getCatalogItemsRes.getResponseModel().get(j).getSkuId());
			if (resModel == null) {
				// ないものは取り扱わない
				continue;
			} else {
				resModel.setCatalogs(getCatalogItemsRes.getResponseModel().get(j));
			}
		}

		// 旧売価取得
		// pricelist商品一覧取得
		var getPriceListItemOldReq = new GetPricelistsPriceListNameItemRequestModel();
		priceListName = model.getNodeId(); // 売価変更Noは店舗(21)のみでさがす
		var getPriceListItemOldRes = pricelistsService.getPricelistsPriceListNameItem(
				getPriceListItemOldReq, priceListName,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (getPriceListItemOldRes.getResult().getWSO2Token() != null
				&& getPriceListItemOldRes.getResult().getELERAToken() != null) {
			accessToken = getPriceListItemOldRes.getResult().getWSO2Token();
			ELERAToken = getPriceListItemOldRes.getResult().getELERAToken();
		}

		if (getPriceListItemOldRes.getResult().getCode() == 2) {
			// データ無しは飛ばして次へ
			getPriceListItemOldRes.setResponseModel(new ArrayList<PricelistsRecordCommonModel>());
		} else if (getPriceListItemOldRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = getPriceListItemOldRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(getPriceListItemOldRes.getResult().getErrorMessageMap());
			return responseModel;
		}
		// アイテムをまとめておく
		for (int j = 0; j < getPriceListItemOldRes.getResponseModel().size(); j++) {

			// skuId検索用マップ
			var resModel = itemHash.get(getPriceListItemOldRes.getResponseModel().get(j).getSkuId());
			if (resModel == null) {
				// 無いので何もしない
			} else {
				// 旧売価用エリアに設定しておく
				resModel.setPricelistsbase(getPriceListItemOldRes.getResponseModel().get(j));
			}
		}

		// 売価変更エントリ（pricelist更新）
		var pricelistsReqParam = new PostPricelistsPriceListNameRequestParamModel();
		pricelistsReqParam.getRequestModel().setChangePlanName(changePlanRes.getResponseModel().getName());

		var pricelistsReq = new PostPricelistsPriceListNameRequestModel();
		var pricelistsRes = pricelistsService.postPricelistsPriceListName(
				pricelistsReqParam, pricelistsReq, priceListName,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		if (pricelistsRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = pricelistsRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(pricelistsRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// セッションのトークン情報の上書き
		if (pricelistsRes.getResult().getWSO2Token() != null
				&& pricelistsRes.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(pricelistsRes.getResult().getWSO2Token());
			loginUser.setELERAToken(pricelistsRes.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		// 正常で返却
		responseModel.getResult().setCode(Integer.valueOf(0));
		responseModel.getResponseModel().setChangePlanName(changePlanName);
		responseModel.getResponseModel().setChangePlanVersion(changePlanVersion);
		responseModel.getResponseModel().setPriceLists(nowPricelists);
		return responseModel;
	}

	/**
	 * 売価変更名称変更処理.
	 *
	 * @param reqBodyModel リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 処理結果レスポンス
	 */
	@CrossOrigin
	@PutMapping("/PriceChangeNameSet")
	@ResponseBody
	public PutPriceChangePriceChangeNameSetResponseModel priceChangeNameSet(
			@RequestBody @Validated PutPriceChangePriceChangeNameSetRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PutPriceChangePriceChangeNameSetResponseModel();

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

		// 売価変更名称変更
		var priceListName = model.getNodeId() + model.getPriceChangeNo();

		// 売価変更エントリ（pricelist更新）
		var pricelistsReqParamEntry = new PostPricelistsPriceListNameRequestParamModel();
		pricelistsReqParamEntry.getRequestModel().setChangePlanName(model.getChangePlanName());

		var pricelistsReqEntry = new PostPricelistsPriceListNameRequestModel();
		var pricelistsResEntry = pricelistsService.postPricelistsPriceListName(
				pricelistsReqParamEntry, pricelistsReqEntry, priceListName,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (pricelistsResEntry.getResult().getWSO2Token() != null
				&& pricelistsResEntry.getResult().getELERAToken() != null) {
			accessToken = pricelistsResEntry.getResult().getWSO2Token();
			ELERAToken = pricelistsResEntry.getResult().getELERAToken();
		}

		if (pricelistsResEntry.getResult().getCode() != 0) {
			// 失敗
			int intcode = pricelistsResEntry.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(pricelistsResEntry.getResult().getErrorMessageMap());
			return responseModel;
		}

		var postPriceListsReq = new PostPricelistsRequestModel();
		postPriceListsReq.setRequestModel(pricelistsResEntry.getResponseModel());
		postPriceListsReq.getRequestModel().setDisplayName(model.getPriceChangeName());
		// 売価変更名称
		var postPricelistsRes = pricelistsService.postPricelists(
				postPriceListsReq,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		if (postPricelistsRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = postPricelistsRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(postPricelistsRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// セッションのトークン情報の上書き
		if (postPricelistsRes.getResult().getWSO2Token() != null
				&& postPricelistsRes.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(postPricelistsRes.getResult().getWSO2Token());
			loginUser.setELERAToken(postPricelistsRes.getResult().getELERAToken());
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
	 * 開始日＆終了日変更処理.
	 *
	 * @param reqBodyModel リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 処理結果レスポンス
	 */
	@CrossOrigin
	@PutMapping("/PriceChangeDateSet")
	@ResponseBody
	public PutPriceChangePriceChangeDateSetResponseModel priceChangeDateSet(
			@RequestBody @Validated PutPriceChangePriceChangeDateSetRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PutPriceChangePriceChangeDateSetResponseModel();

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

		var priceListName = model.getNodeId() + model.getPriceChangeNo();

		// 日付変更エントリ（pricelist更新）
		var pricelistsReqParamEntry = new PostPricelistsPriceListNameRequestParamModel();
		pricelistsReqParamEntry.getRequestModel().setChangePlanName(model.getChangePlanName());

		var pricelistsReqEntry = new PostPricelistsPriceListNameRequestModel();
		var pricelistsResEntry = pricelistsService.postPricelistsPriceListName(
				pricelistsReqParamEntry, pricelistsReqEntry, priceListName,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (pricelistsResEntry.getResult().getWSO2Token() != null
				&& pricelistsResEntry.getResult().getELERAToken() != null) {
			accessToken = pricelistsResEntry.getResult().getWSO2Token();
			ELERAToken = pricelistsResEntry.getResult().getELERAToken();
		}

		if (pricelistsResEntry.getResult().getCode() != 0) {
			// 失敗
			int intcode = pricelistsResEntry.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(pricelistsResEntry.getResult().getErrorMessageMap());
			return responseModel;
		}

		var postPriceListsReq = new PostPricelistsRequestModel();
		postPriceListsReq.setRequestModel(pricelistsResEntry.getResponseModel());
		postPriceListsReq.getRequestModel().setStartDate(model.getStartDate().replace("/", "-") + "T00:00:00Z");
		postPriceListsReq.getRequestModel().setEndDate(model.getEndDate().replace("/", "-") + "T00:00:00Z");
		// 開始日＆終了日変更
		var postPricelistsRes = pricelistsService.postPricelists(
				postPriceListsReq,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (postPricelistsRes.getResult().getWSO2Token() != null
				&& postPricelistsRes.getResult().getELERAToken() != null) {
			accessToken = postPricelistsRes.getResult().getWSO2Token();
			ELERAToken = postPricelistsRes.getResult().getELERAToken();
		}

		if (postPricelistsRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = postPricelistsRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(postPricelistsRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// 売価変更Noに紐づく商品の「開始日/終了日」を変更
		// pricelist商品一覧取得（新売価）
		var getPriceListItemReq = new GetPricelistsItemsRequestModel();
		getPriceListItemReq.getRequestModel().setPriceListName(priceListName);
		getPriceListItemReq.getRequestModel().setFilter("ALL");
		//	  getPricelistsReq.getRequestModel().setFilter("FALLTHROUGH");
		var getPriceListItemRes = pricelistsService.getPricelistsItems(
				getPriceListItemReq,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (getPriceListItemRes.getResult().getWSO2Token() != null
				&& getPriceListItemRes.getResult().getELERAToken() != null) {
			accessToken = getPriceListItemRes.getResult().getWSO2Token();
			ELERAToken = getPriceListItemRes.getResult().getELERAToken();
		}

		if (getPriceListItemRes.getResult().getCode() == 2) {
			// データ無しは飛ばして次へ
			getPriceListItemRes.setResponseModel(new ArrayList<PricelistsRecordCommonModel>());
		} else if (getPriceListItemRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = getPriceListItemRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(getPriceListItemRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// エントリ作成
		for (int j = 0; j < getPriceListItemRes.getResponseModel().size(); j++) {

			// エントリ作成(pricelistレコード更新)
			var pricelistsParamReq = new PostPricelistsRecordPriceListRecordIdRequestParamModel();
			pricelistsParamReq.getRequestModel().setChangePlanName(model.getChangePlanName());

			var pricelistsBodyReq = new PostPricelistsRecordPriceListRecordIdRequestBodyModel();
			pricelistsBodyReq.getRequestModel().setPrice(getPriceListItemRes.getResponseModel().get(j).getPrice());
			pricelistsBodyReq.getRequestModel().setSkuId(getPriceListItemRes.getResponseModel().get(j).getSkuId());
			pricelistsBodyReq.getRequestModel().setPriceList(model.getNodeId() + model.getPriceChangeNo());
			pricelistsBodyReq.getRequestModel().getChangePlan().setName(model.getChangePlanName());
			pricelistsBodyReq.getRequestModel().getChangePlan().setDeleted(false);
			pricelistsBodyReq.getRequestModel().setId(getPriceListItemRes.getResponseModel().get(j).getId());

			var priceRecordId = getPriceListItemRes.getResponseModel().get(j).getId();
			var pricelistsEntry = pricelistsService.postPricelistsRecordPriceListRecordId(
					pricelistsParamReq, pricelistsBodyReq, priceRecordId,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			// トークン情報の上書き
			if (pricelistsEntry.getResult().getWSO2Token() != null
					&& pricelistsEntry.getResult().getELERAToken() != null) {
				accessToken = pricelistsEntry.getResult().getWSO2Token();
				ELERAToken = pricelistsEntry.getResult().getELERAToken();
			}

			if (pricelistsEntry.getResult().getCode() != 0) {
				// 失敗
				int intcode = pricelistsEntry.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(pricelistsEntry.getResult().getErrorMessageMap());
				return responseModel;
			}
			// 商品の「開始日/終了日」の更新
			// pricelist商品追加
			var postPriceListsItemReq = new PostPricelistsPriceListNameItemRequestModel();
			postPriceListsItemReq.setRequestModel(pricelistsEntry.getResponseModel());
			// 開始日/終了日を設定
			postPriceListsItemReq.getRequestModel().setStartDate(model.getStartDate().replace("/", "-") + "T00:00:00Z");
			postPriceListsItemReq.getRequestModel().setEndDate(model.getEndDate().replace("/", "-") + "T00:00:00Z");

			// 店舗(21) + 売価変更No(10)
			priceListName = model.getNodeId() + model.getPriceChangeNo();
			var postPriceListsItemRes = pricelistsService.postPricelistsPriceListNameItem(
					postPriceListsItemReq, priceListName,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			// トークン情報の上書き
			if (postPriceListsItemRes.getResult().getWSO2Token() != null
					&& postPriceListsItemRes.getResult().getELERAToken() != null) {
				accessToken = postPriceListsItemRes.getResult().getWSO2Token();
				ELERAToken = postPriceListsItemRes.getResult().getELERAToken();
			}

			if (postPriceListsItemRes.getResult().getCode() != 0) {
				// 失敗
				int intcode = postPriceListsItemRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(postPriceListsItemRes.getResult().getErrorMessageMap());
				return responseModel;
			}
		}

		// セッションのトークン情報の上書き
		if (accessToken != null
				&& ELERAToken != null) {
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
	 * 商品検索処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 商品情報＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/ProductSearch")
	@ResponseBody
	public GetPriceChangeProductSearchResponseModel productSearch(
			@Validated GetPriceChangeProductSearchRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new GetPriceChangeProductSearchResponseModel();
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

		// 商品検索
		// アイテム情報取得
		var catalogReq = new GetCatalogsCatalogNameItemsItemIdRequestModel();
		// 店舗(21)
		var catalogName = model.getNodeId();
		var itemId = model.getSkuId();
		var catalogItemRes = catalogsService.getCatalogsCatalogNameItemsItemId(
				catalogReq, catalogName, itemId,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (catalogItemRes.getResult().getWSO2Token() != null
				&& catalogItemRes.getResult().getELERAToken() != null) {
			accessToken = catalogItemRes.getResult().getWSO2Token();
			ELERAToken = catalogItemRes.getResult().getELERAToken();
		}

		if (catalogItemRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = catalogItemRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(catalogItemRes.getResult().getErrorMessageMap());
			return responseModel;
		}
		var resModel = new PriceChangeProductResponseModel();
		responseModel.getResponseModel().setProductLists(new ArrayList<PriceChangeProductResponseModel>());
		resModel.setCatalogs(catalogItemRes.getResponseModel());
		resModel.setSkuId(model.getSkuId());

		// pricelist商品一覧取得(旧売価)
		var getPriceListItemReq = new GetPricelistsPriceListNameItemRequestModel();
		// 店舗(21)
		var priceListName = model.getNodeId();
		var getPriceListItemRes = pricelistsService.getPricelistsPriceListNameItem(
				getPriceListItemReq, priceListName,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (getPriceListItemRes.getResult().getWSO2Token() != null
				&& getPriceListItemRes.getResult().getELERAToken() != null) {
			accessToken = getPriceListItemRes.getResult().getWSO2Token();
			ELERAToken = getPriceListItemRes.getResult().getELERAToken();
		}

		if (getPriceListItemRes.getResult().getCode() == 2) {
			// データ無しは飛ばして次へ
			getPriceListItemRes.setResponseModel(new ArrayList<PricelistsRecordCommonModel>());
		} else if (getPriceListItemRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = getPriceListItemRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(getPriceListItemRes.getResult().getErrorMessageMap());
			return responseModel;
		}
		// 同一名称チェック
		for (int j = 0; j < getPriceListItemRes.getResponseModel().size(); j++) {

			if (getPriceListItemRes.getResponseModel().get(j).getSkuId().equals(model.getSkuId())) {
				// 一致項目があれば設定しておく(設定用と旧売価用)
				resModel.setPricelists(getPriceListItemRes.getResponseModel().get(j));
				resModel.setPricelistsbase(getPriceListItemRes.getResponseModel().get(j));
				break;
			}
		}

		// 該当商品がない
		if (resModel.getPricelistsbase() == null) {
			responseModel.getResult().setCode(2);
			return responseModel;
		}

		responseModel.getResponseModel().getProductLists().add(resModel);

		// pricelist商品追加
		var postPriceListsItemReq = new PostPricelistsPriceListNameItemRequestModel();
		postPriceListsItemReq.getRequestModel().setPriceList(model.getNodeId() + model.getPriceChangeNo());
		postPriceListsItemReq.getRequestModel().getChangePlan().setName(model.getChangePlanName());
		postPriceListsItemReq.getRequestModel().getChangePlan().setDeleted(false);
		postPriceListsItemReq.getRequestModel().setSkuId(model.getSkuId());
		postPriceListsItemReq.getRequestModel().setPrice(resModel.getPricelistsbase().getPrice());
		// 開始日/終了日を設定
		postPriceListsItemReq.getRequestModel().setStartDate(model.getStartDate().replace("/", "-") + "T00:00:00Z");
		postPriceListsItemReq.getRequestModel().setEndDate(model.getEndDate().replace("/", "-") + "T00:00:00Z");

		// 店舗(21) + 売価変更No(10)
		priceListName = model.getNodeId() + model.getPriceChangeNo();
		var postPriceListsItemRes = pricelistsService.postPricelistsPriceListNameItem(
				postPriceListsItemReq, priceListName,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		if (postPriceListsItemRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = postPriceListsItemRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(postPriceListsItemRes.getResult().getErrorMessageMap());
			return responseModel;
		}
		resModel.setPricelists(postPriceListsItemRes.getResponseModel());

		// セッションのトークン情報の上書き
		if (postPriceListsItemRes.getResult().getWSO2Token() != null
				&& postPriceListsItemRes.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(postPriceListsItemRes.getResult().getWSO2Token());
			loginUser.setELERAToken(postPriceListsItemRes.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		// 正常で返却0
		responseModel.getResult().setCode(Integer.valueOf(0));
		return responseModel;
	}

	/**
	 * 売価変更処理.
	 *
	 * @param reqBodyModel リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 処理結果レスポンス
	 */
	@CrossOrigin
	@PutMapping("/ProductPriceChange")
	@ResponseBody
	public PutPriceChangeProductPriceChangeResponseModel productPriceChange(
			@RequestBody @Validated PutPriceChangeProductPriceChangeRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PutPriceChangeProductPriceChangeResponseModel();

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

		//	  // 店舗価格情報取得
		//      var pricelistReqParam = new GetPricelistsNodeNodeIdItemsSkuIdRequestModel();
		//      var nodeId = model.getNodeId();
		//      var skuId = model.getSkuId();
		//	  var pricelistsRes = pricelistsService.getPricelistsNodeNodeIdItemsSkuId(
		//			  pricelistReqParam, nodeId, skuId,
		//			  messageSource, apiContext, accessToken, ELERAToken);
		//
		//      if (pricelistsRes.getResult().getCode() == 2) {
		//    	  // 何もしない
		//      } else if (pricelistsRes.getResult().getCode() != 0) {
		//    	  // 失敗
		//          int intcode = pricelistsRes.getResult().getCode().intValue();
		//          responseModel.getResult().setCode(Integer.valueOf(intcode));
		//          responseModel.getResult()
		//              .setErrorMessageMap(pricelistsRes.getResult().getErrorMessageMap());
		//          return responseModel;
		//      }

		// 売価変更Noは店舗(21)＋売価変更No(10)
		var priceListName = model.getNodeId() + model.getPriceChangeNo();

		// pricelist一覧取得
		var getPricelistsReq = new GetPricelistsRequestModel();
		// pricelist商品一覧取得（新売価）ChangePlanが無い一覧を取得
		var getPriceListItemReq = new GetPricelistsItemsRequestModel();
		getPriceListItemReq.getRequestModel().setPriceListName(priceListName);
		//	  getPriceListItemReq.getRequestModel().setFilter("ALL");
		getPricelistsReq.getRequestModel().setFilter("FALLTHROUGH");
		var getPriceListItemRes = pricelistsService.getPricelistsItems(
				getPriceListItemReq,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (getPriceListItemRes.getResult().getWSO2Token() != null
				&& getPriceListItemRes.getResult().getELERAToken() != null) {
			accessToken = getPriceListItemRes.getResult().getWSO2Token();
			ELERAToken = getPriceListItemRes.getResult().getELERAToken();
		}

		if (getPriceListItemRes.getResult().getCode() == 2) {
			// データ無しは飛ばして次へ
			getPriceListItemRes.setResponseModel(new ArrayList<PricelistsRecordCommonModel>());
		} else if (getPriceListItemRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = getPriceListItemRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(getPriceListItemRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		var resModel = new PriceChangeProductResponseModel();
		for (int j = 0; j < getPriceListItemRes.getResponseModel().size(); j++) {
			if (getPriceListItemRes.getResponseModel().get(j).getSkuId().equals(model.getSkuId())) {
				resModel.setPricelists(getPriceListItemRes.getResponseModel().get(j));
				break;
			}
		}

		//	  var pricelistRecordIdRntry = model.getProductModel().getPricelists().getId();
		if (resModel.getPricelists().getId() == null) {
			// 新規の場合(未確定の場合)
			// pricelist商品追加
			var postPriceListsItemReq = new PostPricelistsPriceListNameItemRequestModel();
			postPriceListsItemReq.setRequestModel(model.getProductModel().getPricelists());
			postPriceListsItemReq.getRequestModel().setPrice(model.getPrice());
			// 開始日/終了日を設定
			postPriceListsItemReq.getRequestModel().setStartDate(model.getStartDate().replace("/", "-") + "T00:00:00Z");
			postPriceListsItemReq.getRequestModel().setEndDate(model.getEndDate().replace("/", "-") + "T00:00:00Z");

			var postPriceListsItemRes = pricelistsService.postPricelistsPriceListNameItem(
					postPriceListsItemReq, priceListName,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			// トークン情報の上書き
			if (postPriceListsItemRes.getResult().getWSO2Token() != null
					&& postPriceListsItemRes.getResult().getELERAToken() != null) {
				accessToken = postPriceListsItemRes.getResult().getWSO2Token();
				ELERAToken = postPriceListsItemRes.getResult().getELERAToken();
			}

			if (postPriceListsItemRes.getResult().getCode() != 0) {
				// 失敗
				int intcode = postPriceListsItemRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(postPriceListsItemRes.getResult().getErrorMessageMap());
				return responseModel;
			}
		} else {

			// 変更の場合(確定済みの場合)
			// エントリ作成(pricelistレコード更新)
			var pricelistsParamEntryReq = new PostPricelistsRecordPriceListRecordIdRequestParamModel();
			pricelistsParamEntryReq.getRequestModel().setChangePlanName(model.getChangePlanName());

			var pricelistsBodyEntryReq = new PostPricelistsRecordPriceListRecordIdRequestBodyModel();

			pricelistsBodyEntryReq.getRequestModel().setPrice(model.getProductModel().getPricelists().getPrice());
			pricelistsBodyEntryReq.getRequestModel().setSkuId(model.getSkuId());
			pricelistsBodyEntryReq.getRequestModel().setPriceList(model.getNodeId() + model.getPriceChangeNo());
			pricelistsBodyEntryReq.getRequestModel().getChangePlan().setName(model.getChangePlanName());
			pricelistsBodyEntryReq.getRequestModel().getChangePlan().setDeleted(false);
			pricelistsBodyEntryReq.getRequestModel().setId(resModel.getPricelists().getId());

			var pricelistsEntry = pricelistsService.postPricelistsRecordPriceListRecordId(
					pricelistsParamEntryReq, pricelistsBodyEntryReq, resModel.getPricelists().getId(),
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			// トークン情報の上書き
			if (pricelistsEntry.getResult().getWSO2Token() != null
					&& pricelistsEntry.getResult().getELERAToken() != null) {
				accessToken = pricelistsEntry.getResult().getWSO2Token();
				ELERAToken = pricelistsEntry.getResult().getELERAToken();
			}

			if (pricelistsEntry.getResult().getCode() != 0) {
				// 失敗
				int intcode = pricelistsEntry.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(pricelistsEntry.getResult().getErrorMessageMap());
				return responseModel;
			}

			// pricelist商品追加
			var postPriceListsItemReq = new PostPricelistsPriceListNameItemRequestModel();
			postPriceListsItemReq.setRequestModel(pricelistsEntry.getResponseModel());
			postPriceListsItemReq.getRequestModel().setPrice(model.getPrice());
			// 開始日/終了日を設定
			postPriceListsItemReq.getRequestModel().setStartDate(model.getStartDate().replace("/", "-") + "T00:00:00Z");
			postPriceListsItemReq.getRequestModel().setEndDate(model.getEndDate().replace("/", "-") + "T00:00:00Z");

			var postPriceListsItemRes = pricelistsService.postPricelistsPriceListNameItem(
					postPriceListsItemReq, priceListName,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			if (postPriceListsItemRes.getResult().getCode() != 0) {
				// 失敗
				int intcode = postPriceListsItemRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(postPriceListsItemRes.getResult().getErrorMessageMap());
				return responseModel;
			}
		}

		// セッションのトークン情報の上書き
		if (accessToken != null
				&& ELERAToken != null) {
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
	 * 商品削除処理.
	 *
	 * @param reqBodyModel リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 処理結果αレスポンス
	 */
	@CrossOrigin
	@DeleteMapping("/ProductDelete")
	@ResponseBody
	public DeletePriceChangeProductDeleteResponseModel productDelete(
			@RequestBody @Validated DeletePriceChangeProductDeleteRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new DeletePriceChangeProductDeleteResponseModel();

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

		// エントリ作成(pricelistレコード更新)
		var pricelistsParamReq = new PostPricelistsRecordPriceListRecordIdRequestParamModel();
		pricelistsParamReq.getRequestModel().setChangePlanName(model.getChangePlanName());

		var pricelistsBodyReq = new PostPricelistsRecordPriceListRecordIdRequestBodyModel();
		pricelistsBodyReq.getRequestModel().setPrice(model.getProductModel().getPricelists().getPrice());
		pricelistsBodyReq.getRequestModel().setSkuId(model.getSkuId());
		pricelistsBodyReq.getRequestModel().setPriceList(model.getNodeId() + model.getPriceChangeNo());
		pricelistsBodyReq.getRequestModel().getChangePlan().setName(model.getChangePlanName());
		pricelistsBodyReq.getRequestModel().getChangePlan().setDeleted(false);
		pricelistsBodyReq.getRequestModel().setId(model.getProductModel().getPricelists().getId());
		var priceRecordId = model.getProductModel().getPricelists().getId();
		var pricelistsEntry = pricelistsService.postPricelistsRecordPriceListRecordId(
				pricelistsParamReq, pricelistsBodyReq, priceRecordId,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (pricelistsEntry.getResult().getWSO2Token() != null
				&& pricelistsEntry.getResult().getELERAToken() != null) {
			accessToken = pricelistsEntry.getResult().getWSO2Token();
			ELERAToken = pricelistsEntry.getResult().getELERAToken();
		}

		if (pricelistsEntry.getResult().getCode() != 0) {
			// 失敗
			int intcode = pricelistsEntry.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(pricelistsEntry.getResult().getErrorMessageMap());
			return responseModel;
		}

		// pricelist商品追加
		var postPriceListsItemReq = new PostPricelistsPriceListNameItemRequestModel();
		postPriceListsItemReq.setRequestModel(pricelistsEntry.getResponseModel());
		postPriceListsItemReq.getRequestModel().getChangePlan().setDeleted(true);
		// 店舗(21) + 売価変更No(10)
		var priceListName = model.getNodeId() + model.getPriceChangeNo();
		var postPriceListsItemRes = pricelistsService.postPricelistsPriceListNameItem(
				postPriceListsItemReq, priceListName,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		if (postPriceListsItemRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = postPriceListsItemRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(postPriceListsItemRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// セッションのトークン情報の上書き
		if (postPriceListsItemRes.getResult().getWSO2Token() != null
				&& postPriceListsItemRes.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(postPriceListsItemRes.getResult().getWSO2Token());
			loginUser.setELERAToken(postPriceListsItemRes.getResult().getELERAToken());
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
	 * 中止処理.
	 *
	 * @param reqBodyModel リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 処理結果レスポンス
	 */
	@CrossOrigin
	@PutMapping("/PriceChangeClear")
	@ResponseBody
	public PutPriceChangePriceChangeClearResponseModel priceChangeClear(
			@RequestBody @Validated PutPriceChangePriceChangeClearRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PutPriceChangePriceChangeClearResponseModel();
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

		// 中止
		// 変更計画削除
		var changePlanNameUnitCdStr = model.getChangePlanName();
		var changePlanRes = changePlanService.postChangePlanDelete(
				changePlanNameUnitCdStr,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		if (changePlanRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = changePlanRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(changePlanRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// セッションのトークン情報の上書き
		if (changePlanRes.getResult().getWSO2Token() != null
				&& changePlanRes.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(changePlanRes.getResult().getWSO2Token());
			loginUser.setELERAToken(changePlanRes.getResult().getELERAToken());
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
	 * 終了処理.
	 *
	 * @param reqBodyModel リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 処理結果レスポンス
	 */
	@CrossOrigin
	@PutMapping("/PriceChangeExit")
	@ResponseBody
	public PutPriceChangePriceChangeClearResponseModel priceChangeExit(
			@RequestBody @Validated PutPriceChangePriceChangeClearRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PutPriceChangePriceChangeClearResponseModel();
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

		// 終了
		// 変更計画削除
		var changePlanNameUnitCdStr = model.getChangePlanName();
		var changePlanRes = changePlanService.postChangePlanDelete(
				changePlanNameUnitCdStr,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		if (changePlanRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = changePlanRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(changePlanRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// セッションのトークン情報の上書き
		if (changePlanRes.getResult().getWSO2Token() != null
				&& changePlanRes.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(changePlanRes.getResult().getWSO2Token());
			loginUser.setELERAToken(changePlanRes.getResult().getELERAToken());
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
	 * 保存処理.
	 *
	 * @param reqBodyModel リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 処理結果レスポンス
	 */
	@CrossOrigin
	@PutMapping("/PriceChangeSave")
	@ResponseBody
	public PutPriceChangePriceChangeSaveResponseModel priceChangeSave(
			@RequestBody @Validated PutPriceChangePriceChangeSaveRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PutPriceChangePriceChangeSaveResponseModel();
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

		// 保存
		// 変更計画保存
		// 実行計画をPendingに変更
		var changePlanReq = new PostChangePlanRequestModel();
		changePlanReq.setVersion(model.getChangePlanVersion());
		changePlanReq.setName(model.getChangePlanName());
		changePlanReq.setStatus("Pending");
		var changePlanRes = changePlanService.postChangePlan(
				changePlanReq,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

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
				changePlanRes.getResponseModel().getName(),
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

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
	 * 削除処理.
	 *
	 * @param reqBodyModel リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 商品マスタ更新＋αレスポンス
	 */
	@CrossOrigin
	@DeleteMapping("/PriceChangeDelete")
	@ResponseBody
	public DeletePriceChangePriceChangeDeleteResponseModel priceChangeDelete(
			@RequestBody @Validated DeletePriceChangePriceChangeDeleteRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new DeletePriceChangePriceChangeDeleteResponseModel();
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

		// 削除
		var priceListName = model.getNodeId() + model.getPriceChangeNo();

		// 売価変更エントリ（pricelist更新）
		var pricelistsReqParamEntry = new PostPricelistsPriceListNameRequestParamModel();
		pricelistsReqParamEntry.getRequestModel().setChangePlanName(model.getChangePlanName());

		var pricelistsReqEntry = new PostPricelistsPriceListNameRequestModel();
		var pricelistsResEntry = pricelistsService.postPricelistsPriceListName(
				pricelistsReqParamEntry, pricelistsReqEntry, priceListName,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (pricelistsResEntry.getResult().getWSO2Token() != null
				&& pricelistsResEntry.getResult().getELERAToken() != null) {
			accessToken = pricelistsResEntry.getResult().getWSO2Token();
			ELERAToken = pricelistsResEntry.getResult().getELERAToken();
		}

		if (pricelistsResEntry.getResult().getCode() != 0) {
			// 失敗
			int intcode = pricelistsResEntry.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(pricelistsResEntry.getResult().getErrorMessageMap());
			return responseModel;
		}

		var postPriceListsReq = new PostPricelistsRequestModel();
		postPriceListsReq.setRequestModel(pricelistsResEntry.getResponseModel());
		postPriceListsReq.getRequestModel().getChangePlan().setDeleted(true);
		// 売価変更削除
		var postPricelistsRes = pricelistsService.postPricelists(
				postPriceListsReq,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (postPricelistsRes.getResult().getWSO2Token() != null
				&& postPricelistsRes.getResult().getELERAToken() != null) {
			accessToken = postPricelistsRes.getResult().getWSO2Token();
			ELERAToken = postPricelistsRes.getResult().getELERAToken();
		}

		if (postPricelistsRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = postPricelistsRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(postPricelistsRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// 多分消さないといけないと思うがイシューにて確認後に店舗ノードを削除するか決める
		// 削除する際に変更の場合のみしか動作しない様にしないといけない。
		// 新売価取得＞削除対象の売価変更Noが存在している場合のみ店舗ノードから削除
		// 事前に取出し(変更計画エントリ作成 )
		var requestParamModel = new PostConfigurationsNodesRequestParamModel();
		requestParamModel.getRequestModel().setChangePlanName(model.getChangePlanName());

		// BODY
		var requestNodesNodeIdBodyModel = new PostConfigurationsNodesNodeIdRequestModel();

		var postConfigurationsResponseModel = configurationsService.postNodesNodeId(
				requestParamModel, requestNodesNodeIdBodyModel, model.getNodeId(),
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

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
			responseModel.getResult()
					.setErrorMessageMap(postConfigurationsResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		// ノード設定
		var postNodesReqParam = new PostConfigurationsNodesRequestParamModel();
		postNodesReqParam.getRequestModel().setChangePlanName(model.getChangePlanName());

		var postNodesReqBody = new PostConfigurationsNodesRequestBodyModel();
		postNodesReqBody.setRequestModel(postConfigurationsResponseModel.getResponseModel());

		// 削除する売価変更Noを店舗ノードから削除
		for (int i = 0; i < postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue().getList()
				.size(); i++) {

			var priceListNameVal = postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue()
					.getList().get(i).getPriceListName();
			var displayName = model.getNodeId() + model.getPriceChangeNo();
			if (priceListNameVal.equals(displayName)) {
				// 対象の売価変更Noをリストから削除
				postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue().getList().remove(i);
				break;
			}
		}

		// ソート処理
		Collections.sort(postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue().getList(),
				new Comparator<ConfigurationsPriceExtendsDetailModel>() {
					public int compare(ConfigurationsPriceExtendsDetailModel t1,
							ConfigurationsPriceExtendsDetailModel t2) {
						var intrec = 0;
						if (t1.getPriceListName().length() != 31) {
							return intrec = 1;
						} else if (t2.getPriceListName().length() != 31) {
							return intrec = -1;
						}
						var int1 = Integer.parseInt(t1.getPriceListName().substring(21));
						var int2 = Integer.parseInt(t2.getPriceListName().substring(21));
						if (int1 < int2) {
							intrec = -1;
						} else if (int1 == int2) {
							intrec = 0;
						} else if (int1 > int2) {
							intrec = 1;
						}
						return intrec;
					}
				});

		// Order情報の採番
		for (int i = 0; i < postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue().getList()
				.size(); i++) {
			postNodesReqBody.getRequestModel().getConfigurations().getPRICE_LISTS().getValue().getList().get(i)
					.setOrder(i + 1);
		}

		var postNodesRes = configurationsService.postNodes(
				postNodesReqParam, postNodesReqBody,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (postNodesRes.getResult().getWSO2Token() != null
				&& postNodesRes.getResult().getELERAToken() != null) {
			accessToken = postNodesRes.getResult().getWSO2Token();
			ELERAToken = postNodesRes.getResult().getELERAToken();
		}

		if (postNodesRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = postNodesRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(postNodesRes.getResult().getErrorMessageMap());
			return responseModel;
		}

		// 変更計画保存
		// 実行計画をPendingに変更
		var changePlanReq = new PostChangePlanRequestModel();
		changePlanReq.setVersion(model.getChangePlanVersion());
		changePlanReq.setName(model.getChangePlanName());
		changePlanReq.setStatus("Pending");
		var changePlanRes = changePlanService.postChangePlan(
				changePlanReq,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

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
				changePlanRes.getResponseModel().getName(),
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
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

}
