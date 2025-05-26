// components/ui/button.jsx
import { Pressable, Text, StyleSheet } from 'react-native';

export function Button({ title, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
});
