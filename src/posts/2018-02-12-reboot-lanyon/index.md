---
type: blog-post
title: Launching my new jekyll theme on website
cover: "https://unsplash.it/400/300/?random?BoldMage"
tags: ['HTML5', 'CSS3']
categories: ['Website']
excerpt_separator: <!--more-->
published_date: "2018-02-12 16:37:28+05:30"
assets: /assets/blog/2018-02-12-new-jekyll-theme
related: true
comments: true
sharing: true
publish: true
toc: true
toc_label: "On this page"
toc_icon: "table"  # corresponding Font Awesome icon name (without fa prefix)
---

Recently, I've been working on a jekyll theme which has the look and feel of the [lanyon theme](https://lanyon.getpoole.com) and is suitable for any screen type. Also, I wanted the theme to be easily maintainable for adding new features. This has resulted in this new jekyll theme. The core idealogy of this website's theme has been derived from the lanyon theme.<!--more-->

The theme is open-sourced under MIT License.

# Instructions to use

- Fork the repository from the following [link](https://github.com/sonapraneeth-a/jekyll_theme)
- Update the ```_config.yml``` file present in the source folder

# Features

Some of the main features available on this theme:
- Formatting text in markdown
- Code highlighting using [prism.js](http://prismjs.com/)
- Input code from file
- $\LaTeX$ integration
- Adding figures
- Utility classes like info, danger, success and warning
- Menus
    - Sidebar
    - Navigation bar
- FontAwesome icons for navigation menu items
- Blog posts
    - Sticky table of contents for the blog posts
    - Estimated time to read the post as well last modified date for the post
    - Sharing modules (facebook, gplus, twitter, linkedin etc.,) for all posts
    - Search box for searching through posts based on key works
    - Option for scrolling long posts
- Google Analytics for tracking


## Markdown markup

With the use of markdown, it is easy to generate the web-page content without worrying about HTML 

- **Bold**
- *Italics*
- [Sample link](https://www.google.co.in)

## Code highlighting

This is a test code written in C++ highlighted using monokai theme using rouge highlighter.

{% highlight cpp linenos %}
#include <cstdio>

int main()
{
    printf("Hello World\n");
    return 0;
}
{% endhighlight %}

```bash
$ sudo apt-get install vim-gnome
```
{% gist a4a981d0e479446054ee38cad99f5383 %}

## $\LaTeX$

LaTeX markup of Pythogoras theorem

$$ a^2 + b^2 = c^2 $$

## Utility Classes

Currently four utility classes are suported in theme: info, danger, success and warning.

### Several styled blockquotes

> **Information block**  
> First line
{: .block-info}

> **Danger block**  
> First line
{: .block-danger}

> **Success block**  
> First line
{: .block-success}

> **Warning block**  
> First line
{: .block-warning}

### Several styled text

- Information text
{: .info}
- Danger text
{: .danger}
- Success text
{: .success}
- Warning text
{: .warning}

## Menu

There are two types of menu's available in this theme.

### Sidebar

For convinience on mobile devices, there is a sidebar which can be toggled on/off by clicking on the hamburger icon (<i class="icon-menu"></i>). The functional behaviour of the sidebar has been used from [codinfox](https://codinfox.github.io).

### Navbar

For large screen devices, one can use the navigation bar present at the top of the screen for accessing various links. The navigation bar also highlights the current active page in the menu.

## Carousel

<div class="carousel-box">
    <div class="carousel-buttons">
        <button class="carousel-prev">
            <span class="carousel-offscreen">Previous</span>
        </button>
        <button class="carousel-next">
            <span class="carousel-offscreen">Next</span>
        </button>
    </div>
    <ol class="carousel-content">
        <li class="carousel-current"><!--<img src="http://lorempixel.com/200/200" alt="1">-->1</li>
        <li><!--<img src="http://lorempixel.com/200/200" alt="2">-->2</li>
        <li><!--<img src="http://lorempixel.com/200/200" alt="3">-->3</li>
        <li><!--<img src="http://lorempixel.com/200/200" alt="4">-->4</li>
    </ol>
</div>

<div class="carousel-box">
    <div class="carousel-buttons">
        <button class="carousel-prev">
            <span class="carousel-offscreen">Previous</span>
        </button>
        <button class="carousel-next">
            <span class="carousel-offscreen">Next</span>
        </button>
    </div>
    <ol class="carousel-content">
        <li class="carousel-current"><!--<img src="http://lorempixel.com/200/200" alt="1">-->5</li>
        <li><!--<img src="http://lorempixel.com/200/200" alt="2">-->6</li>
        <li><!--<img src="http://lorempixel.com/200/200" alt="3">-->7</li>
        <li><!--<img src="http://lorempixel.com/200/200" alt="4">-->8</li>
    </ol>
</div>