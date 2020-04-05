import { getDataThroughCallback, getDataThroughPromise } from "@/test/async.js";

// 测试回调, 需要执行done，Jest会等done回调函数执行结束后，结束测试
it("测试回调", done => {
    /* expect.assertions 来验证一定数量的断言被调用
    (确保至少有一个断言被调用，否则测试失败) */
    expect.assertions(1);
    getDataThroughCallback(cb => {
        expect(cb).toEqual(123);
        done();
    });
});

// 测试promise，可以使用return，或者await
it("测试promise——return", () => {
    /* expect.assertions 来验证一定数量的断言被调用
    (确保至少有一个断言被调用，否则测试失败) */
    expect.assertions(1);
    return getDataThroughPromise().then(res => {
        expect(res).toEqual({ name: "hrpgn" });
    });
});

// 如果加了only其他的用例则不会执行
it.only("测试promise——await", async () => {
    /* expect.assertions 来验证一定数量的断言被调用
    (确保至少有一个断言被调用，否则测试失败) */
    expect.assertions(1);
    let data = await getDataThroughPromise();
    expect(data).toEqual({ name: "hrpgn" });
});
