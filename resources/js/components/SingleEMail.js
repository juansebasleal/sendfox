import axios from 'axios'
import React, { Component } from 'react'

class SingleEMail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: {}
    }
  }

  componentDidMount () {
    const emailId = this.props.match.params.id

    axios.get(`/api/emails/${emailId}`).then(response => {
    // axios.get(`/api/${emailId}`).then(response => {
      this.setState({
        email: response.data
      })
    })
  }

  render () {
    const { email } = this.state

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>{email.subject}</div>
              <div className='card-body'>
                <p>{email.body}</p>

                <button className='btn btn-primary btn-sm'>
                  Mark as completed
                </button>

                <hr />

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SingleEMail