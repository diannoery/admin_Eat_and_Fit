import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { shallow } from "enzyme";

const findByTag = (wrapper, val) => {
  return wrapper.find(val);
};
//cari atribut
const findByAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

describe("<App />", () => {
  it("should in <App /> components to be one div", function () {
    const wrapper = setup();
    const appComponent = findByTag(wrapper, " LoginPage");
    expect(appComponent.length).toBe(2);
  });
  //cari atribut
  it("should component is called at least once", function () {
    const wrapper = setup();
    const appComponent = findByAttr(wrapper, "component-app");
    expect(appComponent.length).toEqual(1);
  });
  //cari tag

  it("should in <App /> components to be one h1", function () {
    const wrapper = setup();
    const appComponent = findByTag(wrapper, "h1");
    expect(appComponent.length).toBe(1);
  });
  //cari atribut
  it("should component is called at least once", function () {
    const wrapper = setup();
    const appComponent = findByAttr(wrapper, "counter-display");
    expect(appComponent.length).toEqual(1);
  });
  //cari tag
  it("should in <App /> components to be one button", function () {
    const wrapper = setup();
    const appComponent = findByTag(wrapper, "button");
    expect(appComponent.length).toBe(1);
  });

  //   it("initila state name string", function () {
  //     const wrapper = setup();
  //     const initialState = wrapper.state("name");
  //     expect(initialState).toMacth("");
  //   });
  it("one click button counter should be result 1", function () {
    const counter = 0;
    const wrapper = setup(null, { counter });
    findByAttr(wrapper, "increment-button").simulate("click");
    const display = findByAttr(wrapper, "counter-display");
    expect(display.text()).toContain(counter + 1);
  });
});
