import { execSync } from "child_process";
import { existsSync, rmSync, cpSync } from "fs";
import { resolve } from "path";

const root = resolve(".");
const frontendDir = resolve(root, "frontend");
const frontendDist = resolve(frontendDir, "dist");
const rootDist = resolve(root, "dist");

console.log("Building frontend in frontend/...");
execSync("npm install", { cwd: frontendDir, stdio: "inherit" });
execSync("npm run build", { cwd: frontendDir, stdio: "inherit" });

if (existsSync(rootDist)) {
  rmSync(rootDist, { recursive: true, force: true });
}
cpSync(frontendDist, rootDist, { recursive: true });
console.log("Copied frontend/dist to root dist/");
