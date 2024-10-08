import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from './firebase';

const db = getFirestore();

export const saveTasksToCloud = async (userId, tasks) => {
  try {
    await setDoc(doc(db, "users", userId), { tasks });
    console.log("Tasks saved to Firestore");
  } catch (error) {
    console.error("Error saving tasks to Firestore:", error);
  }
};

export const loadTasksFromCloud = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Tasks loaded from Firestore");
      return docSnap.data().tasks;
    } else {
      console.log("No tasks found, returning empty array");
      return [];
    }
  } catch (error) {
    console.error("Error loading tasks from Firestore:", error);
    return [];
  }
};
