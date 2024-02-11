'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
  /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }
    
  /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);
    clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
    const activeArticles  = document.querySelectorAll('.posts article.active');
    console.log(activeArticles)

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

  /* get 'href' attribute from the clicked link */
  const activeSelector= this.getAttribute("href");
    console.log(activeSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
const targetArticle= document.querySelector(activeSelector);
console.log("szukany artykuł");
console.log(targetArticle);


  /* add class 'active' to the correct article */
  targetArticle.classList.add("active");
}



const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTitleLinks(){
  console.log("funkcja generateTitleLinks uruchomina")
  //usuń zawartość listy linków w lewej kolumnie,
  const linkList =  document.querySelector(".titles.list");
  linkList.innerHTML="";
}

generateTitleLinks()