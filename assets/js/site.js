(() => {
  "use strict";

  function setupNavigation() {
    const nav = document.querySelector("[data-nav]");
    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-menu]");
    if (!nav || !toggle || !menu) return;

    const close = () => {
      nav.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.querySelector("span:not(.sr-only)").textContent = "menu";
    };

    toggle.addEventListener("click", () => {
      const opening = !nav.classList.contains("nav-open");
      nav.classList.toggle("nav-open", opening);
      toggle.setAttribute("aria-expanded", String(opening));
      toggle.querySelector("span:not(.sr-only)").textContent = opening ? "close" : "menu";
    });

    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target)) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });

    const currentPath = normalizePath(window.location.pathname);
    menu.querySelectorAll("a").forEach((link) => {
      if (normalizePath(new URL(link.href, window.location.href).pathname) === currentPath) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function normalizePath(path) {
    return path.replace(/\/+$/, "") + "/";
  }

  function setupTerminal() {
    const terminal = document.querySelector("[data-terminal]");
    if (!terminal) return;

    const output = terminal.querySelector("[data-terminal-output]");
    const form = terminal.querySelector("[data-terminal-form]");
    const input = terminal.querySelector("[data-terminal-input]");
    const screen = terminal.querySelector("[data-terminal-screen]");
    const routes = {
      home: terminal.dataset.home,
      about: terminal.dataset.about,
      education: terminal.dataset.education,
      roles: terminal.dataset.roles,
      projects: terminal.dataset.projects,
      achievements: terminal.dataset.achievements,
      skills: terminal.dataset.skills,
      blogs: terminal.dataset.blogs
    };

    const aliases = new Map([
      ["0", "home"], ["home", "home"], ["cd ~", "home"], ["cd /", "home"],
      ["1", "about"], ["about", "about"], ["whoami", "about"], ["profile", "about"],
      ["2", "education"], ["education", "education"], ["edu", "education"], ["school", "education"],
      ["3", "roles"], ["roles", "roles"], ["role", "roles"], ["experience", "roles"], ["responsibilities", "roles"],
      ["4", "projects"], ["projects", "projects"], ["project", "projects"], ["work", "projects"],
      ["5", "achievements"], ["achievements", "achievements"], ["achievement", "achievements"], ["awards", "achievements"],
      ["6", "skills"], ["skills", "skills"], ["skill", "skills"], ["stack", "skills"], ["tech stack", "skills"],
      ["7", "blogs"], ["blogs", "blogs"], ["blog", "blogs"], ["writing", "blogs"], ["posts", "blogs"]
    ]);
    const completions = ["help", "menu", "ls", "clear", "history", "pwd", "home", "about", "education", "roles", "projects", "achievements", "skills", "blogs", "whoami", "experience", "work", "awards", "stack", "writing"];
    const commandHistory = [];
    let historyIndex = 0;
    let navigationTimer;

    const normalize = (value) => value.toLowerCase().trim().replace(/[?!.,]+$/g, "").replace(/\s+/g, " ");

    function appendLine(text, className = "") {
      const line = document.createElement("p");
      line.className = `terminal-line ${className}`.trim();
      line.textContent = text;
      output.appendChild(line);
      screen.scrollTop = screen.scrollHeight;
      return line;
    }

    function appendEcho(command) {
      const line = document.createElement("p");
      line.className = "terminal-line command-echo";
      const prompt = document.createElement("span");
      prompt.className = "prompt-mini";
      prompt.textContent = "rushabh@portfolio:~$ ";
      line.append(prompt, document.createTextNode(command));
      output.appendChild(line);
    }

    function printHelp() {
      appendLine("Available destinations:", "success");
      appendLine("  1 about          2 education       3 roles");
      appendLine("  4 projects       5 achievements    6 skills");
      appendLine("  7 blogs");
      appendLine("Utilities: help · menu · ls · clear · history · pwd · home", "muted");
      appendLine("Natural language works too: try “show me your projects”.", "muted");
    }

    function inferDestination(command) {
      if (aliases.has(command)) return aliases.get(command);

      if (/\b(who are you|tell me about yourself|about you)\b/.test(command)) return "about";
      if (/\b(what can you do|what are your skills|technical skills|your stack)\b/.test(command)) return "skills";

      const intentPrefix = /\b(show|open|view|go|visit|take me|navigate|see|read|tell me about)\b/;
      if (!intentPrefix.test(command)) return null;

      const candidates = [
        ["roles", /\b(roles?|experience|responsibilities)\b/],
        ["projects", /\b(projects?|work)\b/],
        ["achievements", /\b(achievements?|awards?)\b/],
        ["education", /\b(education|school|academic)\b/],
        ["skills", /\b(skills?|stack|technologies)\b/],
        ["blogs", /\b(blogs?|writing|posts?|articles?)\b/],
        ["about", /\b(about|profile|yourself)\b/]
      ];
      return candidates.find(([, pattern]) => pattern.test(command))?.[0] || null;
    }

    function navigate(destination) {
      if (!routes[destination]) return;
      if (destination === "home") {
        appendLine("You are already at ~/.", "muted");
        return;
      }
      appendLine(`Opening /${destination} …`, "success");
      window.clearTimeout(navigationTimer);
      navigationTimer = window.setTimeout(() => window.location.assign(routes[destination]), 320);
    }

    function execute(rawCommand) {
      const command = normalize(rawCommand);
      if (!command) return;

      commandHistory.push(rawCommand.trim());
      historyIndex = commandHistory.length;
      appendEcho(rawCommand.trim());

      if (command === "clear" || command === "cls") {
        output.replaceChildren();
        return;
      }
      if (command === "help" || command === "menu" || command === "ls" || command === "ls -la") {
        printHelp();
        return;
      }
      if (command === "history") {
        commandHistory.forEach((item, index) => appendLine(`${String(index + 1).padStart(2, " ")}  ${item}`));
        return;
      }
      if (command === "pwd") {
        appendLine(new URL(routes.home, window.location.href).pathname, "success");
        return;
      }

      const destination = inferDestination(command);
      if (destination) {
        navigate(destination);
        return;
      }

      appendLine(`command not found: ${rawCommand.trim()}`, "error");
      appendLine("Type help to see available commands.", "muted");
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const command = input.value;
      input.value = "";
      execute(command);
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (!commandHistory.length) return;
        historyIndex = Math.max(0, historyIndex - 1);
        input.value = commandHistory[historyIndex];
        input.setSelectionRange(input.value.length, input.value.length);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (!commandHistory.length) return;
        historyIndex = Math.min(commandHistory.length, historyIndex + 1);
        input.value = historyIndex === commandHistory.length ? "" : commandHistory[historyIndex];
      } else if (event.key === "Tab") {
        event.preventDefault();
        const value = normalize(input.value);
        if (!value) return;
        const matches = completions.filter((item) => item.startsWith(value));
        if (matches.length === 1) {
          input.value = matches[0];
        } else if (matches.length > 1) {
          appendEcho(input.value);
          appendLine(matches.join("  "), "muted");
        }
      }
    });

    terminal.addEventListener("click", (event) => {
      const commandButton = event.target.closest("[data-terminal-command]");
      if (commandButton) {
        execute(commandButton.dataset.terminalCommand);
        return;
      }
      if (!event.target.closest("button")) input.focus({ preventScroll: true });
    });

    if (window.matchMedia("(pointer: fine) and (min-width: 700px)").matches) {
      window.setTimeout(() => input.focus({ preventScroll: true }), 450);
    }
  }

  setupNavigation();
  setupTerminal();
})();
