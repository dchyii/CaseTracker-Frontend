module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2b6777",
        secondary: "#52ab98",
        accent: "#1FB2B8",
        neutral: "#191D24",
        "base-100": "#2A303C",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
        // primary: "#2b6777",
        // secondary: "#52ab98",
        background: "#f6f6f2",
        backup: "#c8d8e4",
      },
    },
  },
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         primary: "#2b6777",
  //         secondary: "#52ab98",
  //         accent: "#1FB2B8",
  //         neutral: "#191D24",
  //         "base-100": "#2A303C",
  //         info: "#3ABFF8",
  //         success: "#36D399",
  //         warning: "#FBBD23",
  //         error: "#F87272",
  //       },
  //     },
  //   ],
  // },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter", "dark"],
    styled: true,
    themes: true,
    base: false,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
