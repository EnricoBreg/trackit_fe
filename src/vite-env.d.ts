interface ImportMetaEnv {
  readonly VITE_BACKEND_PROTOCOL: string;
  readonly VITE_BACKEND_SERVER_IP: string;
  readonly VITE_BACKEND_SERVER_PORT: string;
  readonly VITE_BASE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}