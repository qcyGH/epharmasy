# ![Logo](https://raw.githubusercontent.com/qcyGH/epharmasy/main/public/favicon.ico "Fortnite shop") ePharmasy

## Menu

- [Description](https://github.com/qcyGH/epharmasy#Description)
- [How to use](https://github.com/qcyGH/epharmasy#How-to-use)
- [Images](https://github.com/qcyGH/epharmasy#Images)
- [Tests list](https://github.com/qcyGH/epharmasy#Tests-list)


## Description

This is a project made with React (Redux, Next.js, React hook forms, useSound), MySQL, ChakraUI and Tailwind. It realised auto electronic pharmasy, using database and MySQL. Project inlcude API for connection with database and making query.  
User can create an accound, add goods to cart and make order. 

## How to use

Required: `node` `MySQL` `IDE`  
Optional: `SQLyog`

1. Configure your MySQL server (required `utf-8`)
2. Put my database to your MySQL data folder
3. Start MySQL server
4. Open your IDE (VSCode for example)
5. In IDE open terminal and put this command to install dependencies: `npm install`
6. Then create `.env.local` file in root project directory with this variables: `DB_HOST` `DB_USER` `DB_PASSWORD` `DB_DATABASE`. Put your db connection data in this variables
7. Start server by this command: `npm run dev`
8. Open the link from terminal
9. Congratulations (●'◡'●)

## Images

### Main
![Main](https://github.com/qcyGH/epharmasy/blob/main/.images/main.png?raw=true)

### Cart
![Cart](https://github.com/qcyGH/epharmasy/blob/main/.images/cart.png?raw=true)

### FAQ
![FAQ](https://github.com/qcyGH/epharmasy/blob/main/.images/faq.png?raw=true)

### Sign Up
![Sign Up](https://github.com/qcyGH/epharmasy/blob/main/.images/signup.png?raw=true)


## Tests list

- [X] Connecting to Data Base
- [X] Fetching data
  - [X] Medicines
  - [X] Users
  - [X] Orders
  - [X] Payments
  - [X] Shipments
- [X] Display data
- [X] Cart modal
- [X] Create user
  - [X] Checking for user with same email or phone number 
- [X] Login with password
  - [X] Auto login after sign up
  - [X] Login and sign up in RequireLogin
- [X] Create order
- [X] Cart page

P.s. Thank you for viewing my work (ಥ _ ಥ)
