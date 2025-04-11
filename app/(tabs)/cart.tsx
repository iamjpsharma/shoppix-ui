import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { ShoppingBag, ArrowRight } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import { useCartStore } from '@/store/cart-store';
import colors from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/theme';
import CartItem from '@/components/ui/CartItem';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
export default function CartScreen() {
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    itemCount, 
    totalPrice, 
    clearCart 
  } = useCartStore();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };
  
  const handleClearCart = () => {
    clearCart();
  };
  
  const handleCheckout = () => {
    router.push('/checkout');
  };
  
  const handleContinueShopping = () => {
    router.push('/');
  };
  
  if (items.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <EmptyState
          icon={<ShoppingBag size={32} color={theme.textSecondary} />}
          title="Your Cart is Empty"
          description="Looks like you haven't added any products to your cart yet."
          buttonText="Start Shopping"
          onButtonPress={handleContinueShopping}
        />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Shopping Cart
        </Text>
        <TouchableOpacity onPress={handleClearCart}>
          <Text style={[styles.clearText, { color: theme.error }]}>
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveItem}
          />
        )}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.cartList}
      />
      
      <View style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>
              ${totalPrice.toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Shipping
            </Text>
            <Text style={[styles.summaryValue, { color: theme.success }]}>
              Free
            </Text>
          </View>
          
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          
          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>
              Total
            </Text>
            <Text style={[styles.totalValue, { color: theme.text }]}>
              ${totalPrice.toFixed(2)}
            </Text>
          </View>
        </View>
        
        <Button
          title="Proceed to Checkout"
          onPress={handleCheckout}
          fullWidth
          icon={<ArrowRight size={18} color="#FFFFFF" />}
          iconPosition="right"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  clearText: {
    fontSize: 14,
    fontWeight: '500',
  },
  cartList: {
    padding: spacing.md,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
  },
  summaryContainer: {
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: spacing.sm,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});