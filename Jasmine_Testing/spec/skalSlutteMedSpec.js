"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Numbers_1 = require("../Numbers");
describe("Suite", function () {
    it("Should say 1 if number is 1", function () {
        var number = 1;
        expect(Numbers_1.Numbers(number)).toBe("1");
    });
    it("Should say 2 if number is 2", function () {
        var number = 2;
        expect(Numbers_1.Numbers(number)).toBe("2");
    });
    it("Should say 3 if number is 3", function () {
        var number = 3;
        expect(Numbers_1.Numbers(number)).toBe("3");
    });
});
