
// get element by id
const findById = id => {
    return document.getElementById(id)
}

// modal open handler
const openModal = () => {
    let modalRoot = findById("my-modal")
    modalRoot.classList.add("open-modal")
}


// modal close handler
const closeModal = () => {
    let modalRoot = findById("my-modal")
    modalRoot.classList.remove("open-modal")
}


// toggle Loader
const toggleLoader = (isShow) => {
    let loader = findById("loading")
    if(isShow){
        loader.classList.add("block")
        loader.classList.remove("hidden")
    } else{
        loader.classList.add("hidden")
        loader.classList.remove("block")
    }
}


/// create dynamically html element with functions

const createDomElement = (tagName="div", className, other)=>{
    let element = document.createElement(tagName)

    if(!other){
        return  element;
    }

    const { innerHTML, innerText, events } = other

    if(className){
        className.split(" ").map(cls=>{
            element.classList.add(cls)
        })
    }
    if(innerHTML) element.innerHTML = innerHTML
    if(innerText) element.innerText = innerText

    if(events && typeof events === "object"){
        for (const eventsKey in events) {
            element.addEventListener(eventsKey, events[eventsKey])
        }
    }

    return element;

}
