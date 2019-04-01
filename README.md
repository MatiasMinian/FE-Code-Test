# Code Challenge

## Instructions:

Please clone the repository, complete the exercise, and submit a PR for us to review! If you have any questions, you can reach out directly here or leave comments on your pull request which we will respond to. Remember, all instructions for running the application (including installing relevant libraries, etc.) should be included in the README. 


## Delivery Steps: 

1. Create a branch from `master` named `base` and push all the third-party code needed (Libraries, Frameworks, etc.).
2. Create a branch from `base` named `code-test` and push your own code (Remember to update the Readme file providing any instructions on how to run the project if needed).
3. Create a Pull Request from `code-test` to `base` for us to review.


## Please answer the following questions once you finish codding:

A) Describe the strategy used to consume the API endpoints and the data management.

To make the requests to the API I've used the built in Fetch library. All API code related is placed in the `api` folder to separate it from business and app logic. 
For state management I've just used both screen's state to handle it. For the simplicity of the app I've done it this way even though in a more complex app I would use something different like React Context or Redux depending on the size, features, requirements, etc.

B) Explain which library was used for the routing and why. Would you use the same for a consumer facing app targeting thousands of users? Why?

I chose React Navigation as the routing library. I feel comfortable with it, I've used it before and I think it's the best solution for routing right now.
I would still use the same library for a big app. I've compared it before with some other libraries like react-native-navigation (Wix), native-navigation (Airbnb) and
react-native-router-flux and the decision was the same. When I choose a library I pay attention mainly to 4 things: The community behind the library (contributors, 
repo stars, npm downloads and how well known the library is); the state of the library (when were the last release and commit made); documentation; and 
some opinions from others (blogs, posts, etc.). If performance is the main issue, I would take a look at react-native-navigation V2 but for now I would stick with
react-navigation.


C) Have you used any strategy to optimize the performance of the list generated for the first feature?

I've used the newer and more performant `FlatList` instead of the old `ListView`. Also, to prevent re renders that are not necessary, I've made the `FlatList`
item component a Pure Component and was careful not to pass arrow functions or binds in renders as this will provoke a new function to be created in each rendering.
Finally, I've passed the drink id as key for each item instad of index, as adding, removing or re ordering elements would cause performance issues or bugs if index was to be used because React uses these keys to realize which elements have changed (Added, removed, re ordered)

D) Would you like to add any further comments or observations?


## Overview:

Implement a simple mobile cocktails catalogue (master / detail). The catalogue consists of a table view list of cocktails with their name, toppings and photo. Once the user taps on a specific row it will push a new screen with that drink’s details: Name, Photo, Ingredients and Preparation.


## Features:

**1. Cocktails list:**

For each row of the list it will display the Cocktail name and photo (See wireframe 1).
The API endpoint that should be consumed for this purpose is: 

http://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass

This returns a JSON list of cocktails, and the information needed in order to populate each row of the list.

```
{
 	strDrink,           → Cocktail name
     	strDrinkThumb,  → Photo URL
      	idDrink       → Cocktail ID
}
```

Wireframe 1:

![screen shot 2018-02-02 at 12 53 57](https://user-images.githubusercontent.com/263229/35742087-40b1ce26-0818-11e8-91d7-5c2ea0d4a6aa.png)




**2. Cocktail detail:**

Once the user taps on a row from the list mentioned in the previous feature it will push a new screen with the selected cocktail’s details, where it will show it’s name, photo, ingredients and instructions (See wireframe 2)

The endpoint to be used for this is the following:
 
http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink} → Cocktail ID
I.g.: http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=16108

The endpoint returns a JSON with the cocktails info, the needed properties are:
```
{
	strInstructions,  → instructions
	strDrink,         → cocktail name
	strDrinkThumb,    → photo URL
	strIngredient1,   → ingredient 1
	...
	strIngredientN    → ingredient N
}
```

Wireframe 2

![screen shot 2018-02-02 at 12 53 37](https://user-images.githubusercontent.com/263229/35742155-63205b1c-0818-11e8-8b4b-608a46eaa718.png)
	
  
  
  
**3. Bonus Points: (Optional)**

Implement a filter by name functionality on the first screen that automatically filters the results while typing, only showing the rows that satisfy the criteria entered by the user.



Thank you and looking forward to seeing your great work!



