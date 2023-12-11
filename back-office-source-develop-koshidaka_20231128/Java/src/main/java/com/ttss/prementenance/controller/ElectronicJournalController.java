package com.ttss.prementenance.controller;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.apache.tomcat.util.codec.binary.Base64;
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
import org.thymeleaf.util.StringUtils;

import com.ttss.prementenance.model.EJournalSaveResponseModel;
import com.ttss.prementenance.model.EJournalSearchQueryRequestBodyModel;
import com.ttss.prementenance.model.EJournalSearchQueryRequestParamModel;
import com.ttss.prementenance.model.EJournalSearchResponseModel;
import com.ttss.prementenance.model.GetEJournalSearchRequestModel;
import com.ttss.prementenance.model.PostEJournalSaveRequestModel;
import com.ttss.prementenance.service.EJournalService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230131 litie(Neusoft)     G001.00.0  issue課題#835を対応します.
 * 20230314 litie(Neusoft)     G002.00.0  issue課題#1649を対応します.
 * 20230317 dingxin(Neusoft)   G003.00.0  issue課題#1718を対応します.
 * 20230421 litie(Neusoft)     G004.00.0  issue課題#1649 (comment 439049) を対応します.
 */

/**
 * 電子ジャーナル画面&API.
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("ElectronicJournal")
public class ElectronicJournalController {
    
    @Autowired
    private EJournalService eJournalService;

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private ApiContext apiContext;

    @Autowired
    private SessionUtil sessionUtil;

    @Autowired
    public ElectronicJournalController() {}


    /**
     * 店舗一覧の取得リクエスト.
     * 
     * @param model リクエスト内容
     * @param errors バリデーションエラー内容
     * @param request HttpServletのリクエスト(FWが自動で設定)
     * @return 端末管理マスタ取得＋αレスポンス
     */
    @CrossOrigin
    @PutMapping("/EJournalSearch")
    @ResponseBody
    public EJournalSearchResponseModel eJournalSearch(
    		@RequestBody @Validated GetEJournalSearchRequestModel model, Errors errors,
            HttpServletRequest request, HttpServletResponse response) {
    	// G003.00.0 Delete-Start
    	//System.out.println("Hello");
    	//System.out.println(model);
    	// G003.00.0 Delete-End
        var loginUser = this.sessionUtil.getActiveLoginUser(request);
        if (loginUser == null) {
            var responseModel = new EJournalSearchResponseModel();
            responseModel.setResult(ApiUtil.getSessionError());
            return responseModel;
        }

        if (errors.hasErrors()) {
            // バリデーションエラー時
            var responseModel = new EJournalSearchResponseModel();
            responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
            return responseModel;
        }

        String accessToken = loginUser.getWso2ApiToken();
        String ELERAToken = loginUser.getELERAToken();

        var paramReq = new EJournalSearchQueryRequestParamModel();
        var bodyReq = new EJournalSearchQueryRequestBodyModel();
        
        bodyReq.getRequestModel().setNodeId(model.getNodeId());
        bodyReq.getRequestModel().setEndpointId(model.getEndpointId());
        bodyReq.getRequestModel().setBusinessDateStart(model.getBusinessDateStart());
        bodyReq.getRequestModel().setBusinessDateEnd(model.getBusinessDateEnd());
        bodyReq.getRequestModel().setBusinessTimeStart(model.getBusinessTimeStart());
        bodyReq.getRequestModel().setBusinessTimeEnd(model.getBusinessTimeEnd());
        // G001.00.0 Update-Start
        // bodyReq.getRequestModel().setTransactionNoStart(model.getTransactionNoStart());
        // bodyReq.getRequestModel().setTransactionNoEnd(model.getTransactionNoEnd());
		if (!StringUtils.isEmpty(model.getTransactionNoStart())) {
			bodyReq.getRequestModel()
					.setTransactionNoStart(StringUtils.repeat("0", 4 - model.getTransactionNoStart().length())
							+ model.getTransactionNoStart());
		}
		if (!StringUtils.isEmpty(model.getTransactionNoEnd())) {
			bodyReq.getRequestModel().setTransactionNoEnd(
					StringUtils.repeat("0", 4 - model.getTransactionNoEnd().length()) + model.getTransactionNoEnd());
		}
        // G001.00.0 Update-End
        bodyReq.getRequestModel().setOffset(model.getOffset());

        var eJournalSearchQueryRes =
        		eJournalService.searchEJournals(paramReq, bodyReq, messageSource, apiContext,
                        accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
        
        // G003.00.0 Delete-Start
        //System.out.println(eJournalSearchQueryRes);
        // G003.00.0 Delete-End

        // セッションのトークン情報の上書き
        if (eJournalSearchQueryRes.getResult().getWSO2Token() != null
                && eJournalSearchQueryRes.getResult().getELERAToken() != null) {

            loginUser.setWso2ApiToken(eJournalSearchQueryRes.getResult().getWSO2Token());
            loginUser.setELERAToken(eJournalSearchQueryRes.getResult().getELERAToken());
            // ユーザ情報をセッション管理用リポジトリに追加
            var sessionId = sessionUtil.saveUserToRepository(loginUser);
            // レスポンスのヘッダーにセッションID用のCookieをセットする
            response = sessionUtil.setCookie(response, sessionId);
        }

        return eJournalSearchQueryRes;
    }

	// G002.00.0 Update-Start
	/**
	 * 店舗一覧の保存リクエスト.
	 * 
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return PDFファイル
	 * @throws Exception 
	 */
	@CrossOrigin
	@PostMapping("/EJournalSave")
	@ResponseBody
	public EJournalSaveResponseModel eJournalSave(
			@RequestBody @Validated PostEJournalSaveRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			var responseModel = new EJournalSaveResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			var responseModel = new EJournalSaveResponseModel();
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		// PDFページデータを作成
		String[] saveDatas = model.getSaveData().split("\n");
		// G004.00.0 Update-Start
		List<String[][]> allPageDataArr = new ArrayList<>();
		int tempRowNo = 0;
		String[] tempPageColArr = null;
		final int PAGE_ROW_COUNT = 62;
		for (String data : saveDatas) {
			{ // フォーマット				
				data = StringUtils.replace(data, "\\", "¥");
				data = " " + data;
			}

			// データをページのコラムにインサート
			if (tempRowNo == 0) {
				tempPageColArr = new String[PAGE_ROW_COUNT];
			}
			tempPageColArr[tempRowNo] = data;

			// コラムデータをページにインサート
			if (tempRowNo == 0) {
				String[][] pageDataArr = null;
				if (allPageDataArr.isEmpty()) {
					pageDataArr = new String[3][];
					allPageDataArr.add(pageDataArr);
				} else {
					pageDataArr = allPageDataArr.get(allPageDataArr.size() - 1);
					if (pageDataArr[2] != null) {
						pageDataArr = new String[3][];
						allPageDataArr.add(pageDataArr);
					}
				}
				for (int i = 0; i < pageDataArr.length; i++) {
					if (pageDataArr[i] == null) {
						pageDataArr[i] = tempPageColArr;
						break;
					}
				}
			}

			tempRowNo++;
			if (tempRowNo == PAGE_ROW_COUNT) {
				tempRowNo = 0;
			}
		}
		// G004.00.0 Update-End

		// PDFファイルを作成
		try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
			// G004.00.0 Update-Start
			PDDocument doc = new PDDocument();
			PDFont font = PDType0Font.load(doc,
					ElectronicJournalController.class.getResourceAsStream("/font/migu-1m-regular.ttf"));
			for (String[][] pageArr : allPageDataArr) {
				PDPage pageOne = new PDPage(PDRectangle.A4);
				doc.addPage(pageOne);
				PDPageContentStream pageStream = new PDPageContentStream(doc, pageOne);
				pageStream.setFont(font, 11.5F);
				for (int i = 0; i < pageArr.length; i++) {
					String[] pageColArr = pageArr[i];
					if (pageColArr != null) {
						pageStream.beginText();
						pageStream.newLineAtOffset(2F + i * 198.4F, 828.5F);
						for (int j = 0; j < pageColArr.length; j++) {
							String text = pageColArr[j];
							if (text == null) {
								break;
							}
							pageStream.showText(text);
							pageStream.newLineAtOffset(0, -13.5F);
						}
						pageStream.endText();
					}
				}
				pageStream.close();
			}
			doc.save(baos);
			doc.close();
			// G004.00.0 Update-End

			EJournalSaveResponseModel responseModel = new EJournalSaveResponseModel();
			responseModel.getResult().setCode(0);
			String base64Str = Base64.encodeBase64String(baos.toByteArray());
			responseModel.setResponseModel(base64Str);
			return responseModel;

		} catch (Exception e) {
			throw e;
		}
	}
	// G002.00.0 Update-End
}
