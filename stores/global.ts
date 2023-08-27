import { defineStore } from "pinia";

export const useSideBarMenuStore = defineStore("sideBarMenu", {
  state: () => {
    return {
      isShow: true,
    };
  },
  actions: {
    setIsShow(value: boolean) {
      this.isShow = value;
    },
  },
});
