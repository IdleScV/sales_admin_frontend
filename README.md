## MegaphoneCodeChallenge
code challenge started on 6_5_2020

### Installation Guide

`yarn install`  to install dependencies
Runs the app with `yarn start` after the Rails backend is running locally on [http://localhost:3000](http://localhost:3000) <br />
Open [http://localhost:3001](http://localhost:3001) to view this react application in the browser.

# Dependencies
- `@material-ui` for navbar styling
- `firebase` for user authentication
- `react-router-dom` for authentication pages
- `recompose` for authentication higher order component 
- `papaparse` for csv file conversion
  

# Workflow

1. initialized frontend React repository with workflow.md & backend repository with API
2. created [Models.png](Models.png) for database tables & track deployables
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
	9.1 use already made authentication & navbar from previous project
10. draw out basic page [MainPage.png](MainPage.png)
11. create basic page layout
12. create interface for user to upload salesdata.csv file 
13. handle information conversion in the front & send to database
14. added filters
15. show total sales revenue


# Scaling Notes
- Allow merchants to track their inventory by adding a new table called Inventory, includes merchant ID, item ID, & remaining quantity
- If a single user's salesdata becomes too large, it might be a good idea to limit # of items returned from the database & also write a method in the backend that returns total sales revenue
- Filters may become slow as more data gets added on

# Technical Notes
- If running on ubuntu, make sure to start postgresql server with <sudo service postgresql start>