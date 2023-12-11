<style src="@/resource/static/css/CommonDesign/utils.css"></style>
<style src="@/resource/static/css/EndButtonSetting/endButtonSetting.css"></style>
<script type="text/javascript" src="@/resource/static/js/EndButtonSetting/endButtonSetting.js"></script>
<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221209  duyouwei(Neusoft) G001.00.0  issue課題#1153を対応します.
 * 20221213  zhaomingyue(Neusoft) G002.00.0  issue課題#1198,#1199を対応します.
 * 20221223  gotou(TEC) G003.00.0  issue課題#1153を対応します.
 * 20230106  bai.ry(Neusoft) G004.00.0  issue課題#1395を対応します.
 * 20230110  litie(Neusoft)    G005.00.0  issue課題#1058を対応します.
 * 20230116  bai.ry(Neusoft) G006.00.0  issue課題#1396を対応します.
 * 20230116  bai.ry(Neusoft) G007.00.0  issue課題#1399を対応します.
 * 20230130  bai.ry(Neusoft) G008.00.0  issue課題#1395を対応します.
 * 20230130  xu.jh(Neusoft) G009.00.0  issue課題#1683を対応します.
 * 20230423  qinshh(Neusoft) G010.00.0  issue課題#1681#1392を対応します.
 * 20230522  qinshh(Neusoft) G010.00.1    issue課題#1392を対応します.
 * 20230629  wangchunmei(Neusoft) G011.00.0    issue課題#1424を対応します.
 * 20230809  heqianlong(Neusoft) G012.00.0  issue課題#1170を対応します.
 * 20230815  qinshh(Neusoft) G013.00.0  issue課題#1195を対応します.
-->
<template>
  <v-container
    class="mt-15 end-button-setting"
    style="max-width:100%;">
    <!-- 対象店舗 -->
    <!-- KSD V001.000 DS -->
    <!-- <v-row -->
    <!--  no-gutters -->
    <!--  class="conditionRow w-100 d-flex align-center mt-5"> -->
    <!-- KSD V001.000 DE -->
    <!-- KSD V001.000 AS -->
    <v-row
      justify="center"
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <!-- KSD V001.000 AE -->
      <v-col
        cols="2"
        class="h-100">
        <label
          for="targetStore"
          class="grayFrame h-100 w-100 d-flex justify-center align-center">
          {{ "対象店舗" }}
        </label>
      </v-col>
      <v-col
        cols="6"
        class="h-100 d-flex align-center">
        <!-- G005.00.0 Update-Start -->
        <!-- <store-select v-model="targetStoreCodes" multiple /> -->
        <!-- G010.00.0 Update-Start -->
        <!-- <store-select v-model="targetStoreCodes" @change="fetchTargetStoresInfo" multiple headquartersAuthorityCheckEnable /> -->
        <store-select
          v-model="targetStoreCodes"
          multiple
          headquarters-authority-check-enable />
          <!-- G010.00.0 Update-Start -->
          <!-- G005.00.0 Update-End -->
      </v-col>
    </v-row>

    <!-- 基準店舗 -->
    <!-- KSD V001.000 DS -->
    <!-- <v-row -->
    <!--  no-gutters -->
    <!--  class="conditionRow w-100 d-flex align-center mt-1"> -->
    <!-- KSD V001.000 DE -->
    <!-- KSD V001.000 AS -->
    <v-row
      justify="center"
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-1">
      <!-- KSD V001.000 AE -->
      <v-col
        cols="2"
        class="h-100">
        <label
          for="sourceStore"
          class="grayFrame h-100 w-100 d-flex justify-center align-center">
          {{ "基準店舗" }}
        </label>
      </v-col>
      <v-col
        cols="6"
        class="h-100 d-flex align-center">
        <!-- G010.00.1 Update-Start -->
        <!-- G005.00.0 Update-Start -->
        <!-- <store-select v-model="sourceStoreCodes" @change="fetchStoresInfo" /> -->
        <store-select
          v-model="sourceStoreCodes"
          @change="fetchStoresInfo(arguments)"
          headquarters-authority-check-enable />
          <!-- G005.00.0 Update-End -->
          <!-- G010.00.1 Update-End -->
      </v-col>
    </v-row>

    <div
      v-if="checkStoresSelected"
      class="text-center my-4">
      <!-- <div class="text-center my-4"> -->
      <!-- KSD V001.000 AS -->
      <v-row>
        <v-col
          cols="6"
          class="py-0">
          <p class="ma-0 pa-0 text-left row-count">
            {{ $t("F322b2.S064") }}{{ data.length }}{{ $t("F322b2.S065") }}
          </p>
        </v-col>
      </v-row>
      <!-- KSD V001.000 AE -->
      <table class="end-button-table" >
        <thead>
          <tr>
            <th
              rowspan="2"
              class="grayFrame">
              締め<br>No.
            </th>
            <th
              rowspan="2"
              class="grayFrame">名称</th>
            <th class="grayFrame">預り入金</th>
            <!-- G001.00.0 Update-Start -->
            <!-- <th class="grayFrame">ショートテンド</th> -->
            <!-- <th class="grayFrame">オーバーテンド</th> -->
            <th class="grayFrame">ｼｮｰﾄﾃﾝﾄﾞ</th>
            <th class="grayFrame">ｵｰﾊﾞｰﾃﾝﾄﾞ</th>
            <!-- KSD V001.000 AS -->
            <th class="grayFrame">{{ $i18n.t('F322b2.S008') }}</th>
            <!-- KSD V001.000 AE -->
            <!-- G001.00.0 Update -End -->
            <th class="grayFrame">現金扱い</th>
            <!-- G001.00.0 Add-Start -->
            <th class="grayFrame">商品券</th>
            <!-- G001.00.0 Add-End -->
            <!-- G001.00.0 Update-Start -->
            <!-- <th class="grayFrame">ドロワーオープン</th> -->
            <th class="grayFrame">ﾄﾞﾛﾜｵｰﾌﾟﾝ</th>
            <!-- KSD V001.000 AS -->
            <th class="grayFrame">釣銭</th>
            <!-- KSD V001.000 AE -->
            <!-- G001.00.0 Update -End -->

            <th
              rowspan="2"
              class="grayFrame">編集</th>
          </tr>
          <tr>
            <!-- KSD V001.000 DS -->
            <!-- <th class="grayFrame">釣銭</th> -->
            <!-- KSD V001.000 DE -->
            <th class="grayFrame">収入印紙</th>
            <!-- KSD V001.000 AS -->
            <th class="grayFrame">{{ $i18n.t('F322b2.S013') }}</th>
            <th class="grayFrame">{{ $i18n.t('F322b2.S014') }}</th>
            <th class="grayFrame">{{ $i18n.t('F322b2.S015') }}</th>
            <!-- KSD V001.000 AE -->
            <th class="grayFrame">入金</th>
            <th class="grayFrame">出金</th>
            <!-- KSD V001.000 AS -->
            <th class="grayFrame">{{ $i18n.t('F322b2.S018') }}</th>
            <!-- KSD V001.000 AE -->
            <!-- G001.00.0 Update-Start -->
            <!-- <th class="grayFrame">CCT連動</th> -->
            <!-- <th class="grayFrame">サブメディア管理</th> -->
            <th class="grayFrame">ｻﾌﾞﾒﾃﾞｨｱ管理</th>
            <!-- KSD V001.000 DS -->
            <!-- <th class="grayFrame">CCT連動</th> -->
            <!-- KSD V001.000 DE -->
            <!-- G001.00.0 Update -End -->
            <!--  G001.00.0 Delete-Start -->
            <!-- <th class="grayFrame"></th> -->
            <!--  G001.00.0 Delete-End -->
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in data">
            <!-- <tr :key="index"> -->
            <tr :key="index">
              <!-- G001.00.0 Update-Start -->
              <!-- <td rowspan="2">{{ index + 1 }}</td> -->
              <td rowspan="2">{{ item.id }}</td>
              <!-- G001.00.0 Update -End -->
              <td rowspan="2">{{ item.value.displayName.default }}</td>

              <!-- 預かり入金 -->
              <td>{{ item.value.deposit ? '強制' : '任意' }}</td>

              <!-- ショートテンド -->
              <td>{{ item.value.shortTend ? '許可' : '禁止' }}</td>

              <!-- オーバーテンド -->
              <td>{{ item.value.overTend ? '許可' : '禁止' }}</td>

              <!-- KSD V001.000 AS -->
              <!-- 決済種別 -->
              <td>{{ item.value.settlementType ? isDisplayType(item.value.settlementType, paymentTypeList) : "" }}</td>
              <!-- KSD V001.000 AE -->

              <!-- 現金扱い -->
              <!-- G001.00.0 Update-Start -->
              <!-- <td>{{ item.value.group }}</td> -->
              <!-- KSD V001.000 DS -->
              <!--<td>{{ item.value.group === "CASH" ? "対象" : "非対象" }}</td>-->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <td>{{ item.value.handlingCash ? "対象" : "非対象" }}</td>
              <!-- KSD V001.000 AE -->
              <!-- G001.00.0 Update -End -->

              <!-- G001.00.0 Add-Start -->
              <!-- 商品券 -->
              <td>{{ item.value.giftCertificates ? '対象' : '非対象' }}</td>
              <!-- G001.00.0 Add-End -->

              <!-- ドロワーオープン -->
              <td>{{ item.value.openCashDrawer ? 'する' : 'しない' }}</td>

              <!-- 釣り銭 -->
              <!-- G001.00.0 Delete-Start -->
              <!-- <td>{{ item.value.change ? '対象' : '非対称' }}</td> -->
              <!-- G001.00.0 Delete-End -->

              <!-- KSD V001.000 AS -->
              <!-- 釣り銭 -->
              <td>{{ item.value.change ? '対象' : '非対称' }}</td>
              <!-- KSD V001.000 AE -->

              <td rowspan="2">
                <div class="iconCol">
                  <!-- G002.00.0 Update-Start -->
                  <img
                    class="icon"
                    src="@/assets/ico_edit@2x.png"
                    @click="editItem(item)"
                    width="35"
                    height="35">
                  <!-- <img
                  v-if="item.value.name === 'PAYMENT_01'"
                    class="icon"
                    src="@/assets/ico_edit_h@2x.png"
                    width="35"
                    height="35"
                  />
                  <img
                    v-else
                    class="icon"
                    src="@/assets/ico_edit@2x.png"
                    @click="editItem(item)"
                    width="35"
                    height="35"
                  /> -->
                  <!-- G002.00.0 Update-End -->
                </div>
              </td>
            </tr>
            <tr :key="(index + 1) * 1000">

              <!-- G001.00.0 Add-Start -->
              <!-- 釣り銭 -->
              <!-- KSD V001.000 DS -->
              <!-- <td>{{ item.value.change ? '対象' : '非対象' }}</td> -->
              <!-- KSD V001.000 DE -->
              <!-- G001.00.0 Add-End -->

              <!-- 収入印紙 -->
              <!-- G001.00.0 Update-Start -->
              <!-- <td>{{ item.value.revenueStamp ? '対象' : '非対称' }}</td> -->
              <td>{{ item.value.revenueStamp ? '対象' : '非対象' }}</td>
              <!-- G001.00.0 Update -End -->

              <!-- KSD V001.000 AS -->
              <!-- ﾚｼｰﾄ枚数 -->
              <td>{{ item.value.copyreceiptNum }}</td>

              <!-- 店控えﾚｼｰﾄ -->
              <td>{{ item.value.storeReserve ? 'する' : 'しない' }}</td>

              <!-- 会社控えﾚｼｰﾄ -->
              <td>{{ item.value.companyReserve ? 'する' : 'しない' }}</td>
              <!-- KSD V001.000 AE -->

              <!-- 入金操作 -->
              <!-- G012.00.0 Update-Start -->
              <!-- <td>{{ item.value.depositOperation ? '許可' : '非許可' }}</td> -->
              <td>{{ item.value.depositOperation ? '許可' : '禁止' }}</td>

              <!-- 出金操作 -->
              <!-- <td>{{ item.value.withdrawalOperation ? '許可' : '非許可' }}</td> -->
              <!-- KSD V001.000 DS -->
              <!-- <td>{{ item.value.depositOperation ? '許可' : '禁止' }}</td> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <td>{{ item.value.withdrawalOperation ? '許可' : '禁止' }}</td>
              <!-- KSD V001.000 AE -->
              <!-- G012.00.0 Update -End -->

              <!-- KSD V001.000 AS -->
              <!-- 取引検索時の現金振替 -->
              <td>{{ item.value.cashTransferStatus ? isDisplayType(item.value.cashTransferStatus, cashTransferStatusList) : "" }}</td>
              <!-- KSD V001.000 AE -->

              <!-- CCT連動 -->
              <!-- G001.00.0 Update-Start -->
              <!-- サブメディア管理 -->
              <td>{{ item.value.subMediaManagement ? 'する' : 'しない' }}</td>
              <!-- <td>{{ item.value.CCTinterlocking ? '対象' : '非対称' }}</td> -->
              <!-- KSD V001.000 DS -->
              <!-- <td>{{ item.value.CCTinterlocking ? '対象' : '非対象' }}</td> -->
              <!-- KSD V001.000 DE -->
              <!-- G001.00.0 Update -End -->
              <!-- G001.00.0 Delete-Start -->
              <!-- <td></td> -->
              <!-- G001.00.0 Delete-End -->
            </tr>
          </template>
        </tbody>
      </table>

      <v-card-actions class="">
        <v-btn
          :disabled="!permissions.includes('CLOUDPOS_TIGHTENING_BTN_UPDATE') || data.length >= 99"
          class="button dialog-fotter-button-blue footerButtonStyle"
          @click="onNewItem"
          style="color: white;">
          <!-- G001.00.0 Update-Start -->
          <!-- 追加 -->
          ＋追加
          <!-- G001.00.0 Update -End -->
        </v-btn>
        <!-- G010.00.0 Update-End -->
        <v-spacer/>
      </v-card-actions>

      <template>
        <div class="text-center baseFont">
          <v-dialog
            v-model="editDialog"
            persistent>
            <v-card
              v-if="editingItem != null"
              class="basesize">
              <v-card-title class="headline dialog-line-blue title-label">
                <div id="changeLabel">
                  <!-- G001.00.0 Update-Start -->
                  <!-- <label id="changeModelabel"
                  ><b>{{ isAddStatus ? "追加" : "編集" }}</b></label
                > -->
                  <!-- G003.00.0 Update-Start -->
                  <!--<label id="newModelabel" v-if=isAddStatus><b>{{ "追加" }}</b></label>-->
                  <label
                    id="newModelabel"
                    v-if=isAddStatus><b>{{ "新規" }}</b></label>
                  <!-- G003.00.0 Update -End -->

                  <label
                    id="changeModelabel"
                    v-if=!isAddStatus><b>{{ "編集" }}</b></label>
                <!-- G001.00.0 Update -End -->
                </div>
                <!-- G001.00.0 Update-Start -->
                <!-- <font class="dialog-title">{{ "締めNo." + (editedIndex + 1) }}</font> -->
                <font class="dialog-title">{{ "締めNo." + (editingItem.id) }}</font>
              <!-- G001.00.0 Update -End -->
              </v-card-title>

              <div
                id="baseTable"
                style="overflow-y: auto">
                <table class="conversionTable">
                  <tr>
                    <th>{{ "名称" }}</th>
                    <!-- KSD V001.000 DS -->
                    <!-- <td class=""> -->
                    <!-- KSD V001.000 DE -->
                    <!-- KSD V001.000 AS -->
                    <td :class="displayNameError !== null ? 'redFrame redBG' : 'whiteFrame h-50 w-100'">
                      <!-- KSD V001.000 AE -->
                      <!--
                    <template v-if="!isAddStatus">
                      <span class="pl-2">{{ editingItem.name }}</span>
                    </template>
                    <template v-else>
                      <input
                        v-model="editingItem.name"
                        single-line
                        class="whiteFrame h-50 w-100"
                      />
                    </template>
                    -->
                      <!-- G001.00.0 Update-Start -->
                      <!-- <input
                        v-model="editingItem.name"
                        placeholder="名称"
                        single-line
                        class="whiteFrame h-50 w-100"
                        style="height: 40px;"
                      /> -->
                      <!-- KSD V001.000 DS -->
                      <!-- G012.00.0 Update-Start -->
                      <!-- <input
                        v-model="editingItem.value.displayName.default"
                        placeholder="名称"
                        single-line
                        class="whiteFrame h-50 w-100"
                        style="height: 40px;border:none;outline:none;"
                        :disabled="isPay01Disabled"
                      > -->
                      <!-- G013.00.0 Update-End -->
                      <!-- <input -->
                       <!-- v-model="editingItem.value.displayName.default" -->
                       <!-- placeholder="半角24文字/全角12文字" -->
                       <!-- :maxlength="24" -->
                       <!-- single-line -->
                       <!-- :class="this.nameErrorMsg !== '' ? 'errorSelectBox' : 'whiteFrame h-50 w-100'" -->
                       <!-- style="border:none;outline:none;" -->
                       <!-- :disabled="isPay01Disabled" -->
                       <!-- @input="inputLimit(subItem,24,index)" -->
                      <!-- > -->
                      <!-- G013.00.0 Update-End -->
                      <!-- KSD V001.000 DE -->
                      <!-- KSD V001.000 AS -->
                      <input
                        v-model="editingItem.value.displayName.default"
                        :placeholder="this.$i18n.t('F322b2.S060')"
                        single-line
                        class="whiteFrame h-50 w-100"
                        style="height: 40px;border:none;outline:none;"
                        :class="displayNameError !== null ? 'redBG' : 'whiteFrame h-50 w-100'"
                        :disabled="isPay01Disabled"
                        @input="inputLimit(editingItem.value,24)"
                      >
                      <!-- KSD V001.000 AE -->
                      <!-- // G001.00.0 Update -End -->
                    </td>
                  </tr>
                  <!-- KSD V001.000 DS -->
                  <!-- G013.00.0 Update-Start -->
                  <!--<tr -->
                  <!--  v-if="this.nameErrorMsg !== ''" -->
                  <!--  class="errorCell"> -->
                  <!--  <th /> -->
                  <!--  <td> -->
                  <!--    <label>{{ nameErrorMsg }}</label> -->
                  <!--  </td> -->
                  <!--</tr> -->
                  <!-- G013.00.0 Update-End -->
                  <!-- KSD V001.000 DE -->
                  <!-- KSD V001.000 AS -->
                  <tr
                    v-if="displayNameError !== null"
                    class="errorCell">
                    <th/>
                    <td>
                      <label>{{ displayNameError }}</label>
                    </td>
                  </tr>
                  <!-- KSD V001.000 AE -->
                  <tr>
                    <th>{{ "預り入金" }}</th>
                    <td>
                      <radio-button
                        v-model="editingItem.value.deposit"
                        :labels="labelsDeposit" />
                    </td>
                  </tr>
                  <tr>
                    <!-- G001.00.0 Update-Start -->
                    <!-- <th>{{ "ショートテンドﾞ" }}</th> -->
                    <th>{{ "ｼｮｰﾄﾃﾝﾄﾞ" }}</th>
                    <!-- G001.00.0 Update -End -->
                    <td>
                      <!-- G002.00.0 Update-Start -->
                      <!-- <radio-button v-model="editingItem.value.shortTend" :labels="labelsPermit" /> -->
                      <!-- KSD V001.000 DS -->
                      <!-- <radio-button -->
                      <!--  v-model="editingItem.value.shortTend" -->
                      <!--  :labels="labelsPermit" -->
                      <!--  :disabled="editingItem.name === 'PAYMENT_01'" /> -->
                      <!-- KSD V001.000 DE -->
                      <!-- KSD V001.000 AS -->
                      <radio-button
                        v-model="editingItem.value.shortTend"
                        :labels="labelsPermit"
                        :disabled="disableToggleForPayment01" />
                        <!-- KSD V001.000 AE -->
                    </td>
                  </tr>
                  <tr>
                    <!-- G001.00.0 Update-Start -->
                    <!-- <th>{{ "オーバーテンドﾞ" }}</th> -->
                    <th>{{ "ｵｰﾊﾞｰﾃﾝﾄﾞ" }}</th>
                    <!-- G001.00.0 Update -End -->
                    <td>
                      <!-- <radio-button v-model="editingItem.value.overTend" :labels="labelsPermit" /> -->
                      <!-- KSD V001.000 DS -->
                      <!-- <radio-button -->
                      <!--  v-model="editingItem.value.overTend" -->
                      <!--  :labels="labelsPermit" -->
                      <!--  :disabled="editingItem.name === 'PAYMENT_01'" /> -->
                      <!-- KSD V001.000 DE -->
                      <!-- KSD V001.000 AS -->
                      <radio-button
                        v-model="editingItem.value.overTend"
                        :labels="labelsPermit"
                        :disabled="disableToggleForPayment01" />
                        <!-- KSD V001.000 AE -->
                    </td>
                  </tr>
                  <!-- KSD V001.000 AS -->
                  <tr>
                    <th>{{ $i18n.t('F322b2.S008') }}</th>
                    <td>
                      <select
                        class="h-100 w-100 whiteFrame pl-2"
                        v-model="editingItem.value.settlementType"
                        ref="paymentTypeVal"
                        :disabled="disableToggleForPayment01"
                        @change="paymentTypeOnChange()"
                      >
                        <option
                          v-for="payment in paymentTypeList"
                          :key="payment.code"
                          :value="payment.code">
                          {{ payment.displayName }}
                        </option>
                      </select>
                      <div class="pulldownArrow"></div>
                    </td>
                  </tr>
                  <!-- KSD V001.000 AE -->
                  <tr>
                    <th>{{ "現金扱い" }}</th>
                    <td>
                      <!-- <radio-button v-model="editingItem.value.group" :labels="labelsCash" /> -->
                      <!-- KSD V001.000 DS -->
                      <!-- <radio-button -->
                      <!--   v-model="editingItem.value.group" -->
                      <!--   :labels="labelsCash" -->
                      <!--   :disabled="editingItem.name === 'PAYMENT_01'" /> -->
                      <!-- KSD V001.000 DE -->
                      <!-- KSD V001.000 AS -->
                      <radio-button
                        v-model="editingItem.value.handlingCash"
                        :labels="labelsOperate"
                        :disabled="disableToggleForPayment01 || disableHandlingCashToggle" />
                        <!-- KSD V001.000 AE -->
                    </td>
                  </tr>
                  <!--  G001.00.0 Add-Start -->
                  <tr>
                    <th>{{ "商品券" }}</th>
                    <td>
                      <!-- <radio-button v-model="editingItem.value.giftCertificates" :labels="labelsOperate" /> -->
                      <!-- KSD V001.000 DS -->
                      <!-- <radio-button -->
                      <!--  v-model="editingItem.value.giftCertificates" -->
                      <!--  :labels="labelsOperate" -->
                      <!--  :disabled="editingItem.name === 'PAYMENT_01'" /> -->
                      <!-- KSD V001.000 DE -->
                      <!-- KSD V001.000 AS -->
                      <radio-button
                        v-model="editingItem.value.giftCertificates"
                        :labels="labelsOperate"
                        :disabled="disableToggleForPayment01 || settlementTypeCurrVal !== 'OTHERS'" />
                        <!-- KSD V001.000 AE -->
                    </td>
                  </tr>
                  <!-- G001.00.0 Add-End -->
                  <tr>
                    <!-- G001.00.0 Update-Start -->
                    <!-- <th>{{ "ドロワオープン" }}</th> -->
                    <th>{{ "ﾄﾞﾛﾜｵｰﾌﾟﾝ" }}</th>
                    <!-- G001.00.0 Update -End -->
                    <td>
                      <!-- <radio-button v-model="editingItem.value.openCashDrawer" :labels="labelsDo" /> -->
                      <!-- KSD V001.000 DS -->
                      <!-- <radio-button -->
                      <!--  v-model="editingItem.value.openCashDrawer" -->
                      <!--  :labels="labelsDo" -->
                      <!--  :disabled="editingItem.name === 'PAYMENT_01'" /> -->
                      <!-- KSD V001.000 DE -->
                      <!-- KSD V001.000 AS -->
                      <radio-button
                        v-model="editingItem.value.openCashDrawer"
                        :labels="labelsDo"
                        :disabled="disableToggleForPayment01" />
                        <!-- KSD V001.000 AE -->
                    </td>
                  </tr>
                  <tr>
                    <!-- KSD V001.000 DS -->
                    <!-- <th>{{ "釣銭" }}</th> -->
                    <!-- KSD V001.000 DE -->
                    <!-- KSD V001.000 AS -->
                    <th>{{ $i18n.t('F322b2.S023') }}</th>
                    <!-- KSD V001.000 AE -->
                    <td>
                      <!-- <radio-button v-model="editingItem.value.change" :labels="labelsOperate" /> -->
                      <!-- KSD V001.000 DS -->
                      <!-- <radio-button -->
                      <!--  v-model="editingItem.value.change" -->
                      <!--  :labels="labelsOperate" -->
                      <!--  :disabled="editingItem.name === 'PAYMENT_01'" /> -->
                      <!-- KSD V001.000 DE -->
                      <!-- KSD V001.000 AS -->
                      <radio-button
                        v-model="editingItem.value.change"
                        :labels="labelsOperate"
                        :disabled="disableToggleForPayment01" />
                        <!-- KSD V001.000 AE -->
                    </td>
                  </tr>
                  <tr>
                    <th>{{ "収入印紙" }}</th>
                    <td>
                      <!-- <radio-button v-model="editingItem.value.revenueStamp" :labels="labelsOperate" /> -->
                      <!-- KSD V001.000 DS -->
                      <!-- <radio-button -->
                      <!--  v-model="editingItem.value.revenueStamp" -->
                      <!--  :labels="labelsOperate" -->
                      <!--  :disabled="editingItem.name === 'PAYMENT_01'" /> -->
                      <!-- KSD V001.000 DE -->
                      <!-- KSD V001.000 AS -->
                      <radio-button
                        v-model="editingItem.value.revenueStamp"
                        :labels="labelsOperate"
                        :disabled="disableToggleForPayment01" />
                        <!-- KSD V001.000 AE -->
                    </td>
                  </tr>
                  <tr>
                    <!-- KSD V001.000 DS -->
                    <!-- <th>{{ "入金" }}</th> -->
                    <!-- KSD V001.000 DE -->
                    <!-- KSD V001.000 AS -->
                    <th>{{ $i18n.t('F322b2.S013') }}</th>
                    <td :class="copyreceiptNumError !== null ? 'redFrame redBG' : 'whiteFrame h-50 w-100'">
                      <input
                        :placeholder="copyreceiptNumPH"
                        single-line
                        class="whiteFrame w-100 numberNoArrow"
                        style="height: 40px;border:none;outline:none;"
                        min="0"
                        oninput="value=value.replace(/[^\d]/g,'');if(value.length>1)value=value.slice(0,1)"
                        :class="copyreceiptNumError !== null ? 'redBG' : 'whiteFrame h-50 w-100'"
                        type="number"
                        :disabled="disableToggleForPayment01"
                        v-model="editingItem.value.copyreceiptNum"
                      >
                    </td>
                  </tr>
                  <tr v-if="copyreceiptNumError !== null" class="errorCell">
                    <th/>
                    <td>
                      <label>{{ copyreceiptNumError }}</label>
                    </td>
                  </tr>
                  <tr>
                    <th>{{ $i18n.t('F322b2.S014') }}</th>
                    <td>
                      <radio-button v-model="editingItem.value.storeReserve" :labels="labelsDo" :disabled="disableToggleForPayment01"/>
                    </td>
                  </tr>
                  <tr>
                    <th>{{ $i18n.t('F322b2.S015') }}</th>
                    <td>
                      <radio-button v-model="editingItem.value.companyReserve" :labels="labelsDo" :disabled="disableToggleForPayment01"/>
                    </td>
                  </tr>
                  <tr>
                    <th>{{ $i18n.t('F322b2.S024') }}</th>
                    <!-- KSD V001.000 AE -->
                    <td>
                      <!-- <radio-button v-model="editingItem.value.depositOperation" :labels="labelsPermit" /> -->
                      <!-- KSD V001.000 DS -->
                      <!-- <radio-button -->
                      <!--  v-model="editingItem.value.depositOperation" -->
                      <!--  :labels="labelsPermit" -->
                      <!--  :disabled="editingItem.name === 'PAYMENT_01'" /> -->
                      <!-- KSD V001.000 DS -->
                      <!-- KSD V001.000 AS -->
                      <radio-button
                        v-model="editingItem.value.depositOperation"
                        :labels="labelsPermit"
                        :disabled="disableToggleForPayment01" />
                        <!-- KSD V001.000 AE -->
                    </td>
                  </tr>
                  <tr>
                    <!-- KSD V001.000 DS -->
                    <!-- <th>{{ "出金" }}</th> -->
                    <!-- KSD V001.000 DE -->
                    <!-- KSD V001.000 AS -->
                    <th>{{ $i18n.t('F322b2.S025') }}</th>
                    <!-- KSD V001.000 AE -->
                    <td>
                      <!-- <radio-button v-model="editingItem.value.withdrawalOperation" :labels="labelsPermit" /> -->
                      <!-- KSD V001.000 DS -->
                      <!-- <radio-button -->
                      <!--  v-model="editingItem.value.withdrawalOperation" -->
                      <!--  :labels="labelsPermit" -->
                      <!--  :disabled="editingItem.name === 'PAYMENT_01'" /> -->
                      <!-- KSD V001.000 DE -->
                      <!-- KSD V001.000 AS -->
                      <radio-button
                        v-model="editingItem.value.withdrawalOperation"
                        :labels="labelsPermit"
                        :disabled="disableToggleForPayment01" />
                        <!-- KSD V001.000 AE -->
                    </td>
                  </tr>
                  <!-- KSD V001.000 AS -->
                  <tr>
                    <th>{{ $i18n.t('F322b2.S018') }}</th>
                    <td>
                      <select
                        class="h-100 w-100 whiteFrame pl-2"
                        v-model="editingItem.value.cashTransferStatus"
                        :disabled="disableToggleForPayment01 || settlementTypeCurrVal !== 'OTHERS'"
                      >
                        <option
                          v-for="ct in cashTransferStatusList"
                          :key="ct.code"
                          :value="ct.code">
                          {{ ct.displayName }}
                        </option>
                      </select>
                      <div class="pulldownArrow"></div>
                    </td>
                  </tr>
                  <!-- KSD V001.000 AE -->
                  <!-- G001.00.0 Update-Start -->
                  <!-- <tr>
                  <th>{{ "CCT連動" }}</th>
                  <td>
                    <radio-button v-model="editingItem.value.CCTinterlocking" :labels="labelsOperate" />
                  </td>
                </tr>
                <tr>
                  <th>{{ "サブメディア管理" }}</th>
                  <td>
                    <radio-button v-model="editingItem.value.subMediaManagement" :labels="labelsDo" />
                  </td>
                </tr> -->
                  <tr>
                    <th>{{ "ｻﾌﾞﾒﾃﾞｨｱ管理" }}</th>
                    <td>
                      <!-- <radio-button v-model="editingItem.value.subMediaManagement" :labels="labelsDo" /> -->
                      <!-- KSD V001.000 DS -->
                      <!-- <radio-button -->
                      <!--  v-model="editingItem.value.subMediaManagement" -->
                      <!--  :labels="labelsDo" -->
                      <!--  :disabled="editingItem.name === 'PAYMENT_01'" />  -->
                      <!-- KSD V001.000 DE -->
                      <!-- KSD V001.000 AS -->
                      <radio-button
                        v-model="editingItem.value.subMediaManagement"
                        :labels="labelsDo"
                        :disabled="disableToggleForPayment01 || settlementTypeCurrVal === 'VegaEM'" />
                    <!-- KSD V001.000 AE -->
                    </td>
                  </tr>
                  <!-- KSD V001.000 DS -->
                  <!-- <tr> -->
                  <!-- <th>{{ "CCT連動" }}</th> -->
                  <!--   <td> -->
                  <!-- <\!-- <radio-button v-model="editingItem.value.CCTinterlocking" :labels="labelsOperate" /> --\> -->
                  <!--     <radio-button -->
                  <!--       v-model="editingItem.value.CCTinterlocking" -->
                  <!--       :labels="labelsOperate" -->
                  <!--       :disabled="editingItem.name === 'PAYMENT_01'" /> -->
                  <!-- </td> -->
                  <!-- </tr> -->
                  <!-- KSD V001.000 DE -->

                  <!-- G001.00.0 Update -End -->
                  <!-- G002.00.0 Update-End -->

                  <!-- <template v-if="submediaList.length > 0">
                  <tr :key="index" v-for="(subItem, index) in submediaList">
                   G007.00.0 Update-Start -->
                  <!--<th style="padding: 0;vertical-align: unset;">
                      <div style="border-bottom: 2px #fff solid;height: 42px;line-height: 40px;">
                        {{ subItem.name1 }}
                      </div>
                      <div style="line-height: 40px;">{{ subItem.name2 }}</div>
                    </th>-->
                  <!-- G007.00.0 Update-End -->
                  <!--<td>-->
                  <!-- G004.00.0 Update-Start -->
                  <!-- <input
                        v-model="subItem.displayName.default"
                        placeholder="サブメディア名称"
                        single-line
                        class="whiteFrame h-50 w-100"
                        style="height: 40px;"
                      /> -->
                  <!--<input
                        v-model="subItem.displayName.default"
                        placeholder="半角24文字/全角12文字"
                        single-line
                        class="whiteFrame h-50 w-100"
                        style="height: 40px;"
                        @input="inputLimit(subItem,24)"
                      />-->
                  <!-- <input
                        v-model="subItem.amount"
                        placeholder="金額"
                        single-line
                        class="whiteFrame w-100"
                        type="number"
                        style="height: 40px;"
                      /> -->
                  <!-- <input
                        v-model="subItem.amount"
                        placeholder="金額"
                        single-line
                        class="whiteFrame w-100 numberNoArrow"
                        type="number"
                        style="height: 40px;"
                        min="0"
                        oninput="value=value.replace(/[^\d]/g,'');if(value.length>8)value=value.slice(0,8)"
                        onmousewheel="return false;"
                      />-->
                  <!-- G006.00.0 Update-Start -->
                  <!--<input
                        v-model="subItem.amount"
                        placeholder="数字8桁"
                        single-line
                        class="whiteFrame w-100 numberNoArrow"
                        style="height: 40px;"
                        min="0"
                        oninput="value=value.replace(/[^\d]/g,'');if(value.length>8)value=value.slice(0,8)"
                      />
                       G006.00.0 Update-End -->
                  <!-- G004.00.0 Update-End -->
                  <!--</td>
                  </tr>
                </template> -->

                  <!-- G007.00.0 Update-Start -->
                  <template v-if="submediaList.length > 0">
                    <template v-for="(subItem, index) in submediaList">
                      <tr :key="'tr1_' + index">
                        <th>
                          {{ subItem.name1 }}
                        </th>
                        <td>
                          <!-- KSD V001.000 DS -->
                          <!-- <input -->
                          <!--  v-model="subItem.displayName.default" -->
                          <!--  placeholder="半角24文字/全角12文字" -->
                          <!-- single-line -->
                          <!-- :class="errorMsgList[index] !== undefined ? 'errorSelectBox' : 'whiteFrame h-50 w-100'" -->
                          <!-- style="height: 40px; border:none;outline:none;" -->
                          <!-- @input="inputLimit(subItem,24,index)" -->
                          <!-- KSD V001.000 DE -->
                          <!-- KSD V001.000 AS -->
                          <input
                            v-model="subItem.displayName.default"
                            placeholder="半角24文字/全角12文字"
                            single-line
                            :class="errorMsgList.name[index] !== undefined ? 'errorSelectBox' : 'whiteFrame h-50 w-100'"
                            style="height: 40px; border:none;outline:none;"
                            @input="inputLimit(subItem,24,index)"
                          >
                          <!-- KSD V001.000 AE -->
                        </td>
                        <!-- G011.00.0 Add-Start -->
                        <td
                          rowspan="2"
                          style="border:none;width:50px">
                          <img
                            class="icon"
                            src="@/assets/ico_delete.png"
                            @click="deleteSubMedia(index)"
                            v-show="submediaList.length > 1"
                            style="width:35px; height:35px;margin-left: 2px; cursor: pointer;">
                        </td>
                        <!-- G011.00.0 Add-End -->
                      </tr>
                      <!-- KSD V001.000 DS -->
                      <!-- <tr -->
                      <!--  v-if="errorMsgList[index] !== undefined" -->
                      <!--  class="errorCell" -->
                      <!--  :key="'tr2_' + index"> -->
                      <!-- KSD V001.000 DE -->
                      <!-- KSD V001.000 AS -->
                      <tr
                        v-if="errorMsgList.name[index] !== undefined"
                        class="errorCell"
                        :key="'tr2_' + index">
                        <!-- KSD V001.000 AE -->
                        <th/>
                        <td>
                          <!-- KSD V001.000 DS -->
                          <!-- <label>{{errorMsgList[index]}}</label> -->
                          <!-- KSD V001.000 DE -->
                          <!-- KSD V001.000 AS -->
                          <label>{{ errorMsgList.name[index] }}</label>
                          <!-- KSD V001.000 AE -->
                        </td>
                      </tr>

                      <!-- KSD V001.000 DS -->
                      <!-- <tr :key="'tr3_' + index"> -->
                      <!-- KSD V001.000 DE -->

                      <!-- KSD V001.000 AS -->
                      <tr
                        :key="'tr3_' + index"
                        v-if="settlementTypeCurrVal !== 'CODEPAY' &&
                        settlementTypeCurrVal !== 'VegaEM'">
                        <!-- KSD V001.000 AE -->
                        <th>
                          {{ subItem.name2 }}
                        </th>
                        <td>
                          <input
                            v-model="subItem.amount"
                            placeholder="数字8桁"
                            single-line
                            class="whiteFrame w-100 numberNoArrow"
                            style="height: 40px;border:none;outline:none;"
                            min="0"
                            oninput="value=value.replace(/[^\d]/g,'');if(value.length>8)value=value.slice(0,8)">
                        </td>
                      </tr>

                      <!-- KSD V001.000 AS -->
                      <tr v-if="settlementTypeCurrVal === 'VegaEM'">
                        <th>
                          {{ $i18n.t('F322b2.S066') }}
                        </th>
                        <td>
                          <select
                            v-model="subItem.settlementType"
                            :class="errorMsgList.type[index] !== undefined ? 'errorSelectBox' : 'h-100 w-100 whiteFrame pl-2'"
                          >
                            <option
                              v-for="eType in eMoneyTypeList"
                              :key="eType.code"
                              :value="eType.code">
                              {{ eType.displayName }}
                            </option>
                          </select>
                          <div class="pulldownArrow"></div>
                        </td>
                      </tr>
                      <tr
                        v-if="errorMsgList.type[index] !== undefined && settlementTypeCurrVal === 'VegaEM'"
                        class="errorCell"
                        :key="'tr3_' + index">
                        <th/>
                        <td>
                          <label>{{ errorMsgList.type[index] }}</label>
                        </td>
                      </tr>
                      <tr v-if="settlementTypeCurrVal === 'VegaEM'">
                        <th>
                          {{ $i18n.t('F322b2.S067') }}
                        </th>
                        <td>
                          <radio-button
                            v-model="subItem.revenueStamp"
                            :labels="labelsOperate" />
                        </td>
                      </tr>
                      <tr v-if="settlementTypeCurrVal === 'CODEPAY'">
                        <th>
                          {{ $i18n.t('F322b2.S030') }}
                        </th>
                        <td>
                          <input
                            :placeholder="paymentChanelPH"
                            v-model="subItem.paymentChanel"
                            single-line
                            class="whiteFrame w-100 numberNoArrow"
                            style="height: 40px;border:none;outline:none;"
                            @input="(e) => blockFullWidth(e, 4, subItem, 'paymentChanel')"
                          >
                        </td>
                      </tr>
                      <!-- KSD V001.000 AE -->
                    </template>
                  </template>
                <!-- G007.00.0 Update-End -->
                </table>
                <!-- G009.00.0 Update-Start -->
                <!-- <v-btn
                v-if="subMediaManagement"
                class="button dialog-fotter-button-blue footerButtonStyle addSubMedia"
                @click="onNewSubMediaItem"
              > -->
                <v-btn
                  v-if="subMediaManagement"
                  class="button dialog-fotter-button-blue footerButtonStyle addSubMedia"
                  @click="onNewSubMediaItem"
                  :disabled="submediaList.length >= 99">
                  <!-- G009.00.0 Update-End -->
                  ＋サブメディア追加
                </v-btn>
              </div>

              <v-card-actions class="dialog-fotter">
                <!-- G001.00.0 Add-Update -->
                <!-- <v-btn
                v-if="!isAddStatus"
                class="button dialog-fotter-button-blue footerButtonStyle"
                @click="onRemoveItem"
              > -->
                <v-btn
                  class="button dialog-fotter-button-blue footerButtonStyle"
                  @click="onRemoveItem"
                  :disabled="isPay01Disabled || !(!isAddStatus && this.permissions.includes('CLOUDPOS_TIGHTENING_BTN_DELETE'))">
                  <!-- G001.00.0 Add-Update -->
                  削除
                </v-btn>
                <v-spacer/>
                <!-- G001.00.0 Update-Start -->
                <!-- <v-btn
                class="button dialog-fotter-button-gray footerButtonStyle"
                @click="onCancel"
              > -->
                <v-btn
                  class="button dialog-fotter-button-gray footerButtonStyle"
                  @click="onCancelConfirm">
                  <!-- G001.00.0 Update -End -->
                  戻る
                </v-btn>
                <!-- G002.00.0 Update-Start -->
                <!-- G001.00.0 Update-Start -->
                <!-- <v-btn
                class="button dialog-fotter-button-orange footerButtonStyle"
                @click="onSave"
              > -->
                <!-- <v-btn
                class="button dialog-fotter-button-orange footerButtonStyle"
                @click="onSave"
                :disabled="isPay01Disabled"
              > -->
                <v-btn
                  :disabled="!this.permissions.includes('CLOUDPOS_TIGHTENING_BTN_UPDATE')"
                  class="button dialog-fotter-button-orange footerButtonStyle"
                  @click="onSave">
                  <!-- G001.00.0 Update -End -->
                  <!-- G002.00.0 Update -End -->
                  保存
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </div>

    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <maint-button
          @close="onMenuClose"
          @fixed="onMenuOk"
          :isfixed-btn="disabledFixedBtn"/>
      </v-col>
    </v-row>

    <popup ref="pop" />

    <v-overlay :value="updating">
      <div class="text-center">
        <v-progress-circular
          :rotate="360"
          :size="100"
          :width="15"
          color="teal"/>
      </div>
    </v-overlay>
    <v-overlay :value="loading">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          :size="70"
          :width="7"
          color="white"/>
      </div>
    </v-overlay>
  </v-container>
</template>
