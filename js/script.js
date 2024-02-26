/* global Handlebars */
const templates = {
  authors: Handlebars.compile(document.querySelector('#template-author').innerHTML),
  articleTagCloud: Handlebars.compile(document.querySelector('#template-article-tag-cloud').innerHTML),
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
};

'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorSelector = '.post-author',
  optAuthorsListSelector = '.list.authors';



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
    let articleId= article.id;
    
    /* find the title element */
    /* get the title from the title element */
    let articleTitle= article.querySelector(optTitleSelector).innerHTML;
    // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {'id': articleId, 'title': articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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

function calculateTagsParams(tags){
  let tagParams={};

  let min=0,max=0;

  for(let tag in tags){
    if(tags[tag]>max){
      max=tags[tag];
    }
  }

  min=max;
  for(let tag in tags){
    if(tags[tag]<min){
      min=tags[tag];
    }
  }

  tagParams['min']=min;
  tagParams['max']=max;

  return tagParams;
}

function calculateTagClass(count,params){
  const difference = params['max']-params['min'];
  const nextSize = difference / optCloudClassCount;
  let size;
  for(let i=1; i<=optCloudClassCount;i++){
    if((count>=params['min']) && (count<(params['min'] + i*nextSize))){
      size=i;
      break;
    }
  }

  if(count==params['max']){
    size=optCloudClassCount;
  }

  return optCloudClassPrefix + size;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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
      // console.log(tag);
      // const HTML_tag='<li><a href="#'+'tag-'+ tag +'">'+tag+'</a></li>';
      //                 <li><a href="#design"><span>design</span></a></li>
      const tagHTMLData = {'tag': tag};
      const HTML_tag = templates.articleTag(tagHTMLData);
      // console.log(HTML_tag);
      // '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
      /* add generated code to html variable */
      HTML=HTML+' '+HTML_tag;
      /* END LOOP: for each tag */

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag]=1;
      }else{
        allTags[tag]++;
      }

    }
    // console.log(HTML);
    /* insert HTML of all the links into the tags wrapper */
    articlesTagsWrapper.innerHTML=HTML;
    /* END LOOP: for every article: */
    
  }

  // console.log(allTags);
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  // console.log('tagsParams: ', tagsParams);
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    const tagLinkHTML = calculateTagClass(allTags[tag],tagsParams);
    // console.log(tag + ' tagLinkHTML calculated size',tagLinkHTML);
    // before changes
    //<li><a href="#author-by Marion Berry">by Marion Berry (3) </a></li>
    // let HTML_tag='<li><a class="' + tagLinkHTML +'" href="#'+'tag-'+ tag +'">'+tag + '</a></li>';
    const tagHTMLData = {'tagLinkHTML':tagLinkHTML,'tag': tag};
    const HTML_tag = templates.articleTagCloud(tagHTMLData);
    allTagsHTML +=HTML_tag;
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /* [NEW] add htmlfor allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
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

function generateAuthors(){
  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    const author = article.querySelector(optAuthorSelector).innerHTML;

    if(!allAuthors.hasOwnProperty(author)){
      /* [NEW] add generated code to allTags array */
      allAuthors[author]=1;
    }else{
      allAuthors[author]++;
    }
  }

  const authorsList = document.querySelector(optAuthorsListSelector);
  authorsList.innerHTML='';
  let HTML='';
  for(let author in allAuthors){
    // let HTML_tag='<li><a href="#'+'author-'+ author +'">'+author+' ('+ allAuthors[author] + ') </a></li>';
    const tagHTMLData = {'author':author,'amountOfArticles': allAuthors[author]};
    const HTML_tag = templates.authors(tagHTMLData);
    HTML += HTML_tag;
  }
  authorsList.innerHTML=HTML;
}

generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('click');

  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.split('-')[1];
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('.titles a.active');
  /* START LOOP: for each active tag link */
  for(let activeLink of activeLinks){
  /* remove class active */
    activeLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const linksWithGivenHref = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each found tag link */
  for(let link of linksWithGivenHref){
  /* add class active */
    link.classList.add('active');
  /* END LOOP: for each found tag link */
  }

  // console.log("we look for article of ",author)
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const authors = document.querySelectorAll('a[href^="#author-"]');

  // console.log(authors);
  for(let author of authors){
    // console.log(author);
    author.addEventListener('click', authorClickHandler);
  }

}


addClickListenersToAuthors();

function addClickListenersToTags(){
  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let link of allLinksToTags){
  /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

