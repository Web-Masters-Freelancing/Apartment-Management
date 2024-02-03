# Pre-requisites
- Download and install [git](https://git-scm.com/downloads).
- Download and install latest version of [nodejs](https://nodejs.org/en/download).
- Download [vscode](https://code.visualstudio.com/download), or your preferred code editor.
- Download [xampp](https://www.apachefriends.org/download.html).

## How to run this app in local
- Open command prompt and run `git clone https://github.com/Web-Masters-Freelancing/Apartment-Management.git`.
- CD `Apartment-Management`
- Open the project in the editor
- Inside `web/` directory, create a file called `.env.development`, paste the following:
```.env
NEXT_PUBLIC_API_ORIGIN="http://localhost:3031"
```
- Inside `server/` directory, create a file called `.env` then paste the following:
```.env
ACCESS_TOKEN_SECRET=50e40e63f933d903833e7f5dcad49e93d9ab0f54afa107a84295e8f49091c5f2

## NOTE: Update the port for mysql, this may be different on your machine
DATABASE_URL=mysql://root:@localhost:3306/apartment

AUTH_TOKEN_SECRET=1da60cfa72d813a5f1f4f79c5999a7d4e3a32bb7c34019e52495f16661b7a6a0
SALTROUND=10

## TWILIO CREDS (TO BE UPDATED)
TWILIO_ACCOUNT_SID=AC6821aedef46d28f14e9c8d656e819793
TWILIO_AUTH_TOKEN=fb720d01ddd7a0633663e6a37b6ddfbf
TWILIO_PHONE_NUMBER=+12017013598
```

## Commands to run before running the app
- For the database
  - Start your apache and mysql server
  - Create a database called `apartment`, don't worry about it's tables yet

- Inside `web/` directory, run the following in sequence:
  - `npm run install` to install dependencies
  - `npm run dev` to start the app locally

You can then access the app using the URL `http://localhost:3000`

- Inside `server/` directory, run the following commands in sequence:
  - Run `npm install` to install dependencies
  - Run `npx prisma generate` to generate tables
  - Run `npx prisma db push` to update your local prisma client
  - Run `npm run start` to start your development server
  - Run `npm run seed` to seed initial data, default values are provided, you must provide your own admin email in the prompt.

By running the commands above, you can test the app locally.
