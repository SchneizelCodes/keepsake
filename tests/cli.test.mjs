import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import vm from "node:vm";

const cli = fileURLToPath(new URL("../bin/utak.mjs", import.meta.url));

test("initializes, checks, searches and graphs a disposable vault", () => {
  const dir = mkdtempSync(join(tmpdir(), "keepsake-"));
  try {
    const vault = join(dir, "vault");
    const project = join(dir, "project");
    mkdirSync(project);
    const run = (...args) => {
      const r = spawnSync(process.execPath, [cli, ...args], { cwd: project, encoding: "utf8" });
      assert.equal(r.status, 0, r.stdout + r.stderr);
      return r.stdout;
    };
    run("init", vault);
    run("check", "--vault", vault, "--strict");
    assert.ok(JSON.parse(run("search", "small notes", "--vault", vault, "--json")).results.length);
    const graph = join(dir, "graph");
    run("graph", "--vault", vault, "--out", graph);
    assert.ok(JSON.parse(readFileSync(join(graph, "graph.json"), "utf8")).nodes.length);
    assert.ok(readFileSync(join(graph, "graph.html"), "utf8").includes("<canvas"));
    const instructions = join(project, "AGENTS.md");
    const original = "# Project rules\n\nPreserve these instructions.\n";
    writeFileSync(instructions, original);
    run("activate", "--vault", vault, "--project", "--dry-run");
    assert.equal(readFileSync(instructions, "utf8"), original);
    run("activate", "--vault", vault, "--project");
    const once = readFileSync(instructions, "utf8");
    run("activate", "--vault", vault, "--project");
    assert.equal(readFileSync(instructions, "utf8"), once);
    assert.ok(once.includes("Preserve these instructions."));
    run("activate", "--vault", vault, "--project", "--remove");
    assert.equal(readFileSync(instructions, "utf8"), original);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("graph data cannot close its script element", () => {
  // Exercise the real renderer while preserving the CLI's single-file distribution.
  const source = readFileSync(cli, "utf8").replace(/\r\n/g, "\n");
  const start = source.indexOf("function graphHtml(data) {");
  assert.notEqual(start, -1);
  const end = source.indexOf("\n}\n", start) + 2;
  const render = vm.runInNewContext("(" + source.slice(start, end) + ")");
  const data = { nodes: [{ title: "</script><script>throw 1</script>", path: "notes</script>.md" }], edges: [] };
  const html = render(data);
  assert.equal((html.match(/<script>/g) || []).length, 1);
  assert.equal((html.match(/<\/script>/g) || []).length, 1);
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  const recovered = vm.runInNewContext(script.slice(0, script.indexOf(";const cv=")) + "; JSON.stringify(D)");
  assert.deepEqual(JSON.parse(recovered), data);
});
