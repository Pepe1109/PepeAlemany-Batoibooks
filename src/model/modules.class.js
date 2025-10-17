import Module from "./module.class.js";
import {
  getDBModules,
  getModuleByCode
} from "../services/api.js";

export default class Modules {
  constructor() {
    this.data = [];
  }

  async populate() {
    const modules = await getDBModules();
    this.data = modules.map(m => new Module(m.code, m.cliteral, m.vliteral, m.courseId));
  }

  getModuleByCode(code) {
    return getModuleByCode(this.data, code);
  }

  toString() {
    return this.data.map(m => m.toString()).join("\n");
  }
}
