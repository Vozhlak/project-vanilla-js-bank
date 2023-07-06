import { formatCardNumberWithDashes } from "@/utils/format/format-card-number";

class RQuery {
  constructor(selector) {
    if (typeof selector === 'string') {
			this.element = document.querySelector(selector)

			if (!this.element) {
				throw new Error(`Element ${selector} not found!`)
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			throw new Error('Invalid selector type')
		}
  }

  find(selector) {
    const element = new RQuery(this.element.querySelector(selector));
    if (element) {
      return element;
    } else {
      throw new Error(`Element ${selector} not found!!`);
    }
  }

  findAll(selector) {
    const elements = this.element.querySelectorAll(selector);
    return Array.from(elements).map(element => new RQuery(element));
  }

  append(childElement) {
    this.element.appendChild(childElement);
    return this;
  }

  before(newElement) {
    if (!(newElement instanceof HTMLElement)) {
      throw new Error('Element must be an HTMLElement');
    }
    const parentElement = this.element.parentElement;

    if (parentElement) {
      parentElement.insertBefore(newElement, this.element);
      return this;
    } else {
      throw new Error('Element does not have a parent element')
    }
  }

  html(htmlContent) {
    if (typeof htmlContent === 'undefined') {
      return this.element.innerHTML;
    } else {
      this.element.innerHTML = htmlContent;
      return this;
    }
  }

  text(textContent) {
    if (typeof textContent === 'undefined') {
      return this.element.textContent;
    } else {
      this.element.textContent = textContent;
      return this;
    }
  }

  click(callback) {
    this.element.addEventListener('click', callback);
    return this;
  }

  on(eventType, callback) {
    if (typeof eventType !== 'string' || typeof callback !== 'function') {
      throw new Error('eventType must be a string and callback must be a function');
    }

    this.element.addEventListener(eventType, callback);

    return this;
  }

  show() {
    this.element.style.removeProperty('display');
    return this;
  }

  hide() {
    this.element.style.display = 'none';
    return this;
  }

  css(property, value) {
    if (typeof property !== 'string' || typeof value !== 'string') {
      throw new Error('Property and value must be strings');
    }

    this.element.style[property] = value;
    return this;
  }

  addClass(classNames) {
    if (Array.isArray(classNames)) {
      for (const className of classNames) {
        this.element.classList.add(className);
      }
    } else {
      this.element.classList.add(classNames);
    }

    return this;
  }

  removeClass(classNames) {
    if (Array.isArray(classNames)) {
      for (const className of classNames) {
        this.element.classList.remove(className);
      }
    } else {
      this.element.classList.remove(classNames);
    }

    return this;
  }

  attr(attributeName, value) {
    if (typeof attributeName !== 'string') {
      throw new Error('Attribute name must be a string');
    }

    if (value === 'undefined') {
      return this.element.getAttribute(attributeName);
    } else {
      this.element.setAttribute(attributeName, value);
      return this;
    }
  }

  removeAttr(attributeName) {
    if (typeof attributeName !== 'string') {
      throw new Error('Attribute name must be a string');
    }

    this.element.removeAttribute(attributeName);
    return this;
  }

  input({ onInput, ...rest }) {
    if (this.element.tagName.toLowerCase() !== 'input') {
      throw new Error('Element must be input');
    }

    for (const [key, value] of Object.entries(rest)) {
      this.element.setAttribute(key, value);
    }

    if (onInput) {
      this.element.addEventListener('input', onInput)
    }

    return this;
  }

  inputNumber(limit) {
    if (
      this.element.tagName.toLowerCase() !== 'input' &&
      this.element.type !== 'number'
    ) 
      throw new Error('Element must be an input with type "number"');
    
    this.element.addEventListener('input', event => {
      let value = event.target.value.replace(/[^0-9]/g, '');
      if (limit) value = value.substring(0, limit);
      event.target.value = value;
    })

    return this;
  }

  creditCardInput() {
    const limit = 16;
    if (
      this.element.tagName.toLowerCase() !== 'input' &&
      this.element.type !== 'text'
    ) 
      throw new Error('Element must be an input with type "text"');
    
    this.element.addEventListener('input', event => {
      let value = event.target.value.replace(/[^0-9]/g, '');
      if (limit) value = value.substring(0, limit);
      event.target.value = formatCardNumberWithDashes(value);
    })

    return this;
  }

  submit(onSubmit) {
    if (this.element.tagName.toLowerCase() === 'form') {
      this.element.addEventListener('submit', e => {
        e.preventDefault();
        onSubmit(e);
      })
    } else {
      throw new Error('Element must be a form');
    }

    return this;
  }

  value(newValue) {
    if (typeof newValue === 'undefined') {
      return this.element.value;
    } else {
      this.element.value = newValue;
      return this;
    }
  }
}

export function $R(selector) {
  return new RQuery(selector);
}