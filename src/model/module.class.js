class Module {
  constructor(code, cliteral, vliteral, courseId) {
    this.code = code;
    this.cliteral = cliteral;
    this.vliteral = vliteral;
    this.courseId = courseId;
  }

  toString() {
    return `Module[${this.code}] ${this.cliteral} / ${this.vliteral}`;
  }
}

export default Module;
