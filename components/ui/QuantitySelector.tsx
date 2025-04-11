import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import colors from '@/constants/colors';
import { borderRadius, spacing } from '@/constants/theme';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'medium',
}) => {
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };
  
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };
  
  const getContainerSize = () => {
    switch (size) {
      case 'small': return { height: 32 };
      case 'large': return { height: 48 };
      default: return { height: 40 };
    }
  };
  
  const getButtonSize = () => {
    switch (size) {
      case 'small': return { width: 28, height: 28 };
      case 'large': return { width: 44, height: 44 };
      default: return { width: 36, height: 36 };
    }
  };
  
  const getIconSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'large': return 20;
      default: return 16;
    }
  };
  
  const getFontSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'large': return 18;
      default: return 16;
    }
  };
  
  return (
    <View style={[
      styles.container,
      getContainerSize(),
      { 
        backgroundColor: isDarkMode ? theme.card : 'rgba(0, 0, 0, 0.05)',
        borderColor: theme.border
      }
    ]}>
      <TouchableOpacity
        style={[
          styles.button,
          getButtonSize(),
          { opacity: value <= min ? 0.5 : 1 }
        ]}
        onPress={handleDecrement}
        disabled={value <= min}
      >
        <Minus size={getIconSize()} color={theme.text} />
      </TouchableOpacity>
      
      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color: theme.text, fontSize: getFontSize() }]}>
          {value}
        </Text>
      </View>
      
      <TouchableOpacity
        style={[
          styles.button,
          getButtonSize(),
          { opacity: value >= max ? 0.5 : 1 }
        ]}
        onPress={handleIncrement}
        disabled={value >= max}
      >
        <Plus size={getIconSize()} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontWeight: '600',
  },
});

export default QuantitySelector;