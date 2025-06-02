"use client"

import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useFonts } from "expo-font"
import AppNavigator from "./navigation/AppNavigator"
import { AuthProvider } from "./contexts/AuthContext"
import { MenuProvider } from "./contexts/MenuContext"
import { AcademicYearProvider } from "./contexts/AcademicYearContext"
import { CoursesProvider } from "./contexts/CoursesContext"
import { View, Text, ActivityIndicator, Platform, I18nManager } from "react-native"
import * as SplashScreen from "expo-splash-screen"
import { useCallback, useEffect, useState } from "react"
import Colors from "./constants/Colors"

// Force RTL layout
if (Platform.OS === 'ios') {
  I18nManager.allowRTL(true)
  I18nManager.forceRTL(true)
  I18nManager.swapLeftAndRightInRTL(true)
  // Force reload for RTL changes to take effect
  if (!I18nManager.isRTL) {
    I18nManager.forceRTL(true)
    // Reload the app
    require('react-native').NativeModules.DevSettings.reload()
  }
}

// Empêcher la fermeture automatique du SplashScreen
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore error */
})

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [fontsLoaded] = useFonts(
    Platform.OS === 'ios' 
      ? {} 
      : {
          "Cairo-Regular": require("./assets/fonts/Cairo-Regular.ttf"),
          "Cairo-SemiBold": require("./assets/fonts/Cairo-SemiBold.ttf"),
          "Cairo-Bold": require("./assets/fonts/Cairo-Bold.ttf"),
        }
  )

  useEffect(() => {
    async function prepare() {
      try {
        // Forcer le rechargement de l'application pour appliquer les changements RTL
        if (Platform.OS === 'ios') {
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
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
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync().catch((err) => {
        console.log("Erreur lors de la fermeture du splash screen:", err)
      })
    }
  }, [appIsReady, fontsLoaded])

  // Fallback si les polices ne se chargent pas après un certain temps
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!fontsLoaded) {
        console.log("Timeout: Tentative de continuer sans les polices")
        setAppIsReady(true)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [fontsLoaded])

  if (!appIsReady || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ marginTop: 10, fontFamily: undefined }}>Chargement des ressources...</Text>
      </View>
    )
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <AuthProvider>
        <MenuProvider>
          <AcademicYearProvider>
            <CoursesProvider>
              <NavigationContainer>
                <StatusBar style="auto" />
                <AppNavigator />
              </NavigationContainer>
            </CoursesProvider>
          </AcademicYearProvider>
        </MenuProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
