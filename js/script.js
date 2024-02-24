'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optTagsListSelector = '.tags.list';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles  = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const activeSelector= this.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle= document.querySelector(activeSelector);
  
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = ''){
  //delete content of link list on left side
  const linkList =  document.querySelector(optTitleListSelector);
  linkList.innerHTML='';

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';
  for(let article of articles){ // Corrected loop to use for...of
    
    /* get the article id */
    let articleID= article.id;
    
    /* find the title element */
    /* get the title from the title element */
    let articleTitle= article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }

  /* insert link into titleList */
  linkList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for(let article of articles){
    /* find tags wrapper */
    const articlesTagsWrapper = article.querySelector(optArticleTagsSelector);
  
    /* make html variable with empty string */
    let HTML='';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      let HTML_tag='<li><a href="#'+'tag-'+ tag +'">'+tag+'</a></li>';
      // '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
      /* add generated code to html variable */
      HTML=HTML+' '+HTML_tag;
      /* END LOOP: for each tag */



      /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(HTML_tag) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(HTML_tag);
      }else if(allTags.indexOf(HTML_tag) != -1){
        console.log('link repeated: '+HTML_tag+' is aleready in array');
      }


    }


    /* insert HTML of all the links into the tags wrapper */
    articlesTagsWrapper.innerHTML=HTML;
    /* END LOOP: for every article: */
    
    
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
  console.log(allTags);

}

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.split('-')[1];
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('.titles a.active');
  /* START LOOP: for each active tag link */
  for(let activeLink of activeLinks){
  /* remove class active */
    activeLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const linksWithGivenHref = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each found tag link */
  for(let link of linksWithGivenHref){
  /* add class active */
    link.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

generateTags();

function addClickListenersToTags(){
  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('.post-tags a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let link of allLinksToTags){
  /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

