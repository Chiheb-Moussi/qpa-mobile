"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { Image, StyleSheet, View, TouchableOpacity, Animated } from "react-native"

interface QatarFlagProps {
  size?: number
}

const QatarFlag: React.FC<QatarFlagProps> = ({ size = 40 }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    startPulseAnimation()
  }, [])

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
          delay: 3000,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={require("../assets/images/qatar-flag.png")}
            style={[styles.flag, { width: size, height: size }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    zIndex: 100,
  },
  flag: {
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
})

export default QatarFlag
