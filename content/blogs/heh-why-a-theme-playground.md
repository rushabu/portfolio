+++
title = "Heh, why a theme playground..."
date = 2026-05-28T00:00:00+05:30
description = "A color theme PLAYGROUND."
[author]
homepage = "/about/"
+++

Just a lightweight place where I can tweak foreground and background colors in real time and see what the site feels like immediately.

---

## The Playground

{{< theme-playground >}}

---

## What the playground actually does

The controls below let me change:

- the background color
- the foreground color

As soon as I press apply, the page injects inline CSS variable overrides for this article view only.

That means it temporarily replaces values like:

- `--bg-color`
- `--text-color`
- `--link-color`
- `--border-color`
- `--secondary-text`
- `--code-bg`
- `--blockquote-color`
- `--blockquote-border`

So it is not replacing the whole stylesheet. It is layering a small override on top of the existing theme variables.

---

## Why it does not sync across the website

That part is intentional.

This playground does **not** use local storage.
It does **not** write to config files.
It does **not** persist when I move to another page.

The override only lives in memory for this page while the blog is open.

So the behavior is:

1. Open this blog
2. Try different colors
3. See the result instantly
4. Leave the page
5. Everything goes back to normal

That keeps it experimental instead of turning it into a site-wide preference system.

