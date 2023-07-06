import ChildComponent from "@/core/component/child.component";
import RenderService from "@/core/services/render.service";

import styles from './field.module.scss';
import template from './field.template.html';
import { $R } from "@/core/rquery/rquery.lib";

export class Field extends ChildComponent {
  constructor({
    placeholder,
    type = 'text',
    value = '',
    name,
    variant
  }) {
    super();
    if (!name) {
      throw new Error('Please fill field "name"!');
    }

    this.placeholder = placeholder;
    this.type = type;
    this.value = value;
    this.variant = variant;
    this.name = name;
  }
  render() {
    this.element = RenderService.htmlToElement(template, [], styles);
    const inputElement = $R(this.element).find('input').input({
      placeholder: this.placeholder,
      type: this.type,
      value: this.value,
      name: this.name,
    })

    if (this.type === 'number') {
      inputElement.inputNumber();
    }

    const isCreditCard = this.variant === 'credit-card';

    if (isCreditCard) {
      inputElement.creditCardInput();
    }

    return this.element;
  }
}