import {
  ADD_ANSWER_TO_QUESTION,
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
} from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {

    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }

    case ADD_QUESTION:
      const { question } = action
  
      return {
        ...state,
        [question.id]: question
      }

    case ADD_ANSWER_TO_QUESTION:
      const { authUser, qid, answer } = action

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat(authUser)
          }
        }
      }

    default:
      return state
  }
}
