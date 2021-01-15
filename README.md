# Images Repository

This application was supported by firebase cloud as database, firebase storage as image storage, Bootstrap and React. You could check the **live demo [HERE](https://image-repository-db.web.app/)** 

Or if you wish to download it to local, please follow the instruction below:

## Setup

1. Copy the codes into local machine:
- [ ] Fork the code or just download the code into local machine.
- [ ] Install dependencies with `npm install`.
  
2. Setup firebase and environment variables:  
- [ ] Signup the firebase account with your Google account (it's free!). And you will get a Firebase SDK snippet.
- [ ] Create a .env.development file outside src folder. It should be looks like below:
```
REACT_APP_FIREBASE_CONFIG={stringify your firebase SDK snippet}
REACT_APP_WEBSOCKET_URL=ws://localhost:8001
PORT=8000
CHOKIDAR_USEPOLLING=false
```

3. Run you project and upload initial data:
- [ ] Now you can run `npm start`, and you will have your app running in your local machine. Next, you can upload any images you like after you signup in application and go to upload tab

![Upload Image](/public/images/ReadMeImages/upload.png)

- [ ] Before you upload, it would be best for you to update the properties for the images. I have provided some of the sample data in public/initial_data folder. 

Now you are all set, you can see the application design and let us explore the features of the application.

## Signin and Signup

If you haven't sign in, you will see the page below. Please do not try to enter the url directly, since firebase will give you 404 page if you try to directly enter url of page instead of using button provided in application to redirect.

![Before SignIn](/public/images/ReadMeImages/BeforeSignin.png)

As you can see in below, you have two options of Sign In, either create a user with email, or you could sign in with Google directly. After Signed in, you will be able to access the Upload and Inventory pages.

![Before SignIn](/public/images/ReadMeImages/SignInSignUpPage.png)

## Shopping Cart

You could add item to Shopping Cart by clicking "Add to Cart" button, and the sold out item will be gray out. You can check the properties of item by click "Details" button. Once you added item to cart, the green button at right bottom will count the number of item in cart. Note that you cannot add two same items in cart, and I did this on purpose since this is image repository shop, it doesn't make sense for people buying exactly same picture twice. 

If you click green button at bottom right, then you will see the checkout page

![Checkout](/public/images/ReadMeImages/Checkout.png)

I haven't integrated Stripe API to handle money payment yet for some reason, but if possible, then Stripe would be my choice to handle credit card payment.

## Upload Image

Once you have logged in, click on Upload button inside of dropdown located in Nav bar to redirect to upload page. you could upload multiple files, if you decide not to upload any of those file, just click "trash" button to clear upload input.

![Checkout](/public/images/ReadMeImages/Upload_multiple.png)

And as mentioned above, you can click panel to collapse each image and update their properties.

## Inventory

In Inventory page, you would have ability to edit and delete the images that you have uploaded, in database, the image ownership is part of user's properties, so no one else can manipulate inventory they don't own.

![Checkout](/public/images/ReadMeImages/Inventory.png)

As you can see above, user can delete multiply images by tick the checkbox and click delete button located in heading of checkbox column.

## Search

You can search the product by name, any image with search term inside their name will return to product list. As you can see below, it searches any product that has "s" in their name.

![Checkout](/public/images/ReadMeImages/Search.png)

## Why I choose those technology and improvement.

I noticed this internship 2 weeks ago before winter school semaster begins. So I use React and Bootstrap to quickly setup a project that could be demo on live site. If I could have some more time, then I would use Node.js as backend and postegresql as database, and I would choose different servers hosting front-end and back-end separately. 



