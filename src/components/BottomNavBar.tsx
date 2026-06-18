import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import { Feather } from '@expo/vector-icons';

interface BottomNavBarProps {
    activeTab: 'home' | 'discovery' | 'wallet' | 'profile';
    onTabPress: (tab: 'home' | 'discovery' | 'wallet' | 'profile') => void;
    onBack?: () => void;
    profilePicture?: string | null;
}

const BottomNavBar = ({ activeTab, onTabPress, onBack, profilePicture }: BottomNavBarProps) => {
    const insets = useSafeAreaInsets();

    const handlePress = (tab: 'home' | 'discovery' | 'wallet' | 'profile') => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onTabPress(tab);
    };

    const handleBack = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onBack?.();
    };

    return (
        <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}>
            {onBack && (
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={handleBack}
                >
                    <Text style={styles.backIcon}>←</Text>
                    <Text style={styles.navText}>Back</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => handlePress('home')}
            >
                <Feather 
                    name="users" 
                    size={22} 
                    color={activeTab === 'home' ? '#2563eb' : '#9ca3af'} 
                    style={{ marginBottom: 4 }} 
                />
                <Text style={[styles.navText, activeTab === 'home' && styles.activeText]}>My Groups</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => handlePress('discovery')}
            >
                <Feather 
                    name="search" 
                    size={22} 
                    color={activeTab === 'discovery' ? '#2563eb' : '#9ca3af'} 
                    style={{ marginBottom: 4 }} 
                />
                <Text style={[styles.navText, activeTab === 'discovery' && styles.activeText]}>Explore</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => handlePress('wallet')}
            >
                <Feather 
                    name="credit-card" 
                    size={22} 
                    color={activeTab === 'wallet' ? '#2563eb' : '#9ca3af'} 
                    style={{ marginBottom: 4 }} 
                />
                <Text style={[styles.navText, activeTab === 'wallet' && styles.activeText]}>Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => handlePress('profile')}
            >
                {profilePicture ? (
                    <Image
                        source={{ uri: profilePicture }}
                        style={[styles.profilePic, activeTab === 'profile' && styles.activeProfilePic]}
                        transition={200}
                    />
                ) : (
                    <Feather 
                        name="user" 
                        size={22} 
                        color={activeTab === 'profile' ? '#2563eb' : '#9ca3af'} 
                        style={{ marginBottom: 4 }} 
                    />
                )}
                <Text style={[styles.navText, activeTab === 'profile' && styles.activeText]}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        paddingTop: 12,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 10,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navIcon: {
        fontSize: 22,
        marginBottom: 4,
        opacity: 0.5,
    },
    backIcon: {
        fontSize: 22,
        marginBottom: 4,
        color: '#2563eb',
        fontWeight: 'bold',
    },
    activeIcon: {
        opacity: 1,
    },
    navText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#6b7280',
    },
    activeText: {
        color: '#2563eb',
    },
    profilePic: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginBottom: 4,
        opacity: 0.5,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    activeProfilePic: {
        opacity: 1,
        borderColor: '#2563eb',
    },
});

export default BottomNavBar;
