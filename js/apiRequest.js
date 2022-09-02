
function getAllCategory(callback){
    fetch("https://openapi.programming-hero.com/api/news/categories")
        .then(response=>response.json())
        .then((data)=>{
            callback(data.data.news_category)
        })
        .catch((ex)=>callback(null))
}


function getNewsByCategoryId(categoryId, callback){
    fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
        .then(response=>response.json())
        .then((data)=>{
            if(data.status){
                callback(data.data, "")
            } else {
                callback([], "")
            }
        })
        .catch((ex)=>callback(null, ex.message))
}

