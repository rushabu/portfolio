+++
title = "Heh, why a theme playground..."
date = 2026-05-28T00:00:00+05:30
description = "A write-up on why I built a theme playground and how its page-local color overrides work."
[author]
homepage = "/about/"
+++

Sometimes the fastest way to understand a visual system is to stop talking about it and start dragging color values around.

That is basically why I wanted a theme playground.

Not a full design system.
Not a huge settings page.
Just a lightweight place where I can tweak foreground and background colors in real time and see what the site feels like immediately.

---

## Why build it as a blog?

Because this is one of those features that is more fun when it is explained as much as it is implemented.

Instead of hiding the idea somewhere else, I wanted it to live as a small technical note:

- what problem it solves
- how it works
- what exactly it overrides
- why it only affects this page

That makes it both a playground and a tiny engineering write-up.

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

---

## The Playground

{{< theme-playground >}}

---

## Final Thought

I like this version better than a global color feature because it stays playful.

It shows the implementation, demonstrates the effect, and keeps the experiment safely local to one article.

That feels very on-brand for a portfolio blog:

build something small, make it understandable, and let the explanation be part of the product.
