import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import colors from '@/constants/colors';
import { spacing } from '@/constants/theme';

interface RatingProps {
  value: number;
  reviewCount?: number;
  size?: 'small' | 'medium' | 'large';
  showCount?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  reviewCount,
  size = 'medium',
  showCount = true,
}) => {
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const getStarSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'large': return 22;
      default: return 18;
    }
  };
  
  const getFontSize = () => {
    switch (size) {
      case 'small': return 12;
      case 'large': return 16;
      default: return 14;
    }
  };
  
  const renderStars = () => {
    const starSize = getStarSize();
    const stars = [];
    
    // Full stars
    for (let i = 1; i <= Math.floor(value); i++) {
      stars.push(
        <Star 
          key={`star-${i}`} 
          size={starSize} 
          color={theme.secondary} 
          fill={theme.secondary} 
        />
      );
    }
    
    // Half star
    if (value % 1 >= 0.5) {
      stars.push(
        <View key="half-star" style={{ position: 'relative' }}>
          <Star size={starSize} color={theme.secondary} />
          <View style={{ 
            position: 'absolute', 
            left: 0, 
            top: 0, 
            width: '50%', 
            height: '100%', 
            overflow: 'hidden' 
          }}>
            <Star size={starSize} color={theme.secondary} fill={theme.secondary} />
          </View>
        </View>
      );
    } else if (value % 1 > 0) {
      // Empty star if there's a remainder but less than 0.5
      stars.push(
        <Star 
          key="remainder-star" 
          size={starSize} 
          color={theme.secondary} 
        />
      );
    }
    
    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-star-${i}`} 
          size={starSize} 
          color={theme.secondary} 
        />
      );
    }
    
    return stars;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>
      
      {showCount && reviewCount !== undefined && (
        <Text style={[
          styles.count, 
          { 
            color: theme.textSecondary,
            fontSize: getFontSize()
          }
        ]}>
          ({reviewCount})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    marginLeft: spacing.xs,
  },
});

export default Rating;