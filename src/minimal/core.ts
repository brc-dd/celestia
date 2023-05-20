import anchor from 'markdown-it-anchor'
import type { UserConfig } from 'vitepress'
import type { ThemeConfig } from './theme.js'

export const baseConfig: UserConfig = {
  cleanUrls: true,
  scrollOffset: 96,

  markdown: {
    anchor: {
      level: 2,
      permalink: anchor.permalink.ariaHidden({
        symbol: `<svg width="20" height="20"><use href="#radix-icons-link-2"/></svg>`
      })
    },
    config(md) {
      md.core.ruler.push('hr_before_h2', function (state) {
        const tokens = state.tokens
        let i = 0
        while (i < tokens.length) {
          if (tokens[i].type === 'heading_open' && tokens[i].tag === 'h2') {
            tokens.splice(i, 0, new state.Token('hr', 'hr', 0))
            i += 2
          } else ++i
        }
      })
    },
    theme: {
      dark: 'github-dark',
      light: 'github-light'
    }
  },

  vite: {
    ssr: {
      noExternal: ['celestia']
    }
  }
}

export function defineConfig(config: Omit<UserConfig<ThemeConfig>, 'extends'>) {
  const merged: UserConfig<ThemeConfig> = { extends: baseConfig, ...config }
  return merged
}
