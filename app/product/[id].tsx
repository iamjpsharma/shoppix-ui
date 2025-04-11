import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  SafeAreaView,
  Image,
  FlatList
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Heart, Share2, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import { useCartStore } from '@/store/cart-store';
import colors from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/theme';
import Button from '@/components/ui/Button';
import Rating from '@/components/ui/Rating';
import QuantitySelector from '@/components/ui/QuantitySelector';
import { getProductById } from '@/mocks/products';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const addToCart = useCartStore(state => state.addItem);
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const product = getProductById(id as string);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  if (!product) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>
          Product not found
        </Text>
      </SafeAreaView>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    router.push('/cart');
  };
  
  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    router.push('/checkout');
  };
  
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  
  const renderImageItem = ({ item }: { item: string }) => (
    <Image 
      source={{ uri: item }} 
      style={styles.image}
      resizeMode="cover"
    />
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <FlatList
            data={product.images}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => `image-${index}`}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
          
          <View style={styles.imageActions}>
            <TouchableOpacity 
              style={[styles.iconButton, { backgroundColor: theme.background }]}
            >
              <Heart size={20} color={theme.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.iconButton, { backgroundColor: theme.background }]}
            >
              <Share2 size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.name, { color: theme.text }]}>
              {product.name}
            </Text>
            
            <View style={styles.priceContainer}>
              <Text style={[styles.price, { color: theme.text }]}>
                ${product.price.toFixed(2)}
              </Text>
              
              {product.originalPrice && (
                <Text style={[styles.originalPrice, { color: theme.textSecondary }]}>
                  ${product.originalPrice.toFixed(2)}
                </Text>
              )}
              
              {product.discount && (
                <View style={[styles.discountBadge, { backgroundColor: theme.secondary }]}>
                  <Text style={styles.discountText}>
                    {product.discount}% OFF
                  </Text>
                </View>
              )}
            </View>
          </View>
          
          <View style={styles.ratingContainer}>
            <Rating 
              value={product.rating} 
              reviewCount={product.reviewCount}
              size="medium"
            />
          </View>
          
          {product.colors && product.colors.length > 0 && (
            <View style={styles.optionContainer}>
              <Text style={[styles.optionTitle, { color: theme.text }]}>
                Color
              </Text>
              <View style={styles.colorOptions}>
                {product.colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { 
                        backgroundColor: color,
                        borderColor: selectedColor === color ? theme.primary : 'transparent',
                      }
                    ]}
                    onPress={() => setSelectedColor(color)}
                  />
                ))}
              </View>
            </View>
          )}
          
          {product.sizes && product.sizes.length > 0 && (
            <View style={styles.optionContainer}>
              <Text style={[styles.optionTitle, { color: theme.text }]}>
                Size
              </Text>
              <View style={styles.sizeOptions}>
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeOption,
                      { 
                        backgroundColor: selectedSize === size ? theme.primary : theme.card,
                        borderColor: selectedSize === size ? theme.primary : theme.border,
                      }
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text 
                      style={[
                        styles.sizeText, 
                        { color: selectedSize === size ? '#FFFFFF' : theme.text }
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          
          <View style={styles.quantityContainer}>
            <Text style={[styles.optionTitle, { color: theme.text }]}>
              Quantity
            </Text>
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={10}
            />
          </View>
          
          <View style={styles.descriptionContainer}>
            <TouchableOpacity 
              style={styles.descriptionHeader}
              onPress={toggleDescription}
            >
              <Text style={[styles.descriptionTitle, { color: theme.text }]}>
                Description
              </Text>
              {showFullDescription ? (
                <ChevronUp size={20} color={theme.textSecondary} />
              ) : (
                <ChevronDown size={20} color={theme.textSecondary} />
              )}
            </TouchableOpacity>
            
            <Text 
              style={[
                styles.description, 
                { 
                  color: theme.textSecondary,
                  height: showFullDescription ? undefined : 80,
                }
              ]}
              numberOfLines={showFullDescription ? undefined : 3}
            >
              {product.description}
            </Text>
            
            {!showFullDescription && (
              <TouchableOpacity 
                style={styles.readMore}
                onPress={toggleDescription}
              >
                <Text style={[styles.readMoreText, { color: theme.primary }]}>
                  Read More
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
      
      <View style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
        <Button
          title="Add to Cart"
          variant="outline"
          onPress={handleAddToCart}
          icon={<ShoppingBag size={18} color={theme.primary} />}
          style={styles.cartButton}
        />
        
        <Button
          title="Buy Now"
          onPress={handleBuyNow}
          style={styles.buyButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    padding: spacing.xl,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  image: {
    width: SCREEN_WIDTH,
    height: 300,
  },
  imageActions: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    flexDirection: 'column',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.sm,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: spacing.sm,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    marginRight: spacing.sm,
  },
  discountBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingContainer: {
    marginBottom: spacing.md,
  },
  optionContainer: {
    marginBottom: spacing.md,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  colorOptions: {
    flexDirection: 'row',
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: spacing.sm,
    borderWidth: 2,
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeOption: {
    minWidth: 50,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  quantityContainer: {
    marginBottom: spacing.md,
  },
  descriptionContainer: {
    marginBottom: spacing.md,
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    overflow: 'hidden',
  },
  readMore: {
    marginTop: spacing.xs,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.md,
    borderTopWidth: 1,
  },
  cartButton: {
    flex: 1,
    marginRight: spacing.sm,
  },
  buyButton: {
    flex: 1,
  },
});