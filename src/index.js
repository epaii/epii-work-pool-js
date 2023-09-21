"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultWorkPools = exports.WorkPools = void 0;
function sleep(time) {
    return new Promise(r => setTimeout(r, time));
}
class WorkPools {
    constructor(size = 10, interval = 50) {
        this.size = size;
        this.interval = interval;
        this.useSize = 0;
        this.tasks = [];
        this.__watch();
    }
    __watch() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                if ((this.useSize < this.size) && (this.tasks.length > 0)) {
                    this.useSize++;
                    this.tasks.shift()();
                }
                else {
                    yield sleep(this.interval);
                }
            }
        });
    }
    doTask(f, position = "push") {
        return new Promise((r, e) => {
            this.tasks[position](() => __awaiter(this, void 0, void 0, function* () {
                try {
                    r(yield f());
                    this.useSize--;
                }
                catch (error) {
                    e(error);
                    this.useSize--;
                }
            }));
        });
    }
    static createWorkPools(size, interval = 50) {
        return new WorkPools(size, interval);
    }
}
exports.WorkPools = WorkPools;
let __defaultWorkPools;
function defaultWorkPools(size = 10, interval = 50) {
    if (!__defaultWorkPools) {
        __defaultWorkPools = WorkPools.createWorkPools(size, interval);
    }
    return __defaultWorkPools;
}
exports.defaultWorkPools = defaultWorkPools;
