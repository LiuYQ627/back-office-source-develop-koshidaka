# バックエンド

[TOC]

## １．文書管理情報

この章では、ドキュメントの開示範囲、改訂履歴、このドキュメントを承認およびレビューする必要のある人、およびドキュメントが承認された後に変更を加える方法を要約する。

<br>

### １．１．開示範囲

このドキュメントには専有情報が含まれている。 ここに含まれるすべての情報は守られる。これらの情報は、その情報を受信する職務の性質により承認された東芝テック従業員、または会社情報の公開に関する既存のポリシーに従って東芝テックにより承認された組織の個人以外に漏らしてはならない。

<br>

### １．２．改訂履歴

| 日付                | バージョン | 概要     | 修正者    |
| ------------------- | ---------- | -------- | --------- |
| 2023 年 12 月 01 日 | 1.0        | 新規作成 | ASQD 荒木 |

---

## ２．バックエンド

### ２．１．構成ファイル一覧

#### ２．１．１．開発環境フォルダ構造

バックエンドの開発環境フォルダ構造を以下に示します。  

| フォルダ構造 |     |      |           |      |      |               |            |            | 内容                               | 備考 |
| ------------ | --- | ---- | --------- | ---- | ---- | ------------- | ---------- | ---------- | ---------------------------------- | ---- |
| Java         | src | main | java      | com  | ttss | prementenance |            |            |                                    |      |
|              |     |      |           |      |      |               | controller |            | コントローラ                       |      |
|              |     |      |           |      |      |               | data       |            | モデル（共通で使用するモデル）     |      |
|              |     |      |           |      |      |               | model      |            | モデル                             |      |
|              |     |      |           |      |      |               | request    |            | リクエストボディ定義               |      |
|              |     |      |           |      |      |               | response   |            | レスポンスボディ定義               |      |
|              |     |      |           |      |      |               | service    |            | サービス                           |      |
|              |     |      |           |      |      |               | utils      |            | 共通処理                           |      |
|              |     |      |           |      |      |               |            | validation | 共通処理（バリデーションチェック） |      |
|              |     |      | resources |      |      |               |            |            |                                    |      |
|              |     |      |           | data |      |               |            |            | 初期データ                         |      |
|              |     |      |           | font |      |               |            |            | フォントデータ                     |      |

#### ２．１．２．構成ファイル一覧

バックエンドは以下のソースファイルで構成されています。

#### controller
￥Java￥src￥main￥java￥com￥ttss￥prementenance￥<b>controller</b>  
| No   | ファイル                                           | 参照業務                                                     | 処理概要参照先                                               |
| ---- | -------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1    | AccessAuthorityRegistrationController.java         | アクセス権限登録                                             | [アクセス権限登録処理概要](#２２１アクセス権限登録)          |
| 2    | AuditController.java                               | 電子ジャーナル、POSレポート、監査レポート出力、部屋情報サブ設定 | [電子ジャーナル、POSレポート、監査レポート出力、部屋情報サブ設定処理概要](#２２２電子ジャーナル設定監査レポート出力部屋情報サブ設定) |
| 3    | AuthorizationController.java                       | 従業員コード印字                                             | [従業員コード印字処理概要](#２２３従業員コード印字)          |
| 4    | CommonDesignController.java                        | 共通処理                                                     | [共通処理概要](#２２４共通処理)                              |
| 5    | ConfigurationController.java                       | プリセットマスタ設定                                         |                                                              |
| 6    | CorporateMasterController.java                     | 企業マスタ登録                                               |                                                              |
| 7    | CsvConversionTasksController.java                  | CSV入出力共通（アクセス権限登録、商品構成マスタ登録、商品マスタ登録） |                                                              |
| 8    | DataClearController.java                           | データクリア                                                 |                                                              |
| 9    | DataManagementController.java                      | 店舗マスタコピー                                             |                                                              |
| 10   | DataManagementDataRetentionSettingsController.java | データ保持設定                                               |                                                              |
| 11   | DeviceSettingController.java                       | 端末設定、金種設定                                           |                                                              |
| 12   | ElectronicJournalController.java                   | 電子ジャーナル                                               |                                                              |
| 13   | EndButtonSettingController.java                    | 締めボタン設定                                               | [締めボタン設定処理概要](#２２１３締めボタン設定)            |
| 14   | LoginController.java                               | ログイン                                                     | [ログイン処理概要](#２２１４ログイン)                        |
| 15   | PresetMasterController.java                        | プリセットマスタ登録、売価変更、商品マスタ登録               | [プリセットマスタ登録処理概要](#２２１５プリセットマスタ登録) |
| 16   | PriceChangeController.java                         | 売価変更                                                     | [売価変更処理概要](#２２１６売価変更)                        |
| 17   | ProductDivisionsController.java                    | 商品分類階層設定、商品構成マスタ登録、券種マスタ設定         | [商品分類階層設定処理概要](#２２１７商品分類階層設定)        |
| 18   | ProductGroupMasterController.java                  | 商品構成マスタ登録、商品マスタ登録、券種マスタ設定           | [商品構成マスタ登録処理概要](#２２１８商品分類階層設定)      |
| 19   | ProductMasterController.java                       | 商品マスタ登録、オプションマスタ設定、プリセットマスタ設定、商品構成マスタ設定 | [商品マスタ登録処理概要](#２２１９商品マスタ登録)            |
| 20   | ReceiptController.java                             | レシート設定                                                 | [レシート設定処理概要](#２２２０レシート設定)                |
| 21   | RentalsAgeDivisionController.java                  | 年齢区分マスタ設定、コース料金設定                           | [年齢区分マスタ設定処理概要](#２２２１年齢区分マスタ設定)    |
| 22   | RentalsCalendarController.java                     | カレンダーマスタ設定                                         | [カレンダーマスタ設定処理概要](#２２２２カレンダーマスタ設定) |
| 23   | RentalsCustomerInfoController.java                 | 部屋ロック解除（顧客情報ファイル設定）                       | [顧客情報ファイル設定処理概要](#２２２３顧客情報ファイル設定) |
| 24   | RentalsDrinkcourseController.java                  | オプションマスタ設定、コースマスタ設定                       | [オプションマスタ設定処理概要](#２２２４オプションマスタ設定) |
| 25   | RentalsEquipmentController.java                    | 機材マスタ設定、部屋関連情報マスタ設定                       | [機材マスタ設定処理概要](#２２２５機材マスタ設定)            |
| 26   | RentalsModelController.java                        | 機種設備マスタ設定、部屋関連情報マスタ設定                   | [機種設備マスタ設定処理概要](#２２２６機種設備マスタ設定)    |
| 27   | RentalsRoomController.java                         | 部屋情報マスタ設定                                           | [部屋情報マスタ設定処理概要](#２２２７部屋情報マスタ設定)    |
| 28   | RentalsRoomcourseController.java                   | コースマスタ設定、コース料金設定、料金表表示マスタ設定       | [部屋コースマスタ設定処理概要](#２２２８部屋コースマスタ設定) |
| 29   | RentalsRoomcourseRateController.java               | コース料金設定                                               | [コース料金設定処理概要](#２２２９コース料金設定)            |
| 30   | RentalsRoomInformationController.java              | 部屋関連情報マスタ設定                                       | [部屋関連情報マスタ設定処理概要](#２２３０部屋関連情報マスタ設定) |
| 31   | RentalsRoomSubController.java                      | 部屋情報サブ設定                                             | [部屋情報サブ設定処理概要](#２２３１部屋情報サブ設定)        |
| 32   | RentalsWeekdayController.java                      | 曜日区分マスタ設定、カレンダーマスタ設定、コース料金設定、部屋情報サブ設定 | [曜日区分マスタ設定処理概要](#２２３２曜日区分マスタ設定)    |
| 33   | ReservationController.java                         | バーコード設定、取引別名称設定、収入印紙設定、運用設定、店別運用設定、<br/>レシート設定、時間帯設定、OES連携名称設定、コード決済通信マスタ設定、曜日区分マスタ設定、<br/>操作ボタン設定、POSレポート、プリセットマスタ設定、料金表表示マスタ設定、商品構成マスタ設定、<br/>商品マスタ設定、セルフ/客面POSマスタ設定、店舗グループ１登録、店舗グループ２登録、店舗マスタ登録 | [変更基準日と現在情報設定処理概要](#２２３３変更基準日と現在情報設定) |
| 34   | RestaurantsComplianceController.java               | コンプライアンス情報マスタ設定                               | [コンプライアンス情報マスタ設定処理概要](#２２３４コンプライアンス情報マスタ設定) |
| 35   | RestaurantsController.java                         | 飲食オーダーガイダンス設定                                   | [飲食オーダーガイダンス設定処理概要](#２２３５飲食オーダーガイダンス設定) |
| 36   | RestaurantsFloorController.java                    | フロアマスタ設定（業務自体は途中で廃止）                     | [フロアマスタ設定処理概要](#２２３６フロアマスタ設定)        |
| 37   | RestaurantsMemberRankController.java               | 会員ランクマスタ設定                                         | [会員ランクマスタ設定処理概要](#２２３７会員ランクマスタ設定) |
| 38   | RestaurantsSysteminffixSysController.java          | 操作ボタン設定、フロアマスタ設定（業務自体は途中で廃止）     | [システム管理固定マスタ設定処理概要](#２２３８システム管理固定マスタ設定) |
| 39   | RestaurantsTableController.java                    | 部屋情報マスタ設定、部屋関連情報マスタ設定、部屋情報サブ設定 | [テーブルマスタ設定処理概要](#２２３９テーブルマスタ設定)    |
| 40   | RestaurantsTicketController.java                   | 券種マスタ設定、操作ボタン設定                               | [券種マスタ設定処理概要](#２２４０券種マスタ設定)            |
| 41   | S3bucketController.java                            | S3バケット操作                                               |                                                              |
| 42   | StateManagementController.java                     | 状態管理                                                     |                                                              |
| 43   | StoreGroup1MasterController.java                   | 店舗グループ１登録                                           |                                                              |
| 44   | StoreGroup2MasterController.java                   | 店舗グループ２登録                                           |                                                              |
| 45   | StoreMasterController.java                         | 店舗マスタ登録                                               |                                                              |
| 46   | TaxController.java                                 | 税率設定、操作ボタン設定、プリセットマスタ登録、商品構成マスタ登録、商品マスタ登録 |                                                              |
| 47   | TopController.java                                 | 業務メニュー                                                 |                                                              |
| 48   | UserMasterController.java                          | ユーザマスタ登録、商品分類階層設定                           |                                                              |

#### service
￥Java￥src￥main￥java￥com￥ttss￥prementenance￥<b>service</b>  
| No  | ファイル                        | 内容 |
| --- | ------------------------------- | ---- |
| 1   | AuthorizationService.java       |
| 2   | BarcodeService.java             |
| 3   | CatalogsService.java            |
| 4   | ChangePlanService.java          |
| 5   | CommonDesignService.java        |
| 6   | ConfigurationsService.java      |
| 7   | CsvConversionTasksService.java  |
| 8   | DataManagementService.java      |
| 9   | DeleteS3storefolderService.java |
| 10  | DevicesService.java             |
| 11  | EJournalService.java            |
| 12  | EndpointStatusService.java      |
| 13  | FailureReasonService.java       |
| 14  | InitialDataService.java         |
| 15  | ItemService.java                |
| 16  | PermissionsService.java         |
| 17  | PresetMasterService.java        |
| 18  | PricelistsService.java          |
| 19  | ReceiptService.java             |
| 20  | RentalsService.java             |
| 21  | ReservationService.java         |
| 22  | RestaurantsService.java         |
| 23  | S3bucketService.java            |
| 24  | TaxService.java                 |
| 25  | TotalizerService.java           |

#### model
￥Java￥src￥main￥java￥com￥ttss￥prementenance￥<b>model</b>  
| No  | ファイル                                                    | 内容 |
| --- | ----------------------------------------------------------- | ---- |
| 1   | AccessAuthorityBussinessListCheckedModel.java               |
| 2   | AccessAuthorityBussinessListModel.java                      |
| 3   | AccessAuthorityBussinessModel.java                          |
| 4   | AccessAuthorityChangeplanModel.java                         |
| 5   | AccessAuthorityDataModel.java                               |
| 6   | AccessAuthorityDisplayNameResponseModel.java                |
| 7   | AccessAuthorityModel.java                                   |
| 8   | AccessAuthorityPermissionsResponseModel.java                |
| 9   | AccessAuthorityResponseModel.java                           |
| 10  | ApiCommonErrorResponseModel.java                            |
| 11  | ApiCommonResponseModel.java                                 |
| 12  | AuthorizationCommonAuthoritiesModel.java                    |
| 13  | AuthorizationCommonModel.java                               |
| 14  | AuthorizationLoginRequestModel.java                         |
| 15  | AuthorizationPosOperationPermissionRequestModel.java        |
| 16  | AuthorizationRoleModel.java                                 |
| 17  | AuthorizationUsersDeleteUserRequestModel.java               |
| 18  | AuthorizationUsersQueryRequestModel.java                    |
| 19  | AuthorizationUsersQueryResponseModel.java                   |
| 20  | AuthorizationUsersRetrieveRequestModel.java                 |
| 21  | AuthorizationUsersRolesRetrieveRequestModel.java            |
| 22  | AuthRequestModel.java                                       |
| 23  | CatalogsCatalogNameItemsItemIdRequestModel.java             |
| 24  | CatalogsCatalogNameItemsRequestModel.java                   |
| 25  | CatalogsCommonAliasesModel.java                             |
| 26  | CatalogsCommonAllowableTimeOfSaleModel.java                 |
| 27  | CatalogsCommonAmountModel.java                              |
| 28  | CatalogsCommonAttributesModel.java                          |
| 29  | CatalogsCommonCatalogGroupHierarchyModel.java               |
| 30  | CatalogsCommonChangePlanModel.java                          |
| 31  | CatalogsCommonCurrencyValueModel.java                       |
| 32  | CatalogsCommonDisplayNameModel.java                         |
| 33  | CatalogsCommonModel.java                                    |
| 34  | CatalogsCommonNamedAttributesModel.java                     |
| 35  | CatalogsCommonPaymentExclusionsModel.java                   |
| 36  | CatalogsCommonPaymentRestrictionsModel.java                 |
| 37  | CatalogsCommonPaymentTypeModel.java                         |
| 38  | CatalogsCommonProductGroupModel.java                        |
| 39  | CatalogsCommonProductGroupNamedAttributesModel.java         |
| 40  | CatalogsGroupRequestModel.java                              |
| 41  | CatalogsGroupsCatalogNameItemsRequestModel.java             |
| 42  | CatalogsGroupsHierarchyLinkHierarchyModel.java              |
| 43  | CatalogsGroupsHierarchyRequestModel.java                    |
| 44  | CatalogsGroupsHierarchyResponseModel.java                   |
| 45  | ChangePlanCommonModel.java                                  |
| 46  | ChangePlanResultCommonModel.java                            |
| 47  | ChargeStoreCdModel.java                                     |
| 48  | CommonAddressModel.java                                     |
| 49  | CommonDefaultModel.java                                     |
| 50  | CommonDisplayInfoModel.java                                 |
| 51  | CommonValueOrderModel.java                                  |
| 52  | ConfigurationCloudposDetailModel.java                       |
| 53  | ConfigurationDetailModel.java                               |
| 54  | ConfigurationDetailResponseModel.java                       |
| 55  | ConfigurationsAddressModel.java                             |
| 56  | ConfigurationsBusinessDayTimeModel.java                     |
| 57  | ConfigurationsCatalogModel.java                             |
| 58  | ConfigurationsChangePlanModel.java                          |
| 59  | ConfigurationsContractPeriodDetailModel.java                |
| 60  | ConfigurationsContractPeriodModel.java                      |
| 61  | ConfigurationsDetailModel.java                              |
| 62  | ConfigurationsLocaleDetailModel.java                        |
| 63  | ConfigurationsLocaleModel.java                              |
| 64  | ConfigurationsMetadataModel.java                            |
| 65  | ConfigurationsModel.java                                    |
| 66  | ConfigurationsNodesRequestModel.java                        |
| 67  | ConfigurationsPosOrderColumnDetaliModel.java                |
| 68  | ConfigurationsPosOrderColumnModel.java                      |
| 69  | ConfigurationsPosOrderModel.java                            |
| 70  | ConfigurationsPosOrderTaxDetailModel.java                   |
| 71  | ConfigurationsPosOrderTaxModel.java                         |
| 72  | ConfigurationsPriceExtendsDetailModel.java                  |
| 73  | ConfigurationsPriceExtendsModel.java                        |
| 74  | ConfigurationsPriceListsModel.java                          |
| 75  | ConfigurationsProductDivisionsDetailModel.java              |
| 76  | ConfigurationsProductDivisionsModel.java                    |
| 77  | ConfigurationsTaxSetsDetailModel.java                       |
| 78  | ConfigurationsTaxSetsModel.java                             |
| 79  | ConfigurationsTimezoneDetailModel.java                      |
| 80  | ConfigurationsTimezoneModel.java                            |
| 81  | ContractServiceModel.java                                   |
| 82  | CorporateInfoUpdateRequestModel.java                        |
| 83  | CsvConversionCatalogsGroupAttributesModel.java              |
| 84  | CsvConversionCatalogsGroupModel.java                        |
| 85  | CsvConversionCatalogsItemsAttributesModel.java              |
| 86  | CsvConversionCatalogsItemsModel.java                        |
| 87  | CsvConversionCommonResponseModel.java                       |
| 88  | CsvConversionPermissionsRolesModel.java                     |
| 89  | DataClearTableKindMappingModel.java                         |
| 90  | DataClearTableResponseModel.java                            |
| 91  | DataManagementModel.java                                    |
| 92  | DataManagementTablesModel.java                              |
| 93  | DataManagementTablesTableModel.java                         |
| 94  | DataRetentionSettingsNodeModel.java                         |
| 95  | DeleteConfigurationsNodesNodeIdRequestModel.java            |
| 96  | DeleteConfigurationsNodesNodeIdResponseModel.java           |
| 97  | DeleteCorporateRequestRcvModel.java                         |
| 98  | DeleteCorporateResponseModel.java                           |
| 99  | DeleteDataManagementTableListRequestModel.java              |
| 100 | DeleteDataManagementTableListResponseModel.java             |
| 101 | DeleteDevicesResponseModel.java                             |
| 102 | DeletePriceChangePriceChangeDeleteRequestModel.java         |
| 103 | DeletePriceChangePriceChangeDeleteResponseModel.java        |
| 104 | DeletePriceChangeProductDeleteRequestModel.java             |
| 105 | DeletePriceChangeProductDeleteResponseModel.java            |
| 106 | DeletePricelistsRecordPriceListRecordIdResponseModel.java   |
| 107 | DeletePricelistsRequestModel.java                           |
| 108 | DeletePricelistsResponseModel.java                          |
| 109 | DeleteStoreResponseModel.java                               |
| 110 | DeleteTerminalManagementRequestModel.java                   |
| 111 | DepartmentsModel.java                                       |
| 112 | DevicesCommonModel.java                                     |
| 113 | DevicesQueryKyesRequestModel.java                           |
| 114 | DevicesQueryRequestBodyModel.java                           |
| 115 | DevicesQueryRequestParamModel.java                          |
| 116 | DisplayNameModel.java                                       |
| 117 | DurationModel.java                                          |
| 118 | DurationTimeModel.java                                      |
| 119 | EJournalModel.java                                          |
| 120 | EJournalSaveResponseModel.java                              |
| 121 | EJournalSearchQueryRequestBodyModel.java                    |
| 122 | EJournalSearchQueryRequestParamModel.java                   |
| 123 | EJournalSearchResponseModel.java                            |
| 124 | EndpintStatusCommonModel.java                               |
| 125 | EndpointStatusStatusRequestModel.java                       |
| 126 | EndpointStatusStatusResponseModel.java                      |
| 127 | FetchReceiptDetailResponseModel.java                        |
| 128 | GetAccessAuthorityRequestModel.java                         |
| 129 | GetAccessAuthorityResponseModel.java                        |
| 130 | GetCatalogsCatalogNameItemsItemIdRequestModel.java          |
| 131 | GetCatalogsCatalogNameItemsItemIdResponseModel.java         |
| 132 | GetCatalogsCatalogNameItemsRequestModel.java                |
| 133 | GetCatalogsCatalogNameItemsResponseModel.java               |
| 134 | GetCatalogsGroupsCatalogNameItemsRequestModel.java          |
| 135 | GetCatalogsGroupsCatalogNameItemsResponseModel.java         |
| 136 | GetCatalogsGroupsGroupIdResponseModel.java                  |
| 137 | GetCatalogsGroupsHierarchyRequestModel.java                 |
| 138 | GetCatalogsGroupsHierarchyResponseModel.java                |
| 139 | GetCatalogsGroupsResponseModel.java                         |
| 140 | GetCatalogsResponseModel.java                               |
| 141 | GetChangePlanRecordsChangePlanNameResmonseModel.java        |
| 142 | GetConfigurationDetailQueryRequestParamModel.java           |
| 143 | GetConfigurationDetailRequestModel.java                     |
| 144 | GetConfigurationsMetadataGroupRequestModel.java             |
| 145 | GetConfigurationsMetadataGroupResponseModel.java            |
| 146 | GetConfigurationsNodesListRequestModel.java                 |
| 147 | GetConfigurationsNodesListResponseModel.java                |
| 148 | GetConfigurationsNodesNodeIdRequestModel.java               |
| 149 | GetConfigurationsNodesNodeIdResponseModel.java              |
| 150 | GetCorporateRequestRcvModel.java                            |
| 151 | GetDataClearTableRequestModel.java                          |
| 152 | GetDataClearTableResponseModel.java                         |
| 153 | GetDataManagementTableListRequestModel.java                 |
| 154 | GetDataManagementTableListResponseModel.java                |
| 155 | GetDataRetentionSettingsModel.java                          |
| 156 | GetDepartmentsRequestModel.java                             |
| 157 | GetDevicesNodeResponseModel.java                            |
| 158 | GetDevicesResponseModel.java                                |
| 159 | GetDevicesStatusQueryRequestModel.java                      |
| 160 | GetDevicesStatusQueryResponseModel.java                     |
| 161 | GetEJournalSearchRequestModel.java                          |
| 162 | GetEndpointStatusStatusRequestModel.java                    |
| 163 | GetEndpointStatusStatusResponseModel.java                   |
| 164 | GetHelpPdfNameResponseModel.java                            |
| 165 | GetHelpPdfRequestModel.java                                 |
| 166 | GetHelpPdfResponseModel.java                                |
| 167 | GetItemsResponseModel.java                                  |
| 168 | GetPaymentDetailModel.java                                  |
| 169 | GetPaymentResponseModel.java                                |
| 170 | GetPosReportResponseModel.java                              |
| 171 | GetPriceChangePriceChangeQueryRequestModel.java             |
| 172 | GetPriceChangePriceChangeQueryResponseModel.java            |
| 173 | GetPriceChangePriceChangeSearchRequestModel.java            |
| 174 | GetPriceChangePriceChangeSearchResponseModel.java           |
| 175 | GetPriceChangePriceChangeSelectRequestModel.java            |
| 176 | GetPriceChangePriceChangeSelectResponseModel.java           |
| 177 | GetPriceChangeProductSearchRequestModel.java                |
| 178 | GetPriceChangeProductSearchResponseModel.java               |
| 179 | GetPricelistsItemsRequestModel.java                         |
| 180 | GetPricelistsItemsResponseModel.java                        |
| 181 | GetPricelistsNodeNodeIdItemsSkuIdRequestModel.java          |
| 182 | GetPricelistsNodeNodeIdItemsSkuIdResponseModel.java         |
| 183 | GetPricelistsPriceListNameItemRequestModel.java             |
| 184 | GetPricelistsPriceListNameItemResponseModel.java            |
| 185 | GetPricelistsRecordPriceListRecordIdResponseModel.java      |
| 186 | GetPricelistsRequestModel.java                              |
| 187 | GetPricelistsResponseModel.java                             |
| 188 | GetProductDivisionsRequestRcvModel.java                     |
| 189 | GetProductDivisionsResponseModel.java                       |
| 190 | GetProductGroupHierarchyRequestModel.java                   |
| 191 | GetProductGroupHierarchyResponseModel.java                  |
| 192 | GetProductGroupMasterProductGroupSearchRequestModel.java    |
| 193 | GetProductGroupMasterProductGroupSearchResponseModel.java   |
| 194 | GetProductGroupQueryPageRequestModel.java                   |
| 195 | GetProductGroupQueryPageResponseModel.java                  |
| 196 | GetProductMasterProductQueryRequestModel.java               |
| 197 | GetProductMasterProductQueryResponseModel.java              |
| 198 | GetProductMasterProductSearchRequestModel.java              |
| 199 | GetProductMasterProductSearchResponseModel.java             |
| 200 | GetReceiptDetailRequestModel.java                           |
| 201 | GetReceiptDetailRequestParamModel.java                      |
| 202 | GetReservationDateQueryRequestParamModel.java               |
| 203 | GetReservationDateRequestModel.java                         |
| 204 | GetStoreGroupResponseModel.java                             |
| 205 | GetStoreRequestRcvModel.java                                |
| 206 | GetStoreResponseModel.java                                  |
| 207 | GetStoreSearchRequestModel.java                             |
| 208 | GetTaxRatesResponseModel.java                               |
| 209 | GetTerminalManagementRequestModel.java                      |
| 210 | GetUserDataResponseModel.java                               |
| 211 | GetUserRequestModel.java                                    |
| 212 | HelpPdfFileNameMappingModel.java                            |
| 213 | HttpResponseExtentionModel.java                             |
| 214 | ItemsModel.java                                             |
| 215 | LanguageDisplayModel.java                                   |
| 216 | LineItemsModel.java                                         |
| 217 | LoginInfoModel.java                                         |
| 218 | MenuitemInfoModel.java                                      |
| 219 | NodeRetentionItemModel.java                                 |
| 220 | NodeRetentionModel.java                                     |
| 221 | PassInfoModel.java                                          |
| 222 | PasswordLockUserListModel.java                              |
| 223 | PasswordLockUserModel.java                                  |
| 224 | PasswordUnLockUserListModel.java                            |
| 225 | PasswordUnLockUserModel.java                                |
| 226 | PosReportAggregateDataModel.java                            |
| 227 | PosReportEndpointModel.java                                 |
| 228 | PosReportItemModel.java                                     |
| 229 | PosReportPdfResponseModel.java                              |
| 230 | PosReportResponseModel.java                                 |
| 231 | PostAccessAuthorityRequestBodyModel.java                    |
| 232 | PostAuthorizationLoginRequestModel.java                     |
| 233 | PostAuthorizationLoginResponseModel.java                    |
| 234 | PostAuthorizationUsersDeleteUserRequestModel.java           |
| 235 | PostAuthorizationUsersDeleteUserResponseModel.java          |
| 236 | PostAuthorizationUsersQueryRequestModel.java                |
| 237 | PostAuthorizationUsersQueryResponseModel.java               |
| 238 | PostAuthorizationUsersRequestModel.java                     |
| 239 | PostAuthorizationUsersResponseModel.java                    |
| 240 | PostAuthorizationUsersRetrieveRequestModel.java             |
| 241 | PostAuthorizationUsersRetrieveResponseModel.java            |
| 242 | PostAuthorizationUsersRolesRequestModel.java                |
| 243 | PostAuthorizationUsersRolesResponseModel.java               |
| 244 | PostAuthorizationUsersRolesRetrieveRequestModel.java        |
| 245 | PostAuthorizationUsersRolesRetrieveResponseModel.java       |
| 246 | PostCatalogsCatalogNameGroupsItemsQueryRequestModel.java    |
| 247 | PostCatalogsCatalogNameGroupsItemsQueryResponseModel.java   |
| 248 | PostCatalogsCatalogNameItemsItemIdRequestModel.java         |
| 249 | PostCatalogsCatalogNameItemsItemIdResponseModel.java        |
| 250 | PostCatalogsCatalogNameItemsRequestBodyModel.java           |
| 251 | PostCatalogsCatalogNameItemsRequestParamModel.java          |
| 252 | PostCatalogsCatalogNameItemsResponseModel.java              |
| 253 | PostCatalogsGroupsGroupIdResponseModel.java                 |
| 254 | PostCatalogsGroupsProductGroupRequestBodyModel.java         |
| 255 | PostCatalogsGroupsProductGroupResponseModel.java            |
| 256 | PostCatalogsGroupsRequestBodyModel.java                     |
| 257 | PostCatalogsGroupsRequestParamModel.java                    |
| 258 | PostCatalogsGroupsResponseModel.java                        |
| 259 | PostCatalogsRequestModel.java                               |
| 260 | PostCatalogsResponseModel.java                              |
| 261 | PostChangePlanRequestModel.java                             |
| 262 | PostChangePlanResponseModel.java                            |
| 263 | PostConfigurationsNodesNodeIdRequestModel.java              |
| 264 | PostConfigurationsNodesNodeIdResponseModel.java             |
| 265 | PostConfigurationsNodesRequestBodyModel.java                |
| 266 | PostConfigurationsNodesRequestParamModel.java               |
| 267 | PostConfigurationsNodesResponseModel.java                   |
| 268 | PostDataRetentionNodeAddModel.java                          |
| 269 | PostDataRetentionNodeAddnodeRetentionsModel.java            |
| 270 | PostDevicesQueryRequestBodyModel.java                       |
| 271 | PostDevicesQueryRequestParamModel.java                      |
| 272 | PostDevicesQueryResponseModel.java                          |
| 273 | PostDevicesRequestModel.java                                |
| 274 | PostDevicesResponseModel.java                               |
| 275 | PostEJournalSaveRequestModel.java                           |
| 276 | PostEndpointRequestModel.java                               |
| 277 | PostPermissionsRequestModel.java                            |
| 278 | PostPermissionsResponseModel.java                           |
| 279 | PostPosReportRequestModel.java                              |
| 280 | PostPricelistsPriceListNameItemRequestModel.java            |
| 281 | PostPricelistsPriceListNameItemResponseModel.java           |
| 282 | PostPricelistsPriceListNameRequestModel.java                |
| 283 | PostPricelistsPriceListNameRequestParamModel.java           |
| 284 | PostPricelistsPriceListNameResponseModel.java               |
| 285 | PostPricelistsRecordPriceListRecordIdRequestBodyModel.java  |
| 286 | PostPricelistsRecordPriceListRecordIdRequestParamModel.java |
| 287 | PostPricelistsRecordPriceListRecordIdResponseModel.java     |
| 288 | PostPricelistsRequestModel.java                             |
| 289 | PostPricelistsResponseModel.java                            |
| 290 | PostProductDivisionsRegistRequestModel.java                 |
| 291 | PostProductDivisionsResponseModel.java                      |
| 292 | PostProductGroupMasterProductGroupQueryRequestModel.java    |
| 293 | PostProductGroupMasterProductRegistRequestModel.java        |
| 294 | PostProductGroupMasterProductRegistResponseModel.java       |
| 295 | PostProductMasterProductDeleteRequestModel.java             |
| 296 | PostProductMasterProductDeleteResponseModel.java            |
| 297 | PostProductMasterProductGroupDeleteRequestModel.java        |
| 298 | PostProductMasterProductGroupDeleteResponseModel.java       |
| 299 | PostProductMasterProductRegistCsvRequestModel.java          |
| 300 | PostProductMasterProductRegistRequestModel.java             |
| 301 | PostProductMasterProductRegistResponseModel.java            |
| 302 | PostRentalsCustomerInfoQueryBodyModel.java                  |
| 303 | PostRentalsQueryRequestBodyModel.java                       |
| 304 | PostRentalsQueryRequestParamModel.java                      |
| 305 | PostRestaurantsQueryRequestBodyModel.java                   |
| 306 | PostRestaurantsQueryRequestParamModel.java                  |
| 307 | PostStoreMasterCopyRequestModel.java                        |
| 308 | PostStoreMasterCopyResponseModel.java                       |
| 309 | PostTotalizerReportPdfResponseModel.java                    |
| 310 | PostTotalizerReportRequestBodyModel.java                    |
| 311 | PostTotalizerReportRequestParamModel.java                   |
| 312 | PostTotalizerReportResponseModel.java                       |
| 313 | PriceChangeProductResponseModel.java                        |
| 314 | PriceChangeResponseModel.java                               |
| 315 | PricelistsCommonChangePlanModel.java                        |
| 316 | PricelistsCommonModel.java                                  |
| 317 | PricelistsCommonRequestModel.java                           |
| 318 | PricelistsCommonTiersModel.java                             |
| 319 | PricelistsRecordCommonModel.java                            |
| 320 | ProductDivisionsInfoUpdateRequestModel.java                 |
| 321 | ProductGroupMasterProductGroupResponseModel.java            |
| 322 | ProductMasterProductResponseModel.java                      |
| 323 | PutAccessAuthorityCsvRequestRcvModel.java                   |
| 324 | PutAccessAuthorityEditRequestRcvModel.java                  |
| 325 | PutAccessAuthorityRequestRcvModel.java                      |
| 326 | PutAccessAuthorityResponseModel.java                        |
| 327 | PutConfigurationRequestModel.java                           |
| 328 | PutConfigurationResponseModel.java                          |
| 329 | PutCorporateRequestRcvModel.java                            |
| 330 | PutCorporateResponseModel.java                              |
| 331 | PutPriceChangePriceChangeClearRequestModel.java             |
| 332 | PutPriceChangePriceChangeClearResponseModel.java            |
| 333 | PutPriceChangePriceChangeDateSetRequestModel.java           |
| 334 | PutPriceChangePriceChangeDateSetResponseModel.java          |
| 335 | PutPriceChangePriceChangeExitRequestModel.java              |
| 336 | PutPriceChangePriceChangeExitResponseModel.java             |
| 337 | PutPriceChangePriceChangeNameSetRequestModel.java           |
| 338 | PutPriceChangePriceChangeNameSetResponseModel.java          |
| 339 | PutPriceChangePriceChangeNoteSetRequestModel.java           |
| 340 | PutPriceChangePriceChangeNoteSetResponseModel.java          |
| 341 | PutPriceChangePriceChangeSaveRequestModel.java              |
| 342 | PutPriceChangePriceChangeSaveResponseModel.java             |
| 343 | PutPriceChangeProductPriceChangeRequestModel.java           |
| 344 | PutPriceChangeProductPriceChangeResponseModel.java          |
| 345 | PutPwUpdateRequestBodyModel.java                            |
| 346 | PutPwUpdateRequestParamModel.java                           |
| 347 | PutReservationRequestBodyModel.java                         |
| 348 | PutReservationRequestModel.java                             |
| 349 | PutReservationRequestParamModel.java                        |
| 350 | PutReservationResponseModel.java                            |
| 351 | PutStoreRequestModel.java                                   |
| 352 | PutStoreResponseModel.java                                  |
| 353 | PutTerminalManagementRequestModel.java                      |
| 354 | PutUserLoginRequestBodyModel.java                           |
| 355 | PutUserLoginRequestParamModel.java                          |
| 356 | PutUserRequestModel.java                                    |
| 357 | PutUserResponseModel.java                                   |
| 358 | ReceiptDetailModel.java                                     |
| 359 | RentalsCommonResponseModel.java                             |
| 360 | RentalsQueryKyesRequestModel.java                           |
| 361 | RentalsQueryRequestBodyModel.java                           |
| 362 | RentalsQueryRequestParamModel.java                          |
| 363 | RentalsUpdateResponseModel.java                             |
| 364 | ReservationDateModel.java                                   |
| 365 | ReservationDateResponseModel.java                           |
| 366 | ReservationDetailModel.java                                 |
| 367 | ReservationDetailResponseModel.java                         |
| 368 | RestaurantsCommonResponseModel.java                         |
| 369 | RestaurantsComplianceResponseModel.java                     |
| 370 | RestaurantsDeleteResponseModel.java                         |
| 371 | RestaurantsMasterData.java                                  |
| 372 | RestaurantsMasterFscpRegisterRequestModel.java              |
| 373 | RestaurantsQueryKyesRequestModel.java                       |
| 374 | RestaurantsQueryRequestBodyModel.java                       |
| 375 | RestaurantsQueryRequestParamModel.java                      |
| 376 | RestaurantsUpdateResponseModel.java                         |
| 377 | RetailTransactionModel.java                                 |
| 378 | S3bucketCommonResponseModel.java                            |
| 379 | S3bucketUploadForm.java                                     |
| 380 | S3FileGetResModel.java                                      |
| 381 | S3FileGetResuponceModel.java                                |
| 382 | SaleReturnLineItemModel.java                                |
| 383 | StoreCdModel.java                                           |
| 384 | StoreGrpupModel.java                                        |
| 385 | StoreInfoModel.java                                         |
| 386 | StoreInfoUpdateRequestModel.java                            |
| 387 | StoreMasterCopyModel.java                                   |
| 388 | TaxLineItemModel.java                                       |
| 389 | TaxRateReservationRequestModel.java                         |
| 390 | TaxSetsModel.java                                           |
| 391 | TerminalManagementUpdateInfoModel.java                      |
| 392 | TotalModel.java                                             |
| 393 | TransactionsModel.java                                      |
| 394 | UpdateDataRetentionSettingsModel.java                       |
| 395 | UserAccessModel.java                                        |
| 396 | UserAuthModel.java                                          |
| 397 | UserDataModel.java                                          |
| 398 | UserUpdateInfoModel.java                                    |
| 399 | Wso2AccessTokenModel.java                                   |

#### utils
￥Java￥src￥main￥java￥com￥ttss￥prementenance￥<b>utils</b>  
| No  | ファイル                            | 内容 |
| --- | ----------------------------------- | ---- |
| 1   | ApiContext.java                     |
| 2   | ApiUtil.java                        |
| 3   | ComparatorUtil.java                 |
| 4   | HeaderToCookieSetCustomFilter.java  |
| 5   | LogUtil.java                        |
| 6   | MessageSourceUtil.java              |
| 7   | OauthContext.java                   |
| 8   | OauthUtil.java                      |
| 9   | PropertiesConfiguration.java        |
| 10  | RestControllerExceptionHandler.java |
| 11  | SessionBeans.java                   |
| 12  | SessionUtil.java                    |
| 13  | TransactionsSort.java               |
| 14  | WebMvcConfig.java                   |
| 15  | Wso2TokenErrorResponse.java         |

￥Java￥src￥main￥java￥com￥ttss￥prementenance￥<b>utils￥validation</b>  
| No  | ファイル                     | 内容 |
| --- | ---------------------------- | ---- |
| 1   | BusinessUnitCd.java          |
| 2   | BusinessUnitCdValidator.java |
| 3   | ByteMax.java                 |
| 4   | ByteMaxValidator.java        |
| 5   | ByteSize.java                |
| 6   | ByteSizeValidator.java       |

#### data
￥Java￥src￥main￥java￥com￥ttss￥prementenance￥<b>data</b>  
| No  | ファイル                  | 内容 |
| --- | ------------------------- | ---- |
| 1   | BarcodeAnalysisModel.java |
| 2   | CategoryItemModel.java    |
| 3   | CategoryModel.java        |
| 4   | IndividualAnalysis.java   |
| 5   | PlanningModel.java        |

#### request
￥Java￥src￥main￥java￥com￥ttss￥prementenance￥<b>request</b>  
| No  | ファイル                                         | 内容 |
| --- | ------------------------------------------------ | ---- |
| 1   | BarcodeAnalysisRequest.java                      |
| 2   | ConfigurationNodeRequest.java                    |
| 3   | ConfigurationsCommonDisplayRequestModel.java     |
| 4   | DeleteImageFileRequest.java                      |
| 5   | DeleteRestaurantsMasterFscpRequest.java          |
| 6   | FailureReasonRequest.java                        |
| 7   | GetDataRetentionSettingsRequestModel.java        |
| 8   | GetDepartmentsResponseModel.java                 |
| 9   | ItemImageFileRequest.java                        |
| 10  | ItemKeywordRequest.java                          |
| 11  | PostConfigurationsCommonDisplayRequestModel.java |
| 12  | PostDataRetentionNodeAddRequestModel.java        |
| 13  | PostRestaurantsSetToolDbSelectRequest.java       |
| 14  | PresetCatalogDeleteRequest.java                  |
| 15  | PresetCatalogDetailRequest.java                  |
| 16  | PresetCatalogListRequest.java                    |
| 17  | ReceiptListRequest.java                          |
| 18  | RestaurantsMasterFscpRequest.java                |
| 19  | TaxSetsNewRequest.java                           |
| 20  | TaxSetsRequest.java                              |
| 21  | TaxSetsUpdateRequest.java                        |

#### response
￥Java￥src￥main￥java￥com￥ttss￥prementenance￥<b>response</b>  
| No  | ファイル                                          | 内容 |
| --- | ------------------------------------------------- | ---- |
| 1   | BarcodeAnalysisResponse.java                      |
| 2   | DataRetentionSettingsResponseModel.java           |
| 3   | DeleteRestaurantResponseModel.java                |
| 4   | FailureReasonResponse.java                        |
| 5   | GetDataRetentionSettingsResponseModel.java        |
| 6   | ItemImageAddAndDeleteResponse.java                |
| 7   | ItemImageFileResponse.java                        |
| 8   | ItemKeywordResponse.java                          |
| 9   | PostConfigurationsCommonDisplayResponseModel.java |
| 10  | PostDataRetentionNodeAddResponseModel.java        |
| 11  | PostRestaurantsMasterFscpDataResponse.java        |
| 12  | PostRestaurantsMasterFscpDataResponseUpd.java     |
| 13  | PostRestaurantsSetToolDbSelectResponse.java       |
| 14  | PresetCatalogDetailResponse.java                  |
| 15  | PresetCatalogListResponse.java                    |
| 16  | PresetCreateFolderResponse.java                   |
| 17  | PresetDeleteFolderResponse.java                   |
| 18  | ReceiptListResponse.java                          |
| 19  | TaxSetsResponse.java                              |
| 20  | TaxSetsUpdateResponse.java                        |

---



### ２．２．処理一覧

#### ２．２．１．アクセス権限登録
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    > リクエストモデル</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>

<tr><td  >1</td><td  >データクリアテーブル取得処理</td><td  >AccessAuthorityRegistration<br/>/AccessAuthorityTable</td><td  ></td><td  >accessAuthorityTable</td><td >permissionsService.getList</td><td  >GetAccessAuthorityRequestModel</td><td >GET<br/>
permissions/query?roleNames=</td><td  >
■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･データ無し（応答コード：2）<br/>
・statusCode:200と204以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）<br/>
</td><td  >GetAccessAuthorityResponseModel()</td><td ></td></tr>

<tr><td  colspan="1" rowspan="4" >2</td><td  colspan="1" rowspan="4" >アクセス権限更新処理</td><td  colspan="1" rowspan="4" >AccessAuthorityRegistration<br/>
/AccessInfoRegist</td><td  >・name：名称：企業コード＋ユーザーID＋タイムスタンプ<br/>
・status：'Draft'</td><td  colspan="1" rowspan="4" >accessInfoRegist</td><td  >changePlanService.<br/>
postChangePlan</td><td   >PostChangePlanRequestModel</td><td  >POST<br/>
changeplans/records</td><td  colspan="1" rowspan="4" >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td >PostChangePlanResponseModel()</td><td  colspan="1" rowspan="4" ></td></tr>
<tr><td  >・name：ロール名称</td><td  >permissionsService.postRoleName</td><td  >PostPermissionsRequestModel</td><td  >POST<br/>
permissions</td><td  >PostPermissionsResponseModel()</td></tr>
<tr><td  >・name：変更計画名称<br/>
・version：バージョン<br/>
・status：'Pending'<br/>
・Notes：フリーテキスト</td><td  >changePlanService.postChangePlan</td><td  >PostChangePlanRequestModel</td><td  >POST<br/>
changeplans/records</td><td  >PostChangePlanResponseModel()</td></tr>
<tr><td  ></td><td  >changePlanService.postChangePlanExecute</td><td  ></td><td  >POST<br/>
changeplans/execute/企業コード＋ユーザーID＋タイムスタンプ</td><td  >PostChangePlanResponseModel()</td></tr>


<tr><td  colspan="1" rowspan="5" >3</td><td  colspan="1" rowspan="5" >アクセス権限更新処理</td><td  colspan="1" rowspan="5" >AccessAuthorityRegistration<br/>/Csv</td><td  >・name：名称：企業コード＋ユーザーID＋タイムスタンプ<br/>
・status：'Draft'"
</td><td  colspan="1" rowspan="5" >accessInfoCsv</td><td  >changePlanService.postChangePlan</td><td   >PostChangePlanRequestModel</td><td  >POST<br/>
changeplans/records</td><td  colspan="1" rowspan="5" >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td >PostChangePlanResponseModel()</td><td  colspan="1" rowspan="5" ></td></tr>
<tr><td  >・authorityList1～9: 権限リスト1～9<br/>
・authorityName1～9: 権限名1～9<br/>
・name: <br/>
・defaultValue: 権限名<br/>
・Deleted: true<br/></td><td  >permissionsService.deleteRoleName</td><td  >PostPermissionsRequestModel</td><td  >POST<br/>
permissions</td><td  >PostPermissionsResponseModel()</td></tr>
<tr><td  >・authorityList1～9: 権限リスト1～9<br/>
・authorityName1～9: 権限名1～9<br/>
・name: <br/>
・defaultValue: 権限名<br/>
・Deleted: false<br/></td><td  >permissionsService.postRoleName</td><td  >PostPermissionsRequestModel</td><td  >POST<br/>
permissions</td><td  >PostPermissionsResponseModel()</td></tr>
<tr><td  >・name：変更計画名称<br/>
・version：バージョン<br/>
・status：'Pending'<br/>
・Notes：フリーテキスト</td><td  >changePlanService.postChangePlan</td><td  >PostChangePlanRequestModel</td><td  >POST<br/>
changeplans/records</td><td  >PostChangePlanResponseModel()</td></tr>

<tr><td  ></td><td  >changePlanService.postChangePlanExecute</td><td  ></td><td  >POST<br/>
changeplans/execute/企業コード＋ユーザーID＋タイムスタンプ</td><td  >PostChangePlanResponseModel()</td></tr>

<tr><td  colspan="1" rowspan="4" >4</td><td  colspan="1" rowspan="4" >アクセス権限更新処理</td><td  colspan="1" rowspan="4" >AccessAuthorityRegistration<br/>/Edit</td><td  >・name：名称：企業コード＋ユーザーID＋タイムスタンプ<br/>
・status：'Draft'</td><td  colspan="1" rowspan="4" >accessInfoEdit</td><td  >changePlanService.<br/>
postChangePlan</td><td   >PostChangePlanRequestModel</td><td  >POST<br/>
changeplans/records</td><td  colspan="1" rowspan="4" >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td >PostChangePlanResponseModel()</td><td  colspan="1" rowspan="4" ></td></tr>
<tr><td  >・authority: 権限<br/>
・authorityName: 権限名<br/>
・authorityOldName: 権限旧名<br/>
・name: <br/>
・defaultValue: 権限名<br/>
・Deleted: false</td><td  >permissionsService.postRoleName</td><td  >PostPermissionsRequestModel</td><td  >POST<br/>
permissions</td><td  >PostPermissionsResponseModel()</td></tr>
<tr><td  >・name：変更計画名称<br/>
・version：バージョン<br/>
・status：'Pending'<br/>
・Notes：フリーテキスト</td><td  >changePlanService.postChangePlan</td><td  >PostChangePlanRequestModel</td><td  >POST<br/>
changeplans/records</td><td  >PostChangePlanResponseModel()</td></tr>
<tr><td  ></td><td  >changePlanService.postChangePlanExecute</td><td  ></td><td  >POST<br/>
changeplans/execute/企業コード＋ユーザーID＋タイムスタンプ</td><td  >PostChangePlanResponseModel()</td></tr>


</table>



#### ２．２．２．電子ジャーナル設定監査レポート出力部屋情報サブ設定
| No  | 処理内容                                 | URL<br/>（Front-end）            | 入力パラメータ                                                                                                                                                                                                                 | controller            | service                                   | リクエストモデル                                                       | URI<br/>（MS）                      | 戻り値判定                                                                                                                                                                                                                                                                                                                                                     | レスポンスモデル                            | 備考 |
| --- | ---------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ----------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ---- |
| 1   | レジ番号取得                             | Audit<br/>/Endpoint              | ・nodeIds：企業コード（15桁）＋店舗コード（6桁）配列<br/>                                                                                                                                                                      | getEndpoint           | devicesService.postDevicesQuery           | PostDevicesQueryRequestParamModel<br/>PostDevicesQueryRequestBodyModel | POST<br/>devices/query              | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:200以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10）                                                         | PostDevicesQueryResponseModel()             |      |
| 2   | POSレポート取得                          | Audit<br/>/PosReport             | ・reportName: レポート名<br/>・reportFormat: 'JSON'<br/>・storeName: 店舗名<br/>・endpointId: エンドポイント ID<br/>・duration: 期間<br/>・auditCategory: 監査カテゴリ                                                         | priceChangeSearch     | totalizerService.postTotalizerReport      |                                                                        | POST<br/>totalizer/report           | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:200以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10）                                                         | PostTotalizerReportResponseModel()          |      |
| 3   | POSレポート取得２                        | Audit<br/>/PosReport2            | ・reportName: レポート名<br/>・reportFormat: 'PDF'<br/>・storeName: 店舗名<br/>・endpointId: エンドポイント ID<br/>・duration.from: 開始自動入力要求日<br/>・duration.to: 終了自動入力要求日<br/>・auditCategory: 監査カテゴリ | PosReport2            | totalizerService.postTotalizerReportPdf   |                                                                        | POST<br/>totalizer/report           | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:200以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10）                                                         | PostTotalizerReportPdfResponseModel()       |      |
| 4   | 部屋情報マスタ取得（テーブルマスタ設定） | Audit<br/>/RestaurantsTableQuery | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/>・IndexNo: 0<br/>・orderBy：'IndexNo'<br/>・ascending：true<br/>・startIndex：0<br/>・batchSize：0<br/>・getTableExistsInRoomInfo: true                                    | restaurantsFloorQuery | restaurantsService.RestaurantsTableQuery2 | PostRestaurantsQueryRequestParamModel                                  | POST<br/>restaurants/mc_ftbl/query  | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:200以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10）                                                         | RestaurantsCommonResponseModel()            |      |
| 5   | 商品分類階層設定検索処理                 | Audit<br/>/divisionInfoSearch    | ・nodeId：企業コード（15桁）＋店舗コード（6桁）                                                                                                                                                                                | divisionInfoSearch    | configurationsService.getNodesNodeId      | GetConfigurationsNodesNodeIdRequestModel                               | GET<br/>configurations/nodes/nodeId | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:204･･･データ無し（応答コード：2）<br/>・statusCode:200と204以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10） | GetConfigurationsNodesNodeIdResponseModel() |      |

#### ２．２．３．従業員コード印字
| No  | 処理内容                | URL<br/>（Front-end）           | 入力パラメータ                                  | controller                | service                                        | リクエストモデル | URI<br/>（MS）                                  | 戻り値判定                                                                                                                                                                                                                                                                                             | レスポンスモデル             | 備考 |
| --- | ----------------------- | ------------------------------- | ----------------------------------------------- | ------------------------- | ---------------------------------------------- | ---------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | ---- |
| 1   | 暗号化POSパスワード取得 | Authorization<br/>/EncodepwdGet | ・nodeId：企業コード（15桁）＋店舗コード（6桁） | authorizationEncodepwdGet | authorizationService.AuthorizationEncodepwdGet |                  | POST<br/>authorization/users/retrieve_encodepwd | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:200以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10） | RentalsUpdateResponseModel() |      |

#### ２．２．４．共通処理
| No  | 処理内容                    | URL<br/>（Front-end）          | 入力パラメータ                                                                                                        | controller        | service                            | リクエストモデル                       | URI<br/>（MS）                                 | 戻り値判定                                                                                                                                                                                                                                                                                                                                                     | レスポンスモデル                          | 備考 |
| --- | --------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------------------------- | -------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---- |
| 1   | 店舗マスタ検索処理          | CommonDesign<br/>/stores       | ・changePlanName：プラン名<br/>・filter：'ALL'<br/>・batchSize：0<br/>・excludeFields：true<br/>・nodeNames：ノード名 | storeSearch       | configurationsService.getNodesList | GetConfigurationsNodesListRequestModel | GET<br/>configurations/nodes/list              | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:204･･･データ無し（応答コード：2）<br/>・statusCode:200と204以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10） | GetConfigurationsNodesListResponseModel() |      |
| 2   | 店舗マスタ検索処理          | CommonDesign<br/>/storesNoAuth | ・changePlanName：プラン名<br/>・filter：'ALL'<br/>・batchSize：0<br/>・excludeFields：true<br/>・nodeNames：ノード名 | storeSearchNoAuth | configurationsService.getNodesList | GetConfigurationsNodesListRequestModel | GET<br/>configurations/nodes/list              | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:204･･･データ無し（応答コード：2）<br/>・statusCode:200と204以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10） | GetConfigurationsNodesListResponseModel() |      |
| 3   | 店舗グループマスタ検索処理  | CommonDesign<br/>/storegroups  |                                                                                                                       | storeGroupSearch  | commonDesignService.getStoreGroups |                                        | GET<br/>corporate-store-management/storegroups | ■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10）                                                                                                                                                                                    | GetStoreGroupResponseModel()              |      |
| 4   | ヘルプ用PDFファイル取得処理 | CommonDesign<br/>/Helppdf      | ・helpPdfFileName：pdfファイル名                                                                                      | createHelpPdf     | commonDesignService.getHelpPdf     | GetHelpPdfNameResponseModel            | GET<br/>corporate-store-management/helppdf     | ■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10）                                                                                                                                                                                    | GetHelpPdfResponseModel()                 |      |

#### ２．２．５．プリセットマスタ設定
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    >リクエスト</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>

<tr><td  >1</td><td  >配置ノードリストを取得</td><td  >Configuration<br/>
/NodesList</td><td  >・changePlanName：変更計画名<br/>
・nodeNames：ノード名<br/>
・filter：返す結果のタイプ<br/>
・batchSize：フェッチレコード数<br/>
・excludeFields：フィールド除外<br/>
・fallthrough：変更計画から移行<br/></td><td  >getNodeList</td><td  >configurationsService.<br/>
getNodesList</td><td  >GetConfigurationsNodesListRequestModel()</td><td  >GET<br/>
configurations/nodes/list</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >GetConfigurationsNodesListResponseModel()</td><td ></td></tr>


<tr><td  >2</td><td  >配置ノードリスト詳細</td><td  >Configuration<br/>
/NodeDetail</td><td  >・nodeId：企業コード<br/></td><td  >getPresetCatalogDetails</td><td  >configurationsService.<br/>
getNodesNodeId</td><td  >ConfigurationNodeRequest()</td><td  >GET<br/>
configurations/nodes</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >GetConfigurationsNodesNodeIdResponseModel()</td><td ></td></tr>
</table>

#### ２．２．６．企業マスタ登録
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    >リクエスト</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>

<tr><td  >1</td><td  >企業マスタ検索処理</td><td  >CorporateMaster<br/>
/ConfigurationSearch</td><td  >・nodeId：企業コード<br/></td><td  >corporateSearch</td><td  >configurationsService.<br/>
getNodesNodeId</td><td  >GetCorporateRequestRcvModel()</td><td  >GET<br/>
configurations/nodes</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >GetConfigurationsNodesNodeIdResponseModel()</td><td ></td></tr><tr><td  >2</td><td  >企業マスタ検索処理</td><td  >CorporateMaster<br/>
/ConfigurationsAllSearch</td><td  >・changePlanName：名称：企業コード＋ユーザーID＋タイムスタンプ<br/>
・filter：'ALL'<br/>
・excludeFields：true<br/>
・nodeNames：'CLOUDPOS'<br/>
・batchSize：0</td><td  >corporateAllSearch</td><td  >configurationsService.<br/>
getNodesList</td><td  >GetConfigurationsNodesListRequestModel()</td><td  >GET<br/>
configurations/nodes/list</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >GetConfigurationsNodesListResponseModel()</td><td ></td></tr><tr><td   colspan="1" rowspan="9" >3</td><td   colspan="1" rowspan="9" >企業マスタ更新処理</td><td   colspan="1" rowspan="9" >CorporateMaster<br/>
/CorporateInfoRegist</td><td  >・name：名称：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ<br/>
・status：'Draft'</td><td   colspan="1" rowspan="9" >corporateInfoRegist</td><td  >changePlanService.<br/>
postChangePlan</td><td   colspan="1" rowspan="9" >PutCorporateRequestRcvModel()</td><td  >POST<br/>
changeplans/records/{changeplanName}</td><td   colspan="1" rowspan="9" >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td   colspan="1" rowspan="9" >PutCorporateResponseModel()</td><td   colspan="1" rowspan="9" ></td></tr><tr><td  >・changePlanName：名称：企業コード＋ユーザーID＋タイムスタンプ<br/>
・nodeId：企業コード</td><td  >configurationsService.<br/>
postNodesNodeId</td><td  >POST<br/>
configurations/nodes</td></tr><tr><td  >・changePlanName：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ<br/>
・name：企業コード<br/>
・parentName：親コード<br/>
・displayName：企業名称<br/>
・storeGroup1：店舗グループ１<br/>
・storeGroup2：店舗グループ２<br/>
・addr：郵便番号<br/>
・address1：住所<br/>
・phone：電話番号<br/>
・fax：FAX番号<br/>
・operationForm：運用形態<br/>
・displayOrder：表示順<br/>
・locale：固定の項目<br/>
　・defaultValue："The currently configured default locale."<br/>
　・type："key"<br/>
　・name："LOCALE"<br/>
　・value："ja-JP"<br/>
　・group："STORE"<br/>
　・subGroup："INFO"<br/>
・timezone：固定の項目<br/>
　・defaultValue："Defines the timezone for the node."<br/>
　・type："key"<br/>
　・name："TIMEZONE"<br/>
　・value："Asia/Tokyo"<br/>
　・group："STORE_OPEARATIONS"<br/>
　・subGroup："CONFIG"<br/>
・catalogModel：固定の項目<br/>
　・group："TSTORE_OPERATIONS"<br/>
　・subGroup："CONFIG"<br/>
　・type："List"<br/>
　・entryType："Text"<br/>
　・inherited：false<br/>
　・name："CATALOG"<br/>
　・value：CommonValueOrderModelリスト<br/>
・pricelistsModel： プライスリスト<br/>
　・group："STORE_OPERATIONS"<br/>
　・subGroup："CONFIG"<br/>
　・type："Map"<br/>
　・inherited：false<br/>
　・name："PRICE_LISTS"<br/>
　・value：ConfigurationsPriceExtendsModel<br/>
　・extends：true<br/>
　・list：ConfigurationsPriceExtendsDetailModelリスト<br/>
・PRICE_LISTS　<br/>
　・pricelistsName：<br/>
　　・order：0<br/>
　　・priceListName：店舗コード<br/>
・BUSINESS_DAY_START_TIME_MAP：固定項目<br/>
　・group："CASH-MANAGEMENT"<br/>
　・subGroup："CONFIG"<br/>
　・type："key"<br/>
　・inherited：false<br/>
　・name："BUSINESS_DAY_START_TIME"<br/>
・BUSINESS_DAY_SOFT_END_TIME：固定項目<br/>
　・group："CASH-MANAGEMENT"<br/>
　・subGroup："CONFIG"<br/>
　・type："key"<br/>
　・inherited：false<br/>
　・name："BUSINESS_DAY_SOFT_END_TIME"<br/>
・BUSINESS_DAY_HARD_END_TIME：固定項目<br/>
　・group："CASH-MANAGEMENT"<br/>
　・subGroup："CONFIG"<br/>
　・type："key"<br/>
　・inherited：false<br/>
　・name："BUSINESS_DAY_HARD_END_TIME"<br/>
</td><td  >configurationsService.<br/>
postNodes</td><td  >POST
configurations/nodes</td></tr><tr><td  >・nodeId：企業コード<br/>
・type："key"<br/>
・displayName：表示名称<br/>
・taxType：税種別<br/>
・jurisdictionName：権限名<br/>
・taxSource：税元<br/>
・jurisdictionType：権限<br/>
・rate：税率<br/>
・originalTaxSource：提供元税率<br/>
・rateType：税率種別<br/>
・indicator：表示器<br/>
・name：名称<br/>
・taxMark：税マーク<br/>
・version：バージョン<br/>
・lastModifiedTimestamp：最終修正時のタイムスタンプ<br/>
・createTimestamp：作成時のタイムスタンプ<br/>
・roundingMode：丸めモード<br/>
・startDateTime：開始日時<br/>
・taxSet：税率設定<br/>
・reducedTax：减税<br/>
・changePlan：変更計画<br/>



</td><td  >taxTaxesService.<br/>
updateTaxTaxes</td><td  >POST<br/>
tax/sets/{nodeId}/taxes</td></tr><tr><td  >・name：名称<br/>
・version：バージョン<br/>
・status：'Pending'<br/>
・Notes：フリーテキスト</td><td  >changePlanService.<br/>
postChangePlan</td><td  >POST<br/>
changeplans/records/{changeplanName}</td></tr><tr><td  >・changePlanNameUnitCdStr：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ</td><td  >changePlanService.<br/>
postChangePlanExecute</td><td  >POST<br/>
changeplans/execute</td></tr><tr><td  >・userId：ユーザID(50桁)<br/>
・name：名称(20バイト)<br/>
・passwordUpdateFlg：パスワード更新フラグ(最小値0,最大値1)<br/>
・password：パスワード<br/>
・passwordChangeDate: 0<br/>
・passwordExpirationDate：パスワード有効期限(最小値1,最大値99)<br/>
・passwordErrors: 0<br/>
・belongStoreCd：所属店舗コード<br/>
・headquartersPermission：本部権限最小値0,最大値1)<br/>
・chargeStoreCds：担当店舗情報<br/>
・id：ユーザID<br/>
・version：バージョン<br/>
・amountOff：値引<br/>
・percentOff：割引<br/>
・salesChange：：売変<br/>
・cancellation取引中止<br/>
・deposit：入金<br/>
・withdrawal：出金<br/>
・changeReserve：釣銭準備金入力<br/>
・changeMachineInventoryCheck：釣銭機在高点検<br/>
・changeMachineRemaining：入金機回収<br/>
・changeMachineConnectDisconnect：釣銭機接続／切離<br/>
・report：レポート<br/>
・transactionSearch：取引検索<br/>
・registerMinus：レジマイナス<br/>
・returnValue：返品<br/>
・audit：監査<br/>
・calculate：清算<br/>
・exchange：両替権限<br/>
・amountInput：手持在高入力<br/>
・oesProg：プログラム送信<br/>
・oesSet：設定送信<br/>
・partCorrcet：一部訂正<br/>
・tendCorrcet：締め訂正<br/>
・unpaidDelete：未会計オ一ダ`一取消<br/>
・oesTime：時刻同期<br/>
・username：責任者No.<br/>
・accessAuthority：accessAuthority<br/>
・posPrintingName：POS印字名称<br/>
・posPassword：POSパスワード<br/>
・posUserName：責任者No.<br/>

</td><td  >authorizationService.<br/>
postUsers</td><td  >POST<br/>
authorization/users</td></tr><tr><td  >・userId：ユーザID(50桁)権限ありの場合<br/>
・nodeId：企業コード権限なしの場合<br/>
・homeStore:false</td><td  >authorizationService.<br/>
postUsersRoles</td><td  >POST<br/>
authorization/users/roles</td></tr><tr><td  >・nodeId：企業コード権限なしの場合<br/>
・message_1：'エアコン'<br/>
・message_2：'カラオケ機器'<br/>
・message_3：'アンプ'<br/>
・message_4：'スピーカー'<br/>
・message_5：'モニター'<br/>
・message_6：'周辺機器'<br/>
・message_7：'異臭'<br/>
・message_8：'ルーム内破損'<br/>
・message_9：'その他'</td><td  >failureReasonService.<br/>
updateFailureReason</td><td  >POST<br/>
rentals-failure/failure-reason</td></tr><tr><td   colspan="1" rowspan="3" >4</td><td   colspan="1" rowspan="3" >企業マスタ削除処理</td><td   colspan="1" rowspan="3" >CorporateMaster<br/>
/CorporateInfoDeleted</td><td  >・nodeId：企業コード</td><td   colspan="1" rowspan="3" >corporateInfoDeleted</td><td  >presetMasterService.<br/>
deletePresetFolder</td><td   colspan="1" rowspan="3" >DeleteCorporateRequestRcvModel()</td><td  >POST<br/>
presets/folder</td><td   colspan="1" rowspan="3" >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td   colspan="1" rowspan="3" >DeleteCorporateResponseModel()</td><td   colspan="1" rowspan="3" ></td></tr><tr><td  >・username：企業コード</td><td  >authorizationService.<br/>
postUsersDeleteUser</td><td  >DELETE<br/>
authorization/users/delete-user</td></tr><tr><td  >・userId：ユーザID(50桁)<br/>
・nodeId：SYSTEM</td><td  >authorizationService.<br/>
postUsersDeleteRoles</td><td  >DELETE<br/>
authorization/users/delete-roles</td></tr>

</table>

#### ２．２．７．企業マスタ登録
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    >リクエスト</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>


<tr><td  >1</td><td  >ファイルの入力(IMPORT)</td><td  >CsvConversionTasks<br/>
/Import</td><td  >・file：''<br/>
・companyCode：企業コード<br/>
・productClassificationNumber：''<br/>
・fileName：ファイル名<br/>
・targetCollection：''<br/>
・storeCode：個店：「企業ｺｰﾄﾞ/店舗ｺｰﾄﾞ」フォルダ、共有：「企業ｺｰﾄﾞ」フォルダ<br/>
・taskId：''</td><td  >CsvConversionImport</td><td  >CsvConversionTasksService.<br/>
CsvConversionExecuteSub</td><td  >MultipartFile()</td><td  >POST<br/>
csv-conversion/tasks/{taskId}/execute</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >CsvConversionCommonResponseModel()</td><td ></td></tr><tr><td  >2</td><td  >ファイルの出力(EXPORT)</td><td  >CsvConversionTasks<br/>
/Export</td><td  >・companyCode：企業コード<br/>
・productClassificationNumber：''<br/>
・targetCollection：''<br/>
・storeCode：個店：「企業ｺｰﾄﾞ/店舗ｺｰﾄﾞ」フォルダ、共有：「企業ｺｰﾄﾞ」フォルダ<br/>
・taskId：''</td><td  >CsvConversionExport</td><td  >CsvConversionTasksService.<br/>
CsvConversionExecuteSub</td><td  >Map<String, Object>()</td><td  >POST<br/>
csv-conversion/tasks/{taskId}/execute</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >CsvConversionCommonResponseModel()</td><td ></td></tr>
</table>

#### ２．２．８．データクリア
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    >リクエスト</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>
<tr><td  >1</td><td  >データクリアテーブル取得処理</td><td  >DataClear<br/>
/DataClearTable</td><td  >・storeCd：店舗コード<br/> 
・tableCategory：テーブル種別</td><td  >dataClearTable</td><td  >dataManagementService.<br/>
getNodesList</td><td  >GetDataClearTableRequestModel()</td><td  >GET<br/>
data-management/clearers/{nodeId}/list?type=</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >GetDataManagementTableListResponseModel()</td><td ></td></tr><tr><td  >2</td><td  >データクリアテーブル削除処理</td><td  >DataClear<br/>
/DeleteDataClearTable</td><td  >・storeCd：店舗コード
・tableCategory：テーブル種別</td><td  >deleteDataClearTable</td><td  >dataManagementService.<br/>
deleteNodesList</td><td  >GetDataClearTableRequestModel()</td><td  >GET<br/>
data-management/clearers/{nodeId}?type=</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >DeleteDataManagementTableListResponseModel()</td><td ></td></tr>

</table>

#### ２．２．９．店舗マスタコピー
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    >リクエスト</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>
<tr><td  >1</td><td  >店舗マスタコピー処理</td><td  >DataManagements<br/>
/CopyStoreMaster</td><td  >・snodeId：コピー元店舗のID（ノードID）です<br/>
・dnodeId：コピー先店舗のID（ノードID）です<br/>
・updateMode：更新方法を示す整数値です(1: 追加のみ 2: 追加と更新 3: 元データ削除して追加)<br/>
・catalogsFlg：商品マスタの更新フラグです<br/>
・pricelistsFlg：売価変更マスタ更新フラグです<br/>
・barcodeFlg：バーコードフラグ設定更新フラグです<br/>
・tranNameFlg：取引別名称設定更新フラグです<br/>
・stampFlg：収入印紙一括納付設定更新フラグです<br/>
・storeOpeFlg：店舗運用設定更新フラグです<br/>
・hourzoneFlg：時間帯設定更新フラグです<br/>
・devicesFlg：金種設定更新フラグです<br/>
・opBtnFlg：操作ボタン設定更新フラグです<br/>
・payBtnFlg：締めボタン設定更新フラグです<br/>
・prdDivFlg：商品分類階層設定更新フラグです<br/>
・ticketFlg：券種マスタ更新フラグです<br/>
・weekdayDivFlg：曜日区分マスタ更新フラグです<br/>
・calendarFlg：カレンダマスタ更新フラグです<br/>
・roomcourseFlg：ルームコースマスタ更新フラグです<br/>
・drinkcourseFlg：ドリンクコースマスタ更新フラグです<br/>
・roomRateFlg：ルームコース料金マスタ更新フラグです<br/>
・ticketFlg：券種マスタ更新フラグです<br/>
・roomRelationFlg：部屋関連情報更新フラグです<br/>
・roomFlg：部屋情報更新フラグです<br/>
・roomsubFlg：部屋情報サブ更新フラグです<br/>
・complianceFlg：コンプライアンス情報マスタ更新フラグです<br/>
・restmcSysFixFlg：飲食システム管理固定マスタ更新フラグです<br/>
・restmcSysChgFlg：飲食システム管理可変マスタ更新フラグです<br/>
・restmcFscpFlg：飲食SCPマスタ更新フラグです<br/>
・restmcFhinpFlg：飲食情報部マスタ更新フラグです<br/>
・restmcFfloorFlg：飲食フロアマスタ更新フラグです<br/>
・restmcFtblFlg：飲食テーブルマスタ更新フラグです<br/>
・restmpDishupFlg：飲食ディッシュアップマスタ更新フラグです<br/>
・restmpPossysopFlg：飲食POSシステムオプションマスタ更新フラグです<br/>
・restmoOessysopFlg：飲食OESシステムオプションマスタ更新フラグです<br/>
・restmoKcpsysopFlg：飲食KCPシステムオプションマスタ(KCP単位)更新フラグです<br/>
・restmoKdsysopFlg：飲食KDシステムオプションマスタ(KD単位)更新フラグです<br/>
・restmoFccpFlg：飲食CCPフォーマットマスタ更新フラグです<br/>
・restmoFkpFlg：飲食KPフォーマットマスタ更新フラグです<br/>
・restmoFnerrmFlg：飲食STNエラーメッセージマスタ更新フラグです<br/>
・restmoFkcpsepFlg： Boolean<br/>
・restmcFkkbFlg： Boolean<br/>
・restmoSgosysopFlg： Boolean<br/>
・recpImageFlg： Boolean<br/>
・recpSettingFlg： Boolean<br/>
・restmpShopFlg： Boolean</td><td  >postStoreMasterCopy</td><td  >dataManagementService.<br/>
copyStoreMaster</td><td  >PostStoreMasterCopyRequestModel()</td><td  >POST<br/>
data-management/copy-store-master</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >PostStoreMasterCopyResponseModel()</td><td ></td></tr>
</table>

#### ２．２．１０．データ保持設定
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    >リクエスト</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>
<tr><td  >1</td><td  >データ保持設定情報</td><td  >DataManagement/DataRetentionSettings<br/>
/Query</td><td  >・groupName：グループ名


</td><td  >getMaintainData</td><td  >dataMgmtservice.<br/>
getMaintainData</td><td  >GetDataRetentionSettingsModel()</td><td  >POST<br/>
data-management/data-retention-settings/{groupName}</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >GetDataRetentionSettingsResponseModel()</td><td ></td></tr><tr><td  >2</td><td  >データ保持設定情報更新</td><td  >DataManagement/DataRetentionSettings<br/>
/Update</td><td  >・nodeId：データID<br/>
・groupName：グループ名<br/>
・nodeRetentionPeriod：ノード保持期間

</td><td  >updateMaintainData</td><td  >dataMgmtservice.<br/>
updateMaintainData</td><td  >UpdateDataRetentionSettingsModel()</td><td  >POST<br/>
data-management/data-retention-settings/{groupName}/nodes/add</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >DataRetentionSettingsResponseModel()</td><td ></td></tr>
</table>

#### ２．２．１１．端末設定、金種設定
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    >リクエスト</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>
<tr><td  >1</td><td  >端末管理マスタ検索処理</td><td  >DeviceSetting<br/>
/TerminalQuery</td><td  >・storeCd：店舗コード<br/>
・clientId：端末ID(min = 4, max = 4)
</td><td  >terminalQuery</td><td  >devicesService.<br/>
postDevicesQuery</td><td  >GetTerminalManagementRequestModel()</td><td  >GET<br/>
devices/query</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >PostDevicesQueryResponseModel()</td><td ></td></tr><tr><td  >2</td><td  >端末管理マスタ取得処理</td><td  >DeviceSetting<br/>
/TerminalSearch</td><td  >・storeCd：店舗コード<br/>
・clientId：端末ID
</td><td  >terminalSearch</td><td  >devicesService.<br/>
getDevices</td><td  >GetTerminalManagementRequestModel()</td><td  >GET<br/>
devices</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >GetDevicesResponseModel()</td><td ></td></tr><tr><td  >3</td><td  >端末管理マスタ更新処理</td><td  >DeviceSetting<br/>
/TerminalInfoRegist</td><td  >・storeCd：店舗コード<br/>
・clientId：端末ID<br/>
・terminalType：端末種別<br/>
・activeFlag：利用中フラグ<br/>
・connectScanner：接続スキャナ<br/>
・activeFlag：利用中フラグ<br/>
・locale：'ja-JP'<br/>
・uiTheme：'tgcpDesktopMock'<br/>
・name：企業コード(15桁) + 店舗コード(6桁) + 端末コード(4桁)をデバイスIDとして設定<br/>
・deviceName：企業コード(15桁) + 店舗コード(6桁) + 端末コード(4桁)をデバイスIDとして設定<br/>
・nodeId：店舗コード</td><td  >terminalInfoRegist</td><td  >devicesService.<br/>
postDevices</td><td  >PutTerminalManagementRequestModel()</td><td  >PUT<br/>
devices/node/{nodeId}</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >PostDevicesResponseModel()</td><td ></td></tr><tr><td  >4</td><td  >端末管理マスタ削除処理</td><td  >DeviceSetting<br/>
/TerminalInfoRegist</td><td  >・storeCd：店舗コード<br/>
・clientId：端末ID
</td><td  >terminalInfoDelete</td><td  >devicesService.<br/>
deleteDevices</td><td  >DeleteTerminalManagementRequestModel()</td><td  >DELETE<br/>
devices/{deviceId}</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >DeleteDevicesResponseModel()</td><td ></td></tr>
</table>

#### ２．２．１２．電子ジャーナル
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    >リクエスト</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>
<tr><td  >1</td><td  >店舗一覧の取得リクエスト</td><td  >ElectronicJournal<br/>
/EJournalSearch</td><td  >・endpointId：店舗IDセッター<br/>
・businessDateStart：対象日付Start<br/>
・businessDateEnd：対象日付End<br/>
・businessTimeStart：対象時刻Start<br/>
・businessTimeEnd：対象時刻End<br/>
・transactionNoStart：取引No From<br/>
・transactionNoEnd：取引No End<br/>
・offset：offset<br/>
・nodeId：店舗ID</td><td  >eJournalSearch</td><td  >eJournalService.<br/>
searchEJournals</td><td  >GetEJournalSearchRequestModel()</td><td  >POST<br/>receipts-ejournal/search</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >EJournalSearchResponseModel()</td><td ></td></tr><tr><td  >2</td><td  >店舗一覧の保存リクエスト</td><td  >ElectronicJournal<br/>
/EJournalSave</td><td  >・saveData：保存データ</td><td  >eJournalSave</td><td ></td><td  >PostEJournalSaveRequestModel()</td><td  >pdf処理なので、APIを利用してない<br/></td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >EJournalSaveResponseModel()</td><td ></td></tr>
</table>

#### ２．２．１３．締めボタン設定

| No  | 処理内容           | URL<br/>（Front-end）                      | 入力パラメータ                                                                                                       | controller          | service                                 | リクエストモデル                         | URI<br/>（MS）                          | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル                             | 備考 |
| --- | ------------------ | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------- | --------------------------------------- | ---------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ---- |
| 1   | 締めボタン設定処理 | EndButtonSetting<br/> /UpdateConfiguration | ・nodeId:企業コード（15桁）<br/> ・name:企業コード＋ユーザーID＋タイムスタンプ<br/> ・status:'Draft'                 | updateConfiguration | changePlanService.postChangePlan        | PostChangePlanRequestModel               | POST<br/> changeplans/records           | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                |      |
| 2   | 締めボタン設定処理 | EndButtonSetting<br/> /UpdateConfiguration | ・nodeId:企業コード（15桁）<br/> ・changePlanName:企業コード＋ユーザーID＋タイムスタンプ                             | updateConfiguration | configurationsService.postNodesNodeId   | PostConfigurationsNodesRequestParamModel | POST<br/> configurations/nodes/{nodeId} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostConfigurationsNodesNodeIdResponseModel() |      |
| 3   | 締めボタン設定処理 | EndButtonSetting<br/> /UpdateConfiguration | ・nodeId:企業コード（15桁）<br/> ・changePlanName:企業コード＋ユーザーID＋タイムスタンプ                             | updateConfiguration | configurationsService.postNodes         | PostConfigurationsNodesRequestParamModel | POST<br/> configurations/nodes          | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostConfigurationsNodesResponseModel()       |      |
| 4   | 締めボタン設定処理 | EndButtonSetting<br/> /UpdateConfiguration | ・name:企業コード＋ユーザーID＋タイムスタンプ<br/> ・version:バージョン<br/> ・status:'Pending'<br/> ・notes：ノート | updateConfiguration | changePlanService.postChangePlan        | PostChangePlanRequestModel               | POST<br/> changeplans/records           | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                |      |
| 5   | 締めボタン設定処理 | EndButtonSetting<br/> /UpdateConfiguration | ・changePlanName:企業コード＋ユーザーID＋タイムスタンプ                                                              | updateConfiguration | changePlanService.postChangePlanExecute |                                          | POST<br/> changeplans/execute           | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                |      |

#### ２．２．１４．ログイン

| No  | 処理内容                                     | URL<br/>（Front-end）        | 入力パラメータ                                                                      | controller       | service                                | リクエストモデル                            | URI<br/>（MS）                          | 戻り値判定                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | レスポンスモデル                               | 備考 |
| --- | -------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------- | ---------------- | -------------------------------------- | ------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---- |
| 1   | ログイン処理                                 | Login<br/> /UserLogin        | ・username：ユーザ名<br/> ・password：パスワード                                    | userLogin        | authorizationService.postLogin         | PostAuthorizationLoginRequestModel          | POST<br/> authorization/login           | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:401･･･パスワード有効期限切れ（応答コード：5）<br/> ・statusCode:401･･･パスワードロック（応答コード：statusCode）<br/> ・statusCode:403･･･認証失敗（応答コード：statusCode）<br/> ・statusCode:400･･･パスワード有効期限切れ（応答コード：-98）<br/> ・statusCode:400･･･パスワード有効期限切れ以外（応答コード：statusCode）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostAuthorizationLoginResponseModel()          |      |
| 2   | ログイン処理                                 | Login<br/> /UserLogin        |                                                                                     | userLogin        | authorizationService.postUsersRetrieve | PostAuthorizationUsersRetrieveRequestModel  | POST<br/> authorization/users/retrieve  | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                                                                                                                                                                                                                                                          | PostAuthorizationUsersRetrieveResponseModel()  |      |
| 3   | ログイン処理                                 | Login<br/> /UserLogin        |                                                                                     | userLogin        | configurationsService.getNodesNodeId   | GetConfigurationsNodesNodeIdRequestModel    | POST<br/> configurations/nodes/{nodeId} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                                                                                                                                                                                                                                                          | GetConfigurationsNodesNodeIdResponseModel()    |      |
| 4   | ログイン処理                                 | Login<br/> /UserLogin        |                                                                                     | userLogin        | permissionsService.getList             | GetAccessAuthorityRequestModel              | GET<br/> permissions/query?roleNames=   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                                                                                                                                                                                                                                                          | GetAccessAuthorityResponseModel()              |      |
| 5   | パスワード更新処理                           | Login<br/> /PwUpdate         | ・username：ユーザ名<br/> ・password：旧パスワード<br/> ・newPassword：新パスワード | pwUpdate         | authorizationService.postPwUpdate      | PostAuthorizationLoginRequestModel          | POST<br/> authorization/login           | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:401･･･パスワード有効期限切れ（応答コード：5）<br/> ・statusCode:401･･･パスワード有効期限切れ以外（応答コード：statusCode）<br/> ・statusCode:403･･･認証失敗（応答コード：statusCode）<br/> ・statusCode:400･･･異常（応答コード：-98）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                                                      | PostAuthorizationLoginResponseModel()          |      |
| 6   | 最新ニュース、メンテナンスのお知らせ表示処理 | Login<br/> /GetCommonDisplay |                                                                                     | getCommonDisplay | authorizationService.postLogin         | PostAuthorizationLoginRequestModel          | POST<br/> authorization/login           | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:401･･･パスワード有効期限切れ（応答コード：5）<br/> ・statusCode:401･･･パスワードロック（応答コード：statusCode）<br/> ・statusCode:403･･･認証失敗（応答コード：statusCode）<br/> ・statusCode:400･･･パスワード有効期限切れ（応答コード：-98）<br/> ・statusCode:400･･･パスワード有効期限切れ以外（応答コード：statusCode）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostAuthorizationLoginResponseModel()          |      |
| 7   | 最新ニュース、メンテナンスのお知らせ表示処理 | Login<br/> /GetCommonDisplay |                                                                                     | getCommonDisplay | configurationsService.getCommonDisplay | PostConfigurationsCommonDisplayRequestModel | GET<br/> configurations/nodes/CLOUDPOS  | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                                                                                                                                                                                                                                                          | PostConfigurationsCommonDisplayResponseModel() |      |

#### ２．２．１５．プリセットマスタ登録

| No   | 処理内容                     | URL<br/>（Front-end）                   | 入力パラメータ | controller              | service                                                 | リクエストモデル | URI<br/>（MS）                                               | 戻り値判定                                                   | レスポンスモデル                                 | 備考 |
| ---- | ---------------------------- | --------------------------------------- | -------------- | ----------------------- | ------------------------------------------------------- | ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------ | ---- |
| 1    | プリセットマスタ取得処理     | PresetMaster<br/> /PresetCatalogDetails |                | getPresetCatalogDetails | presetService.getPresetCatalogDetails                   |                  | GET<br/> presets/catalog/{companyCode}/{storeCode}/{planningId} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:400･･･異常（応答コード：204）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー以外･･･異常（応答コード：-30） | PresetCatalogDetailResponse()                    |      |
| 2    | カタログ更新処理             | PresetMaster<br/> /BarcodeAnalysis      |                | barcodeAnalyze          | barcodeService.barcodeAnalysis                          |                  | POST<br/> barcode-analysis/analyze                           | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | BarcodeAnalysisResponse()                        |      |
| 3    | プリセットマスタ登録処理     | PresetMaster<br/> /Register             |                | regist                  | presetService.createPresetCatalogDetails                |                  | POST<br/> presets/catalog/                                   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー以外･･･異常（応答コード：-30） | PresetCatalogDetailResponse()                    |      |
| 4    | プリセットマスタ削除処理     | PresetMaster<br/> /Delete               |                | delete                  | presetService.deletePreset                              |                  | DELETE<br/> presets/catalog/{planningId}                     | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー以外･･･異常（応答コード：-30） | PresetCatalogDetailResponse()                    |      |
| 5    | プリセットマスタ一覧表示処理 | PresetMaster<br/> /List                 |                | list                    | presetService.listPresets                               |                  | GET<br/> presets/{corpId}?storeCode={storeId}                | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:400･･･異常（応答コード：204）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー以外･･･異常（応答コード：-30） | PresetCatalogListResponse()                      |      |
| 6    | キーワードでアイテム検索処理 | PresetMaster<br/> /SearchItemsKeyword   |                | itemKeywordSearch       | itemService.searchKeyword                               |                  | POST<br/> catalogs/node/{nodeId}/items/query?queryMode=ALL&queryLimit={limit} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー以外･･･異常（応答コード：-30） | ItemKeywordResponse()                            |      |
| 7    | キーワードでアイテム検索処理 | PresetMaster<br/> /SearchItemsKeyword   |                | itemKeywordSearch       | pricelistsService.getPricelistsNodeNodeIdItemsSkuIdList |                  | GET<br/> pricelists/{nodeId}/items/{skuId}                   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:400･･･異常（応答コード：204）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | GetPricelistsNodeNodeIdItemsSkuIdResponseModel() |      |
| 8    | 画像でアイテム検索処理       | PresetMaster<br/> /SearchItemsImage     |                | itemImageSearch         | itemService.searchImages                                |                  | GET<br/> presets/images/{companyCode}?standardStoreCode={storeCode}&planningCode={planningCode} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:400･･･異常（応答コード：204）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー以外･･･異常（応答コード：-30） | ItemImageFileResponse()                          |      |
| 9    | 画像追加処理                 | PresetMaster<br/> /AddImage             |                | addImage                | itemService.addImage                                    |                  | POST<br/> presets/images/{companyCode}?filename={originalFilename} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー以外･･･異常（応答コード：-30） | ItemImageAddAndDeleteResponse()                  |      |
| 10   | 画像削除処理                 | PresetMaster<br/> /DeleteImage          |                | deleteImage             | itemService.deleteImage                                 |                  | DELETE<br/> presets/images/{companyCode}                     | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー以外･･･異常（応答コード：-30） | ItemImageAddAndDeleteResponse()                  |      |

#### ２．２．１６．売価変更

| No   | 処理内容                   | URL<br/>（Front-end）                | 入力パラメータ                                               | controller         | service                                                 | リクエストモデル                                       | URI<br/>（MS）                                  | 戻り値判定                                                   | レスポンスモデル                                     | 備考 |
| ---- | -------------------------- | ------------------------------------ | ------------------------------------------------------------ | ------------------ | ------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------- | ---- |
| 1    | 売価変更No取得処理         | PriceChange<br/> /PriceChangeSearch  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10) | priceChangeSearch  | pricelistsService.getPricelists                         | GetPricelistsRequestModel                              | GET<br/> pricelists                             | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | GetPricelistsResponseModel()                         |      |
| 2    | 売価変更No取得処理         | PriceChange<br/> /PriceChangeSearch  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10) | priceChangeSearch  | pricelistsService.postPricelists                        | PostPricelistsRequestModel                             | POST<br/> pricelists                            | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsResponseModel()                        |      |
| 3    | 売価変更No取得処理         | PriceChange<br/> /PriceChangeSearch  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10) | priceChangeSearch  | pricelistsService.postPricelistsPriceListName           | PostPricelistsPriceListNameRequestParamModel           | POST<br/> pricelists/{priceListName}            | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsPriceListNameResponseModel()           |      |
| 4    | 売価変更No一覧取得処理     | PriceChange<br/> /PriceChangeQuery   | ・nodeId：企業コード（15桁）＋店舗コード（6桁）              | priceChangeQuery   | pricelistsService.getPricelists                         | GetPricelistsRequestModel                              | GET<br/> pricelists                             | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | GetPricelistsResponseModel()                         |      |
| 5    | 売価変更No取得処理（確定） | PriceChange<br/> /PriceChangeSelect  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10) | priceChangeSelect  | pricelistsService.getPricelists                         | GetPricelistsRequestModel                              | GET<br/> pricelists                             | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | GetPricelistsResponseModel()                         |      |
| 6    | 売価変更No取得処理（確定） | PriceChange<br/> /PriceChangeSelect  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10) | priceChangeSelect  | pricelistsService.postPricelists                        | PostPricelistsRequestModel                             | POST<br/> pricelists                            | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsResponseModel()                        |      |
| 7    | 売価変更No取得処理（確定） | PriceChange<br/> /PriceChangeSelect  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10) | priceChangeSelect  | pricelistsService.postPricelistsPriceListName           | PostPricelistsPriceListNameRequestParamModel           | POST<br/> pricelists/{priceListName}            | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsPriceListNameResponseModel()           |      |
| 8    | 売価変更名称変更処理       | PriceChange<br/> /PriceChangeNameSet |                                                              | priceChangeNameSet | pricelistsService.postPricelistsPriceListName           | PostPricelistsPriceListNameRequestParamModel           | POST<br/> pricelists/{priceListName}            | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsPriceListNameResponseModel()           |      |
| 9    | 売価変更No取得処理（確定） | PriceChange<br/> /PriceChangeSelect  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10) | priceChangeSelect  | pricelistsService.postPricelists                        | PostPricelistsRequestModel                             | POST<br/> pricelists                            | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsResponseModel()                        |      |
| 10   | 開始日＆終了日変更処理     | PriceChange<br/> /PriceChangeDateSet | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10)<br/> ・changePlanName: 実行計画名<br/> ・startDate: 売価変更開始日<br/> ・endDate:売価変更終了日 | priceChangeDateSet | pricelistsService.postPricelistsPriceListNameItem       | PostPricelistsPriceListNameItemRequestModel            | POST<br/> pricelists/{priceListName}/items      | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsPriceListNameItemResponseModel()       |      |
| 11   | 商品検索処理               | PriceChange<br/> /ProductSearch      | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10)<br/> ・changePlanName: 実行計画名<br/> ･priceChangeName: 売価変更名称<br/> ･skuId:JANコード<br/> ･startDate:売価変更開始日<br/> ･endDate:売価変更終了日 | productSearch      | catalogsService.getCatalogsCatalogNameItemsItemId       | GetCatalogsCatalogNameItemsItemIdRequestModel          | GET<br/> catalogs/{catalogName}/items/{itemId}  | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | GetCatalogsCatalogNameItemsItemIdResponseModel()     |      |
| 12   | 商品検索処理               | PriceChange<br/> /ProductSearch      | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10)<br/> ・changePlanName: 実行計画名<br/> ･priceChangeName: 売価変更名称<br/> ･skuId:JANコード<br/> ･startDate:売価変更開始日<br/> ･endDate:売価変更終了日 | productSearch      | pricelistsService.postPricelistsPriceListNameItem       | PostPricelistsPriceListNameItemRequestModel            | POST<br/> pricelists/{priceListName}/items      | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsPriceListNameItemResponseModel()       |      |
| 13   | 売価変更処理               | PriceChange<br/> /ProductPriceChange | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10)<br/> ・changePlanName: 実行計画名<br/> ･priceChangeName: 売価変更名称<br/> ･skuId:JANコード<br/> ･price: 新売価<br/> ･productModel: 商品情報<br/> ･startDate:売価変更開始日<br/> ･endDate:売価変更終了日 | productPriceChange | pricelistsService.postPricelistsPriceListNameItem       | PostPricelistsPriceListNameItemRequestModel            | POST<br/> pricelists/{priceListName}/items      | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsPriceListNameItemResponseModel()       |      |
| 14   | 商品削除処理               | PriceChange<br/> /ProductDelete      | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10)<br/> ・changePlanName: 実行計画名<br/> ･priceChangeName: 売価変更名称<br/> ･skuId:JANコード<br/> ･price: 新売価<br/> ･productModel: 商品情報 | productDelete      | pricelistsService.postPricelistsRecordPriceListRecordId | PostPricelistsRecordPriceListRecordIdRequestParamModel | POST<br/> pricelists/record/{pricelistRecordId} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsRecordPriceListRecordIdResponseModel() |      |
| 15   | 商品削除処理               | PriceChange<br/> /ProductDelete      | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10)<br/> ・changePlanName: 実行計画名<br/> ･priceChangeName: 売価変更名称<br/> ･skuId:JANコード<br/> ･price: 新売価<br/> ･productModel: 商品情報 | productDelete      | pricelistsService.postPricelistsPriceListNameItem       | PostPricelistsPriceListNameItemRequestModel            | POST<br/> pricelists/{priceListName}/items      | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsPriceListNameItemResponseModel()       |      |
| 16   | 中止処理                   | PriceChange<br/> /PriceChangeClear   | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10)<br/> ・changePlanName: 実行計画名 | priceChangeClear   | changePlanService.postChangePlanDelete                  |                                                        | POST<br/> changeplans/delete                    | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                        |      |
| 17   | 終了処理                   | PriceChange<br/> /PriceChangeExit    | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10)<br/> ・changePlanName: 実行計画名 | priceChangeExit    | changePlanService.postChangePlanDelete                  |                                                        | POST<br/> changeplans/delete                    | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                        |      |
| 18   | 保存処理                   | PriceChange<br/> /PriceChangeSave    | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10)<br/> ･changePlanName: 実行計画名<br/> ･changePlanVersion: 実行計画 | priceChangeSave    | changePlanService.postChangePlan                        | PostChangePlanRequestModel                             | POST<br/> changeplans/records                   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                        |      |
| 19   | 保存処理                   | PriceChange<br/> /PriceChangeSave    | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10)<br/> ･changePlanName: 実行計画名<br/> ･changePlanVersion: 実行計画 | priceChangeSave    | changePlanService.postChangePlanExecute                 |                                                        | POST<br/> changeplans/execute                   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                        |      |
| 20   | 削除処理                   | PriceChange<br/> /PriceChangeDelete  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10)<br/> ･changePlanName: 実行計画名<br/> ･changePlanVersion: 実行計画 | priceChangeDelete  | changePlanService.postChangePlan                        | PostChangePlanRequestModel                             | POST<br/> changeplans/records                   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                        |      |
| 21   | 削除処理                   | PriceChange<br/> /PriceChangeDelete  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・priceChangeNo: 売価変更No(10)<br/> ･changePlanName: 実行計画名<br/> ･changePlanVersion: 実行計画 | priceChangeDelete  | changePlanService.postChangePlanExecute                 |                                                        | POST<br/> changeplans/execute                   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                        |      |

#### ２．２．１７．商品分類階層設定

| No  | 処理内容                 | URL<br/>（Front-end）                     | 入力パラメータ                                                                                            | controller         | service                                 | リクエストモデル                         | URI<br/>（MS）                          | 戻り値判定                                                                                                                                                                                                                                                                                                                                                         | レスポンスモデル                             | 備考 |
| --- | ------------------------ | ----------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------ | --------------------------------------- | ---------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | ---- |
| 1   | 商品分類階層設定検索処理 | ProductDivisions<br/> /divisionInfoSearch | ・nodeId:企業コード（15桁）＋店舗コード（6桁）                                                            | divisionInfoSearch | configurationsService.getNodesNodeId    | GetConfigurationsNodesNodeIdRequestModel | GET<br/> configurations/nodes/{nodeId}  | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | GetConfigurationsNodesNodeIdResponseModel()  |      |
| 2   | 商品分類階層設定更新処理 | ProductDivisions<br/> /divisionInfoRegist | ・name：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ<br/> ・status：'Draft'                         | divisionInfoRegist | changePlanService.postChangePlan        | PostChangePlanRequestModel               | POST<br/> changeplans/records           | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                     | PostChangePlanResponseModel()                |      |
| 3   | 商品分類階層設定更新処理 | ProductDivisions<br/> /divisionInfoRegist | ・name：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ                                                | divisionInfoRegist | configurationsService.postNodesNodeId   | PostConfigurationsNodesRequestParamModel | POST<br/> configurations/nodes/{nodeId} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                     | PostConfigurationsNodesNodeIdResponseModel() |      |
| 4   | 商品分類階層設定更新処理 | ProductDivisions<br/> /divisionInfoRegist | ・name：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ                                                | divisionInfoRegist | configurationsService.postNodes         | PostConfigurationsNodesRequestParamModel | POST<br/> configurations/nodes          | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                     | PostConfigurationsNodesResponseModel()       |      |
| 5   | 商品分類階層設定更新処理 | ProductDivisions<br/> /divisionInfoRegist | ・name：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ<br/> ・version：'Pending'<br/> ・notes：ノート | divisionInfoRegist | changePlanService.postChangePlan        | PostChangePlanRequestModel               | POST<br/> changeplans/records           | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                     | PostChangePlanResponseModel()                |      |
| 6   | 商品分類階層設定更新処理 | ProductDivisions<br/> /divisionInfoRegist | ・name：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ                                                | divisionInfoRegist | changePlanService.postChangePlanExecute |                                          | POST<br/> changeplans/execute           | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                     | PostChangePlanResponseModel()                |      |

#### ２．２．１８．商品構成マスタ登録

| No  | 処理内容                         | URL<br/>（Front-end）                       | 入力パラメータ                                                                                                                                                                           | controller             | service                                           | リクエストモデル                                    | URI<br/>（MS）                                                                                              | 戻り値判定                                                                                                                                                                                                                                                                                                                                                         | レスポンスモデル                                       | 備考 |
| --- | -------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ---- |
| 1   | 商品構成マスタページング検索処理 | ProductGroupMaster<br/> /ProductQuery/Page  | ・catalogName：カタログ名<br/> ・productClassificationNumber：商品分類番号<br/> ・orderBy：'productClassificationNumber'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0 | productGroupQueryPage  | catalogsService.getCatalogsGroupsCatalogNameItems | GetCatalogsGroupsCatalogNameItemsRequestModel       | GET<br/> catalogs/groups                                                                                    | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | GetCatalogsGroupsCatalogNameItemsResponseModel()       |      |
| 2   | 商品構成マスタ条件検索処理       | ProductGroupMaster<br/> /ProductQuery/limit | ・nodeId:企業コード（15桁）＋店舗コード（6桁）<br/> ・queryMode：クエリモード<br/> ・queryLimit：クエリ制限<br/> ・searchParams：検索パラメータ                                          | productGroupQueryLimit | catalogsService.postCatalogsGroupsQueryLimit      | PostCatalogsCatalogNameGroupsItemsQueryRequestModel | POST<br/> catalogs/{catalogName}/groups/query?nodeId={nodeId}&queryMode={queryMode}&queryLimit={queryLimit} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                     | PostCatalogsCatalogNameGroupsItemsQueryResponseModel() |      |
| 3   | 商品構成マスタ取得処理           | ProductGroupMaster<br/> /ProductSearch      | ・nodeId:企業コード（15桁）＋店舗コード（6桁）<br/> ・productId：商品ID<br/> ・productClassificationNumber：商品分類番号                                                                 | productGroupSearch     | catalogsService.getCatalogsGroupsGroupId          |                                                     | GET<br/> catalogs/{catalogName}/groups/{groupId}                                                            | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | GetCatalogsGroupsGroupIdResponseModel()                |      |
| 4   | 商品構成マスタ更新処理           | ProductGroupMaster<br/> /ProductRegist      | ・name：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ<br/> ・status：'Draft'                                                                                                        | productRegist          | changePlanService.postChangePlan                  | PostChangePlanRequestModel                          | POST<br/> changeplans/records                                                                               | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                     | PostChangePlanResponseModel()                          |      |
| 5   | 商品構成マスタ更新処理           | ProductGroupMaster<br/> /ProductRegist      |                                                                                                                                                                                          | productRegist          | catalogsService.postCatalogsGroupsProductGroup    | PostCatalogsGroupsRequestParamModel                 | POST<br/> catalogs/groups                                                                                   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                     | PostCatalogsGroupsProductGroupResponseModel()          |      |
| 6   | 商品構成マスタ更新処理           | ProductGroupMaster<br/> /ProductRegist      | ・name：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ<br/> ・status：：'Pending                                                                                                     | productRegist          | changePlanService.postChangePlan                  | PostChangePlanRequestModel                          | POST<br/> changeplans/records                                                                               | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                     | PostChangePlanResponseModel()                          |      |
| 7   | 商品構成マスタ更新処理           | ProductGroupMaster<br/> /ProductRegist      | ・name：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ                                                                                                                               | productRegist          | changePlanService.postChangePlanExecute           |                                                     | POST<br/> changeplans/execute                                                                               | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                     | PostChangePlanResponseModel()                          |      |
| 8   | 商品構成マスタ削除処理           | ProductGroupMaster<br/> /ProductDeleted     | ・name：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ<br/> ・status：'Draft'                                                                                                        | productGroupDeleted    | changePlanService.postChangePlan                  | PostChangePlanRequestModel                          | POST<br/> changeplans/records                                                                               | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                     | PostChangePlanResponseModel()                          |      |
| 9   | 商品構成マスタ削除処理           | ProductGroupMaster<br/> /ProductDeleted     | ・name:企業コード＋商品分類番号＋商品ID<br/> ・catalogName:企業コード＋店舗コード＋ユーザーID＋タイムスタンプ<br/> ・deleted：true                                                       | productGroupDeleted    | catalogsService.postCatalogsGroupsProductGroup    | PostCatalogsGroupsRequestParamModel                 | POST<br/> catalogs/groups                                                                                   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                     | PostCatalogsGroupsProductGroupResponseModel()          |      |
| 10  | 商品構成マスタ削除処理           | ProductGroupMaster<br/> /ProductDeleted     | ・name：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ<br/> ・status：'Pending'                                                                                                      | productGroupDeleted    | changePlanService.postChangePlan                  | PostChangePlanRequestModel                          | POST<br/> changeplans/records                                                                               | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                     | PostChangePlanResponseModel()                          |      |
| 11  | 商品構成マスタ削除処理           | ProductGroupMaster<br/> /ProductDeleted     | ・name：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ                                                                                                                               | productGroupDeleted    | changePlanService.postChangePlanExecute           |                                                     | POST<br/> changeplans/execute                                                                               | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                      | PostChangePlanResponseModel()                          |      |
| 12  | 品構成マスタリンク階層取得処理   | ProductGroupMaster<br/> /hierarchy          | ・catalogName：カタログ名<br/> ・groupName：グループ名<br/> ・level：レベル                                                                                                              | productGroupHierarchy  | catalogsService.getCatalogsGroupsHierarchy        | GetCatalogsGroupsHierarchyRequestModel              | GET<br/> catalogs/{catalogName}/groups/hierarchy                                                            | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | GetCatalogsGroupsHierarchyResponseModel()              |      |

#### ２．２．１９．商品マスタ登録

| No   | 処理内容           | URL<br/>（Front-end）                                        | 入力パラメータ                                               | controller        | service                                                 | リクエストモデル                               | URI<br/>（MS）                                               | 戻り値判定                                                   | レスポンスモデル                                  | 備考 |
| ---- | ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------- | ------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------- | ---- |
| 1    | 商品マスタ検索処理 | ProductMaster<br/> /ProductQuery                             | ・nodeId：企業コード（15桁）＋店舗コード（6桁）              | productQuery      | configurationsService.getNodesNodeId                    | GetConfigurationsNodesNodeIdRequestModel       | GET<br/> configurations/nodes/{nodeId}                       | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | GetConfigurationsNodesNodeIdResponseModel()       |      |
| 2    | 商品マスタ検索処理 | ProductMaster<br/> /ProductQuery                             | ・nodeId：企業コード（15桁）＋店舗コード（6桁）              | productQuery      | catalogsService.getCatalogsCatalogNameItems             | GetCatalogsCatalogNameItemsRequestModel        | GET<br/> catalogs/{catalogName}/items                        | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | GetCatalogsCatalogNameItemsResponseModel()        |      |
| 3    | 商品マスタ検索処理 | ProductMaster<br/> /ProductQuery                             | ・nodeId：企業コード（15桁）＋店舗コード（6桁）              | productQuery      | pricelistsService.getPricelistsItems                    | GetPricelistsItemsRequestModel                 | GET<br/> pricelists/items                                    | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | GetPricelistsItemsResponseModel()                 |      |
| 4    | 商品マスタ検索処理 | ProductMaster<br/> /ProductQuery/limit                       | ・nodeId：企業コード（15桁）＋店舗コード（6桁）              | productQueryLimit | configurationsService.queryItemsLimit                   |                                                | POST<br/> catalogs/node/{nodeId}/items/query?queryMode=ALL&queryLimit={limit} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | GetItemsResponseModel()                           |      |
| 5    | 商品マスタ取得処理 | ProductMaster<br/> /ProductSearch                            | ・nodeId：企業コード（15桁）＋店舗コード（6桁）              | productSearch     | catalogsService.getCatalogsCatalogNameItemsItemId       | GetCatalogsCatalogNameItemsItemIdRequestModel  | GET<br/> catalogs/{catalogName}/items/{itemId}               | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | GetCatalogsCatalogNameItemsItemIdResponseModel()  |      |
| 6    | 商品マスタ取得処理 | ProductMaster<br/> /ProductSearch                            | ・nodeId：企業コード（15桁）＋店舗コード（6桁）              | productSearch     | pricelistsService.getPricelistsNodeNodeIdItemsSkuIdList |                                                | GET<br/> pricelists/{nodeId}/items/{skuId}                   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･データなし（応答コード：2）<br/> ・statusCode:400･･･異常（応答コード：204）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | GetPricelistsNodeNodeIdItemsSkuIdResponseModel()  |      |
| 7    | 商品マスタ更新処理 | ProductMaster<br/> /ProductRegist                            |                                                              | productRegist     | changePlanService.postChangePlan                        | PostChangePlanRequestModel                     | POST<br/> changeplans/records                                | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                     |      |
| 8    | 商品マスタ更新処理 | ProductMaster<br/> /ProductRegist                            |                                                              | productRegist     | catalogsService.postCatalogsCatalogNameItems            | PostCatalogsCatalogNameItemsRequestParamModel  | POST<br/> catalogs/{catalogName}/items                       | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostCatalogsCatalogNameItemsResponseModel()       |      |
| 9    | 商品マスタ更新処理 | ProductMaster<br/> /ProductRegist                            |                                                              | productRegist     | pricelistsService.updatePricelistsPriceListNameItem     | PostPricelistsPriceListNameItemRequestModel    | POST<br/> pricelists/record/{Id}?changePlanName={name}       | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsPriceListNameItemResponseModel()    |      |
| 10   | 商品マスタ更新処理 | ProductMaster<br/> /ProductRegist                            |                                                              | productRegist     | pricelistsService.postPricelistsPriceListNameItem       | PostPricelistsPriceListNameItemRequestModel    | POST<br/> pricelists/{priceListName}/items                   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsPriceListNameItemResponseModel()    |      |
| 11   | 商品マスタ更新処理 | ProductMaster<br/> /ProductRegist                            |                                                              | productRegist     | changePlanService.postChangePlan                        | PostChangePlanRequestModel                     | POST<br/> changeplans/records                                | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                     |      |
| 12   | 商品マスタ更新処理 | ProductMaster<br/> /ProductRegist                            |                                                              | productRegist     | changePlanService.postChangePlanExecute                 |                                                | POST<br/> changeplans/execute                                | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                     |      |
| 13   | 商品マスタ削除処理 | ProductMaster<br/> /ProductDeleted                           | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・itemId: アイテムID<br/> ・pricelistRecordId: 価格リストのレコードID<br/> ・linkCode: リンクコード | productDeleted    | catalogsService.postCatalogsCatalogNameItemsItemId      | PostCatalogsCatalogNameItemsItemIdRequestModel | POST<br/> catalogs/{catalogName}/items/{itemId}              | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostCatalogsCatalogNameItemsItemIdResponseModel() |      |
| 14   | 商品マスタ削除処理 | ProductMaster<br/> /ProductDeleted                           | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・itemId: アイテムID<br/> ・pricelistRecordId: 価格リストのレコードID<br/> ・linkCode: リンクコード | productDeleted    | catalogsService.postCatalogsCatalogNameItems            | PostCatalogsCatalogNameItemsRequestParamModel  | POST<br/> catalogs/{catalogName}/items                       | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostCatalogsCatalogNameItemsResponseModel()       |      |
| 15   | 商品マスタ削除処理 | ProductMaster<br/> /ProductDeleted                           | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・itemId: アイテムID<br/> ・pricelistRecordId: 価格リストのレコードID<br/> ・linkCode: リンクコード | productDeleted    | pricelistsService.updatePricelistsPriceListNameItem     | PostPricelistsPriceListNameItemRequestModel    | POST<br/> pricelists/record/{Id}?changePlanName={name}       | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsPriceListNameItemResponseModel()    |      |
| 16   | 商品マスタ削除処理 | ProductMaster<br/> /ProductDeleted                           | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・itemId: アイテムID<br/> ・pricelistRecordId: 価格リストのレコードID<br/> ・linkCode: リンクコード | productDeleted    | pricelistsService.postPricelistsPriceListNameItem       | PostPricelistsPriceListNameItemRequestModel    | POST<br/> pricelists/{priceListName}/items                   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsPriceListNameItemResponseModel()    |      |
| 17   | 商品マスタ削除処理 | ProductMaster<br/> /ProductDeleted                           | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・itemId: アイテムID<br/> ・pricelistRecordId: 価格リストのレコードID<br/> ・linkCode: リンクコード | productDeleted    | changePlanService.postChangePlan                        | PostChangePlanRequestModel                     | POST<br/> changeplans/records                                | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                     |      |
| 18   | 商品マスタ削除処理 | ProductMaster<br/> /ProductDeleted                           | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・itemId: アイテムID<br/> ・pricelistRecordId: 価格リストのレコードID<br/> ・linkCode: リンクコード | productDeleted    | changePlanService.postChangePlanExecute                 |                                                | POST<br/> changeplans/execute                                | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                     |      |
| 19   | 商品マスタ更新処理 | ・storeCd:店舗コード ・productId:バーコード ・name:漢字名称 ・kana:カナ名称 ・receipt:レシート印字名称 ・receiptPrintType:POS売上税区分 ・taxType:レシート印字名称区分 ・cost:原単価 ・sellPrice:売単価 ・manufacturerPrice:定価単価 ・productType:商品区分 ・ageCheckType:年齢確認商品 ・discountType:割引区分 ・premiunType:割増区分 ・pricedownType:値引区分 ・priceChangeType:売変区分 ・discountParType:小計値引割引按分処理区分 ・priceRequiredType:強制金額入力 ・zeroPriceType:0円単価区分 ・dutyFreeType:免税区分 ・paymentType:決済種別区分 ・productTaxCodes:POS売上税区分 ・sellStartDate:販売開始日 ・sellEndDate:販売終了日 ・sellStopType:販売停止区分 ・lastUpdate:最終更新日時 | storeCd: 0, // 店舗コード      productId: 0, // ○バーコード      name: '', // ○漢字名称      kana: '', // カナ名称      receipt: '', // レシート印字名称      receiptPrintType: 1, // POS売上税区分      taxType: 1, // レシート印字名称区分      cost: '', // 原単価      sellPrice: '', // ○売単価      manufacturerPrice: '', // ○定価単価      productType: 1, // ○商品区分      ageCheckType: 2, // ○年齢確認商品      discountType: 1, // ○割引区分      premiunType: 1, // 割増区分      pricedownType: 1, // ○値引区分      priceChangeType: 1, // ○売変区分      discountParType: 1, // 小計値引割引按分処理区分      priceRequiredType: 1, // 強制金額入力      zeroPriceType: 1, // 0円単価区分      dutyFreeType: 1, // 免税区分      paymentType: [], // 決済種別区分      productTaxCodes: '', // POS売上税区分      sellStartDate: '', // ○販売開始日      sellEndDate: '', // ○販売終了日      sellStopType: 1, // 販売停止区分      lastUpdate: ''// ○最終更新日時 | productCsv        | pricelistsService.updatePricelistsPriceListNameItem     | PostPricelistsPriceListNameItemRequestModel    | POST<br/> pricelists/record/{Id}?changePlanName={name}       | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsPriceListNameItemResponseModel()    |      |
| 20   | 商品マスタ更新処理 | ・storeCd:店舗コード ・productId:バーコード ・name:漢字名称 ・kana:カナ名称 ・receipt:レシート印字名称 ・receiptPrintType:POS売上税区分 ・taxType:レシート印字名称区分 ・cost:原単価 ・sellPrice:売単価 ・manufacturerPrice:定価単価 ・productType:商品区分 ・ageCheckType:年齢確認商品 ・discountType:割引区分 ・premiunType:割増区分 ・pricedownType:値引区分 ・priceChangeType:売変区分 ・discountParType:小計値引割引按分処理区分 ・priceRequiredType:強制金額入力 ・zeroPriceType:0円単価区分 ・dutyFreeType:免税区分 ・paymentType:決済種別区分 ・productTaxCodes:POS売上税区分 ・sellStartDate:販売開始日 ・sellEndDate:販売終了日 ・sellStopType:販売停止区分 ・lastUpdate:最終更新日時 | storeCd: 0, // 店舗コード      productId: 0, // ○バーコード      name: '', // ○漢字名称      kana: '', // カナ名称      receipt: '', // レシート印字名称      receiptPrintType: 1, // POS売上税区分      taxType: 1, // レシート印字名称区分      cost: '', // 原単価      sellPrice: '', // ○売単価      manufacturerPrice: '', // ○定価単価      productType: 1, // ○商品区分      ageCheckType: 2, // ○年齢確認商品      discountType: 1, // ○割引区分      premiunType: 1, // 割増区分      pricedownType: 1, // ○値引区分      priceChangeType: 1, // ○売変区分      discountParType: 1, // 小計値引割引按分処理区分      priceRequiredType: 1, // 強制金額入力      zeroPriceType: 1, // 0円単価区分      dutyFreeType: 1, // 免税区分      paymentType: [], // 決済種別区分      productTaxCodes: '', // POS売上税区分      sellStartDate: '', // ○販売開始日      sellEndDate: '', // ○販売終了日      sellStopType: 1, // 販売停止区分      lastUpdate: ''// ○最終更新日時 | productCsv        | pricelistsService.postPricelistsPriceListNameItem       | PostPricelistsPriceListNameItemRequestModel    | POST<br/> pricelists/{priceListName}/items                   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostPricelistsPriceListNameItemResponseModel()    |      |
| 21   | 商品マスタ更新処理 | ・storeCd:店舗コード ・productId:バーコード ・name:漢字名称 ・kana:カナ名称 ・receipt:レシート印字名称 ・receiptPrintType:POS売上税区分 ・taxType:レシート印字名称区分 ・cost:原単価 ・sellPrice:売単価 ・manufacturerPrice:定価単価 ・productType:商品区分 ・ageCheckType:年齢確認商品 ・discountType:割引区分 ・premiunType:割増区分 ・pricedownType:値引区分 ・priceChangeType:売変区分 ・discountParType:小計値引割引按分処理区分 ・priceRequiredType:強制金額入力 ・zeroPriceType:0円単価区分 ・dutyFreeType:免税区分 ・paymentType:決済種別区分 ・productTaxCodes:POS売上税区分 ・sellStartDate:販売開始日 ・sellEndDate:販売終了日 ・sellStopType:販売停止区分 ・lastUpdate:最終更新日時 | storeCd: 0, // 店舗コード      productId: 0, // ○バーコード      name: '', // ○漢字名称      kana: '', // カナ名称      receipt: '', // レシート印字名称      receiptPrintType: 1, // POS売上税区分      taxType: 1, // レシート印字名称区分      cost: '', // 原単価      sellPrice: '', // ○売単価      manufacturerPrice: '', // ○定価単価      productType: 1, // ○商品区分      ageCheckType: 2, // ○年齢確認商品      discountType: 1, // ○割引区分      premiunType: 1, // 割増区分      pricedownType: 1, // ○値引区分      priceChangeType: 1, // ○売変区分      discountParType: 1, // 小計値引割引按分処理区分      priceRequiredType: 1, // 強制金額入力      zeroPriceType: 1, // 0円単価区分      dutyFreeType: 1, // 免税区分      paymentType: [], // 決済種別区分      productTaxCodes: '', // POS売上税区分      sellStartDate: '', // ○販売開始日      sellEndDate: '', // ○販売終了日      sellStopType: 1, // 販売停止区分      lastUpdate: ''// ○最終更新日時 | productCsv        | changePlanService.postChangePlan                        | PostChangePlanRequestModel                     | POST<br/> changeplans/records                                | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                     |      |
| 22   | 商品マスタ更新処理 | ・storeCd:店舗コード ・productId:バーコード ・name:漢字名称 ・kana:カナ名称 ・receipt:レシート印字名称 ・receiptPrintType:POS売上税区分 ・taxType:レシート印字名称区分 ・cost:原単価 ・sellPrice:売単価 ・manufacturerPrice:定価単価 ・productType:商品区分 ・ageCheckType:年齢確認商品 ・discountType:割引区分 ・premiunType:割増区分 ・pricedownType:値引区分 ・priceChangeType:売変区分 ・discountParType:小計値引割引按分処理区分 ・priceRequiredType:強制金額入力 ・zeroPriceType:0円単価区分 ・dutyFreeType:免税区分 ・paymentType:決済種別区分 ・productTaxCodes:POS売上税区分 ・sellStartDate:販売開始日 ・sellEndDate:販売終了日 ・sellStopType:販売停止区分 ・lastUpdate:最終更新日時 | storeCd: 0, // 店舗コード      productId: 0, // ○バーコード      name: '', // ○漢字名称      kana: '', // カナ名称      receipt: '', // レシート印字名称      receiptPrintType: 1, // POS売上税区分      taxType: 1, // レシート印字名称区分      cost: '', // 原単価      sellPrice: '', // ○売単価      manufacturerPrice: '', // ○定価単価      productType: 1, // ○商品区分      ageCheckType: 2, // ○年齢確認商品      discountType: 1, // ○割引区分      premiunType: 1, // 割増区分      pricedownType: 1, // ○値引区分      priceChangeType: 1, // ○売変区分      discountParType: 1, // 小計値引割引按分処理区分      priceRequiredType: 1, // 強制金額入力      zeroPriceType: 1, // 0円単価区分      dutyFreeType: 1, // 免税区分      paymentType: [], // 決済種別区分      productTaxCodes: '', // POS売上税区分      sellStartDate: '', // ○販売開始日      sellEndDate: '', // ○販売終了日      sellStopType: 1, // 販売停止区分      lastUpdate: ''// ○最終更新日時 | productCsv        | changePlanService.postChangePlanExecute                 |                                                | POST<br/> changeplans/execute                                | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                     |      |

#### ２．２．２０．レシート設定

| No  | 処理内容         | URL<br/>（Front-end）              | 入力パラメータ                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | controller           | service                             | リクエストモデル | URI<br/>（MS）                                                            | 戻り値判定                                                                                                                                                                                                                                                                                                                                                   | レスポンスモデル                  | 備考 |
| --- | ---------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------- | ---------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | ---- |
| 1   | レシート取得処理 | Receipt<br/> /FetchReceiptDetail   | ・companyCode：企業コード（15桁）<br/> ・storeCode：店舗コード（6桁）<br/> ・planningCode：企画コード                                                                                                                                                                                                                                                                                                                                                                                 | fetchReceiptDetail   | receiptService.getReceiptDetail     |                  | GET<br/> receiptplans/setting/{companyCode}/{storeCode}/{planningCode}    | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                | FetchReceiptDetailResponseModel() |      |
| 2   | レシート更新処理 | Receipt<br/> /UpdateReceiptDetail  | ・companyCode：企業コード（15桁）<br/> ・storeCode：店舗コード（6桁）<br/> ・planningCode：企画コード<br/> ・headerLogoBase64EncodedString：ヘッダーロゴのBase64エンコード文字列<br/> ・headerLogoHashValue：ヘッダーロゴの値<br/> ・footerLogoBase64EncodedString：フッターロゴのBase64エンコード文字列<br/> ・footerLogoHashValue：フッターロゴの値<br/> ・revenueStampLogoBase64EncodedString：収益印ロゴのBase64エンコード文字列<br/> ・revenueStampLogoHashValue：収益印ロゴの値 | updateReceiptDetail  | receiptService.updateReceiptDetail  |                  | GET<br/> receiptplans/setting/{companyCode}/{storeCode}/{planningCode}    | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                | FetchReceiptDetailResponseModel() |      |
| 3   | レシート削除処理 | Receipt<br/> /DestroyReceiptDetail | ・companyCode：企業コード（15桁）<br/> ・storeCode：店舗コード（6桁）<br/> ・planningCode：企画コード                                                                                                                                                                                                                                                                                                                                                                                 | destroyReceiptDetail | receiptService.destroyReceiptDetail |                  | DELETE<br/> receiptplans/setting/{companyCode}/{storeCode}/{planningCode} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･異常（応答コード：2）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | FetchReceiptDetailResponseModel() |      |

#### ２．２．２１．年齢区分マスタ設定

| No  | 処理内容               | URL<br/>（Front-end）          | 入力パラメータ                                                                                                                                                   | controller                  | service                                              | リクエストモデル                      | URI<br/>（MS）                                                    | 戻り値判定                                                                                                                                                                                                                                                                                             | レスポンスモデル                 | 備考 |
| --- | ---------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------- | ------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- | ---- |
| 1   | 年齢区分マスタ取得処理 | RentalsAgeDivision<br/>/Query  | ・nodeId：企業コード（15桁）<br/>・ageDivisionCode：年齢区分コード<br/>・orderBy：'ageDivisionCode'<br/>・ascending：true<br/>・startIndex：0<br/>・batchSize：0 | restaurantsAgeDivisonQuery  | restaurantsService.<br/>RestaurantsAgeDivisionQuery  | PostRestaurantsQueryRequestParamModel | POST<br/>rentals-course/age-division/query                        | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:200以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10） | RestaurantsCommonResponseModel() |      |
| 2   | 年齢区分マスタ更新処理 | RentalsAgeDivision<br/>/Update | ・data：取得した年齢区分データ（1レコード）<br/>・nodeId：企業コード（15桁）<br/>・startAge：開始年齢<br/>・endAge：終了年齢                                     | restaurantsAgeDivisonUpdate | restaurantsService.<br/>RestaurantsAgeDivisionUpdate |                                       | POST<br/>rentals-course/age-division                              | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:200以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10） | RestaurantsUpdateResponseModel() |      |
| 3   | 年齢区分マスタ削除処理 | RentalsAgeDivision<br/>/Delete | ・nodeId：企業コード（15桁）<br/>・ageDivisionCode：削除対象の年齢区分コード                                                                                     | restaurantsAgeDivisonDelete | restaurantsService.<br/>RestaurantsAgeDivisionDelete |                                       | DELETE<br/>rentals-course/age-division/{nodeId}/{ageDivisionCode} | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:200以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10） | RestaurantsCommonResponseModel() |      |

#### ２．２．２２．カレンダーマスタ設定

| No  | 処理内容                 | URL<br/>（Front-end）        | 入力パラメータ                                                                      | controller            | service                              | リクエストモデル | URI<br/>（MS）                          | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル             | 備考 |
| --- | ------------------------ | ---------------------------- | ----------------------------------------------------------------------------------- | --------------------- | ------------------------------------ | ---------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---- |
| 1   | カレンダーマスタ取得処理 | RentalsCalendar<br/> /Query  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・yyDate：年<br/> ・mmDate：月 | rentalsCalendarQuery  | rentalsService.RentalsCalendarQuery  |                  | POST<br/> rentals-course/calendar/query | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |
| 2   | カレンダーマスタ更新処理 | RentalsCalendar<br/> /Update | ・calendarQueryResultList：フィルタリングされた行データ                             | rentalsCalendarUpdate | rentalsService.RentalsCalendarUpdate |                  | POST<br/> rentals-course/calendar       | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsUpdateResponseModel() |      |

#### ２．２．２３．顧客情報ファイル設定

| No  | 処理内容                 | URL<br/>（Front-end）             | 入力パラメータ                                                                                                                                                                                                             | controller                | service                                   | リクエストモデル                  | URI<br/>（MS）                                             | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル             | 備考 |
| --- | ------------------------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------------------------------------- | --------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---- |
| 1   | 顧客情報ファイル取得処理 | RentalsCustomerInfo<br/> /Query   | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・indexNo：インデックス番号<br/> ・isTrainingMode：トレーニングモードフラグ<br/> ・orderBy：'indexNo'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0 | rentalsCustomerInfoQuery  | rentalsService.RentalsCustomerInfoQuery   | PostRentalsQueryRequestParamModel | POST<br/> rentals-customer-info/customer-info-file/query   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |
| 2   | 顧客情報ファイル削除処理 | RentalsCustomerInfo<br/> /Release | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・indexNo：インデックス番号<br/> ・isTrainingMode：トレーニングモードフラグ<br/> ・exclusionStatus：除外ステータス                                                    | rentalsCustomerInfoDelete | rentalsService.RentalsCustomerInfoRelease |                                   | POST<br/> rentals-customer-info/customer-info-file/release | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |

#### ２．２．２４．オプションマスタ設定

| No  | 処理内容                 | URL<br/>（Front-end）           | 入力パラメータ                                                                                                                                                                           | controller               | service                                 | リクエストモデル                  | URI<br/>（MS）                                                  | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル             | 備考 |
| --- | ------------------------ | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | --------------------------------------- | --------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---- |
| 1   | オプションマスタ取得処理 | RentalsDrinkcourse<br/> /Query  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・drinkCourseNo：ドリンクコース番号<br/> ・orderBy：'drinkCourseNo'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0 | rentalsRoomcourseQuery   | rentalsService.RentalsDrinkcourseQuery  | PostRentalsQueryRequestParamModel | POST<br/> rentals-course/drinkcourse/query                      | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |
| 2   | オプションマスタ更新処理 | RentalsDrinkcourse<br/> /Update | ・selectedDataModel：選択されたデータモデル<br/> ・option：オプション                                                                                                                    | rentalsDrinkcourseUpdate | rentalsService.RentalsDrinkcourseUpdate |                                   | POST<br/> rentals-course/drinkcourse                            | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsUpdateResponseModel() |      |
| 3   | オプションマスタ削除処理 | RentalsDrinkcourse<br/> /Delete | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・drinkCourseNo：ドリンクコース番号                                                                                                 | rentalsDrinkcourseDelete | rentalsService.RentalsDrinkcourseDelete |                                   | DELETE<br/> rentals-course/drinkcourse/{nodeId}/{drinkCourseNo} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |

#### ２．２．２５．機材マスタ設定

| No  | 処理内容           | URL<br/>（Front-end）         | 入力パラメータ                                                                                                                                                      | controller             | service                               | リクエストモデル                  | URI<br/>（MS）                                        | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル             | 備考 |
| --- | ------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------- | --------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---- |
| 1   | 機材マスタ取得処理 | RentalsEquipment<br/> /Query  | ・nodeId：企業コード（15桁）<br/> ・equipNo：機材アイテム番号<br/> ・orderBy：'equipNo'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0             | rentalsEquipmentQuery  | rentalsService.RentalsEquipmentQuery  | PostRentalsQueryRequestParamModel | POST<br/> rentals-room/equipment/query                | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |
| 2   | 機材マスタ更新処理 | RentalsEquipment<br/> /Update | ・equipmentOriginalData：機材の元データ<br/> ・nodeId：企業コード（15桁）<br/> ・equipNo：機材アイテム番号<br/> ・equipName：機材名<br/> ・equipShortName：機材略称 | rentalsEquipmentUpdate | rentalsService.RentalsEquipmentUpdate |                                   | POST<br/> rentals-room/equipment                      | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsUpdateResponseModel() |      |
| 3   | 機材マスタ削除処理 | RentalsEquipment<br/> /Delete | ・nodeId：企業コード（15桁）<br/> ・equipNo：機材アイテム番号                                                                                                       | rentalsEquipmentDelete | rentalsService.RentalsEquipmentDelete |                                   | DELETE<br/> rentals-room/equipment/{nodeId}/{equipNo} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |

#### ２．２．２６．機種設備マスタ設定

| No  | 処理内容               | URL<br/>（Front-end）     | 入力パラメータ                                                                                                                                                                                                                                                                                                                                   | controller             | service                           | リクエストモデル                  | URI<br/>（MS）                                    | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル             | 備考 |
| --- | ---------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | --------------------------------- | --------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---- |
| 1   | 機種設備マスタ取得処理 | RentalsModel<br/> /Query  | ・nodeId：企業コード（15桁）<br/> ・modelNo：機材アイテム番号<br/> ・orderBy：'modelNo'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0                                                                                                                                                                                          | rentalsEquipmentQuery  | rentalsService.RentalsModelQuery  | PostRentalsQueryRequestParamModel | POST<br/> rentals-room/model/query                | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |
| 2   | 機種設備マスタ更新処理 | RentalsModel<br/> /Update | ・selectedSettingData: 選択された設定データ<br/> ・nodeId: 企業コード（15桁）<br/> ・createTimestamp: 作成タイムスタンプ<br/> ・lastModifiedTimestamp: 最終更新タイムスタンプ<br/> ・version: バージョン<br/> ・modelNo: モデル番号<br/> ・modelName: モデル名<br/> ・modelShortName: モデル略称<br/> ・dispSeq: 表示順<br/> ・equipNo: 装置番号 | rentalsEquipmentUpdate | rentalsService.RentalsModelUpdate |                                   | POST<br/> rentals-room/model                      | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsUpdateResponseModel() |      |
| 3   | 機種設備マスタ削除処理 | RentalsModel<br/> /Delete | ・nodeId：企業コード（15桁）<br/> ・modelNo：機材アイテム番号                                                                                                                                                                                                                                                                                    | rentalsEquipmentDelete | rentalsService.RentalsModelDelete |                                   | DELETE<br/> rentals-room/model/{nodeId}/{modelNo} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |

#### ２．２．２７．部屋情報マスタ設定

| No  | 処理内容               | URL<br/>（Front-end）    | 入力パラメータ                                                                                                                                              | controller        | service                          | リクエストモデル                  | URI<br/>（MS）                                   | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル             | 備考 |
| --- | ---------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | -------------------------------- | --------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---- |
| 1   | 部屋情報マスタ取得処理 | RentalsRoom<br/> /Query  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・indexNo：0<br/> ・orderBy：'indexNo'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0 | rentalsRoomQuery  | rentalsService.RentalsRoomQuery  | PostRentalsQueryRequestParamModel | POST<br/> rentals-room/room/query                | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |
| 2   | 部屋情報マスタ更新処理 | RentalsRoom<br/> /Update | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・indexNo：インデックスコード<br/> ・room：部屋情報設定項目欄に設定した内容                            | rentalsRoomUpdate | rentalsService.RentalsRoomUpdate |                                   | POST<br/> rentals-room/room                      | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsUpdateResponseModel() |      |
| 3   | 部屋情報マスタ削除処理 | RentalsRoom<br/> /Delete | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・indexNo：インデックスコード                                                                          | rentalsRoomDelete | rentalsService.RentalsRoomDelete |                                   | DELETE<br/> rentals-room/room/{nodeId}/{indexNo} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |

#### ２．２．２８．部屋コースマスタ設定

| No  | 処理内容                 | URL<br/>（Front-end）          | 入力パラメータ                                                                                                                                                    | controller              | service                                | リクエストモデル                  | URI<br/>（MS）                                              | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル             | 備考 |
| --- | ------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------------------------------------- | --------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---- |
| 1   | 部屋コースマスタ取得処理 | RentalsRoomcourse<br/> /Query  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・chargeCode：0<br/> ・orderBy：'chargeCode'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0 | rentalsRoomcourseQuery  | rentalsService.RentalsRoomcourseQuery  | PostRentalsQueryRequestParamModel | POST<br/> rentals-course/roomcourse/query                   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |
| 2   | 部屋コースマスタ更新処理 | RentalsRoomcourse<br/> /Update | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・chargeCode：チャージコード<br/> ・course：部屋コース設定項目欄に設定した内容                               | rentalsRoomcourseUpdate | rentalsService.RentalsRoomcourseUpdate |                                   | POST<br/> rentals-course/roomcourse                         | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsUpdateResponseModel() |      |
| 3   | 部屋コースマスタ削除処理 | RentalsRoomcourse<br/> /Delete | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・chargeCode：チャージコード                                                                                 | rentalsRoomcourseDelete | rentalsService.RentalsRoomcourseDelete |                                   | DELETE<br/> rentals-course/roomcourse/{nodeId}/{chargeCode} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |

#### ２．２．２９．コース料金設定

| No  | 処理内容           | URL<br/>（Front-end）              | 入力パラメータ                                                                                                                                                                                                                                                                                                               | controller              | service                                    | リクエストモデル                  | URI<br/>（MS）                                 | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル             | 備考 |
| --- | ------------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------ | --------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---- |
| 1   | コース料金取得処理 | RentalsRoomcourseRate<br/> /Query  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・weekdayCode：インデックスコード<br/> ・chargeCode：チャージコード<br/> ・memberPrice：会員価格<br/> ・ageDivisionCode：年齢区分コード<br/> ・countSetting：カウント設定<br/> ・orderBy：'weekdayCode'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0 | rentalsRoomcourseQuery  | rentalsService.RentalsRoomcourseRateQuery  | PostRentalsQueryRequestParamModel | POST<br/> rentals-course/roomcourse-rate/query | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |
| 2   | コース料金更新処理 | RentalsRoomcourseRate<br/> /Update | ・dataModel：データ本体                                                                                                                                                                                                                                                                                                      | rentalsRoomcourseUpdate | rentalsService.RentalsRoomcourseRateUpdate |                                   | POST<br/> rentals-course/roomcourse-rate       | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |

#### ２．２．３０．部屋関連情報マスタ設定

| No  | 処理内容                   | URL<br/>（Front-end）               | 入力パラメータ                                                                                                                                                                             | controller                  | service                                     | リクエストモデル                  | URI<br/>（MS）                                            | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル             | 備考 |
| --- | -------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- | ------------------------------------------- | --------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---- |
| 1   | 部屋関連情報マスタ取得処理 | RentalsRoomInformation<br/> /Query  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・indexNo：インデックス番号<br/> ・orderBy：'indexNo'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0                 | rentalsRoomInformationQuery | rentalsService.RentalsRoomInformationQuery  | PostRentalsQueryRequestParamModel | POST<br/> rentals-room/room-relation/query                | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |
| 2   | 部屋関連情報マスタ更新処理 | RentalsRoomInformation<br/> /Update | ・roomInfo：部屋情報<br/> ・nodeId:企業コード（15桁）＋店舗コード（6桁）<br/> ・indexNo: インデックス番号<br/> ・tableNo: テーブル番号<br/> ・startDate: 開始日付<br/> ・endDate: 終了日付 | rentalsRoomInfomationUpdate | rentalsService.RentalsRoomInformationUpdate |                                   | POST<br/> rentals-room/room-relation                      | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsUpdateResponseModel() |      |
| 3   | 部屋関連情報マスタ削除処理 | RentalsRoomInformation<br/> /Delete | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・indexNo：インデックス番号                                                                                                           | rentalsRoomInfomationDelete | rentalsService.RentalsRoomInformationDelete |                                   | DELETE<br/> rentals-room/room-relation/{nodeId}/{indexNo} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |

#### ２．２．３１．部屋情報サブ設定

| No  | 処理内容             | URL<br/>（Front-end）       | 入力パラメータ                                                                                                                                                               | controller           | service                             | リクエストモデル                  | URI<br/>（MS）                       | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル             | 備考 |
| --- | -------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------- | --------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---- |
| 1   | 部屋情報サブ取得処理 | RentalsRoomsub<br/> /Query  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・indexNo：インデックスコード<br/> ・orderBy：'indexNo'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0 | rentalsRoomSubQuery  | rentalsService.RentalsRoomSubQuery  | PostRentalsQueryRequestParamModel | POST<br/> rentals-room/roomsub/query | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |
| 2   | 部屋情報サブ更新処理 | RentalsRoomsub<br/> /Update | ・indexNo：インデックスコード<br/> ・tblNo：tbl番号<br/> ・weekdayCode：曜日区分コード                                                                                       | rentalsRoomSubUpdate | rentalsService.RentalsRoomSubUpdate |                                   | POST<br/> rentals-room/roomsub       | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsUpdateResponseModel() |      |

#### ２．２．３２．曜日区分マスタ設定

| No  | 処理内容               | URL<br/>（Front-end）               | 入力パラメータ                                                                                                                                                                                                                            | controller                   | service                                     | リクエストモデル                  | URI<br/>（MS）                                                     | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル             | 備考 |
| --- | ---------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------- | --------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---- |
| 1   | 曜日区分マスタ取得処理 | RentalsWeekdayDivision<br/> /Query  | ・nodeId：企業コード（15桁）<br/> ・weekdayCode：曜日区分コード<br/> ・orderBy：'weekdayCode'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0                                                                             | rentalsWeekdayDivisionQuery  | rentalsService.RentalsWeekdayDivisionQuery  | PostRentalsQueryRequestParamModel | POST<br/> rentals-course/weekday-division/query                    | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |
| 2   | 曜日区分マスタ更新処理 | RentalsWeekdayDivision<br/> /Update | ・settingData: 設定データ<br/> ・nodeId: 企業コード（15桁）<br/> ・weekdayCode: 曜日区分コード<br/> ・weekdayName: 曜日名<br/> ・weekdayShortName: 曜日略称<br/> ・textColorCode: テキストの色コード<br/> ・backColorCode: 背景色のコード | rentalsWeekdayDivisionUpdate | rentalsService.RentalsWeekdayDivisionUpdate |                                   | POST<br/> rentals-course/weekday-division                          | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsUpdateResponseModel() |      |
| 3   | 曜日区分マスタ削除処理 | RentalsWeekdayDivision<br/> /Delete | ・nodeId：企業コード（15桁）<br/> ・weekdayCode：曜日区分コード                                                                                                                                                                           | rentalsWeekdayDivisionDelete | rentalsService.RentalsWeekdayDivisionDelete |                                   | DELETE<br/> rentals-course/weekday-division/{nodeId}/{weekdayCode} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RentalsCommonResponseModel() |      |

#### ２．２．３３．変更基準日と現在情報設定

| No  | 処理内容                     | URL<br/>（Front-end）                        | 入力パラメータ                                                                                                        | controller                        | service                                                                                  | リクエストモデル                         | URI<br/>（MS）                                                               | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル                             | 備考 |
| --- | ---------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ---- |
| 1   | 変更基準日一覧の取得処理     | Reservation<br/>/FetchDateList               | ・nodeId：企業コード（15桁）<br/>excludeFields: 'true'                                                                | GetReservationDateRequestModel    | reservationService.<br/>getReservationDate                                               | GetReservationDateQueryRequestParamModel | GET<br/>configurations/reservations/list                                     | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:200以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10）        | ReservationDateResponseModel()               |      |
| 2   | 変更基準日の詳細情報取得処理 | Reservation<br/>/FetchDetail                 | ・nodeId: 企業コード（15桁）<br/>・excludeFields: 'false'<br/>・type: 'settingType'<br/>・executionDate: 'dateText'   | fetchDateDetail                   | reservationService.<br/>getReservationDetail                                             | GetReservationDateQueryRequestParamModel | GET<br/>configurations/reservations/list                                     | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:200以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10）        | ReservationDetailResponseModel()             |      |
| 3   | 変更基準日の追加・更新処理   | Reservation<br/>/UpdateDetail                | ・nodeId: 企業コード（15桁）<br/>・type: 'settingType'<br/>・executionDate: 'dateText'<br/>・configuration: 'setting' | updateReservation                 | reservationService.<br/>updateReservation                                                |                                          | POST<br/>configurations/reservations/{nodeId}/{type}                         | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:200以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10）        | PutReservationResponseModel()                |      |
| 4   | 変更基準日の削除処理         | Reservation<br/>/DestroyDetail               | ・nodeId: 企業コード（15桁）<br/>・type: 'settingType'<br/>・executionDate: 'dateText'<br/>・configuration: 'setting' | destroyReservation                | reservationService.<br/>destroyReservation                                               |                                          | DELETE<br/>configurations/reservations/{nodeId}/{type}                       | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:200以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10）        | PutReservationResponseModel()                |      |
| 5   | 現在の設定の詳細情報取得処理 | Reservation<br/>/FetchConfiguration          | ・nodeId: 企業コード（15桁）<br/>・excludeFields: 'false'<br/>・type: 'settingType'                                   | fetchConfigurationDetail          | reservationService.<br/>getConfigurationDetail                                           |                                          | GET<br/>configurations/nodes/{nodeId}?sparse=true                            | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:200以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10）        | ConfigurationDetailResponseModel()           |      |
| 6   | 現在の設定の詳細情報取得処理 | Reservation<br/>/FetchConfigurationRecursive | ・nodeId: 企業コード（15桁）<br/>・excludeFields: 'false'<br/>・type: 'settingType'                                   | fetchConfigurationDetailRecursive | reservationService.<br/>getConfigurationDetailRecursive                                  |                                          | GET<br/>configurations/nodes/{nodeId}                                        | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:200以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10）        | ConfigurationDetailResponseModel()           |      |
| 7   | 現在の設定の更新処理         | Reservation<br/>/UpdateConfiguration         | ・nodeId: 企業コード（15桁）<br/>・type: 'settingType'<br/>・configuration: 'setting'<br/>・mode: '0'                 | updateConfiguration               | ・reservationService.updateReservation<br/>・reservationService.updateReservationReflect |                                          | POST<br/>configurations/reservations/{nodeId}/{type}/{executionDate}/reflect | ■オンライン正常<br/>・statusCode:200･･･正常（応答コード：0）<br/>・statusCode:200以外･･･異常（応答コード：statusCode）<br/>■オンライン異常<br/>・JSON変換エラー･･･異常（応答コード：-20）<br/>・以外･･･異常（応答コード：-30）<br/>■オフライン（Back-end→MS）<br/>・通信異常･･･異常（応答コード：-10）        | PutConfigurationResponseModel()              |      |
| 8   | 現在設定の更新処理           | Reservation<br/> /UpdateConfigurationBy5Step | ・Name：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ<br/> ・nodeId: 企業コード（15桁）                          | updateConfigurationBy5Step        | configurationsService.postNodesNodeId                                                    | PostConfigurationsNodesRequestParamModel | POST<br/> configurations/nodes/{nodeId}/                                     | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostConfigurationsNodesNodeIdResponseModel() |      |
| 9   | 現在設定の更新処理           | Reservation<br/> /UpdateConfigurationBy5Step | ・ChangePlanName：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ<br/>・nodeId: 企業コード（15桁）                 | updateConfigurationBy5Step        | configurationsService.postNodes                                                          | PostConfigurationsNodesRequestParamModel | POST<br/> configurations/nodes                                               | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostConfigurationsNodesResponseModel()       |      |
| 10  | 現在設定の更新処理           | Reservation<br/> /UpdateConfigurationBy5Step | ・Name：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ<br/> ・Version：'Pending'<br/> ・Notes：ノート             | updateConfigurationBy5Step        | changePlanService.postChangePlan                                                         | PostChangePlanRequestModel               | POST<br/> changeplans/records                                                | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostChangePlanResponseModel()                |      |
| 11  | 現在設定の更新処理           | Reservation<br/> /UpdateConfigurationBy5Step | ・Name：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ                                                            | updateConfigurationBy5Step        | changePlanService.postChangePlanExecute                                                  | PostChangePlanRequestModel               | ・POST<br/> changeplans/execute                                              | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PutConfigurationResponseModel()              |      |

#### ２．２．３４．コンプライアンス情報マスタ設定

| No  | 処理内容                           | URL<br/>（Front-end）              | 入力パラメータ                                                   | controller                  | service                                        | リクエストモデル | URI<br/>（MS）                                                  | 戻り値判定                                                                                                                                                                                                                                                                                                                                                   | レスポンスモデル                 | 備考 |
| --- | ---------------------------------- | ---------------------------------- | ---------------------------------------------------------------- | --------------------------- | ---------------------------------------------- | ---------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- | ---- |
| 1   | コンプライアンス情報マスタ取得処理 | RestaurantsCompliance<br/> /Get    | ・nodeId：企業コード（15桁）<br/> ・storeCode：店舗コード（6桁） | restaurantsComplianceGet    | restaurantsService.RestaurantsComplianceGet    |                  | GET<br/> restaurants-compliance/compliance/{nodeId}/{storeCode} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:204･･･正常（応答コード：0）<br/> ・statusCode:上記以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsUpdateResponseModel() |      |
| 2   | コンプライアンス情報マスタ更新処理 | RestaurantsCompliance<br/> /Update | ・nodeId：企業コード（15桁）<br/> ・storeCode：店舗コード（6桁） | restaurantsComplianceUpdate | restaurantsService.RestaurantsComplianceUpdate |                  | POST<br/> restaurants-compliance/compliance                     | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10）                                                | RestaurantsUpdateResponseModel() |      |

#### ２．２．３５．飲食オーダーガイダンス設定

| No  | 処理内容                       | URL<br/>（Front-end）             | 入力パラメータ                                                                                                                                                                                              | controller                 | service                                      | リクエストモデル                  | URI<br/>（MS）                                    | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル                           | 備考 |
| --- | ------------------------------ | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------------------------- | --------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---- |
| 1   | 飲食オーダーガイダンス取得処理 | RestaurantsMcFscp<br/> /Query     | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・ScpNo：Scp番号<br/> ・orderBy：'ScpNo'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0                                               | RestaurantMasterFscpQuery  | restaurantsService.RestaurantsMcFscp         | RestaurantsQueryRequestParamModel | POST<br/> restaurants/mc_fscp/query               | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostRestaurantsMasterFscpDataResponse()    |      |
| 2   | 飲食オーダーガイダンス更新処理 | RestaurantsMcFscp<br/> /Update    | ・guidanceSetting：ガイダンス設定データ<br/> ・nodeId：企業コード（15桁）＋店舗コード（6桁）                                                                                                                | RestaurantMasterFscpUpdate | restaurantsService.RestaurantsMcFscpUpdate   |                                   | POST<br/> restaurants/mc_fscp                     | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostRestaurantsMasterFscpDataResponseUpd() |      |
| 3   | 飲食オーダーガイダンス削除処理 | RestaurantsMcFscp<br/> /Delete    | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・ScpNo：Scp番号                                                                                                                                       | RestaurantMasterFscpDelete | restaurantsService.RestaurantsMcFscpDelete   |                                   | DELETE<br/> restaurants/mc_fscp/{nodeId}/{ScpNo}  | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | DeleteRestaurantResponseModel()            |      |
| 4   | メニューマスタ取得処理         | RestaurantsSetTool<br/> /DbSelect | ・table: 対象テーブルの名前<br/> ・query: データ取得の検索条件<br/> ・projection: 取得データのフィールドを指定するプロジェクション<br/> ・sort: 取得したデータのソート順<br/> ・apicaller: 呼出元の指定項目 | RestaurantSetToolDbSelect  | restaurantsService.RestaurantSetToolDbSelect |                                   | POST<br/> restaurants/settool_dbselect            | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | PostRestaurantsSetToolDbSelectResponse()   |      |
| 5   | メニューマスタ更新処理         | Restaurants<br/> /mc_fumenu       | ・tgcpRestaurantsMcFuMenu：更新元のデータ<br/> ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・Code：コード                                                                                          | RestaurantMcFumenu         | restaurantsService.RestaurantsMcFumenuUpdate |                                   | POST<br/> restaurants/mc_fumenu                   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsUpdateResponseModel()           |      |
| 6   | メニューマスタ削除処理         | Restaurants<br/> /mc_fumenuDelete | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・Code：コード                                                                                                                                         | RestaurantMcFumenuDelete   | restaurantsService.RestaurantsMcFumenuDelete |                                   | DELETE<br/> restaurants/mc_fumenu/{nodeId}/{code} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsDeleteResponseModel()           |      |

#### ２．２．３６．フロアマスタ設定

| No  | 処理内容             | URL<br/>（Front-end）         | 入力パラメータ                                                                                                                                                                                                                                                                                                                                     | controller                  | service                                   | リクエストモデル                      | URI<br/>（MS）                                       | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル                 | 備考 |
| --- | -------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----------------------------------------- | ------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---- |
| 1   | フロアマスタ取得処理 | RestaurantsFloor<br/> /Query  | ・nodeId：企業コード（15桁）<br/> ・IndexNo：インデックス番号<br/> ・orderBy：'IndexNo'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0                                                                                                                                                                                            | restaurantsFloorQuery       | restaurantsService.RestaurantsFloorQuery  | PostRestaurantsQueryRequestParamModel | POST<br/> restaurants/mc_ffloor/query                | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsCommonResponseModel() |      |
| 2   | フロアマスタ更新処理 | RestaurantsFloor<br/> /Update | ・floorData: 更新元のフロアデータ<br/> ・nodeId: 企業コード（15桁）<br/> ・indexNo: インデックス番号<br/> ・floorNo: フロア番号<br/> ・floorName: フロア名<br/> ・floorNameShort: フロア名の略称<br/> ・ccpNo: CCP番号<br/> ・errKcpNo: エラーKCP番号<br/> ・kpSts1～31: KPステータス1～31<br/> ・dishupSts1～32: ディシャップステータス1～32<br/> | restaurantsMemberRankUpdate | restaurantsService.RestaurantsFloorUpdate |                                       | POST<br/> restaurants/mc_ffloor                      | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsCommonResponseModel() |      |
| 3   | フロアマスタ削除処理 | RestaurantsFloor<br/> /Delete | ・nodeId：企業コード（15桁）<br/> ・IndexNo：インデックス番号                                                                                                                                                                                                                                                                                      | restaurantsFloorDelete      | restaurantsService.RestaurantsFloorDelete |                                       | DELETE<br/> restaurants/mc_ffloor/{nodeId}/{indexNo} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsCommonResponseModel() |      |

#### ２．２．３７．会員ランクマスタ設定

| No  | 処理内容                 | URL<br/>（Front-end）              | 入力パラメータ                                                                                                                                          | controller                  | service                                        | リクエストモデル                      | URI<br/>（MS）                                                     | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル                 | 備考 |
| --- | ------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---- |
| 1   | 会員ランクマスタ取得処理 | RestaurantsMemberRank<br/> /Query  | ・nodeId：企業コード（15桁）<br/> ・indexNo：インデックス番号<br/> ・orderBy：'indexNo'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0 | restaurantsMemberRankQuery  | restaurantsService.RestaurantsMemberRankQuery  | PostRestaurantsQueryRequestParamModel | POST<br/> restaurants-member-rank/member-rank/query                | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsCommonResponseModel() |      |
| 2   | 会員ランクマスタ更新処理 | RestaurantsMemberRank<br/> /Update | ・origData：更新元のデータ<br/> ・nodeId：企業コード（15桁）<br/> ・morphData：更新データ                                                               | restaurantsMemberRankUpdate | restaurantsService.RestaurantsMemberRankUpdate |                                       | POST<br/> restaurants-member-rank/member-rank                      | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsUpdateResponseModel() |      |
| 3   | 会員ランクマスタ削除処理 | RestaurantsMemberRank<br/> /Delete | ・nodeId：企業コード（15桁）<br/> ・indexNo：インデックス番号                                                                                           | restaurantsMemberRankDelete | restaurantsService.RestaurantsMemberRankDelete |                                       | DELETE<br/> restaurants-member-rank/member-rank/{nodeId}/{indexNo} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsCommonResponseModel() |      |

#### ２．２．３８．システム管理固定マスタ設定

| No  | 処理内容                       | URL<br/>（Front-end）                   | 入力パラメータ                                                                                                        | controller                 | service                                            | リクエストモデル                      | URI<br/>（MS）                                  | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル                 | 備考 |
| --- | ------------------------------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------------------------------- | ------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---- |
| 1   | システム管理固定マスタ取得処理 | Restaurants/SysteminffixSys<br/> /Query | ・nodeId：企業コード（15桁）<br/> ・orderBy：'nodeId'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0 | restaurantsSysteminffixSys | restaurantsService.RestaurantsSysteminffixSysQuery | PostRestaurantsQueryRequestParamModel | POST<br/> restaurants/mc_systeminffix_sys/query | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsCommonResponseModel() |      |

#### ２．２．３９．テーブルマスタ設定

| No  | 処理内容               | URL<br/>（Front-end）               | 入力パラメータ                                                                                                                                                             | controller             | service                                         | リクエストモデル                      | URI<br/>（MS）                      | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル                 | 備考 |
| --- | ---------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----------------------------------------------- | ------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---- |
| 1   | テーブルマスタ取得処理 | RestaurantsTable<br/> /Query        | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・IndexNo：インデックス番号<br/> ・orderBy：'IndexNo'<br/> ・ascending：true<br/> ・startIndex：0<br/> ・batchSize：0 | restaurantsTabaleQuery | restaurantsService.RestaurantsTableQuery        | PostRestaurantsQueryRequestParamModel | POST<br/> restaurants/mc_ftbl/query | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsCommonResponseModel() |      |
| 2   | テーブルマスタ更新処理 | RestaurantsTable<br/> /Update       | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・floorNo：フロア番号                                                                                                 | restaurantsTableUpdate | restaurantsService.RestaurantsTableUpdate       |                                       | POST<br/> restaurants/mc_ftbl       | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsUpdateResponseModel() |      |
| 3   | テーブルマスタ削除処理 | RestaurantsTable<br/> /UpdateDelete | ・IndexNo：インデックス番号<br/> ・nodeId：企業コード（15桁）＋店舗コード（6桁）                                                                                           | restaurantsTableDelete | restaurantsService.RestaurantsTableUpdateDelete |                                       | POST<br/> restaurants/mc_ftbl       | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsCommonResponseModel() |      |

#### ２．２．４０．券種マスタ設定

| No  | 処理内容           | URL<br/>（Front-end）          | 入力パラメータ                                                                                                                                                                                  | controller                  | service                                    | リクエストモデル                      | URI<br/>（MS）                                        | 戻り値判定                                                                                                                                                                                                                                                                                                    | レスポンスモデル                 | 備考 |
| --- | ------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------ | ------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---- |
| 1   | 券種マスタ取得処理 | RestaurantsTicket<br/> /Query  | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・Code：コード                                                                                                                             | restaurantsTicketQuery      | restaurantsService.RestaurantsTicketQuery  | PostRestaurantsQueryRequestParamModel | POST<br/> restaurants-ticket/ticket/query             | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsCommonResponseModel() |      |
| 2   | 券種マスタ更新処理 | RestaurantsTicket<br/> /Update | ・selectedRow: 選択された行<br/> ・inputModel: 入力モデル<br/> ・nodeId: 企業コード（15桁）＋店舗コード（6桁）<br/> ・Code: コード<br/> ・TargetMenuCode: 対象メニューコード<br/> ・Tanka: 単価 | restaurantsMemberRankUpdate | restaurantsService.RestaurantsTicketUpdate |                                       | POST<br/> restaurants-ticket/ticket                   | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsUpdateResponseModel() |      |
| 3   | 券種マスタ削除処理 | RestaurantsTicket<br/> /Delete | ・nodeId：企業コード（15桁）＋店舗コード（6桁）<br/> ・Code：コード                                                                                                                             | restaurantsTicketDelete     | restaurantsService.RestaurantsTicketDelete |                                       | DELETE<br/> restaurants-ticket/ticket/{nodeId}/{code} | ■オンライン正常<br/> ・statusCode:200･･･正常（応答コード：0）<br/> ・statusCode:200以外･･･異常（応答コード：statusCode）<br/> ■オンライン異常<br/> ・JSON変換エラー･･･異常（応答コード：-20）<br/> ・以外･･･異常（応答コード：-30）<br/> ■オフライン（Back-end→MS）<br/> ・通信異常･･･異常（応答コード：-10） | RestaurantsCommonResponseModel() |      |

#### ２．２．４１．S3バケット操作
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    > リクエストモデル</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>
<tr><td  >1</td><td  >S3ファイル取得</td><td  >S3bucket<br/>
/GetFile</td><td  >・bucket：S3ファイル<br/>
・companyCode：企業コード<br/>
・apicaller：レストランマスタ<br/>
・storeCode：個店：「企業ｺｰﾄﾞ/店舗ｺｰﾄﾞ」フォルダ、共有：「企業ｺｰﾄﾞ」フォルダ</td><td  >s3bucketGetFilePost</td><td  >s3bucketService.<br/>
S3bucketGetFile</td><td  >Map&lt;String, Object&gt;()</td><td  >POST<br/>
s3bucket/get-file</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >S3bucketCommonResponseModel()</td><td ></td></tr><tr><td  >2</td><td  >S3ファイル登録</td><td  >S3bucket<br/>
/CaptureFile</td><td  >・bucket：S3ファイル<br/>
・companyCode：企業コード<br/>
・apicaller：レストランマスタ<br/>
・fileName：ファイル名<br/>
・fileContent：ファイル内容<br/>
・fileHash：ファイルハッシュ<br/>
・storeCode：個店：「企業ｺｰﾄﾞ/店舗ｺｰﾄﾞ」フォルダ、共有：「企業ｺｰﾄﾞ」フォルダ</td><td  >S3bucketCaptureFilePost</td><td  >s3bucketService.<br/>
S3bucketCaptureFile</td><td  >MultipartFile()</td><td  >POST<br/>
s3bucket/capture-file</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >S3bucketCommonResponseModel()</td><td ></td></tr><tr><td  >3</td><td  >S3ファイル削除</td><td  >S3bucket<br/>
/DeleteFile</td><td  >・bucket：S3ファイル<br/>
・companyCode：企業コード<br/>
・apicaller：レストランマスタ<br/>
・fileName：ファイル名<br/>
・storeCode：個店：「企業ｺｰﾄﾞ/店舗ｺｰﾄﾞ」フォルダ、共有：「企業ｺｰﾄﾞ」フォルダ

</td><td  >S3bucketDeleteFilePost</td><td  >s3bucketService.<br/>
S3bucketDeleteFile</td><td  >Map&lt;String, Object&gt;()</td><td  >POST<br/>
s3bucket/delete-file</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >S3bucketCommonResponseModel()</td><td ></td></tr><tr><td  >4</td><td  >S3フォルダ作成</td><td  >S3bucket<br/>
/CreateFoldereFile</td><td  >実装してない</td><td  >S3bucketCreateFolderPost</td><td ></td><td  >Map&lt;String, Object&gt;()</td><td  >POST
s3bucket/create-folder</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >S3bucketCommonResponseModel()</td><td ></td></tr><tr><td  >5</td><td  >S3フォルダ削除</td><td  >S3bucket<br/>
/DeleteFolder</td><td  >実装してない</td><td  >S3bucketDeleteFolderPost</td><td ></td><td  >Map&lt;String, Object&gt;()</td><td  >POST<br/>
s3bucket/delete-folder</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >S3bucketCommonResponseModel()</td><td ></td></tr>
</table>

#### ２．２．４２．状態管理
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    > リクエストモデル</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>
<tr><td  >1</td><td  >端末状態取得処理</td><td  >StateManagement<br/>
/DevicesStatusQuery</td><td  >・nodeId：店舗コード<br/>
・orderBy：'name'<br/>
・ascending：true<br/>
・startIndex：0<br/>
・batchSize：0</td><td  >devicesStatusQuery</td><td  >devicesService.<br/>
postDevicesQuery</td><td  >GetDevicesStatusQueryRequestModel()</td><td  >POST<br/>
devices/query</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >GetDevicesStatusQueryResponseModel()</td><td ></td></tr>
</table>



#### ２．２．４３．店舗グループ１登録
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    > リクエストモデル</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>
<tr><td  colspan="1" rowspan="5" >1</td><td  colspan="1" rowspan="5" >店舗グループ１マスタ更新処理</td><td colspan="1" rowspan="5" >StoreGroup1Master<br/>
/Update</td><td  >・name：名称：企業コード＋ユーザーID＋タイムスタンプ<br/>
・status：'Draft'</td><td  colspan="1" rowspan="5" >storeGroup1MasterUpdate</td><td  >changePlanService.<br/>
postChangePlan</td><td  colspan="1" rowspan="5" >Map&lt;String, Object&gt;()</td><td  >POST<br/>
changeplans/records/{changeplanName}</td><td  colspan="1" rowspan="5" >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  colspan="1" rowspan="5" >PutStoreResponseModel()</td><td  colspan="1" rowspan="5" ></td></tr><tr><td  >・changePlanName：名称：企業コード＋ユーザーID＋タイムスタンプ<br/>
・nodeId：企業コード</td><td  >configurationsService.<br/>
postNodesNodeId</td><td  >POST<br/>
configurations/nodes</td></tr><tr><td  >・name：名称：企業コード＋ユーザーID＋タイムスタンプ<br/>
・changePlanName：名称：企業コード＋ユーザーID＋タイムスタンプ<br/>
・deleted：false<br/>
・STORE_GROUP_1："STORE_GROUP_1"</td><td  >configurationsService.<br/>
postNodes</td><td  >POST<br/>
configurations/nodes</td></tr><tr><td  >・name：名称<br/>
・version：バージョン<br/>
・status：'Pending'<br/>
・Notes：フリーテキスト</td><td  >changePlanService.<br/>
postChangePlan</td><td  >POST<br/>
changeplans/records/{changeplanName}</td></tr><tr><td  >・changePlanNameUnitCdStr名称：企業コード＋ユーザーID＋タイムスタンプ</td><td  >changePlanService.<br/>
postChangePlanExecute</td><td  >POST<br/>
changeplans/execute</td></tr><tr><td  >2</td><td  >店舗グループ１マスタ削除処理</td><td  >StoreGroup1Master<br/>
/Delete</td><td  >実装してない</td><td  >storeGroup1MasterDeleted</td><td ></td><td  >Map&lt;String, Object&gt;()</td><td ></td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >PutStoreResponseModel()</td><td ></td></tr>
</table>





#### ２．２．４４．店舗グループ２登録
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    > リクエストモデル</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>
<tr><td  colspan="1" rowspan="5" >1</td><td  colspan="1" rowspan="5" >店舗グループ２マスタ更新処理</td><td  colspan="1" rowspan="5" >StoreGroup2Master<br/>
/Update</td><td  >・name：名称：企業コード＋ユーザーID＋タイムスタンプ<br/>
・status：'Draft'</td><td  colspan="1" rowspan="5" >storeGroup2MasterUpdate</td><td  >changePlanService.<br/>
postChangePlan</td><td  colspan="1" rowspan="5" >Map&lt;String, Object&gt;()</td><td  >POST<br/>
changeplans/records/{changeplanName}</td><td  colspan="1" rowspan="5" >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  colspan="1" rowspan="5" >PutStoreResponseModel()</td><td  colspan="1" rowspan="5" ></td></tr><tr><td  >・changePlanName：名称：企業コード＋ユーザーID＋タイムスタンプ<br/>
・nodeId：企業コード</td><td  >configurationsService.<br/>
postNodesNodeId</td><td  >POST<br/>
configurations/nodes</td></tr><tr><td  >・name：名称：企業コード＋ユーザーID＋タイムスタンプ<br/>
・changePlanName：名称：企業コード＋ユーザーID＋タイムスタンプ<br/>
・deleted：false<br/>
・STORE_GROUP_2："STORE_GROUP_2"</td><td  >configurationsService.<br/>
postNodes</td><td  >POST<br/>
configurations/nodes</td></tr><tr><td  >・name：名称<br/>
・version：バージョン<br/>
・status：'Pending'<br/>
・Notes：フリーテキスト</td><td  >changePlanService.<br/>
postChangePlan</td><td  >POST<br/>
changeplans/records/{changeplanName}</td></tr><tr><td  >・changePlanNameUnitCdStr名称：企業コード＋ユーザーID＋タイムスタンプ</td><td  >changePlanService.<br/>
postChangePlanExecute</td><td  >POST
changeplans/execute</td></tr><tr><td  >2</td><td  >店舗グループ２マスタ削除処理</td><td  >StoreGroup2Master<br/>
/Delete</td><td  >実装してない</td><td  >storeGroup2MasterDeleted</td><td ></td><td  >Map&lt;String, Object&gt;()</td><td ></td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >PutStoreResponseModel()</td><td ></td></tr>
</table>


#### ２．２．４５．店舗マスタ登録
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    > リクエストモデル</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>

<tr><td  >1</td><td  >店舗マスタ検索処理</td><td  >StoreMaster<br/>
/StoreSearch</td><td  >・storeCd：(min = 1, max = 6)
</td><td  >storeSearch</td><td  >configurationsService.<br/>
getNodesNodeId</td><td  >GetStoreRequestRcvModel()</td><td  >GET<br/>
configurations/nodes/list</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >GetStoreResponseModel()</td><td ></td></tr><tr><td  >2</td><td  >店舗マスタ検索一括処理</td><td  >StoreMaster<br/>
/StoreAllSearch</td><td  >・changePlanName：''<br/>
・filter：'ALL'<br/>
・excludeFields：true<br/>
・nodeNames：企業コード(文字列)<br/>
・batchSize：0</td><td  >storeAllSearch</td><td  >configurationsService.<br/>
getNodesList</td><td  >GetStoreRequestRcvModel()</td><td  >GET<br/>
configurations/nodes/list</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >GetStoreResponseModel()</td><td ></td></tr><tr><td  colspan="1" rowspan="8" >3</td><td  colspan="1" rowspan="8" >店舗マスタ更新処理</td><td  colspan="1" rowspan="8" >StoreMaster<br/>
/StoreInfoRegist</td><td  >・name：名称：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ<br/>
・status：'Draft'</td><td  colspan="1" rowspan="8" >storeInfoRegist</td><td  >changePlanService.<br/>
postChangePlan</td><td  colspan="1" rowspan="8" >PutStoreRequestModel()</td><td  >POST<br/>
changeplans/records/{changeplanName}</td><td  colspan="1" rowspan="8" >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  colspan="1" rowspan="8" >PutStoreResponseModel()</td><td  colspan="1" rowspan="8" ></td></tr><tr><td  >・changePlanName：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ</td><td  >configurationsService.<br/>
postNodesNodeId</td><td  >POST<br/>
configurations/nodes</td></tr><tr><td  >・changePlanName：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ<br/>
・name：企業コード<br/>
・parentName：親コード<br/>
・displayName：企業名称<br/>
・storeGroup1：店舗グループ１<br/>
・storeGroup2：店舗グループ２<br/>
・addr：郵便番号<br/>
・address1：住所<br/>
・phone：電話番号<br/>
・fax：FAX番号<br/>
・operationForm：運用形態<br/>
・displayOrder：表示順<br/>
・locale：固定の項目<br/>
　・defaultValue："The currently configured default locale."<br/>
　・type："key"<br/>
　・name："LOCALE"<br/>
　・value："ja-JP"<br/>
　・group："STORE"<br/>
　・subGroup："INFO"<br/>
・timezone：固定の項目<br/>
　・defaultValue："Defines the timezone for the node."<br/>
　・type："key"<br/>
　・name："TIMEZONE"<br/>
　・value："Asia/Tokyo"<br/>
　・group："STORE_OPEARATIONS"<br/>
　・subGroup："CONFIG"<br/>
・catalogModel：固定の項目<br/>
　・group："TSTORE_OPERATIONS"<br/>
　・subGroup："CONFIG"<br/>
　・type："List"<br/>
　・entryType："Text"<br/>
　・inherited：false<br/>
　・name："CATALOG"<br/>
　・value：CommonValueOrderModelリスト<br/>
・pricelistsModel： プライスリスト<br/>
　・group："STORE_OPERATIONS"<br/>
　・subGroup："CONFIG"<br/>
　・type："Map"<br/>
　・inherited：false<br/>
　・name："PRICE_LISTS"<br/>
　・value：ConfigurationsPriceExtendsModel<br/>
　・extends：true<br/>
　・list：ConfigurationsPriceExtendsDetailModelリスト<br/>
・PRICE_LISTS　<br/>
　・pricelistsName：<br/>
　　・order：0<br/>
　　・priceListName：店舗コード<br/>
・BUSINESS_DAY_START_TIME_MAP：固定項目<br/>
　・group："CASH-MANAGEMENT"<br/>
　・subGroup："CONFIG"<br/>
　・type："key"<br/>
　・inherited：false<br/>
　・name："BUSINESS_DAY_START_TIME"<br/>
・BUSINESS_DAY_SOFT_END_TIME：固定項目<br/>
　・group："CASH-MANAGEMENT"<br/>
　・subGroup："CONFIG"<br/>
　・type："key"<br/>
　・inherited：false<br/>
　・name："BUSINESS_DAY_SOFT_END_TIME"<br/>
・BUSINESS_DAY_HARD_END_TIME：固定項目<br/>
　・group："CASH-MANAGEMENT"<br/>
　・subGroup："CONFIG"<br/>
　・type："key"<br/>
　・inherited：false<br/>
　・name："BUSINESS_DAY_HARD_END_TIME"<br/>
</td><td  >configurationsService.<br/>
postNodes</td><td  >POST<br/>
configurations/nodes</td></tr><tr><td  >・paymentRestrictions：null<br/>
・description：null<br/>
・name：名称<br/>
・defaultValue：表示名称<br/>
・ChangePlan().Name：実行計画名<br/>
・deleted：false<br/>
・</td><td  >catalogsService.<br/>
postCatalogs</td><td  >POST<br/>
catalogs/{catalogName}/items</td></tr><tr><td  >・name：名称<br/>
・displayName：名称<br/>
・deleted：false<br/>
・startDate：開始日<br/>
・currencyCode：'JPY'</td><td  >pricelistsService.<br/>
postPricelists</td><td  >POST<br/>
pricelists/{priceListName}</td></tr><tr><td  >・nodeId：企業コード(15桁) + 店舗コード(６桁)</td><td  >initialdataService.<br/>
postInitialData</td><td  >POST<br/>
application-facade/entry-initial-data</td></tr><tr><td  >・name：名称<br/>
・version：バージョン<br/>
・status：'Pending'<br/>
・Notes：フリーテキスト</td><td  >changePlanService.<br/>
postChangePlan</td><td  >changeplans/records/{changeplanName}</td></tr><tr><td  >・changePlanNameUnitCdStr：企業コード＋店舗コード＋ユーザーID＋タイムスタンプ</td><td  >changePlanService.<br/>
postChangePlanExecute</td><td  >POST<br/>
changeplans/execute</td></tr><tr><td  colspan="1" rowspan="6" >4</td><td  colspan="1" rowspan="6" >店舗マスタ削除処理</td><td  colspan="1" rowspan="6" >StoreMaster<br/>
/StoreInfoDeleted/{storeCd}</td><td  >・name：名称
・status：'Draft'</td><td  colspan="1" rowspan="6" >storeInfoDeleted</td><td  >changePlanService.<br/>
postChangePlan</td><td  colspan="1" rowspan="6" ></td><td  >POST
changeplans/records/{changeplanName}</td><td  colspan="1" rowspan="6" >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  colspan="1" rowspan="6" >DeleteStoreResponseModel()</td><td  colspan="1" rowspan="6" ></td></tr><tr><td  >・nodeId：企業コード(15桁) + 店舗コード(６桁)</td><td  >deletes3storefolderService.<br/>
postDeleteS3storefolder</td><td  >POST<br/>
application-facade/delete-s3storefolder</td></tr><tr><td  >・changePlanName：''</td><td  >configurationsService.<br/>
postNodesNodeId</td><td  >POST<br/>
configurations/nodes</td></tr><tr><td  >・deleted：true</td><td  >configurationsService.<br/>
postNodes</td><td  >POST<br/>
configurations/nodes</td></tr><tr><td  >・name：名称<br/>
・version：バージョン<br/>
・status：'Pending'<br/>
・Notes：フリーテキスト</td><td  >changePlanService.<br/>
postChangePlan</td><td  >POST<br/>
changeplans/records/{changeplanName}</td></tr><tr><td  >・changePlanNameUnitCdStr</td><td  >changePlanService.<br/>
postChangePlanExecute</td><td  >POST<br/>
changeplans/execute</td></tr>
</table>



#### ２．２．４６．税率設定、操作ボタン設定、プリセットマスタ登録、商品構成マスタ登録、商品マスタ登録
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    > リクエストモデル</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>
<tr><td  >1</td><td  >税率設定セットPOSTの検索プロセス</td><td  >TaxTaxes<br/>
/Query</td><td  >・nodeId：企業コード</td><td  >postTaxRequest</td><td  >taxService.<br/>
getTaxTaxes</td><td  >TaxSetsRequest()</td><td  >POST<br/>
tax/sets/{nodeId}/taxes</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･正常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >TaxSetsResponse()</td><td ></td></tr><tr><td  >2</td><td  >税率設定セット更新</td><td  >TaxTaxes<br/>
/ReservationUpdate</td><td  >・nodeId：企業コード</td><td  >postTaxUpdateRequest</td><td  >taxService.<br/>
updateTaxTaxes2</td><td ></td><td  >POST<br/>
tax/sets/{nodeId}/taxes</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >RentalsUpdateResponseModel()</td><td ></td></tr><tr><td  colspan="1" rowspan="2" >3</td><td  colspan="1" rowspan="2" >税率設定セット更新</td><td  colspan="1" rowspan="2" >TaxTaxes<br/>
/ReservationUpdateReflect</td><td  >・nodeId：企業コード</td><td  colspan="1" rowspan="2" >postTaxUpdateReflectRequest</td><td  >taxService.<br/>
updateTaxTaxes2</td><td  colspan="1" rowspan="2" ></td><td  colspan="1" rowspan="2" >POST<br/>
tax/rates/reservations/{reservationsid}/reflect</td><td  colspan="1" rowspan="2" >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  colspan="1" rowspan="2" >RentalsUpdateResponseModel()</td><td  colspan="1" rowspan="2" ></td></tr><tr><td  >・reservationsid：id</td><td  >taxService.<br/>
updateTaxTaxesReflect</td></tr><tr><td  >4</td><td  >変更基準日一覧の取得</td><td  >TaxTaxes<br/>
/ReservationList</td><td  >・nodeId：企業コード<br/>
・excludeFields：Boolean</td><td  >postTaxRateReservationListRequest</td><td  >taxService.<br/>
getTaxRateReservationList</td><td  >GetReservationDateRequestModel()</td><td  >PUT<br/>
tax/rates/reservations/list</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･正常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >ReservationDateResponseModel()</td><td ></td></tr><tr><td  >5</td><td  >変更基準日の取得</td><td  >TaxTaxes<br/>
/ReservationGet</td><td  >・id：税率ID</td><td  >getTaxRateReservation</td><td  >taxService.<br/>
getTaxRateReservation</td><td  >TaxRateReservationRequestModel()</td><td  >PUT<br/>
tax/rates/reservations</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >RentalsUpdateResponseModel()</td><td ></td></tr><tr><td  >6</td><td  >変更基準日の削除</td><td  >TaxTaxes<br/>
/ReservationDel</td><td  >・id：税率ID</td><td  >deleteTaxRateReservation</td><td  >taxService.<br/>
delTaxRateReservation</td><td  >TaxRateReservationRequestModel()</td><td  >PUT<br/>
tax/rates/reservations/{id}</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >RestaurantsCommonResponseModel()</td><td ></td></tr>
</table>


#### ２．２．４７．業務メニュー
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    > リクエストモデル</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>
<tr><td  >1</td><td  >セッション情報の存在チェックを行う</td><td  >Top<br/>
/CheckSession</td><td  >・ request：HttpServletの リクエストモデル</td><td  >checkSession</td><td  >sessionUtil.
getActiveLoginUser</td><td  >HttpServlet()</td><td  >POST<br/>
CookieよりセッションIDを取得</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >ApiCommonResponseModel()</td><td ></td></tr>
</table>


#### ２．２．４８．ユーザマスタ登録、商品分類階層設定
<table ><tr style="font-weight: bold;text-align: center;"><td  >No</td><td    >処理内容</td><td  >URL<br/>（Front-end）</td><td  >入力パラメータ</td><td    >controller</td><td    >service</td><td    > リクエストモデル</td><td  >URI<br/>（MS）</td><td    >戻り値判定</td><td    >レスポンスモデル</td><td    >備考</td></tr>
<tr><td  colspan="1" rowspan="2" >1</td><td  colspan="1" rowspan="2" >ユーザマスタ検索処理</td><td  colspan="1" rowspan="2" >UserMaster<br/>
/UserQuery</td><td  colspan="1" rowspan="2" >・userId：ユーザID（50桁）<br/>
・name：名称<br/>
・searchFlg：検索フラグ<br/>
・changePlanName：''<br/>
・filter：'ALL'<br/>
・excludeFields：true<br/>
・nodeNames：企業コード(文字列)<br/>
・batchSize：1</td><td  colspan="1" rowspan="2" >userQuery</td><td  colspan="1" rowspan="2" >authorizationService.<br/>
postUsersQuery</td><td  colspan="1" rowspan="2" >GetUserRequestModel()</td><td  colspan="1" rowspan="2" >POST<br/>
authorization/users/query</td><td  colspan="1" rowspan="2" >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  colspan="1" rowspan="2" >PostAuthorizationUsersQueryResponseModel()</td><td  colspan="1" rowspan="2" ></td></tr><tr></tr><tr><td  >2</td><td  >	ユーザマスタ取得処理</td><td  >UserMaster<br/>
/UserSearch</td><td  >・userId：ユーザID（50桁）<br/>
・name：名称<br/>
・searchFlg：検索フラグ</td><td  >userSearch</td><td  >authorizationService.<br/>
postUsersRetrieve</td><td  >GetUserRequestModel()</td><td  >POST<br/>
authorization/users/retrieve</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >PostAuthorizationUsersRetrieveResponseModel()</td><td ></td></tr><tr><td  colspan="1" rowspan="3" >3</td><td  colspan="1" rowspan="3" >ユーザマスタ更新処理	</td><td  colspan="1" rowspan="3" >UserMaster<br/>
/UserInfoRegist</td><td  >・userId：ユーザID(50桁)<br/>
・name：名称(20バイト)<br/>
・passwordUpdateFlg：パスワード更新フラグ(最小値0,最大値1)<br/>
・password：パスワード<br/>
・passwordChangeDate: 0<br/>
・passwordExpirationDate：パスワード有効期限(最小値1,最大値99)<br/>
・passwordErrors: 0<br/>
・belongStoreCd：所属店舗コード<br/>
・headquartersPermission：本部権限最小値0,最大値1)<br/>
・chargeStoreCds：担当店舗情報<br/>
・id：ユーザID<br/>
・version：バージョン<br/>
・amountOff：値引<br/>
・percentOff：割引<br/>
・salesChange：：売変<br/>
・cancellation取引中止<br/>
・deposit：入金<br/>
・withdrawal：出金<br/>
・changeReserve：釣銭準備金入力<br/>
・changeMachineInventoryCheck：釣銭機在高点検<br/>
・changeMachineRemaining：入金機回収<br/>
・changeMachineConnectDisconnect：釣銭機接続／切離<br/>
・report：レポート<br/>
・transactionSearch：取引検索<br/>
・registerMinus：レジマイナス<br/>
・returnValue：返品<br/>
・audit：監査<br/>
・calculate：清算<br/>
・exchange：両替権限<br/>
・amountInput：手持在高入力<br/>
・oesProg：プログラム送信<br/>
・oesSet：設定送信<br/>
・partCorrcet：一部訂正<br/>
・tendCorrcet：締め訂正<br/>
・unpaidDelete：未会計オ一ダ`一取消<br/>
・oesTime：時刻同期<br/>
・username：責任者No.<br/>
・accessAuthority：accessAuthority<br/>
・posPrintingName：POS印字名称<br/>
・posPassword：POSパスワード<br/>
・posUserName：責任者No.<br/>

</td><td  colspan="1" rowspan="3" >userInfoRegist</td><td  >authorizationService
.postUsers</td><td  colspan="1" rowspan="3" >PutUserRequestModel()</td><td  colspan="1" rowspan="3" >POST<br/>
authorization/users</td><td  colspan="1" rowspan="3" >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  colspan="1" rowspan="3" >PutUserResponseModel()</td><td  colspan="1" rowspan="3" ></td></tr><tr><td  >第一回設定<br/>
・userId：ユーザID(50桁)<br/>
・homeStore：false<br/>
・nodeId：SYSTEM<br/>
・roles： ("ADMIN","POS_CASHIER","POS_MANAGER")<br/>
・id:ユーザID</td><td  >authorizationService.<br/>
postUsersDeleteRoles</td></tr><tr><td  >第二回設定<br/>
・userId：ユーザID(50桁)
権限ありの場合<br/>
・nodeId：企業コード
権限なしの場合<br/>
・nodeId：所属店舗<br/>
・homeStore:true</td><td  >authorizationService.<br/>
postUsersRoles</td></tr><tr><td  >4</td><td  >ユーザマスタ削除処理	</td><td  >UserMaster<br/>
/UserInfoDeleted/{userId}</td><td  >・userId：ユーザID</td><td  >storeInfoDelete</td><td  >authorizationService.<br/>
postUsersDeleteUser</td><td ></td><td  >DELETE<br/>
authorization/users/delete-user</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >PostAuthorizationUsersDeleteUserResponseModel()	</td><td ></td></tr><tr><td  >5</td><td  >税率一覧の取得</td><td  >UserMaster<br/>
/AccessList</td><td  >・userId：ユーザID（50桁）<br/>
・name：名称<br/>
・searchFlg：検索フラグ</td><td  >getAccessList</td><td  >permissionsService.<br/>
getList</td><td  >GetUserRequestModel()</td><td  >GET<br/>
permissions</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >PostAuthorizationUsersRetrieveResponseModel()	</td><td ></td></tr><tr><td  >6</td><td  >アカウントロックユーザ取得処理	</td><td  >UserMaster<br/>
/PwLockOutList</td><td  >・userId：ユーザID（50桁）<br/>
・name：名称<br/>
・changePlanName：''<br/>
・filter：'ALL'<br/>
・excludeFields：true<br/>
・nodeNames：企業コード(文字列)<br/>
・batchSize：0<br/>
・searchFlg：検索フラグ<br/>
・accountClassification：1</td><td  >pwLockOutList</td><td  >configurationsService.<br/>
getNodesList</td><td  >GetUserRequestModel()</td><td  >POST<br/>
authorization/users/query</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >PasswordLockUserListModel()</td><td ></td></tr><tr><td  >7</td><td  >ロック解除処理	</td><td  >UserMaster<br/>
/PwUnLock</td><td  >・userId：ユーザID<br/>
・userStatuses：ユーザ情報</td><td  >pwUnLock</td><td  >authorizationService.<br/>
postUsersRetrieve</td><td  >PasswordUnLockUserListModel()</td><td  >PUT<br/>
authorization/users</td><td  >■オンライン正常<br/>
・statusCode:200･･･正常（応答コード：0）<br/>
・statusCode:204･･･異常（応答コード：2）<br/>
・statusCode:200以外･･･異常（応答コード：statusCode）<br/>
■オンライン異常<br/>
・JSON変換エラー･･･異常（応答コード：-20）<br/>
・以外･･･異常（応答コード：-30）<br/>
■オフライン（Back-end→MS）<br/>
・通信異常･･･異常（応答コード：-10）</td><td  >PutUserResponseModel()</td><td ></td></tr>
</table>



#### 




---
