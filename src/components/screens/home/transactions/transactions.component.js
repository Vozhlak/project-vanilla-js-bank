import ChildComponent from "@/core/component/child.component";

import styles from './transactions.module.scss';
import template from './transactions.template.html';
import { Store } from "@/core/store/store";
import { TransactionService } from "@/api/transaction.service";
import renderService from "@/core/services/render.service";
import { Heading } from "@/components/ui/heading/heading.component";
import { TRANSACTION_COMPLETED } from "@/constants/event.constants";
import { LOADER_SELECTOR, Loader } from "@/components/ui/loader/loader.component";
import { $R } from "@/core/rquery/rquery.lib";
import { TransactionItem } from "./transaction-item/transaction-item.component";

export class Transactions extends ChildComponent {
  constructor() {
    super();

    this.store = Store.getInstance().state;
    this.transactionService = new TransactionService();

    this.element = renderService.htmlToElement(template, [
      new Heading('Recent transactions')
    ], styles)

    this.#addListener();
  }

  #addListener() {
    document.addEventListener(TRANSACTION_COMPLETED, this.#onTransactionCompleted)
  }

  #removeListener() {
    document.removeEventListener(TRANSACTION_COMPLETED, this.#onTransactionCompleted)
  }

  #onTransactionCompleted = () => {
    this.fetchData();
  }

  destroy() {
    this.#removeListener();
  }

  fetchData() {
    this.transactionService.getAll(data => {
      if (!data) return;

      const loaderElement = this.element.querySelector(LOADER_SELECTOR);
      if (loaderElement) loaderElement.remove();

      const transactionsList = $R(this.element).find('#transactions-list');
      transactionsList.text('');

      if (data.length) {
        for (const transaction of data.transactions) {
          transactionsList.append(new TransactionItem(transaction).render())
        }
      } else {
        transactionsList.text('Transaction not found!');
      }
    })
  }

  render() {
    if (this.store.user) {
      $R(this.element)
        .append(new Loader().render())

        setTimeout(() => this.fetchData(), 500)
    }

    return this.element;
  }
}