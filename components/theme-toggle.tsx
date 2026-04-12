"use client";

type Theme = "light" | "dark";

function applyTheme(nextTheme: Theme) {
  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.style.colorScheme = nextTheme;
  window.localStorage.setItem("divyanx-theme", nextTheme);
  window.localStorage.setItem("divyanx-theme-v2", nextTheme);
}

export function ThemeToggle() {
  function handleToggle() {
    const currentTheme: Theme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <span className="theme-toggle__track">
        <span className="theme-toggle__thumb" />
      </span>
      <span className="theme-toggle__label">Toggle theme</span>
    </button>
  );
}
