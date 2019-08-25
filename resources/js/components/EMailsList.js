import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EMailsList extends Component {
  constructor () {
    super()
    this.state = {
      emails: []
    }
  }

  componentDidMount () {
// alert("componentDidMount");
    axios.get('/api/emails').then(response => {
    // axios.get('/api/').then(response => {
// alert("RESPONSE: " +  response);
      this.setState({
        emails: response.data
      })
    })
  }

  render () {
    const { emails } = this.state

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>All e-mails</div>
              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3' to='/emails/create'>
                  Create new EMail
                </Link>
                <ul className='list-group list-group-flush'>
                  {emails.map(email => (
                    <Link
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                      to={`/emails/${email.id}`}
                      key={email.id}
                    >
                      {email.subject}
                      <span className='badge badge-primary badge-pill'>
                        {email.body}
                      </span>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EMailsList