package com.ttss.prementenance.controller;

import java.util.ArrayList;
import java.util.HashMap;
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

import com.ttss.prementenance.model.GetConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.GetProductDivisionsRequestRcvModel;
import com.ttss.prementenance.model.GetProductDivisionsResponseModel;
import com.ttss.prementenance.model.PostDevicesQueryRequestBodyModel;
import com.ttss.prementenance.model.PostDevicesQueryRequestParamModel;
import com.ttss.prementenance.model.PostDevicesQueryResponseModel;
import com.ttss.prementenance.model.PostEndpointRequestModel;
import com.ttss.prementenance.model.PostRestaurantsQueryRequestParamModel;
import com.ttss.prementenance.model.PostTotalizerReportPdfResponseModel;
import com.ttss.prementenance.model.PostTotalizerReportResponseModel;
import com.ttss.prementenance.model.RestaurantsCommonResponseModel;
import com.ttss.prementenance.service.ConfigurationsService;
import com.ttss.prementenance.service.DevicesService;
import com.ttss.prementenance.service.RestaurantsService;
import com.ttss.prementenance.service.TotalizerService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230317 dingxin(Neusoft)   G001.00.0  issue課題#1718を対応します.

/**
* 監査API.
*
* @author
* @version 1.0.0
*/
@RestController
@RequestMapping("Audit")
public class AuditController {

	@Autowired
	private DevicesService devicesService;

	@Autowired
	private TotalizerService totalizerService;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	private SessionUtil sessionUtil;

// KSD V001.000 AS
	@Autowired
	private RestaurantsService restaurantsService;
	@Autowired
	private ConfigurationsService configurationsService;
// KSD V001.000 AE

	@Autowired
	public AuditController() {
	}

	/**
	 * レジ番号取得.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/Endpoint")
	@ResponseBody
	public PostDevicesQueryResponseModel getEndpoint(
			@RequestBody @Validated PostEndpointRequestModel model,
			Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			var responseModel = new PostDevicesQueryResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// G001.00.0 Delete-Start
			//System.out.println("validation error");
			// G001.00.0 Delete-End
			// バリデーションエラー時
			var responseModel = new PostDevicesQueryResponseModel();
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// 端末管理マスタ検索
		// デバイス情報照会
		var paramReq = new PostDevicesQueryRequestParamModel();
		var bodyReq = new PostDevicesQueryRequestBodyModel();

		bodyReq.getRequestModel().getKeys().setNodeId(model.getNodeIds());
		paramReq.getRequestModel().setOrderBy("name");
		paramReq.getRequestModel().setAscending(true);
		paramReq.getRequestModel().setStartIndex(0);
		// CS #1358
		//paramReq.getRequestModel().setBatchSize(Long.valueOf(10));
		paramReq.getRequestModel().setBatchSize(Long.valueOf(0));
		// CE #1358
		var deviceQueryRes = devicesService.postDevicesQuery(paramReq, bodyReq, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// セッションのトークン情報の上書き
		if (deviceQueryRes.getResult().getWSO2Token() != null
				&& deviceQueryRes.getResult().getELERAToken() != null) {

			loginUser.setWso2ApiToken(deviceQueryRes.getResult().getWSO2Token());
			loginUser.setELERAToken(deviceQueryRes.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		return deviceQueryRes;
	}

	/**
	 * POSレポート取得.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return POSレポート取得
	 */
	@CrossOrigin
	@PostMapping("/PosReport")
	@ResponseBody
// KSD V001.000 DS
//	public PostTotalizerReportResponseModel priceChangeSearch(
//			@RequestBody @Validated PostPosReportRequestModel model,
//			Errors errors, HttpServletRequest request, HttpServletResponse response) {
// KSD V001.000 DE
// KSD V001.000 AS
		public PostTotalizerReportResponseModel priceChangeSearch(
			@RequestBody @Validated Map<String, Object> model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {
// KSD V001.000 AE

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			var responseModel = new PostTotalizerReportResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// G001.00.0 Delete-Start
			//System.out.println("validation error");
			// G001.00.0 Delete-End
			// バリデーションエラー時
			var responseModel = new PostTotalizerReportResponseModel();
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

// KSD V001.000 DS
//		// POSレポート出力
//		PostTotalizerReportRequestBodyModel bodyReq = new PostTotalizerReportRequestBodyModel();
//
//		bodyReq.getKeys().setUser(loginUser.getUserName());
//		bodyReq.getKeys().setReportName(model.getReportName());
//		bodyReq.getKeys().setReportFormat(model.getReportFormat());
//		bodyReq.getKeys().setStoreName(model.getStoreName());
//		bodyReq.getKeys().setEndpointId(model.getEndpointId());
//		bodyReq.getKeys().setDuration(model.getDuration());
//		// AS #1544,#1546
//		bodyReq.getKeys().setIncludeZeroData(model.getIncludeZeroData());
//		bodyReq.getKeys().setPrintNoCheckFlg(model.getPrintNoCheckFlg());
//		// AE #1544,#1546
// KSD V001.000 DE

// KSD V001.000 DS
//		var reportRes = totalizerService.postTotalizerReport(bodyReq, messageSource, apiContext,
//				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
//				loginUser.getPassWord());
// KSD V001.000 DE
// KSD V001.000 AS
		var reportRes = totalizerService.postTotalizerReport(model, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());
// KSD V001.000 AE

		// セッションのトークン情報の上書き
		if (reportRes.getResult().getWSO2Token() != null
				&& reportRes.getResult().getELERAToken() != null) {

			loginUser.setWso2ApiToken(reportRes.getResult().getWSO2Token());
			loginUser.setELERAToken(reportRes.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
		return reportRes;
	}

	@CrossOrigin
	@PostMapping("/PosReport2")
	@ResponseBody
// KSD V001.000 DS
//	public PostTotalizerReportPdfResponseModel PosReport2(
//			@RequestBody @Validated PostPosReportRequestModel model,
//			Errors errors, HttpServletRequest request, HttpServletResponse response) {
// KSD V001.000 DS
// KSD V001.000 AS
	public PostTotalizerReportPdfResponseModel PosReport2(
			@RequestBody @Validated Map<String, Object> model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {
// KSD V001.000 AS

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			var responseModel = new PostTotalizerReportPdfResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// G001.00.0 Delete-Start
			//System.out.println("validation error");
			// G001.00.0 Delete-End
			// バリデーションエラー時
			var responseModel = new PostTotalizerReportPdfResponseModel();
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

// KSD V001.000 DS
//		// POSレポート出力
//		PostTotalizerReportRequestBodyModel bodyReq = new PostTotalizerReportRequestBodyModel();
//
//		bodyReq.getKeys().setUser(loginUser.getUserName());
//		bodyReq.getKeys().setReportName(model.getReportName());
//		bodyReq.getKeys().setReportFormat(model.getReportFormat());
//		bodyReq.getKeys().setStoreName(model.getStoreName());
//		bodyReq.getKeys().setEndpointId(model.getEndpointId());
//		bodyReq.getKeys().setDuration(model.getDuration());
//		// AS #1544,#1546
//		bodyReq.getKeys().setIncludeZeroData(model.getIncludeZeroData());
//		bodyReq.getKeys().setPrintNoCheckFlg(model.getPrintNoCheckFlg());
//		// AE #1544,#1546
// KSD V001.000 DE

// KSD V001.000 DS
//		var reportRes = totalizerService.postTotalizerReportPdf(bodyReq, messageSource, apiContext,
//			accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
//			loginUser.getPassWord());
// KSD V001.000 DS
// KSD V001.000 AS
		var reportRes = totalizerService.postTotalizerReportPdf(model, messageSource, apiContext,
			accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
			loginUser.getPassWord());
// KSD V001.000 AE

		// セッションのトークン情報の上書き
		if (reportRes.getResult().getWSO2Token() != null
			&& reportRes.getResult().getELERAToken() != null) {

			loginUser.setWso2ApiToken(reportRes.getResult().getWSO2Token());
			loginUser.setELERAToken(reportRes.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
		return reportRes;
	}

// KSD V001.000 AS
	/**
	 * 部屋情報マスタ取得（テーブルマスタ設定）
	 *
	 * @param model リクエスト内容[nodeId]
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 検索処理＋αレスポンス
	*/
	@CrossOrigin
	@RequestMapping("/RestaurantsTableQuery")
	@ResponseBody
	public RestaurantsCommonResponseModel restaurantsFloorQuery(@RequestBody @Validated Map<String, Object> model,
		Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new RestaurantsCommonResponseModel();
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		// バリデーション確認
		if (errors.hasErrors()) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		//フィールド確認
		try {
			model.get("nodeId").toString();
		} catch (Exception e) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		//パラメータ部
		var  paramReq = new PostRestaurantsQueryRequestParamModel();
		paramReq.getRequestModel().setOrderBy("IndexNo");
		paramReq.getRequestModel().setAscending(true);
		paramReq.getRequestModel().setStartIndex(0);
		paramReq.getRequestModel().setBatchSize(Long.valueOf(0));
		//Body部
//KSD V001.000 20230823 DS
//		var  bodyReq = new PostRestaurantsQueryRequestBodyModel();
//		var nodeIdList = new ArrayList<String>();
//		nodeIdList.add(model.get("nodeId").toString());
//KSD V001.000 20230823 DE

//KSD V001.000 20230810 DS
//		bodyReq.getRequestModel().getKeys().setNodeId(nodeIdList);
//KSD V001.000 20230810 DE
//KSD V001.000 20230823 DS
//		bodyReq.getRequestModel().setNodeId(nodeIdList);
//KSD V001.000 20230823 DE

//KSD V001.000 20230823 AS
		//"nodeId":"000123..." -> "nodeId":["000123..."]
		Map<String, Object> model1 = new HashMap<String, Object>();
		String strnodeId = model.get("nodeId").toString();
		ArrayList<String> nodeIdList= new ArrayList<String>();
		nodeIdList.add(strnodeId);
		model1.put("nodeId", nodeIdList);
		
		//"IndexNo":123 -> "IndexNo":[123]
		boolean b_flg = true;
		try {
			model.get("IndexNo").hashCode();
		} catch (Exception e) {
			// エラーの場合
			b_flg = false;
		}
		if(b_flg == true)
		{
			if( model.get("IndexNo").hashCode() != 0 ) {
				ArrayList<Integer> indexNoList= new ArrayList<Integer>();
				indexNoList.add(model.get("IndexNo").hashCode());
				model1.put("IndexNo", indexNoList);
			}
		}
		//"getTableExistsInRoomInfo":true -> "getTableExistsInRoomInfo":true
		b_flg = true;
		try {
			model.get("getTableExistsInRoomInfo").toString();
		} catch (Exception e) {
			// エラーの場合
			b_flg = false;
		}
		if(b_flg == true)
		{
			model1.put("getTableExistsInRoomInfo", true);
		}
//KSD V001.000 20230823 AS
		
		////////////////////////////////
		// POST要求（取得）
		////////////////////////////////
//KSD V001.000 20230823 DS
//		responseModel = restaurantsService.RestaurantsTableQuery(paramReq, bodyReq,
//				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
//KSD V001.000 20230823 DE
//KSD V001.000 20230823 AS
		responseModel = restaurantsService.RestaurantsTableQuery2(paramReq, model1,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
//KSD V001.000 20230823 AE
//KSD V001.000 20230830 AS
		// セッションのトークン情報の上書き
		if (accessToken != null && ELERAToken != null) {
			loginUser.setWso2ApiToken(accessToken);
			loginUser.setELERAToken(ELERAToken);
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
//KSD V001.000 20230830 AE
		return responseModel;
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
	@RequestMapping("/divisionInfoSearch")
	@ResponseBody
	public GetProductDivisionsResponseModel divisionInfoSearch(
			@RequestBody  @Validated GetProductDivisionsRequestRcvModel model, 
			Errors errors, HttpServletRequest request,HttpServletResponse response) {

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

// KSD V001.000 AE

}
