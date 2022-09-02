

// Application State Variables
let activeCategoryId = "05"






const categoryList = findById("category-list")


/**
 TASK: Category List insert
 step 1   => get categories list container
 step 2   => get categories name from api call
 step 3   => create li category dom element
 step 4   => push li inside category container
*/

getAllCategory((categoryData)=>{
    if (categoryData){
        categoryData.forEach((category)=>{
            let li = document.createElement("li")
            li.innerText = category.category_name;
            li.addEventListener("click", (e)=>handleClickOnCategory(li, category.category_id))
            li.classList.add("category-item")
            categoryList.appendChild(li)

            if(category.category_id === activeCategoryId){
                li.className =  "category-item active-category"
            }
        })
    }
})

function handleClickOnCategory(element, categoryId){
    activeCategoryId = categoryId;

    // remove  active class that clicked before
    let findActiveCategory = document.querySelector(".active-category")
    findActiveCategory && findActiveCategory.classList.remove("active-category")

    // add active class that has been clicked
    element.classList.add("active-category")
}


