import type React from "react"
import type { ReactNode } from "react"
import { View, StyleSheet, type ViewStyle } from "react-native"
import Colors from "../constants/Colors"

interface CardProps {
  children: ReactNode
  style?: ViewStyle
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
  },
})

export default Card
