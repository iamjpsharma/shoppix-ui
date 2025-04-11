import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin, Package, ArrowLeft } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import colors from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/theme';
import Button from '@/components/ui/Button';
import { orders } from '@/mocks/user';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const order = orders.find(order => order.id === id);
  
  if (!order) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>
          Order not found
        </Text>
      </SafeAreaView>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.orderInfo}>
            <Text style={[styles.orderId, { color: theme.text }]}>
              {order.id}
            </Text>
            <Text style={[styles.orderDate, { color: theme.textSecondary }]}>
              Placed on {formatDate(order.date)}
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
        
        {order.status === 'shipped' && order.trackingNumber && (
          <View style={[styles.trackingContainer, { backgroundColor: theme.card }]}>
            <View style={styles.trackingHeader}>
              <Package size={20} color={theme.info} />
              <Text style={[styles.trackingTitle, { color: theme.text }]}>
                Tracking Information
              </Text>
            </View>
            
            <Text style={[styles.trackingNumber, { color: theme.textSecondary }]}>
              Tracking Number: {order.trackingNumber}
            </Text>
            
            <Button
              title="Track Package"
              variant="outline"
              style={styles.trackButton}
            />
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Items
          </Text>
          
          {order.items.map((item, index) => (
            <View 
              key={`${item.product.id}-${index}`}
              style={[
                styles.itemContainer,
                { 
                  backgroundColor: theme.card,
                  borderColor: theme.border
                }
              ]}
            >
              <Image 
                source={{ uri: item.product.images[0] }} 
                style={styles.itemImage}
                resizeMode="cover"
              />
              
              <View style={styles.itemInfo}>
                <Text 
                  style={[styles.itemName, { color: theme.text }]}
                  numberOfLines={2}
                >
                  {item.product.name}
                </Text>
                
                {(item.color || item.size) && (
                  <View style={styles.itemOptions}>
                    {item.color && (
                      <View style={styles.itemOption}>
                        <Text style={[styles.itemOptionLabel, { color: theme.textSecondary }]}>
                          Color:
                        </Text>
                        <View 
                          style={[
                            styles.colorDot, 
                            { backgroundColor: item.color }
                          ]} 
                        />
                      </View>
                    )}
                    
                    {item.size && (
                      <View style={styles.itemOption}>
                        <Text style={[styles.itemOptionLabel, { color: theme.textSecondary }]}>
                          Size:
                        </Text>
                        <Text style={[styles.itemOptionValue, { color: theme.text }]}>
                          {item.size}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
                
                <View style={styles.itemPriceContainer}>
                  <Text style={[styles.itemPrice, { color: theme.text }]}>
                    ${item.product.price.toFixed(2)}
                  </Text>
                  <Text style={[styles.itemQuantity, { color: theme.textSecondary }]}>
                    Qty: {item.quantity}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Shipping Address
          </Text>
          
          <View style={[
            styles.addressContainer,
            { 
              backgroundColor: theme.card,
              borderColor: theme.border
            }
          ]}>
            <View style={styles.addressHeader}>
              <MapPin size={20} color={theme.primary} />
              <Text style={[styles.addressName, { color: theme.text }]}>
                {order.shippingAddress.name}
              </Text>
            </View>
            
            <Text style={[styles.addressLine, { color: theme.text }]}>
              {order.shippingAddress.line1}
            </Text>
            
            {order.shippingAddress.line2 && (
              <Text style={[styles.addressLine, { color: theme.text }]}>
                {order.shippingAddress.line2}
              </Text>
            )}
            
            <Text style={[styles.addressLine, { color: theme.text }]}>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </Text>
            
            <Text style={[styles.addressLine, { color: theme.text }]}>
              {order.shippingAddress.country}
            </Text>
            
            {order.shippingAddress.phone && (
              <Text style={[styles.addressPhone, { color: theme.textSecondary }]}>
                {order.shippingAddress.phone}
              </Text>
            )}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Payment Information
          </Text>
          
          <View style={[
            styles.paymentContainer,
            { 
              backgroundColor: theme.card,
              borderColor: theme.border
            }
          ]}>
            <View style={styles.paymentRow}>
              <Text style={[styles.paymentLabel, { color: theme.textSecondary }]}>
                Payment Method
              </Text>
              <Text style={[styles.paymentValue, { color: theme.text }]}>
                {order.paymentMethod}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Order Summary
          </Text>
          
          <View style={[
            styles.summaryContainer,
            { 
              backgroundColor: theme.card,
              borderColor: theme.border
            }
          ]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                Subtotal
              </Text>
              <Text style={[styles.summaryValue, { color: theme.text }]}>
                ${(order.total * 0.9).toFixed(2)}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                Shipping
              </Text>
              <Text style={[styles.summaryValue, { color: theme.success }]}>
                Free
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                Tax
              </Text>
              <Text style={[styles.summaryValue, { color: theme.text }]}>
                ${(order.total * 0.1).toFixed(2)}
              </Text>
            </View>
            
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: theme.text }]}>
                Total
              </Text>
              <Text style={[styles.totalValue, { color: theme.text }]}>
                ${order.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Need Help?"
            variant="outline"
            fullWidth
            style={styles.helpButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    padding: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.md,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
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
  trackingContainer: {
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  trackingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  trackingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  trackingNumber: {
    fontSize: 14,
    marginBottom: spacing.md,
  },
  trackButton: {
    alignSelf: 'flex-start',
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  itemContainer: {
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemInfo: {
    flex: 1,
    padding: spacing.sm,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  itemOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.xs,
  },
  itemOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
    marginBottom: 2,
  },
  itemOptionLabel: {
    fontSize: 12,
    marginRight: 4,
  },
  itemOptionValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  itemPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
  },
  addressContainer: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  addressLine: {
    fontSize: 14,
    marginBottom: 2,
  },
  addressPhone: {
    fontSize: 14,
    marginTop: spacing.xs,
  },
  paymentContainer: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  paymentLabel: {
    fontSize: 14,
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  summaryContainer: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: spacing.sm,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  helpButton: {
  },
});