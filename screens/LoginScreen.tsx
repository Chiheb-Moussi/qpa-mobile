"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Animated,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../contexts/AuthContext"
import { StatusBar } from "expo-status-bar"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("خطأ", "الرجاء إدخال البريد الإلكتروني وكلمة المرور")
      return
    }

    setIsLoading(true)
    try {
      const success = await login(email, password)
      if (!success) {
        Alert.alert("خطأ في تسجيل الدخول", "البريد الإلكتروني أو كلمة المرور غير صحيحة")
      }
    } catch (error) {
      Alert.alert("خطأ", "حدث خطأ أثناء تسجيل الدخول")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View style={styles.logoContainer}>
            <Text style={styles.welcomeText}>مرحبا بكم</Text>
            <Text style={styles.inText}>في</Text>
            <Animated.Image
              source={require("../assets/images/police-academy-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.academyText}>أكاديمية الشرطة</Text>
          </Animated.View>

          <Animated.View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={22} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="أدخل اسم المستخدم الخاص بك"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={22} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="أدخل كلمة المرور الخاصة بك"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>هل نسيت كلمة المرور الخاصة بك؟</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
             <Text style={styles.loginButtonText}>{isLoading ? "جاري تسجيل الدخول..." : "تسجيل"}</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <TouchableOpacity>
                <Text style={styles.registerText}>اشترك</Text>
              </TouchableOpacity>
              <Text style={styles.needAccountText}>هل تحتاج إلى إنشاء حساب؟</Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: "Cairo-Bold",
    fontWeight: "bold", // Fallback
    marginBottom: 0,
    textAlign: "center",
  },
  inText: {
    fontSize: 18,
    fontFamily: "Cairo-Regular",
    marginBottom: 15,
    color: "#666",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  academyText: {
    fontSize: 22,
    fontFamily: "Cairo-SemiBold",
    color: "#333",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 55,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: "Cairo-Regular",
    textAlign: "right",
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#666",
    fontFamily: "Cairo-Regular",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#2A4B7C",
    borderRadius: 12,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonDisabled: {
    backgroundColor: "#90CAF9",
  },
  loginButtonText: {
    color: "white",
    fontFamily: "Cairo-Bold",
    fontWeight: "bold", // Fallback
    fontSize: 18,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  needAccountText: {
    fontFamily: "Cairo-Regular",
    color: "#666",
    marginRight: 5,
    fontSize: 14,
  },
  registerText: {
    color: "#2196F3",
    fontFamily: "Cairo-SemiBold",
    fontSize: 14,
  },
})

export default LoginScreen
