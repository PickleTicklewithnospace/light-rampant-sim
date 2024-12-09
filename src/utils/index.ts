
export function getElementById(id: string): HTMLElement {
  const res = document.getElementById(id);
  if (res === null) {
    throw new Error(`element with id ${id} not found`);
  }
  return res;
}
export function targetHasId(target: MouseEvent['target']): target is HTMLElement {
  return (target as HTMLElement).id !== undefined;
}