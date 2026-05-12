import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Regla experimental que genera falsos positivos en patrones estándar
      // de carga de datos asíncrona dentro de useEffect
      'react-hooks/set-state-in-effect': 'off',
      // Los archivos de contexto exportan tanto el objeto Context como el Provider —
      // esto es un patrón estándar de React que no afecta el hot-reload
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
])
