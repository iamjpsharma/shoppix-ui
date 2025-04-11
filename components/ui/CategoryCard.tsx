import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ImageBackground
} from 'react-native';
import { useRouter } from 'expo-router';
import { Category } from '@/types';
import { useIsDarkMode } from '@/store/theme-store';
import colors from '@/constants/colors';
import { borderRadius, spacing } from '@/constants/theme';

interface CategoryCardProps {
  category: Category;
  variant?: 'horizontal' | 'vertical' | 'small';
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category,
  variant = 'horizontal'
}) => {
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const handlePress = () => {
    router.push(`/category/${category.id}`);
  };
  
  if (variant === 'small') {
    return (
      <TouchableOpacity 
        style={[styles.smallContainer, { borderColor: theme.border }]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.smallImageContainer}>
          <Image 
            source={{ uri: category.image }} 
            style={styles.smallImage}
            resizeMode="cover"
          />
        </View>
        <Text 
          style={[styles.smallName, { color: theme.text }]}
          numberOfLines={1}
        >
          {category.name}
        </Text>
      </TouchableOpacity>
    );
  }
  
  if (variant === 'vertical') {
    return (
      <TouchableOpacity 
        style={[styles.verticalContainer, { borderColor: theme.border }]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Image 
          source={{ uri: category.image }} 
          style={styles.verticalImage}
          resizeMode="cover"
        />
        <View style={[styles.verticalContent, { backgroundColor: theme.card }]}>
          <Text style={[styles.verticalName, { color: theme.text }]}>
            {category.name}
          </Text>
          <Text style={[styles.verticalCount, { color: theme.textSecondary }]}>
            {category.productCount} products
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  
  // Default horizontal variant
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <ImageBackground
        source={{ uri: category.image }}
        style={styles.horizontalContainer}
        imageStyle={styles.horizontalImage}
      >
        <View style={styles.overlay}>
          <View style={styles.horizontalContent}>
            <Text style={styles.horizontalName}>
              {category.name}
            </Text>
            <Text style={styles.horizontalCount}>
              {category.productCount} products
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Small variant
  smallContainer: {
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    width: 80,
  },
  smallImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  smallImage: {
    width: '100%',
    height: '100%',
  },
  smallName: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  
  // Vertical variant
  verticalContainer: {
    width: 150,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    marginRight: spacing.md,
  },
  verticalImage: {
    width: '100%',
    height: 100,
  },
  verticalContent: {
    padding: spacing.sm,
  },
  verticalName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  verticalCount: {
    fontSize: 12,
  },
  
  // Horizontal variant
  horizontalContainer: {
    height: 120,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  horizontalImage: {
    borderRadius: borderRadius.md,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: '100%',
    justifyContent: 'center',
    padding: spacing.md,
  },
  horizontalContent: {
  },
  horizontalName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  horizontalCount: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
});

export default CategoryCard;