class ViewController {
  constructor() {}

  onCreate() {
    this.loadData();
    this.prepareViewSwitching();
    this.prepareListElementInteraction();
    this.prepareAddingNewElements();
    this.refresh();
  }

  prepareViewSwitching() {
    const switchingElement = this.root.querySelector('.switch');
    switchingElement.onclick = () => {
      this.prepareFading();
    };
  }

  prepareFading() {
    const fadableElement = this.root.querySelector('main');

    const onFadedOut = () => {
      fadableElement.classList.toggle('fadeout');
      fadableElement.removeEventListener('transitionend', onFadedOut);
      this.root.classList.toggle('tileview');
      onFadedIn();
      fadableElement.addEventListener('transitionend', onFadedIn);
    };

    const onFadedIn = () => {
      fadableElement.classList.toggle('fadein');
      fadableElement.removeEventListener('transitionend', onFadedIn);
    };

    fadableElement.classList.toggle('fadeout');
    fadableElement.addEventListener('transitionend', onFadedOut);
  }

  /**
   * ListItems Interactions
   */
  prepareListElementInteraction() {
    const list = this.root.querySelector('ul');

    list.onclick = (event) => {
      const listItem = event.target.closest('.grid');
      const title = listItem.querySelector('.title').textContent;
      const src = listItem.querySelector('.thumbnail').src;
      //
      if (event.target.tagName === 'UL') return;
      //Handle Options Button Click
      if (event.target.tagName === 'BUTTON') {
        //remove listItem on confirm
        if (confirm(`Wollen Sie \n${title}\n${src}\nlöschen?`)) listItem.remove();
        return;
      }
      alert(title);
    };
  }

  prepareAddingNewElements() {
    const addButton = this.root.querySelector('.plus');

    addButton.onclick = (event) => {
      event.stopPropagation();
      //Random Number
      const rn = (max = 300, min = 100) =>
        Math.floor(Math.random() * (max - min + 1) + min);

      const [title, owner, added, src, numOfTags] = [
        ['Lorem', 'Ipsum', 'Dolor'][rn(2, 0)],
        'placekitten.com',
        new Date().toLocaleDateString(),
        `https://placekitten.com/${rn()}/${rn()}`,
        rn(100, 0),
      ];
      this.addNewElementToList({ title, owner, added, src, numOfTags });
    };
  }

  addNewElementToList(obj) {
    this.listRoot = this.root.getElementsByTagName('ul')[0];

    this.liTemplate = this.root.getElementsByTagName('template')[0];
    const newLi = document.importNode(this.liTemplate.content, true);

    const { title, owner, added, src, numOfTags } = obj;

    newLi.querySelector('.title').textContent = title;
    newLi.querySelector('.thumbnail').src = src;
    newLi.querySelector('.owner').textContent = owner;
    newLi.querySelector('.added').textContent = added;
    //Correct Datetime Format Attribute
    newLi
      .querySelector('.added')
      .setAttribute('datetime', added.split('.').reverse().join('-'));
    newLi.querySelector('.tags').textContent = numOfTags;

    this.listRoot.appendChild(newLi);
  }

  loadData() {
    fetch('data/listItems.json')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          this.addNewElementToList(item);
        });
      });
  }

  refresh() {
    const refreshButton = this.root.querySelector('.refresh');
    const container = this.root.getElementsByTagName('ul')[0];
    this.liTemplate = this.root.getElementsByTagName('template')[0];

    refreshButton.onclick = () => {
      container.replaceChildren(this.liTemplate);
      this.loadData();
    };
  }
}

window.onload = () => {
  const vcinstance = new ViewController();

  vcinstance.root = document.body;

  vcinstance.onCreate();
};
