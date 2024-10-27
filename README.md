## ULID Canonical-Raw Viewer Extension

This Visual Studio Code extension provides functionality to view and convert ULIDs between their canonical and raw forms. It also offers hover information for ULIDs in plaintext files.

**Features**

- Generate ULID: Generate a new ULID and copy it to your clipboard.
- Convert ULID: Convert a raw ULID to its canonical form and vice versa.
- Hover Information: Display detailed information about ULIDs when hovering over them in plaintext files.

## Usage
### Generate ULID
- Open the command palette (Ctrl+Shift+P or Cmd+Shift+P on macOS).
- Run the command ULID Canonical-Raw Viewer: Generate ULID.

### Convert ULID
- Open the command palette (Ctrl+Shift+P or Cmd+Shift+P on macOS).
- Run the command ULID Canonical-Raw Viewer: Convert ULID.
- Enter a raw ULID (starting with 0x) or a canonical ULID.
- The converted ULID will be copied to your clipboard and a notification will appear.

### Hover Information
- Open a plaintext file.
- Hover over a raw ULID (e.g., 0x...) or a canonical ULID.
- A hover tooltip will display the ULID in the other format, along with its timestamp.