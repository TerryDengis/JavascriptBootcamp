const assert = require('assert');

it('has a text input', async () => {
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');
  assert(input);
});

it('shows a success message with a valid email', async () => {
  const dom = await render('index.html');
  const input = dom.window.document.querySelector('input');
  input.value = 't@t.com';
  dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));
  const header = dom.window.document.querySelector('h1');
  assert.strictEqual(header.innerHTML, 'Looks good!');
});

it('shows a fail message with a invalid email', async () => {
  const dom = await render('index.html');
  const input = dom.window.document.querySelector('input');
  input.value = 't.com';
  dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));
  const header = dom.window.document.querySelector('h1');
  assert.strictEqual(header.innerHTML, 'Invalid email!');
});
