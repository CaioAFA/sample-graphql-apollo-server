<template>
  <v-col cols="12">
    <v-row
      justify="space-around"
      align="center"
    >
      <v-col cols="4">
        <v-text-field label="ID" @keyup="setUserFilterId"></v-text-field>
      </v-col>

      <v-col cols="4">
        <v-text-field label="Login" @keyup="setUserFilterLogin"></v-text-field>
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
    setUserFilterId: {
      required: true,
      type: Function
    },
    setUserFilterLogin: {
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