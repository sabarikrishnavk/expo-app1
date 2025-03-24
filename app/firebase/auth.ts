import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  User as FirebaseUser,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { User } from "../types/expense";

// Sign up with email and password
export const signUp = async (
  email: string,
  password: string,
  displayName: string,
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Update profile with display name
    await updateProfile(user, { displayName });

    // Create user document in Firestore
    const userData: User = {
      uid: user.uid,
      email: user.email || email,
      displayName: displayName,
      photoURL: user.photoURL || "",
      createdAt: Date.now(),
      settings: {
        currency: "USD",
        monthlyBudget: 2000,
        categoryBudgets: {
          Grocery: 400,
          Salary: 0,
          Entertainment: 200,
          Transportation: 300,
          "Food & Dining": 500,
          Shopping: 300,
          Bills: 300,
          Income: 0,
          Other: 0,
        },
        notificationsEnabled: true,
      },
    };

    await setDoc(doc(db, "users", user.uid), userData);

    return userData;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Sign in with email and password
export const signIn = async (
  email: string,
  password: string,
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return userDoc.data() as User;
    } else {
      // If user document doesn't exist (rare case), create it
      const userData: User = {
        uid: user.uid,
        email: user.email || email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        createdAt: Date.now(),
      };

      await setDoc(doc(db, "users", user.uid), userData);
      return userData;
    }
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};

// Get user data from Firestore
export const getUserData = async (uid: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data() as User;
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};
