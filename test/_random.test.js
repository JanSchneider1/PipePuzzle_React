const { randomInt } = require("../src/js/_random.js");

test("Generating a random int with probabilities not adding up to 1.0 throws Error", () => {
    expect(() => { randomInt(1.2, 2, 5) })
        .toThrow("Probabilities 1.2,2,5 don't add up to 1.0s");
});
test("Generating a random int with probabilities containing a negative number throws error", () => {
    expect(() => { randomInt(1.2, 0, -0.2) })
        .toThrow(new Error("Probabilities 1.2,0,-0.2 aren't allowed to contain negative numbers"));
});
test("Generating a random int with probabilities of length 0 throws error", () => {
    expect(() => { randomInt() })
        .toThrow(new Error('Probabilities cannot be empty'));
});

describe('Test if generating random int returns expected results', () => {
    test("Random int should be 0 if random is 0.19 and probabilities are [0.2, 0.8]", () => {
        Math.random = jest.fn(() => 0.19);
        expect(randomInt(0.2, 0.8)).toBe(0);
    });
    test("Random int should be 1 if random is 0.2 and probabilities are [0.2, 0.8]", () => {
        Math.random = jest.fn(() => 0.2);
        expect(randomInt(0.2, 0.8)).toBe(1);
    });
    test("Random int should be 1 if random is 0.99 and probabilities are [0.2, 0.8]", () => {
        Math.random = jest.fn(() => 0.99);
        expect(randomInt(0.2, 0.8)).toBe(1);
    });
    test("Random int should be 3 if random is 0.99 and probabilities are [0.1, 0.1, 0.1, 0.7]", () => {
        Math.random = jest.fn(() => 0.99);
        expect(randomInt(0.1, 0.1, 0.1, 0.7)).toBe(3);
    });
    test("Random int should be 0 if random is 0.99 and probabilities are [1]", () => {
        Math.random = jest.fn(() => 0.99);
        expect(randomInt(1)).toBe(0);
    });
});