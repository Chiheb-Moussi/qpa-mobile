"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { TouchableOpacity, Text, Image, StyleSheet, Animated, type ImageSourcePropType } from "react-native"
import Colors from "../constants/Colors"

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
    <TouchableOpacity style={[styles.container, isSelected && styles.selected]} onPress={onPress} activeOpacity={0.7}>
      <Animated.View style={[styles.iconContainer, isSelected && { transform: [{ scale: pulseAnim }] }]}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </Animated.View>
      <Text style={[styles.title, isSelected && styles.selectedText]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 12,
    width: 75,
  },
  selected: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  iconContainer: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 35,
    marginBottom: 6,
  },
  icon: {
    width: 45,
    height: 45,
    alignSelf: "center",
  },
  title: {
    fontFamily: "Cairo-Regular",
    fontSize: 11,
    textAlign: "center",
    color: Colors.text,
    marginTop: 2,
    width: "100%",
    numberOfLines: 1,
    ellipsizeMode: "tail",
  },
  selectedText: {
    color: "white",
    fontFamily: "Cairo-Bold",
  },
})

export default MenuButton
