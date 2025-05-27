"use client"

import type React from "react"

import { useState, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface YearSelectorProps {
  currentYear: string
  onYearChange: (year: string) => void
  years: string[]
}

const YearSelector: React.FC<YearSelectorProps> = ({ currentYear, onYearChange, years }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const animation = useRef(new Animated.Value(1)).current
  const modalAnimation = useRef(new Animated.Value(0)).current

  const handleYearSelect = (year: string) => {
    onYearChange(year)
    setModalVisible(false)
  }

  const toggleModal = () => {
    if (!modalVisible) {
      setModalVisible(true)
      Animated.timing(modalAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(modalAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false)
      })
    }
  }

  const startPulseAnimation = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>الرجاء تحديد السنة</Text>

      <TouchableOpacity
        style={styles.yearButton}
        onPress={() => {
          toggleModal()
          startPulseAnimation()
        }}
      >
        <Animated.View style={[styles.yearTextContainer, { transform: [{ scale: animation }] }]}>
          <Text style={styles.yearText}>{currentYear}</Text>
          <View style={styles.underline} />
        </Animated.View>
        <Ionicons name="chevron-down" size={20} color="white" style={styles.icon} />
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible} animationType="none" onRequestClose={() => toggleModal()}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => toggleModal()}>
          <Animated.View
            style={[
              styles.modalContent,
              {
                opacity: modalAnimation,
                transform: [
                  {
                    scale: modalAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <FlatList
              data={years}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.yearItem, currentYear === item && styles.selectedYearItem]}
                  onPress={() => handleYearSelect(item)}
                >
                  <Text style={[styles.yearItemText, currentYear === item && styles.selectedYearItemText]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  label: {
    fontSize: 18,
    fontFamily: "Cairo-Bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  yearButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  yearTextContainer: {
    alignItems: "center",
  },
  yearText: {
    fontSize: 32,
    fontFamily: "Cairo-Bold",
    color: "white",
  },
  underline: {
    height: 2,
    backgroundColor: "white",
    width: 40,
    marginTop: 2,
  },
  icon: {
    marginLeft: 5,
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "70%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    maxHeight: 300,
  },
  yearItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedYearItem: {
    backgroundColor: "#f0f8ff",
  },
  yearItemText: {
    fontSize: 18,
    fontFamily: "Cairo-SemiBold",
    textAlign: "center",
    color: "#333",
  },
  selectedYearItemText: {
    color: "#2196F3",
  },
})

export default YearSelector
