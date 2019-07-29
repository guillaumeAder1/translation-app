# Vsware FrontEnd Interview

## Core Task's

+ Sucessfully `GET` the full listing of language [`en`, `ga`, `no`].
+ Implement a language switcher dropdown.
+ Get the available translations for the selected languages and display it via a table (or another alternative its up to you) -> `GET`.
+ Enable the table to be editable for translation strings -> `POST`.
+ Display feedback for a user upon sucess/error for a translation -> `POST Feedback`.
+ Surpirse us! At VSWare we value creativity, so throw a little something extra into the pot.

## Bonus Task's

+ Implement table pagnation.
+ Implement a table search bar.
+ Style the page and table to a real world application standard.

## Setup

`npm install`

`npm start`

### Client

`http://localhost:3000`

### Server

`http://localhost:5000/api`

## API Calls

### Method: GET

#### Example -> Language Codes

```sh
http://localhost:3000/api/codes
```

#### Response: Success

```json
[
  {
    "id": 1,
    "language": "en"
  },
  {
    "id": 2,
    "language": "ga"
  },
  {
    "id": 3,
    "language": "no"
  },
  {
    "id": 4,
    "language": null
  }
]
```

#### Example -> Single code

```sh
http://localhost:3000/api/en
```

#### Response: Success

```json
[
  {
    "en": {
      "name": "0",
      "value": "dc test pop remove",
      "file": "messages_en.properties",
      "id": 6855413
    }
  }
]
```

### Method: POST
```sh
http://localhost:3000/api/newTranslation
```
#### Request Params Required

```json
{
  "property": "string upto 500 chars",
  "filename": "filename up to 250 chars",
  "language": "filename up to 250 chars",
  "textvalue": "massive text value"
}
```

#### Response Success

`Http Code: 200`

```json
{
  "property": "string upto 500 chars",
  "filename": "filename up to 250 chars",
  "language": "filename up to 250 chars",
  "textvalue": "massive text value"
}
```
