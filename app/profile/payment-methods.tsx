import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, CreditCard, Trash2 } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import colors from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/theme';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';

// Mock payment methods
const initialPaymentMethods = [
  {
    id: '1',
    type: 'visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2025,
    isDefault: true
  },
  {
    id: '2',
    type: 'mastercard',
    last4: '5555',
    expMonth: 10,
    expYear: 2024,
    isDefault: false
  }
];

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  
  const handleBack = () => {
    router.back();
  };
  
  const handleAddPaymentMethod = () => {
    // In a real app, you would navigate to a payment method form
    Alert.alert(
      "Add Payment Method",
      "This would open a payment method form in a real app.",
      [{ text: "OK" }]
    );
  };
  
  const handleDeletePaymentMethod = (id: string) => {
    Alert.alert(
      "Delete Payment Method",
      "Are you sure you want to delete this payment method?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            setPaymentMethods(paymentMethods.filter(method => method.id !== id));
          },
          style: "destructive"
        }
      ]
    );
  };
  
  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };
  
  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };
  
  const renderPaymentMethod = ({ item }: { item: typeof paymentMethods[0] }) => (
    <View style={[
      styles.paymentMethodCard,
      { 
        backgroundColor: theme.card,
        borderColor: item.isDefault ? theme.primary : theme.border
      }
    ]}>
      <View style={styles.cardInfo}>
        <View style={styles.cardTypeContainer}>
          <Text style={styles.cardIcon}>{getCardIcon(item.type)}</Text>
          <View>
            <Text style={[styles.cardType, { color: theme.text }]}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} •••• {item.last4}
            </Text>
            <Text style={[styles.cardExpiry, { color: theme.textSecondary }]}>
              Expires {item.expMonth}/{item.expYear}
            </Text>
          </View>
        </View>
        
        {item.isDefault && (
          <View style={[styles.defaultBadge, { backgroundColor: `${theme.primary}20` }]}>
            <Text style={[styles.defaultText, { color: theme.primary }]}>
              Default
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.cardActions}>
        {!item.isDefault && (
          <TouchableOpacity 
            style={[styles.cardActionButton, { backgroundColor: theme.primary }]}
            onPress={() => handleSetDefaultPaymentMethod(item.id)}
          >
            <Text style={styles.cardActionButtonText}>Set Default</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.cardActionButton, { backgroundColor: theme.error }]}
          onPress={() => handleDeletePaymentMethod(item.id)}
        >
          <Trash2 size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>
          Payment Methods
        </Text>
        <TouchableOpacity onPress={handleAddPaymentMethod}>
          <Plus size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>
      
      {paymentMethods.length > 0 ? (
        <FlatList
          data={paymentMethods}
          renderItem={renderPaymentMethod}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.paymentMethodsList}
        />
      ) : (
        <EmptyState
          icon={<CreditCard size={32} color={theme.textSecondary} />}
          title="No Payment Methods"
          description="You haven't added any payment methods yet. Add a payment method to make checkout faster."
          buttonText="Add Payment Method"
          onButtonPress={handleAddPaymentMethod}
        />
      )}
      
      <View style={styles.footer}>
        <Button
          title="Add New Payment Method"
          onPress={handleAddPaymentMethod}
          fullWidth
          icon={<Plus size={18} color="#FFFFFF" />}
        />
      </View>
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
  paymentMethodsList: {
    padding: spacing.md,
    paddingBottom: 80, // Space for the footer button
  },
  paymentMethodCard: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  cardType: {
    fontSize: 16,
    fontWeight: '500',
  },
  cardExpiry: {
    fontSize: 14,
  },
  defaultBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
  },
  defaultText: {
    fontSize: 10,
    fontWeight: '500',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardActionButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    marginLeft: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardActionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});