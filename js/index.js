// Application State Variables
let activeCategory = {
    id: "05",
    name: "Entertainment"
}


// loader element
let loader = findById("loading")
let noNewsMessage = findById("no-news-message")


const categoryList = findById("category-list")


/**
 TASK: Category List insert
 step 1   => get categories list container
 step 2   => get categories name from api call
 step 3   => create li category dom element
 step 4   => push li inside category container

 step 5  => click category to fetch news for other categories
 */

getAllCategory((categoryData) => {
    if (categoryData) {
        categoryData.forEach((category) => {

            let li = createDomElement("li", "category-item", {
                innerText: category.category_name
            })

            li.addEventListener("click", (e) => handleClickOnCategory(li, category.category_id))

            categoryList.appendChild(li)

            if (category.category_id === activeCategory.id) {
                li.className = "category-item active-category"
            }
        })
    }
})


function handleClickOnCategory(element, categoryId) {
    activeCategory = {
        id: categoryId,
        name: element.innerText
    }

    // remove  active class that clicked before
    let findActiveCategory = document.querySelector(".active-category")

    findActiveCategory && findActiveCategory.classList.remove("active-category")

    // add active class that has been clicked
    element.classList.add("active-category")


    // start loader animation
    loader.classList.add("block")
    loader.classList.remove("hidden")


    // re-fetch all news for other categories
    fetchNewsHandler(categoryId);
}


function sortByViews(itemA, itemB) {
    if (itemA.total_view > itemB.total_view) {
        return 1
    } else if (itemA.total_view < itemB.total_view) {
        return 0
    } else {
        return -1
    }
}


// handle news

// all news container
const newsContainer = findById("news-container")

// fetch news slats message container
const newsCountMessage = findById("news-count-message")


function fetchNewsHandler(id) {
    getNewsByCategoryId(id, (news, errMessage) => {

        // hide news loader
        loader.classList.add("hidden")
        newsContainer.innerHTML = null


        if (!errMessage) {

            if (news.length === 0) {
                newsCountMessage.innerText = `No news found for category ${activeCategory.name}`
                noNewsMessage.innerText = "No News Found"
                return;
            }

            // update response message
            newsCountMessage.innerText = `${news.length} items found for category ${activeCategory.name}`

            newsContainer.innerHTML = null

            news.sort(sortByViews).forEach((eachNews) => {

                const {
                    author,
                    thumbnail_url,
                    title,
                    total_view,
                    _id,
                    details,
                } = eachNews

                let newsMarkup = `
                 <div class="card bg-white shadow-xs p-6 my-8">
                      <div class="flex flex-col md:flex-row">
                           <div class="news-thumb w-full mx-auto md:mx-auto">
                                <img class="rounded-2xl w-full" src="${thumbnail_url}" alt="news-thumbnail" />
                            </div>
                          <div class="card-bod ml-0 md:ml-4 mt-6 md:mt-0">
                                <h2 class="card-title text-neutral-700 mb-2">${title}</h2>
                                 <p>${details.length > 700 ? `
                                        <span>${details.substring(0, 700)}...</span> 
                                        <button class="btn-link text-blue-400 ml-2">read more</button>
                                    ` : details} 
                                  </p>
                              
                                  <div class="card-footer grid gap-y-4 md:grid-flow-col grid-cols-2 md:grid-cols-none justify-between mt-4 items-center">
                                    <div class="flex items-center">
                                        <img src="${(author && author.img) ? author.img : 'images/Avatar.jpg'}" class="w-10 h-10 rounded-full" alt="">
                                        <div class="ml-1.5">
                                            <h1 class="text-neutral-500 text-sm font-medium leading-none">${author ? author.name : "Unknown author"}</h1>
                                            <small class="text-neutral-400">${author ? author.published_date : "unknown date"}</small>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-self-end">
                                        <i class="fa fa-eye"></i>
                                        <h2 class="ml-1 text-neutral-500 text-sm font-medium">${total_view}</h2>
                                    </div>
                                    <div>
                                        <div class="rating">
                                          <input type="radio" name="rating-4" class="w-4 ml-1 mask mask-star-2 bg-blue-500" />
                                          <input type="radio" name="rating-4" class="w-4 ml-1 mask mask-star-2 bg-blue-500" checked />
                                          <input type="radio" name="rating-5" class="w-4 ml-1 mask mask-star-2 bg-blue-500" checked />
                                          <input type="radio" name="rating-4" class="w-4 ml-1 mask mask-star-2 bg-blue-500" />
                                          <input type="radio" name="rating-4" class="w-4 ml-1 mask mask-star-2 bg-blue-500" />
                                        </div>
                                    </div>
                                    
                                    <div class="justify-self-end">
                                          <i class="fa fa-arrow-right"></i>
                                    </div>
                                </div>
                          
                          </div>
                      </div>
                </div>
             `

                let div = createDomElement("div", "", {
                    innerHTML: newsMarkup,
                    events: {
                        "click": () => fetchNewsDetails(_id)
                    }
                });

                newsContainer.appendChild(div)

            })
        } else {
            // handle error
            newsCountMessage.innerText = errMessage
            noNewsMessage.innerText = "No news fetched because internet interrupt"
        }
    })
}

fetchNewsHandler(activeCategory.id)




// fetch news details and insert into modal
async function fetchNewsDetails(newsId) {
    // open modal
    openModal();

    const modalContent = findById("modal-content");
    modalContent.innerHTML = null

    try {
        let res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        let data = await res.json()
        if (!data.status) {
            return;
        }


        data.data.forEach((news) => {
            const {author, category_id, thumbnail_url, title, total_view, rating, _id, details, image_url,} = news
            const t = `
                 <div>
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="flex items-center">
                                <img class="w-7 rounded-full h-7" src="${author.img}" alt="">
                                <h1 class="ml-2">${author.name}</h1>
                            </div>
                            <h1 class="text-2xl text-neutral-900 font-medium">${title}</h1>
                        </div>
                        <button class="btn bg-blue-600" onclick="closeModal()">
                            <i class="fa fa-times"></i>
                        </button>
            
                    </div>
            
                    <div class="flex gap-x-4 my-4 items-center">
                        <span>
                            <div class="flex bg-blue-500 px-4 py-1 items-center text-white rounded">
                                <span class="text-md">${rating.number}</span>
                                <i class="fa fa-star ml-1 -mt-1 text-sm"></i>
                            </div>
                        </span>
                        <span>
                            <i class="fa fa-eye"></i>
                            <span>${total_view}</span>
                        </span>
            
                        <div>
                            <i class="fa fa-clock"></i>
                            <span class="text-neutral-400 font-medium">${"author"}</span>
                        </div>
                    </div>
            
                    <div class="w-full">
                        <img class="w-full" src="${image_url}" alt="">
                    </div>
            
                    <p class="mt-4">${details}</p>
                </div>           
                             
            `
            modalContent.innerHTML = t
        })

    } catch (ex) {

    }

}