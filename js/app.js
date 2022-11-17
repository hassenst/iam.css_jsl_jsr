class ViewController {
  constructor() {}

  onCreate() {
    //alert('oncreate');
    this.prepareViewSwitching();
    this.prepareListElementInteraction();
    //this.prepareFading();
    //this.prepareAddingNewElements();

    //this.loadData();
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

  prepareListElementInteraction() {
    const list = this.root.querySelector('ul');
    let message = '';

    //Event Listener nicht auf die Lis setzen sondern auf ul
    //muss noch implementiert werden mit closest()

    list.onclick = (event) => {
      const el = event.target.closest('.grid');
      const title = el.children[3].textContent;
      const src = el.children[0].src;
      message = title;
      if (event.target.tagName === 'UL') return;
      if (event.target.tagName === 'BUTTON') {
        message += `\n${src}`;
      }

      alert(message);
    };
  }
  /*
  prepareAddingNewElements() {
    const addButton = this.root.getElementsByTagName('button')[1];
    this.listRoot = this.root.getElementsByTagName('ul')[0];
    this.liTemplate = this.root.getElementsByTagName('template')[0];

    addButton.onclick = (event) => {
      event.stopPropagation();
      const [title, src] = ['lorem', 'https://via.placeholder.com/200x300'];
      this.addNewElementToList({ title, src });
    };
  }

  addNewElementToList(obj) {
    //viele createElement und appendChild anweisungen
    //console.log(obj);
    const newLi = document.importNode(this.liTemplate.content, true);

    this.listRoot.appendChild(newLi);
  }

  loadData() {
    //mit xhr Reequest oder fetch
  } */
}

window.onload = () => {
  const vcinstance = new ViewController();

  vcinstance.root = document.body;
  console.log(vcinstance);

  vcinstance.onCreate();
};
