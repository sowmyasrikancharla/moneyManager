// Write your code here
import {Component} from 'react'
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {title, amount, options, id} = transactionDetails

  const ClickDelete = () => {
    deleteTransaction(id, amount, options)
  }
  console.log(options)
  return (
    <li className="history-items">
      <p>{title} </p>
      <p>Rs {amount} </p>
      <p>{options}</p>
      <button className="delete-con" onClick={ClickDelete} data-testid="delete">
        <img
          className="icon-set"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
