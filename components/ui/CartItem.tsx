import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { X } from 'lucide-react-native';
import { CartItem as CartItemType } from '@/types';
import { useThemeStore } from '@/store/theme-store';
import colors from '@/constants/colors';
import { borderRadius, spacing } from '@/constants/theme';
import QuantitySelector from '@/components/ui/QuantitySelector';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const isDarkMode = useThemeStore(state => state.theme) === 'dark';
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const handleQuantityChange = (quantity: number) => {
    onUpdateQuantity(item.product.id, quantity);
  };
  
  const handleRemove = () => {
    onRemove(item.product.id);
  };
  
  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: theme.card,
        borderColor: theme.border
      }
    ]}>
      <Image 
        source={{ uri: item.product.images[0] }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text 
            style={[styles.name, { color: theme.text }]}
            numberOfLines={1}
          >
            {item.product.name}
          </Text>
          
          <TouchableOpacity
            onPress={handleRemove}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <X size={18} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>
        
        {(item.color || item.size) && (
          <View style={styles.options}>
            {item.color && (
              <View style={styles.option}>
                <Text style={[styles.optionLabel, { color: theme.textSecondary }]}>
                  Color:
                </Text>
                <View 
                  style={[
                    styles.colorDot, 
                    { backgroundColor: item.color }
                  ]} 
                />
              </View>
            )}
            
            {item.size && (
              <View style={styles.option}>
                <Text style={[styles.optionLabel, { color: theme.textSecondary }]}>
                  Size:
                </Text>
                <Text style={[styles.optionValue, { color: theme.text }]}>
                  {item.size}
                </Text>
              </View>
            )}
          </View>
        )}
        
        <View style={styles.footer}>
          <Text style={[styles.price, { color: theme.text }]}>
            ${(item.product.price * item.quantity).toFixed(2)}
          </Text>
          
          <QuantitySelector
            value={item.quantity}
            onChange={handleQuantityChange}
            size="small"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    marginRight: spacing.sm,
  },
  options: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  optionLabel: {
    fontSize: 12,
    marginRight: 4,
  },
  optionValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartItem;