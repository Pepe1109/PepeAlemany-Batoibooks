import Module from "./module.class.js";

export default class Modules {
  constructor() {
    this.data = [];
  }

  populate(modules) {
    this.data = modules.map(
      m => new Module(m.code, m.cliteral, m.vliteral, m.courseId)
    );
  }

  getModuleByCode(code) {
    const module = this.data.find(m => m.code === code);
    if (!module) throw new Error("Module not found");
    return module;
  }

  toString() {
    return this.data.map(m => m.toString()).join("\n");
  }
}
