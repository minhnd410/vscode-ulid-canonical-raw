// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Ulid } from  'id128';

// C#
// var raw = BitConverter.ToString(ulid.ToByteArray()).Replace("-", "")

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const newUlid = vscode.commands.registerCommand('ulid-canonical-raw-viewer.newUlidCommand', async () => {
    const ulid = Ulid.generate();
    vscode.window.showInformationMessage(`Copied: ${ulid.toCanonical()}`);
    vscode.env.clipboard.writeText(ulid.toCanonical());
  });

  context.subscriptions.push(newUlid);

  const canonicalRawCommand = vscode.commands.registerCommand('ulid-canonical-raw-viewer.canonicalRawCommand', async () => {
    const ulidRaw = await vscode.window.showInputBox({
      placeHolder: 'Enter a raw ULID (0x...) or a canonical ULID (C...)'
    });

    if (!ulidRaw) {
      return;
    }

    if (ulidRaw.startsWith('0x')) {
      var ulid = Ulid.fromRaw(ulidRaw.slice(2));
      vscode.window.showInformationMessage(`Copied: ${ulid.toCanonical()}`);
      vscode.env.clipboard.writeText(ulid.toCanonical());
    } else {
      var ulid = Ulid.fromCanonical(ulidRaw);
      vscode.window.showInformationMessage(`Copied: 0x${ulid.toRaw()}`);
      vscode.env.clipboard.writeText(`0x${ulid.toRaw()}`);
    }
  });

  context.subscriptions.push(canonicalRawCommand);

	const hovering = vscode.languages.registerHoverProvider([{ language: 'plaintext' }], {
      provideHover(document, position, token) {
        const canonicalRange = document.getWordRangeAtPosition(
          position,
          /[0-7][0123456789ABCDEFGHJKMNPQRSTVWXYZ]{25}/
        );
        
        const ulidRawRange = document.getWordRangeAtPosition(
          position,
          /0x[0-9A-Fa-f]{32}/
        );

        if (ulidRawRange) {
          const ulidRawWord = document.getText(ulidRawRange);
          var ulid = Ulid.fromRaw(ulidRawWord.slice(2));

          return new vscode.Hover(
            `ULID: \`${ulid.toCanonical()}\`\n\n` +
            `time: ${new Date(ulid.time).toISOString()}\n\n` +
            `raw: \`${ulidRawWord}\``
          );
        }

        if (canonicalRange) {
          const canonicalWord = document.getText(canonicalRange);
          var ulid = Ulid.fromCanonical(canonicalWord);

          return new vscode.Hover(
            `ULID: \`${canonicalWord}\`\n\n` +
            `time: ${new Date(ulid.time).toISOString()}\n\n` +
            `raw: \`0x${ulid.toRaw()}\``
          );
        }
      },
    });

	context.subscriptions.push(hovering);
}

// This method is called when your extension is deactivated
export function deactivate() {}
