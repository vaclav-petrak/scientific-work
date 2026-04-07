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
    baseUrl: "quartz.jzhao.xyz",
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
          light: "#f8fafc",          // --bg-color
          lightgray: "#e2e8f0",      // Extrapolated solid border/card color
          gray: "#64748b",           // --text-muted
          darkgray: "#334155",       // Extrapolated body text color
          dark: "#171321",           // --text-main (Headings/bold)
          secondary: "#089AD9",      // --accent-primary (Links/Current graph node)
          tertiary: "#9179CD",       // --accent-secondary (Hover states/Visited nodes)
          highlight: "rgba(8, 154, 217, 0.15)", // Based on --accent-primary
          textHighlight: "rgba(8, 154, 217, 0.25)",
        },
        darkMode: {
          light: "#0f172a",          // --bg-color
          lightgray: "#1e293b",      // --card-bg (Used for borders/UI backgrounds)
          gray: "#94a3b8",           // --text-muted
          darkgray: "#cbd5e1",       // Extrapolated body text color
          dark: "#f8fafc",           // --text-main (Headings/bold)
          secondary: "#09A8EC",      // --accent-primary
          tertiary: "#9179CD",       // --accent-secondary
          highlight: "rgba(9, 168, 236, 0.15)", // Based on --accent-primary
          textHighlight: "rgba(9, 168, 236, 0.25)",
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