import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Menu,
  Responsive,
  Image,
  Grid,
  Button,
  Container,
} from 'semantic-ui-react'
import { setAuthUser } from '../actions/authUser'

class Nav extends Component {

  handleLogout = e => {
    e.preventDefault()
    this.props.setAuthUser(null)
  }

  render() {
    const { authUser, users } = this.props

    return (
      <Container>
        <Responsive as={Menu} minWidth={651} pointing secondary>
          <Menu.Item name="home" as={NavLink} to="/" exact icon='home'
          />
          <Menu.Item name="new poll" as={NavLink} to="/add" icon='add' />
          <Menu.Item name="leader board" as={NavLink} to="/leaderboard" icon='users' />
          <Menu.Menu position="right">
            <Menu.Item>
              <span>
                <Image
                  src={users[authUser].avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {users[authUser].name}
              </span>
            </Menu.Item>
            <Menu.Item>
              <Button  onClick={this.handleLogout} size="mini"
                content="Logout"
                labelPosition="right"
                basic
                compact
                icon="log out"
              />
            </Menu.Item>
          </Menu.Menu>
        </Responsive>
        <Responsive as={Fragment} minWidth={375} maxWidth={650}>
          <Grid columns={2} padded="vertically">
            <Grid.Row>
              <Grid.Column>
                <Image
                  src={users[authUser].avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {users[authUser].name}
              </Grid.Column>
              <Grid.Column verticalAlign="bottom" textAlign="right">
                <Button onClick={this.handleLogout} size="mini"
                  content="Logout"
                  labelPosition="right"
                  basic
                  compact
                  icon="log out" 
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Menu pointing secondary widths={3}>
                  <Menu.Item name="home" as={NavLink} to="/" exact icon='home' />
                  <Menu.Item name="new poll" as={NavLink} to="/add" icon='add' />
                  <Menu.Item
                    name="leader board"
                    as={NavLink}
                    to="/leaderboard" icon='users'
                  />
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
        <Responsive as={Fragment} maxWidth={374}>
          <Grid padded="vertically" columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Image
                  src={users[authUser].avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {users[authUser].name}
                <Button  onClick={this.handleLogout}
                  content="Logout" floated="right" labelPosition="right" compact basic icon="log out" size="mini"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Menu pointing secondary widths={3}>
                  <Menu.Item name="home" as={NavLink} to="/" exact icon='home' />
                  <Menu.Item name="new poll" as={NavLink} to="/add" icon='add' />
                  <Menu.Item
                    name="leader board"
                    as={NavLink}
                    to="/leaderboard" icon='users'
                  />
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
      </Container>
    )
  }
}

function mapStateToProps({ users, authUser }) {
  return {
    authUser,
    users
  }
}

export default connect(
  mapStateToProps,
  { setAuthUser }
)(Nav)
