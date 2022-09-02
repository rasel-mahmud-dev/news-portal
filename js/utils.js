

function findById(id){
    return document.getElementById(id)
}




function getAllCategory(callback){
    fetch("https://openapi.programming-hero.com/api/news/categories")
        .then(response=>response.json())
        .then((data)=>{
            callback(data.data.news_category)
        })
        .catch(callback(null))
}