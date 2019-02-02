// creates a constructor function - research ES6 classes
class Head {

  // this is what's called when you use the "new" keyword
  constructor($el) {
    this.node = $('<img id="head" src="https://cdn4.iconfinder.com/data/icons/animal-2-3/36/131-512.png"></img>');
    this.currentDirection = 'right';
    this.SPEED = 300;
    this.node.css({ top: 0, left: 0 });
    $el.append(this.node);
    
    this.next = null;
    this.prev = null;
    this.bodyPos = [this.node.position()];
    // window.localStorage.setItem("highScore", 0);
    this.SCORE = 0;
    this.HIGHSCORE = window.localStorage.getItem("highScore");
    this.HIGHSCOREPLAYER = window.localStorage.getItem("highScorePlayer");
    this.gotHS = false;
    this.endGame = false;
    document.querySelector("#score").innerHTML= "SCORE: " + this.SCORE;
    document.querySelector("#highScore").innerHTML= "HIGH SCORE: " + this.HIGHSCORE;
    document.querySelector("#highScorePlayer").innerHTML= "BEST PLAYER: " + this.HIGHSCOREPLAYER;
    setTimeout(this.move.bind(this), this.SPEED);
    
  }

  // same as Head.prototype.move = function() {...}
  move() {
    let direction = this.currentDirection;
    let position = this.node.position();
    // checking if at apple location
    let appleLeft = $("#apple").position().left;
    let appleTop = $("#apple").position().top;
    let headPos = this.node.position();
    let headLeft = headPos.left;
    let headTop = headPos.top;
    let oldPos;
    

    //remove apple and relocate it
    if (headLeft === appleLeft && headTop === appleTop) {
      let randomLeft;
      let randomRight;
      let notOnBody = false;
      while (!notOnBody) {
        notOnBody = true;
        randomLeft = this.getRandomIntInclusive(0,13) * 50;
        randomRight = this.getRandomIntInclusive(0,13) * 50;
        for (let i = 0; i < this.bodyPos.length; i++) {
          if (randomLeft === this.bodyPos[i].left && randomRight === this.bodyPos[i].right) notOnBody = false;
        }
      }
      $("#apple").css("top", randomLeft);
      $("#apple").css("left", randomRight);

      if (this.SPEED >= 100) this.SPEED -= 25;
      document.querySelector("#score").innerHTML = "SCORE: " + ++this.SCORE;
      // console.log("SCORE IS " + this.SCORE);
      // console.log("HIGHSCORE IS " + this.HIGHSCORE);
      if (this.SCORE > this.HIGHSCORE) { 
        // console.log("WE'RE INSIDE")
        this.HIGHSCORE = this.SCORE;
        this.gotHS = true;
        // console.log("GOTHS IS SET TO TRUE");
      }
      
      //create body
      const bod = new Body();
      oldPos = this.node.position();
      bod.node.css(oldPos);

      $('#board').append(bod.node);
      bod.node[0].classList.add("tail");
      // console.log(bod.node);

      let current = this;
      while (current.next) {
        current = current.next;
      }
      current.next = bod;
      bod.prev = current;

      //add bod's position to bodyPos
      this.bodyPos.push(bod.node.position());
    }
    //move body and head
    this.moveBody(direction, position);

    //check if head hit body
    this.node.css(position);
    let currHeadPos = this.node.position();
    this.bodyPos.forEach(function(el, index) {
      if (index != 0 && el.left === currHeadPos.left && el.top === currHeadPos.top) {
        alert("YOU HIT YOURSELF. YOU LOSE!");
        this.endGame = true;
        return;
      }
    })
    
    
    //check out of bounds
    if (this.outOfBounds(position.left, position.top)) {
      document.querySelector("#head").style.display = "none";
      this.endGame = true;
      // console.log("HELLO");
      alert("You're out of bounds! You have lost!");
    }
    // console.log(this.gotHS, this.endGame);
    if (this.gotHS && this.endGame) {
      // console.log("asdf");
      window.localStorage.setItem("highScore", this.HIGHSCORE);
      window.localStorage.setItem("highScorePlayer", prompt("You have the new high score! What is your name? (Limit to 12 chars").slice(0,12));
      return;
    }

    if (this.endGame) return;
    
    setTimeout(this.move.bind(this), this.SPEED);
  }

  moveBody(direction, position) {
    let current = this;
    while (current.next) {
      current = current.next;
      current.node[0].classList.remove("tail");
    }
    current.node[0].classList.add("tail");
    while (current.prev) {
      current.node.css(current.prev.node.position());
      current = current.prev;
    }
    //check direction and move head
    if (direction === 'right') {
      position.left += 50;
    } else if (direction === 'left') {
      position.left -= 50;
    } else if (direction === 'top') {
      position.top -= 50;
    } else if (direction === 'down') {
      position.top += 50;
    } 

    this.bodyPos.pop();
    this.bodyPos.unshift(position);
  }

  outOfBounds(horizontal, vertical) {
    if (horizontal < 0 || horizontal > 650) return true;
    if (vertical < 0 || vertical > 650) return true;
    return false;
  }

  //random helper
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

}