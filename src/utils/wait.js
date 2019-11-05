async function wait(second) {
  return new Promise((resolve) => setTimeout(resolve, second));
}

module.exports = wait;
