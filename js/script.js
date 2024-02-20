'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  // console.log(event);
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  /* add class 'active' to the clicked link */
  // console.log('clickedElement:', clickedElement);
  // console.log('clickedElement (with plus): ' + clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles  = document.querySelectorAll('.posts article.active');
  // console.log(activeArticles);

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const activeSelector= this.getAttribute('href');
  console.log(activeSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle= document.querySelector(activeSelector);
  console.log('szukany artykuł');
  // console.log(targetArticle);
  
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

function generateTitleLinks(){
  //delete content of link list on left side
  const linkList =  document.querySelector(optTitleListSelector);
  linkList.innerHTML='';

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';
  for(let article of articles){ // Corrected loop to use for...of
    
    /* get the article id */
    let articleID= article.id;
    // console.log(articleID);
    
    /* find the title element */
    /* get the title from the title element */
    let articleTitle= article.querySelector(optTitleSelector).innerHTML;
    // console.log(article.querySelector(optTitleSelector).innerHTML);

    const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';

    // console.log(linkHTML);

    html = html + linkHTML;
  }

  /* insert link into titleList */
  linkList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  console.log('events added');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }


}

generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  

  /* START LOOP: for every article: */

  for(let article of articles){
  // console.log(article);

    /* find tags wrapper */
    const articlesTagsWrapper = article.querySelector(optArticleTagsSelector);
    // console.log(articlesTagsWrapper);
  
    /* make html variable with empty string */
    let HTML='';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log(article)
    // console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      // console.log(tag);
      /* generate HTML of the link */
      let HTML_tag='<li><a href="#'+'tag-'+ tag +'">'+tag+'</a></li>';
      // '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
      /* add generated code to html variable */
      HTML=HTML+' '+HTML_tag;
      /* END LOOP: for each tag */
      console.log(HTML_tag);
    }
    /* insert HTML of all the links into the tags wrapper */
    articlesTagsWrapper.innerHTML=HTML;
    /* END LOOP: for every article: */
  }
}

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('data-tags');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.split('-')[1].split('"')[0];
  console.log(tag);
  /* find all tag links with class active */
  document.querySelector('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */

  /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

  /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

  /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();

generateTags();