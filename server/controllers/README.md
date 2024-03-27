# Controllers

## Reptiles Controller

### Creating A New Reptile
**Endpoint:** ```/reptile/```

**Method:** ```POST```

**Description:** Creates a new reptile.  Output contains a new reptile object or an error.

**Body:**
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

**Body:**
```None```

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

**Body:** ```None```

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

**Body:**
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
  "updatedReptile?",
  "error?"
}
```

### Deleting a Specific Reptile By Id
**Endpoint:** ```/reptile/:reptileId```

**Method:** ```DELETE```

**Description:** Deletes a specific reptile by its ID. May return an error if one arises, otherwise nothing.

**Body:**
```None```

**Output:**
```json
{
  "error?"
}

```
## Feeding Controller

### Creating A New Feeding Record
**Endpoint:** ```/feedings/```

**Method:** ```Post```

**Description:** Creates a new feeding record for a reptile. Output contains a new feeding record object or an error.

**Body:**
```json
{
  "reptileId": "Integer (Reptile ID)",
  "foodItem": "String (Food item given to the reptile)"
}
```

**Output:**
```json
{
  "feeding?",
  "error?"
}
```

### Getting All Feedings for a Specific Reptile
**Endpoint:** ```/feedings/reptile/:repitleId```

**Method:** ```GET```

**Description:** Retrieves all feeding records for a specific reptile. Output will be a list of feeding record objects that may or may not be empty, or it may return an error.

**Body:**
```None```

**Output:**
```json
{
  "feedings?": [
    {"feeding"}
  ],
  "error?"
}
```

### Getting a Specific Feeding Record By Id
**Endpoint:** ```/feedings/:feedingId```

**Method:** ```GET```

**Description:** Given a feeding record ID, this endpoint returns the corresponding feeding record from the database or returns an error if it does not exist. The output will only contain either a feeding record or an error.

**Body:**
```None```

**Output:**
```json
{
  "feeding?",
  "error?"
}
```

### Updating a Specific Feeding Record By Id
**Endpoint:** ```/feedings/:feedingId```

**Method:** ```PUT```

**Description:** Updates a specific feeding record by its ID. Returns a feeding record object or an error.

**Body:**
```json
{
  "reptileId": "Integer (Reptile Id)",
  "foodItem": "String (Updated food item)"
}
```

**Output:**
```json
{
  "updatedFeeding?",
  "error?"
}
```

### Deleting a Specific Feeding Record By Id
**Endpoint:** ```/feedings/:feedingId```

**Method:** ```DELETE```

**Description:** Deletes a specific feeding record by its ID. May return an error if one arises, otherwise nothing.

**Body:**
```None```

**Output:**
```json
{
  "error?"
}
```


## Reptile Schedule Controller
### Getting Reptiles and Their Schedules for the Current Day
**Endpoint:** ```/reptiles-schedules```

**Method:** ```GET```

**Description:**  Retrieves reptiles and their schedules for the current day for a specific user. Returns an array of reptiles with their schedules the pertain to the day requested or an error.

**Body:**
```None```

**Output:**
```json
{
  "reptilesWithSchedules": [
    {
      // normal reptile
      "schedules": [ // the reptiles schedules
        {
          // normal schedule info
        }
      ]

      // mulitple items of the format above
    }
  ],
  "error": "String (Error message if any)"
}

```
