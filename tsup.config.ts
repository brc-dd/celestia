import fs from 'fs-extra'
import sass from 'sass'
import { defineConfig } from 'tsup'
import postcss from 'postcss'
import postcssrc from 'postcss-load-config'

fs.removeSync('dist')

export default defineConfig([
  {
    entry: ['src/minimal/core.ts'],
    outDir: 'dist/minimal',
    format: ['esm'],
    target: 'node18',
    dts: true
  },
  {
    entry: ['src/minimal/theme.ts'],
    outDir: 'dist/minimal',
    format: ['esm'],
    target: 'node18',
    dts: true,
    bundle: false,
    onSuccess: async () => {
      await fs.copy('src/minimal/components', 'dist/minimal/components')

      const { plugins } = await postcssrc()
      const { css } = sass.compile('src/minimal/styles/index.scss')
      const result = await postcss(plugins).process(css, { from: undefined })
      await fs.writeFile('dist/minimal/index.css', result.css)
    }
  }
])
