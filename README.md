## Ulid Utilities

**Credit**

This extension is based on the id128 extension by [aarondcohen](https://github.com/aarondcohen/id128)

**Features**

- Generate ULID: Generate a new ULID and copy it to your clipboard.
- Convert ULID: Convert a raw ULID to its canonical form and vice versa. (SQL Server varbinary representation)
- Hover Information: Display detailed information about ULIDs when hovering over them in plaintext files.

## Usage

### Generate ULID
- Open the command palette (Ctrl+Shift+P or Cmd+Shift+P on macOS).
- Run the command `Ulid: Generate`

### Convert ULID
- Open the command palette (Ctrl+Shift+P or Cmd+Shift+P on macOS).
- Run the command `Ulid: Convert`.
- Enter a raw ULID (starting with 0x) or a canonical ULID.
- The converted ULID will be copied to your clipboard and a notification will appear.

### Hover Information
- Open a plaintext file.
- Hover over a raw ULID (e.g., 0x...) or a canonical ULID.
- A hover tooltip will display the ULID in the other format, along with its timestamp.