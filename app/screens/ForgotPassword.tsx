import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { resetPassword } from "../firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email);
      setResetSent(true);
    } catch (error: any) {
      console.error("Password reset error:", error);
      Alert.alert(
        "Reset Failed",
        error.message || "An error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignIn = () => {
    router.push("/signin");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-8">
          <Text className="text-2xl font-bold text-blue-600 mb-2">
            Reset Password
          </Text>
          <Text className="text-gray-600 text-center">
            Enter your email to receive a password reset link
          </Text>
        </View>

        {resetSent ? (
          <View className="items-center">
            <Text className="text-green-600 text-center mb-4">
              Password reset email sent! Check your inbox for further
              instructions.
            </Text>
            <TouchableOpacity
              onPress={navigateToSignIn}
              className="bg-blue-600 rounded-lg py-3 px-4 items-center w-full"
            >
              <Text className="text-white font-semibold text-lg">
                Back to Sign In
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View className="mb-6">
              <Text className="text-gray-700 mb-2 font-medium">Email</Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <TouchableOpacity
              onPress={handleResetPassword}
              disabled={loading}
              className={`rounded-lg py-3 px-4 items-center ${loading ? "bg-blue-400" : "bg-blue-600"}`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold text-lg">
                  Reset Password
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={navigateToSignIn}
              className="mt-6 items-center"
            >
              <Text className="text-blue-600 font-semibold">
                Back to Sign In
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
