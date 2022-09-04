# Technology:
Edunity frontend is built with the combination of **React + i18n + Bootstrap**.  


# How to run locally

## Development mode

1. First, make sure you have [`Node.js`](https://nodejs.org/en/) installed (version 16).


2. In terminal enter the project directory and install `yarn`:

```npm install -g yarn```  

(Note: install yarn only when running for the first time.)

3. Install dependencies:

```yarn```

4. And then to start the development server run:

```yarn start```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Production mode

In project directory run:

```yarn build```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Deploy to Azure:
Follow this instruction to deploy with VSCode.

https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?tabs=linux&pivots=development-environment-vscode#deploy-to-azure

If there is an error about "There appears to be trouble with your network connection. Retrying..." during deployment, set the flag CUSTOM_BUILD_COMMAND from command line:

```az webapp config appsettings set -g Edunity -n edunity --settings CUSTOM_BUILD_COMMAND="yarn install --prefer-offline --network-timeout 100000"```

Verify that the flag is set correctly:

```az webapp config appsettings list -g Edunity -n edunity```

The app can also be deployed from command line with
```az webapp up --sku B1 --name edunity```
