describe("测试套件 1", () => {
    it("相等关系", () => {
        expect(1 + 1).toEqual(2);
        expect([2, 3]).toHaveLength(2);
        expect(true);
        expect(true).toBeTruthy();
        expect(false).toBeFalsy();
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
