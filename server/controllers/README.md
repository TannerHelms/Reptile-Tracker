# Controllers

## Reptiles Controller

### Creating A New Reptile
**Endpoint:** ```/reptile/```

**Method:** ```POST```

**Description:** Creates a new reptile.  Output contains a new reptile object or an error.

**Input:**
```json
{
  "species": "String (Species of the reptile)",
  "name": "String (Name of the reptile)",
  "sex": "String (Sex of the reptile, 'm' or 'f')"
}
```
**Output:**
```json
{
  "reptile?",
  "error?"
}
```

### Getting a Specific Reptile By Id
**Endpoint:** ```/reptiles/:reptileId```

**Method:** ```GET```

**Description:** Given a reptile ID, this endpoint returns the corresponding reptile from the database or returns an error if it does not exist. The output will only contain either a reptile or an error.
**Input:**
```json
{
  "id": "Integer (Reptile ID)"
}
```
**Output:**
```json
{
  "reptile?",
  "error?"
}
```

### Getting All Reptiles
**Endpoint:** ```/reptile/```

**Method:** ```GET```

**Description:** Retrieves all reptiles of the authenticated user. Output will be a list of reptile objects that may or may not be empty, or it be an error.

**Input:** ```None```

**Output:**
```json
{
  "reptiles?": [
    {"reptile"}
  ],
  "error?"
}
```

### Updating a Specific Reptile By Id
**Endpoint:** ```/reptile/:reptileId```

**Method:** ```PUT```

**Description:** Updates a specific reptile by its ID. Returns a reptile object or an error

**Input:**
```json
{
  "reptileId": "Integer (Reptile ID)",
  "species": "String (Species of the reptile)",
  "name": "String (Name of the reptile)",
  "sex": "String (Sex of the reptile, 'm' or 'f')"
}
```

**Output:**
```json
{
  "updatedReptile?",
  "error?"
}
```

### Deleting a Specific Reptile By Id
**Endpoint:** ```/reptile/:reptileId```

**Method:** ```DELETE```

**Description:** Deletes a specific reptile by its ID. May return an error if one arises, otherwise nothing.

**Input:**
```json
{
  "reptileId": "Integer (Reptile ID)"
}
```

**Output:**
```json
{
  "error?"
}

```


### 
**Endpoint:** ```/reptile/```

**Method:** ``` ```

**Description:** 

**Input:**
```json
{
}
```

**Output:**
```json
{
}
```
