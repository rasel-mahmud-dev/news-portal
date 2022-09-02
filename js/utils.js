

function findById(id){
    return document.getElementById(id)
}




/// create daynamacally html element with functions

function createDomElement(tagName="div", className, other){
    let element = document.createElement(tagName)

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

