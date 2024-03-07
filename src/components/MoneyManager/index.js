import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    amount: 0,
    title: '',
    options: 'Income',
    transactionList: [],
  }

  updateAmount = e => {
    this.setState({amount: e.target.value})
  }

  updateTitle = e => {
    this.setState({title: e.target.value})
  }

  updateOption = e => {
    this.setState({options: e.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    console.log('hello')
    const {
      title,
      amount,
      options,
      transactionList,
      income,
      balance,
    } = this.state

    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      options,
    }

    if (options === 'Income') {
      const am = +amount
      this.setState(prevState => ({
        income: prevState.income + am,
        balance: prevState.balance + am,
        title: '',
        options: 'Income',
        transactionList: [...prevState.transactionList, newTransaction],
        amount: '',
      }))
    } else {
      const am = +amount
      this.setState(prevState => ({
        expenses: prevState.expenses + am,
        balance: prevState.balance - am,
        title: '',
        options: 'Expenses',
        transactionList: [...prevState.transactionList, newTransaction],
        amount: '',
      }))
    }
  }

  deleteTransaction = (id, amount, options) => {
    const {transactionList} = this.state
    const updatedTransactions = transactionList.filter(
      eachItem => eachItem.id !== id,
    )

    if (options === 'Income') {
      const amd = +amount
      this.setState(prevState => ({
        income: prevState.income - amd,
        balance: prevState.balance - amd,
        transactionList: updatedTransactions,
      }))
    } else {
      const amd = +amount
      this.setState(prevState => ({
        expenses: prevState.expenses - amd,
        balance: prevState.balance + amd,
        transactionList: updatedTransactions,
      }))
    }

    this.setState(prevState => ({
      transactionList: updatedTransactions,
    }))
  }

  render() {
    const {
      balance,
      income,
      expenses,
      amount,
      title,
      options,
      transactionList,
    } = this.state
    console.log(transactionList)
    return (
      <div>
        <div className="manager-bg-con">
          <h1 className="head-name">Hi, Richard</h1>
          <p className="pre-text">
            {' '}
            Welcome back to your{' '}
            <span className="span-text">Money Manager</span>
          </p>
        </div>
        <div className="money-details-con">
          <MoneyDetails
            className="balance-con"
            imgUrl="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alternate="balance"
            text="Balance"
            display={balance}
            testId="balanceAmount"
          />
          <MoneyDetails
            className="income-con"
            imgUrl="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
            alternate="income"
            text="Income"
            display={income}
            testId="incomeAmount"
          />
          <MoneyDetails
            className="expenses-con"
            imgUrl="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png "
            alternate="expenses"
            text="Expenses"
            display={expenses}
            testId="expensesAmount"
          />
        </div>

        <div className="trans-hist-con">
          <div className="transaction-con">
            <h2 className="transaction-head">Add Transaction</h2>
            <form onSubmit={this.onAddTransaction}>
              <label htmlFor="titlee" className="label">
                TITLE
              </label>
              <br />
              <input
                className="inp"
                id="titlee"
                type="text"
                placeholder="TITLE"
                value={title}
                onChange={this.updateTitle}
              />
              <br />
              <label htmlFor="amountl" className="label">
                AMOUNT
              </label>
              <br />
              <input
                className="inp"
                id="amountl"
                type="text"
                placeholder="AMOUNT"
                value={amount}
                onChange={this.updateAmount}
              />
              <br />
              <label htmlFor="type" className="label">
                TYPE
              </label>
              <br />
              <select onChange={this.updateOption} className="inp">
                {transactionTypeOptions.map(item => (
                  <option key={item.optionId} value={item.optionId}>
                    {item.displayText}
                  </option>
                ))}
              </select>
              <br />
              <button className="but" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="history-con">
            <h2 className="transaction-head">History</h2>
            <div className="history-item">
              <p>Title </p>
              <p>Amount </p>
              <p>Type</p>
            </div>
            <div>
              <ul>
                {transactionList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transactionDetails={eachTransaction}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
