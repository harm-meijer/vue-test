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
      foo: "bar"
    });
    // https://vue-test-utils.vuejs.org/api/wrapper/#setdata
    //  according to documentation but never passes
    //  foo is undefined
    debugger;
    expect(wrapper.vm.foo).toBe("bar");
  });
});
