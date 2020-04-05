import { fetchList, mockTimer } from "@/test/mock.js";
jest.useFakeTimers(); //启用伪装定时器
it("测试fetchList", () => {
    return fetchList().then(data => {
        expect(data).toContain(4);
    });
});

it("测试timer事件到达后，是否可以调用方法", () => {
    let fn = jest.fn();
    mockTimer(fn);
    // jest.runAllTimers(); // 立即执行所有定时器
    jest.runOnlyPendingTimers(); //立即执行挂起的定时器
    // jest.advanceTimersByTime(3000); //提前n毫秒执行定时器
    // 断言mockFn被调用
    // expect(fn).toBeCalled();
    // 断言mockFn被调用了一次
    expect(fn).toBeCalledTimes(1);
});
