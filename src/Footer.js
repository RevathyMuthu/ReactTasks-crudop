import React from 'react'
const year = new Date();
const Footer = ({ length }) => {
  return (
    <footer>

      Copyright &copy; {year.getFullYear()} <br />
      {length} List {(length <= 1) ? "item" : "items"}

    </footer>

  )
}

export default Footer