import 'react-native-get-random-values';
import '@walletconnect/react-native-compat';

import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  createAppKit,
  AppKitProvider,
  AppKit,
  useAppKit,
  useAccount,
} from '@reown/appkit-react-native';

import {EthersAdapter} from '@reown/appkit-ethers-react-native';
import {baseSepolia} from 'viem/chains';

const projectId = process.env.EXPO_PUBLIC_REOWN_PROJECT_ID;

const metadata = {
  name: 'Base Wallet App',
  description: 'Base Sepolia wallet connection test',
  url: 'https://example.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

const storage = {
  getItem: async (key) => {
    return AsyncStorage.getItem(key);
  },
  setItem: async (key, value) => {
    return AsyncStorage.setItem(key, value);
  },
  deleteItem: async (key) => {
    return AsyncStorage.removeItem(key);
  },
};

const ethersAdapter = new EthersAdapter();

createAppKit({
  projectId,
  metadata,
  networks: [baseSepolia],
  defaultNetwork: baseSepolia,
  adapters: [ethersAdapter],
  storage,
  themeMode: 'dark',
  debug: true,
});

function WalletScreen() {
  const {open} = useAppKit();
  const {address, isConnected} = useAccount();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Base Wallet App</Text>

      <Text style={styles.network}>Base Sepolia</Text>

      {isConnected ? (
        <>
          <Text style={styles.status}>Wallet Connected ✅</Text>

          <Text style={styles.address}>
            {address}
          </Text>

          <Button
            title="Open Wallet"
            onPress={() => open()}
          />
        </>
      ) : (
        <>
          <Text style={styles.status}>Wallet Not Connected</Text>

          <Button
            title="Connect Wallet"
            onPress={() => open()}
          />
        </>
      )}

      <AppKit />
    </View>
  );
}

export default function App() {
  return (
    <AppKitProvider>
      <WalletScreen />
    </AppKitProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  network: {
    color: '#aaaaaa',
    fontSize: 17,
    marginBottom: 30,
  },

  status: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 16,
  },

  address: {
    color: '#cccccc',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
  },
});