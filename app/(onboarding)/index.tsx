import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  TouchableOpacity,
  Image,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/store/theme-store';
import colors from '@/constants/colors';
import { spacing } from '@/constants/theme';
import Button from '@/components/ui/Button';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image: string;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Welcome to ShopEase',
    description: 'Discover a world of products at your fingertips. Shop the latest trends in fashion, electronics, and more.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da',
  },
  {
    id: '2',
    title: 'Easy Shopping Experience',
    description: 'Browse through categories, add to cart, and checkout with just a few taps. Shopping made simple.',
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db',
  },
  {
    id: '3',
    title: 'Fast & Secure Delivery',
    description: 'Get your orders delivered to your doorstep quickly and securely. Track your packages in real-time.',
    image: 'https://images.unsplash.com/photo-1584735175315-9d5df23be620',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const isDarkMode = useThemeStore(state => state.theme) === 'dark';
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.replace('/(auth)');
    }
  };
  
  const handleSkip = () => {
    router.replace('/(auth)');
  };
  
  const renderItem = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slide}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={[styles.overlay, { backgroundColor: theme.background }]} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          {item.title}
        </Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          {item.description}
        </Text>
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / SCREEN_WIDTH
          );
          setCurrentIndex(index);
        }}
      />
      
      <View style={styles.footer}>
        <View style={styles.indicators}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor:
                    index === currentIndex ? theme.primary : theme.border,
                  width: index === currentIndex ? 20 : 8,
                },
              ]}
            />
          ))}
        </View>
        
        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={[styles.skipText, { color: theme.textSecondary }]}>
              Skip
            </Text>
          </TouchableOpacity>
          
          <Button
            title={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  content: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    padding: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.xl,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    paddingHorizontal: spacing.xl,
  },
});