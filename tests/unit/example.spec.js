import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld/index.vue";

describe("HelloWorld/index.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
    wrapper.setData({
      categories: "ok"
    });
    expect(wrapper.vm.category).toBe("ok");
  });
});
