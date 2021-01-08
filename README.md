# Images Repository

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Initialize Firebase Image initial database

Copy the content in `public/initial_data/imageData.txt` and paste it in **Application Component** for later use.

Import the function `addImageCollection` from firebase.utils.js in **Application Component**, Then add the function inside of authentication useEffect hook like in picture below

![Initialize Images in firebase database](/public/images/Initialize_Firebase_Images.png)

Noted I use the initial image data variable we imported before as second parameter in `addImageCollection` function.

After initialization, you have to deleted the code you just added, becuase that was just help to programatically added inital image data to firebase database.