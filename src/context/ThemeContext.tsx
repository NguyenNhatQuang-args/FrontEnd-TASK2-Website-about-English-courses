import React, { createContext, useContext, useState } from "react";
import { ConfigProvider, theme } from "antd";
import { COLORS } from "../styles/colors";

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    setDarkMode((prev) => {
      localStorage.setItem("theme", !prev ? "dark" : "light");
      return !prev;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: darkMode
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,

          token: {
            // ===== Primary =====
            colorPrimary: darkMode
                ? COLORS.primary.main
                : COLORS.primary.dark,

            // ===== Status colors =====
            colorSuccess: COLORS.success.main,
            colorError: COLORS.error.main,
            colorWarning: COLORS.warning.main,
            colorInfo: COLORS.info.main,

            // ===== Text =====
            colorText: darkMode
              ? COLORS.neutral.white
              : COLORS.text.primary,
            colorTextSecondary: COLORS.text.secondary,

            // ===== Background =====
            colorBgBase: darkMode
              ? COLORS.background.dark
              : COLORS.background.default,

            colorBgContainer: darkMode
              ? COLORS.neutral.gray[900]
              : COLORS.background.paper,

            // ===== Border =====
            colorBorder: COLORS.border.main,
          },

          components: {
            Layout: {
                headerBg: darkMode
                    ?COLORS.primary.dark
                    : COLORS.primary.light,
                siderBg: darkMode
                    ? COLORS.primary.dark
                    : COLORS.primary.light,
                
            },

            Menu:
            {
                darkItemBg: darkMode
                    ? COLORS.primary.dark
                    : COLORS.primary.light,
                darkItemColor: darkMode
                    ? COLORS.neutral.white
                    : COLORS.neutral.black,
                darkItemSelectedBg: darkMode
                    ? COLORS.primary.main
                    : COLORS.neutral.gray[300],
                 
                darkItemHoverBg: COLORS.primary.light,
                darkItemSelectedColor:darkMode
                    ? COLORS.neutral.white
                    : COLORS.neutral.black,
                    
            }
          }
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
