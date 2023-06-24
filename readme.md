I have used ```NodeJs``` for backend and ```MongoDB``` as Database with ```mongoose``` ORM.

I have imported the data in Mongo db , You  can create a new collection and import data in it and change the db ui in .env accordingly.

Also make sur while importing make the date column as ```Date Type```
I have also pushed the .env files for reference only they doesn't contain any api key or any passwords.

If we want to protect any api call we can protect it from accessing for that i have implemented the middle ware but not used in it.

 Steps to Run the backend at local system -

 ```js
 Clone the repository and then 

 $ cd Volopay
 $ npm install
 $ npm start

 ```
You can hit these api from post man and make sure the name of variable pass in body as the same of assignment.

 ```  I have created the REST Api for all required API routes. ```

1. total_items

     ``` http://localhost:7000/v1/api/total_items ```

 

2. nth_most_total_item
    
    ``` http://localhost:7000/v1/api/nth_most_total_item , ```


3. percentage_of_department_wise_sold_items 

     ``` http://localhost:7000/v1/api/percentage_of_department_wise_sold_items ```

  

4. monthly_sales

     ``` http://localhost:7000/v1/api/monthly_sales ```

    



