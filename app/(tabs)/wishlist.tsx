import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import colors from '@/constants/colors';
import { spacing } from '@/constants/theme';
import ProductCard from '@/components/ui/ProductCard';
import EmptyState from '@/components/ui/EmptyState';
import products from '@/mocks/products';

// In a real app, you would have a wishlist store
// For this demo, we'll just use a subset of products
const wishlistItems = products.slice(0, 3);

export default function WishlistScreen() {
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const handleContinueShopping = () => {
    router.push('/');
  };
  
  if (wishlistItems.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <EmptyState
          icon={<Heart size={32} color={theme.textSecondary} />}
          title="Your Wishlist is Empty"
          description="Save items you love to your wishlist. Review them anytime and easily move them to the cart."
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
          My Wishlist
        </Text>
      </View>
      
      <FlatList
        data={wishlistItems}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productsList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productsList: {
    padding: spacing.md,
  },
  productRow: {
    justifyContent: 'space-between',
  },
});