import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { Check, MapPin, Pencil } from 'lucide-react-native';
import { Address } from '@/types';
import { useIsDarkMode } from '@/store/theme-store';
import colors from '@/constants/colors';
import { borderRadius, spacing } from '@/constants/theme';

interface AddressCardProps {
  address: Address;
  selected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  selectable?: boolean;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  selected = false,
  onSelect,
  onEdit,
  selectable = false,
}) => {
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        { 
          backgroundColor: theme.card,
          borderColor: selected ? theme.primary : theme.border
        }
      ]}
      onPress={selectable ? onSelect : undefined}
      activeOpacity={selectable ? 0.7 : 1}
    >
      <View style={styles.header}>
        <View style={styles.nameContainer}>
          <MapPin size={16} color={theme.textSecondary} />
          <Text style={[styles.name, { color: theme.text }]}>
            {address.name}
          </Text>
          
          {address.isDefault && (
            <View style={[styles.defaultBadge, { backgroundColor: `${theme.primary}20` }]}>
              <Text style={[styles.defaultText, { color: theme.primary }]}>
                Default
              </Text>
            </View>
          )}
        </View>
        
        {onEdit && (
          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: `${theme.primary}10` }]}
            onPress={onEdit}
          >
            <Pencil size={14} color={theme.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.addressLine, { color: theme.text }]}>
          {address.line1}
        </Text>
        
        {address.line2 && (
          <Text style={[styles.addressLine, { color: theme.text }]}>
            {address.line2}
          </Text>
        )}
        
        <Text style={[styles.addressLine, { color: theme.text }]}>
          {address.city}, {address.state} {address.postalCode}
        </Text>
        
        <Text style={[styles.addressLine, { color: theme.text }]}>
          {address.country}
        </Text>
        
        {address.phone && (
          <Text style={[styles.phone, { color: theme.textSecondary }]}>
            {address.phone}
          </Text>
        )}
      </View>
      
      {selectable && (
        <View style={[
          styles.radioContainer,
          { 
            borderColor: selected ? theme.primary : theme.border,
            backgroundColor: selected ? theme.primary : 'transparent'
          }
        ]}>
          {selected && <Check size={14} color="#FFFFFF" />}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: spacing.xs,
    marginRight: spacing.xs,
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
  editButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingRight: 24, // Space for radio button
  },
  addressLine: {
    fontSize: 14,
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    marginTop: spacing.xs,
  },
  radioContainer: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddressCard;