import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { Banner as BannerType } from '@/types';
import { borderRadius, spacing } from '@/constants/theme';
import { ChevronRight } from 'lucide-react-native';

interface BannerProps {
  banner: BannerType;
  fullWidth?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const Banner: React.FC<BannerProps> = ({ 
  banner,
  fullWidth = false
}) => {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(banner.link);
  };
  
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.8}
      style={[
        styles.container,
        fullWidth ? { width: SCREEN_WIDTH - (spacing.md * 2) } : { width: 280 }
      ]}
    >
      <ImageBackground
        source={{ uri: banner.image }}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>{banner.title}</Text>
            <Text style={styles.subtitle}>{banner.subtitle}</Text>
            
            <View style={styles.button}>
              <Text style={styles.buttonText}>{banner.buttonText}</Text>
              <ChevronRight size={16} color="#FFFFFF" />
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    marginRight: spacing.md,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    borderRadius: borderRadius.md,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: '100%',
    justifyContent: 'center',
    padding: spacing.md,
  },
  content: {
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: spacing.md,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: 4,
  },
});

export default Banner;