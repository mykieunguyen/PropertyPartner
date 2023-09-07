## September 6, 2024

After completing the styling of the detail page yesterday, I started to work on styling the other components that have not been styled. Today specifically, I tackled styling the app's navigation bar, and the create property/property images form, and I started working on applying CSS to the user dashboard.

The most difficult part was styling the images form because of the way our app is set up (the user creates a property and is then directed to another form to add images for that property). Oftentimes, the CSS does not reflect on the browser without a refresh but with every refresh I had to create a new property to be directed to the image-adding form. Mainly, it took a lot more time to accomplish.

## September 5, 2024

Today, I started working on designing and stylizing the property detail page in correspondence with our wire frame. I had to also refactor some of the logic for how we were displaying the fetched photos for the property so that the first photo is rendered larger and sliced from the original images array. Additionally, I sliced out four pictures from the property images so that only four extra property pictures were displayed.

One of the main struggles I had was getting the property images to be positioned similarly to how we designed it for the wire frame but also slightly responsive for screen size changes. One design choice I made was choosing a pleasing color scheme.

## August 31, 2024

Today, our team continued to work on the property editing feature, specifically figuring out how to allow authenticated users to add/delete images for their property. After finishing this task, we started to write our unit tests for three of our endpoints (GET properties, GET property detail, and GET images).

## August 30, 2023

Today, I worked to finish the implementation of the main page's property filtering feature. I had to refactor the search bar (location search) to accommodate the new filtering options. Additionally, I implemented a way to place the properties into 3 columns. After finishing the main page logic, I worked on implementing the property detail page. Then we worked on implementing the property editing feature.

Our main blocker was figuring out an approach to incorporating the property's image editing with the property editing form.

## August 29, 2023

Today, we finished the image creation feature which allowed users to add multiple images to their property listing. Afterward, I started working on making the property filtering side bar which allows users to filter the properties list based on property location and other property details.

## August 28, 2023

Today, we continued working on our front end. Specifically, we wrote a react component to handle our property creation. Additionally, we had to come up with how we were going to populate all the states so that the user could choose from a predefined list. We were able to successfully create a functioning form to sync up with the backend to store the property data. We then attempted to handle the image creation form for each property.

Our main blocker was figuring out why the form was not working as intended.

## August 25, 2023

Today, we worked on Property Partner's landing page. Specifically, we created the RTK query for fetching all the properties and using that data, we displayed each property using bootstrap cards component.

## August 24, 2023

We continued today by creating the RTK queries for the getToken route as well as the login and logout functionality. This includes creating a route for the login form and a button for the logout form. For the login feature, we navigated users to the homepage if the user successfully logs in. The logout button is implemented using a button and click event handler which connects to the backend and logs the user out.

## August 23, 2023

Today, we worked together to set up redux for our react front end. This includes setting up the redux store, reducers, and started our apiSlice where we can use RTKQuery to make fetch calls.

## August 22, 2023

Today, with Tylan as the driver, we collectively worked on adjusting our property detail endpoint (GET /api/properties/{property_id}) to incorporate the property creator information within the JSON response. After finishing this task, we implemented the final endpoint for our backend, GET to /api/properties/mine to list all user-created properties. This concluded all the tasks for our backend.

## August 21, 2023

Today, we started with Tylan as the driver after changing the property endpoints to accommodate adding a property owner to each property. We then implemented the delete property endpoint. This concluded our third issue. We then wrote and started on the next issue which includes writing the GET, PUT, and DELETE endpoint for each image that is associated with a property.

## August 17, 2023

Tylan acted as our driver today. We first created our third gitlab issue which revolves around implementing the GET, PUT, and DELETE HTTP methods for /api/properties/{property_id}. After completing the implementation for the GET method, we soon realized that we needed to correct our property table to include a user_id column so that all created properties have an owner associated. After changing our table and associated pydantic models, we worked on fixing our create property endpoint to add the currently logged-in user as the property user_id.

Our biggest blocker was figuring out how we should fix our create property endpoint to incorporate the logged-in user as the property owner.

## August 16, 2023

I acted as the driver today. Last night, I was able to identify a way to add error handling for duplicate usernames and email for our account creation feature so we started our project work time with me showing my team my approach. We then added a get_token endpoint to our accounts routes. This concluded our first issue. We then wrote and started on our second project issue which revolves around our /api/properties endpoint. We worked on our GET and POST endpoint for /api/properties during the remainder of the project time.

Our biggest blocker was not being able to get all the properties to show up appropriately.

## August 15, 2023

Today, we continued with yesterday's attempt to implement the create user, login, logout, and authentication features of our web application. After some guidance, we identified the reason for yesterday's problem. Jacob acted as our driver again today. We created a get function for our account queries which was required by JWTDown login method. After this, we attempted to improve our account creation function so that users cannot create an account with a username OR email that already exists within the database.

Our biggest blocker for the day was struggling to figure out a way to prevent users from creating an account with a duplicate email.

## August 14, 2023

During the previous week, we created our project wire-frames and mapped some of our endpoints which will help us during the implementation phase. Today, we received the project repository we will be building our Property Partner web app in. Our group has decided to work all together to implement the backend as we believe this will help everyone in the group truly understand all aspects of our central system. Jacob acted as our driver today and together we set up the user accounts table and attempted to incorporate Hack Reactor's JWTDown authenticator into our project.

Our biggest blocker for the day was that we kept receiving an error stating "incorrect username or password" when trying to create a user although the user was actually being created in our Postgres database.
