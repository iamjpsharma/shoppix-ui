import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle, ShoppingBag } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import colors from '@/constants/colors';
import { spacing } from '@/constants/theme';
import Button from '@/components/ui/Button';

export default function OrderSuccessScreen() {
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const handleContinueShopping = () => {
    router.replace('/');
  };
  
  const handleViewOrders = () => {
    router.replace('/profile');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: `${theme.success}10` }
        ]}>
          <CheckCircle size={60} color={theme.success} />
        </View>
        
        <Text style={[styles.title, { color: theme.text }]}>
          Order Placed Successfully!
        </Text>
        
        <Text style={[styles.message, { color: theme.textSecondary }]}>
          Your order has been placed successfully. You will receive a confirmation email shortly.
        </Text>
        
        <View style={[
          styles.orderInfoContainer,
          { backgroundColor: theme.card, borderColor: theme.border }
        ]}>
          <View style={styles.orderInfoRow}>
            <Text style={[styles.orderInfoLabel, { color: theme.textSecondary }]}>
              Order Number
            </Text>
            <Text style={[styles.orderInfoValue, { color: theme.text }]}>
              #ORD-12348
            </Text>
          </View>
          
          <View style={styles.orderInfoRow}>
            <Text style={[styles.orderInfoLabel, { color: theme.textSecondary }]}>
              Date
            </Text>
            <Text style={[styles.orderInfoValue, { color: theme.text }]}>
              {new Date().toLocaleDateString()}
            </Text>
          </View>
          
          <View style={styles.orderInfoRow}>
            <Text style={[styles.orderInfoLabel, { color: theme.textSecondary }]}>
              Total
            </Text>
            <Text style={[styles.orderInfoValue, { color: theme.text }]}>
              $329.98
            </Text>
          </View>
          
          <View style={styles.orderInfoRow}>
            <Text style={[styles.orderInfoLabel, { color: theme.textSecondary }]}>
              Payment Method
            </Text>
            <Text style={[styles.orderInfoValue, { color: theme.text }]}>
              Credit Card (**** 1234)
            </Text>
          </View>
        </View>
        
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1584735175315-9d5df23be620' }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
      
      <View style={styles.footer}>
        <Button
          title="Continue Shopping"
          onPress={handleContinueShopping}
          fullWidth
          style={styles.continueButton}
        />
        
        <Button
          title="View My Orders"
          variant="outline"
          onPress={handleViewOrders}
          fullWidth
          icon={<ShoppingBag size={18} color={theme.primary} />}
          style={styles.ordersButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  orderInfoContainer: {
    width: '100%',
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: spacing.xl,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  orderInfoLabel: {
    fontSize: 14,
  },
  orderInfoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  imageContainer: {
    width: '100%',
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: spacing.xl,
  },
  continueButton: {
    marginBottom: spacing.md,
  },
  ordersButton: {
  },
});