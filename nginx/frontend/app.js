const apiUrl = "/api/recipes";

const recipeList = document.getElementById("recipe-list");
const addRecipeBtn = document.getElementById("add-recipe-btn");
const recipeForm = document.getElementById("recipe-form");
const cancelBtn = document.getElementById("cancel-btn");
const newRecipeForm = document.getElementById("new-recipe-form");

function loadRecipes() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(recipes => {
            recipeList.innerHTML = "";
            recipes.forEach(recipe => {
                const recipeCard = document.createElement("div");
                recipeCard.classList.add("col-md-4", "recipe-card");
                recipeCard.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.title}</h5>
                            <p class="card-text">${recipe.ingredients}</p>
                            <p><strong>Category:</strong> ${recipe.category || "N/A"}</p>
                            <p><strong>Cook time:</strong> ${recipe.cook_time || "N/A"} minutes</p>
                            <p><strong>Instructions:</strong> ${recipe.instructions || "N/A"}</p>
                        </div>
                    </div>`;
                recipeList.appendChild(recipeCard);
            });
        })
        .catch(error => console.error("Error fetching recipes: ", error));
}

newRecipeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;
    const cook_time = document.getElementById("cook_time").value;
    const category = document.getElementById("category").value;

    const newRecipe = {
        title,
        ingredients,
        instructions,
        cook_time,
        category,
    };
    console.log(newRecipe);
    // POST /api/recipes

    loadRecipes();
    recipeForm.style.display = "none";
    addRecipeBtn.hidden = false;
});

addRecipeBtn.addEventListener("click", () => {
    recipeForm.style.display = "block";
    addRecipeBtn.hidden = true;
});

cancelBtn.addEventListener("click", () => {
    recipeForm.style.display = "none";
    addRecipeBtn.hidden = false;
});

window.onload = () => loadRecipes();