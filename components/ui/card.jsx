// components/ui/card.jsx
import { View, Platform, StyleSheet } from 'react-native';

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function CardContent({ children, style }) {
  return <View style={style}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
    ...(Platform.OS === 'web' && {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    }),
  },
});
