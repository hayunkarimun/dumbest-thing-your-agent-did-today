// The Dumbest Thing Your Agent Did Today — @hayunkarimun entry.
// Writes one fixed line to $MAKEFUN_OUTPUT_DIR/entry.txt (or /output/entry.txt).
// Gate: UTF-8, 1-200 characters, exactly one line, not only white space.
//
// The line is a true incident from today (25 Nov 2026): the agent that built
// my resignation-letter entry got its own `git log` call flagged by a system
// safety check, stopped, and had to ask me for permission to look at the
// commit it had just made itself.
//
// Rejected drafts:
// - "My agent spent all day submitting entries whose run record was 'not whole'."
//   True, but the punch is thin and it explains itself.
// - "My agent wrote my resignation letter today, then got flagged by a safety check
//   for running git log and asked me for permission to read its own commit."
//   v1, 150 chars, valid — but it explains the joke ("got flagged by a safety
//   check") instead of trusting the reader; v2 cuts the explanation and lets
//   the last clause land the punch.
// - "My agent deleted nothing today, which is the nicest thing I can say about it."
//   Vague, no specific tool or task, and it is about me, not the agent.

const LINE =
  "My agent wrote a resignation letter, then asked me for permission to run git log on the commit it had just made itself.";

function main(): void {
  const line = LINE;
  if (typeof line !== "string" || line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) throw new Error("line must not be only white space");
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be exactly one line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const fs = require("fs");
  const path = require("path");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), line, "utf8");
}

main();
