'use strict'

const MyLogger = require('../')
const colors = require('colors')

const infoLogger = MyLogger.Informer('permitLogServer')
const errorLogger = MyLogger.Panic('permitLogServer')
const warnLogger = MyLogger.Warning('permitLogServer')
const debugLogger = MyLogger.CusotomLogger('permitLogServer', 'DEBG', colors.cyan)

infoLogger('main - info', {
  desc: 'hi, I\'m a friendly line',
  isAllOk: true,
  amIFine: true,
  bestDay: new Date()
})

warnLogger('main - warn', {
  desc: 'Houston, we have a problem',
  isWeDieRightNow: false,
  isDebugTime: true,
  encouragingKitten: ':3'
})

errorLogger('main - error', {
  desc: 'Panic, pls somebody halp!',
  isAllBad: true
})

debugLogger('main - debug', {
  desc: 'non-essential data',
  commandArg: {
    line: 'hello world',
    startIndex: 0,
    endIndex: 3
  },
  callback: 'hello',
  error: null
})
