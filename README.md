# API de restaurantes
## Tecnologias 
mysql express nodejs
## Como ejecutar
En la raiz del proyecto cree el archivo .env este debe contener:
PRIVATEKEYTOKENAPI, URlMAPSAPI, RADIUS, HOST, 
    USER, PASSWORD,  DATABASE, 
 PRIVATEKEYREFRESHTOKEN, PRIVATEKEYTOKEN 

Y luego correr el proyecto en el ambiente de DEV con el comando `npm run dev`

Si es de su agrado hay una colección de postman en la raiz en la que hay ejemplos de peticiones para que las pruebe. Para correr esta colección debe crear la variable de entorno url donde debe colocar la url del API, por ejemplo 
http://localhost:4000/

## Endpoints
### Sing up POST /user/
Body Request:
```json
{
    "username":"lily",
    "password":"123",
    "repassword":"1213",
    "fullname":"lily"
}
```
Body Response:
```json
{
}
```
### log in POST /user/login/
Body Request:
```json
{
    "username":"lily",
    "password":"123"
}
```
Body Response:
```json
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJsaWx5IiwiaWF0IjoxNjM4MTIyMjc2LCJleHAiOjE2Njk2NTgyNzZ9.aHoY36DYfp7_9McY8juimUXX2j7Z6pXJSrJ99sJp0qE",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJsaWx5IiwiaWF0IjoxNjM4MTIyMjc2LCJleHAiOjE2MzgxMjM0NzZ9.lgktxIuRQ7AFZUkVCVaCQ2fVexV0j3k4UJKxv5q8eLY"
}
```
### refresh POST /user/refresh/
Body Request:
```json
{
    "refreshToken":"asdsdjkgjkfjg"
}
```
Body Response:
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJsaWx5IiwiaWF0IjoxNjM4MTIyMjc2LCJleHAiOjE2MzgxMjM0NzZ9.lgktxIuRQ7AFZUkVCVaCQ2fVexV0j3k4UJKxv5q8eLY"
}
```
### log out DELETE /user/login/
Body Request:
```json
{
   "refreshToken":"asdsdjkgjkfjg"
}
```
Body Response:
```json
{
}
```
### history GET /history/
- Header :  Authorization: Bearer {{accessToken}}
Body Request:
```json
{
}
```
Body Response:
```json
{
    "count": 3,
    "rows": [
        {
            "id": 1,
            "url": "/resturants/?lat=-33.8670522&lon=151.1957362",
            "createdAt": "2021-11-28T17:26:52.000Z",
            "updatedAt": "2021-11-28T17:26:52.000Z",
            "userId": 1
        },
        {
            "id": 2,
            "url": "/resturants/?lat=-33.8670522&lon=151.1957362",
            "createdAt": "2021-11-28T17:27:14.000Z",
            "updatedAt": "2021-11-28T17:27:14.000Z",
            "userId": 1
        }
    ]
}
```
### restaurants GET /resturants/?lat=-33.8670522&lon=151.1957362
- Header :  Authorization: Bearer {{accessToken}}
Body Request:
```json
{
}
```
```json
{
    "next_page_token": "Aap_uECEhQAF9HKuQatDyxUlLaHUarCfDC4eTkFtJ8tkeOlnXJQFKhCv694mmDybu1wBULJPExOKZrUW_sgdZalCvO5PTbtKz85C2YEyX0IK__J0mxxsHPxHD4yGKUJyLZLaUj56v035aRRB7oBu3MgFKIlYAIZCoNa4nmvXfwu0sRfQbCIkqjI4dRfh_JEjWIZVrwYjKgDsm_hPvWSUC9UTGyg48y6swSoIG-7edIc3d5XKVxST5rxpnoYxrn5gSyhT-uy8m3zpHaP_D6dlCo6uN2ECFpFKLq_bWzmaVbnf-GUKSZ2dN2g6984cZFMdMO8owy2Ky5U-tEeY9JD6c5iYY2kjYAT1zShGeQKwXLF7yBzFNjQzoAF6a-fpwE4GT-xe2hCv9cXEXd8gpqnafUA53WjrAPOoBJHpI8xpkfvT2X5TPybKUNZ3pyxH9JTa",
    "results": [
        {
            "business_status": "OPERATIONAL",
            "geometry": {
                "location": {
                    "lat": -33.8709065,
                    "lng": 151.2075485
                },
                "viewport": {
                    "northeast": {
                        "lat": -33.86945936970849,
                        "lng": 151.2088507802915
                    },
                    "southwest": {
                        "lat": -33.87215733029149,
                        "lng": 151.2061528197085
                    }
                }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
            "icon_background_color": "#909CE1",
            "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
            "name": "QT Sydney",
            "opening_hours": {
                "open_now": true
            },
            "photos": [
                {
                    "height": 952,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/117184769815937888065\">QT Sydney</a>"
                    ],
                    "photo_reference": "Aap_uEBNypBHgO_oauzrqp9Mt9vO1ziFftmyKgZyYrJVkA4L7iIXgrxNIH0hL3Y0DOHK2C67OUa7_8EFPUZaikODz5_jLGtS1-ZzrxWXIHvec_babX8YIn1fJauG27fG-pFbDMh8QFDTRKufdYaKGutebr8yVYIdCVPtIpXhZC6hfZPYrq4B",
                    "width": 1429
                }
            ],
            "place_id": "ChIJK6RwVT6uEmsRQ447JSUTGGI",
            "plus_code": {
                "compound_code": "46H5+J2 Sydney NSW, Australia",
                "global_code": "4RRH46H5+J2"
            },
            "rating": 4.6,
            "reference": "ChIJK6RwVT6uEmsRQ447JSUTGGI",
            "scope": "GOOGLE",
            "types": [
                "lodging",
                "bar",
                "restaurant",
                "food",
                "point_of_interest",
                "establishment"
            ],
            "user_ratings_total": 1466,
            "vicinity": "49 Market Street, Sydney"
        },
      
    ]
}
```
## Trabajo futuro
Pruebas - Crear roles para que el usuario con rol administrativo pueda mirar toda la historia de transacciones