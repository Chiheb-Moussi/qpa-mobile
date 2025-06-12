"use client"

import React, { useEffect, useRef, useState } from "react"
import { View, Text, StyleSheet, Image, ScrollView, Dimensions ,Animated,KeyboardAvoidingView,Platform, TouchableOpacity, Modal} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"
import Header from "@/components/Header"
import Colors from "@/constants/Colors"
import type { RootStackParamList } from "../navigation/AppNavigator"
import { Ionicons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")
const CARD_WIDTH = width - 32

interface Test {
  name: string
  running: string
  pressure: string
  stomach: string
  result: string
  rating: string
}

interface Weight {
  month: string
  weight: string
  excess: string
  bmi: string
  note: string
}

interface AcademicResult {
  military_number: string | number
  result: string | number
  rating: string
  category?: string
  rank?: string
  name_period: string
  period: string
  subject_material: string
}

interface Student {
  id: string
  military_number: string
  name: string
  promotion: string
  fraction: string
  birth_date: string
  age: number
  height: number
  ideal_weight: number
  nationality: string
  session: string
  tests: Test[]
}

interface Violation {
  military_number: string;
  violation: string;
  repetition: string;
  date_of_violation: string;
  violation_entry_name: string;
  promotion: string;
  period: string;
}

type StudentDetailScreenRouteProp = RouteProp<RootStackParamList, "StudentDetail">

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
  
  const StudentDetailScreen = () => {
    const route = useRoute<StudentDetailScreenRouteProp>()
    const navigation = useNavigation()
    const coursesScrollRef = useRef<ScrollView>(null)
    const testsScrollRef = useRef<ScrollView>(null)
    const weightsScrollRef = useRef<ScrollView>(null)
    const [isViolationsModalVisible, setIsViolationsModalVisible] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        coursesScrollRef.current?.scrollTo({ x: 360, animated: false })
        testsScrollRef.current?.scrollTo({ x: 1200, animated: false })
        weightsScrollRef.current?.scrollTo({ x: 260, animated: false })
      }, 100)
    }, [])

    const { student } = route.params
    const mockTests: Test[] = [
      {
        name: "تحديد مستوى فصل 1",
        running: "13.22",
        pressure: "50",
        stomach: "48",
        result: "88.4",
        rating: "جيد جدا",
      },
      {
        name: "نهاية الفترة التأسيسية",
        running: "13.22",
        pressure: "57",
        stomach: "52",
        result: "90.4",
        rating: "ممتاز",
      },
    ]
    const mockWeights: Weight[] = [
        {
          month: "1 شهر ",
          weight: "80.5",
          excess: "+(10)",
          bmi: "26.7",
          note: "سمنة",
        },
        {
          month: "2 شهر",
          weight: "75.8",
          excess: "+(5)",
          bmi: "25.7",
          note: "وزن زائد",
        },
        {
          month: "3 شهر ",
          weight: "73.5",
          excess: "+(2)",
          bmi: "25.2",
          note: "وزن زائد",
        },
        {
          month: "4 شهر ",
          weight: "70.5",
          excess: "+(0)",
          bmi: "24.7",
          note: "عضلي",
        },
        {
          month: "5 شهر ",
          weight: "68.3",
          excess: "-(3)",
          bmi: "22.1",
          note: "عادي",
        },
        {
          month: "شهر 6",
          weight: "60.8",
          excess: "-(10)",
          bmi: "17.7",
          note: "نحيف",
        },
      ]

    const mockAcademicResults: AcademicResult[] = [
      {
        military_number: "105776",
        result: "95.00",
        rating: "ممتاز",
        category: "أ",
        name_period: "نتيجة المقرارات الأكاديمية",
        period: "الفترة التأسيسية",
        subject_material: "التاريخ القطري"
      },
      {
        military_number: "105776",
        result: "85.00",
        rating: "جيد جدا",
        category: "ب",
        name_period: "نتيجة المقرارات الأكاديمية",
        period: "الفترة التأسيسية",
        subject_material: "اللغة العربية"
      },
      {
        military_number: "105776",
        result: "77.00",
        rating: "جيد مرتفع",
        category: "ج مرتفع",
        name_period: "نتيجة المقرارات الأكاديمية",
        period: "الفترة التأسيسية",
        subject_material: "الحاسب الآلي و النظم الأمنية"
      },
      {
        military_number: "105776",
        result: "62.00",
        rating: "مقبول",
        category: "د",
        name_period: "نتيجة المقرارات الأكاديمية",
        period: "الفترة التأسيسية",
        subject_material: "المدخل لدراسة القانون"
      }
    ]

    const mockTrainingResults: AcademicResult[] = [
      {
        military_number: "105776",
        result: "85.00",
        rating: "ممتاز",
        category: "-",
        name_period: "نتيجة البرامج التدريبية",
        period: "الفترة التأسيسية",
        subject_material: "اللياقة البدنية"
      },
      {
        military_number: "105776",
        result: "77.00",
        rating: "ممتاز",
        category: "-",
        name_period: "نتيجة البرامج التدريبية",
        period: "الفترة التأسيسية",
        subject_material: "الحماية المدنية"
      },
      {
        military_number: "105776",
        result: "88.00",
        rating: "ممتاز",
        category: "-",
        name_period: "نتيجة البرامج التدريبية",
        period: "الفترة التأسيسية",
        subject_material: "المشاة التأسيسية"
      },
      {
        military_number: "105776",
        result: "92.00",
        rating: "ممتاز",
        category: "-",
        name_period: "نتيجة البرامج التدريبية",
        period: "الفترة التأسيسية",
        subject_material: "مسدس جلوك"
      }
    ]

    const mockViolations: Violation[] = [
      {
        military_number: "105776",
        violation: "الإهمال في النظافة وترتيب الثكنة أو الملابس",
        repetition: "2",
        date_of_violation: "",
        violation_entry_name: "",
        promotion: "الدفعة الأولى",
        period: "الفصل الأول"
      },
      {
        military_number: "105776",
        violation: "عدم المبالاة",
        repetition: "2",
        date_of_violation: "",
        violation_entry_name: "",
        promotion: "الدفعة الأولى",
        period: "الفصل الأول"
      },
      {
        military_number: "105776",
        violation: "عدم الإعتناء بالمظهر أو الهندام",
        repetition: "1",
        date_of_violation: "",
        violation_entry_name: "",
        promotion: "الدفعة الأولى",
        period: "الفصل الأول"
      },
      {
        military_number: "105786",
        violation: "التكاسل أثناء المحاضرات أو أوقات المذاكرة",
        repetition: "3",
        date_of_violation: "",
        violation_entry_name: "",
        promotion: "الدفعة الأولى",
        period: "الفصل الأول"
      },
      {
        military_number: "105786",
        violation: "عدم الإعتناء بالمظهر أو الهندام",
        repetition: "2",
        date_of_violation: "",
        violation_entry_name: "",
        promotion: "الدفعة الأولى",
        period: "الفصل الأول"
      }
    ];

    return (
      <SafeAreaView style={styles.container}>
         <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
      <Header title="بطاقة تعريف الطالب" showBackButton />
      <ScrollView 
        style={styles.scrollView}
      >
         <Animated.View style={styles.profileCard}>
      
              <View style={styles.imageContainer} >
                <Image
                  source={require("@/assets/images/trainer.png")}
                  style={styles.studentImage}
                />
                <Text style={styles.sessionText}>{student.session}</Text>
              </View>
            <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                <View style={[styles.infoContent, { flex: 1 }]}>
                  <Text style={styles.value}>{student.name}</Text>
                  <Text style={styles.label}>الاسم:</Text>
                </View>
                </View>
                <View style={styles.infoRow}>
                <View style={[styles.infoContent, { flex: 1 }]}>
                  <Text style={styles.value}>{student.nationality}</Text>
                  <Text style={styles.label}>الجنسية:</Text>
                </View>
                </View>
                <View style={styles.infoRow}>
                <View style={[styles.infoContent, { flex: 1 }]}>
                  <Text style={styles.value}>{student.promotion}</Text>
                  <Text style={styles.label}>الدفعة:</Text>
                </View>
                </View>
                <View style={styles.infoRow}>
                <View style={[styles.infoContent, { flex: 1 }]}>
                  <Text style={styles.value}>{student.fraction}</Text>
                  <Text style={styles.label}>الفصيل:</Text>
                </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={[styles.infoContent,{ marginLeft: 5 }]}>
                        <Text style={styles.value}>{student.age} </Text>
                        <Text style={styles.label}>العمر:</Text>
                    </View>
                    
                    <View style={[styles.infoContent, { flex: 1 }]}>
                        <Text style={styles.value}>{student.birth_date}</Text>
                        <Text style={styles.label}>تاريخ الميلاد:</Text>
                    </View>
                </View>
               
               
                <View style={styles.infoRow}>
                 
                    <View style={[styles.infoContent, { flex: 1 }]}>
                        <Text style={styles.value}>{student.ideal_weight} كغ</Text>
                        <Text style={styles.label}>الوزن المثالي:</Text>
                    </View>
                
                    <View style={[styles.infoContent, { flex: 1 },{ width: 40  }]}>
                        <Text style={styles.value}>{student.height} صم</Text>
                        <Text style={styles.label}>الطول:</Text>
                    </View>
                </View>
            </View>
        </Animated.View>
        
        <Section title="الإختبارات">
            <View style={{ padding: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <ScrollView 
                  ref={testsScrollRef}
                  horizontal 
                  showsHorizontalScrollIndicator={true}
                  contentContainerStyle={{ flexDirection: 'row-reverse' }}
                >
                  <View>
                    <View style={{ 
                      flexDirection: 'row', 
                      borderTopLeftRadius: 8, 
                      borderBottomLeftRadius: 8,
                      paddingVertical: 8
                    }}>
                      <Text style={[styles.headerCell, { width: 60, textAlign: 'center' }]}>التقدير</Text>
                      <Text style={[styles.headerCell, { width: 60, textAlign: 'center' }]}>النتيجة</Text>
                      <Text style={[styles.headerCell, { width: 60, textAlign: 'center' }]}>البطن</Text>
                      <Text style={[styles.headerCell, { width: 60, textAlign: 'center' }]}>الضغط</Text>
                      <Text style={[styles.headerCell, { width: 80, textAlign: 'center' }]}>الجري</Text>
                    </View>
                    {mockTests.map((test: Test, idx: number) => (
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

                <View style={{ 
                  width: 150, 
                  borderTopRightRadius: 8, 
                  borderBottomRightRadius: 8,
                  zIndex: 1
                }}>
                  <View style={{ paddingVertical: 8 }}>
                    <Text style={[styles.headerCell, { color: Colors.primary, textAlign: 'right' }]}>اسم الإختبار</Text>
                  </View>
                  {mockTests.map((test: Test, idx: number) => (
                    <View key={idx} style={{ 
                      backgroundColor: idx % 2 === 0 ? '#f7f7f7' : 'white',
                      paddingVertical: 0,
                      borderBottomWidth: 1,
                      borderBottomColor: '#eee',
                      height: 42,
                      alignItems: 'center'
                    }}>
                      <View style={[styles.cellContainer, { flex: 1 , marginLeft:30 }]}>
                        <Text style={[styles.cell, { color: Colors.text, textAlign: 'right', paddingHorizontal: 2 }]}>
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
            <View style={{ padding: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                {/* Scrollable Columns for الوزن الشهري */}
                <ScrollView 
                  ref={weightsScrollRef}
                  horizontal 
                  showsHorizontalScrollIndicator={true}
                  contentContainerStyle={{ flexDirection: 'row-reverse' }}
                >
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
                        <Text style={[styles.headerCell, { textAlign: 'center' }]}>مؤشر الكتلة </Text>
                      </View>
                      <View style={[styles.cellContainer, { width: 80 }]}>
                        <Text style={[styles.headerCell, { textAlign: 'center' }]}>الوزن الزائد</Text>
                      </View>
                      <View style={[styles.cellContainer, { width: 60 }]}>
                        <Text style={[styles.headerCell, { textAlign: 'center' }]}>الوزن</Text>
                      </View>
                    </View>
                    {/* Rows */}
                    {mockWeights.map((weight, idx) => (
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
                  width: '100%', // S'assurer que le View prend toute la largeur
                  alignItems: 'flex-end', // Aligner les enfants à droite horizontalement
                  justifyContent: 'center', // Centrer verticalement
                  paddingRight: 10 // Un petit espace à droite
                }}>
                  <Text style={[styles.headerCell, { color: Colors.primary, textAlign: 'right' }]}>
                    الشهر
                  </Text>
                </View>
                  {mockWeights.map((weight, idx) => (
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
          <Section title="الفترة التأسيسية">
            <View style={{ padding: 1 }}>
              {/* Academic Results */}
              <View style={styles.subSection}>
                <Text style={styles.subSectionTitle}>نتيجة المقرارات الأكاديمية</Text>
                <View style={{ flexDirection: 'row' }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    contentContainerStyle={{ flexDirection: 'row-reverse' }}
                  >
                    <View>
                      {/* Headers Row */}
                      <View style={{ 
                        flexDirection: 'row', 
                        borderTopLeftRadius: 8, 
                        borderBottomLeftRadius: 8,
                        paddingVertical: 8,
                        height: 50,
                        alignItems: 'center',
                        backgroundColor: '#fff'
                      }}>
                       <View style={[styles.cellContainer, { width: 60 }]}>
                          <Text style={[styles.headerCell, { color: Colors.primary, textDecorationLine: 'underline' }]}>الفئة</Text>
                        </View>
                        <View style={[styles.cellContainer, { width: 60 }]}>
                          <Text style={[styles.headerCell, { color: Colors.primary, textDecorationLine: 'underline' }]}>التقدير</Text>
                        </View>
                      <View style={[styles.cellContainer, { width: 60 }]}>
                          <Text style={[styles.headerCell, { color: Colors.primary, textDecorationLine: 'underline' }]}>النتيجة</Text>
                        </View>
                        
                       
                        
                      </View>

                      {/* Data Rows */}
                      {mockAcademicResults.map((result, idx) => (
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
                            <Text style={[styles.cell, { color: Colors.text }]}>{result.category || '-'}</Text>
                          </View>
                             <View style={[styles.cellContainer, { width: 60 }]}>
                            <Text style={[styles.cell, { color: Colors.text }]}>{result.rating}</Text>
                          </View>
                            <View style={[styles.cellContainer, { width: 60 }]}>
                            <Text style={[styles.cell, { color: Colors.text }]}>{result.result}</Text>
                          </View>
                       
                         
                      
                        </View>
                      ))}
                    </View>
                  </ScrollView>

                  {/* Fixed Subject Column */}
                  <View style={{ 
                    width: 150,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    zIndex: 1
                  }}>
                    <View style={{ 
                      paddingVertical: 8,
                      height: 50,
                      justifyContent: 'center',
                      backgroundColor: '#fff'
                    }}>
                      <Text style={[styles.headerCell, { 
                        color: Colors.primary, 
                        textAlign: 'right',
                        paddingRight: 10,
                        textDecorationLine: 'underline'
                      }]}>المادة</Text>
                    </View>
                    {mockAcademicResults.map((result, idx) => (
                      <View key={idx} style={{ 
                        backgroundColor: idx % 2 === 0 ? '#f7f7f7' : 'white',
                        paddingVertical: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee',
                        height: 42,
                        justifyContent: 'center'
                      }}>
                        <Text style={[styles.cell, { 
                          color: Colors.text,
                          textAlign: 'right',
                          paddingRight: 10
                        }]}>{result.subject_material}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {/* Training Results */}
              <View style={[styles.subSection, { marginTop: 20 }]}>
                <Text style={styles.subSectionTitle}>نتيجة البرامج التدريبية</Text>
                <View style={{ flexDirection: 'row' }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    contentContainerStyle={{ flexDirection: 'row-reverse' }}
                  >
                    <View>
                      {/* Headers Row */}
                      <View style={{ 
                        flexDirection: 'row', 
                        borderTopLeftRadius: 8, 
                        borderBottomLeftRadius: 8,
                        paddingVertical: 8,
                        height: 50,
                        alignItems: 'center',
                        backgroundColor: '#fff'
                      }}>
                       <View style={[styles.cellContainer, { width: 60 }]}>
                          <Text style={[styles.headerCell, { color: Colors.primary, textDecorationLine: 'underline' }]}>الفئة</Text>
                        </View>
                          <View style={[styles.cellContainer, { width: 60 }]}>
                          <Text style={[styles.headerCell, { color: Colors.primary, textDecorationLine: 'underline' }]}>التقدير</Text>
                        </View>
                       <View style={[styles.cellContainer, { width: 60 }]}>
                          <Text style={[styles.headerCell, { color: Colors.primary, textDecorationLine: 'underline' }]}>النتيجة</Text>
                        </View>
                      
                       
                       
                      </View>

                      {/* Data Rows */}
                      {mockTrainingResults.map((result, idx) => (
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
                            <Text style={[styles.cell, { color: Colors.text }]}>{result.category}</Text>
                          </View>
                          <View style={[styles.cellContainer, { width: 60 }]}>
                            <Text style={[styles.cell, { color: Colors.text }]}>{result.rating}</Text>
                          </View>
                           <View style={[styles.cellContainer, { width: 60 }]}>
                            <Text style={[styles.cell, { color: Colors.text }]}>{result.result}</Text>
                          </View>
                          
                         
                       
                        </View>
                      ))}
                    </View>
                  </ScrollView>

                  {/* Fixed Subject Column */}
                  <View style={{ 
                    width: 150,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    zIndex: 1
                  }}>
                    <View style={{ 
                      paddingVertical: 8,
                      height: 50,
                      justifyContent: 'center',
                      backgroundColor: '#fff'
                    }}>
                      <Text style={[styles.headerCell, { 
                        color: Colors.primary, 
                        textAlign: 'right',
                        paddingRight: 10,
                        textDecorationLine: 'underline'
                      }]}>المادة</Text>
                    </View>
                    {mockTrainingResults.map((result, idx) => (
                      <View key={idx} style={{ 
                        backgroundColor: idx % 2 === 0 ? '#f7f7f7' : 'white',
                        paddingVertical: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee',
                        height: 42,
                        justifyContent: 'center'
                      }}>
                        <Text style={[styles.cell, { 
                          color: Colors.text,
                          textAlign: 'right',
                          paddingRight: 10
                        }]}>{result.subject_material}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {/* Final Grade */}
              <View >

                   <View style={styles.gradeRow}>
                                <View style={{
    backgroundColor: '#007bff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  }}>
                <Text style={{ color: 'white', fontWeight: 'bold' ,width:40,textAlign:'center'}}>75%</Text></View>
<Text style={styles.gradeLabel}>المعدل</Text></View>
                <View style={styles.gradeRow}>
                <View style={{
    backgroundColor: '#007bff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  }}>
                <Text style={{ color: 'white', fontWeight: 'bold' ,width:40,textAlign:'center'}}>جيد</Text></View>
<Text style={styles.gradeLabel}>التقدير</Text>
                  
                </View>
                <View style={styles.gradeRow}>
                <View style={{
    backgroundColor: '#007bff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  }}>
     <Text style={{ color: 'white', fontWeight: 'bold' ,width:40,textAlign:'center'}}>5</Text>
                </View>
                  <Text style={styles.gradeLabel}>الترتيب العام</Text>
                  
                </View>
              </View>
            </View>
             {/* Violations Button */}
      <View style={styles.violationsButtonContainer}>
        <TouchableOpacity
          style={styles.violationsButton}
          onPress={() => setIsViolationsModalVisible(true)}
        >
          <Text style={styles.violationsButtonText}>المخالفات</Text>
        </TouchableOpacity>
      </View>
          </Section>
      </ScrollView>
      </KeyboardAvoidingView>

     

      {/* Violations Modal */}
      <Modal
        visible={isViolationsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsViolationsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
                 <TouchableOpacity
                onPress={() => setIsViolationsModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>المخالفات</Text>
         
            </View>

            <ScrollView style={styles.violationsList}>
              <View style={{ flexDirection: 'row' }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  contentContainerStyle={{ flexDirection: 'row-reverse' }}
                >
                  <View>
                    <View style={{ 
                      flexDirection: 'row',
                      paddingVertical: 8,
                      height: 50,
                      alignItems: 'center',
                      backgroundColor: '#fff'
                    }}>
                      <View style={[styles.cellContainer, { width: 60 }]}>
                        <Text style={[styles.headerCell, { color: Colors.primary, textDecorationLine: 'underline' }]}>التكرار</Text>
                      </View>
                    </View>
                    {mockViolations.map((violation, index) => (
                      <View key={index} style={{ 
                        flexDirection: 'row',
                        backgroundColor: index % 2 === 0 ? '#f7f7f7' : 'white',
                        paddingVertical: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee',
                        height: 42,
                        alignItems: 'center'
                      }}>
                        <View style={[styles.cellContainer, { width: 60 }]}>
                          <Text style={[styles.cell, { color: Colors.text }]}>{violation.repetition}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>

                <View style={{ 
                  width: 250,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                  zIndex: 1
                }}>
                  <View style={{ 
                    paddingVertical: 8,
                    height: 50,
                    justifyContent: 'center',
                    backgroundColor: '#fff'
                  }}>
                    <Text style={[styles.headerCell, { 
                      color: Colors.primary, 
                      textAlign: 'right',
                      paddingRight: 10,
                      textDecorationLine: 'underline'
                    }]}>إسم المخالفة</Text>
                  </View>
                  {mockViolations.map((violation, index) => (
                    <View key={index} style={{ 
                      backgroundColor: index % 2 === 0 ? '#f7f7f7' : 'white',
                      paddingVertical: 8,
                      borderBottomWidth: 1,
                      borderBottomColor: '#eee',
                      height: 42,
                      justifyContent: 'center'
                    }}>
                      <Text style={[styles.cell, { 
                        color: Colors.text,
                        textAlign: 'right',
                        paddingRight: 10
                      }]}>{violation.violation}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 8,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftSection: {
    marginRight: 16,
    alignItems: "center",
  },
  infoSection: {
    flex: 2,
    paddingRight: 5,
    width: '100%',
  },
  studentImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#eee",
  },
  sessionText: {
    fontFamily: "Cairo-Bold",
    fontSize: 14,
    marginTop: 5,
    color: Colors.text,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  label: {
    fontFamily: "Cairo-Bold",
    fontSize: 12,
    color: Colors.text,
    textAlign: "right",
  },
  value: {
    fontFamily: "Cairo-Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "right",
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
    textAlign: 'center',
  },
  cellContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingVertical: 5
  },
  
  periodContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  subSection: {
    marginBottom: 16,
  },
  subSectionTitle: {
    fontFamily: 'Cairo-Bold',
    fontSize: 16,
    color: '#E91E63',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
    width: '100%',
  
    paddingVertical: 8,
    borderRadius: 4,
  },
  resultsContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  resultValue: {
    fontFamily: 'Cairo-Bold',
    fontSize: 16,
    color: Colors.text,
    minWidth: 50,
    textAlign: 'center',
  },
  resultRating: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    minWidth: 30,
    textAlign: 'center',
  },
  resultGrade: {
    fontFamily: 'Cairo-SemiBold',
    fontSize: 14,
    color: Colors.primary,
    minWidth: 60,
    textAlign: 'center',
  },
  subjectName: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: Colors.text,
    textAlign: 'right',
    flex: 1,
  },
  trainingSection: {
    marginTop: 24,
  },
  
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  gradeLabel: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  gradeValue: {
    fontFamily: 'Cairo-Bold',
    fontSize: 16,
    color: Colors.text,
  },
  headerRow: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 8,
  },
  dataRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  cellText: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: Colors.text,
    textAlign: 'center',
  },
  fixedColumn: {
    width: 150,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    paddingRight: 16,
  },
  subjectHeader: {
    textAlign: 'right',
    width: '100%',
    paddingRight: 8,
  },
  subjectText: {
    textAlign: 'right',
    width: '100%',
    paddingRight: 8,
  },
  violationsButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  violationsButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
  },
  violationsButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '95%',
    maxHeight: '80%',
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: 'white',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  violationsList: {
    padding: 16,
  },
 
})

export default StudentDetailScreen 