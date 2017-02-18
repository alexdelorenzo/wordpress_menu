 // Copyright Alex DeLorenzo 2017

 // Dynamic Drop Down Menu for Wordpress
 //     Theme agnostic.

 //     Dependencies: 
 //         - compatible browser or babel (w/ es2015,stage-2 + polyfill) + fetch polyfill
 //         - jQuery
                   
 //     Usage:

 //        1) Embed this script in your page.

 //        2) Wrap name of a menu entry with:

 //            <div class="dd_menu" id="category_name">
 //                Your Menu Entry Name Goes Here
 //            </div>
          
 //          Where `category_name` is a category used to tag articles with

 //        3) A dynamic menu will now appear under your menu item. 
 //           It will adopt your Wordpress theme's appearance and behavior.
       


const BASE_URL = `${window.location.protocol}//${window.location.hostname}`
const CATEGORY_ENDPOINT = "/wp-json/wp/v2/categories"
const CATEGORY_SEARCH_URL = BASE_URL + CATEGORY_ENDPOINT + '?search='
const MENU_CSS = ".dd_menu"


function get_menus() {
    return $(MENU_CSS);
}

async function get_posts_url_for_category(category) {
    const url = CATEGORY_SEARCH_URL + category;
    
    try {
        const response = await fetch(url);
        const json = await response.json();

        return json[0]['_links']['wp:post_type'][0]['href']
    }

    catch (err) {
        console.error(err);

        throw new Error(`Dynamic Menu for Wordpress error: Error parsing json from GET ${url}`)
    }

}


async function get_posts_for_category(category) {
    let post_url = "";

    try {
        post_url = await get_posts_url_for_category(category);
        const posts_response = await fetch(post_url);
        const posts_json = await posts_response.json();

        return posts_json;
    }

    catch (err) {
        console.error(err);

        throw new Error(`Dynamic Menu for Wordpress error: Error parsing json from GET ${post_url}`)
    }
}


function get_post_titles(posts_json) {
    return posts_json.map(post_json => post_json['title']['rendered'])
}


function get_post_urls(posts_json) {
    return posts_json.map(post_json => post_json['link'])
}


function get_menu_html(titles, urls) {
    const html = ['<ul class="sub-menu dd_submenu">'];

    for (let i = 0; i < titles.length; i++) {
        html.push(`<li id="menu-item-${i}" class="menu-item menu-item-type-post_type menu-item-object-post menu-item-${i} dd_submenu_item">
                        <a href="${urls[i]}">${titles[i]}</a>
                   </li>`)
    }

    html.push("</ul>")

    return html.join('\n')
}


function get_html_from_json(posts_json) {
    const titles = get_post_titles(posts_json)
    const urls = get_post_urls(posts_json)

    return get_menu_html(titles, urls)
}


async function attach_menu(menu) {
    const category = menu.id;
    const posts_json = await get_posts_for_category(category);
    const html = $(get_html_from_json(posts_json));

    const parent_li = $(menu).parent().parent();
    //parent_li.find("ul").remove();
    parent_li.append(html);
}


async function attach_menus() {
    const menus = get_menus().toArray();

    return Promise.all(menus.map(attach_menu))
}


function execute_if_not_mobile(callback, ...args) {
    return function (...new_args) {
            if (!"/Mobi/".test(navigator.userAgent)) {
                return callback(...args, ...new_args)
        }
    }
}

document.addEventListener('DOMContentLoaded', execute_if_not_mobile(attach_menus), false);
