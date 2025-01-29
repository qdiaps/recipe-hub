import json
import requests

url = "http://localhost/api/recipes"

recipes = [
    {
        "title": "Egg Salad",
        "ingredients": "Eggs, Mayonnaise, Mustard, Salt, Pepper",
        "instructions": "Boil eggs and chop them. Mix with mayonnaise, mustard, salt, and pepper. Serve on bread or as a salad.",
        "cook_time": None,
        "category": "Salad"
    },
    {
        "title": "Grilled Cheese Sandwich",
        "ingredients": "Bread, Butter, Cheese",
        "instructions": "Butter the bread, place cheese between slices, and grill on both sides until golden and cheese is melted.",
        "cook_time": None,
        "category": None
    },
    {
        "title": "Spaghetti Bolognese",
        "ingredients": "Spaghetti, Ground Beef, Tomato Sauce, Onion, Garlic, Olive Oil, Salt, Pepper",
        "instructions": "Cook spaghetti according to package instructions. In a pan, sauté onions and garlic in olive oil. Add ground beef and cook until browned. Add tomato sauce, salt, and pepper. Simmer for 20 minutes.",
        "cook_time": 30,
        "category": "Italian"
    },
    {
        "title": "Chocolate Cake",
        "ingredients": "Flour, Cocoa Powder, Sugar, Eggs, Butter, Milk, Baking Powder",
        "instructions": "Mix all ingredients and bake in a preheated oven at 350°F (175°C) for 30 minutes.",
        "cook_time": None,
        "category": None
    },
    {
        "title": "Chicken Alfredo",
        "ingredients": "Chicken, Fettuccine, Alfredo Sauce, Parmesan Cheese, Garlic",
        "instructions": "Cook chicken and fettuccine. Combine with Alfredo sauce and top with parmesan. Serve hot.",
        "cook_time": None,
        "category": "Italian"
    },
    {
        "title": "Chicken Curry",
        "ingredients": "Chicken, Curry Powder, Coconut Milk, Onion, Garlic, Ginger, Olive Oil, Salt",
        "instructions": "Heat oil in a pan and sauté onion, garlic, and ginger. Add chicken and cook until browned. Stir in curry powder, then add coconut milk. Simmer for 25 minutes.",
        "cook_time": 40,
        "category": None
    },
    {
        "title": "Vegetarian Chili",
        "ingredients": "Kidney Beans, Tomatoes, Onion, Garlic, Chili Powder, Bell Peppers, Olive Oil",
        "instructions": "Sauté onions, garlic, and bell peppers in olive oil. Add beans, tomatoes, chili powder, and cook for 25 minutes.",
        "cook_time": None,
        "category": "Vegan"
    },
    {
        "title": "Vegetable Stir Fry",
        "ingredients": "Bell Peppers, Broccoli, Carrots, Soy Sauce, Olive Oil, Garlic, Ginger",
        "instructions": "Heat olive oil in a wok. Add garlic and ginger, then stir fry vegetables until tender. Pour in soy sauce and stir to coat. Serve with rice.",
        "cook_time": 15,
        "category": None
    },
    {
        "title": "Caesar Salad",
        "ingredients": "Romaine Lettuce, Croutons, Parmesan Cheese, Caesar Dressing",
        "instructions": "Tear lettuce into bite-sized pieces. Toss with croutons, parmesan, and dressing. Serve immediately.",
        "cook_time": None,
        "category": "Salad"
    },
    {
        "title": "Beef Tacos",
        "ingredients": "Ground Beef, Taco Shells, Lettuce, Tomato, Cheese, Salsa",
        "instructions": "Cook ground beef in a pan and season with taco seasoning. Warm taco shells, then fill with beef, lettuce, tomato, cheese, and salsa.",
        "cook_time": 20,
        "category": "Mexican"
    }
]

headers = {
    "Content-Type": "application/json"
}

for recipe in recipes:
    requests.post(url, headers=headers, data=json.dumps(recipe))