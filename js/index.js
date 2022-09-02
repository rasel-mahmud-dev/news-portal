

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




function sortByViews(itemA, itemB){
    if(itemA.total_view > itemB.total_view) {
        return 1
    } else  if(itemA.total_view < itemB.total_view) {
        return 0
    } else {
        return -1
    }
}

// handle news
const newsContainer = findById("news-container")
getNewsByCategoryId(activeCategoryId, (news)=>{
    if (news){

        newsContainer.innerHTML = null

        news.sort(sortByViews).forEach((eachNews)=>{
            console.log(eachNews)

            // {name: 'Ukrainska Pravda', published_date: '2022-08-25 18:53:49', img: 'https://images.unsplash.com/photo-1633332755192-72…HxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'}
            // others_info {is_todays_pick: false, is_trending: true}
            // rating {number: 4.5, badge: 'Excellent'}

            const { author, category_id, thumbnail_url, title, total_view, rating, _id, details, image_url, } = eachNews


            let newsMarkup  = `
             <div class="card bg-white shadow-xs p-5">
                  <div class="flex">
                       <div class="news-thumb w-full">
                            <img class="rounded-2xl w-full" src="${thumbnail_url}" alt="news-thumbnail" />
                        </div>
                      <div class="card-body p-2 ml-4">
                            <h2 class="card-title text-neutral-700">${title}</h2>
                             <p>${details.length > 700 ?   `
                                    <span>${details.substring(0, 700)}...</span> 
                                    <button class="btn-link text-blue-400 ml-2">read more</button>
                                ` : details} 
                              </p>
                          
                              <div class="card-footer flex justify-between mt-4 items-center">
                                <div class="flex items-center">
                                    <img src="${(author && author.img) ? author.img : 'images/Avatar.jpg' }" class="w-10 h-10 rounded-full" alt="">
                                    <div class="ml-1.5">
                                        <h1 class="text-neutral-500 text-sm font-medium leading-none">${author ? author.name : "Unknown author"}</h1>
                                        <small class="text-neutral-400">${author ? author.published_date : "unknown date" }</small>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <i class="fa fa-eye"></i>
                                    <h2 class="ml-1 text-neutral-500 text-sm font-medium">${total_view}</h2>
                                </div>
                                <div>
                                    <div class="rating">
                                      <input type="radio" name="rating-4" class="w-4 ml-1 mask mask-star-2 bg-blue-500" />
                                      <input type="radio" name="rating-4" class="w-4 ml-1 mask mask-star-2 bg-blue-500" checked />
                                      <input type="radio" name="rating-4" class="w-4 ml-1 mask mask-star-2 bg-blue-500" checked />
                                      <input type="radio" name="rating-4" class="w-4 ml-1 mask mask-star-2 bg-blue-500" />
                                      <input type="radio" name="rating-4" class="w-4 ml-1 mask mask-star-2 bg-blue-500" />
                                    </div>
                                </div>
                                
                                <div>
                                      <i class="fa fa-arrow-right"></i>
                                </div>
                            </div>
                      
                      </div>
                  </div>
			</div>
             `

            let div = createDomElement("div", "mx-3 p-4", {
                innerHTML: newsMarkup,
                events: {
                    "click": (e)=> alert("hi")
                }
            });

            newsContainer.appendChild(div)

        })
    } else {
        // handle error
    }
})