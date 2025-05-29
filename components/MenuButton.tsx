"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { TouchableOpacity, Text, Image, StyleSheet, Animated, type ImageSourcePropType, View } from "react-native"
import Colors from "../constants/Colors"
import { RTLStyles } from "../utils/i18n"

interface MenuButtonProps {
  title: string
  icon: ImageSourcePropType
  onPress: () => void
  isSelected?: boolean
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, icon, onPress, isSelected = false }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (isSelected) {
      startPulseAnimation()
    } else {
      pulseAnim.setValue(1)
    }
  }, [isSelected])

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }

  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Animated.View style={[styles.iconContainer, isSelected && { transform: [{ scale: pulseAnim }] }]}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </Animated.View>
      <View style={styles.titleContainer}>
        <Text 
          style={[styles.title, isSelected && styles.selectedTitle, RTLStyles]} 
          numberOfLines={1}
          minimumFontSize={9}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    borderRadius: 10,
    width: 65,
    backgroundColor: "#fff",
    height: 110,
  },
  selectedContainer: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    marginBottom: 4,
  },
  icon: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  titleContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  title: {
    fontFamily: "Cairo-Regular",
    fontSize: 10,
    textAlign: "center",
    color: Colors.text,
    width: "100%",
  },
  selectedTitle: {
    color: "white",
    fontFamily: "Cairo-Bold",
  },
})

export default MenuButton
