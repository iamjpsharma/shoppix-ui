import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import colors from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/theme';
import ProductCard from '@/components/ui/ProductCard';
import CategoryCard from '@/components/ui/CategoryCard';
import EmptyState from '@/components/ui/EmptyState';
import products from '@/mocks/products';
import categories from '@/mocks/categories';

export default function SearchScreen() {
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState(params.filter || 'all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showCategories, setShowCategories] = useState(true);
  
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  useEffect(() => {
    if (params.filter) {
      setActiveFilter(params.filter as string);
      handleFilterChange(params.filter as string);
    }
  }, [params.filter]);
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (text.length > 0) {
      setShowCategories(false);
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const filtered = products.filter(product => 
          product.name.toLowerCase().includes(text.toLowerCase()) ||
          product.description.toLowerCase().includes(text.toLowerCase()) ||
          product.category.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProducts(filtered);
        setIsLoading(false);
      }, 500);
    } else {
      setShowCategories(true);
      setFilteredProducts(products);
    }
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
    setShowCategories(true);
    setFilteredProducts(products);
  };
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filtered = products;
      
      switch (filter) {
        case 'featured':
          filtered = products.filter(product => product.featured);
          break;
        case 'new':
          filtered = products.filter(product => product.isNew);
          break;
        case 'discount':
          filtered = products.filter(product => product.discount && product.discount > 0);
          break;
        case 'price_low':
          filtered = [...products].sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          filtered = [...products].sort((a, b) => b.price - a.price);
          break;
        default:
          filtered = products;
      }
      
      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 300);
  };
  
  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };
  
  const handleFilterPress = () => {
    // Open filter modal
  };
  
  const renderFilterChip = (label: string, value: string) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        { 
          backgroundColor: activeFilter === value ? theme.primary : theme.card,
          borderColor: activeFilter === value ? theme.primary : theme.border,
        }
      ]}
      onPress={() => handleFilterChange(value)}
    >
      <Text 
        style={[
          styles.filterChipText, 
          { color: activeFilter === value ? '#FFFFFF' : theme.text }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
          <SearchIcon size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search products..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <X size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: theme.card }]}
          onPress={handleFilterPress}
        >
          <SlidersHorizontal size={20} color={theme.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filtersContainer}>
        <FlatList
          data={[
            { label: 'All', value: 'all' },
            { label: 'Featured', value: 'featured' },
            { label: 'New', value: 'new' },
            { label: 'Discounted', value: 'discount' },
            { label: 'Price: Low to High', value: 'price_low' },
            { label: 'Price: High to Low', value: 'price_high' },
          ]}
          renderItem={({ item }) => renderFilterChip(item.label, item.value)}
          keyExtractor={(item) => item.value}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        />
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : showCategories ? (
        <View style={styles.content}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Categories
          </Text>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <CategoryCard 
                category={item} 
                variant="horizontal" 
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
      ) : (
        <View style={styles.content}>
          {filteredProducts.length > 0 ? (
            <>
              <Text style={[styles.resultsText, { color: theme.textSecondary }]}>
                {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
              </Text>
              <FlatList
                data={filteredProducts}
                renderItem={({ item }) => <ProductCard product={item} />}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.productRow}
                contentContainerStyle={styles.productsList}
              />
            </>
          ) : (
            <EmptyState
              icon={<SearchIcon size={32} color={theme.textSecondary} />}
              title="No Results Found"
              description="We couldn't find any products matching your search. Try different keywords or browse categories."
              buttonText="Browse Categories"
              onButtonPress={() => setShowCategories(true)}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 16,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  filtersContainer: {
    marginBottom: spacing.md,
  },
  filtersList: {
    paddingHorizontal: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  categoriesList: {
    paddingBottom: spacing.xl,
  },
  resultsText: {
    fontSize: 14,
    marginBottom: spacing.md,
  },
  productsList: {
    paddingBottom: spacing.xl,
  },
  productRow: {
    justifyContent: 'space-between',
  },
});