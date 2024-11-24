# Method Documentation

## Overview
Methods are reusable components that execute a series of blocks in a defined order. Each method has unique properties and can contain multiple blocks for different operations.

## Method Properties

- `id`: Unique identifier for the method
- `name`: Name of the method (e.g., "GetOneUser")
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

> All blocks follow this base structure:
> ```json
>{
>  "id": "{md5}", // unique id for the block, for example: "e50bae469accca7efe4c9f8d8b84fbad"
>  "parentId": "{md5}", // or null
>  "type": "{blockType}", // for example: "RETURN_BLOCK" or several types in section below
>  "details": {...} // { spesific block details for every type }
> }
> ```

### Block Types

1. **Return Block** (`RETURN_BLOCK`)
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

1. **Declare Block** (`DECLARE_BLOCK`)
   - Declares variables for use in the method
   - Properties:
     - `variables`: Variable declaration details
       - `name`: Name of the variable
       - `type`: Data type of the variable
       - `value`: Initial value assigned to the variable
     - `nextId`: ID of the next block to execute
    > For example:
    > ```json
    >   {
    >     // ... base block structure
    >     "type": "DECLARE_BLOCK", 
    >     "details": {
    >       "variables": {
    >         "name": "var1",
    >         "type": "String", 
    >         "value": "test"
    >       },
    >       "nextId": "{md5}" // id of the next block to execute or can be null
    >     }
    >   }
    > ```

3. **Query Block** (`QUERY_BLOCK`)
   - Executes SQL queries
   - Properties:
     - `query`: SQL query string
     - `mapping`: Parameter mapping
     - `datasourceId`: ID of the data source
     - `output`: Definition of query output
       - `variable`: Name of the output variable
       - `type`: Output type (e.g., "OBJECT", "LIST")
     - `nextId`: ID of the next block to execute

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

This method:
1. Accepts a required integer parameter `id`
2. Queries the Users table for matching records
3. Returns the user object as a Custom type

## Best Practices

1. Always specify clear parameter names and types
2. Use meaningful variable names for query outputs
3. Ensure proper block connections using `nextId`
4. Consider transactional requirements
5. Validate parameter requirements