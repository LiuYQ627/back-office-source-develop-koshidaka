package com.ttss.prementenance.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.DataClearTableKindMappingModel;
import com.ttss.prementenance.model.DataClearTableResponseModel;
import com.ttss.prementenance.model.DeleteDataManagementTableListResponseModel;
import com.ttss.prementenance.model.GetDataClearTableRequestModel;
import com.ttss.prementenance.model.GetDataManagementTableListRequestModel;
import com.ttss.prementenance.model.GetDataManagementTableListResponseModel;
import com.ttss.prementenance.service.DataManagementService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20231121  wupsh(Neusoft)    G001.00.0  issue課題#1877を対応します.
 */
/** データクリア画面&API */
@RestController
@RequestMapping("DataClear")
public class DataClearController {
	@Autowired
	SessionUtil sessionUtil;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	private DataManagementService dataManagementService;

	/**
	 * データクリアテーブル取得処理.
	 *
	 * @param model リクエスト内容
	 * @param request HttpServletのリクエスト
	 * @return データクリアテーブル取得処理＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/DataClearTable")
	@ResponseBody
	public GetDataManagementTableListResponseModel dataClearTable(
			GetDataClearTableRequestModel model, HttpServletRequest request) {
		var responseModel = new GetDataManagementTableListResponseModel();

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		String storeCd = model.getStoreCd();
		String businessCd = storeCd;
		if (storeCd == null) {
			businessCd = loginUser.getBusinessUnitCdStr();
		}
		var dataClearTableResponseModelList = new ArrayList<DataClearTableResponseModel>();
		var dataClearTableKindMappingModelList = new ArrayList<DataClearTableKindMappingModel>();

		// データ検索
		GetDataManagementTableListRequestModel requestModel = new GetDataManagementTableListRequestModel();
		requestModel.setNodeId(businessCd);
		// G001.00.0 Update-Start
		Integer tableCategory = model.getTableCategory();
		//		responseModel = dataManagementService.getNodesList(requestModel, messageSource, apiContext,
		//				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
		//				loginUser.getPassWord());
		responseModel = dataManagementService.getNodesList(requestModel, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord(), tableCategory);
		// G001.00.0 Update-End
		if (responseModel != null && responseModel.getResponseModel() != null
				&& responseModel.getResponseModel().getTables() != null
				&& responseModel.getResponseModel().getTables().size() > 0) {

			for (var i = 0; i < responseModel.getResponseModel().getTables().size(); ++i) {
				var dataClearTableResponseModel = new DataClearTableResponseModel();
				dataClearTableResponseModel.setPhysicalName(responseModel.getResponseModel()
						.getTables().get(i).getTable().getTableName());
				dataClearTableResponseModel.setLogicalName(responseModel.getResponseModel()
						.getTables().get(i).getTable().getDisplayName());
				dataClearTableResponseModel.setDataCount(responseModel.getResponseModel()
						.getTables().get(i).getNoOfRecordsFoundForNode().toString());
				dataClearTableResponseModel.setTableCategory(i % 3);
				dataClearTableResponseModelList.add(dataClearTableResponseModel);
			}
		}

		if (storeCd != null) {
			// 稼働前クリア
			// for (var i = 0; i < 10; ++i) {
			// var dataClearTableResponseModel = new DataClearTableResponseModel();
			// dataClearTableResponseModel.setPhysicalName("テーブル" + i);
			// dataClearTableResponseModel.setLogicalName("store-" + storeCd.toString() + "-" + i);
			// dataClearTableResponseModel.setDataCount(String.valueOf(i * 12345));
			// dataClearTableResponseModel.setTableCategory(i % 2);
			// dataClearTableResponseModelList.add(dataClearTableResponseModel);
			// }
			// var dataClearTableKindMappingModel1 = new DataClearTableKindMappingModel();
			// dataClearTableKindMappingModel1.setTableCategory(0);
			// dataClearTableKindMappingModel1.setCategoryName("マスタ系");
			// dataClearTableKindMappingModelList.add(dataClearTableKindMappingModel1);
			var dataClearTableKindMappingModel2 = new DataClearTableKindMappingModel();
			dataClearTableKindMappingModel2.setTableCategory(1);
			dataClearTableKindMappingModel2.setCategoryName("データ系");
			dataClearTableKindMappingModelList.add(dataClearTableKindMappingModel2);

		} else {
			// 利用停止
			// モックオブジェクトを追加
			// for (var i = 0; i < 10; ++i) {
			// var dataClearTableResponseModel = new DataClearTableResponseModel();
			// dataClearTableResponseModel.setPhysicalName("テーブル" + i);
			// dataClearTableResponseModel.setLogicalName("stop-using-" + i);
			// dataClearTableResponseModel.setDataCount(String.valueOf(i * 13579));
			// dataClearTableResponseModel.setTableCategory(i % 3);
			// dataClearTableResponseModelList.add(dataClearTableResponseModel);
			// }
			// for (var i = 0; i < 3; ++i) {
			// var dataClearTableKindMappingModel = new DataClearTableKindMappingModel();
			// dataClearTableKindMappingModel.setTableCategory(i);
			// dataClearTableKindMappingModel.setCategoryName("カテゴリ" + i);
			// dataClearTableKindMappingModelList.add(dataClearTableKindMappingModel);
			// }
			// var dataClearTableKindMappingModel1 = new DataClearTableKindMappingModel();
			// dataClearTableKindMappingModel1.setTableCategory(0);
			// dataClearTableKindMappingModel1.setCategoryName("マスタ系");
			// dataClearTableKindMappingModelList.add(dataClearTableKindMappingModel1);
			var dataClearTableKindMappingModel2 = new DataClearTableKindMappingModel();
			dataClearTableKindMappingModel2.setTableCategory(1);
			dataClearTableKindMappingModel2.setCategoryName("データ系");
			dataClearTableKindMappingModelList.add(dataClearTableKindMappingModel2);
		}
		responseModel.setDataClearTableResponseModelList(dataClearTableResponseModelList);
		responseModel.setDataClearTableKindMappingModelList(dataClearTableKindMappingModelList);

		// ステータスコード
		var responseResult = new ApiCommonResponseModel();
		responseResult.setCode(0);
		responseModel.setResult(responseResult);

		return responseModel;
	}

	/**
	 * データクリアテーブル削除処理.
	 *
	 * @param model リクエスト内容
	 * @param request HttpServletのリクエスト
	 * @return データクリアテーブル取得処理＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/DeleteDataClearTable")
	@ResponseBody
	public DeleteDataManagementTableListResponseModel deleteDataClearTable(
			GetDataClearTableRequestModel model, HttpServletRequest request) {
		var responseModel = new DeleteDataManagementTableListResponseModel();

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		String storeCd = model.getStoreCd();
		String businessCd = storeCd;
		if (storeCd == null) {
			businessCd = loginUser.getBusinessUnitCdStr();
		}

		// データ削除
		GetDataManagementTableListRequestModel requestModel = new GetDataManagementTableListRequestModel();
		requestModel.setNodeId(businessCd);
		// G001.00.0 Update-Start
		Integer tableCategory = model.getTableCategory();
		//		responseModel = dataManagementService.deleteNodesList(requestModel, messageSource, apiContext,
		//				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
		//				loginUser.getPassWord());
		responseModel = dataManagementService.deleteNodesList(requestModel, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord(), tableCategory);
		// G001.00.0 Update-End
		// ステータスコード
		var responseResult = new ApiCommonResponseModel();
		responseResult.setCode(0);
		if (responseModel.getResult().getCode() != 0) {
			responseResult.setCode(-1);
		}
		responseModel.setResult(responseResult);

		return responseModel;
	}
}
