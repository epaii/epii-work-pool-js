
function sleep(time: number) {
    return new Promise(r => setTimeout(r, time));
}

export class WorkPools {
    private useSize: number = 0;
    private tasks: Function[] = [];
    constructor(private size: number = 10, private interval: number = 50) {
        this.__watch();
    }

    async __watch() {
        while (true) {
            if ((this.useSize < this.size) && (this.tasks.length > 0)) {
                this.useSize++;
                (this.tasks.shift() as Function)();
            } else {
                await sleep(this.interval);
            }
        }
    }


    doTask<T>(f: () => Promise<T> | T, position: "push" | "unshift" = "push"): Promise<T> {
        return new Promise((r, e) => {
            this.tasks[position](async () => {
                try {
                    r(await f());
                    this.useSize--;
                } catch (error) {
                    e(error);
                    this.useSize--;
                }
            });
        })
    }

    static createWorkPools(size: number, interval: number = 50) {
        return new WorkPools(size, interval);
    }
}

let __defaultWorkPools: WorkPools;

export function defaultWorkPools(size: number = 10, interval: number = 50) {
    if (!__defaultWorkPools) {
        __defaultWorkPools = WorkPools.createWorkPools(size, interval);
    }
    return __defaultWorkPools;
}


