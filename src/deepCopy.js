export function deepCopy(arg){
    if (typeof arg === "object" && arg !== null && !Array.isArray(arg)) {
        const result = {};
        for (const key in arg) {
            const value = arg[key];
            const clone = deepCopy(value);
            result[key] = clone;
        }
        return result;
    } else if (Array.isArray(arg)) {
        const result = [];
        for (const element of arg) {
            const clone = deepCopy(element);
            result.push(clone);
        }
        return result;
    } else {
        return arg;
    }
}