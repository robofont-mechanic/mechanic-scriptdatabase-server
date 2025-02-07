$(function () {

  var controller = new ScrollMagic.Controller();

  var toolScene = new ScrollMagic.Scene({
    offset: 50,
    duration: 400
  });

  var toolElements = document.getElementsByClassName('tool');
  var selectedTool = toolElements[Math.floor(Math.random() * toolElements.length)];
  var baseOffset = 500;
  var elementOffset = baseOffset + selectedTool.offsetHeight;
  var rectoVerso = Math.random() < 0.5;

  $(selectedTool).toggleClass('recto', rectoVerso);

  toolScene.setTween(TweenMax.to(selectedTool, 1, { y: -elementOffset }));

  controller.addScene([toolScene]);

});

