import React from 'react'
import { Badge, Flex, Text } from '@chakra-ui/react'
import { useBlockNumber, useNetwork } from 'wagmi'
import { LinkComponent } from './LinkComponent'

function GetNetworkColor(chain?: string) {
  if (chain === 'homestead') return 'green'
  if (chain === 'arbitrum') return 'blue'
  if (chain === 'optimism') return 'red'
  if (chain === 'polygon') return 'purple'
  if (chain === 'goerli') return 'yellow'
  if (chain === 'sepolia') return 'orange'
  return 'grey'
}
export function NetworkStatus() {
  const block = useBlockNumber({ watch: true })
  const network = useNetwork()
  const explorerUrl = network.chain?.blockExplorers?.default.url

  return (
    <Flex alignItems="center" gap={2}>
      <Badge colorScheme={GetNetworkColor(network.chain?.network)} fontSize="2xs">
        {network.chain?.name ?? 'Ethereum'}
      </Badge>

      {explorerUrl && (
        <LinkComponent href={explorerUrl}>
          <Text fontSize="2xs"># {block.data}</Text>
        </LinkComponent>
      )}
      {!explorerUrl && <Text fontSize="2xs"># {block.data}</Text>}
    </Flex>
  )
}