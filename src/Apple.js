class Apple {

  constructor($el) {
    this.node = $('<img id="apple"></img>');
    this.node.attr('src', 'http://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/256/22250-mouse-icon.png');
    $el.append(this.node);
    this.node.css({ top: this.getRandomIntInclusive(0,13) * 50, left: this.getRandomIntInclusive(0,13) * 50 });
    // this.changePosition.bind(this);
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

  // changePosition(top, left) {
  //   this.node.position().top = top;
  //   this.node.position().left = left;
  // }

}
