class DOMHelper {
  static clearEventListener(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, destinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(destinationSelector);
    destinationElement.append(element);
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }

    this.insertBefore = insertBefore;
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "beforebegin" : "beforeend",
      this.element
    );
    document.body.appendChild(this.element);
  }

  detach() {
    if (this.element) {
      this.element.remove();
    }
  }
}

class Tooltip extends Component {
  constructor(closeNotifier) {
    super();
    this.closeNotifier = closeNotifier;
    this.create();
  }

  create() {
    this.element = document.createElement("div");
    this.element.className = "card";
    this.element.textContent = "Show";
    this.element.addEventListener("click", this.closeToolTip.bind(this));
  }

  closeToolTip = () => {
    this.detach();
    this.closeNotifier();
  };
}

class ProjetcItem {
  hasActiveToolTip = false;

  constructor(id, updateProjectListFn, type) {
    this.id = id;
    this.updateProjectList = updateProjectListFn;
    this.connectSwitchButton(type);
    this.connectMoreInfoButton();
  }

  connectSwitchButton(type) {
    const projItemElement = document.getElementById(this.id);
    let switchButton = projItemElement.querySelector("button:last-of-type");
    switchButton = DOMHelper.clearEventListener(switchButton);
    switchButton.textContent = type === "active" ? "Finish" : "Activate";
    switchButton.addEventListener(
      "click",
      this.updateProjectList.bind(null, this.id)
    );
  }

  connectMoreInfoButton() {
    const projItemElement = document.getElementById(this.id);
    let moreInfoButton = projItemElement.querySelector("button:first-of-type");
    moreInfoButton.addEventListener("click", this.showMoreInfoHandler);
  }

  showMoreInfoHandler() {
    if (this.hasActiveToolTip) {
      return;
    }
    const tooltip = new Tooltip(() => {
      this.hasActiveToolTip = false;
    });
    tooltip.attach();
    this.hasActiveToolTip = true;
  }

  update(updateProjectListFn, type) {
    this.updateProjectList = updateProjectListFn;
    this.connectSwitchButton();
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;

    const projItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projItem of projItems) {
      this.projects.push(
        new ProjetcItem(projItem.id, this.switchProject.bind(this), this.type)
      );
    }
  }

  setSwitchHandler(switchHandlerFn) {
    this.switchHandler = switchHandlerFn;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchHandler.bind(this), this.type);
  }

  switchProject(projectId) {
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id != projectId);
  }
}

class App {
  static init() {
    const activeProjectList = new ProjectList("active");
    const finishedProjectList = new ProjectList("finished");

    activeProjectList.setSwitchHandler(
      finishedProjectList.addProject.bind(finishedProjectList)
    );
    finishedProjectList.setSwitchHandler(
      activeProjectList.addProject.bind(activeProjectList)
    );
  }
}

App.init();
