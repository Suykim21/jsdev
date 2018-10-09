// Storage Controller

// Item Controller
const ItemCtrl = (() => {
  // Item Constructor
  // class Item {
  //   constructor(id, name, calories) {
  //     this.id = id;
  //     this.name = name;
  //     this.calories = calories;
  //   }

  //   logData: () => {

  //   }
  // }
  const Item = (id, name, calories) => {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    items: [
      {id: 0, name: 'Steak Dinner', calories: 1200},
      {id: 1, name: 'Cookie', calories: 400},
      {id: 2, name: 'Eggs', calories: 300},
    ],
    currentItem: null,
    totalCalories: 0
  }

  return {
    getItems: () => { return data.items },

    logData: () => { return data }
  }
})();

// UI Controller
const UICtrl = (() => {
  const UISelectors = {
    itemList: '#item-list'
  }

  // Public methods
  return {
    populateItemList: items => {
      let html = '';

      items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    }
  }
})();

// App Controller
const AppCtrl = ((ItemCtrl, UICtrl) => {

  return {
    init: () => {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemList(items);
    }
  }
})(ItemCtrl, UICtrl);

// Initialize App;
AppCtrl.init();