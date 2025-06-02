"use client"

import type React from "react"

import { useState, useRef } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated, KeyboardAvoidingView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRoute, useNavigation, type RouteProp } from "@react-navigation/native"
// @ts-ignore
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/Header"
import type { RootStackParamList } from "../navigation/AppNavigator"
import Colors from "../constants/Colors"

type MilitaryTrainerDetailScreenRouteProp = RouteProp<RootStackParamList, "MilitaryTrainerDetail">

interface SectionProps {
  title: string
  children: React.ReactNode
  initiallyExpanded?: boolean
}

const Section: React.FC<SectionProps> = ({ title, children, initiallyExpanded = false }) => {
  const [expanded, setExpanded] = useState(initiallyExpanded)
  const animationHeight = useRef(new Animated.Value(initiallyExpanded ? 1 : 0)).current

  const toggleExpanded = () => {
    setExpanded(!expanded)
    Animated.timing(animationHeight, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  const bodyHeight = animationHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1000],
  })

  return (
    <View style={styles.section}>
      <TouchableOpacity style={styles.sectionHeader} onPress={toggleExpanded} activeOpacity={0.7}>
        <Ionicons name={expanded ? "chevron-down" : "chevron-forward"} size={20} color="white" />
        <Text style={styles.sectionTitle}>{title}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.sectionContent}>
          {children}
        </View>
      )}
    </View>
  )
}

const MilitaryTrainerDetailScreen = () => {
  const route = useRoute<MilitaryTrainerDetailScreenRouteProp>()
  const navigation = useNavigation()
  const { trainerId } = route.params

  // Mock data for the military trainer
  const trainerData = {
    id: "1",
    name: "محمد وائل",
    nationality: "جزائري",
    militaryId: "175863",
    birthDate: "17/08/2002",
    height: "177 صم",
    weight: "77 كغ",
    specialization: "سرايا العروض العسكرية",
    image: require("../assets/images/trainer.png"),
    courses: [
      {
        name: "دفاع عن النفس",
        date: "2025_4_12",
        cases: "1",
        result: "80.7",
        rating: "5",
      },
      {
        name: "دوريات أمنية",
        date: "2025_6_07",
        cases: "5",
        result: "98.3",
        rating: "10",
      },
      {
        name: "دورة مشاة",
        date: "2025_08_17",
        cases: "--",
        result: "--",
        rating: "--",
      },
      {
        name: "أمن المنشأة",
        date: "2025_9_10",
        cases: "--",
        result: "--",
        rating: "--",
      },
    ],
    tests: [
      {
        name: "تحديد مستوى اشتباك والدفاع عن النفس",
        running: "13.22",
        pressure: "50",
        stomach: "48",
        result: "88.4",
        rating: "جيد جدا",
      },
      {
        name: "اختبار نهائي لدورة الاشتباك والدفاع عن النفس",
        running: "13.22",
        pressure: "57",
        stomach: "52",
        result: "90.4",
        rating: "ممتاز",
      },
      {
        name: "3تحديد مستوى دورة إعداد عارضين",
        running: "17.22",
        pressure: "33",
        stomach: "44",
        result: "88.4",
        rating: "راسب",
      },
      {
        name: "4-نهاية دورة إعداد عارضين",
        running: "15.52",
        pressure: "38",
        stomach: "48",
        result: "76.8",
        rating: "جيد",
      },
      {
        name: "5-تحديد مستوى دورة فض الشغب",
        running: "13.22",
        pressure: "50",
        stomach: "48",
        result: "88.4",
        rating: "جيد جدا",
      },
      {
        name: "6-اختبار نهائي دورة فض الشغب",
        running: "12.02",
        pressure: "59",
        stomach: "66",
        result: "100",
        rating: "ممتاز",
      },
    ],
    weights: [
      {
        month: "1-شهر يناير",
        weight: "80.5",
        excess: "+(10)",
        bmi: "26.7",
        note: "سمنة",
      },
      {
        month: "2-شهر فبراير",
        weight: "75.8",
        excess: "+(5)",
        bmi: "25.7",
        note: "وزن زائد",
      },
      {
        month: "3-شهر مارس",
        weight: "73.5",
        excess: "+(2)",
        bmi: "25.2",
        note: "وزن زائد",
      },
      {
        month: "4-شهر ابريل",
        weight: "70.5",
        excess: "+(0)",
        bmi: "24.7",
        note: "عضلي",
      },
      {
        month: "5-شهر مايو",
        weight: "68.3",
        excess: "-(3)",
        bmi: "22.1",
        note: "عادي",
      },
      {
        month: "6-شهر يونيو",
        weight: "60.8",
        excess: "-(10)",
        bmi: "17.7",
        note: "نحيف",
      },
    ],
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <Header title="بطاقة تعريف الشرطي" showBackButton />

        <ScrollView style={styles.scrollView}>
          <Animated.View style={styles.profileCard}>
            <View style={styles.imageContainer}>
              <Image source={trainerData.image} style={styles.trainerImage} />
              <Text style={styles.specialization} numberOfLines={2}>{trainerData.specialization}</Text>
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.infoRow}>
                <View style={[styles.infoContent, { flex: 1 }]}>
                  <Text style={styles.infoValue}>{trainerData.name}</Text>
                  <Text style={styles.infoLabel}>الإسم:</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={[styles.infoContent, { flex: 1 }]}>
                  <Text style={styles.infoValue}>{trainerData.nationality}</Text>
                  <Text style={styles.infoLabel}>الجنسية:</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={[styles.infoContent, { flex: 1 }]}>
                  <Text style={styles.infoValue}>{trainerData.militaryId}</Text>
                  <Text style={styles.infoLabel}>الرقم العسكري:</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={[styles.infoContent, { flex: 1 }]}>
                  <Text style={styles.infoValue}>{trainerData.birthDate}</Text>
                  <Text style={styles.infoLabel}>تاريخ الميلاد:</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={[styles.infoContent, { marginRight: 20 }]}>
                  <Text style={styles.infoValue}>{trainerData.weight}</Text>
                  <Text style={styles.infoLabel}>الوزن:</Text>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoValue}>{trainerData.height}</Text>
                  <Text style={styles.infoLabel}>الطول:</Text>
                </View>
              </View>
            </View>
          </Animated.View>

          <Section title="الدورات" initiallyExpanded={true}>
            <View style={{ padding: 16 }}>
              <View style={{ flexDirection: 'row' }}>
                {/* Scrollable Columns */}
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                  <View>
                    {/* Header */}
                    <View style={{ 
                      flexDirection: 'row', 
                      borderTopLeftRadius: 8, 
                      borderBottomLeftRadius: 8,
                      paddingVertical: 8
                    }}>
                      <Text style={[styles.headerCell, { width: 60, textAlign: 'center' }]}>الرتبة</Text>
                      <Text style={[styles.headerCell, { width: 60, textAlign: 'center' }]}>النتيجة</Text>
                      <Text style={[styles.headerCell, { width: 60, textAlign: 'center' }]}>الحالات</Text>
                      <Text style={[styles.headerCell, { width: 100, textAlign: 'center' }]}>تاريخ الدورة</Text>
                    </View>
                    {/* Rows */}
                    {trainerData.courses.map((course, idx) => (
                      <View key={idx} style={{ 
                        flexDirection: 'row', 
                        backgroundColor: idx % 2 === 0 ? '#f7f7f7' : 'white',
                        paddingVertical: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee'
                      }}>
                        <Text style={[styles.cell, { width: 60, color: Colors.text, textAlign: 'center' }]}>{course.rating}</Text>
                        <Text style={[styles.cell, { width: 60, color: Colors.text, textAlign: 'center' }]}>{course.result}</Text>
                        <Text style={[styles.cell, { width: 60, color: Colors.text, textAlign: 'center' }]}>{course.cases}</Text>
                        <Text style={[styles.cell, { width: 100, color: Colors.text, textAlign: 'center' }]}>{course.date}</Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>

                {/* Fixed Column */}
                <View style={{ 
                  width: 120, 
                  borderTopRightRadius: 8, 
                  borderBottomRightRadius: 8,
                  zIndex: 1
                }}>
                  <View style={{ paddingVertical: 8 }}>
                    <Text style={[styles.headerCell, { color: Colors.primary, textAlign: 'right' }]}>اسم الدورة</Text>
                  </View>
                  {trainerData.courses.map((course, idx) => (
                    <View key={idx} style={{ 
                      backgroundColor: idx % 2 === 0 ? '#f7f7f7' : 'white',
                      paddingVertical: 8,
                      borderBottomWidth: 1,
                      borderBottomColor: '#eee'
                    }}>
                      <Text style={[styles.cell, { color: Colors.text, textAlign: 'right' ,paddingRight:10}]}>
                        {course.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </Section>

          <Section title="الإختبارات">
            <View style={{ padding: 16 }}>
              <View style={{ flexDirection: 'row' }}>
                {/* Scrollable Columns */}
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                  <View>
                    {/* Header */}
                    <View style={{ 
                      flexDirection: 'row', 
                      borderTopLeftRadius: 8, 
                      borderBottomLeftRadius: 8,
                      paddingVertical: 8
                    }}>
                      <Text style={[styles.headerCell, { width: 60, textAlign: 'center' }]}>الرتبة</Text>
                      <Text style={[styles.headerCell, { width: 60, textAlign: 'center' }]}>النتيجة</Text>
                      <Text style={[styles.headerCell, { width: 60, textAlign: 'center' }]}>البطن</Text>
                      <Text style={[styles.headerCell, { width: 60, textAlign: 'center' }]}>الضغط</Text>
                      <Text style={[styles.headerCell, { width: 80, textAlign: 'center' }]}>الجري</Text>
                    </View>
                    {/* Rows */}
                    {trainerData.tests.map((test, idx) => (
                      <View key={idx} style={{ 
                        flexDirection: 'row', 
                        backgroundColor: idx % 2 === 0 ? '#f7f7f7' : 'white',
                        paddingVertical: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee',
                        height: 42,
                        alignItems: 'center'
                      }}>
                        <View style={[styles.cellContainer, { width: 60 }]}>
                          <Text style={[styles.cell, { color: Colors.text, textAlign: 'center' }]}>{test.rating}</Text>
                        </View>
                        <View style={[styles.cellContainer, { width: 60 }]}>
                          <Text style={[styles.cell, { color: Colors.text, textAlign: 'center' }]}>{test.result}</Text>
                        </View>
                        <View style={[styles.cellContainer, { width: 60 }]}>
                          <Text style={[styles.cell, { color: Colors.text, textAlign: 'center' }]}>{test.stomach}</Text>
                        </View>
                        <View style={[styles.cellContainer, { width: 60 }]}>
                          <Text style={[styles.cell, { color: Colors.text, textAlign: 'center' }]}>{test.pressure}</Text>
                        </View>
                        <View style={[styles.cellContainer, { width: 80 }]}>
                          <Text style={[styles.cell, { color: Colors.text, textAlign: 'center' }]}>{test.running}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>

                {/* Fixed Column */}
                <View style={{ 
                  width: 150, 
                  borderTopRightRadius: 8, 
                  borderBottomRightRadius: 8,
                  zIndex: 1
                }}>
                  <View style={{ paddingVertical: 8 }}>
                    <Text style={[styles.headerCell, { color: Colors.primary, textAlign: 'right' }]}>اسم الإختبار</Text>
                  </View>
                  {trainerData.tests.map((test, idx) => (
                    <View key={idx} style={{ 
                      backgroundColor: idx % 2 === 0 ? '#f7f7f7' : 'white',
                      paddingVertical: 0,
                      borderBottomWidth: 1,
                      borderBottomColor: '#eee',
                      height: 42,
                      alignItems: 'center'
                    }}>
                      <View style={[styles.cellContainer, { flex: 1 }]}>
                        <Text style={[styles.cell, { color: Colors.text, textAlign: 'right', paddingHorizontal: 10 }]}>
                          {test.name}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </Section>

          <Section title="الوزن الشهري">
            <View style={{ padding: 16 }}>
              <View style={{ flexDirection: 'row' }}>
                {/* Scrollable Columns */}
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                  <View>
                    {/* Header */}
                    <View style={{ 
                      flexDirection: 'row', 
                      borderTopLeftRadius: 8, 
                      borderBottomLeftRadius: 8,
                      paddingVertical: 8,
                      height: 50,
                      alignItems: 'center'
                    }}>
                      <View style={[styles.cellContainer, { width: 60 }]}>
                        <Text style={[styles.headerCell, { textAlign: 'center' }]}>الملاحظة</Text>
                      </View>
                      <View style={[styles.cellContainer, { width:60 },{ height:60 }]}>
                        <Text style={[styles.headerCell, { textAlign: 'center' }]}>مؤشر كتلة الجسم</Text>
                      </View>
                      <View style={[styles.cellContainer, { width: 80 }]}>
                        <Text style={[styles.headerCell, { textAlign: 'center' }]}>الوزن الزائد</Text>
                      </View>
                      <View style={[styles.cellContainer, { width: 60 }]}>
                        <Text style={[styles.headerCell, { textAlign: 'center' }]}>الوزن</Text>
                      </View>
                    </View>
                    {/* Rows */}
                    {trainerData.weights.map((weight, idx) => (
                      <View key={idx} style={{ 
                        flexDirection: 'row', 
                        backgroundColor: idx % 2 === 0 ? '#f7f7f7' : 'white',
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee',
                        height: 42,
                        alignItems: 'center'
                      }}>
                        <View style={[styles.cellContainer, { width: 60 }]}>
                          <Text style={[styles.cell, { color: Colors.text, textAlign: 'center' }]}>{weight.note}</Text>
                        </View>
                        <View style={[styles.cellContainer, { width: 60 }]}>
                          <Text style={[styles.cell, { color: Colors.text, textAlign: 'center' }]}>{weight.bmi}</Text>
                        </View>
                        <View style={[styles.cellContainer, { width: 80 }]}>
                          <Text style={[styles.cell, { color: Colors.text, textAlign: 'center' }]}>{weight.excess}</Text>
                        </View>
                        <View style={[styles.cellContainer, { width: 60 }]}>
                          <Text style={[styles.cell, { color: Colors.text, textAlign: 'center' }]}>{weight.weight}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>

                {/* Fixed Column */}
                <View style={{ 
                  width: 100, 
                  borderTopRightRadius: 8, 
                  borderBottomRightRadius: 8,
                  zIndex: 1
                }}>
                  <View style={{ 
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Text style={[styles.headerCell, { color: Colors.primary, textAlign: 'right', marginLeft:70 }]}>الشهر</Text>
                  </View>
                  {trainerData.weights.map((weight, idx) => (
                    <View key={idx} style={{ 
                      backgroundColor: idx % 2 === 0 ? '#f7f7f7' : 'white',
                      borderBottomWidth: 1,
                      borderBottomColor: '#eee',
                      height: 42,
                      alignItems: 'center'
                    }}>
                      <View style={[styles.cellContainer, { flex: 1, marginLeft:30 }]}>
                        <Text style={[styles.cell, { color: Colors.text, textAlign: 'right', paddingHorizontal:2 }]}>
                          {weight.month}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </Section>
        </ScrollView>

        <View style={styles.qatarFlagContainer}>
         
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    flexDirection: "row",
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 8,
    marginHorizontal: 30,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  profileInfo: {
    flex: 2,
    paddingRight: 5,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  infoLabel: {
    fontFamily: "Cairo-Bold",
    fontSize: 12,
    color: Colors.text,
    marginLeft: 5,
  },
  infoValue: {
    fontFamily: "Cairo-Regular",
    fontSize: 13,
    color: Colors.textSecondary,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 8,
  },
  trainerImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#eee",
  },
  specialization: {
    fontFamily: "Cairo-Bold",
    fontSize: 14,
    marginTop: 5,
    color: Colors.text,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 20,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: "Cairo-Bold",
    fontSize: 16,
    color: "white",
    flex: 1,
    textAlign: "right",
  },
  sectionContent: {
    padding: 16,
  },
  headerCell: {
    fontFamily: "Cairo-Bold",
    fontSize: 14,
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  cell: {
    fontFamily: "Cairo-Regular",
    fontSize: 12,
  },
  cellContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingVertical: 5
  },

})

export default MilitaryTrainerDetailScreen
