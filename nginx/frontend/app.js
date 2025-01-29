const apiUrl = "/api/recipes";

const recipeList = document.getElementById("recipe-list");
const addRecipeBtn = document.getElementById("add-recipe-btn");
const recipeForm = document.getElementById("recipe-form");
const cancelBtn = document.getElementById("cancel-btn");
const newRecipeForm = document.getElementById("new-recipe-form");

let isEditingRecipe = false;

function openEditRecipeForm(id, card, cardData) {
    if (isEditingRecipe)
        return;
    isEditingRecipe = true;
    const form = document.createElement("div");
    form.classList.add("edit-recipe-container", "mt-4", "mb-4");
    form.innerHTML = `
        <h2>Edit Recipe</h2>
        <form id="edit-recipe-form">
            <div class="mb-3">
                <label class="form-label" for="title">Title</label>
                <input class="form-control" type="text" id="title" value="${cardData.title}" required>
            </div>
            <div class="mb-3">
                <label class="form-label" for="ingredients">Ingredients</label>
                <textarea class="form-control" id="ingredients" rows="3" required>${cardData.ingredients}</textarea>
            </div>
            <div class="mb-3">
                <label class="form-label" for="instructions">Instructions</label>
                <textarea class="form-control" id="instructions" rows="3" required>${cardData.instructions}</textarea>
            </div>
            <div class="mb-3">
                <label class="form-label" for="cook_time">Cook time (minutes)</label>
                <input class="form-control" type="number" id="cook_time" value="${cardData.cook_time || ''}">
            </div>
            <div class="mb-3">
                <label class="form-label" for="category">Category</label>
                <input class="form-control" type="text" id="category" value="${cardData.category || ''}">
            </div>
            <button class="btn btn-success" type="button">Submit</button>
            <button class="btn btn-secondary" type="button">Cancel</button>
        </form>
    `;
    card.insertAdjacentElement("afterend", form);

    const submitBtn = form.querySelector(".btn-success");
    const cancelBtn = form.querySelector(".btn-secondary");

    submitBtn.addEventListener("click", () => {
        const editRecipe = {
            title: document.getElementById("title").value,
            ingredients: document.getElementById("ingredients").value,
            instructions: document.getElementById("instructions").value,
            cook_time: document.getElementById("cook_time").value || null,
            category: document.getElementById("category").value || null,
        };

        fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editRecipe),
        })
            .then(() => { location.reload() });
    });

    cancelBtn.addEventListener("click", () => {
        isEditingRecipe = false;
        form.remove();
    });
}

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
                    openEditRecipeForm(id, recipeCard, recipe);
                })
            });
        })
        .catch(error => console.error("Error fetching recipes: ", error));
}

newRecipeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newRecipe = {
        title: document.getElementById("title").value,
        ingredients: document.getElementById("ingredients").value,
        instructions: document.getElementById("instructions").value,
        cook_time: document.getElementById("cook_time").value || null,
        category: document.getElementById("category").value || null,
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