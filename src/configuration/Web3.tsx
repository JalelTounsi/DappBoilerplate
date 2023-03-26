import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ReactNode } from 'react'
import { infuraProvider } from 'wagmi/providers/infura'
import { NETWORKS, INFURA_KEY, SITE_NAME } from '../configuration/Config'
import React from 'react'


interface Props {
  children: ReactNode
}

const { chains, provider } = configureChains(NETWORKS, [infuraProvider({ apiKey: INFURA_KEY }), publicProvider()])

const { connectors } = getDefaultWallets({
  appName: SITE_NAME,
  chains,
})

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export function Web3Provider(props: Props) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider modalSize="compact" coolMode chains={chains}>
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
