const blogs = [
    {
        title: "What is Difference between var, let, and const in JavaScript ?",
        author: {
            name: "Rasel Mahmud",
            avatar: "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1660078654/netflix/images/1660078488473.jpg",
        },
        createdAt: "Sat Sep 02 2022",
        views: "1K",
        rate: 5,
        details:  `
            In JavaScript, the keywords var, let, and const are a bit confusing
        
            Scope:
            Variables declared with var are in the function scope. let and const are in the block scope.
            
            Hoisting:
            Hoisting means that you can assign a variable value before its declaration.  
            var keyword we can declare var variables after defining them. but const and let keyword get an error. that means they not support hoisting
            
            Reassign the value:
            Reassign a value is to reassign the value of a variable. let and var support it.
            but const variable like constant value. you can update value but not reassign again.
        `
    },
    {
        title: "What is Difference between Arrow function and Regular function ?",
        author: {
            name: "Rasel Mahmud",
            avatar: "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1660078654/netflix/images/1660078488473.jpg",
        },
        createdAt: "Sat Sep 03 2022",
        views: "10M",
        rate: 3,
        details:  `
            Arrow functions – a new feature introduced in ES6 – to enable writing concise functions in JavaScript. 
            Although both regular and arrow functions work in a similar, 
            yet there are certain interesting differences between.
            
            Hoisting:
            Hoisting means that you can assign a variable value before its declaration.  
            arrow function can not use before declaration. but regular function we can use before it declaration
            
            Execution context (this):
            Regular arrow function has dynamic context value, although it depends on how the function is invoked. In Arrow function doesn't define its own execution context.      
            
            Constructors:
            Regular arrow function can easily construct objects. But but arrow function cannot be used as a constructor 
            
            Arguments object:
            Inside the body of a regular function, arguments is a special array-like object containing the list of arguments with which the function has been invoked.
            On the other side, no arguments special keyword is defined inside an arrow function.
            
            Implicit return:
            return expression statement returns the result from a regular function. other hand,
            If the arrow function contains one expression, and you omit the function's curly braces, then the expression is implicitly returned
        `
    },
    {
        title: "What is Difference between map, foreach, filter, find in javascript ?",
        author: {
            name: "Rasel Mahmud",
            avatar: "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1660078654/netflix/images/1660078488473.jpg",
        },
        createdAt: "Sat Sep 03 2022",
        views: "20K",
        rate: 4,
        details:  ` 
            .map():
            .map() is used to iterate every element in an array and returns a new array with the updated elements.  
              
            .forEach:
            .forEach(), is used to iterate every element in an array but it does not change the array and it returns undefined.   
          
            .filter():
            .filter() is used to iterate every element in an array and checks every element to see if it conditions true and returns a new array with the elements that return truthy     
            
            .find():
            .find() is same as filter but it return first one item that matched instead of array if not conditions false return undefined      
        `
    },
    {
        title: "Why we use template string ?",
        author: {
            name: "Rasel Mahmud",
            avatar: "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1660078654/netflix/images/1660078488473.jpg",
        },
        createdAt: "Sat Sep 03 2022",
        views: "10M",
        rate: 4.5,
        details:  `
            To make string dynamic and use inside any js valid expression we use template string Template strings are a powerful feature of modern JavaScript released in ES6. 
            It lets us insert/interpolate variables and expressions into strings without needing to concatenate like in older versions of JavaScript. 
            It allows us to create strings that are complex and contain dynamic elements.
            
            Another great feature of template strings is that we can have strings with multiple lines for better code readability. With the old style of strings, we had to concatenate each line of the string to put long strings in multiple lines
            
            Nesting Templates:
Template    strings can be nested in each other. Template strings allow us to nest regular strings or template strings within template strings.
        `
    }
]


const blogContainer = findById("blog-container")

blogContainer.innerHTML = null;

blogs.forEach(blog=>{
    const blogElement = createDomElement("div")

    const markup = `
                 <div class="mb-10 bg-white p-4 rounded-md shadow-xs">
          
                        <div>
                            <div class="flex items-center">
                                <img class="w-7 rounded-full h-7" src="${blog.author.avatar}" alt="">
                                <h1 class="ml-2 text-neutral-600">${blog.author.name}</h1>
                            </div>
                            <h1 class="text-2xl text-neutral-900 font-medium mt-4">${blog.title}</h1>
                        </div>
                           
                
                        <div class="flex gap-x-4 my-4 items-center">
                            <span>
                                <div class="flex bg-blue-500 px-4 py-1 items-center text-white rounded">
                                    <span class="text-sm">${blog.rate}</span>
                                    <i class="fa fa-star ml-1 -mt-1 text-sm"></i>
                                </div>
                            </span>
                            <span>
                                <i class="fa fa-eye"></i>
                                <span class="text-neutral-400 text-sm">${blog.views}</span>
                            </span>
                
                            <div>
                                <i class="far fa-clock"></i>
                                <span class="text-neutral-400 text-sm">${blog.createdAt}</span>
                            </div>
                        </div>
            
                
                     <p class="mt-4 whitespace-pre-line text-neutral-600">${blog.details}</p>
<!--                      <button class="btn-link text-blue-500">Read more</button> -->
                </div>           
                             
            `
    blogElement.innerHTML = markup
    blogContainer.appendChild(blogElement)
})
