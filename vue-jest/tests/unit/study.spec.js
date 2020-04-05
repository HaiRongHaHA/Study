import { mount } from "@vue/test-utils";
import Study from "@/components/Study";
it("测试输入框输入数据", () => {
    let wrapper = mount(Study);
    let input = wrapper.find(".sreach_input");
    input.setValue("hallow");
    expect(wrapper.vm.value).toEqual("hallow");
    wrapper.vm.value = "hr";
    expect(wrapper.vm.value).toBe("hr");
});

it("点击测试，如果内容不为为空list数据大于0条", () => {
    let wrapper = mount(Study);
    let input = wrapper.find(".sreach_input");
    let btn = wrapper.find(".sreach_btn");
    input.setValue("hallow");
    btn.trigger("click");
    // btn.exists();        // 是否存在
    // btn.isVisible();     //是否显示隐藏
    // wrapper.classes();   // class集合
    expect(wrapper.vm.arr.length).toBeGreaterThan(0);
});
