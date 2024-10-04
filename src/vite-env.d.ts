/// <reference types="vite/client" />

interface ImportMetaData {
    readonly VITE_API_URL : string
    readonly VITE_USER_URL : string
}

interface ImportMeta {
    readonly env : ImportMetaData
}