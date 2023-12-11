<style src="@/resource/static/css/CommonDesign/utils.css" />
<script type="text/javascript" src="@/resource/static/js/PresetMaster/presetDeleteDialog.js" />

<template>
  <div>
    <common-dialog
      v-model="displayed"
      title="企画削除"
      @clickBack="closeDialog"
      @clickOk="onClickOk"
    >
      <!-- 削除する企画 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="4"
          class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
          >
            {{ "削除する企画" }}
          </label>
        </v-col>

        <v-col
          cols="7"
          class="h-100">
          <v-select
            v-model="selectedId"
            :items="plans"
            item-value="id"
            item-text="planningCode"
          />
        </v-col>
      </v-row>
    </common-dialog>
    <popup ref="pop" />
  </div>
</template>
