## MegaphoneCodeChallenge
code challenge started on 6_5_2020



# Technical Notes
- If running on ubunto, make sure to start postgresql server with <sudo service postgresql start>

# Scaling Notes
- Allow merchants to track their inventory by adding a new table called Inventory, includes merchant ID, item ID, & quantity


# Workflow

1. initialized frontend React repository with workflow.md & backend repository with API
2. created models.png for database tables & track deployables
	2.1 figure out how I want to process the csv file.
	I'd like to process the csv into json in the frontend & send that as a payload to the backend.
	2.2 draw out interface for user to upload csv file, look at sketch.png
	2.3 total sales revenue would be processed in the frontend using react
	2.4 authentication would be through firebase, with code from my previous project

3. initialized rails api using <rails new SalesAdmin --api>
4. change Gemfile in rails app (sqlite => pg & enable rack-cors) & run bundle install
	4.1 change databse.yml file to use postgres & allow all access in cors.rb
5. setup tables 
7. create basic seed data & index route for all models
8. run rails server & check basic routes work 

9. initialize react application
	9.1 added dependencies
		react-router-dom for pages
		firebase for authentication
		recompose for higher-order component 
		material-ui for styling
	9.2 use already made authentication & navbar from previous project
10. draw out basic pages
11. figure out what states are neccessary for page
	11.1 


