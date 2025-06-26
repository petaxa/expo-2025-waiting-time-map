// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  app: {
    head: {
      title: "ばんぱく！待ち時間 MAP！", // default fallback title
      htmlAttrs: {
        lang: "ja",
      },
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "shortcut icon", href: "/favicon.ico" },
      ],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        {
          name: "description",
          content:
            "コミュニティの報告によって作成されたパビリオンのリアルタイム待ち時間をマップで確認できます。",
        },
        { name: "theme-color", content: "#e60012" },
        { property: "og:title", content: "ばんぱく！待ち時間 MAP！" },
        {
          property: "og:description",
          content: "パビリオンのリアルタイム待ち時間をマップで確認！",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://expo-waiting-map.petaxa.com/" },
        {
          property: "og:image",
          content: "https://expo-waiting-map.petaxa.com/ogp.png",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@damenamepu" },
        { name: "twitter:title", content: "ばんぱく！待ち時間 MAP！" },
        {
          name: "twitter:description",
          content: "パビリオンのリアルタイム待ち時間をマップで確認！",
        },
        {
          name: "twitter:image",
          content: "https://expo-waiting-map.petaxa.com/ogp.png",
        },
        { name: "twitter:image:width", content: "1200" },
        { name: "twitter:image:height", content: "630" },
      ],
    },
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  ssr: true,

  scripts: {
    registry: {
      googleAnalytics: {
        id: "G-3D821WGBN7",
      },
    },
  },

  modules: [
    "nuxt-mcp",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxtjs/leaflet",
    "@nuxt/test-utils/module",
    "@vueuse/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});