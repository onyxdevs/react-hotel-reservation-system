# React.js Hotel Reservation System 🚀

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).<br />
The project includes extra packages and improved file structure.

## Behaviour 💁

-   You can always navigate between the completed steps from the steps indicators or by clicking the back button.
-   Fields data and steps state are synced with the local storage.
-   Now there are two stores, hotels and cart.

## How to's

-   API URL can be changed from the .env file.
-   New reducers are added in -> /src/stores/global-reducers.ts
-   New sagas are added in -> /src/stores/global-sagas.ts

### Screens

1. **Hotel and Date Selection**

    - A select field shows the data fetched from the Hotel List API. When a hotel is selected, the data of all hotels coming from the Hotel Details API should is saved in the global state. The details of the selected hotel are accessed from Redux.
    - Check-in and Check-out date fields, pure without a library.
    - Check-in field is validated and the date should be after today's date, if the check-out field is selected before, the check-in field gets validated and its value should be before the check-out, same for the check-out field, it's always after check-in.
    - Number of Adults is a number field. It has a value between 0 and 5. If the selected hotel has a max_adult_size (maximum number of adults), it's validated from 0 to max_adult_size.
    - Number of Children is a number field. It has a value between 0 and 5. According to the child_status (child acceptance status) value of the selected hotel, “Children are not allowed” warning is added and the field is disabled.
    - All fields are required to proceed to the next step.
    - When the Save and Continue button is clicked, if the fields are valid, it goes to the next step and form values are saved to local storage.

2. **Room Type and View Selection**

    - User's preferences on the Hotel and Date Selection screen are displayed to the user.
    - Room type and View type are created from the object of the selected hotel. They're radio inputs with an image and more details. Costs are calculated according to the number of days selected, adults, room type, and view.
    - All fields are required to proceed to the next step.
    - When the Save and Continue button is clicked, if the fields are valid, it goes to the next step and form values are saved to local storage.

3. **Preview and Payment Processes**
    - User's preferences on the Hotel and Date Selection and Room Type and View Selection screens are shown.
    - Coupon Code Form is an input and a button. When the Apply button is clicked, the coupon code details are checked for expiration_at (Expiration Date) according to the result from the Coupon Codes API. If the coupon code is valid, a discount is applied over the total amount equal to the discount_ammount value and an appropriate message is shown.
    - According to the user's choices, the price information is shown to the user. The cost of the selected room type, the price impact ratio of the room view.
    - When the user enters the credit card information, it is displayed on the credit card instantly and the entered number is masked according to card type (card type is detected from the number with regular expression).
    - Card Expiry Month is validated to check if the selected year is the current year.
    - All fields are required to proceed to the next step.
    - When the Save and Continue button is clicked, if the fields are valid, it goes to the next step and form values are saved to local storage.
    - When the Pay and Finish button is clicked, Reservation is sent to the API. The accepted sample JSON structure is as follows:

```json
{
    "hotel_id": 3,
    "start_date": "2021-01-20",
    "end_date": "2021-02-20",
    "adult": 10,
    "child": 2,
    "room_type": 2,
    "room_scenic": 3,
    "price": 7676,
    "coupon_code": "CODE100",
    "card_name": "Obada Qawwas",
    "card_number": "1111222233334444",
    "card_date_month": "01",
    "card_date_year": "2030",
    "card_cvv": "999"
}
```

4. Reservation Completed
    - The preferences of the user on previous steps are shown.
    - Success message is displayed.
    - When the Make New Reservation button is clicked, the saved values are forgotten and the form goes to the first step.
    - When the Update Reservation button is clicked, the last entered values are kept and the form goes to the first step. The explanations in the previous screens are applied exactly. When the Pay and Finish button is clicked at the last step, the last entered values are updated.
    - When the Cancel Reservation button is clicked, a confirmation dialogue is shown, and according to the user's choice, the last entered values are deleted.

## Features 🦸

-   **Typescript** - Superset of JavaScript which primarily provides optional static typing, classes and interfaces.
-   **Redux** - A predictable state container for JavaScript apps.
-   **Sagas** - An intuitive Redux side effect manager. Easy to manage, easy to test, and executes efficiently.
-   **Sass/Scss** - CSS preprocessor, which adds special features such as variables, nested rules and mixins (sometimes referred to as syntactic sugar) into regular CSS.
-   **BEM** - Block Element Modifier is a methodology that helps you to create reusable components and code sharing in front-end development.
-   **ESLint** - The pluggable linting utility.
-   Clean and beautiful **responsive** design.
-   Custom **form hook** built from **scratch** with Validator.js.
-   Custom hooks to handle **localStorage, hotels, cart, credit card, and steps**.
-   **Mask** credit card number field with IMask, also, it detects the **card type** and shows the appropriate logo.
-   **Interactive** credit card on the payment step.

## Utility functions 🛠

-   Logger
-   validator
-   isValidName
-   getCreditCardYears
-   getCreditCardMonths
-   getStoredValue
-   clearStoredValues
-   getTwoDatesDiff
-   getTotalPrice
-   getRoomDetails
-   getTotals
-   compareProps
-   ccNumberMaskPipe
-   getCCNumberMaskType

## Folders and files structure 🗺

```
-   src

    -   components // reusable react components

        -   Button
        -   CreditCard
        -   Form
            -   ImageCheckbox
            -   Select
            -   TextField
        -   Header
        -   Portlet
        -   ProgressIndicators
        -   ReservationDetails
            -   ReservationCoupon
            -   ReservationDetailsItem
            -   ReservationTotals
        -   Steps
            -   StepIndicator
        index.ts // Exports all the public components

        // Each component has the following structure:

        -   -   ComponentName
                -   ComponentName.module.scss
                -   ComponentName.test.tsx
                -   ComponentName.tsx
                -   index.ts

    -   containers

        -   App
        -   Steps
            -   HotelDate
            -   RoomView
            -   PreviewPayment
            -   Finish

    -   hocs

        -   withErrorHandler.tsx

    -   hooks

        -   useCart.ts
        -   useCreditCard.ts
        -   useForm.ts
        -   useHotels.ts
        -   useLocalStorage.ts
        -   useSteps.ts

    -   lib // helpers

        -   media
            -   icons
            -   payment

        -   scripts
            -   apis.ts // All API requests
            -   axios.ts
            -   utils.ts
        -   styles
            -   abstracts
                -   mixins.scss
                -   variables.scss
            -   _reboot.css
            -   main.scss

    -   stores

        -   cart
            -   actions.ts
            -   constants.ts
            -   reducers.ts
            -   sagas.ts
        -   hotels
            -   actions.ts
            -   constants.ts
            -   reducers.ts
            -   sagas.ts
        -   global-reducers.ts // state's reducers, add new reducers here
        -   global-sagas.ts // connect sagas here
        -   index.ts // Redux store implementation

    -   Types // Just the global types
        -   TypeAppProps.ts
        -   TypeCartDetails.ts
        -   TypeCoupon.ts
        -   TypeHotel.ts
        -   TypeHotelDetails.ts
        -   TypeInput.ts
        -   TypeNewReservation.ts
        -   TypeReservationStep.ts
        -   TypeStep.ts

    -   config.ts // App's config, now it only contains API_URL
    -   index.tsx
    -   react-app-env.d.ts
    -   reportWebVitals.ts
    -   setupTests.ts

```

## Dependencies that were added to CRA 👷🏼‍♀️

-   node-sass
-   axios
-   redux
-   react-redux
-   redux-saga
-   redux-devtools-extension
-   react-select
-   imask
-   validator

## Todos 👩‍💻

-   Animations with React transition group.
-   Testing
-   Manage stepsState with Redux

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## `Stay safe 😷`
