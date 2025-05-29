"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { Image, StyleSheet, View, TouchableOpacity, Animated } from "react-native"
import { RTLAnimations } from "../utils/i18n"

interface QatarFlagProps {
  size?: number
}

const QatarFlag: React.FC<QatarFlagProps> = ({ size = 60 }) => {
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
            style={[
              styles.flag,
              {
                width: size/2,
                height: size/2,
                borderRadius: size / 2,
                transform: [{ scaleX: RTLAnimations.scaleX }],
              },
            ]}
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
    resizeMode: "cover",
    backgroundColor: "transparent",
  },
})

export default QatarFlag
