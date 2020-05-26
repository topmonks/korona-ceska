

test('Jásony jsou validní', () => {
  expect(typeof require('./events.json')).toBe("object");
  expect(typeof require('./outcomes.json')).toBe("object");
});
