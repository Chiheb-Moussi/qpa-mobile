import { Platform } from "react-native"

// Polices de secours par plateforme
const FontFallback = {
  regular: Platform.select({
    ios: "System",
    android: "Roboto",
    default: "sans-serif",
  }),
  bold: Platform.select({
    ios: "System",
    android: "Roboto",
    default: "sans-serif-bold",
  }),
  semiBold: Platform.select({
    ios: "System",
    android: "Roboto",
    default: "sans-serif-medium",
  }),
}

export default FontFallback
