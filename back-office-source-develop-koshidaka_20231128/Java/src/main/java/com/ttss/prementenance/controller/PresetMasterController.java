package com.ttss.prementenance.controller;

import com.ttss.prementenance.data.BarcodeAnalysisModel;
import com.ttss.prementenance.model.GetCatalogsCatalogNameItemsItemIdRequestModel;
import com.ttss.prementenance.model.GetDepartmentsRequestModel;
import com.ttss.prementenance.model.GetPricelistsNodeNodeIdItemsSkuIdRequestModel;
import com.ttss.prementenance.model.PricelistsRecordCommonModel;
import com.ttss.prementenance.request.*;
import com.ttss.prementenance.response.*;
import com.ttss.prementenance.service.BarcodeService;
import com.ttss.prementenance.service.CatalogsService;
import com.ttss.prementenance.service.ChangePlanService;
import com.ttss.prementenance.service.ConfigurationsService;
import com.ttss.prementenance.service.ItemService;
import com.ttss.prementenance.service.PresetMasterService;
import com.ttss.prementenance.service.PricelistsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
import com.ttss.prementenance.utils.SessionUtil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230317 dingxin(Neusoft)   G001.00.0  issue課題#1718を対応します.
*/
@RestController
@RequestMapping("PresetMaster")
public class PresetMasterController {
	@Autowired
	private ConfigurationsService configurationsService;

	@Autowired
	private ChangePlanService changePlanService;

	@Autowired
	private CatalogsService catalogsService;

	@Autowired
	private PricelistsService pricelistsService;

	@Autowired
	private PresetMasterService presetService;

	@Autowired
	private BarcodeService barcodeService;

	@Autowired
	private ItemService itemService;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	private SessionUtil sessionUtil;

	@Autowired
	public PresetMasterController() {
	}

	@CrossOrigin
	@GetMapping("/PresetCatalogDetails")
	@ResponseBody
	public ResponseEntity<PresetCatalogDetailResponse>  getPresetCatalogDetails(
			@Validated PresetCatalogDetailRequest model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PresetCatalogDetailResponse();
		boolean isValiderr = false;

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseModel);
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			isValiderr = true;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		var result = presetService.getPresetCatalogDetails(model, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
         if (result.getResult().getCode() == 204 ){
			 return ResponseEntity.status(HttpStatus.NO_CONTENT).body(result);
		 }else {
			 return ResponseEntity.ok(result);
		 }

	}

	@CrossOrigin
	@GetMapping("/BarcodeAnalysis")
	@ResponseBody
	public BarcodeAnalysisResponse barcodeAnalyze(
			@Validated BarcodeAnalysisRequest model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {
		var messageResourseUtil = new MessageSourceUtil(messageSource);
		var responseModel = new BarcodeAnalysisResponse();
		boolean isValiderr = false;

		var loginUser = this.sessionUtil.getActiveLoginUser(request);

		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			isValiderr = true;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		responseModel = barcodeService.barcodeAnalysis(model, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		if (responseModel.getResult().getCode() ==0 || (responseModel.getResult().getCode() >=15 && responseModel.getResult().getCode() <=19)) {
			// カタログ取得
			var catalogsReq = new GetCatalogsCatalogNameItemsItemIdRequestModel();
			var catalogName = model.getNodeId();
//			var itemId = model.getBarcode();
			var skuId = "";
			var analysisList = responseModel.getAnalysisList();
			if (analysisList.size()>0) {
				skuId = analysisList.get(0).getIndividualAnalysis().getInquiryCode();
			}
			var catalogRes = catalogsService.getCatalogsCatalogNameItemsItemId(catalogsReq, catalogName,
					skuId, messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());
			if (catalogRes.getResult().getCode() == 0){
				Map<String,Object> product = new HashMap<>();
//				product.put("skuId",model.getBarcode());
				product.put("skuId",skuId);
				product.put("itemName",catalogRes.getResponseModel().getDisplayName().getKanji());
				product.put("taxCodes",catalogRes.getResponseModel().getTaxCodes());

				var pricelistReqParam = new GetPricelistsNodeNodeIdItemsSkuIdRequestModel();
				var nodeId = model.getNodeId();
//				var skuId = itemId;
				var pricelistsRes = pricelistsService.getPricelistsNodeNodeIdItemsSkuIdList(pricelistReqParam,
						nodeId, skuId, messageSource, apiContext, accessToken, ELERAToken,
						loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
				if (pricelistsRes.getResult().getCode() == 0) {
					PricelistsRecordCommonModel priceModel = pricelistsRes.getResponseModel();
					product.put("price",priceModel.getPrice());
				}
				responseModel.setProduct(product);
			}else {
				responseModel.setResult(ApiUtil
						.createExceptionResponseModel(messageResourseUtil.getMessage("F00002.E019").replace("{0}",model.getBarcode()), -2,new Exception()));
			}
		}else {
			// 失敗
			int intcode = responseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(responseModel.getResult().getErrorMessageMap());
			return responseModel;
		}
		return responseModel;
	}

	@CrossOrigin
	@PostMapping("/Register")
	@ResponseBody
	public PresetCatalogDetailResponse regist(
			@RequestBody @Validated Map<String, Object> model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PresetCatalogDetailResponse();
		boolean isValiderr = false;

		var loginUser = this.sessionUtil.getActiveLoginUser(request);

		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			isValiderr = true;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		responseModel = presetService.createPresetCatalogDetails(model, messageSource, apiContext, accessToken,
				ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		return responseModel;
	}

	@CrossOrigin
	@DeleteMapping("/Delete")
	@ResponseBody
	public PresetCatalogDetailResponse delete(
			@RequestBody @Validated PresetCatalogDeleteRequest model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PresetCatalogDetailResponse();
		boolean isValiderr = false;

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		// G001.00.0 Delete-Start
		//System.out.println(model);
		// G001.00.0 Delete-End
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		// G001.00.0 Delete-Start
		//System.out.println(model);
		// G001.00.0 Delete-End
		if (errors.hasErrors()) {
			// バリデーションエラー時
			isValiderr = true;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		//		model.setCompanyCode(loginUser.getBusinessUnitCdStr());
		// 仮のデータ
		// G001.00.0 Delete-Start
		//System.out.println(model);
		// G001.00.0 Delete-End
		responseModel = presetService.deletePreset(model, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		return responseModel;
	}

	@CrossOrigin
	@GetMapping("/List")
	@ResponseBody
	public ResponseEntity<PresetCatalogListResponse> list(
			@Validated PresetCatalogListRequest model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PresetCatalogListResponse();
		boolean isValiderr = false;

		var loginUser = this.sessionUtil.getActiveLoginUser(request);

		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseModel);
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			isValiderr = true;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		responseModel = presetService.listPresets(model, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		if (responseModel.getResult().getCode() == 204 ){
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(responseModel);
		}else {
			return ResponseEntity.ok(responseModel);
		}
	}

	@CrossOrigin
	@GetMapping("/SearchItemsKeyword")
	@ResponseBody
	public ItemKeywordResponse itemKeywordSearch(
			@Validated ItemKeywordRequest model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new ItemKeywordResponse();
		boolean isValiderr = false;

		// G001.00.0 Delete-Start
		//System.out.println(model);
		// G001.00.0 Delete-End

		var loginUser = this.sessionUtil.getActiveLoginUser(request);

		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			isValiderr = true;
		}
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		responseModel = itemService.searchKeyword(model, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		// 店舗価格情報取得
		if (responseModel.getResult().getCode() == 0) {
			List<Map<String, Object>> items =  responseModel.getItems();
			for (Map<String, Object> item : items) {
				var pricelistReqParam = new GetPricelistsNodeNodeIdItemsSkuIdRequestModel();
				var nodeId = model.getCompanyCode() + model.getStoreCode();
				var skuId = item.get("skuId").toString();
				var pricelistsRes = pricelistsService.getPricelistsNodeNodeIdItemsSkuIdList(pricelistReqParam,
						nodeId, skuId, messageSource, apiContext, accessToken, ELERAToken,
						loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
				if (pricelistsRes.getResult().getCode() == 0) {
					PricelistsRecordCommonModel priceModel = pricelistsRes.getResponseModel();
					item.put("price",priceModel.getPrice());
				}
			}
		}

		return responseModel;
	}

	@CrossOrigin
	@GetMapping("/SearchItemsImage")
	@ResponseBody
	public ResponseEntity<ItemImageFileResponse> itemImageSearch(
			@Validated ItemImageFileRequest model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new ItemImageFileResponse();
		boolean isValiderr = false;

		var loginUser = this.sessionUtil.getActiveLoginUser(request);

		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseModel);
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			isValiderr = true;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		responseModel = itemService.searchImages(model, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		if (responseModel.getResult().getCode() == 204 ){
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(responseModel);
		}else {
			return ResponseEntity.ok(responseModel);
		}
	}

	@CrossOrigin
	@PostMapping("/AddImage")
	@ResponseBody
	public ItemImageAddAndDeleteResponse addImage(
			MultipartFile file,@RequestParam(value = "companyCode") String companyCode,
			HttpServletRequest request, HttpServletResponse response){

		var responseModel = new ItemImageAddAndDeleteResponse();
		boolean isValiderr = false;

		var loginUser = this.sessionUtil.getActiveLoginUser(request);

		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		responseModel = itemService.addImage(file, companyCode,messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		return responseModel;
	}


	@CrossOrigin
	@DeleteMapping("/DeleteImage")
	@ResponseBody
	public ItemImageAddAndDeleteResponse deleteImage(
			@Validated DeleteImageFileRequest model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new ItemImageAddAndDeleteResponse();
		boolean isValiderr = false;

		var loginUser = this.sessionUtil.getActiveLoginUser(request);

		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			isValiderr = true;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		responseModel = itemService.deleteImage(model, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		return responseModel;
	}



}
