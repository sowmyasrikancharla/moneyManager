// Write your code here
import {Component} from 'react'
import './index.css'

class MoneyDetails extends Component {
  render() {
    const {className, imgUrl, alternate, text, display, testId} = this.props
    console.log(testId)
    return (
      <div className={className}>
        <img src={imgUrl} className="icon" alt={alternate} />
        <div>
          <p className="title">Your {text}</p>
          <p className="amount" data-testid={testId}>
            Rs {display}
          </p>
        </div>
      </div>
    )
  }
}
export default MoneyDetails
