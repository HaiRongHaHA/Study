import { mount } from "@vue/test-utils";
import SearchInputQuery from "@/components/base/SearchInputQuery";
// 创建测试套件
// describe("SearchInputQuery", () => {
// // 创建不同测试用例
// it("测试搜索组件", () => {
// const wrapper = mount(SearchInputQuery);
// //设置组件 props
// wrapper.setProps();
// //通过 vm 寻找 data 中的数据
// console.log(wrapper.vm.inputValue, "inputValue");
// // to.be.equal 判断两个东西是否相等
// expect(wrapper.vm.inputValue).toEqual(undefined);
// // const input = wrapper.find(".search_input");
// // const btn = wrapper.find(".search_btn");
// // 判断 input 是否存在
// // input.exists(); isVisible();//是否显示隐藏
// // input.trigger("keyup.enter");
// // btn.trigger("click");
// // dblclick
// // btn.classes()
// // include 是否存在
// // expect(btn.classes()).to.be.include("search_btn");
// });
// });
describe("测试套件 1", () => {
    // it 也可以写成 test，都是用例的意思;
    it("相等关系", () => {
        expect(1 + 1).toEqual(2);
        expect([2, 3]).toHaveLength(2);
        expect(true);
    });
});

describe("测试套件 2", () => {
    it("包含关系", () => {
        expect("hairong").toContain("hai");
        expect("hairong").toMatch(/hairong/);
    });
    it("大于 小于", () => {
        expect(5).toBeGreaterThan(3);
        expect(3).toBeLessThan(5);
        expect(3).not.toBeGreaterThan(10);
    });
});
