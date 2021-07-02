
<template>
  <v-row>
    <v-col class="text-center" cols="12">
      <v-card class="pa-4">
        <builders-form :opts="formOpts"></builders-form>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import FormBuilder from "@/builders/form.js";
import FormDirector from "@/builders/formDirector.js";
export default {
  data() {
    const formOpts = new FormDirector(new FormBuilder()).makeEditAddProduct();
    return {
      valid: false,
      formOpts,
      productErr: "",
      item: null,
    };
  },
  computed: {
    ...mapGetters({
      productLoading: "global/productLoading",
    }),
  },
  methods: {
    findProduct() {
      this.$store
        .dispatch("global/getProduct", this.form.product)
        .then((res) => {
          this.productErr = "";
          this.item = res;
          this.$refs.qty.focus();
        })
        .catch(() => {
          this.productErr = "this product not found";
        });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>