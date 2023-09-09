import { makeAutoObservable } from "mobx";
import { paywallObject, IPaywall, TPaywallTemplate } from "react-nami";

class PaywallStore {
  // Initial state from the template object
  state = {
    currentPage: "page1",
    fullScreenPresentation: false,
    //... other state variables
  };

  constructor() {
    makeAutoObservable(this);
  }

  // Action to modify the state
  setState(newState: any) {
    this.state = { ...this.state, ...newState };
  }

  public getData(): IPaywall {
    // penguin paywall
    return paywallObject.results[2];
  }

  public getTemplate(): TPaywallTemplate {
    // penguin template
    return paywallObject.results[0].template;
  }
}

export const paywallStore = new PaywallStore();
