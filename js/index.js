const COLOR_THEME = {
  light: {
    mode: "light",
    icon: "🔆",
  },
  dark: {
    mode: "dark",
    icon: "🌙",
  },
};

const THEME_LOCAL_STORAGE_KEY = "user-theme";

class ThemeService {
  constructor() {
    this.userTheme = "";
    this._initializeTheme();
  }

  _initializeTheme() {
    const storedTheme = this._getThemeFromLocalStorage();

    if (storedTheme) {
      this.set(storedTheme);
    } else {
      this.set(COLOR_THEME.light.mode);
    }
  }

  _getThemeFromLocalStorage() {
    const storedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    return storedTheme ? storedTheme : null;
  }

  set(theme) {
    this.userTheme = theme;
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme);
  }

  get() {
    return this.userTheme;
  }
}

const themeService = new ThemeService();
const buttonColorMode = document.querySelector('[data-id="theme-toggler"]');

const toggleColorTheme = () => {
  const currentColorTheme = themeService.get();

  if (currentColorTheme === COLOR_THEME.light.mode) {
    themeService.set(COLOR_THEME.dark.mode);
    toggleButtonColorModeIcon(buttonColorMode, COLOR_THEME.dark.icon);
    return;
  }

  themeService.set(COLOR_THEME.light.mode);
  toggleButtonColorModeIcon(buttonColorMode, COLOR_THEME.light.icon);
};

const toggleButtonColorModeIcon = (buttonNode, icon) => {
  buttonNode.innerHTML = icon;
};

const setButtonColorModeIcon = () => {
  return themeService.get() === COLOR_THEME.light.mode
    ? COLOR_THEME.light.icon
    : COLOR_THEME.dark.icon;
};

buttonColorMode.innerHTML = setButtonColorModeIcon();

buttonColorMode.addEventListener("click", toggleColorTheme);
