/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHAINLIT_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
