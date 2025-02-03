document.addEventListener("DOMContentLoaded", function () {
    let ingredients = [];

    document.getElementById("add-ingredient").addEventListener("click", function () {
        let newRow = document.createElement("div");
        newRow.classList.add("ingredient");
        newRow.innerHTML = `
            <input type="text" class="ingredient-name" placeholder="Ингредиент">
            <input type="number" class="ingredient-price" placeholder="Цена">
            <input type="number" class="ingredient-volume" placeholder="Объем">
            <input type="number" class="ingredient-used" placeholder="Используемое кол-во">
            <select class="ingredient-unit">
                <option value="г">г</option>
                <option value="мл">мл</option>
                <option value="шт">шт</option>
            </select>
        `;
        document.getElementById("ingredients").appendChild(newRow);
    });

    document.getElementById("calculate").addEventListener("click", function () {
        let totalCost = 0;
        document.querySelectorAll(".ingredient").forEach(ing => {
            let price = parseFloat(ing.querySelector(".ingredient-price").value) || 0;
            let volume = parseFloat(ing.querySelector(".ingredient-volume").value) || 1;
            let used = parseFloat(ing.querySelector(".ingredient-used").value) || 0;
            totalCost += (price / volume) * used;
        });

        let markup = parseFloat(document.getElementById("markup").value) || 0;
        let finalPrice = totalCost * (1 + markup / 100);

        document.getElementById("total-cost").innerText = totalCost.toFixed(2);
        document.getElementById("final-price").innerText = finalPrice.toFixed(2);
    });

    document.getElementById("save-recipe").addEventListener("click", function () {
        let recipe = {
            name: document.getElementById("dish-name").value,
            ingredients: []
        };

        document.querySelectorAll(".ingredient").forEach(ing => {
            recipe.ingredients.push({
                name: ing.querySelector(".ingredient-name").value,
                price: ing.querySelector(".ingredient-price").value,
                volume: ing.querySelector(".ingredient-volume").value,
                used: ing.querySelector(".ingredient-used").value,
                unit: ing.querySelector(".ingredient-unit").value
            });
        });

        localStorage.setItem("recipe", JSON.stringify(recipe));
        alert("Рецепт сохранен!");
    });

    document.getElementById("export-excel").addEventListener("click", function () {
        alert("Экспорт в Excel пока не реализован!");
    });
});
