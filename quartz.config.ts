import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Fundamentals of Scientific Work",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "vaclav-petrak.github.io/scientific-work",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Inter",
        code: "IBM Plex Mono", // Kept standard, adjust if you have a branded monospaced font
      },
      colors: {
        lightMode: {
          light: "#F5F0E1",          // Warm Ivory - Primary background
          lightgray: "#E5DCC8",      // Slightly darker ivory for borders/cards
          gray: "#6A8859",           // Sage Green - Muted text
          darkgray: "#2B2A27",       // Charcoal Ink - Body text
          dark: "#2B2A27",           // Charcoal Ink - Headings/bold
          secondary: "#964846",      // Terracotta Red - Primary links
          tertiary: "#6D8DA6",       // Muted Denim Blue - Hover states
          highlight: "rgba(150, 72, 70, 0.15)", // Terracotta Red highlight
          textHighlight: "rgba(216, 167, 96, 0.25)", // Golden Mustard highlight
        },
        darkMode: {
          light: "#1A1918",          // Dark charcoal background
          lightgray: "#2B2A27",      // Charcoal for borders/cards
          gray: "#6A8859",           // Sage Green - Muted text
          darkgray: "#E5DCC8",       // Light ivory - Body text
          dark: "#F5F0E1",           // Warm Ivory - Headings/bold
          secondary: "#964846",      // Terracotta Red - Primary links
          tertiary: "#D8A760",       // Golden Mustard - Hover states
          highlight: "rgba(150, 72, 70, 0.15)", // Terracotta Red highlight
          textHighlight: "rgba(216, 167, 96, 0.25)", // Golden Mustard highlight
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
        rssSlug: "feed",
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config