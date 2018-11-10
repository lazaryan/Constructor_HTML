'use strict';

var DragManager = new function () {
  var dragObject = {};

  var self = this;

  function onMouseDown(e) {

    if (e.which != 1) return;

    var elem = e.target.closest('.js-draggable');
    if (!elem) return;

    dragObject.elem = elem;

    dragObject.downX = e.pageX;
    dragObject.downY = e.pageY;

    return false;
  }

  function onMouseMove(e) {
    if (!dragObject.elem) return;

    if (!dragObject.avatar) {
      var moveX = e.pageX - dragObject.downX;
      var moveY = e.pageY - dragObject.downY;

      if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
        return;
      }

      dragObject.avatar = createAvatar(e);
      if (!dragObject.avatar) {
        dragObject = {};
        return;
      }

      var coords = getCoords(dragObject.avatar);
      dragObject.shiftX = dragObject.downX - coords.left;
      dragObject.shiftY = dragObject.downY - coords.top;

      startDrag(e);
    }

    dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
    dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

    return false;
  }

  function onMouseUp(e) {
    if (dragObject.avatar) {
      finishDrag(e);
    }

    dragObject = {};
  }

  function finishDrag(e) {
    var dropElem = findDroppable(e);

    if (!dropElem) {
      self.onDragCancel(dragObject);
    } else {
      self.onDragEnd(dragObject, dropElem);
    }
  }

  function createAvatar(e) {

    var avatar = dragObject.elem.cloneNode(false);

    avatar.rollback = function () {
      body.removeChild(avatar);
    };

    return avatar;
  }

  function startDrag(e) {
    var avatar = dragObject.avatar;

    document.body.appendChild(avatar);
    avatar.style.zIndex = 9999;
    avatar.style.position = 'absolute';
  }

  function findDroppable(event) {
    dragObject.avatar.hidden = true;

    var elem = document.elementFromPoint(event.clientX, event.clientY);

    // показать переносимый элемент обратно
    dragObject.avatar.hidden = false;

    if (elem == null) {
      // такое возможно, если курсор мыши "вылетел" за границу окна
      return null;
    }

    return elem.closest('#frameWrapper');
  }

  document.onmousemove = onMouseMove;
  document.onmouseup = onMouseUp;
  document.onmousedown = onMouseDown;

  this.onDragEnd = function (dragObject, dropElem) {};
  this.onDragCancel = function (dragObject) {};
}();

function getCoords(elem) {
  // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}