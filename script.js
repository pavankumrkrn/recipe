let recipeData = {
    recipeNumber: '',
    queryText: '',
    calories: '',
    health: '',
    cuisine: '',
    meal: '',
    dish: '',
    diet: ''
}

const app_id = '7f3f6e1e';
const app_Key = '60e7d530a28567d3d47972d0844488b6';
const selectItems = {
    queryText: ['chicken', 'pork', 'veg'],
    calories: ['0-200', '200-400', '400-600', '600-3000'],
    health: ['alcohol-free', 'peanut-free', 'sugar-conscious', 'tree-nut-free'],
    cuisine: ['American', 'Indian', 'Italian', 'Chinese', 'French'],
    meal: ['Breakfast', 'Lunch', 'Snack', 'Dinner'],
    dish: ['Starter', 'Soup', 'Main course', 'Salad', 'Dessert'],
    diet: ['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat']
}
for(let i in selectItems){
    appendSelectText(i , selectItems[i]);
}
function appendSelectText(id, array) {
    document.getElementById(id).options.add(new Option("--Select--", ""))
    array.forEach((ele, index) => {
        document.getElementById(id).options.add(new Option(ele, index))
    });
}



document.getElementById('recipeForm').onsubmit = (e) => {
    e.preventDefault();
    document.getElementById('loadingSpinner').setAttribute('style', 'display : block !important');
    document.getElementById('main').setAttribute('style', 'opacity : 0.7');
    let formData = document.getElementById('recipeForm').elements
    for (let i in recipeData) {
        recipeData[i] = formData[i].value;
    }
    getRecipes(recipeData);
}


function getRecipes(recipeData) {
    let maxRecipes = +recipeData.recipeNumber
    let calorieRange  = selectItems.calories[+recipeData.calories];
    let queryText = selectItems.queryText[+recipeData.queryText];
    let health = selectItems.health[+recipeData.health]
    let moreFilters = [];
    moreFilters.push({
        type : 'CuisineType',
        value : selectItems.cuisine[+recipeData.cuisine],
        option : recipeData.cuisine
    })
    moreFilters.push({
        type : 'Diet',
        value : selectItems.diet[+recipeData.diet],
        option : recipeData.diet
    })
    moreFilters.push({
        type : 'MealType',
        value : selectItems.meal[+recipeData.meal],
        option : recipeData.meal
    })
    moreFilters.push({
        type : 'Dishtype',
        value : selectItems.dish[+recipeData.dish],
        option : recipeData.dish
    })
    console.log(moreFilters)

    let filterUrl = moreFilters.filter(obj=>obj.option !== '')
    .reduce((a,b)=>{
        let str = a+'&'+b.type+'='+b.value;
        return str;
    },'')
    let url = 'https://api.edamam.com/search?q='+queryText+'&app_id='+app_id
    +'&app_key='+app_Key
    +'&from=0&to='+maxRecipes
    +'&calories='+calorieRange
    +'&health='+health+filterUrl;
    fetch(url).then((data)=>{
        return data.json();
    }).then((data)=>{
        console.log(data)
        sessionStorage.setItem('recipeData', JSON.stringify(data))
        window.open("recipes.html", "_self")
    }).catch((error)=>{
        console.log(error)
    });
}


