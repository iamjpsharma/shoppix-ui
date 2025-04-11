import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, CreditCard, ChevronRight, Plus } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';
import colors from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/theme';
import Button from '@/components/ui/Button';
import AddressCard from '@/components/ui/AddressCard';

export default function CheckoutScreen() {
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const { items, totalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const [selectedAddress, setSelectedAddress] = useState(
    user?.addresses.find(addr => addr.isDefault)?.id || user?.addresses[0]?.id
  );
  const [selectedPayment, setSelectedPayment] = useState('card');
  
  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
  };
  
  const handleAddAddress = () => {
    // Navigate to add address screen
  };
  
  const handlePaymentSelect = (method: string) => {
    setSelectedPayment(method);
  };
  
  const handlePlaceOrder = () => {
    // In a real app, you would submit the order to your API
    clearCart();
    router.push('/order-success');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <MapPin size={20} color={theme.primary} />
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Shipping Address
              </Text>
            </View>
            
            <TouchableOpacity onPress={handleAddAddress}>
              <Plus size={20} color={theme.primary} />
            </TouchableOpacity>
          </View>
          
          {user?.addresses.map(address => (
            <AddressCard
              key={address.id}
              address={address}
              selected={selectedAddress === address.id}
              onSelect={() => handleAddressSelect(address.id)}
              selectable
            />
          ))}
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <CreditCard size={20} color={theme.primary} />
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Payment Method
              </Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.paymentOption,
              { 
                backgroundColor: theme.card,
                borderColor: selectedPayment === 'card' ? theme.primary : theme.border
              }
            ]}
            onPress={() => handlePaymentSelect('card')}
          >
            <View style={styles.paymentOptionContent}>
              <View style={[
                styles.paymentIconContainer,
                { backgroundColor: `${theme.primary}10` }
              ]}>
                <CreditCard size={20} color={theme.primary} />
              </View>
              <View>
                <Text style={[styles.paymentOptionTitle, { color: theme.text }]}>
                  Credit/Debit Card
                </Text>
                <Text style={[styles.paymentOptionSubtitle, { color: theme.textSecondary }]}>
                  Pay with Visa, Mastercard, etc.
                </Text>
              </View>
            </View>
            
            <View style={[
              styles.radioButton,
              { 
                borderColor: selectedPayment === 'card' ? theme.primary : theme.border,
                backgroundColor: selectedPayment === 'card' ? theme.primary : 'transparent'
              }
            ]}>
              {selectedPayment === 'card' && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.paymentOption,
              { 
                backgroundColor: theme.card,
                borderColor: selectedPayment === 'paypal' ? theme.primary : theme.border
              }
            ]}
            onPress={() => handlePaymentSelect('paypal')}
          >
            <View style={styles.paymentOptionContent}>
              <View style={[
                styles.paymentIconContainer,
                { backgroundColor: `${theme.primary}10` }
              ]}>
                <Text style={[styles.paypalIcon, { color: theme.primary }]}>P</Text>
              </View>
              <View>
                <Text style={[styles.paymentOptionTitle, { color: theme.text }]}>
                  PayPal
                </Text>
                <Text style={[styles.paymentOptionSubtitle, { color: theme.textSecondary }]}>
                  Pay with your PayPal account
                </Text>
              </View>
            </View>
            
            <View style={[
              styles.radioButton,
              { 
                borderColor: selectedPayment === 'paypal' ? theme.primary : theme.border,
                backgroundColor: selectedPayment === 'paypal' ? theme.primary : 'transparent'
              }
            ]}>
              {selectedPayment === 'paypal' && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Order Summary
          </Text>
          
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                Items ({items.length})
              </Text>
              <Text style={[styles.summaryValue, { color: theme.text }]}>
                ${totalPrice.toFixed(2)}
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
                ${(totalPrice * 0.1).toFixed(2)}
              </Text>
            </View>
            
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: theme.text }]}>
                Total
              </Text>
              <Text style={[styles.totalValue, { color: theme.text }]}>
                ${(totalPrice + (totalPrice * 0.1)).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
        <View style={styles.footerContent}>
          <View>
            <Text style={[styles.footerLabel, { color: theme.textSecondary }]}>
              Total
            </Text>
            <Text style={[styles.footerTotal, { color: theme.text }]}>
              ${(totalPrice + (totalPrice * 0.1)).toFixed(2)}
            </Text>
          </View>
          
          <Button
            title="Place Order"
            onPress={handlePlaceOrder}
            icon={<ChevronRight size={18} color="#FFFFFF" />}
            iconPosition="right"
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
  section: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: spacing.xs,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  paymentOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  paypalIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paymentOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  paymentOptionSubtitle: {
    fontSize: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  summaryContainer: {
    marginTop: spacing.sm,
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
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 12,
  },
  footerTotal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});