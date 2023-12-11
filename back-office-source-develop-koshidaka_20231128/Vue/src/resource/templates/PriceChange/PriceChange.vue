<style src="./../../static/css/MasterCommon/masterCommon.css"></style>
<style src="./../../static/css/PriceChange/priceChange.css"></style>
<script type="text/javascript" src="./../../static/js/PriceChange/priceChange.js"></script>

<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230111  litie(Neusoft)    G001.00.0  issue課題#1058を対応します.
-->

<template>
  <v-container
    style="width: 900px;margin-top:60px;"
    class="baseFont"
    min-width="1200px">
    <v-row align="center">
      <!-- 店舗 -->
      <v-row
        justify="start"
        align-content="center">
        <div
          class="selectStoreContentStyle"
          style="margin-left: 0px;">
          <label id="label2">{{ $t("F00109.S003") }}</label>
          <input
            type="text"
            class="priceChangeInputText"
            style="margin-right: 11px;font-size: 20px;"
            ref="targetStoreText"
            v-model="targetStoreText"
            :disabled="true">
          <div
            class="buttomLabel"
            style="margin-top:0px;">
            <!-- G001.00.0 Update-Start -->
            <!-- <v-btn tabindex="1" style="width: 28px; height: 40px;" id="storeSelectBtn" @click="storeSelect" :disabled="this.disabledStoreSelectBtn"> -->
            <v-btn
              tabindex="1"
              style="width: 28px; height: 40px;"
              id="storeSelectBtn"
              @click="storeSelect"
              :disabled="headquartersAuthority != 1 || this.disabledStoreSelectBtn">
              <!-- G001.00.0 Update-End -->
              <span class="rightArrow2" />
            </v-btn>
          </div>
        </div>
      </v-row>
      <v-row
        justify="start"
        align-content="center"
        style="margin-top:10px;width: 900px;">
        <!-- ＋追加
        <div @click="priceChangeAdd">
          <v-btn color="#1ea7cb" style="width: 148px;height: 40px;margin-right: 16px;" tabindex="2">
            <font color ="white" size= "4px" style="font-weight:bold;">{{ $t("F00109.S004") }}</font>
          </v-btn>
        </div>
         -->
        <!-- 売価変更No -->
        <label id="label2">{{ $t('F00109.S005') }}</label>
        <input
          type="text"
          class="priceChangeInputText"
          style="margin-right: 11px;font-size: 20px;"
          v-model="priceChangeNo"
          @keydown.enter="priceChangeNoEnter"
          @input="priceChangeNoInput"
          :disabled="this.disabledPriceChangeText"
          :placeholder="$t('F00109.S019')"
          ref="priceChangeInputText"
          maxlength="10"
          tabindex="3">
        <div
          class="buttomLabel"
          style="margin-top:0px;">
          <v-btn
            tabindex="4"
            style="width: 28px; height: 40px;"
            id="priceChangeSelectBtn"
            @click="priceChangeSelect"
            :disabled="this.disabledPriceChangeBtn">
            <span class="rightArrow2" />
          </v-btn>
        </div>
      </v-row>
      <!-- 売価変更名称 -->
      <v-row
        justify="start"
        align-content="center"
        style="margin-top:10px;width: 900px;">
        <label id="label2">{{ $t('F00109.S006') }}</label>
        <input
          type="text"
          class="priceChangeInputText"
          style="margin-right: 11px;width: 480px;font-size: 20px;"
          v-model="priceChangeName"
          @keydown.enter="priceChangeNameEnter"
          @blur="priceChangeNameEnter"
          :disabled="this.disabledPriceChangeNameText"
          :placeholder="$t('F00109.S020')"
          maxlength="30"
          tabindex="5"
          :@input="inputLimit(priceChangeName,30)">
      </v-row>

      <!-- 売価変更期間 -->
      <v-row
        justify="start"
        align-content="center"
        style="margin-top:10px;">
        <!-- 期間入力 -->
        <table class="periodSelectStyle">
          <tr>
            <td class = "periodTitleCellStyle">
              <label>{{ $t("F00109.S007") }}</label>
            </td>
            <td
              id="startDateInput"
              class="periodTextCellStyle">
              <table>
                <tr>
                  <td>
                    <!-- カレンダー表示用のflatPickr(開始・終了で共有) -->
                    <flat-pickr
                      tabindex="-1"
                      :config="config"
                      ref="flatPickr"
                      v-model="calenderDate"/>
                  </td>
                  <td>
                    <!-- ユーザ入力用期間（開始）input -->
                    <input
                      type="text"
                      class="startDateInputStyle"
                      id="inputStartDay"
                      style="ime-mode:disabled;font-size: 20px;"
                      :placeholder="$t('F00109.S017')"
                      :disabled="disabledPriceChangeDate"
                      v-model="startDateStr"
                      single-line
                      dense
                      @focus="borderFocus(0)"
                      @blur="startDateFormatCheck(),borderBlur(0)"
                      @keydown.enter="startDateFormatCheck()"
                      tabindex=6
                      maxlength=10
                      autocomplete="off">
                  </td>
                </tr>
              </table>
            </td>
            <td>
              <template v-if="disabledPriceChangeDate">
                <img
                  id="startCalender"
                  :src="startCalenderImgScr"
                  height="25"
                  width="30">
              </template>
              <template v-else>
                <a
                  tabindex=7
                  id="startCalenderTd"
                  @keydown.enter="showCalender(0)"
                  @keydown.space="showCalender(0)"
                  @focus="changeImg('startCalender'),borderFocus(0)"
                  @blur="returnImg('startCalender'),borderBlur(0)">

                  <img
                    id="startCalender"
                    :src="startCalenderImgScr"
                    @click="showCalender(0)"
                    @mouseover="changeImg('startCalender')"
                    @mouseleave="returnImg('startCalender')"
                    height="25"
                    width="30">
                </a>
              </template>
            </td>
            <td class="wavyLine">
              <label>{{ $t("F00109.S018") }}</label>
            </td>
            <td
              id="endDateInput"
              class="periodTextCellStyle">
              <table>
                <tr>
                  <td>
                    <!-- ユーザ入力用期間（終了）input -->
                    <input
                      type="text"
                      class="endDateInputStyle"
                      id="inputEndDay"
                      style="ime-mode:disabled;font-size: 20px;"
                      :placeholder="$t('F00109.S017')"
                      :disabled="disabledPriceChangeDate"
                      v-model="endDateStr"
                      single-line
                      dense
                      @focus="borderFocus(1)"
                      @blur="endDateFormatCheck(),borderBlur(1)"
                      @keydown.enter="endDateFormatCheck()"
                      tabindex=8
                      maxlength=10
                      autocomplete="off">
                  </td>
                </tr>
              </table>
            </td>
            <td>
              <template v-if="disabledPriceChangeDate">
                <img
                  id="endCalender"
                  :src="endCalenderImgScr"
                  height="25"
                  width="30">
              </template>
              <template v-else>
                <a
                  tabindex=9
                  id="endCalenderTd"
                  @keydown.enter="showCalender(1)"
                  @keydown.space="showCalender(1)"
                  @focus="changeImg('endCalender'),borderFocus(1)"
                  @blur="returnImg('endCalender'),borderBlur(1)">

                  <img
                    id="endCalender"
                    :src="endCalenderImgScr"
                    @click="showCalender(1)"
                    @mouseover="changeImg('endCalender')"
                    @mouseleave="returnImg('endCalender')"
                    height="25"
                    width="30">
                </a>
              </template>
            </td>
          </tr>
        </table>
      </v-row>

      <!-- 備考 -->
      <v-row
        justify="start"
        align-content="center"
        style="margin-top:10px;width: 900px;">
        <label id="label2">{{ $t('F00109.S009') }}</label>
        <input
          type="text"
          class="priceChangeInputText"
          style="margin-right: 11px;width: 680px; font-size:20px"
          v-model="priceChangeNote"
          @keydown.enter="priceChangeNoteEnter"
          @blur="priceChangeNoteEnter"
          :disabled="this.disabledPriceChangeNodeText"
          tabindex="10">
      </v-row>

      <!-- 商品検索入力 -->
      <v-row
        justify="start"
        align-content="center"
        style="margin-top:10px;width: 900px;">
        <div>
          <v-btn
            color="#1ea7cb"
            style="width: 148px;height: 40px;margin-right: 16px;"
            @click="productSearch"
            :disabled="this.disabledproductSearchBtn"
            tabindex="11">
            <font
              color ="white"
              size= "4px"
              style="font-weight:bold;">{{ $t("F00109.S010") }}</font>
          </v-btn>
        </div>
      </v-row>

      <!-- 一覧エリア -->
      <v-row
        justify="start"
        align-content="center"
        style="margin-top:10px">
        <!--      <v-row style="height: 120px;width: 680px;margin-top:10px;"> -->
        <!-- No. -->
        <v-col
          :cols="1"
          style="padding: 0px;">
          <label id="ListHeader">{{ $t("F00109.S011") }}</label>
        </v-col>
        <!-- JANコード -->
        <v-col
          :cols="3"
          style="padding: 0px;">
          <label id="ListHeader">{{ $t("F00109.S012") }}</label>
        </v-col>
        <!-- 商品名 -->
        <v-col
          :cols="3"
          style="padding: 0px;">
          <label id="ListHeader">{{ $t("F00109.S013") }}</label>
        </v-col>
        <!-- 旧売価 -->
        <v-col
          :cols="2"
          style="padding: 0px;">
          <label id="ListHeader">{{ $t("F00109.S014") }}</label>
        </v-col>
        <!-- 新売価 -->
        <v-col
          :cols="2"
          style="padding: 0px;">
          <label id="ListHeader">{{ $t("F00109.S015") }}</label>
        </v-col>
        <!-- 削除 -->
        <v-col
          :cols="1"
          style="padding: 0px;">
          <label id="ListHeader">{{ $t("F00109.S016") }}</label>
        </v-col>
      </v-row>
      <v-row
        v-if="operationLock === false"
        v-for="(productItem,index) in dispDataList"
        :key="productItem.productId"
        style="height: 50px;width: 680px;">
        <!-- No. -->
        <v-col
          :cols="1"
          style="padding: 0px;">
          <label
            class="ListElement"
            :id ="'code'+index"><font style="margin-left:10px">{{ index + 1 }}</font></label>
        </v-col>
        <!-- JANコード -->
        <v-col
          :cols="3"
          style="padding: 0px;">
          <label
            class="ListSplitElement"
            style="border-left:1px solid #9ea0aa;"
            :id ="'id'+index"><font class="NameClass">{{ productItem.jancode }}</font></label>
        </v-col>
        <!-- 商品名 -->
        <v-col
          :cols="3"
          style="padding: 0px;">
          <label
            class="ListSplitElement"
            style="border-left:1px solid #9ea0aa;"
            :id ="'name'+index"><font class="NameClass">{{ productItem.productname }}</font></label>
        </v-col>
        <!-- 旧売価 -->
        <v-col
          :cols="2"
          style="padding: 0px;">
          <label
            class="ListSplitElement"
            style="border-left:1px solid #9ea0aa;"
            :id ="'oldPrice'+index"><font class="NameClass">{{ productItem.oldprice }}</font></label>
        </v-col>
        <!-- 新売価 -->
        <v-col
          :cols="2"
          style="padding: 0px;">
          <input
            :tabindex="(index+1)*100+5"
            type="text"
            class="ListSplitElement"
            style="border-left:1px solid #9ea0aa;padding-left: 10px; width: 100%;"
            @keydown.enter="newPriceEnter(index)"
            @input="newPriceInput(index)"
            @blur="newPriceEnter(index)"
            :placeholder="$t('F00109.S027')"
            :id ="'newPrice'+index"
            v-model="productItem.newprice"
            maxlength="8" >
        </v-col>
        <!-- 削除 -->
        <v-col
          :cols="1"
          style="padding: 0px;">
          <div
            class="ListSplitElement"
            style="border-left:1px solid #9ea0aa;border-right:1px solid #9ea0aa;"
            :id ="'del'+index">
            <a
              :tabindex="(index+1)*100+6"
              style="width: 45px; height: 45px;margin-left: 10px"
              @keydown.enter="deleteListDate(index)"
              @keydown.space="deleteListDate(index)"
              @click="deleteListDate(index)">
              <img
                style="width: 45px; height: 45px;"
                src="@/assets/ico_drawerclose_n@2x.png"
                class="scrollNone">
            </a>
          </div>
        </v-col>
      </v-row>
    </v-row>

    <v-row style="width: 100%;">
      <v-col>
        <maint-button
          @close="closeTab"
          @fixed="save"
          @del="del"
          @clear="clear"
          :isfixed-btn="disabledFixedBtn || !permissions.includes('CLOUDPOS_PRICE_UPDATE')"
          :isdel-btn="disabledDelBtn || !permissions.includes('CLOUDPOS_PRICE_DELETE')"
          :isclear-btn="disabledClearBtn"
          class ="maintButton"/>
      </v-col>
    </v-row>
    <select-dialog
      ref="selectDialog"
      @clickSubmit="dialogConfirm()"/>
    <edit-dialog
      ref="editDialog"
      @clickSubmit="dialogConfirm()"/>
    <dialog-store-select
      ref="dialogStoreSelect"
      @clickSubmit="storeSelectOk"/>
    <popup ref="pop"/>
  </v-container>
</template>
