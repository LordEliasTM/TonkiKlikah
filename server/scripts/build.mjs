import { exec } from "child_process";
import { readFile, readdir, writeFile } from "fs/promises";
import obfuscator from "javascript-obfuscator";
import suffix from "suffix";
import { rimrafSync } from "rimraf";
import bytenode from "bytenode";

const BUILD_DIR = "./build/";

/** @type {import("javascript-obfuscator").ObfuscatorOptions} */
const obfOptions = {
  optionsPreset: "low-obfuscation",

  target: "node",
  seed: 0,
  disableConsoleOutput: false,
  selfDefending: false,
  debugProtection: false,
  debugProtectionInterval: 0,
  ignoreImports: false,
  //domainLock: "",
  //domainLockRedirectUrl: "",
  sourceMap: false,
  sourceMapMode: "inline",
  sourceMapBaseUrl: "https://Kuyenda",
  sourceMapFileName: "",

  stringArray: true,
  stringArrayRotate: false,
  stringArrayShuffle: false,
  stringArrayThreshold: 1,
  stringArrayIndexShift: false,
  stringArrayIndexesType: ["hexadecimal-number"],
  stringArrayCallsTransform: false,
  stringArrayCallsTransformThreshold: 1,
  stringArrayWrappersCount: 1,
  stringArrayWrappersType: "variable",
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersChainedCalls: false,
  stringArrayEncoding: ["base64"],
  splitStrings: true,
  splitStringsChunkLength: 10,
  unicodeEscapeSequence: false,
  //forceTransformStrings: /./,
  //reservedStrings: /./,
  
  identifierNamesGenerator: "hexadecimal",
  identifiersDictionary: [],
  identifiersPrefix: "",//"nigga".repeat(69),
  renameGlobals: false,
  renameProperties: false,
  renamePropertiesMode: "safe",
  //reservedNames: /./,

  compact: false,
  simplify: false,
  transformObjectKeys: false,
  numbersToExpressions: false,
  controlFlowFlattening: false,
  controlFlowFlatteningThreshold: 1,
  deadCodeInjection: false,
  deadCodeInjectionThreshold: 1,
}

rimrafSync(BUILD_DIR);

exec("tsc", (error, stdout, stderr) => {
  if(error) return console.error(`${error}\n${stdout}`);

  readdir(BUILD_DIR).then(files => {
    files.forEach(file => {
      const path = BUILD_DIR + file;
      readFile(path, "utf-8").then(code => {
        const obfuscated = obfuscator.obfuscate(code, obfOptions);
        const obfCode = obfuscated.getObfuscatedCode();
        const obfPath = suffix(path, ".obf");

        writeFile(obfPath, obfCode).then(() => {
          bytenode.compileFile(obfPath);
        })
        .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    });
  })
  .catch(err => console.error(err));
});
