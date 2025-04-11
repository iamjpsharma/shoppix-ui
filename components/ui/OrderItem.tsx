import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, Package } from 'lucide-react-native';
import { Order } from '@/types';
import { useIsDarkMode } from '@/store/theme-store';
import colors from '@/constants/colors';
import { borderRadius, spacing } from '@/constants/theme';

interface OrderItemProps {
  order: Order;
}

export const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const handlePress = () => {
    router.push(`/order/${order.id}`);
  };
  
  const getStatusColor = () => {
    switch (order.status) {
      case 'delivered':
        return theme.success;
      case 'shipped':
        return theme.info;
      case 'processing':
        return theme.warning;
      case 'cancelled':
        return theme.error;
      default:
        return theme.textSecondary;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getStatusText = () => {
    switch (order.status) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'processing':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Pending';
    }
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        { 
          backgroundColor: theme.card,
          borderColor: theme.border
        }
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.orderInfo}>
          <Text style={[styles.orderId, { color: theme.text }]}>
            {order.id}
          </Text>
          <Text style={[styles.date, { color: theme.textSecondary }]}>
            {formatDate(order.date)}
          </Text>
        </View>
        
        <View style={[
          styles.statusBadge,
          { backgroundColor: `${getStatusColor()}20` }
        ]}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.itemInfo}>
          <Package size={16} color={theme.textSecondary} />
          <Text style={[styles.itemCount, { color: theme.textSecondary }]}>
            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
          </Text>
        </View>
        
        <Text style={[styles.total, { color: theme.text }]}>
          ${order.total.toFixed(2)}
        </Text>
      </View>
      
      <View style={[styles.footer, { borderTopColor: theme.border }]}>
        <Text style={[styles.footerText, { color: theme.primary }]}>
          View Order Details
        </Text>
        <ChevronRight size={16} color={theme.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCount: {
    fontSize: 14,
    marginLeft: spacing.xs,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
});

export default OrderItem;