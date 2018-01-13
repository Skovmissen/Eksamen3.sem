import {Numbers} from '../Numbers';

describe("Suite", () =>
{
    it("Should say 1 if number is 1", () => {
        let number = 1;
        expect(Numbers(number)).toBe("1");
    });
    it("Should say 2 if number is 2", () => {
        let number = 2;
        expect(Numbers(number)).toBe("2");
    });
    it("Should say 3 if number is 3", () => {
        let number = 3;
        expect(Numbers(number)).toBe("3");
    });
});
