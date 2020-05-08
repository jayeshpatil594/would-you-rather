import { getInitialData } from '../data/API'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions))
      dispatch(receiveUsers(users))
    })
  }
}
