import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_PREFIX = '@sigtea_pr:';

export const storage = {
  async setItem(key: string, value: unknown): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, serialized);
    } catch (error) {
      console.error(`Error saving to storage: ${key}`, error);
    }
  },

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(
        `${STORAGE_KEY_PREFIX}${key}`
      );
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from storage: ${key}`, error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(`${STORAGE_KEY_PREFIX}${key}`);
    } catch (error) {
      console.error(`Error removing from storage: ${key}`, error);
    }
  },

  async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const prefixedKeys = keys.filter((key) =>
        key.startsWith(STORAGE_KEY_PREFIX)
      );
      await AsyncStorage.multiRemove(prefixedKeys);
    } catch (error) {
      console.error('Error clearing storage', error);
    }
  },
};
