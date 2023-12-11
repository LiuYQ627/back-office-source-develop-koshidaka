package com.ttss.prementenance.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.ConnectException;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.GetHelpPdfNameResponseModel;
import com.ttss.prementenance.model.GetHelpPdfResponseModel;
import com.ttss.prementenance.model.GetStoreGroupResponseModel;
import com.ttss.prementenance.model.GetStoreResponseModel;
import com.ttss.prementenance.model.GetStoreSearchRequestModel;
import com.ttss.prementenance.model.HelpPdfFileNameMappingModel;
import com.ttss.prementenance.model.StoreInfoModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

/**
* 機能概要：共通デザイン&API.
* 
* @author TSS 小山田 峻登
* @version 1.0.0
*/

@Service
public class CommonDesignService {

  /**
   * コンストラクタ.
   */
  @Autowired
  public CommonDesignService() throws JsonParseException, JsonMappingException, IOException {
    // 画面ごとのヘルプ用PDFファイル名マッピングを読み込んでデータを保持しておく
    InputStream pdfNameFile = getClass().getResourceAsStream("/data/HelpPdfFileNameMapping.json");
    pdfNameFileList = new ObjectMapper().readValue(pdfNameFile,
      new TypeReference<List<HelpPdfFileNameMappingModel>>() {});
  }
  
  // ヘルプ用PDFファイル名テーブル
  private List<HelpPdfFileNameMappingModel> pdfNameFileList;

  /**
   * ヘルプ用PDFファイル名テーブル取得.
   * 
   * @return ヘルプ用PDFファイル名テーブル
   */
  public List<HelpPdfFileNameMappingModel> getHelpPdfFileNameMapping() {
    return pdfNameFileList;
  }

  /**
   * 店舗マスタ検索API実行.
   * 
   * @param messageSource メッセージソース
   * @param apiContext アプリケーションプロパティ
   * @param businessUnitCdStr 企業コード(文字列)
   * @param accessToken アクセストークン
   * @param ELERAToken ELERAトークン
   * @param headquartersAuthority 本部権限
   * @param belongStoreCd 所属店舗
   * @param chargeStroeCds 担当店舗コードリスト
   * @param model リクエスト内容
   * @return 店舗マスタ検索応答＋エラーメッセージ
   */
  public GetStoreResponseModel getStores(MessageSource messageSource, ApiContext apiContext,
      String businessUnitCdStr, String accessToken, String ELERAToken, short headquartersAuthority, String belongStoreCd,
      List<Integer> chargeStroeCds, GetStoreSearchRequestModel model) {

    var responseModel = new GetStoreResponseModel();
    var messageResourseUtil = new MessageSourceUtil(messageSource);

    // 店舗マスタ検索処理をリクエスト
    try {

      // URLの生成
      var url = apiContext.getWso2CommonUrl() + apiContext.getStoreManagement();

      // リクエストを送信して応答を取得
      HttpResponse<String> response =
          ApiUtil.sendMs(url, HttpMethod.GET, businessUnitCdStr, "", accessToken, ELERAToken, "");

      // レスポンス変換（JSON -> Javaオブジェクト）
      ObjectMapper mapper = new ObjectMapper();
      responseModel = mapper.readValue(response.body(), GetStoreResponseModel.class);

      // 応答コードの確認
      var code = responseModel.getResult().getCode();
      if (code != 0 && code != 2) {
        // エラーメッセージをセット
        responseModel.getResult().setErrorMessageMap(
            messageResourseUtil.createGlobalErrorMessageMap("O00004.E003", url, response.body()));
      } else if (code == 0) {
        if (!model.getIsAllStoreMaster()) {
          // 所属店舗と担当店舗のみに絞り込み
          var storeInfos = new ArrayList<StoreInfoModel>();
          responseModel.getStoreInfos().forEach(store -> {
            // 所属店舗か判定
            if (store.getStoreCd() == belongStoreCd) {
              storeInfos.add(store);
              return;
            }
            
            // 本部権限あり 且つ 担当店舗か判定
            if (headquartersAuthority == 1 && chargeStroeCds.contains(store.getStoreCd())) {
              storeInfos.add(store);
            }
          });
          responseModel.setStoreInfos(storeInfos);
        }
      }
    } catch (ConnectException e) {
      // 通信に失敗時
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00004.E002"), -10, e));
    } catch (JsonProcessingException e) {
      // JSON変換エラー
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00004.E003"), -20, e));
    } catch (Exception e) {
      // 上記以外
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00004.E003"), -30, e));
    }
    return responseModel;
  }
  
  /**
   * 店舗グループマスタ検索API実行.
   * 
   * @param messageSource メッセージソース
   * @param apiContext アプリケーションプロパティ
   * @param businessUnitCdStr 企業コード(文字列)
   * @param accessToken アクセストークン
   * @param ELERAToken ELERAトークン
   * @return 店舗マスタ検索応答＋エラーメッセージ
   */
  public GetStoreGroupResponseModel getStoreGroups(MessageSource messageSource,
      ApiContext apiContext, String businessUnitCdStr, String accessToken, String ELERAToken) {

    var responseModel = new GetStoreGroupResponseModel();
    var messageResourseUtil = new MessageSourceUtil(messageSource);

    // 店舗マスタ検索処理をリクエスト
    try {

      // URLの生成
      var url = apiContext.getWso2CommonUrl() + apiContext.getStoreGroups();

      // リクエストを送信して応答を取得
      HttpResponse<String> response =
          ApiUtil.sendMs(url, HttpMethod.GET, businessUnitCdStr, "", accessToken, ELERAToken, "");

      // レスポンス変換（JSON -> Javaオブジェクト）
      ObjectMapper mapper = new ObjectMapper();
      responseModel = mapper.readValue(response.body(), GetStoreGroupResponseModel.class);

      // 応答コードの確認
      var code = responseModel.getResult().getCode();
      if (code != 0 && code != 2) {
        // エラーメッセージをセット
        responseModel.getResult().setErrorMessageMap(
            messageResourseUtil.createGlobalErrorMessageMap("O00004.E005", url, response.body()));
      }
    } catch (ConnectException e) {
      // 通信に失敗時
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00004.E004"), -10, e));
    } catch (JsonProcessingException e) {
      // JSON変換エラー
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00004.E005"), -20, e));
    } catch (Exception e) {
      // 上記以外
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00004.E005"), -30, e));
    }
    return responseModel;
  }
  
  /**
   * ヘルプ用PDFファイル取得用API実行.
   * 
   * @param messageSource メッセージソース
   * @param apiContext アプリケーションプロパティ
   * @param businessUnitCdStr 企業コード(文字列)
   * @param accessToken アクセストークン
   * @param ELERAToken ELERAトークン
   * @return ヘルプ用PDF応答＋エラーメッセージ
   */
  public GetHelpPdfResponseModel getHelpPdf(GetHelpPdfNameResponseModel sendmodel,
      MessageSource messageSource, ApiContext apiContext, String businessUnitCdStr,
      String accessToken, String ELERAToken) {
      
    var responseModel = new GetHelpPdfResponseModel();
    var messageResourseUtil = new MessageSourceUtil(messageSource);
    
    // ヘルプ用PDFファイルのURL取得処理をリクエスト
    try {        
      // パラメータの設定（Object→文字列）
      var params = ApiUtil.createRequestParamWhenGet(sendmodel);
        
      // URLの作成
      var url = apiContext.getWso2CommonUrl() + apiContext.getHelppdf();

      // リクエストを送信して応答を取得
      HttpResponse<String> response =
          ApiUtil.sendMs(url, HttpMethod.GET, businessUnitCdStr, params, accessToken, ELERAToken, params);

      // レスポンス変換（JSON -> Javaオブジェクト）
      ObjectMapper mapper = new ObjectMapper();
      responseModel = mapper.readValue(response.body(), GetHelpPdfResponseModel.class);

      // 応答コードの確認
      var code = responseModel.getResult().getCode();
      if (code != 0) {
        // エラーメッセージをセット
        responseModel.getResult().setErrorMessageMap(
            messageResourseUtil.createGlobalErrorMessageMap("O00004.E007", url, response.body()));
      }
    } catch (ConnectException e) {
      // 通信に失敗時
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00004.E006"), -10, e));
    } catch (JsonProcessingException e) {
      // JSON変換エラー
      responseModel.setResult(ApiUtil
           .createExceptionResponseModel(messageResourseUtil.getMessage("O00004.E007"), -20, e));
    } catch (Exception e) {
      // 上記以外
      responseModel.setResult(ApiUtil
           .createExceptionResponseModel(messageResourseUtil.getMessage("O00004.E007"), -30, e));
    }
    return responseModel;
  }
  
  /**
   * ヘルプ用PDFファイル取得用のファイル名検索処理.
   * 
   * @param helpPdfSearchName ファイル名検索用パラメータ
   * 
   */
  public GetHelpPdfNameResponseModel getHelpPdfResponseModel(String helpPdfSearchName) {

    GetHelpPdfNameResponseModel responseModel = null;

    for (var mapping : this.pdfNameFileList) {
      // 検索名称が一致しない場合は次へ
      if (!helpPdfSearchName.equals(mapping.getHelpPdfSearchName())) {
        continue;
      }
      // 検索名称が一致した場合はファイル名を返す
      responseModel = new GetHelpPdfNameResponseModel();
      responseModel.setHelpPdfFileName(mapping.getPdfFileName());

      // 応答モデルが設定されていたら検索終了
      if (responseModel != null) {
        break;
      }
    }
    return responseModel;
  }
}

