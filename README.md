

The main aim of this application is to allow users across the world to be able to translate strings
for the international application. The available languages are listed below. You must design and 
implement a UI that will allow users to easily manage the translation of languages.

To get started please create a branch or fork this repo with your name as the branch name. 

## Core Task's

+ `GET` the full listing of language codes [`en`, `ga`, `no`].
+ Implement a language switcher dropdown to select which language you want to work on.
+ Get the available translations for the selected language and display it 
  via a table (or another alternative its up to you) -> `GET`.
+ If a translation is missing in either english or the selected language we need a way to update this --> `POST`.
+ Provide a means of editing and saving a translation in the table -> `POST`.
+ Display feedback for a user upon success/error for a translation -> `POST`.

## Bonus Task's

+ Implement table pagination.
+ Implement a table search bar.
+ Style the page and table to a real world application standard.
+ Surprise us! At VSWare we value creativity, so throw a little something extra into the pot.

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
http://localhost:5000/api/codes
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
http://localhost:5000/api/en
```

#### Response: Success

```json
[
  {
    "en": {
      "key": "some_key",
      "value": "dc test pop remove",
      "file": "messages_en.properties",
      "id": 6855413
    }
  }
]
```
In this example we can see it has a norweigan translation but no english translation
```json
{
  "en": {
    "key": "attendance.markteachinggroup.saveforothersessionsheader",
    "value": "",
    "file": "messages_en.properties",
    "id": 41406
  },
  "no": {
    "key": "attendance.markteachinggroup.saveforothersessionsheader",
    "value": "Save for other sessions",
    "file": null,
    "id": 68709
  }
},
```
```sh
http://localhost:3000/api/no
```
In this example we can see it has a english translation but no norweigan meaning the norweigan translation is
missing and must be added
```json
{
  "en": {
    "key": "attendance.markteachinggroup.saveforothersessionsheader",
    "value": "",
    "file": "messages_en.properties",
    "id": 41406
  },
  "no": {
    "key": "attendance.markteachinggroup.saveforothersessionsheader",
    "value": "",
    "file": null,
    "id": 68709
  }
},
```

### Method: POST
```sh
http://localhost:5000/api/newTranslation
```
#### Request Params Required

```json
{
  "key": "string upto 500 chars",
  "value": "massive text value",
  "filename": "filename up to 250 chars",
  "language": "filename up to 250 chars"
}
```

#### Response Success

`Http Code: 200`

```json
{
  "key": "string upto 500 chars",
  "value": "massive text value",
  "filename": "filename up to 250 chars",
  "language": "filename up to 250 chars"
}
```
Don't worry if this doesn't reflect on the table, it's only a mock api and as such won't be adding / removing items from the arrays.
