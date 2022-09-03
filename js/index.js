
// loader element
let loader = findById("loading")
let noNewsMessage = findById("no-news-message")

// category list container
const categoryList = findById("category-list")

// fetch news slats message container
const newsCountMessage = findById("news-count-message")

// sort input
const sortInput = findById("sort")



// Application State Variables
let activeCategory = {
    id: "05",
    name: "Entertainment"
}

let sortBy = {
    name: "total_view",
    order: -1, // -1 first show total count of number
}

// store all fetched news. because we will sort without duplicate api call.
let fetchedNews = []


window.addEventListener("DOMContentLoaded", (e)=>{

    // fetch all categories;
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


    // load initial news
    fetchNewsHandler(activeCategory.id)

})




// handle click on each news item
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


// array sort handler fn
function sortHandler(a, b) {
    let order = sortBy.order
    let property = sortBy.name


    let result = (a[property] > b[property]) ? 1 : (a[property] < b[property]) ? -1 : 0;

    return result * order
}


// all news container
const newsContainer = findById("news-container")


// fetch all news and render in dom
function fetchNewsHandler(id) {

    newsCountMessage.innerText = ""
    noNewsMessage.innerText = ""

    getNewsByCategoryId(id, (news, errMessage) => {
        // hide news loader
        loader.classList.add("hidden")
        newsContainer.innerHTML = null

        // set default sort by total_view
        sortBy = {
            name: "total_view",
            order: -1
        }
        // set default sort value in select
        sortInput.value = "total_view"

        if (!errMessage) {

            if (news.length === 0) {
                newsCountMessage.innerText = `No news found for category ${activeCategory.name}`
                noNewsMessage.innerText = "No News Found"
                return;
            }

            // store news in global variable
            fetchedNews = news

            // update response message
            newsCountMessage.innerText = `${news.length} items found for category ${activeCategory.name}`

            newsContainer.innerHTML = null
            createNews(news)

        } else {
            // handle error
            newsCountMessage.innerText = errMessage
            noNewsMessage.innerText = "No news fetched because internet interrupt"
        }
    })
}



// loop all news and populated in dom
function createNews(news){
    news.sort(sortHandler).forEach((eachNews) => {
        const {
            author,
            thumbnail_url,
            title,
            total_view,
            details,
            _id,
        } = eachNews

        let newsMarkup = `
                 <div class="card bg-white shadow-xs p-6 my-8">
                      <div class="flex flex-col md:flex-row">
                           <div class="news-thumb w-full md:w-auto  mx-auto md:mx-auto">
                                <img class="rounded-2xl w-full" src="${thumbnail_url}" alt="news-thumbnail" />
                            </div>
                          <div class="w-full ml-0 md:ml-4 mt-6 md:mt-0">
                                
                                <div class="flex flex-col h-full justify-between">
                                    <div class="">
                                        <h2 class="card-title text-neutral-700 mb-2">${title}</h2>
                                         <p>${details.length > 700 ? `
                                                <span>${details.substring(0, 700)}...</span> 
                                                <button class="btn-link text-blue-400 ml-2">read more</button>
                                            ` : details} 
                                          </p>
                                    </div>
                                  
                                     <div class="card-footer grid gap-y-4 md:grid-flow-col grid-cols-2 md:grid-cols-none justify-between  items-center">
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
                                              <i class="fa fa-arrow-right text-blue-400 cursor-pointer" onclick="fetchNewsDetails('${_id}')"></i>
                                        </div>
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
}



// change sort value event listener
sortInput.addEventListener("change", (e)=>{
    if(e.target.value === "total_view"){
        sortBy = {
            name: "total_view",
            order: -1
        }
    } else if(e.target.value === "rating") {
        sortBy = {
            name: "rating.number",
            order: -1
        }
    } else if(e.target.value === "title") {
        sortBy = {
            name: "title",
            order: 1
        }
    }
    newsContainer.innerHTML = null
    createNews(fetchedNews)
})



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
            modalContent.innerHTML = `
             <div>
                <h1 class="text-2xl text-center mt-4 font-medium">No news found with give id ${newsId}</h1> 
            </div>
           `
            return;
        }

        const {author, others_info,  title, total_view, rating, details, image_url} = data.data[0]

        modalContent.innerHTML = `
             <div>
                <div class="flex justify-between items-center">
                    <div>
                        <div class="flex items-center">
                            <img class="w-7 rounded-full h-7" src="${author && author.img && author.img}}" alt="">
                            <h1 class="ml-2">${author && author.name ? author.name : "no author name found"}</h1>
                        </div>
                        <h1 class="text-2xl mt-2 text-neutral-900 font-medium">${title}</h1>
                    </div>
                    <button class="btn bg-blue-600" onclick="closeModal()">
                        <i class="fa fa-times"></i>
                    </button>
        
                </div>
        
                <div class="flex gap-x-4 my-4 items-center flex-wrap gap-2">
                    <div class="category-item active-category">
                        ${activeCategory.name}
                    </div>
            
                    
                    ${others_info && others_info.is_trending ? `
                        <div class="category-item active-category">Trending</div>
                    ` : ""}
                    
                </div>
                
                <div class="flex gap-x-4 my-4 items-center flex-wrap gap-2">
                    <span>
                        <div class="flex bg-blue-500 px-4 py-1 items-center text-white rounded">
                            <span class="text-md">${rating.number}</span>
                            <i class="fa fa-star ml-1 -mt-1 text-sm"></i>
                        </div>
                    </span>
                    <span>
                        <i class="fa fa-eye"></i>
                        <span>${total_view ? total_view : "No Data found "}</span>
                    </span>
        
                    <div>
                        <i class="far fa-clock"></i>
                        <span class="text-neutral-400 font-medium">${author.published_date}</span>
                    </div>
                </div>
        
                <div class="w-full">
                    <img class="w-full" src="${image_url}" alt="">
                </div>
        
                <p class="mt-4">${details}</p>
            </div>           
                         
        `


    } catch (ex) {
        modalContent.innerHTML = `
             <div>
                <h1 class="text-2xl text-center mt-4 font-medium">No news found with give id ${newsId}</h1> 
            </div>
        `
    }

}

