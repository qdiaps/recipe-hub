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
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${recipe.id}">Delete</button>
                            <button class="btn btn-warning btn-sm edit-btn" data-id="${recipe.id}">Edit</button>
                        </div>
                    </div>`;
                recipeList.appendChild(recipeCard);

                const deleteBtn = recipeCard.querySelector(".delete-btn");
                const editBtn = recipeCard.querySelector(".edit-btn");

                deleteBtn.addEventListener("click", () => {
                    const id = deleteBtn.getAttribute("data-id");
                    if (confirm("Are you sure you want to delete this recipe?")) {
                        fetch(`${apiUrl}/${id}`, { method: "DELETE" })
                            .then(response => {
                                if (response.ok)
                                    recipeCard.remove();
                            })
                    }
                })

                editBtn.addEventListener("click", () => {
                    const id = editBtn.getAttribute("data-id");
                    console.log(`open edit form, id: ${id}`);
                })
            });
        })
        .catch(error => console.error("Error fetching recipes: ", error));
}

newRecipeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;
    const cook_time = document.getElementById("cook_time").value || null;
    const category = document.getElementById("category").value || null;

    const newRecipe = {
        title,
        ingredients,
        instructions,
        cook_time,
        category,
    };
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
    })
        .then(() => {
            loadRecipes();
            recipeForm.style.display = "none";
            addRecipeBtn.hidden = false;
        })
        .catch(error => console.error("Error adding recipe: ", error));
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