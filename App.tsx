"use client"

import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useFonts } from "expo-font"
import AppNavigator from "./navigation/AppNavigator"
import { AuthProvider } from "./contexts/AuthContext"
import { View, Text, ActivityIndicator } from "react-native"
import * as SplashScreen from "expo-splash-screen"
import { useCallback, useEffect, useState } from "react"
import Colors from "./constants/Colors"

// Empêcher la fermeture automatique du SplashScreen
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore error */
})

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [fontsLoaded, fontError] = useFonts({
    "Cairo-Regular": require("./assets/fonts/Cairo-Regular.ttf"),
    "Cairo-Bold": require("./assets/fonts/Cairo-Bold.ttf"),
    "Cairo-SemiBold": require("./assets/fonts/Cairo-SemiBold.ttf"),
  })

  useEffect(() => {
    async function prepare() {
      try {
        // Simuler un délai pour s'assurer que les polices sont chargées
        await new Promise((resolve) => setTimeout(resolve, 1000))
      } catch (e) {
        console.warn("Erreur lors de la préparation de l'application:", e)
      } finally {
        // Marquer l'application comme prête
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  // Fonction pour cacher le SplashScreen une fois les polices chargées
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && (fontsLoaded || fontError)) {
      await SplashScreen.hideAsync().catch((err) => {
        console.log("Erreur lors de la fermeture du splash screen:", err)
      })
    }
  }, [appIsReady, fontsLoaded, fontError])

  // Fallback si les polices ne se chargent pas après un certain temps
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!fontsLoaded && !fontError) {
        console.log("Timeout: Tentative de continuer sans les polices")
        setAppIsReady(true)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [fontsLoaded, fontError])

  if (!appIsReady || (!fontsLoaded && !fontError)) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ marginTop: 10, fontFamily: undefined }}>Chargement des ressources...</Text>
      </View>
    )
  }

  // Fallback pour les polices si elles ne se chargent pas
  if (fontError) {
    console.error("Erreur de chargement des polices:", fontError)
    // Continuer sans les polices personnalisées
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
