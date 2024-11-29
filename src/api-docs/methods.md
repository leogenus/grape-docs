# Methods
Methods are reusable components that execute a series of blocks in a defined order. Each method has unique properties and can contain multiple blocks for different operations.

## Method Properties

- `id`: Unique identifier for the method
- `name`: Name of the method (e.g., *GetOneUser*)
- `state`: Current state of the method (e.g., "ACTIVE")
- `projectId`: ID of the project this method belongs to
- `parameters`: Input parameters required by the method
- `returnType`: Type of data returned by the method
- `transactional`: Boolean indicating if the method runs in a transaction
- `startBlockId`: ID of the first block to execute
- `blocks`: Array of execution blocks

### Parameters Structure
Parameters are defined as objects with the following properties:

```json
{
  "type": "Data type (e.g., Integer, String)",
  "required": "Boolean indicating if parameter is mandatory"
}
```

## Blocks

Blocks are the building units of a method. Each block has specific properties and types.
### Block Fields Documentation

Each block contains the following fields:

- `id`: Unique MD5 hash identifier for the block
  - Type: String
  - Required: Yes
  - Example: "e50bae469accca7efe4c9f8d8b84fbad"

- `parentId`: ID reference to parent block if nested
  - Type: String or null
  - Required: No
  - Example: "a72cf7853c4e9f0c12d5a9b8e7f3d621"

- `nextId`: ID reference to next block in execution sequence
  - Type: String or null
  - Required: No
  - Example: "b93df2164acd8e5b39f0c7a6d4e2f183"

- `type`: Specifies the block type
  - Type: String
  - Required: Yes
  - Example: "RETURN_BLOCK"
  - Must be one of defined block types

- `details`: Block type specific configuration
  - Type: Object
  - Required: Yes
  - Contains properties specific to each block type
  - Example: See block type examples above

> All blocks follow this base structure:
> ```json
>{
>  "id": "{md5}", // unique id for the block, for example: "e50bae469accca7efe4c9f8d8b84fbad"
>  "parentId": "{md5}", // or null
>  "nextId": "{md5}", // or null
>  "type": "{blockType}", // for example: "RETURN_BLOCK" or several types in section below
>  "details": {...} // { spesific block details for every type }
> }
> ```

## Block Types

### 1. **Return Block** 
   > Type: `RETURN_BLOCK`

   - Returns data from the method
   - Properties:
     - `type`: Return type (e.g., `VARIABLES` or `CONSTANT`)
     - `valueType`: Type of value being returned (e.g., `VALUE`, `OBJECT` or `RESOURCE`) 
     - `value`: The actual return value or variable name (e.g., "hello world", 42, {"success": true})
    > For example:
    > ```json
    >   {
    >     // ... base block structure
    >     "type": "RETURN_BLOCK", 
    >     "details": {
    >       "type": "CONSTANT",
    >       "valueType": "VALUE",
    >       "value": "Hello World"
    >     }
    >   }
    > ```

### 2. **Throw Block** 
   > Type: `THROW_BLOCK`

   - Throws an exception with a specified message
   - Properties:
     - `exception`: Type of exception to throw (e.g., "MESSAGE_EXCEPTION")
     - `message`: Exception message text
    > For example:
    > ```json
    >   {
    >     // ... base block structure
    >     "type": "THROW_BLOCK",
    >     "details": {
    >       "exception": "MESSAGE_EXCEPTION",
    >       "message": "Some Violation exception"
    >     }
    >   }
    > ```

### 3. **Try Catch Block** 
   > Type: `TRY_CATCH_BLOCK`

   - Handles exceptions with try/catch/finally blocks
   - Properties:
     - `tryId`: ID of the first block in try section
     - `exceptions`: Map of exception handlers
       - Key: Exception type (e.g., "MESSAGE_EXCEPTION")
       - Value: Exception handler configuration
         - `blockId`: ID of first block in catch section
         - `declare`: Variable declarations for caught exception
           - `throwsMessage`: Variable name to store exception message
     - `finallyId`: ID of first block in finally section (or null if no finally)
    > For example:
    > ```json
    >   {
    >     // ... base block structure
    >     "type": "TRY_CATCH_BLOCK",
    >     "details": {
    >       "tryId": "7f1671982462f360e844a3dd3d3fc99f",
    >       "exceptions": {
    >         "MESSAGE_EXCEPTION": {
    >           "blockId": "b2dff5f3b484ab58f0c834090994d4ce",
    >           "declare": {
    >             "throwsMessage": "message"
    >           }
    >         }
    >       },
    >       "finallyId": null
    >     }
    >   }
    > ```

### 4. **Declare Block**
   > Type: `DECLARE_BLOCK`

   - Declares variables for use in the method
   - Properties:
     - `variables`: Variable declaration details
       - `[key]`: Name of the variable
       - `[value]`: Name of the variable
         - `type`: Data type of the variable
         - `value`: Initial value assigned to the variable
    > For example:
    > ```json
    >   {
    >     // ... base block structure
    >     "type": "DECLARE_BLOCK", 
    >     "details": {
    >       "variables": {
    >         "name": {
    >           "type" : "String",
    >           "value": "Some Name"
    >         },
    >         "age": {
    >           "type" : "Integer",
    >           "value": 33
    >         }
    >       }
    >     }
    >   }
    > ```

### 5. **If Condition Block** 
   > Type: `IF_CONDITION`

   - Executes conditional logic based on comparison
   - Properties:
     - `comparison`: Configuration for the condition comparison
       - `leftSide`: Left operand of the comparison
         - `type`: Type of operand (e.g., "ARGS", "CONST_TEXT")
         - `value`: Value or reference for comparison
       - `rightSide`: Right operand of the comparison
         - `type`: Type of operand (e.g., "ARGS", "CONST_TEXT") 
         - `value`: Value or reference for comparison
       - `condition`: Type of comparison (e.g., "PRIMITIVE_EQUALS")
     - `thenBlockId`: ID of block to execute if condition is true
     - `elseBlockId`: ID of block to execute if condition is false
    > For example:
    > ```json
    >   {
    >     // ... base block structure
    >     "type": "IF_CONDITION",
    >     "details": {
    >       "comparison": {
    >         "leftSide": {
    >           "type": "ARGS",
    >           "value": "someVariable"
    >         },
    >         "rightSide": {
    >           "type": "CONST_TEXT",
    >           "value": "expectedValue"
    >         },
    >         "condition": "PRIMITIVE_EQUALS"
    >       },
    >       "thenBlockId": "ff4b3d74b00205ee05017b8ef9000a2a",
    >       "elseBlockId": "61c5e8b8d47ca1252475db86ecee0c52"
    >     }
    >   }
    > ```


### 6. **Query Block**
   > Type: `QUERY_BLOCK`

   - Executes SQL queries
   - Properties:
     - `query`: SQL query string (e.g., *"SELECT id, name FROM Users"*)
     - `mapping`: Parameter mapping object that maps query parameters to values
     - `datasourceId`: ID of the data source to execute query against
     - `output`: Definition of query output
       - `variable`: Name of the output variable to store results
       - `type`: Output type (e.g., "OBJECT" for single row, "LIST" for multiple rows)
    > For example:
    > ```json
    >   {
    >     // ... base block structure
    >     "type": "QUERY_BLOCK",
    >     "details": {
    >       "query": "SELECT * FROM Users WHERE name ilike '%' || :namejon || '%'  or :namejon IS NULL;",
    >       "mapping": {
    >         "namejon": "name"
    >       },
    >       "datasourceId": "85824035719d4aff95146bce36689cd9",
    >       "output": {
    >         "variable": "users",
    >         "type": "LIST"
    >       }
    >     }
    >   }
    > ```

### 7. **Query Execute Block**
   > Type: `QUERY_EXECUTE_BLOCK`

   - Executes SQL DML statements (UPDATE, INSERT, DELETE) with RETURNING clause
   - Properties:
     - `query`: SQL DML query string with RETURNING clause
     - `mapping`: Parameter mapping object that maps query parameters to values
     - `datasourceId`: ID of the data source to execute query against
     - `output`: Definition of query output from RETURNING clause
       - `variable`: Name of the output variable to store results
       - `type`: Output type (e.g., "OBJECT" for single row, "LIST" for multiple rows)
    > For example:
    > ```json
    >   {
    >     // ... base block structure
    >     "type": "QUERY_EXECUTE_BLOCK",
    >     "details": {
    >       "query": "UPDATE users SET name = :name, email = :email, age = :age WHERE id = :id RETURNING id, name, email, age, is_active as active;",
    >       "mapping": {
    >         "id": "id",
    >         "name": "name",
    >         "email": "email",
    >         "age": "age"
    >       },
    >       "datasourceId": "85824035719d4aff95146bce36689cd9",
    >       "output": {
    >         "variable": "saved",
    >         "type": "OBJECT"
    >       }
    >     }
    >   }
    > ```

### 8. **Http Execute Block**
   > Type: `HTTP_EXECUTE_BLOCK`
   > Under construction.

### 9. **Method Call Block** 
   > Type: `METHOD_CALL_BLOCK`
   > Under construction.

### 10. **File Save Block**
   > Type: `FILE_SAVE_BLOCK`
   > Under construction.
    
### 11. **File Read Block**
   > Type: `FILE_READ_BLOCK`
   > Under construction.

## Example Method

Here's a breakdown of the "GetOneUser" method:

```json
{
  "name": "GetOneUser",
  "parameters": {
    "id": {
      "type": "Integer",
      "required": true
    }
  },
  "returnType": "Custom",
  "blocks": [
    // Query Block: Fetches user data
    // Return Block: Returns the result
  ]
}
```

This method demonstrates key concepts from the documentation:

1. Parameter Definition:
   - Uses proper parameter structure with `type` and `required` fields
   - Accepts an `id` parameter of type Integer

3. Return Type:
   - Specifies Custom return type for the user object
   - Matches the query output configuration

Note: The `parentId` field is not explicitly mentioned in the provided documentation for individual blocks. It's typically used in more complex flow structures to establish parent-child relationships between blocks, but it's not a standard field for basic blocks like QUERY_BLOCK or RETURN_BLOCK.

## Best Practices

1. Parameter Definition
   - Use clear, descriptive parameter names (e.g., `id`)
   - Always specify `type` and `required` status in parameter objects

2. Block Structure
   - Maintain proper block connections via `nextId`
   - End flows with appropriate *RETURN_BLOCK*
   - Consider transaction boundaries if needed

3. Error Handling
   - Implement proper error handling mechanisms
   - Use try-catch blocks or error handling blocks as necessary

4. Performance Considerations
   - Optimize queries for efficiency
   - Use appropriate indexing in the database
   - Consider caching strategies for frequently accessed data