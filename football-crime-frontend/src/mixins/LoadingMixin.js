
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["loading"]),
  },
  methods: {
    ...mapActions(["updateLoading"]),
    toggleSpinner() {
      this.updateLoading(!this.loading);
    },
  },
};
