"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const id128_1 = require("id128");
// var raw = BitConverter.ToString(ulid.ToByteArray()).Replace("-", "")
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    const canonicalRawCommand = vscode.commands.registerCommand('ulid-canonical-raw-viewer.canonicalRawCommand', async () => {
        const ulidRaw = await vscode.window.showInputBox({
            placeHolder: 'Enter a raw ULID (0x...) or a canonical ULID (C...)'
        });
        if (!ulidRaw) {
            return;
        }
        if (ulidRaw.startsWith('0x')) {
            var ulid = id128_1.Ulid.fromRaw(ulidRaw.slice(2));
            vscode.window.showInformationMessage(`Copied: ${ulid.toCanonical()}`);
            vscode.env.clipboard.writeText(ulid.toCanonical());
        }
        else {
            var ulid = id128_1.Ulid.fromCanonical(ulidRaw);
            vscode.window.showInformationMessage(`Copied: 0x${ulid.toRaw()}`);
            vscode.env.clipboard.writeText(`0x${ulid.toRaw()}`);
        }
    });
    context.subscriptions.push(canonicalRawCommand);
    const hovering = vscode.languages.registerHoverProvider([{ language: 'plaintext' }], {
        provideHover(document, position, token) {
            const canonicalRange = document.getWordRangeAtPosition(position, /[0-7][0123456789ABCDEFGHJKMNPQRSTVWXYZ]{25}/);
            const ulidRawRange = document.getWordRangeAtPosition(position, /0x[0-9A-Fa-f]{32}/);
            if (ulidRawRange) {
                const ulidRawWord = document.getText(ulidRawRange);
                var ulid = id128_1.Ulid.fromRaw(ulidRawWord.slice(2));
                return new vscode.Hover(`ULID: \`${ulid.toCanonical()}\`\n\n` +
                    `time: ${new Date(ulid.time).toISOString()}\n\n` +
                    `raw: \`${ulidRawWord}\``);
            }
            if (canonicalRange) {
                const canonicalWord = document.getText(canonicalRange);
                var ulid = id128_1.Ulid.fromCanonical(canonicalWord);
                return new vscode.Hover(`ULID: \`${canonicalWord}\`\n\n` +
                    `time: ${new Date(ulid.time).toISOString()}\n\n` +
                    `raw: \`0x${ulid.toRaw()}\``);
            }
        },
    });
    context.subscriptions.push(hovering);
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map