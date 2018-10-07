// (function() {
//   // Declare private vars and functions

//   return {
//     // Declare public var and functions

//   }
// })();

// const UICtrl = (function() {
//   let text = 'hello world';

//   const changeText = () => {
//     const element = document.querySelector('h1');
//     element.textContent = text;
//   }

//   return {
//     callChangeText: () => {
//       changeText();
//       console.log(text);
//     }
//   }
// })();

// UICtrl.callChangeText();

// REVEALING MODULE PATTERN
const ItemCtrl = (function() {
  let _data = [];

  function add(item) {
    _data.push(item);

    console.log('added');
  }

  function get(id) {
    return _data.find(item => {
      return item.id === id;
    });
  }

  return {
    add: add,
    get: get
  }
})();

ItemCtrl.add({id: 1, name: 'John'});
console.log(ItemCtrl.get(1));