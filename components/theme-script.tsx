const themeScript = `
(() => {
  try {
    const storedTheme = window.localStorage.getItem("divyanx-theme-v2");
    const theme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : "light";

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
