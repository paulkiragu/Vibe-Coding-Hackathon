// components/ui/label.jsx
import { Text, StyleSheet } from 'react-native';

export function Label({ children, style }) {
  return <Text style={[styles.label, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
});
