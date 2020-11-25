import calcTime, {formatTime} from './calcTime'

test('formatTime', () => {
  expect(formatTime(126)).toBe('2:06')
})

test('calcTime', () => {
  const endTime = Date.now() + 300000
  expect(calcTime(endTime)).toBe('5:00')
})