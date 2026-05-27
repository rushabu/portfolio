+++
title = "Heh, he told me to dockerize it..."
date = 2026-05-24T09:00:00+05:30
description = "A short story about how I had to use DOCKER."
[author]
homepage = "/about/"
+++

So I was working on a project called **CLASS AI** — a RAG-based system for our college.

The idea was simple:

* **Students** could get subject-specific help regarding:

  * syllabus
  * notes
  * past papers
  * academic queries

* **Faculty** could use it for:

  * leave applications
  * documentation help
  * form filling
  * other repetitive administrative work

My friend and I split the work.

| Person | Responsibility          |
| ------ | ----------------------- |
| Me     | Student-side RAG system |
| Him    | Faculty-side assistant  |

Everything was going fine...

Until we tried merging both parts together.

---

## The Problem™

He was using:

```bash
Python 3.10
```

And I was using:

```bash
Python 3.13
```

Which basically translated to:

> "Congratulations, none of the libraries work together anymore."

Half his dependencies were either incompatible or completely broken on my setup.

Naturally, I asked ChatGPT what to do.

It gave me two options:

1. Downgrade to Python 3.10
2. Dockerize the entire application

And obviously...

## We Dockerize.

---

# Enter Docker

At this point, I had almost no idea how Docker actually worked.

I knew containers existed.
I knew people on LinkedIn liked saying things like:

> "Containerized microservice architecture."

That was about it.

So I started learning by doing.

---

# The Real Pain: Routing

Most of the issues came from routing and service communication.

My friend was running **Qdrant** through the desktop server locally, while I was trying to make everything work inside containers.

That meant I had to handle:

* one routing setup for local execution
* another routing setup for Docker networking

Which sounds simple until nothing connects to anything and every container acts like it has trust issues.

---

# 3–4 Hours of Pure Debugging

The next few hours were basically:

```text
Change config
Run container
Fail
Read logs
Google error
Question life choices
Repeat
```

Over and over again.

I spent around **3–4 hours** debugging:

* networking
* container communication
* environment variables
* dependency conflicts
* broken routes
* incorrect ports
* Qdrant connections

But eventually...

## It Worked.

And honestly, that moment felt *amazing*.

Not only did the project finally run properly, but I also ended up learning a lot about Docker in the process.

---

# What Docker Actually Felt Like

Before this, Docker sounded unnecessarily complicated.

After using it, it finally clicked.

Docker basically lets you package:

* your code
* dependencies
* runtime
* environment
* configurations

into one isolated container so the application behaves the same everywhere.

In simple terms:

> "If it works on my machine, it'll work on yours too."

No more:

* "bro install this version"
* "that package doesn't work anymore"
* "wait why is your localhost different"

Just:

```bash
docker compose up
```

And pray slightly less.

---

# Final Thoughts

The funny thing is, I started this just trying to merge two Python environments.

Ended up learning:

* Docker
* container networking
* service routing
* debugging distributed setups
* why version mismatches are painful

All because ChatGPT casually said:

> "You could Dockerize it."

And I took that personally.
