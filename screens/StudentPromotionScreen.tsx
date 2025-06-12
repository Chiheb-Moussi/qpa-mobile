"use client"

import React, { useState, useRef, useEffect } from "react"
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../navigation/AppNavigator"
import Header from "@/components/Header"
import Menu from "@/components/Menu"
import Colors from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"

import Card from "../components/Card"
type NavigationProp = NativeStackNavigationProp<RootStackParamList>
type Props = NativeStackScreenProps<RootStackParamList, "StudentPromotion">

const StudentPromotionScreen: React.FC<Props> = () => {
  const navigation = useNavigation<NavigationProp>()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const fadeAnim1 = useRef(new Animated.Value(0)).current
  const fadeAnim2 = useRef(new Animated.Value(0)).current
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const promotions = [
    { id: "1", name: "الدفعة الأولى" },
    { id: "2", name: "الدفعة الثانية" },
    { id: "3", name: "الدفعة الثالثة" },
    { id: "4", name: "الدفعة الرابعة" },
  ]

  const navigateToStudentList = (promotionId: string, promotionName: string) => {
    navigation.navigate("StudentDiplomaList", { promotionId, promotionName })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="طلبة الدبلوم" showBackButton />
      <Menu />

      <ScrollView style={styles.scrollView}>
      <View style={styles.content}>
      <Card style={styles.blueCard}>
      <Animated.Text
              style={[
                styles.title,
                {
                  opacity: fadeAnim1,
                  transform: [
                    {
                      translateX: fadeAnim1.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              الدفعات
            </Animated.Text>
       
          <View style={styles.promotionList}>
            {promotions.map((promotion, index) => (
              <React.Fragment key={promotion.id}>
                {index > 0 && <View style={styles.divider} />}
                <Animated.View
                    style={{
                      opacity: fadeAnim1,
                      transform: [
                        {
                          translateY: fadeAnim1.interpolate({
                            inputRange: [0, 1],
                            outputRange: [20, 0],
                          }),
                        },
                      ],
                    }}
                  >
                <TouchableOpacity
                  style={styles.promotionButton}
                  onPress={() => navigateToStudentList(promotion.id, promotion.name)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.promotionText}>{promotion.name}</Text>
                  <View style={styles.arrowContainer}>
                    <Ionicons name="chevron-forward" size={24} color="white" />
                  </View>
                </TouchableOpacity>
                </Animated.View>
              </React.Fragment>
            ))}
          
       
      </View>
      </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7f7",
      },
      scrollView: {
        flex: 1,
      },
      content: {
        padding: 16,
      },
      blueCard: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        padding: 20,
      },
      title: {
        fontSize: 24,
        fontFamily: "Cairo-Bold",
        color: "white",
        textAlign: "right",
        marginBottom: 10,
        marginTop: -10,
      },
  promotionList: {
    width: "100%",
  },
  promotionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  promotionText: {
    fontSize: 16,
    fontFamily: "Cairo-SemiBold",
    color: "white",
    textAlign: "right",
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 15,
  },
  arrowContainer: {
    borderRadius: 15,
    padding: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
})

export default StudentPromotionScreen 