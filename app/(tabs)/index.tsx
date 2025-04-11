import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Bell } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import { useAuthStore } from '@/store/auth-store';
import colors from '@/constants/colors';
import { spacing } from '@/constants/theme';
import ProductCard from '@/components/ui/ProductCard';
import CategoryCard from '@/components/ui/CategoryCard';
import Banner from '@/components/ui/Banner';
import SectionHeader from '@/components/ui/SectionHeader';
import products, { 
  getFeaturedProducts, 
  getNewProducts, 
  getDiscountedProducts 
} from '@/mocks/products';
import categories from  '@/mocks/categories';
import banners from '@/mocks/banners';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const { user } = useAuthStore();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();
  const discountedProducts = getDiscountedProducts();
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  
  const handleSearch = () => {
    router.push('/search');
  };
  
  const handleNotifications = () => {
    // Handle notifications
  };
  
  const handleSeeAll = (route: string) => {
    router.push(route);
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.textSecondary }]}>
            Hello, {user?.name?.split(' ')[0] || 'Guest'}
          </Text>
          <Text style={[styles.title, { color: theme.text }]}>
            Find your perfect product
          </Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: theme.card }]}
            onPress={handleSearch}
          >
            <Search size={20} color={theme.text} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: theme.card }]}
            onPress={handleNotifications}
          >
            <Bell size={20} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.searchContainer}>
          <TouchableOpacity 
            style={[styles.searchBar, { backgroundColor: theme.card }]}
            onPress={handleSearch}
          >
            <Search size={20} color={theme.textSecondary} />
            <Text style={[styles.searchText, { color: theme.textSecondary }]}>
              Search products...
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={({ item }) => <CategoryCard category={item} variant="small" />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
        
        <View style={styles.bannersContainer}>
          <FlatList
            data={banners}
            renderItem={({ item }) => <Banner banner={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bannersList}
          />
        </View>
        
        <View style={styles.section}>
          <SectionHeader 
            title="Featured Products" 
            actionText="See All"
            onAction={() => handleSeeAll('/search?filter=featured')}
          />
          <FlatList
            data={featuredProducts}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>
        
        <View style={styles.section}>
          <SectionHeader 
            title="New Arrivals" 
            actionText="See All"
            onAction={() => handleSeeAll('/search?filter=new')}
          />
          <FlatList
            data={newProducts}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>
        
        <View style={styles.section}>
          <SectionHeader 
            title="Special Offers" 
            actionText="See All"
            onAction={() => handleSeeAll('/search?filter=discount')}
          />
          <FlatList
            data={discountedProducts}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>
        
        <View style={styles.section}>
          <SectionHeader 
            title="Shop by Category" 
            actionText="See All"
            onAction={() => handleSeeAll('/search')}
          />
          <FlatList
            data={categories.slice(0, 4)}
            renderItem={({ item }) => <CategoryCard category={item} variant="vertical" />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
        
        <View style={styles.spacer} />
      </ScrollView>
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
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  greeting: {
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  searchContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  searchText: {
    marginLeft: spacing.sm,
    fontSize: 14,
  },
  categoriesContainer: {
    marginBottom: spacing.md,
  },
  categoriesList: {
    paddingHorizontal: spacing.md,
  },
  bannersContainer: {
    marginBottom: spacing.lg,
  },
  bannersList: {
    paddingHorizontal: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  productsList: {
    paddingHorizontal: spacing.md,
  },
  spacer: {
    height: spacing.xl,
  },
});