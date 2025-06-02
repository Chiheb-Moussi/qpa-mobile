"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, StatusBar, Modal, TouchableWithoutFeedback, Platform, I18nManager } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Colors from "../constants/Colors"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../navigation/AppNavigator"
import { useAuth } from "../contexts/AuthContext"

interface HeaderProps {
  title: string
  showBackButton?: boolean
  showProfileButton?: boolean
  showMenuButton?: boolean
  onMenuPress?: () => void
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, showProfileButton = true, showMenuButton = false, onMenuPress }) => {
  const navigation = useNavigation<NavigationProp>()
  const { logout } = useAuth()
  const insets = useSafeAreaInsets()
  const animatedValue = useRef(new Animated.Value(0)).current
  const [showDropdown, setShowDropdown] = useState(false)

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

  const handleLogout = async () => {
    setShowDropdown(false)
    await logout()
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const backIcon = Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'
  const isRTL = I18nManager.isRTL

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
            <Ionicons 
              name={isRTL ? 'chevron-forward' : backIcon} 
              size={24} 
              color={Colors.text} 
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightContainer}>
        {showMenuButton && (
          <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
            <Ionicons name="menu" size={24} color={Colors.text} />
          </TouchableOpacity>
        )}
        {showProfileButton && (
          <TouchableOpacity onPress={toggleDropdown} style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={28} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
          <View style={styles.modalOverlay}>
            <View style={[
              styles.dropdownContainer,
              { right: isRTL ? 16 : undefined, left: isRTL ? undefined : 16 }
            ]}>
              <TouchableOpacity 
                style={styles.dropdownItem}
                onPress={handleLogout}
              >
                <Ionicons name="log-out-outline" size={20} color={Colors.primary} style={styles.dropdownIcon} />
                <Text style={styles.dropdownText}>تسجيل الخروج</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    alignItems: "flex-start",
  },
  rightContainer: {
    width: 40,
    alignItems: "flex-end",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Cairo-SemiBold',
  },
  backButton: {
    padding: 8,
  },
  profileButton: {
    padding: 5,
  },
  menuButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 60,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 150,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  dropdownText: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Cairo-Regular',
    fontSize: 16,
    color: Colors.text,
  },
})

export default Header
