# API Documentation

## Endpoints

### 1. Create Capsule
**POST** `/api/capsules`
- **Body:** `{ "contentHash": "abc123", "unlockTime": 1710000000 }`
- **Response:** `{ "capsuleId": "0x123" }`

### 2. Get Capsule
**GET** `/api/capsules/:id`
- **Response:** `{ "owner": "0xabc", "contentHash": "abc123", "unlockTime": 1710000000 }`

### 3. Unlock Capsule
**POST** `/api/capsules/:id/unlock`
- **Response:** `{ "status": "unlocked", "content": "Hello Future!" }`
