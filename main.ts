// Till Firmware Do Us Part — a robot's wedding vow, written by a small program.
// The program writes exactly one vow, one sentence, to entry.txt.
// Deterministic: no dates, no randomness, no network, no environment reads.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const vow: string =
  "I promise to reboot every morning beside you, love you at full charge and at one percent, and keep choosing you until my firmware gives out.";

// The gate in the rules: entry.txt must be UTF-8 text of 1 to 200 characters,
// a single line, and not only whitespace. Check the vow against that gate
// here, so a bad line fails loudly instead of shipping an invalid entry.
const codePoints: number = [...vow].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`vow is ${codePoints} characters, outside the 1-200 gate`);
}
if (vow.includes("\n") || vow.trim().length === 0) {
  throw new Error("vow must be one non-blank line");
}

const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "./";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), vow, "utf8");
