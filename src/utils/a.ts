import { foo } from "./aa";

const bar: number | null = null;

console.log(foo?.includes("a"));
console.log(foo.includes("a"));

console.log(bar ? bar + 10 : 0);
console.log(bar + 10);
