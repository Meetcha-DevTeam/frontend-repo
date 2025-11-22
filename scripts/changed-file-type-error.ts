import { execSync } from "child_process";
import ts from "typescript";
import path from "path";

const projectRoot = process.cwd();

// 경로를 프로젝트 루트 기준 상대 경로로 정규화
function normalizePath(filePath: string): string {
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(projectRoot, filePath);
  return path.relative(projectRoot, absolutePath).replace(/\\/g, "/");
}

console.log("TODO: 현재 변경파일들은 origin/develop을 기준으로 추출");
console.log("🔍 Comparing with origin/develop...");
const changed = new Set<string>();
execSync("git diff --name-only origin/develop...HEAD -- '*.ts' '*.tsx'", {
  encoding: "utf8",
})
  .split("\n")
  .filter(Boolean)
  .forEach((file) => {
    // Git이 반환하는 경로는 상대 경로이므로 정규화
    const normalized = normalizePath(file);
    changed.add(normalized);
  });

console.log(`🔍 ${changed.size} changed TS files found.`);

if (changed.size === 0) {
  console.log("✅ No changed TS files.");
  process.exit(0);
}

console.log("Compile TypeScript...");
const configPath = ts.findConfigFile("./", ts.sys.fileExists, "tsconfig.app.json");
if (!configPath) throw new Error("tsconfig not found");

const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, "./");
const program = ts.createProgram(parsed.fileNames, parsed.options);

const diagnostics = ts.getPreEmitDiagnostics(program);

const changedDiagnostics = diagnostics.filter((d) => {
  const { file, start } = d;
  if (!file || start === undefined) return false;

  // file.fileName을 프로젝트 루트 기준 상대 경로로 정규화
  const normalizedFileName = normalizePath(file.fileName);

  if (!changed.has(normalizedFileName)) return false;
  return true;
});

if (changedDiagnostics.length === 0) {
  console.log("✅ No TypeScript errors in changed files.");
  process.exit(0);
}

console.log(`\n❌ Found ${changedDiagnostics.length} TypeScript error(s) in changed files:\n`);

// TypeScript 포맷 호스트 설정
const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (path) => path,
  getCurrentDirectory: () => process.cwd(),
  getNewLine: () => "\n",
};

changedDiagnostics.forEach((diagnostic) => {
  const message = ts.formatDiagnostic(diagnostic, formatHost);
  console.log(message);
});

console.log("\n");
process.exit(1);
