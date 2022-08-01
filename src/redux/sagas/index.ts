import { all } from 'redux-saga/effects'
import { common } from 'redux/sagas/common'
import { errors } from 'redux/sagas/errors'
import { articleIndex, articleReferrer } from 'redux/sagas/article'
import { engagement } from 'redux/sagas/engagement'

export default function* rootSaga () {
  yield all([
    common(),
    errors(),
    articleIndex(),
    articleReferrer(),
    engagement()
  ])
}