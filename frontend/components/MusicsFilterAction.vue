<template>
  <v-col cols="12">
    <v-row
      justify="space-around"
      align="center"
    >
      <v-col cols="6">
        <v-text-field label="ID" @keyup="setMusicFilterId"></v-text-field>
      </v-col>

      <v-col cols="2" v-show="buttonClickHandler">
        <v-btn
          color="primary"
          raised
          @click="buttonClick"
          :disabled="disabled !== null ? disabled : false"
        >{{ buttonText }}</v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  computed: {
    buttonClick(){
      if(this.buttonClickHandler){
        return this.buttonClickHandler
      }

      return function(){}
    }
  },
  props: {
    setMusicFilterId: {
      required: true,
      type: Function
    },
    buttonClickHandler: {
      required: false,
      type: Function
    },
    buttonText: {
      required: false,
      type: String
    },
    disabled: {
      required: false,
      type: Boolean
    }
  }
}
</script>

<style>

</style>