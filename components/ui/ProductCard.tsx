import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, ShoppingCart, Star } from 'lucide-react-native';
import { Product } from '@/types';
import { useIsDarkMode } from '@/store/theme-store';
import { useCartStore } from '@/store/cart-store';
import colors from '@/constants/colors';
import { borderRadius, spacing } from '@/constants/theme';

interface ProductCardProps {
  product: Product;
  width?: number | string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product,
  width = (SCREEN_WIDTH - (spacing.md * 3)) / 2 // Default to half screen width minus margins
}) => {
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const addToCart = useCartStore(state => state.addItem);
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };
  
  const handleAddToCart = () => {
    addToCart(product, 1);
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { 
          width, 
          backgroundColor: theme.card,
          borderColor: theme.border
        }
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.images[0] }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        {(product.discount || product.isNew) && (
          <View style={[
            styles.badge,
            { backgroundColor: product.discount ? theme.secondary : theme.primary }
          ]}>
            <Text style={styles.badgeText}>
              {product.discount ? `${product.discount}% OFF` : 'NEW'}
            </Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={[styles.favoriteButton, { backgroundColor: theme.background }]}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Heart size={18} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text 
          style={[styles.name, { color: theme.text }]} 
          numberOfLines={1}
        >
          {product.name}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Star size={14} color={theme.secondary} fill={theme.secondary} />
          <Text style={[styles.rating, { color: theme.textSecondary }]}>
            {product.rating} ({product.reviewCount})
          </Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: theme.text }]}>
            ${product.price.toFixed(2)}
          </Text>
          
          {product.originalPrice && (
            <Text style={[styles.originalPrice, { color: theme.textSecondary }]}>
              ${product.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>
        
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: theme.primary }]}
          onPress={handleAddToCart}
        >
          <ShoppingCart size={16} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  imageContainer: {
    position: 'relative',
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: spacing.sm,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  rating: {
    fontSize: 12,
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 14,
    marginLeft: spacing.xs,
    textDecorationLine: 'line-through',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default ProductCard;