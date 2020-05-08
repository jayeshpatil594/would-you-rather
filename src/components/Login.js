import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAuthUser } from '../actions/authUser'
import {
  Segment,
  Image,
  Form,
  Loader,
  Dimmer,
  Grid,
  Header,
} from 'semantic-ui-react'


export class Login extends Component {

  state = {
    loading: false
  }

  handleLoading = () => {
    this.setState({ loading: true })
  }

  render() {
    return (
      <Fragment>
        <Segment.Group>
          <LoginHeader />
          <LoginGridLayout 
            image={<GameImage />}
            form={<ConnectedLoginForm onLoading={this.handleLoading} />}
            loading={this.state.loading}
          />
        </Segment.Group>
      </Fragment>
    )
  }
}

const LoginHeader = () => (
  <Header as="h4" block attached="top" textAlign="center">
    <Header.Content>Welcome to the Game!</Header.Content>
    <Header.Subheader>Please choose an avatar to play.</Header.Subheader>
  </Header>
)

const LoginGridLayout = ({ image, form, loading }) => (
  <div>
    <Grid padded textAlign="center" >
      <Grid.Row className="login">
        <Grid.Column width={16} >
          {loading === true && (
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
          )}
          {image}
          <br />
          {form}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

const GameImage = () => (
  <Image src="/images/game-image.png" size="medium" centered />
)

class LoginForm extends Component {

  static propTypes = {
    onLoading: PropTypes.func.isRequired
  }

  state = {
    value: ''
  }

  onChange = (e, { value }) => {
    this.setState({ value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { onLoading, setAuthUser } = this.props
    const authUser = this.state.value

    new Promise((res, rej) => {
      onLoading()
      setTimeout(() => res(), 500)
    }).then(() => setAuthUser(authUser))
  }

  generateDropdown = () => {
    const { users } = this.props

    return users.map(user => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL }
    }))
  }

  render() {
    const { value } = this.state
    const disabled = value === '' ? true : false

    return (
      <Form onSubmit={this.handleSubmit}>
        <Header as="h2" color="green">
          Sign In
        </Header>
        <Form.Dropdown onChange={this.onChange}
          placeholder="Select an Avatar" fluid selection scrolling
          options={this.generateDropdown()}
          value={value} required    
        />
        <Form.Button positive disabled={disabled} fluid inverted color='green' >Enter</Form.Button>
      </Form>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  }
}

const ConnectedLoginForm = connect(mapStateToProps,{ setAuthUser })(LoginForm)

export default Login
