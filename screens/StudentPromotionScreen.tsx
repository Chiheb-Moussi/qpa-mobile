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
  const [isLoading, setIsLoading] = useState(true)
  const [promotions, setPromotions] = useState<any[]>([])
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
    fetchPromotions()
  }, [])
  


  const navigateToStudentList = (promotionId: string, promotionName: string) => {
    navigation.navigate("StudentDiplomaList", { promotionId, promotionName })
  }

  const fetchPromotions = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('https://qatar-police-academy.starlightwebsolutions.com/api/promotion-academic-years')
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error Response:', errorText)
        throw new Error(`Failed to fetch promotions: ${response.status} ${response.statusText}`)
      }

      const contentType = response.headers.get('content-type')
      

      const data = await response.json()
      const sortedPromotions = data.sort((a: any, b: any) => a.id - b.id)
      console.log(sortedPromotions)
      setPromotions(sortedPromotions)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load promotions'
      setError(errorMessage)
      console.error('Error fetching promotions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="الدفعات" showBackButton />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="الدفعات" showBackButton />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    )
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
                  onPress={() => navigateToStudentList(promotion.id, promotion.promotion_name)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.promotionText}>{promotion.promotion_name}</Text>
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