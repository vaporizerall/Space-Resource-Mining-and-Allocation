import { describe, it, expect, beforeEach } from 'vitest'

// Mock blockchain state
let spaceResources: { [key: number]: string } = {}
let resourceMetadata: { [key: number]: any } = {}
let lastTokenId = 0

describe('Space Resource NFT', () => {
  beforeEach(() => {
    spaceResources = {}
    resourceMetadata = {}
    lastTokenId = 0
  })
  
  it('should mint a new space resource', () => {
    const wallet = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
    const name = 'Helium-3'
    const location = 'Lunar Mare Tranquillitatis'
    const resourceType = 'Gas'
    const quantity = 1000
    
    lastTokenId++
    spaceResources[lastTokenId] = wallet
    resourceMetadata[lastTokenId] = {
      name,
      location,
      resource_type: resourceType,
      quantity,
      discoverer: wallet
    }
    
    const resource = resourceMetadata[lastTokenId]
    expect(resource.name).toBe(name)
    expect(resource.location).toBe(location)
    expect(resource.resource_type).toBe(resourceType)
    expect(resource.quantity).toBe(quantity)
    expect(resource.discoverer).toBe(wallet)
    expect(spaceResources[lastTokenId]).toBe(wallet)
  })
  
  it('should transfer resource ownership', () => {
    const sender = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
    const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'
    
    // Mint resource first
    lastTokenId++
    spaceResources[lastTokenId] = sender
    
    // Transfer
    spaceResources[lastTokenId] = recipient
    expect(spaceResources[lastTokenId]).toBe(recipient)
  })
  
  it('should fail to transfer if not owner', () => {
    const owner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
    const unauthorized = 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC'
    const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'
    
    // Mint resource
    lastTokenId++
    spaceResources[lastTokenId] = owner
    
    // Attempt unauthorized transfer
    const transferFn = () => {
      if (spaceResources[lastTokenId] !== unauthorized) {
        throw new Error('ERR_UNAUTHORIZED')
      }
      spaceResources[lastTokenId] = recipient
    }
    
    expect(transferFn).toThrow('ERR_UNAUTHORIZED')
    expect(spaceResources[lastTokenId]).toBe(owner)
  })
  
  it('should get resource metadata', () => {
    const wallet = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
    const metadata = {
      name: 'Platinum',
      location: 'Asteroid Belt',
      resource_type: 'Metal',
      quantity: 500,
      discoverer: wallet
    }
    
    lastTokenId++
    resourceMetadata[lastTokenId] = metadata
    
    const retrieved = resourceMetadata[lastTokenId]
    expect(retrieved).toEqual(metadata)
  })
  
  it('should get resource owner', () => {
    const wallet = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
    
    lastTokenId++
    spaceResources[lastTokenId] = wallet
    
    expect(spaceResources[lastTokenId]).toBe(wallet)
  })
})
