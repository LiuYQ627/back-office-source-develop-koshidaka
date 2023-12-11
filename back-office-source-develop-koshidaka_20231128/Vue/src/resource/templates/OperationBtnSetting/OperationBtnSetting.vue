<style src="@/resource/static/css/CommonDesign/utils.css" />
<style src="@/resource/static/css/OperationBtnSetting/operationBtnSetting.css" />
<script type="text/javascript" src="@/resource/static/js/OperationBtnSetting/operationBtnSetting.js" />

<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221221 duyouwei(Neusoft)  G001.00.0  issue課題#1161を対応します.
 * 20230112 bai.ry(Neusoft)  G002.00.0  issue課題#1249を対応します.
 * 20230112 litie(Neusoft)     G003.00.0  issue課題#1058を対応します.
 * 20230113 bai.ry(Neusoft)     G004.00.0  issue課題#1370を対応します.
 * 20230530 qinshh(Neusoft)     G005.00.0  issue課題#1392を対応します.
 * 20230608 wangchunmei(Neusoft) G006.00.0  issue課題#1662を対応します.
 * 20230825 heqianlong(Neusoft) G007.00.0  issue課題#1187を対応します.
 -->
<template>
  <v-container class="mt-15 operation-container">

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
        <!-- G003.00.0 Update-Start -->
        <!-- <store-select v-model="targetStoreCodes" multiple /> -->
        <store-select
          v-model="targetStoreCodes"
          multiple
          headquarters-authority-check-enable />
          <!-- G003.00.0 Update-End -->
      </v-col>
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
        <!-- G003.00.0 Update-Start -->
        <!-- <store-select v-model="sourceStoreCodes" @change="sourceStoreChanged" /> -->
        <!-- G005.00.0 Update-Start -->
        <!-- <store-select v-model="sourceStoreCodes" @change="sourceStoreChanged" headquartersAuthorityCheckEnable /> -->
        <store-select
          v-model="sourceStoreCodes"
          @change="sourceStoreChanged($event,arguments)"
          headquarters-authority-check-enable />
          <!-- G005.00.0 Update-End -->
          <!-- G003.00.0 Update-End -->
      </v-col>
    </v-row>

    <template v-if="setting">
      <!-- 画面選択 -->
      <v-row
        no-gutters
        class="conditionRow d-flex align-center mt-4">
        <v-col
          cols="3"
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
        >{{ "画面選択" }}</v-col>
        <v-col
          cols="5"
          class="h-100">
          <select
            tabindex="0"
            class="h-100 w-100 whiteFrame pl-2"
            v-model="currentScreen"
            style="color:#000000"
          >
            <option disabled/>
            <option
              v-for="screenList in config.screenList"
              :key="screenList.key"
              :value="screenList.key"
            >
              {{ screenList.label }}
            </option>
          </select>
          <div class="pulldownArrow"/>
        </v-col>
      </v-row>

      <!-- ドロアメニュー -->
      <template v-if="currentScreen == 'drawerMenu'">
        <br >
        <v-row
          no-gutters
          class="mt-4">
          <v-col
            cols="6"
            offset="2">
            <v-row no-gutters>
              <v-col>
                <!-- G006.00.0 Update-Start -->
                <!-- <v-btn
                  block
                  color="#1ea7cb"
                  class="mb-2"
                  @click="openDrawerMenuSettingDialog"> -->
                <v-btn
                  block
                  color="#1ea7cb"
                  class="mb-2"
                  :disabled="!permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                  @click="openDrawerMenuSettingDialog">
                  <!-- G006.00.0 Update-End -->
                  <font
                    color="white"
                    size="4px">{{ "＋追加" }}</font>
                </v-btn>
                <v-spacer/>
              </v-col>
              <v-col
                class="col-auto"
                style="width: 20px;"/>
              <v-col
                class="col-auto"
                style="width: 60px;"/>
              <v-col
                class="col-auto"
                style="width: 60px;"/>
            </v-row>
            <draggable
              v-model="displayDrawerMenu"
              handle=".draggableIcon">
              <div
                v-for="[key] in [...displayDrawerMenu]"
                :key="key">
                <template>
                  <v-row no-gutters>
                    <v-col
                      class="whiteFrame"
                      style="vertical-align: middle; line-height: 69px;">{{ key | drawer_menu }}</v-col>
                    <v-col
                      class="col-auto"
                      style="width: 20px;"/>
                    <v-col
                      v-if="permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                      cols="auto"
                      class="iconCol pa-3 draggableIcon">
                      <img
                        class="h-100 w-100 icon"
                        src="@/assets/ico_move.png" >
                    </v-col>
                    <v-col
                      v-if="!permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                      cols="auto"
                      class="iconCol pa-3">
                      <img
                        class="h-100 w-100 icon"
                        style="opacity: 0.4;"
                        src="@/assets/ico_move.png" >
                    </v-col>
                    <v-col
                      cols="auto"
                      class="iconCol pa-3">
                      <img
                        v-if="permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                        class="h-100 w-100 icon"
                        src="@/assets/ico_delete.png"
                        @click="deleteDrawerMenu(key)"
                      >
                      <img
                        v-else
                        class="h-100 w-100 icon"
                        style="opacity: 0.4;"
                        src="@/assets/ico_delete.png"
                      >
                    </v-col>
                  </v-row>
                </template>
              </div>
            </draggable>
          </v-col>
        </v-row>

        <drawer-menu-setting-dialog
          ref="drawerMenuSettingDialog"
          @clickSave="drawerMenuSettingSaveCallback" />

      </template>

      <!-- 商品明細ポップアップ -->
      <template v-if="currentScreen == 'productDetail'">
        <br >
        <v-row>
          <v-col cols="10">
            <draggable
              v-model="itemDetails"
              class="row mt-4"
              handle=".draggableIcon">
              <template >
                <v-col
                  v-for="(itemDetail, index) in itemDetails"
                  :key="index"
                  cols="3">
                  <div class="px-2">
                    <v-row>
                      <v-col>
                        <img
                          class="h-100 w-100 icon"
                          src="@/assets/ico_edit@2x.png"
                          @click="openItemDetailSettingDialog(index)"
                        >
                      </v-col>
                      <v-col
                        v-if="permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                        class="draggableIcon">
                        <img
                          class="h-100 w-100 icon"
                          src="@/assets/ico_move.png"
                        >
                      </v-col>
                      <v-col
                        v-if="!permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                        class="">
                        <img
                          class="h-100 w-100 icon"
                          style="opacity: 0.4;"
                          src="@/assets/ico_move.png"
                        >
                      </v-col>
                      <v-col>
                        <img
                          v-if="permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                          class="h-100 w-100 icon"
                          src="@/assets/ico_delete.png"
                          @click="deleteItemDetail(index)"
                        >
                        <img
                          v-else
                          class="h-100 w-100 icon"
                          style="opacity: 0.4;"
                          src="@/assets/ico_delete.png"
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <!-- G007.00.0 Update-Start -->
                      <!-- <div
                        v-if="itemDetail.active"
                        class="whiteFrame w-100 d-flex justify-center align-center pa-4"
                        style="height: 100px;">{{ itemDetails[index].displayName.default }}</div> -->
                      <div
                        v-if="itemDetail.active"
                        class="whiteFrame w-100 d-flex justify-center align-center pa-4"
                        style="white-space: pre-line;height: 100px;">{{ formatDisplayName(itemDetails[index].displayName.default) }}</div>
                      <!-- G007.00.0 Update-End -->
                      <!-- G006.00.0 Update-Start -->
                      <!-- <v-btn
                        v-else
                        block
                        color="#1ea7cb"
                        class="mb-2"
                        style="height: 100px;"
                        @click="openItemDetailSettingDialog(index)"> -->
                      <v-btn
                        v-else
                        block
                        color="#1ea7cb"
                        class="mb-2"
                        style="height: 100px;"
                        :disabled="!permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                        @click="openItemDetailSettingDialog(index)">
                        <!-- G006.00.0 Update-End -->
                        <font
                          color="white"
                          size="4px">{{ "＋追加" }}</font>
                      </v-btn>
                    </v-row>
                  </div>
                </v-col>
              </template>
            </draggable>
          </v-col>
        </v-row>

        <item-detail-setting-dialog
          ref="itemDetailSettingDialog"
          @clickSave="itemDetailSettingSaveCallback" />

      </template>

      <!-- 会計画面 -->
      <template v-if="currentScreen == 'planScreen'">
        <br >

        <template v-if="isSubListScreen == null">
          <v-row
            no-gutters
            class="mt-4">
            <v-col
              cols="6"
              offset="2">
              <v-row no-gutters>
                <v-col>
                  <!-- G006.00.0 Update-Start -->
                  <!-- <v-btn
                    block
                    color="#1ea7cb"
                    class="mb-2"
                    @click="openAccountingSettingDialog(undefined)"> -->
                  <v-btn
                    block
                    color="#1ea7cb"
                    class="mb-2"
                    :disabled="!permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                    @click="openAccountingSettingDialog(undefined)">
                    <!-- G006.00.0 Update-End -->
                    <font
                      color="white"
                      size="4px">{{ "＋追加" }}</font>
                  </v-btn>
                  <v-spacer/>
                </v-col>
                <v-col
                  class="col-auto"
                  style="width: 20px;"/>
                <v-col
                  class="col-auto"
                  style="width: 60px;"/>
                <v-col
                  class="col-auto"
                  style="width: 60px;"/>
                <v-col
                  class="col-auto"
                  style="width: 60px;"/>
              </v-row>
              <draggable
                v-model="accountingSettings"
                handle=".draggableIcon">
                <!-- CS #1489
                <template
                  v-for="(setting, index) in accountingSettings"
                >
                CE #1489 -->
                <div
                  v-for="(setting, index) in accountingSettings"
                  :key="setting.order">
                  <v-row no-gutters>
                    <!-- G004.00.0 Update-Start -->
                    <v-col
                      v-if="setting.kind ===1"
                      class="whiteFrame"
                      style="vertical-align: middle; line-height: 69px;"
                      @click="showSubListItems(index)">
                      {{ getNameFromSetting(setting.paymentType) }}
                    </v-col>
                    <v-col
                      v-if="setting.kind !==1"
                      class="whiteFrame"
                      style="vertical-align: middle; line-height: 69px;"
                      @click="showSubListItems(index)">
                      {{ setting.displayName ? setting.displayName.default : "" }}
                    </v-col>
                    <!-- G004.00.0 Update-End -->
                    <v-col
                      class="col-auto"
                      style="width: 20px;"/>
                    <v-col
                      cols="auto"
                      class="iconCol pa-3">
                      <img
                        class="h-100 w-100 icon"
                        src="@/assets/ico_edit@2x.png"
                        @click="openAccountingSettingDialog(index)"
                      >
                    </v-col>
                    <v-col
                      v-if="permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                      cols="auto"
                      class="iconCol pa-3 draggableIcon">
                      <img
                        class="h-100 w-100 icon"
                        src="@/assets/ico_move.png" >
                    </v-col>
                    <v-col
                      v-if="!permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                      cols="auto"
                      class="iconCol pa-3">
                      <img
                        class="h-100 w-100 icon"
                        style="opacity: 0.4;"
                        src="@/assets/ico_move.png" >
                    </v-col>
                    <v-col
                      cols="auto"
                      class="iconCol pa-3">
                      <img
                        v-if="permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                        class="h-100 w-100 icon"
                        src="@/assets/ico_delete.png"
                        @click="deleteAccountingSetting(index)"
                      >
                      <img
                        v-else
                        class="h-100 w-100 icon"
                        style="opacity: 0.4;"
                        src="@/assets/ico_delete.png"
                      >
                    </v-col>
                  </v-row>
                <!-- </template> -->
                </div>
              </draggable>
            </v-col>
          </v-row>

          <accounting-setting-dialog
            ref="accountingSettingDialog"
            :media-list="mediaList"
            @clickSave="accountingSettingSaveCallback"
          />
        </template>
        <template v-else>
          <div>
            <v-btn
              color="#565960"
              @click="closeSubListScreen"><font color="white">{{ "戻る" }}</font></v-btn>
          </div>
          <v-row>
            <v-col cols="12">
              <draggable
                v-model="subListItems"
                class="row mt-4"
                handle=".draggableIcon">
                <template >
                  <!-- G002.00.0 Update-Start -->
                  <!--<v-col cols="3">-->
                  <v-col
                    cols="3"
                    v-for="(itemDetail, index) in subListItems"
                    :key="index"
                    :style="{maxWidth:'20%' }">
                    <!-- G002.00.0 Update-End -->
                    <div class="px-2">
                      <v-row>
                        <v-col>
                          <img
                            class="h-100 w-100 icon"
                            src="@/assets/ico_edit@2x.png"
                            @click="openSubListSettingDialog(index)"
                          >
                        </v-col>
                        <v-col
                          v-if="permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                          class="draggableIcon">
                          <img
                            class="h-100 w-100 icon"
                            src="@/assets/ico_move.png"
                          >
                        </v-col>
                        <v-col
                          v-if="!permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                          class="">
                          <img
                            class="h-100 w-100 icon"
                            style="opacity: 0.4;"
                            src="@/assets/ico_move.png"
                          >
                        </v-col>
                        <v-col>
                          <img
                            v-if="permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                            class="h-100 w-100 icon"
                            src="@/assets/ico_delete.png"
                            @click="deleteSubListItem(index)"
                          >
                          <img
                            v-else
                            class="h-100 w-100 icon"
                            style="opacity: 0.4;"
                            src="@/assets/ico_delete.png"
                          >
                        </v-col>
                      </v-row>
                      <div
                        v-if="itemDetail.active"
                        class="w-100 d-flex justify-center align-center pa-4"
                        :class="{
                          whiteFrame: itemDetail.kind != 1,
                          pinkFrame: itemDetail.kind == 1
                        }"
                        style="height: 100px;word-break: break-all;"
                      >
                        {{ itemDetail.displayName ? itemDetail.displayName.default : "" }}
                      </div>
                      <!-- G006.00.0 Update-Start -->
                      <!-- <v-btn
                        v-else
                        block
                        color="#1ea7cb"
                        class="mb-2"
                        style="height: 100px;"
                        @click="openSubListSettingDialog(index)"> -->
                      <v-btn
                        v-else
                        block
                        color="#1ea7cb"
                        class="mb-2"
                        style="height: 100px;"
                        :disabled="!permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                        @click="openSubListSettingDialog(index)">
                        <!-- G006.00.0 Update-End -->
                        <font
                          color="white"
                          size="4px">{{ "＋追加" }}</font>
                      </v-btn>
                    </div>
                  </v-col>
                </template>
              </draggable>
            </v-col>
          </v-row>

          <item-detail-setting-dialog
            ref="subListSettingDialog"
            @clickSave="subListSettingSaveCallback" />
          <sub-media-setting-dialog
            ref="subMediaSettingDialog"
            @clickSave="subMediaSettingSaveCallback" />
          <!-- G001.00.0 Add-Start -->
          <sub-media-btn-setting-dialog
            ref="subMediaBtnSettingDialog"
            @clickSave="subMediaBtnSettingSaveCallback" />
            <!-- G001.00.0 Add-End -->
        </template>

      </template>

      <!-- KSD V001.000 AS -->
      <!-- クーポン利用 -->
      <template v-if="currentScreen == 'couponUse'">
        <br >
        <v-row>
          <v-col cols="12">
            <draggable
              v-model="couponUse"
              class="row mt-4"
              handle=".draggableIcon">
              <template v-for="(coupon, index) in couponUse">
                <v-col cols="2">
                  <div class="px-2">
                    <v-row>
                      <v-col>
                        <img
                          class="h-100 w-100 icon"
                          src="@/assets/ico_edit@2x.png"
                          @click="openCouponUseSettingDialog(index)"
                        >
                      </v-col>
                      <v-col
                        v-if="permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                        class="draggableIcon">
                        <img
                          class="h-100 w-100 icon"
                          src="@/assets/ico_move.png"
                        >
                      </v-col>
                      <v-col
                        v-if="!permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                        class="">
                        <img
                          class="h-100 w-100 icon"
                          style="opacity: 0.4;"
                          src="@/assets/ico_move.png"
                        >
                      </v-col>
                      <v-col>
                        <img
                          v-if="permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
                          class="h-100 w-100 icon"
                          src="@/assets/ico_delete.png"
                          @click="deleteCouponUse(index)"
                        >
                        <img
                          v-else
                          class="h-100 w-100 icon"
                          style="opacity: 0.4;"
                          src="@/assets/ico_delete.png"
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <div
                        v-if="coupon.active"
                        class="whiteFrame w-100 d-flex justify-center align-center pa-4 text-wrap"
                        style="height: 100px;">{{ coupon.displayName }}</div>
                      <v-btn
                        v-else
                        block
                        color="#1ea7cb"
                        class="mb-2"
                        style="height: 100px;"
                        @click="openCouponUseSettingDialog(index)">
                        <font
                          color="white"
                          size="4px">{{ $t("F322b1.S008") }}</font>
                      </v-btn>
                    </v-row>
                  </div>
                </v-col>
              </template>
            </draggable>
          </v-col>
        </v-row>

        <coupon-use-setting-dialog
          ref="couponUseSettingDialog"
          @clickSave="couponUseSettingSaveCallback" />

      </template>
      <!-- KSD V001.000 AE -->

    </template>

    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <maint-button
          @close="backToTop"
          @fixed="fixed"
          :isfixed-btn="disabledFixedBtn" />
      </v-col>
    </v-row>
    <popup ref="pop" />

    <v-overlay :value="isProcessing">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          :size="70"
          :width="7"
          color="white"
        />
      </div>
    </v-overlay>

  </v-container>
</template>
