# API xampleapp
Api de notas para usuarios

## Metodos HTTP permitidos

|  Método  |              Descripción               |
| -------- | -------------------------------------- |
| `GET`    | Obtener un recurso o lista de recursos |
| `POST`   | Crear un recurso                       |
| `PUT`    | Actualizar un recurso                  |
| `DELETE` | Eliminar un recurso                    |

## Códigos de Respuesta

| Código |                         Descripción                          |
| ------ | ------------------------------------------------------------ |
| `200`  | Success                                                      |
| `201`  | Success - nuevo recurso creado.                              |
| `204`  | Success - no hay contenido para responder                    |
| `400`  | Bad Request - i.e. su solicitud no se pudo evaluar           |
| `401`  | Unauthorized - usuario no esta autenticado para este recurso |
| `404`  | Not Found - recurso no existe                                |
| `422`  | Unprocessable Entity - i.e. errores de validación            |
| `429`  | Limite de uso excedido, intente mas tarde                    |
| `500`  | Error de servidor                                            |
| `503`  | Servicio no disponible                                       |

# Group Auth service
Signup a user and login him to use all the resources in xampleapp-api.

## SignUp [/auth/signup]

### SignUp a new user [POST]

+ Request (application/json)

        {
            "user": "new user",
            "forename": "forename",
            "password": "user password"
        }

+ Response 201 (application/json)

        [
            {
                "user": "new user",
                "forename": "forename",
                "password": "user password",
                "id": "user id"
            }
        ]

## Login [/auth/login]

### Login a user [POST]

+ Request (application/json)

        {
            "user": "user",
            "password": "password"
        }

+ Response 200 (application/json)

        [
            {
                success: true,
                message: "Enjoy your token!",
                token: "token",
                userId: "user id"
            }
        ]

# Group User
Admin users to attach notes to they

---

**User attributes:**

- id `(Number)` : unique identifier. 
- user `(String)` : User Name.
- forename `(String)` : First Name.
- password `(String)` : password of the user.

---

## User collection [/apiv1/users]

### Retrieve all users [GET]

+ Request (application/json)

    + Header
        x-access-token: the token obtained from auth

+ Response 200 (application/json)

        {
            "ok": true,
            "users": [{
                "user": "user",
                "forename": "forename",
                "password": "password",
                "id" : "id"
            },
            {
                "user": "user",
                "forename": "forename",
                "password": "password",
                "id" : "id"
            }]  
        }

### Create a new user [POST]

+ Request (application/json)

    + Header
        x-acces-token: the token obtained from auth
    
    + Body
        {
            "user": "new user",
            "forename": "forename",
            "password": "user password"
        }
        
+ Response 201 (application/json)
    
    {
        "ok": true,
        "user": {
            "user": "new user",
            "forename": "forename",
            "id": "user id"
        }
    }

## User [/apiv1/notes/{id}]

### Retrieve a user [GET]

+ Request (application/json)

    + Header
        x-acces-token: the token obtained from auth
    
+ Response 200 (application/json)
    {
        "ok": true,
        "user":  {
            "user": "user",
            "forename": "forename",
            "password": "user password",
            "id": "user id"
        }  
    }
   
### Update a user [PUT]

+ Request (application/json)

    + Header
        x-acces-token: the token obtained from auth
    
    + Body
        {
            "user": "user updated",
            "forename": "forename updated",
            "password": "user password updated"
        }
        
+ Response 200 (application/json)
    
    {
        "ok": true,
        "user":  {
            "user": "user updated",
            "forename": "forename updated",
            "password": "user password updated",
            "id": "user id"
        } 
    }
    
### Delete a user [DELETE]

+ Request (application/json)

    + Header
        x-acces-token: the token obtained from auth
    
+ Response 200 (application/json)
    
    {
        "ok": true,
        "user":  {
            "user": "user updated",
            "forename": "forename updated",
            "password": "user password updated",
            "id": "user id"
        } 
    }

# Group Note
Create new notes and associate them to a user

---

**Note attributes:**

- id `(Number)` : unique identifier. 
- title `(String)` : note's title.
- body `(String)` : note's body.
- posted `(Object)` :
    - postedBy `(User)`: user who create the note.
    - date `(Date)`: creation date.
---

## Note collection [/apiv1/notes]

### Retrieve all notes [GET]

+ Request (application/json)

    + Header
        x-access-token: the token obtained from auth

+ Response 200 (application/json)

        {
            "ok": true,
            "notes": [{
                "title": "title",
                "body": "body",
                "posted": {
                    "postedBy": user,
                    "date": date
                    },
                "id" : "id"
            },
            {
                "title": "title",
                "body": "body",
                "posted": {
                    "postedBy": user,
                    "date": date
                    },
                "id" : "id"
            }]  
        }

### Create a new user's note [POST]

+ Request (application/json)

    + Header
        x-acces-token: the token obtained from auth
    
    + Body
        {
            title: "title",
            body: "body",
            user: user
        }
        
+ Response 201 (application/json)
    
    {
        "ok": true,
        "note":{
            "title": "title",
            "body": "body",
            "posted": {
                "postedBy": user,
                "date": date
                },
            "id": "id"
        }
    }

## Note [/apiv1/notes/{id}]

### Retrieve a note [GET]

+ Request (application/json)

    + Header
        x-acces-token: the token obtained from auth
    
+ Response 200 (application/json)
    {
        "ok": true,
        "note":{
            "title": "title",
            "body": "body",
            "posted": {
                "postedBy": user,
                "date": date,
                }
            "id": "id"
        }
    }
   
### Update a note [PUT]

+ Request (application/json)

    + Header
        x-acces-token: the token obtained from auth
    
    + Body
        {
            title: "title updated",
            body: "body updated",
            user: user
        }
        
+ Response 200 (application/json)
    
    {
        "ok": true,
        "note":{
            "title": "title updated",
            "body": "body updated",
            "posted": {
                "postedBy": user,
                "date": date,
                }
            "id": "id"
        }
    }
    
### Delete a note [DELETE]

+ Request (application/json)

    + Header
        x-acces-token: the token obtained from auth
    
+ Response 200 (application/json)
    
    {
        "ok": true,
        "note":{
            "title": "title",
            "body": "body",
            "posted": {
                "postedBy": user,
                "date": date,
                }
            "id": "id"
        }
    }

