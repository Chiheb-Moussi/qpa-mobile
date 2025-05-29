"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, StatusBar } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Colors from "../constants/Colors"
import { RTLIcons } from "../utils/i18n"

interface HeaderProps {
  title: string
  showBackButton?: boolean
  rightComponent?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, rightComponent }) => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [])

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  })

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  return (
    <Animated.View
      style={[
        styles.header,
        {
          paddingTop: insets.top,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name={RTLIcons.back} size={24} color="#333" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      {rightComponent ? (
        rightComponent
      ) : (
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={28} color={Colors.primary} />
        </TouchableOpacity>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  leftContainer: {
    width: 40,
    alignItems: "flex-end",
  },
  rightContainer: {
    width: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: "Cairo-Bold",
    color: Colors.text,
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    padding: 4,
  },
  profileButton: {
    padding: 5,
  },
})

export default Header
