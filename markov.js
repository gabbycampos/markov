/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
    this.makeText();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};
    let last = this.words[0];
    for (let i=1; i<this.words.length; i++) {
      if (last in chains) {
        chains[last].push(this.words[i]);
        last = this.words[i];
      } else {
        chains[last] = [this.words[i]];
        last = this.words[i];
      }
    }
    if (chains[this.words[this.words.length - 1]] in chains) {
      chains[this.words[this.words.length - 1]].push(null);
    } else {
      chains[this.words[this.words.length - 1]] = [null];
    }
    this.chains = chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // pick a random key to begin
    let keys = Object.keys(this.chains);
    let key = keys[Math.floor(Math.random() * Math.floor(keys.length))];;
    let out = [];

    // produce markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = this.chains[key] [
        Math.floor(Math.random() * Math.floor(this.chains[key].length))
      ];
    }

    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};

let mm = new MarkovMachine("the cat in the hat");

mm.makeText();

// mm.makeText(numWords=50);

// mm.makeChains()
// console.log(mm)
