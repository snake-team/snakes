$(document).ready(function() {
  const head = new Head($('#board'));
  const apple = new Apple($('#board'));

  let dateNow;
  let lastDate = new Date().getTime() - 100;

  $('body').on('keydown', function(e) {
    // console.log(e.keyCode);
    dateNow = new Date().getTime();
    if (dateNow - lastDate >= 100) {
      if (e.keyCode === 37) {
        console.log('pressed left');
        if (head.currentDirection !== 'right') head.currentDirection = 'left';
      } else if (e.keyCode === 38) {
        console.log('pressed top');
        if (head.currentDirection !== 'down') head.currentDirection = 'top';
      } else if (e.keyCode === 39) {
        console.log('pressed right');
        if (head.currentDirection !== 'left') head.currentDirection = 'right';
      } else if (e.keyCode === 40) {
        console.log('pressed down');
        if (head.currentDirection !== 'top') head.currentDirection = 'down';
      }
    }
    lastDate = dateNow;

  });
});
