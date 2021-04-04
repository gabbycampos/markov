const { MarkovMachine } = require("./markov");

describe('markov machine', function () {
  test('makes chains', function () {
    let mm = new MarkovMachine("the cat in the hat");

    expect(Object.keys(mm.chains).length).toEqual(4);
    expect(mm.chains["the"].length).toEqual(2);
  });
});

describe("make text", () => {
    test("test makeText function", () => {
        let mm = new MarkovMachine("the cat in the hat");

        expect(mm.makeText()).toEqual(expect.any(String));
    });
})