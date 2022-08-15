import { TCP } from '@libp2p/tcp'
import { WebSockets } from '@libp2p/websockets'
import { Mplex } from '@libp2p/mplex'
import { Noise } from '@chainsafe/libp2p-noise'
import defaultsDeep from '@nodeutils/defaults-deep'
import { createLibp2p as create } from 'libp2p'
import { Bootstrap } from '@libp2p/bootstrap'
import { MulticastDNS } from '@libp2p/mdns'
import { KadDHT } from '@libp2p/kad-dht'

let bootstrapers = [
  '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
  '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
  '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
  '/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp',
  '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
  '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
];

export async function createLibp2p(_options) {
  const defaults = {
    transports: [
      new TCP(),
      new WebSockets()
    ],
    streamMuxers: [
      new Mplex()
    ],
    connectionEncryption: [
      new Noise()
    ],
    peerDiscovery: [
      new Bootstrap({
        interval: 60e3,
        list: bootstrapers
      }),
      new MulticastDNS({
        interval: 20e3
      })
    ],
    dht: new KadDHT()
  }

  let node = await create(defaultsDeep(_options, defaults));
  return node;
}
