let libraryBgContainer = document.getElementById("libraryBgContainer");
// let libraryBgContainer = document.createElement("div");
// document.body.appendChild(libraryBgContainer);

let topSectionContainer = document.createElement("div");
topSectionContainer.classList.add("p-5", "text-center");
topSectionContainer.style.backgroundImage = "url('https://assets.ccbp.in/frontend/dynamic-webapps/library-management-bg.png')";
libraryBgContainer.appendChild(topSectionContainer);

let mainHeading = document.createElement("h1");
mainHeading.textContent = "Library Management";
mainHeading.classList.add("text-white","mb-3");
mainHeading.style.fontFamily = "Roboto";
topSectionContainer.appendChild(mainHeading);

let userInput = document.createElement("input");
userInput.classList.add("form-control","w-100","p-3");
userInput.id = "searchInput";
userInput.placeholder = "Type book title";
topSectionContainer.appendChild(userInput);


let displayContainer = document.createElement("div");
displayContainer.classList.add("mt-3","text-center");
libraryBgContainer.appendChild(displayContainer);


function createAndAppend(item){
    let {imageLink, title} = item;

    // let resultsHeading = document.createElement("h1");
    let finalContainer = document.createElement("div");
    finalContainer.classList.add("col-12");

    let imgEl = document.createElement("img");
    imgEl.src = imageLink;
    finalContainer.appendChild(imgEl);

    let para = document.createElement("p");
    para.textContent = title;
    finalContainer.appendChild(para);
    displayContainer.appendChild(finalContainer);

}

function displayResults(search_results) {
    for (let item of search_results){
        createAndAppend(item)
    }
}

function searchUserInput(){
    let url = "https://apis.ccbp.in/book-store?title=" + userInput.value;
    let option = {
        Method: "GET"
    };
    fetch(url, option)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        console.log(jsonData)
        let {search_results} = jsonData;
        if (search_results.length === 0){
            displayContainer.textContent = ""
            let para1 = document.createElement("p");
            para1.textContent = "No Results found";
            para1.classList.add("text-center");
            para1.style.color = "#323f4b";
            para1.style.fontSize = "48px";
            para1.style.fontFamily = "Roboto";
            para1.style.fontWeight = "bold";
            displayContainer.appendChild(para1);
        }
        else{
            displayContainer.textContent = ""
            let para2 = document.createElement("p");
            para2.textContent = "Popular Books";
            para2.classList.add("text-center");
            para2.style.color = "#323f4b";
            para2.style.fontSize = "48px";
            para2.style.fontFamily = "Roboto";
            para2.style.fontWeight = "bold";
            displayContainer.appendChild(para2);
            displayResults(search_results);

        }
    });

}

userInput.addEventListener("keydown", function(event){
    if (event.key === "Enter"){
        searchUserInput();
        userInput.value = "";
    }
});