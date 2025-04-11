import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import colors from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/theme';
import ProductCard from '@/components/ui/ProductCard';
import { getProductsByCategory } from '@/mocks/products';
import categories from '@/mocks/categories';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const [products, setProducts] = useState(getProductsByCategory(id as string));
  const [sortOption, setSortOption] = useState('default');
  const [showSortOptions, setShowSortOptions] = useState(false);
  
  const category = categories.find(cat => cat.id === id);
  
  const handleSort = (option: string) => {
    setSortOption(option);
    setShowSortOptions(false);
    
    let sortedProducts = [...products];
    
    switch (option) {
      case 'price_low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, you would sort by date
        // For this demo, we'll just reverse the array
        sortedProducts.reverse();
        break;
      default:
        // Default sorting (as returned from API)
        sortedProducts = getProductsByCategory(id as string);
    }
    
    setProducts(sortedProducts);
  };
  
  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };
  
  const handleFilter = () => {
    // Open filter modal
  };
  
  const getSortLabel = () => {
    switch (sortOption) {
      case 'price_low':
        return 'Price: Low to High';
      case 'price_high':
        return 'Price: High to Low';
      case 'rating':
        return 'Highest Rated';
      case 'newest':
        return 'Newest First';
      default:
        return 'Sort By';
    }
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          {category?.name || 'Category'}
        </Text>
        <Text style={[styles.count, { color: theme.textSecondary }]}>
          {products.length} {products.length === 1 ? 'product' : 'products'}
        </Text>
      </View>
      
      <View style={styles.actions}>
        <View style={styles.sortContainer}>
          <TouchableOpacity 
            style={[styles.sortButton, { backgroundColor: theme.card }]}
            onPress={toggleSortOptions}
          >
            <ArrowUpDown size={16} color={theme.text} />
            <Text style={[styles.sortButtonText, { color: theme.text }]}>
              {getSortLabel()}
            </Text>
          </TouchableOpacity>
          
          {showSortOptions && (
            <View style={[styles.sortOptions, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <TouchableOpacity 
                style={[
                  styles.sortOption, 
                  { borderBottomColor: theme.border }
                ]}
                onPress={() => handleSort('default')}
              >
                <Text style={[
                  styles.sortOptionText, 
                  { 
                    color: sortOption === 'default' ? theme.primary : theme.text,
                    fontWeight: sortOption === 'default' ? 'bold' : 'normal'
                  }
                ]}>
                  Default
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.sortOption, 
                  { borderBottomColor: theme.border }
                ]}
                onPress={() => handleSort('price_low')}
              >
                <Text style={[
                  styles.sortOptionText, 
                  { 
                    color: sortOption === 'price_low' ? theme.primary : theme.text,
                    fontWeight: sortOption === 'price_low' ? 'bold' : 'normal'
                  }
                ]}>
                  Price: Low to High
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.sortOption, 
                  { borderBottomColor: theme.border }
                ]}
                onPress={() => handleSort('price_high')}
              >
                <Text style={[
                  styles.sortOptionText, 
                  { 
                    color: sortOption === 'price_high' ? theme.primary : theme.text,
                    fontWeight: sortOption === 'price_high' ? 'bold' : 'normal'
                  }
                ]}>
                  Price: High to Low
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.sortOption, 
                  { borderBottomColor: theme.border }
                ]}
                onPress={() => handleSort('rating')}
              >
                <Text style={[
                  styles.sortOptionText, 
                  { 
                    color: sortOption === 'rating' ? theme.primary : theme.text,
                    fontWeight: sortOption === 'rating' ? 'bold' : 'normal'
                  }
                ]}>
                  Highest Rated
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.sortOption}
                onPress={() => handleSort('newest')}
              >
                <Text style={[
                  styles.sortOptionText, 
                  { 
                    color: sortOption === 'newest' ? theme.primary : theme.text,
                    fontWeight: sortOption === 'newest' ? 'bold' : 'normal'
                  }
                ]}>
                  Newest First
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: theme.card }]}
          onPress={handleFilter}
        >
          <SlidersHorizontal size={16} color={theme.text} />
          <Text style={[styles.filterButtonText, { color: theme.text }]}>
            Filter
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={products}
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
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sortContainer: {
    flex: 1,
    marginRight: spacing.sm,
    position: 'relative',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  sortButtonText: {
    fontSize: 14,
    marginLeft: spacing.xs,
  },
  sortOptions: {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    zIndex: 10,
  },
  sortOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  sortOptionText: {
    fontSize: 14,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  filterButtonText: {
    fontSize: 14,
    marginLeft: spacing.xs,
  },
  productsList: {
    padding: spacing.md,
  },
  productRow: {
    justifyContent: 'space-between',
  },
});