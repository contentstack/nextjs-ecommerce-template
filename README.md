
[![Contentstack](https://camo.githubusercontent.com/d24f513afa94a4a762533d54a0f590300dbd0413/68747470733a2f2f7777772e636f6e74656e74737461636b2e636f6d2f646f63732f7374617469632f696d616765732f636f6e74656e74737461636b2e706e67)](https://www.contentstack.com/)

# Build a Website using Next.js and Contentstack

About Contentstack: Contentstack is a headless CMS with an API-first approach that puts content at the centre. It is designed to simplify the process of publication by separating code from content. 

About this project: We have created a professional sample website using Next.js and Contentstack.  

![banner](https://user-images.githubusercontent.com/41462986/105142767-fb695f00-5b20-11eb-9766-4ea943e0b568.png  "banner.png")
 

## Live Demo

You can check the [live demo](https://nextjs-ecommerce-template.vercel.app/) to get first-hand experience of the website.  

## Prerequisites

- Install [nodejs](https://nodejs.org/en/) on your system.

## Clone the repo

Clone the following repo. It contains all the required dependencies.

`git clone https://github.com/contentstack/nextjs-ecommerce-template`

## Install dependencies

Go to the nextjs-ecommerce-template folder, and run the following:

-  `cd nextjs-ecommerce-template`

-  `npm install`

This downloads the required files and initializes the site.

## Update Contentstack secrets

Copy the `.env.sample` file to `.env.development.local` and `.env.production.local` and update with your Contentstack details, including your API key and delivery token.

It should end up looking something like:
```
    api_key="YOUR_API_KEY"

    delivery_token="YOUR_DELIVERY_TOKEN"

    environment="YOUR_PUBLISHING_ENVIRONMENT"

    region="EXAMPLE eu"
```

## Launch Your Server

Go to the nextjs-ecommerce-template folder, and run the following:

-  `cd nextjs-ecommerce-template`

-  `npm run dev`
 
 
## Documentation

Read Contentstack [docs](https://www.contentstack.com/docs/)

Learn about [Next.js](https://learnnextjs.com/)