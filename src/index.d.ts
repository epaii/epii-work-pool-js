export declare class WorkPools {
    private size;
    private interval;
    private useSize;
    private tasks;
    constructor(size?: number, interval?: number);
    __watch(): Promise<void>;
    doTask<T>(f: () => Promise<T> | T, position?: "push" | "unshift"): Promise<T>;
    static createWorkPools(size: number, interval?: number): WorkPools;
}
export declare function defaultWorkPools(size?: number, interval?: number): WorkPools;
