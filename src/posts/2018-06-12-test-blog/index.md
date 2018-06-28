---
type: blog-post
title: Launching new gatsby theme
cover: "https://unsplash.it/400/300/?random?BoldMage"
tags: ['HTML5', 'CSS3']
categories: ['Website']
excerpt_separator: <!--more-->
published_date: "2018-06-12 16:37:28+05:30"
assets: /assets/blog/2018-06-12-new-jekyll-theme
related: true
comments: true
sharing: true
publish: true
toc: true
toc_label: "On this page"
toc_icon: "table"  # corresponding Font Awesome icon name (without fa prefix)
banner_image: ""
---

Testing <!--more-->

# Instructions to use

- Fork/Clone the repository from the following [link](https://github.com/sonapraneeth-a/gatsby-theme)
```bash
$ git clone -b master https://github.com/sonapraneeth-a/gatsby-theme
```
- Update the ```data/config.js``` file present in the ```src``` folder

# Features

Some of the main features available in this theme:
- Wr
- Code highlighting using [prism.js](http://prismjs.com/)
- $\LaTeX$ integration
- Utility classes like <text type="info" markdown=true>info</text>, <text type="danger" markdown=true>danger</text>, <text type="success" markdown=true>success</text> and <text type="warning" markdown=true>warning</text>
- Menus
    - Sidebar
    - Navigation bar
- [FontAwesome 5.1 icons](https://fontawesome.com/) for navigation menu items
- Blog posts
    - Sticky table of contents for the blog posts
    - Estimated time to read the post
    - Sharing modules (facebook, gplus, twitter, linkedin etc.,) for all posts (Can be enabled in frontmatter)
    - Custom components in blog posts like [admonition](#admonition), [quote](#blockquote), [text](#text) etc.,
- Google Analytics for tracking

## Menu

There are two types of menu's available in this theme.

### Sidebar

For convenience on mobile devices, there is a sidebar which can be toggled on/off by clicking on the hamburger icon (<i class="fa fa-bars"></i>).

### Navbar

For large screen devices, one can use the navigation bar present at the top of the screen for accessing various links. The navigation bar also highlights the current active page in the menu.

## LaTeX

Inline $\LaTeX$ rendering $a^2 + b^2 = c^2$

Equation rendering

$$
f(a) = \frac{1}{2\pi i} \oint\frac{f(z)}{z-a}dz
$$

$
\begin{aligned}
    m &= \frac{\Delta y}{\Delta x} \\
      &= \frac{y_m - y_a}{x_m - x_a} \\
      &= \frac{f(a+h) - f(a)}{a+h- a} \\
      &= \frac{f(a+h) - f(a)}{h}
\end{aligned}
$

## Code highlighting

```cpp{1,5-6}
#include <iostream>

int main()
{
    std::cout << "Hello World" << std::endl;
    return 0;
}
```

## Blockquote

<quote
    type="info"
    markdown=true>
*Content*  
**Bold**  
```Hello```  
<strong>HTML</strong>
</quote>

<quote
    type="danger"
    markdown=true>
*Content*  
</quote>

<quote
    type="success"
    markdown=true>
*Content*  
</quote>

<quote
    type="warning"
    markdown=true>
*Content*  
</quote>

## Admonition

<admonition 
    type="danger"
    markdown=true
    title="Danger">
*Content*  
**Bold**
```Hello```
<strong>HTML</strong>
</admonition>

<admonition 
    type="info"
    markdown=true
    title="Information">
**Info content**
[Link](https://www.google.co.in)
</admonition>

<admonition 
    type="success"
    markdown=true
    title="Success">
**Success content**
</admonition>

<admonition 
    type="warning"
    markdown=true
    title="Warning">
**Warning content**
</admonition>