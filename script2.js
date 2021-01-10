let recipesWithDetails = [];
let createElement = (element, className = '', id = '') => {
    let ele = document.createElement(element);
    ele.setAttribute('class', className);
    ele.id = id;
    return ele;
}



function onCardHover(i, prop){
    if(prop === 'hover') {
    document.getElementById('title'+i).setAttribute('style', 'background-color:cornflowerblue')
    document.getElementById('ing'+i).setAttribute('style', 'background-color:cornflowerblue')
    } else {
    document.getElementById('title'+i).setAttribute('style', 'background-color:white')
    document.getElementById('ing'+i).setAttribute('style', 'background-color:white')
    }
}

function getIng(index){
    document.getElementById('ing').setAttribute('style', 'display : block !important');
    document.getElementById('ingredients').innerHTML = ''
    document.getElementById('vitaminTable').innerHTML = ''
    let activeRecipe = recipesWithDetails[index]
    document.getElementById('cal').innerHTML = Math.floor(+activeRecipe.recipe.calories)
    document.getElementById('hlbl').innerHTML = activeRecipe.recipe.healthLabels.join(", ")
    if (document.querySelector('.select')) {
        document.querySelector('.select').classList.remove('select');
    }
    document.getElementById('ing'+index).classList.add('select')
    activeRecipe.recipe.ingredients.forEach(ing=>{
        let tr = createElement('tr');
        let td1 = createElement('td');
        td1.innerText  = ing.text;
        let td2 = createElement('td');
        td2.innerText = Math.floor(ing.weight)+' g';
        let td3 = createElement('td');
        let card = createElement('div', 'card');
        let img =  createElement('img', 'card-img-top tableImage');
        img.setAttribute('src', ing.image);
        img.setAttribute('alt', 'image not available')
        card.append(img);
        td3.append(card);
        tr.append(td1,td2, td3);
        document.getElementById('ingredients').append(tr);
    })
    let nutri = activeRecipe.recipe.totalNutrients
    for(let i in nutri){
        if(i.includes('VIT')){
            let vTr = createElement('tr');
            let vTd = createElement('td');
            vTd.innerText = nutri[i].label;
            let vTd2 = createElement('td');
            vTd2.innerText = nutri[i].quantity.toFixed(2)+" "+nutri[i].unit;
            vTr.append(vTd, vTd2);
            document.getElementById('vitaminTable').append(vTr)
        }
    }

    
}

let createRecipeCard = (obj, size, index) => {
    let col = createElement('div', 'col-lg-' + size);
    let row = createElement('div', 'row');
    let col12 = createElement('div', 'col-12 col-sm-12 mt-3')
    let card = createElement('div', 'card recipeCard', 'itemCard'+index);
    let img = createElement('img', 'card-img-top recipeImage');
    img.setAttribute('src', obj.recipe.image);
    let ul = createElement('ul', 'list-group list-group-flush');
    let li2 = createElement('li', 'list-group-item text-center recipeItem', 'ing'+index);
    li2.innerHTML = '<p class="text-center">'+obj.recipe.label+'</p><button class="btn btn-primary" onclick="getIng('+index+')"><i class="fas fa-utensils mr-2"></i> Get Ingredients</button>'
    ul.append(li2);
    card.append(img, ul);
    col12.append(card);
    row.append(col12);
    col.append(row)
    return col;
}





let recipeJSONString = sessionStorage.getItem('recipeData');
var recipes;
if (recipeJSONString !== null) {
    recipes = JSON.parse(recipeJSONString);
    console.log(recipes);
    recipesWithDetails = [...recipes.hits]
    document.getElementById('noRecipe').setAttribute('style', 'display : none');
    let size = Math.floor(12/recipes.hits.length);
    let singleCase = false;
    if(size === 12){
        size = 6;
        singleCase = true
    }
    recipes.hits.forEach((obj,i)=>{
        let card = createRecipeCard(obj,size,i);
        document.getElementById('rec').append(card)
    })
    if(singleCase){
        document.getElementById('itemCard0').setAttribute('style', 'align-self:center')
    }
    
} else {
    document.getElementById('noRecipe').setAttribute('style', 'display : block')
}

