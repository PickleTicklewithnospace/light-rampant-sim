export function getElementById(id) {
    const res = document.getElementById(id);
    if (res === null) {
        throw new Error(`element with id ${id} not found`);
    }
    return res;
}
export function targetHasId(target) {
    return target.id !== undefined;
}
