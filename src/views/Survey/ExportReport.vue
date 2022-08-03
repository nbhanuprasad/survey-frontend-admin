<template>
  <download-csv
    :data="fileData"
    :name="fileName"
    class="button__black align-center"
  >
    Export Survey Report &nbsp; <v-icon dark> mdi-export </v-icon>
  </download-csv>
</template>
<script>
import JsonCSV from "vue-json-csv";
export default {
  components: {
    downloadCsv: JsonCSV,
  },
  props: {
    fileData: Array,
    fileName: String,
  },
};
</script>
<style>
.align-center {
  width: 30%;
  text-align: center;
  margin: 20px auto;
}
@media screen and (max-width: 900px) {
  .align-center {
    width: 80%;
  }
}
</style>