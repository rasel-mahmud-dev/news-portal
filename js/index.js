

const activeCategoryId = "05"





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
            categoryList.appendChild(li)

            if(category.category_id === activeCategoryId){
                li.className = "bg-blue-500/10 text-blue-500 px-3 py-0.5"
            }

        })
    }
})