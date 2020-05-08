import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleSaveQuestionAnswer } from '../actions/users'
import { 
  Header, 
  Button, 
  Form, 
  Radio,
} from 'semantic-ui-react'


export class PollQuestion extends Component {

  static propTypes = {
    authUser: PropTypes.string.isRequired,
    handleSaveQuestionAnswer: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
  }

  state = {
    value: ''
  }

  handleChange = (e, { value }) => this.setState({ value })

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.value !== '') {
      const { authUser, question, handleSaveQuestionAnswer } = this.props
      handleSaveQuestionAnswer(authUser, question.id, this.state.value)
    }
  }

  render() {
    const { question } = this.props
    const disabled = this.state.value === '' ? true : false

    return (
      <Fragment>
        <Header as="h4">Would you rather</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Radio  onChange={this.handleChange}
              label={question.optionOne.text}
              name="radioGroup"
              value="optionOne"
              checked={this.state.value === 'optionOne'}
            />
            <br />
            <Radio onChange={this.handleChange}
              label={question.optionTwo.text}
              name="radioGroup"
              value="optionTwo"
              checked={this.state.value === 'optionTwo'} 
            />
          </Form.Field>
          <Form.Field>
            <Button
              color="green"
              size="tiny"
              fluid
              disabled={disabled}
              content="Submit"
            />
          </Form.Field>
        </Form>
      </Fragment>
    )
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  }
}

export default connect( mapStateToProps,{ handleSaveQuestionAnswer })(PollQuestion)