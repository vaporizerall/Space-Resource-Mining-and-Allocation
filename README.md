# Space Resource Management System

## Overview
This Clarity smart contract system enables decentralized management of space missions and resources through two primary contracts:
- Mission Integration Contract
- Space Resource NFT Contract

## Mission Integration Contract
Manages the lifecycle of space missions with key features:
- Mission registration by contract owner
- Mission status tracking (planned, active, completed)
- Agency-specific mission management

### Key Functions
- `register-mission`: Create new mission with agency, resource target, and duration
- `start-mission`: Update mission status to active
- `complete-mission`: Update mission status to completed
- `get-mission`: Retrieve mission details

## Space Resource NFT Contract
Implements an NFT-based system for tracking space resources with:
- Resource metadata tracking
- Resource minting
- Resource transfer capabilities

### Key Functions
- `mint-resource`: Create new space resource NFT with metadata
- `transfer-resource`: Transfer resource ownership
- `get-resource-metadata`: Retrieve resource details
- `get-resource-owner`: Check current resource owner

## Error Handling
Consistent error management:
- `err-owner-only`: Unauthorized owner access
- `err-not-found`: Resource/mission not found
- `err-unauthorized`: Unauthorized action attempt

## Security Considerations
- Owner-only mission registration
- Agency-specific mission management
- Transfer restricted to current owner
