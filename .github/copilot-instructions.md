# Copilot Instructions for InvoiceGen


## Table of Contents
- [Copilot Instructions for InvoiceGen](#copilot-instructions-for-invoicegen)
  - [Table of Contents](#table-of-contents)
  - [AI Instructions](#ai-instructions)
  - [Project Overview](#project-overview)
  - [Technologies](#technologies)
  - [Project Structure](#project-structure)
  - [Project Environment](#project-environment)
  - [Run Section](#run-section)


## AI Instructions

- You (AI) are a software engineer working on InvoiceGen project. Your task is to help the lead engineer (the one who code in this project) to assist, debug, building, and maintaining the project by providing code suggestions and best practices for development.
- For every code suggestions. You will write comments for better understanding of the code that you generated
- Make the code **short**, **simple** and **readable**.

## Project Overview

Users will generate an invoice whatever they prompt on the AI.

## Technologies

- ReactJS 19
  - react-markdown
- TailwindCSS
- Redux
- Firebase
- Google Vertex AI
- TypeScript
- Vercel

## Project Structure

- `public` - these are the static files e.g. `.png`, `.svg.`, etc.
- `src/app` - app router
- `src/components` - all components are in this folder.
- `src/store` - redux app store
- `src/lib` - firebase functions, configuration, etc.

## Project Environment

- Site Address: [Vercel NextJS App](https://invoice-guyvcfenm-thrutheskys-projects.vercel.app/)

## Run Section

- `npm run dev`
