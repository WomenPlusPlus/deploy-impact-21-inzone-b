RUN LOCALLY  
To setup the flask app in a clean virtual env (only for Linux and MacOS):

1. Exit the current virtual env if you are in a virtual env
2. Create new env with:  
python3 -m venv .venv && source .venv/bin/activate
3. Install dependencies:  
pip3 install -r requirements.txt
4. Run app.py:  
python3 app.py  

DEPLOYMENT:  
Install Azure CLI:  
https://docs.microsoft.com/en-us/cli/azure/install-azure-cli  
To deploy to azure:  
(Reference https://docs.microsoft.com/en-us/azure/app-service/quickstart-python?tabs=bash&pivots=python-framework-flask)

0. Verify if az CLI is installed:  
az --version
1. Log in:  
az login
2. Make sure requirements.txt is updated
3. Check the status of SCM_DO_BUILD_DURING_DEPLOYMENT:  
az webapp config appsettings list -g Edunity -n edunity  
If the value of this flag is 0, set it to 1 with:  
az webapp config appsettings set -g Edunity -n edunity --settings SCM_DO_BUILD_DURING_DEPLOYMENT=1  
4. Deploy with:  
az webapp up --sku B1 --name edunity

