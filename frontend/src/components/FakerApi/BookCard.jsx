import React from 'react'
import "./BookCard.css"

const BookCard = ({ title, author, genre, description, image }) => {
  console.log(image)
  return (
    <div className='card-container'>
        <h1>{title}</h1>
        <h2>Written by {author}</h2>
        <span>{genre}</span>
        <body>{description}</body>
        <img src={image} alt={title} />
    </div>
  )
}

export default BookCard
