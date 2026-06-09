# Application Icons

Place icon files here in the following formats:

- `32x32.png` (32×32)
- `128x128.png` (128×128)
- `128x128@2x.png` (256×256)
- `icon.icns` (macOS)
- `icon.ico` (Windows)

Generate these from a master SVG/PNG using:

```bash
npm run tauri icon path/to/master-icon.png
```

The brand color is `#050403` (noir) with `#C8AD7F` (champagne) accent.
A simple ornamental "V" mark inside a circle works well at all sizes.
