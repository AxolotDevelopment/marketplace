import { BigInt, Address, ipfs } from '@graphprotocol/graph-ts'
import { LANDRegistry } from '../../entities/LANDRegistry/LANDRegistry'
import { NFT, Parcel } from '../../entities/schema'
import * as addresses from '../contract/addresses'

export function buildParcelFromNFT(nft: NFT): Parcel {
  let parcel = new Parcel(nft.id)
  let coordinates = decodeTokenId(nft.tokenId)

  parcel.x = coordinates[0]
  parcel.y = coordinates[1]
  parcel.tokenId = nft.tokenId
  parcel.owner = nft.owner
  return parcel
}

export function decodeTokenId(assetId: BigInt): BigInt[] {
  let address = Address.fromString(addresses.LANDRegistry)

  let registry = LANDRegistry.bind(address)
  let coordinate = registry.decodeTokenId(assetId)
  return [coordinate.value0, coordinate.value1]
}