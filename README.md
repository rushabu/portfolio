# Rushabh Shah — Portfolio

A terminal-first personal portfolio built with [Hugo](https://gohugo.io/) and deployed to GitHub Pages at [rushabu.github.io/portfolio](https://rushabu.github.io/portfolio/).

The homepage accepts shell-style commands, numbered menu choices, and a small set of natural-language navigation phrases. The rest of the site uses a restrained cream-on-black editorial layout for portfolio sections and writing.

## Requirements

- Hugo Extended `0.161.0` (the version used by the deployment workflow)
- Git, including submodule support for the `yinyang` theme

## Local development

```sh
hugo server -D
```

Open `http://localhost:1313/portfolio/`.

Create a production build with:

```sh
hugo --minify
```

Hugo writes the generated site to `public/`.

## Terminal commands

| Destination | Number | Main command | Aliases and recognized intent |
| --- | ---: | --- | --- |
| About | `1` | `about` | `whoami`, `profile`, “who are you” |
| Education | `2` | `education` | `edu`, `school` |
| Roles | `3` | `roles` | `experience`, `responsibilities` |
| Projects | `4` | `projects` | `project`, `work` |
| Achievements | `5` | `achievements` | `achievement`, `awards` |
| Skills | `6` | `skills` | `skill`, `stack`, “what can you do” |
| Blogs | `7` | `blogs` | `blog`, `writing`, `posts` |

Utility commands include `help`, `menu`, `ls`, `clear`, `history`, `pwd`, and `home`. Tab completes known commands, while the Up and Down arrow keys move through command history.

This is a deterministic navigation interface, not an AI chatbot. It does not send commands to a server or external service.

## Project structure

- `content/` — Markdown content for About, Education, Roles, Achievements, Skills, and Blogs
- `layouts/` — project-level Hugo templates that override the theme
- `assets/css/site.css` — cream-and-black visual system and responsive styles
- `assets/js/site.js` — terminal interaction, navigation intent matching, and mobile navigation
- `themes/yinyang/` — the underlying Hugo theme retained as a submodule/base
- `.github/workflows/hugo.yml` — existing GitHub Pages build and deployment workflow

CSS and JavaScript are loaded through Hugo Pipes, minified, and fingerprinted for cache busting. Route URLs are rendered by Hugo into the terminal element so commands work correctly under the `/portfolio/` GitHub Pages base path.

## Accessibility and performance

- Conventional navigation remains available without using the terminal.
- The terminal input has an explicit accessible label and its output uses a polite live region.
- Keyboard focus is visible; the terminal supports Enter, Tab, and command-history keys.
- Mobile devices require a tap before opening the software keyboard.
- Motion is limited to small interface transitions and respects `prefers-reduced-motion`.
- No canvas animation, Three.js, runtime API, or chatbot dependency is used.

## Deployment

Pushes to `main` trigger the existing GitHub Actions workflow, which builds with Hugo Extended and publishes `public/` to GitHub Pages. The site configuration, `baseURL`, and hosting workflow are intentionally unchanged.
