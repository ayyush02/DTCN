# Smart Contracts Documentation

## TimeCapsule.sol
- Stores the encrypted content and unlock time.
- Functions:
  - `unlock()`: Unlocks the capsule if time has passed.
  - `owner()`: Returns the owner of the capsule.

## TimeCapsuleRegistry.sol
- Manages all capsules.
- Functions:
  - `createCapsule()`: Deploys a new `TimeCapsule` contract.
  - `getCapsules()`: Returns all capsules owned by a user.
