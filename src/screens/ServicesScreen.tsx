import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { lightColors, spacing, borderRadius, textStyles } from '../theme';
import { ServiceCard } from '../components';
import { services, DentalService, serviceCategories, ServiceCategory } from '../data/services';
import { RootStackParamList } from '../navigation/types';

type ServicesNavProp = NativeStackNavigationProp<RootStackParamList>;

const ServicesScreen: React.FC = () => {
  const navigation = useNavigation<ServicesNavProp>();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  const filteredServices = services.filter((svc) => {
    const matchesSearch =
      !searchQuery ||
      svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || svc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleServicePress = useCallback(
    (svc: DentalService) => {
      navigation.navigate('Booking', { service: svc });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.title}>Services</Text>
        <Text style={styles.subtitle}>
          {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
        </Text>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color={lightColors.icon} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            placeholderTextColor={lightColors.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            returnKeyType="search"
            testID="services-search"
          />
          {searchQuery.length > 0 && (
            <Ionicons
              name="close-circle"
              size={18}
              color={lightColors.icon}
              onPress={() => setSearchQuery('')}
              testID="search-clear"
            />
          )}
        </View>
      </View>

      {/* Category chips */}
      <FlatList
        horizontal
        data={serviceCategories}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        style={styles.categoryRow}
        renderItem={({ item }) => {
          const isActive = activeCategory === item.id;
          return (
            <View
              style={[styles.categoryChip, isActive && styles.categoryChipActive]}
            >
              <Text
                style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}
                onPress={() => setActiveCategory(item.id)}
              >
                {item.label}
              </Text>
            </View>
          );
        }}
      />

      {/* Services list */}
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ServiceCard service={item} onPress={handleServicePress} testID={`svc-${item.id}`} />
        )}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + spacing.xl }]}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search" size={40} color={lightColors.textTertiary} />
            <Text style={styles.emptyText}>No services found</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: lightColors.background },
  header: {
    backgroundColor: lightColors.surface,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: lightColors.border,
    ...Platform.select({ android: { elevation: 4 }, default: {} }),
  },
  title: { ...textStyles.headlineSmall, color: lightColors.textPrimary, fontWeight: '800' },
  subtitle: { ...textStyles.bodySmall, color: lightColors.textSecondary, marginBottom: spacing.md },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightColors.surfaceVariant,
    borderRadius: borderRadius.md as number,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  searchIcon: { marginRight: spacing.sm },
  searchInput: {
    flex: 1,
    ...textStyles.bodyMedium,
    color: lightColors.textPrimary,
  },
  categoryRow: {
    backgroundColor: lightColors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: lightColors.border,
  },
  categoryList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: lightColors.border,
    backgroundColor: lightColors.surface,
    marginRight: spacing.xs,
  },
  categoryChipActive: {
    backgroundColor: lightColors.primary,
    borderColor: lightColors.primary,
  },
  categoryChipText: {
    ...textStyles.bodySmall,
    color: lightColors.textSecondary,
    fontWeight: '500',
  },
  categoryChipTextActive: { color: lightColors.white, fontWeight: '700' },
  listContent: { padding: spacing.lg },
  emptyState: { alignItems: 'center', paddingTop: spacing.xxxl, gap: spacing.md },
  emptyText: { ...textStyles.bodyMedium, color: lightColors.textTertiary },
});

export default ServicesScreen;
