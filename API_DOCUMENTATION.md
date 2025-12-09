
# Taken Cafe Backend API Detailed Documentation

## Table of Contents
- [Overview](#overview)
- [WebSocket API](#websocket-api)
- [REST API](#rest-api)
- [Database Schema](#database-schema)

---

## Overview

The Taken Cafe backend provides both **WebSocket** and **REST API** endpoints for managing products, orders, and related entities. The WebSocket API is designed for real-time, bidirectional communication, while the REST API provides standard CRUD operations.

**Base URL**: `http://localhost:8005`

---

## WebSocket API

### Connection Endpoint

```
ws://localhost:8005/backend/ws/{session_name}
```

**Parameters**:
- `session_name` (path): Unique session identifier (e.g., `table-7-session`)

**Description**: Establishes a WebSocket connection for real-time communication. All messages must be JSON formatted with a `type` field.

---

### WebSocket Events

#### 1. Products Event

**Request Message**:
```json
{
  "type": "products"
}
```

**Response**:
```json
{
  "type": "products_list",
  "categories": [
    {
      "id": 1,
      "name": "Coffee",
      "position": 1
    },
    {
      "id": 2,
      "name": "Iced",
      "position": 2
    }
  ],
  "selected_category": {
    "id": 1,
    "name": "Coffee",
    "position": 1
  },
  "data": [
    {
      "product_id": "P001",
      "name": "Classic Cappuccino",
      "description": "A rich and creamy cappuccino",
      "category_id": 1,
      "ingredients": "Espresso, Steamed Milk, Milk Foam",
      "price": 450.0,
      "image": "cappuccino.jpg",
      "is_available": true
    }
  ],
  "count": 1
}
```

**Description**: 
- Fetches all categories ordered by position
- Returns products from the category with `position = 1`
- Includes full category list for navigation

---

**Request Message (Specific Category)**:
```json
{
  "type": "products",
  "category_id": 3
}
```

**Response**:
```json
{
  "type": "products_list",
  "selected_category": {
    "id": 3,
    "name": "Macha",
    "position": 3
  },
  "data": [
    {
      "product_id": "P015",
      "name": "Matcha Latte",
      "description": "Premium matcha green tea",
      "category_id": 3,
      "ingredients": "Matcha Powder, Milk",
      "price": 500.0,
      "image": "matcha.jpg",
      "is_available": true
    }
  ],
  "count": 1
}
```

**Description**: Fetches products for a specific category by ID.

---

#### 2. Product Versions Event

**Request Message**:
```json
{
  "type": "product_versions",
  "product_id": "P001"
}
```

**Response**:
```json
{
  "type": "product_versions_list",
  "product_id": "P001",
  "data": [
    {
      "version_id": "V001",
      "product_id": "P001",
      "version_detail": "Small",
      "version_price": 400.0
    },
    {
      "version_id": "V002",
      "product_id": "P001",
      "version_detail": "Large",
      "version_price": 550.0
    }
  ],
  "count": 2
}
```

**Description**: Fetches all versions (sizes/variations) for a specific product.

---

#### 3. Product Addons Event

**Request Message**:
```json
{
  "type": "product_addons",
  "product_id": "P001"
}
```

**Response**:
```json
{
  "type": "product_addons_list",
  "product_id": "P001",
  "data": [
    {
      "addon_id": "A001",
      "product_id": "P001",
      "addon_name": "Extra Espresso Shot",
      "addon_details": "Add one extra shot of espresso",
      "addon_price": 50.0
    },
    {
      "addon_id": "A002",
      "product_id": "P001",
      "addon_name": "Vanilla Syrup",
      "addon_details": "Add vanilla flavored syrup",
      "addon_price": 40.0
    }
  ],
  "count": 2
}
```

**Description**: Fetches all available addons for a specific product.

---

#### 4. Order Creation Event

**Request Message**:
```json
{
  "type": "order",
  "session_name": "table-7-session",
  "items": [
    {
      "product_id": "P001",
      "version_id": "V002",
      "addon_id": "A001",
      "quantity": 2,
      "price": 600.0
    },
    {
      "product_id": "P005",
      "version_id": "V010",
      "quantity": 1,
      "price": 250.0
    }
  ]
}
```

**Response**:
```json
{
  "type": "order_created",
  "order_id": 123,
  "session_name": "table-7-session",
  "total_price": 1450.0,
  "status": "pending",
  "created_at": "2025-11-19T10:30:00.000000",
  "items": [
    {
      "product_id": "P001",
      "version_id": "V002",
      "addon_id": "A001",
      "quantity": 2,
      "price": 600.0
    },
    {
      "product_id": "P005",
      "version_id": "V010",
      "quantity": 1,
      "price": 250.0
    }
  ]
}
```

**Description**: Creates a new order with multiple items and calculates total price.

---

#### 5. Order Delivered Event

**Request Message**:
```json
{
  "type": "order_delivered",
  "order_id": 123
}
```

**Response**:
```json
{
  "type": "order_delivered",
  "order_id": 123,
  "status": "delivered",
  "delivered_at": "2025-11-19T11:00:00.000000"
}
```

**Description**: Updates order status to "delivered" and records delivery timestamp.

---

#### Error Response

**Response**:
```json
{
  "type": "error",
  "message": "Error description here"
}
```

**Common Errors**:
- Missing required fields (`product_id`, `order_id`, etc.)
- Invalid JSON format
- Resource not found (product, category, order)
- Unknown event type

---


## REST API

### Authentication & User Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "yourpassword",
  "full_name": "User Name"
}
```
**Response:** `201 Created`  
Registers a new user.

#### Login (JWT)
```http
POST /auth/login
Content-Type: application/x-www-form-urlencoded

username=user@example.com&password=yourpassword
```
**Response:**
```json
{
  "access_token": "JWT_TOKEN",
  "token_type": "bearer"
}
```
Returns a JWT token for authentication.

#### Logout
```http
POST /auth/logout
Authorization: Bearer <token>
```
**Response:**  
Confirms logout (client should delete token).

#### Change Password
```http
POST /auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "old_password": "oldpass",
  "new_password": "newpass"
}
```
**Response:**  
Password changed confirmation.

#### Request Password Reset
```http
POST /auth/request-password-reset
Content-Type: application/json

{
  "email": "user@example.com"
}
```
**Response:**  
Password reset instructions (demo returns token).

#### Reset Password
```http
POST /auth/reset-password
Content-Type: application/json

{
  "email": "user@example.com",
  "reset_token": "token",
  "new_password": "newpass"
}
```
**Response:**  
Password reset confirmation.

---


### Products Endpoints

#### 1. Get All Products

```http
GET /products?skip=0&limit=100&category=Coffee
GET /products?skip=0&limit=100&category=1
```

**Query Parameters**:
- `skip` (optional): Number of records to skip (default: 0)
- `limit` (optional): Maximum records to return (default: 100)
- `category` (optional): Filter by category name (e.g., "Coffee") or category ID (e.g., `1`).

**Description**: Supports filtering by either category name (string) or category ID (integer). The backend will automatically detect and filter accordingly.

**Response**: `200 OK`
```json
[
  {
    "product_id": "P001",
    "name": "Classic Cappuccino",
    "description": "A rich and creamy cappuccino",
    "category_id": 1,
    "ingredients": ["Espresso", "Steamed Milk", "Milk Foam"],
    "price": 450.0,
    "image": "cappuccino.jpg",
    "is_available": true
  }
]
```

---

#### 2. Get Products with Relations

```http
GET /products-with-relations
```

**Description**: Returns all products with their associated addons and versions, excluding image data. Category is returned as name instead of ID. Ingredients are returned as a list of strings.

**Response**: `200 OK`
```json
[
  {
    "name": "Classic Cappuccino",
    "description": "A rich and creamy cappuccino",
    "category": "Coffee",
    "ingredients": ["Espresso", "Steamed Milk", "Milk Foam"],
    "product_price": 450.0,
    "is_available": true,
    "addons": [
      {
        "addon_name": "Extra Espresso Shot",
        "addon_details": "Add one extra shot of espresso",
        "addon_price": 50.0
      }
    ],
    "versions": [
      {
        "version_detail": "Small",
        "version_price": 400.0
      },
      {
        "version_detail": "Large",
        "version_price": 550.0
      }
    ]
  }
]
```

---

#### 3. Get Single Product

```http
GET /products/{product_id}
```

**Path Parameters**:
- `product_id`: Product identifier (string)

**Response**: `200 OK` or `404 Not Found`

---

#### 4. Create Product

```http
POST /products
Content-Type: application/json

{
  "name": "New Coffee",
  "description": "Description here",
  "category_id": 1,
  "ingredients": ["Coffee beans", "Water"],
  "price": 300.0,
  "image": "coffee.jpg",
  "is_available": true
}
```

**Response**: `201 Created`

---

#### 5. Update Product

```http
PUT /products/{product_id}
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 350.0,
  "is_available": false
}
```

**Response**: `200 OK` or `404 Not Found`

---

#### 6. Delete Product

```http
DELETE /products/{product_id}
```

**Response**: `204 No Content` or `404 Not Found`

---

#### 7. Get Products by Category

```http
GET /products/category/{category}
GET /products/category/{category_id}
```

**Path Parameters**:
- `category`: Category name (e.g., "Coffee", "Iced") or category ID (e.g., `1`).

**Description**: Supports filtering by either category name or category ID in the path parameter.

**Response**: `200 OK`

---
---

### Product Addons Endpoints

#### 1. Get All Addons

```http
GET /product_addons?skip=0&limit=100
```

**Response**: `200 OK`

---

#### 2. Get Single Addon

```http
GET /product_addons/{addon_id}
```

**Response**: `200 OK` or `404 Not Found`

---

#### 3. Get Addons by Product

```http
GET /product_addons/by_product/{product_id}
```

**Description**: Returns all addons for a specific product.

**Response**: `200 OK` or `404 Not Found`

---

#### 4. Create Addon

```http
POST /product_addons
Content-Type: application/json

{
  "product_id": "P001",
  "addon_name": "Extra Shot",
  "addon_details": "Additional espresso shot",
  "price": 50.0
}
```

**Response**: `201 Created`

---

#### 5. Update Addon

```http
PUT /product_addons/{addon_id}
Content-Type: application/json

{
  "addon_name": "Updated Name",
  "price": 60.0
}
```

**Response**: `200 OK` or `404 Not Found`

---

#### 6. Delete Addon

```http
DELETE /product_addons/{addon_id}
```

**Response**: `204 No Content` or `404 Not Found`

---

### Product Versions Endpoints

#### 1. Get All Versions

```http
GET /product_versions?skip=0&limit=100
```

**Response**: `200 OK`

---

#### 2. Get Single Version

```http
GET /product_versions/{version_id}
```

**Response**: `200 OK` or `404 Not Found`

---

#### 3. Get Versions by Product

```http
GET /product_versions/by_product/{product_id}
```

**Description**: Returns all versions (sizes) for a specific product.

**Response**: `200 OK` or `404 Not Found`

---

#### 4. Create Version

```http
POST /product_versions
Content-Type: application/json

{
  "product_id": "P001",
  "version_detail": "Medium",
  "price": 475.0
}
```

**Response**: `201 Created`

---

#### 5. Update Version

```http
PUT /product_versions/{version_id}
Content-Type: application/json

{
  "version_detail": "Extra Large",
  "price": 600.0
}
```

**Response**: `200 OK` or `404 Not Found`

---

#### 6. Delete Version

```http
DELETE /product_versions/{version_id}
```

**Response**: `204 No Content` or `404 Not Found`

---

## Database Schema

### Categories Table
```sql
- id: INTEGER (Primary Key, Auto-increment)
- name: VARCHAR(100) (Unique, Indexed)
- position: INTEGER (Nullable)
```

**Category Mapping**:
- 1: Coffee
- 2: Iced
- 3: Macha
- 4: Snacks
- 5: Seasonal
- 6: Chillers
- 7: Custom

---

### Products Table
```sql
- product_id: VARCHAR (Primary Key)
- name: VARCHAR(100) (Unique, Indexed)
- description: TEXT
- category_id: INTEGER (Foreign Key → categories.id)
- ingredients: TEXT
- product_price: FLOAT (Default: 0.0)
- quantity: INTEGER
- image: VARCHAR(255)
- is_available: BOOLEAN (Default: true)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

---

### Product Versions Table
```sql
- version_id: VARCHAR (Primary Key)
- product_id: VARCHAR (Foreign Key → products.product_id)
- version_detail: VARCHAR(100) (e.g., "Small", "Large")
- version_price: FLOAT (Default: 0.0)
```

---

### Product Addons Table
```sql
- addon_id: VARCHAR (Primary Key)
- product_id: VARCHAR (Foreign Key → products.product_id)
- addon_name: VARCHAR(100)
- addon_details: VARCHAR(255)
- addon_quantity: INTEGER
- addon_price: FLOAT (Default: 0.0)
```

---

### Orders Table
```sql
- id: INTEGER (Primary Key, Auto-increment)
- session_name: VARCHAR
- status: VARCHAR (e.g., "pending", "delivered")
- total_price: FLOAT
- created_at: TIMESTAMP
- delivered_at: TIMESTAMP (Nullable)
```

---

### Order Items Table
```sql
- id: INTEGER (Primary Key, Auto-increment)
- order_id: INTEGER (Foreign Key → orders.id)
- product_id: VARCHAR (Foreign Key → products.product_id)
- version_id: VARCHAR (Foreign Key → product_versions.version_id)
- addon_id: VARCHAR (Foreign Key → product_addons.addon_id, Nullable)
- quantity: INTEGER
- price: FLOAT
```

---

## Event Handler Architecture

### Event Router (`events.py`)

The central router uses a registry pattern to map event types to handlers:

```python
EVENT_HANDLERS = {
    "products": handle_products_event,
    "product_versions": handle_product_versions_event,
    "product_addons": handle_product_addons_event,
    "order": handle_orders_event,
    "order_delivered": handle_order_delivered_event,
}
```

**Adding New Event Handlers**:
1. Create handler function in appropriate event file
2. Register in `EVENT_HANDLERS` dictionary
3. Handler signature: `async def handler(websocket: WebSocket, db: Session, message: dict)`

---

## Error Handling

### WebSocket Errors
- All errors return `{"type": "error", "message": "Error description"}`
- Connection errors log to console and close WebSocket
- Invalid JSON returns parse error

### REST API Errors
- `400 Bad Request`: Invalid input data
- `404 Not Found`: Resource doesn't exist
- `422 Unprocessable Entity`: Validation errors (Pydantic)

---

## Best Practices

### WebSocket Usage
1. Always include `type` field in messages
2. Handle connection drops gracefully
3. Validate all incoming data before processing
4. Use structured error responses

### REST API Usage
1. Use pagination (`skip`/`limit`) for large datasets
2. Use `/products-with-relations` for complete product data
3. Filter by category when possible to reduce payload size
4. Check `is_available` flag before displaying products

### Database Operations
1. All foreign keys are properly indexed
2. Use relationships for eager loading (`.options(joinedload())`)
3. Category names are resolved via mapping or relationship
4. Timestamps are auto-managed by SQLAlchemy

---

## Example Client Code

### WebSocket Client (JavaScript)
```javascript
const ws = new WebSocket('ws://localhost:8005/backend/ws/table-7-session');

ws.onopen = () => {
  // Request products
  ws.send(JSON.stringify({ type: 'products' }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'products_list') {
    console.log('Categories:', data.categories);
    console.log('Products:', data.data);
  }
};

// Create order
ws.send(JSON.stringify({
  type: 'order',
  session_name: 'table-7-session',
  items: [
    { product_id: 'P001', version_id: 'V002', quantity: 1, price: 550 }
  ]
}));
```

### REST API Client (Python)
```python
import requests

# Get all products
response = requests.get('http://localhost:8005/products')
products = response.json()

# Get products with relations
response = requests.get('http://localhost:8005/products-with-relations')
products_full = response.json()

# Create product
new_product = {
    'name': 'New Coffee',
    'category_id': 1,
    'price': 300.0,
    'is_available': True
}
response = requests.post('http://localhost:8005/products', json=new_product)
```

---


# <span style="color:red">Events API </span>

#### <span style="color:red">Get All Events</span>
```http
GET /events/
```
**Response:** 200 OK
Returns all events in the database (past and future).

**Schema Example:**
```json
[
  {
    "id": 1,
    "ticketmaster_id": "TM123",
    "event_type": "concert",
    "name": "Jazz Night",
    "url": "https://ticketmaster.com/event/123",
    "image_url": "jazz.jpg",
    "status": "active",
    "event_date": "2025-12-10",
    "event_datetime": "2025-12-10T19:00:00",
    "event_end_date": "2025-12-10",
    "event_end_time": "22:00",
    "event_end_datetime": "2025-12-10T22:00:00",
    "event_start_date": "2025-12-10",
    "event_start_datetime": "2025-12-10T19:00:00",
    "total_shows": 1,
    "start_date": "2025-12-10",
    "start_time": "19:00",
    "start_datetime": "2025-12-10T19:00:00",
    "end_date": "2025-12-10",
    "end_time": "22:00",
    "end_datetime": "2025-12-10T22:00:00",
    "venue": {"name": "Cafe Venue", "address": "123 Main St"},
    "category": ["Music", "Jazz"],
    "price_range": {"min": 100, "max": 500},
    "description": "A night of jazz music.",
    "audience": ["adults"],
    "shows": [],
    "latitude": 25.1105,
    "longitude": 55.2447,
    "created_at": "2025-12-01T10:00:00",
    "updated_at": "2025-12-01T10:00:00",
    "is_active": true,
    "last_synced_at": "2025-12-01T10:00:00"
  }
]
```

#### <span style="color:red">Get Upcoming Events</span>
```http
GET /events/upcoming
```
**Response:** 200 OK
Returns only events where `event_datetime` is in the future (upcoming events).

**Schema Example:**
```json
[
  {
    "id": 2,
    "ticketmaster_id": "TM456",
    "event_type": "theatre",
    "name": "Drama Play",
    "url": "https://ticketmaster.com/event/456",
    "image_url": "drama.jpg",
    "status": "active",
    "event_date": "2025-12-15",
    "event_datetime": "2025-12-15T20:00:00",
    "event_end_date": "2025-12-15",
    "event_end_time": "23:00",
    "event_end_datetime": "2025-12-15T23:00:00",
    "event_start_date": "2025-12-15",
    "event_start_datetime": "2025-12-15T20:00:00",
    "total_shows": 1,
    "start_date": "2025-12-15",
    "start_time": "20:00",
    "start_datetime": "2025-12-15T20:00:00",
    "end_date": "2025-12-15",
    "end_time": "23:00",
    "end_datetime": "2025-12-15T23:00:00",
    "venue": {"name": "Cafe Venue", "address": "123 Main St"},
    "category": ["Theatre"],
    "price_range": {"min": 150, "max": 600},
    "description": "A dramatic play.",
    "audience": ["all"],
    "shows": [],
    "latitude": 25.1105,
    "longitude": 55.2447,
    "created_at": "2025-12-01T10:00:00",
    "updated_at": "2025-12-01T10:00:00",
    "is_active": true,
    "last_synced_at": "2025-12-01T10:00:00"
  }
]
```

---

### Bundles API

#### Trigger Bundle Generation
- **Event-based:**  
  `POST /bundles/generate/events`
- **Expiry-based:**  
  `POST /bundles/generate/expiry`
- **Daily:**  
  `POST /bundles/generate/daily`



#### Generated Bundles

- **List:**  
  `GET /bundles/generated?status=pending&bundle_type=event/"expiry_standard"`
  
  **Response Example:**
  ```json
  [
    {
      "id": 42,
      "bundle_name": "Jazz Night Bundle",
      "bundle_type": "event",
      "product_ids": ["P001", "P002"],
      "product_names": ["Classic Cappuccino", "Matcha Latte"],
      "discount_percentage": 15,
      "bundle_strategy": "event-based",
      "event_name": "Jazz Night",
      "event_type": "concert",
      "status": "pending",
      "created_at": "2025-12-01T10:00:00",
      "valid_until": "2025-12-10T23:59:59",
      "original_price": 1000.0,
      "bundle_price": 850.0
    }
  ]
  ```

- **Get by ID:**  
  `GET /bundles/generated/{bundle_id}`
  
  **Response Example:**
  ```json
  {
    "id": 42,
    "bundle_name": "Jazz Night Bundle",
    "bundle_type": "event",
    "product_ids": ["P001", "P002"],
    "product_names": ["Classic Cappuccino", "Matcha Latte"],
    "discount_percentage": 15,
    "bundle_strategy": "event-based",
    "event_name": "Jazz Night",
    "event_type": "concert",
    "status": "pending",
    "created_at": "2025-12-01T10:00:00",
    "valid_until": "2025-12-10T23:59:59",
    "original_price": 1000.0,
    "bundle_price": 850.0
  }
  ```

- **Update:**  
  `PATCH /bundles/generated/{bundle_id}`
  
  **Request Example:**
  ```json
  {
    "discount_percentage": 20,
    "bundle_price": 800.0
  }
  ```
  **Response Example:**
  ```json
  {
    "id": 42,
    "bundle_name": "Jazz Night Bundle",
    "bundle_type": "event",
    "product_ids": ["P001", "P002"],
    "product_names": ["Classic Cappuccino", "Matcha Latte"],
    "discount_percentage": 20,
    "bundle_strategy": "event-based",
    "event_name": "Jazz Night",
    "event_type": "concert",
    "status": "pending",
    "created_at": "2025-12-01T10:00:00",
    "valid_until": "2025-12-10T23:59:59",
    "original_price": 1000.0,
    "bundle_price": 800.0
  }
  ```

- <span style="color:red">**Update Status:**</span>  
  <span style="color:red">`PATCH /bundles/generated/{bundle_id}/status`</span>

<span style="color:red">**Update Generated Bundle Status**</span>

```http
PATCH /bundles/generated/{bundle_id}/status?new_status=accepted&feedback_text=Great%20bundle&admin_id=admin123
```
**Query Parameters:**
- `new_status` (required): New status for the bundle (`pending`, `accepted`, `rejected`)
- `feedback_text` (optional): Feedback text for accepted/rejected bundles
- `admin_id` (optional): Admin identifier

**Response Example:**
```json
{
  "status": "success",
  "bundle_id": 42,
  "new_status": "accepted",
  "feedback_submitted": true
}
```

- **Delete:**  
  `DELETE /bundles/generated/{bundle_id}`
  
  **Response Example:**
  ```json
  {
    "status": "success",
    "message": "Bundle deleted",
    "bundle_id": 42
  }
  ```




#### Accepted Bundles

- **Accept Generated:**  
  `POST /bundles/accept/{bundle_id}`
  
  **Response Example:**
  ```json
  {
    "id": 101,
    "generated_bundle_id": 42,
    "bundle_name": "Jazz Night Bundle",
    "product_ids": ["P001", "P002"],
    "product_names": ["Classic Cappuccino", "Matcha Latte"],
    "discount_percentage": 15,
    "bundle_strategy": "event-based",
    "event_name": "Jazz Night",
    "event_type": "concert",
    "is_active": true,
    "valid_until": "2025-12-10T23:59:59",
    "original_price": 1000.0,
    "bundle_price": 850.0,
    "accepted_at": "2025-12-01T12:00:00",
    "updated_at": "2025-12-01T12:00:00"
  }
  ```

- **List Active:**  
  `GET /bundles/accepted/active`
  
  **Response Example:**
  ```json
  [
    {
      "id": 101,
      "generated_bundle_id": 42,
      "bundle_name": "Jazz Night Bundle",
      "product_ids": ["P001", "P002"],
      "product_names": ["Classic Cappuccino", "Matcha Latte"],
      "discount_percentage": 15,
      "bundle_strategy": "event-based",
      "event_name": "Jazz Night",
      "event_type": "concert",
      "is_active": true,
      "valid_until": "2025-12-10T23:59:59",
      "original_price": 1000.0,
      "bundle_price": 850.0,
      "accepted_at": "2025-12-01T12:00:00",
      "updated_at": "2025-12-01T12:00:00"
    }
  ]
  ```

- **Update:**  
  `PATCH /bundles/accepted/{bundle_id}`
  
  **Request Example:**
  ```json
  {
    "discount_percentage": 10,
    "is_active": false
  }
  ```
  **Response Example:**
  ```json
  {
    "id": 101,
    "generated_bundle_id": 42,
    "bundle_name": "Jazz Night Bundle",
    "product_ids": ["P001", "P002"],
    "product_names": ["Classic Cappuccino", "Matcha Latte"],
    "discount_percentage": 10,
    "bundle_strategy": "event-based",
    "event_name": "Jazz Night",
    "event_type": "concert",
    "is_active": false,
    "valid_until": "2025-12-10T23:59:59",
    "original_price": 1000.0,
    "bundle_price": 850.0,
    "accepted_at": "2025-12-01T12:00:00",
    "updated_at": "2025-12-01T13:00:00"
  }
  ```

- **Delete:**  
  `DELETE /bundles/accepted/{bundle_id}`
  
  **Response Example:**
  ```json
  {
    "status": "success",
    "message": "Bundle deleted",
    "bundle_id": 101
  }
  ```

- <span style="color:red">**Toggle Active:**</span>  
  <span style="color:red">`PATCH /bundles/accepted/{bundle_id}/toggle-active`</span>

<span style="color:red">**Toggle Accepted Bundle Active Status**</span>

```http
PATCH /bundles/accepted/{bundle_id}/toggle-active
```
**Response Example:**
```json
{
  "status": "success",
  "bundle_id": 101,
  "is_active": false
}
```

---

### Bundle Feedback API

- **Submit Feedback:**  
  `POST /feedback/`
- **List Feedback:**  
  `GET /feedback/`
- **Feedback Summary:**  
  `GET /feedback/summary`
- **Feedback for Bundle:**  
  `GET /feedback/bundle/{bundle_id}`

---





## Version History

- **v1.0** (2025-11-19): Initial documentation
  - WebSocket events for products, versions, addons, orders
  - REST API for full CRUD operations
  - Category relationship integration
  - Updated column naming conventions

---

## Support

For issues or questions, contact the development team or refer to the project repository.
