# celestia (WIP)

A simple theme for VitePress.

## Installation

```sh
npm add -D celestia
```

## Usage

```ts
// .vitepress/config.ts
import { defineConfig } from 'celestia/minimal/core'

export default defineConfig({
  // ...
})
```

```ts
// .vitepress/theme/index.ts
import Theme from 'celestia/minimal/theme'
import 'celestia/minimal/styles'

export default Theme
```

## License

MIT
