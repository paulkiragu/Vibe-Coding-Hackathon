// components/ui/input.jsx
import { TextInput, Platform } from 'react-native';

export function Input({ style, ...props }) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#999"
      style={[
        {
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          fontSize: 16,
          backgroundColor: '#fff',
        },
        Platform.select({
          web: {
            outlineStyle: 'none',
            appearance: 'none',
          },
        }),
        style,
      ]}
    />
  );
}
