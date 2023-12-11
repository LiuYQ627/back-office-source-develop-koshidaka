<style src="@/resource/static/css/CommonDesign/utils.css"/>
<style src="@/resource/static/css/PresetMaster/presetMaster.css"/>
<script type="text/javascript" src="@/resource/static/js/PresetMaster/presetMaster.js">
</script>

<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230110  litie(Neusoft)    G001.00.0  issue課題#1058を対応します.
 * 20230608  wangchunmei(Neusoft)    G002.00.0  issue課題#1662を対応します.
 * 20231010  zyx(Neusoft)      G003.00.0  issue課題#1603を対応します.
 -->

<template>
  <v-container class="mt-15 preset-conrainer" >

    <!-- 企画コード -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="2"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="planningCodeLabel"
        >
          {{ "企画コード" }}
        </label>
      </v-col>

      <v-col
        cols="6"
        class="h-100">
        <input
          id="planningCode"
          class="whiteFramePreset h-100 w-100 pl-2"
          type="text"
          v-model="requestParams.planningCode"
          :disabled="disables.planningCode"
          maxlength="2"
          style="ime-mode:disabled;"
          @input="planningCodeInputRegulation"
          ref="planningCode"
          @keyup.enter="onEnterPlanCode"
        >
      </v-col>
    </v-row>

    <!-- 企画名称 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-1">
      <v-col
        cols="2"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="planningName"
        >
          {{ "企画名称" }}
        </label>
      </v-col>

      <v-col
        cols="6"
        class="h-100">
        <input
          id="planningName"
          placeholder="半角32文字/全角16文字以内"
          class="whiteFramePreset h-100 w-100 pl-2"
          :class="this.planNameErrorMsg !== null ? 'errorTextBox whiteFramePreset h-100 w-100 pl-2' : 'whiteFramePreset h-100 w-100 pl-2'"
          type="text"
          :disabled="disables.catalogName"
          @input="inputLimit(requestParams.catalogName,32)"
          v-model="requestParams.catalogName"
        >
      </v-col>
    </v-row>

    <!-- 企画名称(エラーメッセージ) -->
    <v-row v-if="this.planNameErrorMsg !== null ">
      <v-col
        cols="2"
        class="h-100"/>
      <v-col
        cols="6"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ planNameErrorMsg }}</v-col>
    </v-row>

    <!-- 対象店舗 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="2"
        class="h-100">
        <label
          for="targetStore"
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
        >
          {{ "対象店舗" }}
        </label>
      </v-col>
      <v-col
        cols="6"
        class="h-100 d-flex align-center">
        <!-- G001.00.0 Update-Start -->
        <!-- <store-select :storeCodes="targetStoreCodes" multiple /> -->
        <!-- :disabled="headquartersAuthority != 1 || disables.targetStoreCodes" -->
        <!-- CS KSD V001.000 83973 -->
        <!-- <store-select-->
        <!--  v-model="requestParams.targetStoreCode"-->
        <!--  :disabled = " disables.targetStoreCode"-->
        <!--  multiple-->
        <!--  headquarters-authority-check-enable />-->
        <store-select
          v-model="requestParams.targetStoreCode"
          :disabled = " disables.targetStoreCode"
          multiple
          ref="storeSelect"
          headquarters-authority-check-enable />
          <!-- CE KSD V001.000 83973 -->
          <!-- G001.00.0 Update-End -->
      </v-col>
    </v-row>

    <!-- 対象店舗(エラーメッセージ) -->
    <v-row v-if="this.targetStoreCodesErrorMsg !== null ">
      <v-col
        cols="2"
        class="h-100"/>
      <v-col
        cols="6"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ targetStoreCodesErrorMsg }}</v-col>
    </v-row>

    <!-- 基準店舗 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-1">
      <v-col
        cols="2"
        class="h-100">
        <label
          for="sourceStore"
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
        >
          {{ "基準店舗" }}
        </label>
      </v-col>
      <v-col
        cols="6"
        class="h-100 d-flex align-center">
        <!-- G001.00.0 Update-Start -->
        <!-- <store-select v-model="sourceStoreCodes" /> -->
        <!--  :disabled="disables.sourceStoreCodes"-->
        <!-- CS KSD V001.000 84560 -->
        <!-- <store-select -->
        <!--   v-model="requestParams.standardStoreCode" -->
        <!--   :disabled = " disables.sourceStoreCodes" -->
        <!--   headquarters-authority-check-enable -->
        <!--   @change="storeSelectOk"/> -->
        <store-select 
          v-model="requestParams.standardStoreCode"
          :disabled = " disables.sourceStoreCodes"
          :confirm-proceed="edited"
          hasCodeName
          headquartersAuthorityCheckEnable
          ref="storeSelect"
          @change="storeSelectOk"
          @click="storeClicked" />
        <!-- CE KSD V001.000 84560 -->
          <!-- G001.00.0 Update-End -->
      </v-col>
    </v-row>

    <!-- 基準店舗(エラーメッセージ) -->
    <v-row v-if="this.sourceStoreCodesErrorMsg !== null ">
      <v-col
        cols="2"
        class="h-100"/>
      <v-col
        cols="6"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ sourceStoreCodesErrorMsg }}</v-col>
    </v-row>

    <!-- 期間 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="2"
        class="h-100">
        <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
          {{ "期間" }}
        </label>
      </v-col>

      <v-col
        cols="2"
        class="h-100 d-flex align-center">
        <date-input
          v-model="dateFrom"
          :disabled-func="disabledDays"
          :disabled="disables.dateFrom"/>
      </v-col>
      <v-col
        cols="1"
        :class="isTimeFromError ? 'errorSelectBox' : 'h-100 d-flex align-center whiteFrame'">
        <input
          type="text"
          class="px-2 h-100 w-100 presetTime"
          v-model="timeFrom"
          :disabled="disables.timeFrom">
      </v-col>

      <span class="mx-2">～</span>

      <v-col
        cols="2"
        class="h-100 d-flex align-center">
        <date-input
          v-model="dateTo"
          :disabled-func="disabledDays"
          :disabled="disables.dateTo"/>
      </v-col>
      <v-col
        cols="1"
        :class="isTimeToError ? 'errorSelectBox' : 'h-100 d-flex align-center whiteFrame'">
        <input
          type="text"
          class="px-2 h-100 w-100 presetTime"
          v-model="timeTo"
          :disabled="disables.timeTo">
      </v-col>
    </v-row>

    <!-- 期間(エラーメッセージ) -->
    <v-row v-if="this.isTimeFromError || this.isTimeToError">
      <v-col
        cols="2"
        class="h-100"/>
      <v-col
        cols="6"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ '必ず入力してください。' }}</v-col>
    </v-row>

    <!-- 曜日 -->
    <v-row
      no-gutters
      class="weekRow w-100 d-flex align-center mt-1">
      <v-col
        cols="2"
        class="h-100">
        <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
          {{ "曜日" }}
        </label>
      </v-col>

      <v-col
        cols="8"
        class="h-100 whiteFrame d-flex align-center">
        <!-- 日～土 -->
        <div
          v-for="(label, index) in weekLabels"
          :key="label"
          class="h-100 weekCell d-flex flex-column align-center justify-center"
        >
          <v-btn
            class="checkBox presetWeek"
            :checked="weekSelected[index]"
            :disabled="disables.weekLabels"
            @click="toggleWeek(index)"
          />
          <span>{{ label }}</span>
        </div>
        <!-- 全選択 -->
        <div
          class="h-100 weekCell d-flex flex-column align-center justify-center"
        >
          <v-btn
            class="checkBox presetWeek"
            :checked="allWeekSelected"
            :disabled="disables.weekLabels"
            @click="toggleAllWeek"
          />
          <span>{{ "全選択" }}</span>
        </div>
      </v-col>
    </v-row>

    <!-- 曜日(エラーメッセージ) -->
    <v-row v-if="this.weekErrorMsg !== null ">
      <v-col
        cols="2"
        class="h-100"/>
      <v-col
        cols="6"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ weekErrorMsg }}</v-col>
    </v-row>

    <!-- プリセット設定エリア -->
    <v-row
      no-gutters
      class="w-100 mt-10">
      <!-- カテゴリ -->
      <v-col cols="5">
        <!-- ヘッダー -->
        <v-row
          no-gutters
          class="w-100 tableHeader">
          <v-col
            cols="1"
            class="h-100 grayFrame">
            <!-- 非表示アイコン -->
          </v-col>
          <v-col class="h-100 grayFrame">
            {{ "カテゴリ" }}
          </v-col>
          <v-col
            cols="auto"
            class="h-100 iconCol grayFrame">
            {{ "編集" }}
          </v-col>
          <v-col
            cols="auto"
            class="h-100 iconCol grayFrame">
            {{ "移動" }}
          </v-col>
          <v-col
            cols="auto"
            class="h-100 iconCol grayFrame">
            {{ "削除" }}
          </v-col>
        </v-row>

        <!-- コンテンツ -->
        <div
          class="w-100 whiteFrame presetSettingArea"
          style="height: 550px;">
          <!-- top button -->
          <v-row
            key="categoryAddTop"
            no-gutters
            class="w-100 tableContent"
            v-if="categories.length>0">
            <v-col
              cols="1"
              class="h-100 pa-1"/>
            <v-col class="h-100 pa-1">
              <!-- G003.00.0 Update-Start -->
              <!-- <v-btn
                rounded
                style="color:#fff"
                class="categoryButton blue-button  h-100 w-100"
                @click="createCategory('up')" >{{ "＋追加" }}</v-btn> -->
              <v-btn
                rounded
                class="categoryButton blue-button  h-100 w-100"
                style="color:#fff"
                :disabled="!permissions.includes('CLOUDPOS_PRESET_UPDATE')"
                @click="createCategory('up')" >{{ "＋追加" }}</v-btn>
                <!-- G002.00.0 Update-End -->
                <!-- G003.00.0 Update-End -->
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3">
              <img
                class="h-100 w-100 icon"
                style="opacity: 0.4;"
                src="@/assets/ico_edit@2x.png" >
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3">
              <img
                lass="h-100 w-100 icon"
                style="opacity: 0.4;"
                src="@/assets/ico_move.png" >
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3">
              <img
                class="h-100 w-100 icon"
                style="opacity: 0.4;"
                src="@/assets/ico_delete.png" >
            </v-col>
          </v-row>

          <v-row
            v-for="(category, index) in categories"
            :key="category.id"
            no-gutters
            class="w-100 tableContent"
          >
            <v-col
              cols="1"
              class="h-100 pa-1">
              <img
                v-if="category.displayFlag === 0"
                class="h-100 w-100 icon"
                src="@/assets/ico_hide.png"
              >
            </v-col>
            <v-col class="h-100 pa-1">
              <v-btn
                rounded
                outlined
                style = "text-transform:unset;"
                class="categoryButton h-100 w-100"
                :selected="category.order === selectedCategoryOrder"
                @click="selectedCategoryOrder = category.order;selectedCategory=category;"
              >
                <div
                  style = "width: 80%; word-break: break-all !important;word-wrap: break-word !important;white-space: normal;"
                >{{ category.categoryName }}</div>
              </v-btn>
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3">
              <img
                class="h-100 w-100 icon"
                src="@/assets/ico_edit@2x.png"
                @click="editCategory(category.order)"
              >
            </v-col>
            <v-col
              v-if="permissions.includes('CLOUDPOS_PRESET_UPDATE')"
              cols="auto"
              class="iconCol pa-3">
              <img
                class="h-100 w-100 icon"
                src="@/assets/ico_move.png"
                draggable="true"
                @dragstart="dragCategory(category.order)"
                @drop="dropCategory(index)"
                @dragover.prevent
                @dragenter.prevent
              >
            </v-col>
            <v-col
              v-if="!permissions.includes('CLOUDPOS_PRESET_UPDATE')"
              cols="auto"
              class="iconCol pa-3">
              <img
                class="h-100 w-100 icon"
                style="opacity: 0.4;"
                src="@/assets/ico_move.png"
                draggable="false"
              >
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3">
              <img
                v-if="permissions.includes('CLOUDPOS_PRESET_UPDATE')"
                class="h-100 w-100 icon"
                src="@/assets/ico_delete.png"
                @click="deleteCategory(category.order)"
              >
              <img
                v-else
                class="h-100 w-100 icon"
                style="opacity: 0.4;"
                src="@/assets/ico_delete.png"
              >
            </v-col>
          </v-row>

          <!-- bottom button -->
          <v-row
            key="categoryAddDown"
            no-gutters
            class="w-100 tableContent">
            <v-col
              cols="1"
              class="h-100 pa-1"/>
            <v-col class="h-100 pa-1">
              <!-- G002.00.0 Update-Start -->
              <!-- <v-btn
                rounded
                class="categoryButton blue-button  h-100 w-100"
                style="color:#fff"
                :disabled="disables.categories"
                @click="createCategory('donwn')" >{{ "＋追加" }}</v-btn> -->
              <v-btn
                rounded
                class="categoryButton blue-button  h-100 w-100"
                style="color:#fff"
                :disabled="disables.categories || !permissions.includes('CLOUDPOS_PRESET_UPDATE')"
                @click="createCategory('donwn')" >{{ "＋追加" }}</v-btn>
                <!-- G002.00.0 Update-End -->
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3">
              <img
                class="h-100 w-100 icon"
                style="opacity: 0.4;"
                src="@/assets/ico_edit@2x.png" >
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3">
              <img
                lass="h-100 w-100 icon"
                style="opacity: 0.4;"
                src="@/assets/ico_move.png" >
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3">
              <img
                class="h-100 w-100 icon"
                style="opacity: 0.4;"
                src="@/assets/ico_delete.png" >
            </v-col>
          </v-row>
        </div>

        <!-- 追加ボタン -->
        <!--<div class="w-100 tableContent whiteFrame pa-2">
          <v-btn
            rounded
            dark
            class="categoryButton blue h-100"
            width="50%"
            @click="createCategory"
          >
            {{ "＋追加" }}
          </v-btn>
        </div>-->

        <!-- 編集ダイアログ -->
        <category-edit-dialog
          ref="categoryEditDialog"
          @clickOk="updateCategory"
        />
      </v-col>

      <!-- 商品 -->
      <v-col
        cols="7"
        class="pl-1">
        <!-- ヘッダー -->
        <v-row
          no-gutters
          class="w-100 tableHeader">
          <v-col class="h-100 grayFrame">
            {{ "商品" }}
          </v-col>
          <v-col
            cols="auto"
            class="iconCol h-100 grayFrame">
            {{ "編集" }}
          </v-col>
          <v-col
            cols="auto"
            class="iconCol h-100 grayFrame">
            {{ "移動" }}
          </v-col>
          <v-col
            cols="auto"
            class="iconCol h-100 grayFrame">
            {{ "削除" }}
          </v-col>
        </v-row>

        <!-- コンテンツ -->
        <div
          class="w-100 whiteFrame presetSettingArea"
          style="height:550px;">
          <!-- top button -->
          <v-row
            no-gutters
            class="w-100 tableContent"
            v-if="selectedCategory.items &&selectedCategory.items.length>0">
            <v-col class="h-100 pa-1">
              <div
                class="d-flex h-100 w-100 whiteFrame product-box"
                style="height:50px !important;border: none;">
                <!-- G002.00.0 Update-Start -->
                <!-- <v-btn
                  class="categoryButton blue-button  h-100"
                  width="100%"
                  style="color:#fff"
                  :disabled="productBtnDisabled"
                  @click="createItem('up')">{{ "＋追加" }}</v-btn> -->
                <v-btn
                  class="categoryButton blue-button  h-100"
                  width="100%"
                  style="color:#fff"
                  :disabled="productBtnDisabled || !permissions.includes('CLOUDPOS_PRESET_UPDATE')"
                  @click="createItem('up')">{{ "＋追加" }}</v-btn>
                  <!-- G002.00.0 Update-End -->
              </div>
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3">
              <img
                class="h-100 w-100 icon"
                src="@/assets/ico_edit@2x.png"
                style="opacity: 0.4;" >
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3" >
              <img
                class="h-100 w-100 icon"
                src="@/assets/ico_move.png"
                style="opacity: 0.4;">
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3">
              <img
                class="h-100 w-100 icon"
                src="@/assets/ico_delete.png"
                style="opacity: 0.4;">
            </v-col>
          </v-row>

          <v-row
            v-for="(item, index) in (selectedCategory.items ? selectedCategory.items : [])"
            :key="item.id"
            no-gutters
            class="w-100 tableContent"
            style="height: 114px !important;margin-bottom: 10px;"
          >
            <v-col
              class="h-100 pa-1"
              style="height:114px !important;">
              <div
                class="d-flex h-100 w-100 whiteFrame product-box"
                style="height:114px !important;">
                <div class="product-image-box">
                  <img
                    min-width="50"
                    class="h-50 w-50 icon product-image"
                    v-if="item.presignedUrl !== ''"
                    :src="item.presignedUrl" >
                </div>
                <div class="product-content">
                  <div class="product-content-desc">{{ item.itemName }}</div>
                  <div class="product-content-other">
                    <!-- KSD V001.000 MS -->
                    <!--<div style="line-height: 36px;">{{ item.productTaxCodes ? taxRates[item.productTaxCodes[0]].indicator : '' }}</div>-->
                    <!-- KSD V001.000 DS "rateType"については使用してはいけなかったため"name"に修正-->
                    <!-- <div style="line-height: 36px;">{{ item.productTaxCodes ? taxRates.find(e => e.rateType === item.productTaxCodes[0]).displayName.default : '' }}</div>-->
                    <!-- KSD V001.000 DE "rateType"については使用してはいけなかったため"name"に修正-->
                    <!-- KSD V001.000 AS "rateType"については使用してはいけなかったため"name"に修正-->
                    <div style="line-height: 36px;">{{ item.productTaxCodes ? taxRates.find(e => e.name === item.productTaxCodes[0]).displayName.default : '' }}</div>
                    <!-- KSD V001.000 AS "rateType"については使用してはいけなかったため"name"に修正-->
                    <!-- KSD V001.000 ME -->
                    <div style="font-size:16px;margin-right:8px;line-height: 36px;">
                      <template>
                        ￥{{ item.price | numberPutComma }}
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3"
              @click="editItem(item.order)"
              style="padding-top: 30px !important;">
              <img
                class="h-100 w-100 icon"
                src="@/assets/ico_edit@2x.png" >
            </v-col>
            <v-col
              v-if="permissions.includes('CLOUDPOS_PRESET_UPDATE')"
              cols="auto"
              class="iconCol pa-3"
              draggable="true"
              @dragstart="dragItem(item.order)"
              @drop="dropItem(index)"
              @dragover.prevent
              @dragenter.prevent
              style="padding-top: 30px !important;"
            >
              <img
                class="h-100 w-100 icon"
                src="@/assets/ico_move.png" >
            </v-col>
            <v-col
              v-if="!permissions.includes('CLOUDPOS_PRESET_UPDATE')"
              cols="auto"
              class="iconCol pa-3"
              draggable="false"
              style="padding-top: 30px !important;"
            >
              <img
                class="h-100 w-100 icon"
                style="opacity: 0.4;"
                src="@/assets/ico_move.png" >
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3"
              style="padding-top: 30px !important;">
              <img
                v-if="permissions.includes('CLOUDPOS_PRESET_UPDATE')"
                class="h-100 w-100 icon"
                src="@/assets/ico_delete.png"
                @click="deleteItem(item.order)"
              >
              <img
                v-else
                class="h-100 w-100 icon"
                style="opacity: 0.4;"
                src="@/assets/ico_delete.png"
              >
            </v-col>
          </v-row>

          <!-- donwn button -->
          <v-row
            no-gutters
            class="w-100 tableContent" >
            <v-col class="h-100 pa-1">
              <div
                class="d-flex h-100 w-100 whiteFrame product-box"
                style="height:50px !important;border: none;">
                <!-- G002.00.0 Update-Start -->
                <!-- <v-btn
                  class="categoryButton blue-button  h-100"
                  width="100%"
                  style="color:#fff"
                  :disabled="productBtnDisabled"
                  @click="createItem('donwn')">{{ "＋追加" }}</v-btn> -->
                <v-btn
                  class="categoryButton blue-button  h-100"
                  width="100%"
                  style="color:#fff"
                  :disabled="productBtnDisabled || !permissions.includes('CLOUDPOS_PRESET_UPDATE')"
                  @click="createItem('donwn')">{{ "＋追加" }}</v-btn>
                  <!-- G002.00.0 Update-End -->
              </div>
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3">
              <img
                class="h-100 w-100 icon"
                src="@/assets/ico_edit@2x.png"
                style="opacity: 0.4;" >
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3" >
              <img
                class="h-100 w-100 icon"
                src="@/assets/ico_move.png"
                style="opacity: 0.4;">
            </v-col>
            <v-col
              cols="auto"
              class="iconCol pa-3">
              <img
                class="h-100 w-100 icon"
                src="@/assets/ico_delete.png"
                style="opacity: 0.4;">
            </v-col>
          </v-row>
        </div>

        <!-- 追加ボタン -->
        <!--<div class="w-100 tableContent whiteFrame pa-2">
          <v-btn
            dark
            class="categoryButton blue h-100"
            width="50%"
            :disabled="selectedCategoryId === -1"
            @click="createItem"
          >
            {{ "＋追加" }}
          </v-btn>
        </div>-->

        <!-- 編集ダイアログ -->
        <item-edit-dialog
          ref="itemEditDialog"
          @clickOk="onAddItem" />

        <!-- 企画確認ダイアログ -->
        <preset-list-dialog
          ref="presetListDialog"
          @clickLink="confirmPlan"/>

        <!-- 企画コピーダイアログ -->
        <preset-copy-dialog
          ref="presetCopyDialog"
          @clickOk="copyPlan" />

        <!-- 企画削除ダイアログ -->
        <preset-delete-dialog
          ref="presetDeleteDialog"
          @clickOk="deletePlan" />

      </v-col>
    </v-row>

    <!-- KSD V001.000 AS -->
    <!-- ＯＴＭ画面プレビューエリア -->
    <v-row
      no-gutters
      class="w-100 mt-1">
      <!-- OTM画面プレビュー -->
      <v-col>
        <!-- ヘッダー -->
        <v-row
          no-gutters
          class="w-100 tableHeader">
          <v-col class="h-100 grayFrame headerAreaOTM">
            {{ $t("F32282.S098") }}
          </v-col>
        </v-row>
        <!-- OTM画面プレビュー（カテゴリ一覧エリア） -->
        <div class="w-100 categoryAreaOTM">
          <div
            v-for="(category) in categories"
            :key="category.id"
            no-gutters
          >
            <v-btn
              rounded
              outlined
              class="categoryButtonOTM"
              :selected="category.order === selectedCategoryOrder"
              tabindex="-1"
              disabled
            >
              <div>{{ category.categoryName }}</div>
            </v-btn>
          </div>
        </div>
        <!-- OTM画面プレビュー（商品一覧エリア） -->
        <div class="w-100 productAreaOTM mt-1">
          <div
            v-for="(item) in (selectedCategory.items ? selectedCategory.items : [])"
            :key="item.id"
            no-gutters
            class="productAreaCardOTM"
          >
            <div class="d-flex h-100 w-100 whiteFrame product-box">
              <div class="product-image-box">
                <img
                  min-width="50"
                  class="h-50 w-50 icon product-image"
                  v-if="item.presignedUrl !== ''"
                  :src="item.presignedUrl" >
              </div>
              <div class="product-content">
                <div class="product-content-desc">{{ item.itemName }}</div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <!-- KSD V001.000 AE -->

    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <maint-button
          @close="backToTop"
          @fixed="onPlanUpdate"
          @planCheck="onPlanCheck"
          @planCopy="onPlanCopy"
          @clear="onPlanClear"
          @del="onPlanDelete"
          :isfixed-btn="disables.isfixedBtnDisable || !permissions.includes('CLOUDPOS_PRESET_UPDATE')"
          :isplan-copy-btn="requestParams.id !== '' || !permissions.includes('CLOUDPOS_PRESET_OTHER_1')"
          :isplan-check-btn="false || !permissions.includes('CLOUDPOS_PRESET_OTHER_2')"
          :isclear-btn="disables.isclearBtnDisable"
          :isdel-btn="requestParams.id === '' || !permissions.includes('CLOUDPOS_PRESET_DELETE')"
        />
      </v-col>
    </v-row>
    <popup ref="pop" />
  </v-container>
</template>
