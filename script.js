const accessKey="F7fqK7lZyJHfSdgCFOFMSpxMlJuyXvuubgaJRvFh1xk";// this is Api key of unsplash.com//

const formEl = document.querySelector("form");
const inputEl= document.getElementById("search-input");
const searchResults= document.querySelector(".search-results");
const showMore=document.querySelector("#show-more-button");

let inputData="";
let page=1;

async function searchImages(){
    inputData=inputEl.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page===1){
        searchResults.innerHTML="";
    }
    
    results.map((result)=>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image= document.createElement("img");
        image.src = result.urls.small;
        image.alt= result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target="_blank";//Its primary purpose is to control how a linked document (usually a URL) will be opened. When you set target="_blank" on an anchor tag, it instructs the web browser to open the linked document in a new tab or window, rather than in the current tab.//
        imageLink.textContent=result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });
page++
if(page>1){
    showMore.style.display="block"
  }
}
formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchImages();
});

showMore.addEventListener("click",()=>{
    searchImages();
})