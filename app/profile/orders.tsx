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
import { ArrowLeft, ShoppingBag } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import colors from '@/constants/colors';
import { spacing } from '@/constants/theme';
import OrderItem from '@/components/ui/OrderItem';
import EmptyState from '@/components/ui/EmptyState';
import { orders } from '@/mocks/user';

export default function OrdersScreen() {
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const handleBack = () => {
    router.back();
  };
  
  const handleContinueShopping = () => {
    router.push('/');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>
          My Orders
        </Text>
        <View style={{ width: 24 }} />
      </View>
      
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={({ item }) => <OrderItem order={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.ordersList}
        />
      ) : (
        <EmptyState
          icon={<ShoppingBag size={32} color={theme.textSecondary} />}
          title="No Orders Yet"
          description="You haven't placed any orders yet. Start shopping and your orders will appear here."
          buttonText="Start Shopping"
          onButtonPress={handleContinueShopping}
        />
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
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ordersList: {
    padding: spacing.md,
  },
});