# hw6-backend-harshitkhanna3254

"netid": "hk57"

"frontend": "https://blogit-frontend-rice.surge.sh"

"backend": "https://blog-it-rice.herokuapp.com"

# Routes:

## Note

Some Routes are a bit different (just some prefix difference) to the default ones (those mentioned in the course website).
Hence, I'm adding all the routes below for help.

## Auth Routes:

> /auth is the prefix

> Note: Will work as per the desciption on: https://www.clear.rice.edu/comp431/data/api.html#api

        1. Register new user (POST): /auth/register
            body: {
                "username": "shre1",
                "email": "sh1@rice.edu",
                "name": "Shreyash Kumar",
                "password": "1234",
                "phoneNumber": 1234123412,
                "zipcode": 110018,
                "gender": "female",
                "dob": "09/11/1996"
            }

        2. Login an existing user (POST): /auth/login
            body: {
                "username": "hk57",
                "password": "1234"
            }

        3. /auth/logout

## Article Routes:

> Note: Will work as per the desciption on: https://www.clear.rice.edu/comp431/data/api.html#api

        1. Get all articles (GET): /articles/hk57

        2. Post new article (POST): /articles
            body: {
                "text": "Second article Lorem ipsum"
            }

        3. Update an article (PUT): /articles/637450ffb917ad6728386e6c
            body: {
                "text": "Random text",
                "commentId": "637453e163f7ff5c34d11762"
            }

## Profile Routes:

> /profile is the prefix

> Note: Will work as per the desciption on: https://www.clear.rice.edu/comp431/data/api.html#api

        1. Get Logged In user profole (GET): /profile/me

        2. Get Logged In user headline (GET): profile/headline

        3. Get Logged In user email (GET): /profile/email

        4. Get Logged In user dob (GET): /profile/dob

        5. Get Logged In user zipcode (GET): /profile/zipcode

        6. Get Logged In user avatar (GET): /profile/avatar

        ----

        7. Update Password for Logged In user (PUT): profile/password
            body: {
                "password": "abcdef"
            }

        8. Update Headline for Logged In user (PUT): profile/headline
            body: {
                "headline": "Test Headline"
            }

        9. Update Avatar for Logged In user (PUT): profile/avatar
            body: {
                "avatar": "https://randomImage.jpg"
            }

        10. Update Zipcode for Logged In user (PUT): profile/zipcode
            body: {
                "zipcode": "11111"
            }

        11. Update Email for Logged In user (PUT): profile/email
            body: {
                "email": "test@rice.edu"
            }
