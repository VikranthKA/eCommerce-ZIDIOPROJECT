import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from './BookCard'
import Loading from './Loading'

const Books = () => {
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [quantity, setQuantity] = useState(4) 

    const fetchBooks = async (qty) => {
        try {
            const booksData = await axios.get(`https://fakerapi.it/api/v2/books?_quantity=${qty}`)
            setBooks(prevBooks => [...prevBooks, ...booksData.data.data]) 
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching books:', error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchBooks(quantity)
    }, [quantity]) 
    // const handleScroll = () => {
    //     console.log("innerHeight + scrollTop:", window.innerHeight + document.documentElement.scrollTop)
    //     console.log("offsetHeight:", document.documentElement.offsetHeight)
        
    //     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
    //         console.log("Condition not met, returning")
    //         return
    //     }
    //     console.log("in below")
    //     setIsLoading(true)
    //     setQuantity(prevQuantity => prevQuantity + 5) 
    // }
    
    const handleScroll = () => {
        const innerHeightPlusScrollTop = window.innerHeight + document.documentElement.scrollTop
        const offsetHeight = document.documentElement.offsetHeight
        console.log(window.innerHeight,document.documentElement.scrollTop,offsetHeight,"asfjk")
        
        if (Math.abs(innerHeightPlusScrollTop - offsetHeight) > 1 || isLoading) {
            console.log("Condition not met, returning")
            return
        }
    
        console.log("in below")
        setIsLoading(true)
        setQuantity(prevQuantity => prevQuantity + 4) 
    }
    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isLoading]) 

    return (
        <>
            <div style={{ margin: "10px", textAlign: "center" }}>Books</div>

            <div>
                {books.length > 0 ? (
                    <div style={{display:"flex",flexWrap:"wrap"}}>
                        {books.map((book, index) => (
                            <div key={index}>
                                <BookCard {...book} />

                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No books available</div>
                )}
                {isLoading && <Loading />}
            </div>
        </>
    )
}

export default Books
